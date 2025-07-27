-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_exams_subject_year ON public.exams(subject_id, year);
CREATE INDEX IF NOT EXISTS idx_exams_year ON public.exams(year);
CREATE INDEX IF NOT EXISTS idx_bac_subjects_stream ON public.bac_subjects(stream_id);

-- Add validation function for URLs to prevent malicious content
CREATE OR REPLACE FUNCTION public.validate_url(url TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Basic URL validation
  IF url IS NULL OR url = '' THEN
    RETURN TRUE; -- Allow empty URLs
  END IF;
  
  -- Check if URL starts with http or https
  IF NOT (url ~* '^https?://') THEN
    RETURN FALSE;
  END IF;
  
  -- Check for basic malicious patterns
  IF url ~* '(javascript:|data:|vbscript:|on\w+\s*=)' THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$;

-- Add trigger to validate URLs before insert/update
CREATE OR REPLACE FUNCTION public.validate_exam_urls()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Validate exam PDF URL
  IF NOT public.validate_url(NEW.exam_pdf_url) THEN
    RAISE EXCEPTION 'Invalid exam PDF URL';
  END IF;
  
  -- Validate official solution PDF URL
  IF NOT public.validate_url(NEW.official_solution_pdf_url) THEN
    RAISE EXCEPTION 'Invalid official solution PDF URL';
  END IF;
  
  -- Validate YouTube URL
  IF NOT public.validate_url(NEW.youtube_url) THEN
    RAISE EXCEPTION 'Invalid YouTube URL';
  END IF;
  
  -- Sanitize title and description to prevent XSS
  NEW.title = regexp_replace(NEW.title, '<[^>]*>', '', 'g');
  NEW.description = regexp_replace(COALESCE(NEW.description, ''), '<[^>]*>', '', 'g');
  
  RETURN NEW;
END;
$$;

-- Create trigger for URL validation
DROP TRIGGER IF EXISTS validate_exam_urls_trigger ON public.exams;
CREATE TRIGGER validate_exam_urls_trigger
  BEFORE INSERT OR UPDATE ON public.exams
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_exam_urls();

-- Update RLS policies to be more restrictive and add logging
DROP POLICY IF EXISTS "Authenticated students can view exams" ON public.exams;

CREATE POLICY "Authenticated students can view exams" 
ON public.exams 
FOR SELECT 
USING (
  auth.role() = 'authenticated' 
  AND auth.uid() IN (SELECT user_id FROM public.students)
);

-- Add audit logging for exam access (optional but recommended)
CREATE TABLE IF NOT EXISTS public.exam_access_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  exam_id UUID REFERENCES public.exams(id),
  access_type TEXT NOT NULL, -- 'view', 'download', 'ai_solve'
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit table
ALTER TABLE public.exam_access_logs ENABLE ROW LEVEL SECURITY;

-- Policy for audit logs (only users can see their own logs)
CREATE POLICY "Users can view their own access logs" 
ON public.exam_access_logs 
FOR SELECT 
USING (auth.uid() = user_id);