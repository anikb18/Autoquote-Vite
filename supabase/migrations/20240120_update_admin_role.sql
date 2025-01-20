-- Update specific user to admin role
UPDATE public.profiles 
SET role = 'admin'
WHERE email = 'anikbeauchemin18@gmail.com';

-- If profile doesn't exist, create it
INSERT INTO public.profiles (id, email, role)
SELECT 
    auth.uid(),
    'anikbeauchemin18@gmail.com',
    'admin'
WHERE NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE email = 'anikbeauchemin18@gmail.com'
);
