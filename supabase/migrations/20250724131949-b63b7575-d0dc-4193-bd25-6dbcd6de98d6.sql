-- Create BAC streams table
CREATE TABLE public.bac_streams (
  id SERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create BAC subjects table
CREATE TABLE public.bac_subjects (
  id SERIAL PRIMARY KEY,
  stream_id INTEGER NOT NULL REFERENCES public.bac_streams(id) ON DELETE CASCADE,
  subject_en TEXT NOT NULL,
  subject_ar TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create exams table for previous exams
CREATE TABLE public.exams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id INTEGER NOT NULL REFERENCES public.bac_subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  exam_type TEXT NOT NULL, -- 'bac', 'mock', 'practice'
  file_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create videos table for educational videos
CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id INTEGER NOT NULL REFERENCES public.bac_subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  duration INTEGER, -- in seconds
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.bac_streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bac_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (educational content should be public)
CREATE POLICY "BAC streams are publicly readable" 
ON public.bac_streams FOR SELECT 
USING (true);

CREATE POLICY "BAC subjects are publicly readable" 
ON public.bac_subjects FOR SELECT 
USING (true);

CREATE POLICY "Exams are publicly readable" 
ON public.exams FOR SELECT 
USING (true);

CREATE POLICY "Videos are publicly readable" 
ON public.videos FOR SELECT 
USING (true);

-- Insert BAC streams data
INSERT INTO public.bac_streams (id, name_en, name_ar) VALUES
(1, 'Mathematical Sciences', 'شعبة الرياضيات'),
(2, 'Experimental Sciences', 'شعبة العلوم التجريبية'),
(3, 'Technical Sciences', 'شعبة تقني رياضي'),
(4, 'Management and Economics', 'شعبة تسيير واقتصاد'),
(5, 'Foreign Languages', 'شعبة لغات أجنبية'),
(6, 'Literature and Philosophy', 'شعبة آداب وفلسفة');

-- Insert BAC subjects data
INSERT INTO public.bac_subjects (id, stream_id, subject_en, subject_ar) VALUES
-- Mathematical Sciences
(1, 1, 'Mathematics', 'الرياضيات'),
(2, 1, 'Physics', 'الفيزياء'),
(3, 1, 'Natural Sciences', 'العلوم الطبيعية'),
(4, 1, 'Arabic', 'اللغة العربية'),
(5, 1, 'French / English', 'اللغة الفرنسية / الإنجليزية'),
(6, 1, 'History and Geography', 'التاريخ والجغرافيا'),
(7, 1, 'Philosophy', 'الفلسفة'),
(8, 1, 'Islamic Education', 'التربية الإسلامية'),

-- Experimental Sciences
(9, 2, 'Mathematics', 'الرياضيات'),
(10, 2, 'Physics', 'الفيزياء'),
(11, 2, 'Natural Sciences', 'العلوم الطبيعية'),
(12, 2, 'Arabic', 'اللغة العربية'),
(13, 2, 'French / English', 'اللغة الفرنسية / الإنجليزية'),
(14, 2, 'History and Geography', 'التاريخ والجغرافيا'),
(15, 2, 'Philosophy', 'الفلسفة'),
(16, 2, 'Islamic Education', 'التربية الإسلامية'),

-- Technical Sciences
(17, 3, 'Mathematics', 'الرياضيات'),
(18, 3, 'Mechanical Engineering', 'الهندسة الميكانيكية'),
(19, 3, 'Civil Engineering', 'الهندسة المدنية'),
(20, 3, 'Electrical Engineering', 'الهندسة الكهربائية'),
(21, 3, 'Process Engineering', 'هندسة الطرائق'),
(22, 3, 'Physics', 'الفيزياء'),
(23, 3, 'Arabic', 'اللغة العربية'),
(24, 3, 'French / English', 'اللغة الفرنسية / الإنجليزية'),
(25, 3, 'History and Geography', 'التاريخ والجغرافيا'),
(26, 3, 'Philosophy', 'الفلسفة'),
(27, 3, 'Islamic Education', 'التربية الإسلامية'),

-- Management & Economics
(28, 4, 'Mathematics', 'الرياضيات'),
(29, 4, 'Accounting', 'المحاسبة'),
(30, 4, 'Economics', 'الاقتصاد'),
(31, 4, 'Law', 'القانون'),
(32, 4, 'Arabic', 'اللغة العربية'),
(33, 4, 'French / English', 'اللغة الفرنسية / الإنجليزية'),
(34, 4, 'History and Geography', 'التاريخ والجغرافيا'),
(35, 4, 'Philosophy', 'الفلسفة'),
(36, 4, 'Islamic Education', 'التربية الإسلامية'),

-- Foreign Languages
(37, 5, 'Italian / Spanish / German', 'اللغة الإيطالية / الإسبانية / الألمانية'),
(38, 5, 'English', 'اللغة الإنجليزية'),
(39, 5, 'French', 'اللغة الفرنسية'),
(40, 5, 'Arabic', 'اللغة العربية'),
(41, 5, 'Mathematics', 'الرياضيات'),
(42, 5, 'History and Geography', 'التاريخ والجغرافيا'),
(43, 5, 'Philosophy', 'الفلسفة'),
(44, 5, 'Islamic Education', 'التربية الإسلامية'),

-- Literature and Philosophy
(45, 6, 'Arabic', 'اللغة العربية'),
(46, 6, 'French / English', 'اللغة الفرنسية / الإنجليزية'),
(47, 6, 'Mathematics', 'الرياضيات'),
(48, 6, 'History and Geography', 'التاريخ والجغرافيا'),
(49, 6, 'Philosophy', 'الفلسفة'),
(50, 6, 'Islamic Education', 'التربية الإسلامية');

-- Add the YouTube video for Mathematics (subject_id 1 from Mathematical Sciences)
INSERT INTO public.videos (subject_id, title, url, description) VALUES
(1, 'Nourdin Mathematics Tutorial', 'https://www.youtube.com/watch?v=pWJsnK4TGiY&pp=ygUIbm91cmRpbiA%3D', 'Educational mathematics video by Nourdin');

-- Create indexes for better performance
CREATE INDEX idx_bac_subjects_stream_id ON public.bac_subjects(stream_id);
CREATE INDEX idx_exams_subject_id ON public.exams(subject_id);
CREATE INDEX idx_videos_subject_id ON public.videos(subject_id);
CREATE INDEX idx_exams_year ON public.exams(year);
CREATE INDEX idx_exams_type ON public.exams(exam_type);