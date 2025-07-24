-- Create BAC streams table
CREATE TABLE public.bac_streams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create BAC subjects table  
CREATE TABLE public.bac_subjects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    stream_id UUID REFERENCES public.bac_streams(id),
    coefficient INTEGER NOT NULL DEFAULT 1,
    is_mandatory BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create exams table
CREATE TABLE public.exams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    subject_id UUID REFERENCES public.bac_subjects(id),
    stream_id UUID REFERENCES public.bac_streams(id),
    year INTEGER NOT NULL,
    session TEXT NOT NULL, -- 'Principal' or 'Rattrapage'
    duration_hours INTEGER DEFAULT 3,
    difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    file_url TEXT,
    ai_available BOOLEAN DEFAULT true,
    topics TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create videos table
CREATE TABLE public.videos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    subject_id UUID REFERENCES public.bac_subjects(id),
    stream_id UUID REFERENCES public.bac_streams(id),
    duration_minutes INTEGER,
    description TEXT,
    thumbnail_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.bac_streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bac_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to bac_streams" ON public.bac_streams FOR SELECT USING (true);
CREATE POLICY "Allow public read access to bac_subjects" ON public.bac_subjects FOR SELECT USING (true);
CREATE POLICY "Allow public read access to exams" ON public.exams FOR SELECT USING (true);
CREATE POLICY "Allow public read access to videos" ON public.videos FOR SELECT USING (true);

-- Insert BAC streams
INSERT INTO public.bac_streams (name, code, description) VALUES
('Sciences Exactes', 'SE', 'Mathématiques, Physique, Chimie'),
('Sciences Expérimentales', 'SX', 'Sciences Naturelles, Mathématiques, Physique'),
('Mathématiques', 'M', 'Mathématiques avancées, Physique'),
('Techniques Mathématiques', 'TM', 'Mathématiques techniques, Technologie'),
('Gestion et Économie', 'GE', 'Économie, Gestion, Comptabilité'),
('Lettres et Philosophie', 'LP', 'Littérature, Philosophie, Histoire'),
('Lettres et Langues Étrangères', 'LLE', 'Langues, Littérature étrangère');

-- Insert BAC subjects
WITH stream_data AS (
    SELECT id, code FROM public.bac_streams
)
INSERT INTO public.bac_subjects (name, code, stream_id, coefficient, is_mandatory) VALUES
-- Sciences Exactes
((SELECT name FROM stream_data WHERE code = 'SE'), 'MATH', (SELECT id FROM stream_data WHERE code = 'SE'), 7, true),
((SELECT name FROM stream_data WHERE code = 'SE'), 'PHYS', (SELECT id FROM stream_data WHERE code = 'SE'), 5, true),
((SELECT name FROM stream_data WHERE code = 'SE'), 'CHIM', (SELECT id FROM stream_data WHERE code = 'SE'), 4, true),
((SELECT name FROM stream_data WHERE code = 'SE'), 'ARAB', (SELECT id FROM stream_data WHERE code = 'SE'), 3, true),
((SELECT name FROM stream_data WHERE code = 'SE'), 'FRAN', (SELECT id FROM stream_data WHERE code = 'SE'), 3, true),
((SELECT name FROM stream_data WHERE code = 'SE'), 'ANG', (SELECT id FROM stream_data WHERE code = 'SE'), 2, true),

-- Sciences Expérimentales  
((SELECT name FROM stream_data WHERE code = 'SX'), 'SCNAT', (SELECT id FROM stream_data WHERE code = 'SX'), 6, true),
((SELECT name FROM stream_data WHERE code = 'SX'), 'MATH', (SELECT id FROM stream_data WHERE code = 'SX'), 5, true),
((SELECT name FROM stream_data WHERE code = 'SX'), 'PHYS', (SELECT id FROM stream_data WHERE code = 'SX'), 4, true),
((SELECT name FROM stream_data WHERE code = 'SX'), 'ARAB', (SELECT id FROM stream_data WHERE code = 'SX'), 3, true),
((SELECT name FROM stream_data WHERE code = 'SX'), 'FRAN', (SELECT id FROM stream_data WHERE code = 'SX'), 3, true),

-- Mathématiques
((SELECT name FROM stream_data WHERE code = 'M'), 'MATH', (SELECT id FROM stream_data WHERE code = 'M'), 8, true),
((SELECT name FROM stream_data WHERE code = 'M'), 'PHYS', (SELECT id FROM stream_data WHERE code = 'M'), 5, true),
((SELECT name FROM stream_data WHERE code = 'M'), 'ARAB', (SELECT id FROM stream_data WHERE code = 'M'), 3, true),
((SELECT name FROM stream_data WHERE code = 'M'), 'FRAN', (SELECT id FROM stream_data WHERE code = 'M'), 3, true);

-- Insert sample exams
WITH subject_data AS (
    SELECT s.id, s.name, s.stream_id 
    FROM public.bac_subjects s 
    JOIN public.bac_streams st ON s.stream_id = st.id
)
INSERT INTO public.exams (title, subject_id, stream_id, year, session, duration_hours, difficulty, topics) VALUES
('BAC Mathematics 2023 - Principal', 
 (SELECT id FROM subject_data WHERE name = 'Mathematics'), 
 (SELECT stream_id FROM subject_data WHERE name = 'Mathematics'), 
 2023, 'Principal', 4, 'Hard', 
 ARRAY['Algebra', 'Geometry', 'Calculus']),
 
('BAC Physics 2023 - Principal', 
 (SELECT id FROM subject_data WHERE name = 'Physics'), 
 (SELECT stream_id FROM subject_data WHERE name = 'Physics'), 
 2023, 'Principal', 3, 'Medium', 
 ARRAY['Mechanics', 'Optics', 'Electricity']);

-- Insert sample video
INSERT INTO public.videos (title, url, subject_id, stream_id, duration_minutes, description) VALUES
('Algèbre - Cours Complet BAC', 
 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
 (SELECT id FROM subject_data WHERE name = 'Mathematics'),
 (SELECT stream_id FROM subject_data WHERE name = 'Mathematics'),
 45,
 'Cours complet d\'algèbre pour la préparation au BAC');