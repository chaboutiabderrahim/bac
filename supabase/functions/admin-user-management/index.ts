import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { action, userId, newStatus, score, bookingId } = await req.json()

    switch (action) {
      case 'updateUserStatus':
        // Update user status (from offer1/free to other states)
        const { data: updateResult, error: updateError } = await supabaseClient
          .rpc('admin_update_user_status', {
            target_user_id: userId,
            new_status: newStatus
          })

        if (updateError) {
          console.error('Error updating user status:', updateError)
          return new Response(
            JSON.stringify({ error: updateError.message }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        return new Response(
          JSON.stringify({ success: true, updated: updateResult }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'updateBookingScore':
        // Update booking session score
        const { error: scoreError } = await supabaseClient
          .from('lesson_bookings')
          .update({ score })
          .eq('id', bookingId)

        if (scoreError) {
          console.error('Error updating booking score:', scoreError)
          return new Response(
            JSON.stringify({ error: scoreError.message }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'getUsersWithBookings':
        // Get all users with their booking stats
        const { data: users, error: usersError } = await supabaseClient
          .from('students')
          .select(`
            id,
            user_id,
            full_name,
            whatsapp,
            status,
            created_at,
            lesson_bookings(id, subject, topic, status, score, created_at)
          `)

        if (usersError) {
          console.error('Error fetching users:', usersError)
          return new Response(
            JSON.stringify({ error: usersError.message }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        return new Response(
          JSON.stringify({ users }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }

  } catch (error) {
    console.error('Error in admin-user-management function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})