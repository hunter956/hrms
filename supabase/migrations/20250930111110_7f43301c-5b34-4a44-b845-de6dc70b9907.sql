-- Create salary structures table
CREATE TABLE public.salary_structures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL,
  basic_salary NUMERIC NOT NULL DEFAULT 0,
  hra NUMERIC NOT NULL DEFAULT 0,
  transport_allowance NUMERIC NOT NULL DEFAULT 0,
  medical_allowance NUMERIC NOT NULL DEFAULT 0,
  special_allowance NUMERIC NOT NULL DEFAULT 0,
  other_allowances NUMERIC NOT NULL DEFAULT 0,
  effective_from DATE NOT NULL,
  effective_to DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tax deductions table
CREATE TABLE public.tax_deductions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL,
  tds NUMERIC NOT NULL DEFAULT 0,
  pf NUMERIC NOT NULL DEFAULT 0,
  esi NUMERIC NOT NULL DEFAULT 0,
  professional_tax NUMERIC NOT NULL DEFAULT 0,
  gratuity NUMERIC NOT NULL DEFAULT 0,
  other_deductions NUMERIC NOT NULL DEFAULT 0,
  effective_from DATE NOT NULL,
  effective_to DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create salary transactions table
CREATE TABLE public.salary_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL,
  salary_month DATE NOT NULL,
  basic_salary NUMERIC NOT NULL DEFAULT 0,
  hra NUMERIC NOT NULL DEFAULT 0,
  transport_allowance NUMERIC NOT NULL DEFAULT 0,
  medical_allowance NUMERIC NOT NULL DEFAULT 0,
  special_allowance NUMERIC NOT NULL DEFAULT 0,
  other_allowances NUMERIC NOT NULL DEFAULT 0,
  overtime_amount NUMERIC NOT NULL DEFAULT 0,
  bonus_amount NUMERIC NOT NULL DEFAULT 0,
  gross_salary NUMERIC NOT NULL DEFAULT 0,
  tds NUMERIC NOT NULL DEFAULT 0,
  pf NUMERIC NOT NULL DEFAULT 0,
  esi NUMERIC NOT NULL DEFAULT 0,
  professional_tax NUMERIC NOT NULL DEFAULT 0,
  gratuity NUMERIC NOT NULL DEFAULT 0,
  other_deductions NUMERIC NOT NULL DEFAULT 0,
  leave_deductions NUMERIC NOT NULL DEFAULT 0,
  total_deductions NUMERIC NOT NULL DEFAULT 0,
  net_salary NUMERIC NOT NULL DEFAULT 0,
  payment_date DATE,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.salary_structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_deductions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salary_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow public read access to salary_structures" 
ON public.salary_structures FOR SELECT USING (true);

CREATE POLICY "Allow public insert to salary_structures" 
ON public.salary_structures FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update to salary_structures" 
ON public.salary_structures FOR UPDATE USING (true);

CREATE POLICY "Allow public delete to salary_structures" 
ON public.salary_structures FOR DELETE USING (true);

CREATE POLICY "Allow public read access to tax_deductions" 
ON public.tax_deductions FOR SELECT USING (true);

CREATE POLICY "Allow public insert to tax_deductions" 
ON public.tax_deductions FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update to tax_deductions" 
ON public.tax_deductions FOR UPDATE USING (true);

CREATE POLICY "Allow public delete to tax_deductions" 
ON public.tax_deductions FOR DELETE USING (true);

CREATE POLICY "Allow public read access to salary_transactions" 
ON public.salary_transactions FOR SELECT USING (true);

CREATE POLICY "Allow public insert to salary_transactions" 
ON public.salary_transactions FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update to salary_transactions" 
ON public.salary_transactions FOR UPDATE USING (true);

CREATE POLICY "Allow public delete to salary_transactions" 
ON public.salary_transactions FOR DELETE USING (true);

-- Create triggers for updated_at
CREATE TRIGGER update_salary_structures_updated_at
BEFORE UPDATE ON public.salary_structures
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tax_deductions_updated_at
BEFORE UPDATE ON public.tax_deductions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_salary_transactions_updated_at
BEFORE UPDATE ON public.salary_transactions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();