import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface UseSecureDataOptions {
  table: string;
  select: string;
  orderBy?: { column: string; ascending?: boolean };
  filters?: Record<string, any>;
}

export const useSecureData = (options: UseSecureDataOptions) => {
  const { user } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let query = supabase
          .from(options.table)
          .select(options.select);

        // Apply filters
        if (options.filters) {
          Object.entries(options.filters).forEach(([column, value]) => {
            query = query.eq(column, value);
          });
        }

        // Apply ordering
        if (options.orderBy) {
          query = query.order(options.orderBy.column, { 
            ascending: options.orderBy.ascending ?? true 
          });
        }

        const { data: result, error: queryError } = await query;

        if (queryError) {
          throw queryError;
        }

        setData(result || []);
      } catch (err: any) {
        console.error('Secure data fetch error:', err);
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, options.table, options.select, JSON.stringify(options.filters), JSON.stringify(options.orderBy)]);

  return { data, loading, error, refetch: () => window.location.reload() };
};