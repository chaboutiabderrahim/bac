-- Update exams table to include all required fields
ALTER TABLE public.exams 
ADD COLUMN IF NOT EXISTS official_solution_pdf_url TEXT,
ADD COLUMN IF NOT EXISTS youtube_url TEXT,
ADD COLUMN IF NOT EXISTS ai_solution TEXT;

-- Rename file_url to exam_pdf_url for clarity
ALTER TABLE public.exams 
RENAME COLUMN file_url TO exam_pdf_url;

-- Drop the existing public read policy
DROP POLICY IF EXISTS "Exams are publicly readable" ON public.exams;

-- Create new policy for authenticated students only
CREATE POLICY "Authenticated students can view exams" 
ON public.exams 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Update bac_streams and bac_subjects to also require authentication
DROP POLICY IF EXISTS "BAC streams are publicly readable" ON public.bac_streams;
DROP POLICY IF EXISTS "BAC subjects are publicly readable" ON public.bac_subjects;

CREATE POLICY "Authenticated users can view BAC streams" 
ON public.bac_streams 
FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view BAC subjects" 
ON public.bac_subjects 
FOR SELECT 
USING (auth.role() = 'authenticated');