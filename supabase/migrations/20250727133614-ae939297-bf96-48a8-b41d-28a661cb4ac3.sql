-- Add AI usage tracking for daily message limits
CREATE TABLE public.ai_usage_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  message_count INTEGER NOT NULL DEFAULT 1,
  usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, usage_date)
);

-- Enable RLS
ALTER TABLE public.ai_usage_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for AI usage tracking
CREATE POLICY "Users can view their own AI usage" 
ON public.ai_usage_logs 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI usage" 
ON public.ai_usage_logs 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI usage" 
ON public.ai_usage_logs 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Add score field to lesson_bookings table
ALTER TABLE public.lesson_bookings 
ADD COLUMN score INTEGER DEFAULT 0;

-- Create admin functions for user state management
CREATE OR REPLACE FUNCTION public.admin_update_user_status(
  target_user_id UUID,
  new_status TEXT
) 
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  updated_count INTEGER;
BEGIN
  -- Update the user status
  UPDATE public.students 
  SET status = new_status, updated_at = now()
  WHERE user_id = target_user_id;
  
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  
  -- Return true if user was updated
  RETURN updated_count > 0;
END;
$$ LANGUAGE plpgsql;

-- Create function to check AI usage limit
CREATE OR REPLACE FUNCTION public.check_ai_usage_limit(
  user_uuid UUID,
  daily_limit INTEGER DEFAULT 20
) 
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  current_usage INTEGER := 0;
BEGIN
  -- Get today's usage count
  SELECT COALESCE(message_count, 0) 
  INTO current_usage
  FROM public.ai_usage_logs 
  WHERE user_id = user_uuid AND usage_date = CURRENT_DATE;
  
  -- Return true if under limit
  RETURN current_usage < daily_limit;
END;
$$ LANGUAGE plpgsql;

-- Create function to increment AI usage
CREATE OR REPLACE FUNCTION public.increment_ai_usage(
  user_uuid UUID
) 
RETURNS INTEGER
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  new_count INTEGER;
BEGIN
  -- Insert or update today's usage
  INSERT INTO public.ai_usage_logs (user_id, message_count, usage_date)
  VALUES (user_uuid, 1, CURRENT_DATE)
  ON CONFLICT (user_id, usage_date) 
  DO UPDATE SET 
    message_count = ai_usage_logs.message_count + 1,
    created_at = now()
  RETURNING message_count INTO new_count;
  
  RETURN new_count;
END;
$$ LANGUAGE plpgsql;