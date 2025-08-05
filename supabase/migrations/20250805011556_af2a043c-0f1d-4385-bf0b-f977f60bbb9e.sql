-- Insert example users for testing role-based system

-- First, we need to insert users into auth.users table
-- Since we can't directly insert into auth.users through SQL, we'll create a function to help with this
-- But for now, I'll create the student records that would be created when users sign up

-- Example Regular Student
INSERT INTO public.students (user_id, full_name, whatsapp, status, role)
VALUES (
  'a0000000-0000-0000-0000-000000000001'::uuid,
  'Ahmed Ben Ali',
  '+213 555 123 456',
  'offer1',
  'regular_student'
);

-- Example Previous Student  
INSERT INTO public.students (user_id, full_name, whatsapp, status, role)
VALUES (
  'a0000000-0000-0000-0000-000000000002'::uuid,
  'Fatima Zahra',
  '+213 555 789 012',
  'offer2', 
  'previous_student'
);

-- Example Admin
INSERT INTO public.students (user_id, full_name, whatsapp, status, role)
VALUES (
  'a0000000-0000-0000-0000-000000000003'::uuid,
  'Professor Mohamed',
  '+213 555 345 678',
  'offer3',
  'admin'
);

-- Add some sample PDFs for the previous student
INSERT INTO public.student_pdfs (student_id, title, description, file_url, file_name, is_public)
VALUES (
  (SELECT id FROM public.students WHERE user_id = 'a0000000-0000-0000-0000-000000000002'::uuid),
  'Math Summary - Derivatives',
  'Complete summary of derivative rules and applications for BAC Math',
  'https://example.com/sample.pdf',
  'math_derivatives_summary.pdf',
  true
);

-- Add a sample teaching schedule for the previous student
INSERT INTO public.teaching_schedules (student_id, title, description, scheduled_date, start_time, end_time)
VALUES (
  (SELECT id FROM public.students WHERE user_id = 'a0000000-0000-0000-0000-000000000002'::uuid),
  'Math Tutoring Session',
  'Help current students with derivative problems and exam preparation',
  '2025-01-10',
  '14:00:00',
  '16:00:00'
);