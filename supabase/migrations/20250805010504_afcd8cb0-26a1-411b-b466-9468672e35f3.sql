-- Create role enum for better type safety
CREATE TYPE public.user_role AS ENUM ('regular_student', 'previous_student', 'admin');

-- Add role column to students table
ALTER TABLE public.students 
ADD COLUMN role user_role NOT NULL DEFAULT 'regular_student';

-- Create table for PDFs uploaded by previous students
CREATE TABLE public.student_pdfs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for teaching schedule assignments
CREATE TABLE public.teaching_schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  scheduled_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.student_pdfs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teaching_schedules ENABLE ROW LEVEL SECURITY;

-- RLS policies for student_pdfs
CREATE POLICY "Public PDFs are viewable by everyone" 
ON public.student_pdfs 
FOR SELECT 
USING (is_public = true);

CREATE POLICY "Previous students can manage their own PDFs" 
ON public.student_pdfs 
FOR ALL
USING (student_id IN (
  SELECT id FROM public.students 
  WHERE user_id = auth.uid() AND role = 'previous_student'
));

-- RLS policies for teaching_schedules
CREATE POLICY "Previous students can view their own schedule" 
ON public.teaching_schedules 
FOR SELECT 
USING (student_id IN (
  SELECT id FROM public.students 
  WHERE user_id = auth.uid() AND role = 'previous_student'
));

CREATE POLICY "Admins can manage all schedules" 
ON public.teaching_schedules 
FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.students 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- Add trigger for automatic timestamp updates on student_pdfs
CREATE TRIGGER update_student_pdfs_updated_at
BEFORE UPDATE ON public.student_pdfs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add trigger for automatic timestamp updates on teaching_schedules
CREATE TRIGGER update_teaching_schedules_updated_at
BEFORE UPDATE ON public.teaching_schedules
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT role FROM public.students WHERE user_id = user_uuid;
$$;