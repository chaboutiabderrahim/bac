-- Fix security warnings by setting proper search_path for functions
ALTER FUNCTION public.validate_url(TEXT) SET search_path = '';
ALTER FUNCTION public.validate_exam_urls() SET search_path = '';

-- Also update the existing functions to have proper search_path
ALTER FUNCTION public.handle_new_user() SET search_path = '';
ALTER FUNCTION public.update_updated_at_column() SET search_path = '';