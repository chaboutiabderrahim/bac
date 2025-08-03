-- Insert sample 2025 mathematics exams based on the Google Drive structure
INSERT INTO public.exams (
  id,
  title,
  description,
  subject_id,
  year,
  exam_type,
  exam_pdf_url,
  official_solution_pdf_url,
  youtube_url,
  created_at
) VALUES 
-- 2025 Mathematics Exams
(
  gen_random_uuid(),
  'الرياضيات - امتحان البكالوريا 2025',
  'امتحان البكالوريا الوطني لمادة الرياضيات للعام 2025 - شعبة العلوم الرياضية',
  1, -- Mathematics subject_id
  2025,
  'bac',
  'https://drive.google.com/file/d/sample-math-2025-exam/view',
  'https://drive.google.com/file/d/sample-math-2025-solution/view',
  'https://youtube.com/watch?v=sample-math-2025',
  now()
),
(
  gen_random_uuid(),
  'الرياضيات - الامتحان التجريبي 2025',
  'الامتحان التجريبي لمادة الرياضيات للعام 2025 - شعبة العلوم الرياضية',
  1, -- Mathematics subject_id
  2025,
  'trial',
  'https://drive.google.com/file/d/sample-math-2025-trial/view',
  'https://drive.google.com/file/d/sample-math-2025-trial-solution/view',
  'https://youtube.com/watch?v=sample-math-2025-trial',
  now()
),
(
  gen_random_uuid(),
  'الفيزياء - امتحان البكالوريا 2025',
  'امتحان البكالوريا الوطني لمادة الفيزياء للعام 2025 - شعبة العلوم الرياضية',
  2, -- Physics subject_id
  2025,
  'bac',
  'https://drive.google.com/file/d/sample-physics-2025-exam/view',
  'https://drive.google.com/file/d/sample-physics-2025-solution/view',
  'https://youtube.com/watch?v=sample-physics-2025',
  now()
),
(
  gen_random_uuid(),
  'الفلسفة - امتحان البكالوريا 2025',
  'امتحان البكالوريا الوطني لمادة الفلسفة للعام 2025 - شعبة العلوم الرياضية',
  7, -- Philosophy subject_id
  2025,
  'bac',
  'https://drive.google.com/file/d/sample-philosophy-2025-exam/view',
  'https://drive.google.com/file/d/sample-philosophy-2025-solution/view',
  'https://youtube.com/watch?v=sample-philosophy-2025',
  now()
),
(
  gen_random_uuid(),
  'التاريخ والجغرافيا - امتحان البكالوريا 2025',
  'امتحان البكالوريا الوطني لمادة التاريخ والجغرافيا للعام 2025 - شعبة العلوم الرياضية',
  6, -- History and Geography subject_id
  2025,
  'bac',
  'https://drive.google.com/file/d/sample-history-2025-exam/view',
  'https://drive.google.com/file/d/sample-history-2025-solution/view',
  'https://youtube.com/watch?v=sample-history-2025',
  now()
);