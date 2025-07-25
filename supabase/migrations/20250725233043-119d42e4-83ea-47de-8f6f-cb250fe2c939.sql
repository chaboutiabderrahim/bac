-- Create students table linked to auth.users
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('offer1', 'offer2', 'offer3')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lesson_bookings table
CREATE TABLE public.lesson_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage bucket for BAC exam PDFs
INSERT INTO storage.buckets (id, name, public) VALUES ('bac-exams', 'bac-exams', true);

-- Enable RLS on new tables
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_bookings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for students table
CREATE POLICY "Students can view their own profile" 
ON public.students 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Students can update their own profile" 
ON public.students 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Students can create their own profile" 
ON public.students 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for lesson_bookings table
CREATE POLICY "Students can view their own bookings" 
ON public.lesson_bookings 
FOR SELECT 
USING (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

CREATE POLICY "Students can create their own bookings" 
ON public.lesson_bookings 
FOR INSERT 
WITH CHECK (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

CREATE POLICY "Students can update their own bookings" 
ON public.lesson_bookings 
FOR UPDATE 
USING (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

-- Create storage policies for BAC exam PDFs
CREATE POLICY "BAC exam PDFs are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'bac-exams');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lesson_bookings_updated_at
  BEFORE UPDATE ON public.lesson_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to automatically create student profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.students (user_id, full_name, whatsapp, status)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(new.raw_user_meta_data ->> 'whatsapp', ''),
    COALESCE(new.raw_user_meta_data ->> 'status', 'offer1')
  );
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();