-- Create shifts table
CREATE TABLE public.shifts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  grace_period_minutes INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rosters table
CREATE TABLE public.rosters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL,
  shift_id UUID REFERENCES public.shifts(id) ON DELETE CASCADE,
  effective_from DATE NOT NULL,
  effective_to DATE,
  days_of_week TEXT[] DEFAULT ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create attendance_records table
CREATE TABLE public.attendance_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL,
  date DATE NOT NULL,
  check_in_time TIMESTAMP WITH TIME ZONE,
  check_out_time TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late', 'half-day', 'on-leave')),
  shift_id UUID REFERENCES public.shifts(id),
  overtime_hours NUMERIC(4,2) DEFAULT 0,
  notes TEXT,
  marking_method TEXT DEFAULT 'manual' CHECK (marking_method IN ('manual', 'biometric', 'punch')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(employee_id, date)
);

-- Enable Row Level Security
ALTER TABLE public.shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rosters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;

-- Create policies for shifts
CREATE POLICY "Allow public read access to shifts"
ON public.shifts FOR SELECT USING (true);

CREATE POLICY "Allow public insert to shifts"
ON public.shifts FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update to shifts"
ON public.shifts FOR UPDATE USING (true);

CREATE POLICY "Allow public delete to shifts"
ON public.shifts FOR DELETE USING (true);

-- Create policies for rosters
CREATE POLICY "Allow public read access to rosters"
ON public.rosters FOR SELECT USING (true);

CREATE POLICY "Allow public insert to rosters"
ON public.rosters FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update to rosters"
ON public.rosters FOR UPDATE USING (true);

CREATE POLICY "Allow public delete to rosters"
ON public.rosters FOR DELETE USING (true);

-- Create policies for attendance_records
CREATE POLICY "Allow public read access to attendance_records"
ON public.attendance_records FOR SELECT USING (true);

CREATE POLICY "Allow public insert to attendance_records"
ON public.attendance_records FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update to attendance_records"
ON public.attendance_records FOR UPDATE USING (true);

CREATE POLICY "Allow public delete to attendance_records"
ON public.attendance_records FOR DELETE USING (true);

-- Create triggers for updated_at
CREATE TRIGGER update_shifts_updated_at
  BEFORE UPDATE ON public.shifts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_rosters_updated_at
  BEFORE UPDATE ON public.rosters
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_attendance_records_updated_at
  BEFORE UPDATE ON public.attendance_records
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_attendance_employee_date ON public.attendance_records(employee_id, date);
CREATE INDEX idx_rosters_employee ON public.rosters(employee_id);
CREATE INDEX idx_attendance_date ON public.attendance_records(date);