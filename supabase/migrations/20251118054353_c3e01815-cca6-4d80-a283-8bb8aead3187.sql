-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create price_list table for admin to manage
CREATE TABLE public.price_list (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_key text UNIQUE NOT NULL,
  service_name text NOT NULL,
  description text,
  base_rate numeric,
  per_hour numeric,
  per_item numeric,
  per_cubic_yard numeric,
  per_room numeric,
  per_load numeric,
  per_ton numeric,
  small_item numeric,
  large_item numeric,
  minimum_hours integer,
  updated_at timestamptz DEFAULT now() NOT NULL,
  updated_by uuid REFERENCES public.profiles(id)
);

ALTER TABLE public.price_list ENABLE ROW LEVEL SECURITY;

-- Insert default price list
INSERT INTO public.price_list (service_key, service_name, description, base_rate, per_hour) VALUES
('hoarding_cleanup', 'Hoarding Remediation', 'Hoarding remediation and cleanup', 150, 85),
('junk_removal', 'Junk Removal', 'General junk and debris removal', 100, NULL),
('furniture_removal', 'Furniture Removal', 'Furniture and appliance removal', NULL, NULL),
('appliance_removal', 'Appliance Removal', 'Appliance disposal', NULL, NULL),
('estate_cleanout', 'Estate Cleanout', 'Complete estate cleanout', 200, NULL),
('recycling', 'Recycling Services', 'Recycling and eco-friendly disposal', 50, NULL),
('hazmat_disposal', 'Hazmat Disposal', 'Hazardous material disposal', 250, NULL),
('labor', 'Additional Labor', 'Additional labor', NULL, 75),
('disposal_fees', 'Disposal Fees', 'Landfill disposal fees', NULL, NULL);

UPDATE public.price_list SET per_cubic_yard = 75 WHERE service_key = 'junk_removal';
UPDATE public.price_list SET small_item = 50, large_item = 100 WHERE service_key = 'furniture_removal';
UPDATE public.price_list SET small_item = 60, large_item = 120 WHERE service_key = 'appliance_removal';
UPDATE public.price_list SET per_room = 100 WHERE service_key = 'estate_cleanout';
UPDATE public.price_list SET per_load = 40 WHERE service_key = 'recycling';
UPDATE public.price_list SET per_item = 75 WHERE service_key = 'hazmat_disposal';
UPDATE public.price_list SET minimum_hours = 2 WHERE service_key = 'labor';
UPDATE public.price_list SET per_ton = 60 WHERE service_key = 'disposal_fees';

-- Create AI prompts table for admin to customize
CREATE TABLE public.ai_prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_key text UNIQUE NOT NULL,
  prompt_text text NOT NULL,
  description text,
  updated_at timestamptz DEFAULT now() NOT NULL,
  updated_by uuid REFERENCES public.profiles(id)
);

ALTER TABLE public.ai_prompts ENABLE ROW LEVEL SECURITY;

-- Insert default AI prompt
INSERT INTO public.ai_prompts (prompt_key, prompt_text, description) VALUES
('quote_generation', 'Company: Urge to Purge - Professional waste management and disposal services. Analyze the images provided and identify all items, furniture, debris, and waste that need to be removed. Provide a detailed breakdown of estimated removal costs based on the price list. Be thorough and accurate in your assessment.', 'Main prompt used for AI quote generation');

-- Trigger function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'user');
  
  RETURN new;
END;
$$;

-- Trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for price_list (public read, admin write)
CREATE POLICY "Anyone can view price list"
  ON public.price_list FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update price list"
  ON public.price_list FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert price list"
  ON public.price_list FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for ai_prompts (public read, admin write)
CREATE POLICY "Anyone can view AI prompts"
  ON public.ai_prompts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update AI prompts"
  ON public.ai_prompts FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert AI prompts"
  ON public.ai_prompts FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));