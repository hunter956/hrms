-- Create departments table
CREATE TABLE public.departments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  parent_department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create branches table
CREATE TABLE public.branches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  address TEXT,
  department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create teams table
CREATE TABLE public.teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL,
  team_lead_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create designations table (roles/job titles)
CREATE TABLE public.designations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  level INTEGER NOT NULL DEFAULT 1,
  department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create hierarchy levels table
CREATE TABLE public.hierarchy_levels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  level_name TEXT NOT NULL,
  level_number INTEGER NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.designations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hierarchy_levels ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust based on your auth requirements)
CREATE POLICY "Allow public read access to departments"
  ON public.departments FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to departments"
  ON public.departments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to departments"
  ON public.departments FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete to departments"
  ON public.departments FOR DELETE
  USING (true);

CREATE POLICY "Allow public read access to branches"
  ON public.branches FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to branches"
  ON public.branches FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to branches"
  ON public.branches FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete to branches"
  ON public.branches FOR DELETE
  USING (true);

CREATE POLICY "Allow public read access to teams"
  ON public.teams FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to teams"
  ON public.teams FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to teams"
  ON public.teams FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete to teams"
  ON public.teams FOR DELETE
  USING (true);

CREATE POLICY "Allow public read access to designations"
  ON public.designations FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to designations"
  ON public.designations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to designations"
  ON public.designations FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete to designations"
  ON public.designations FOR DELETE
  USING (true);

CREATE POLICY "Allow public read access to hierarchy_levels"
  ON public.hierarchy_levels FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to hierarchy_levels"
  ON public.hierarchy_levels FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to hierarchy_levels"
  ON public.hierarchy_levels FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete to hierarchy_levels"
  ON public.hierarchy_levels FOR DELETE
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_departments_parent ON public.departments(parent_department_id);
CREATE INDEX idx_branches_department ON public.branches(department_id);
CREATE INDEX idx_teams_department ON public.teams(department_id);
CREATE INDEX idx_teams_branch ON public.teams(branch_id);
CREATE INDEX idx_designations_department ON public.designations(department_id);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_departments_updated_at
  BEFORE UPDATE ON public.departments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_branches_updated_at
  BEFORE UPDATE ON public.branches
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_teams_updated_at
  BEFORE UPDATE ON public.teams
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_designations_updated_at
  BEFORE UPDATE ON public.designations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some default hierarchy levels
INSERT INTO public.hierarchy_levels (level_name, level_number, description) VALUES
  ('Executive', 1, 'C-Level executives and top management'),
  ('Senior Management', 2, 'Directors and senior managers'),
  ('Middle Management', 3, 'Department heads and team leads'),
  ('Junior Management', 4, 'Supervisors and junior managers'),
  ('Staff', 5, 'Individual contributors and team members');