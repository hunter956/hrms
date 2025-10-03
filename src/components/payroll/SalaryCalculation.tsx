import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Calculator, Plus } from "lucide-react";
import { format } from "date-fns";

export default function SalaryCalculation() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      employee_id: "",
      salary_month: format(new Date(), "yyyy-MM"),
      overtime_hours: "",
      bonus_amount: "",
      leave_days_deducted: "",
      notes: "",
    },
  });

  const { data: transactions, isLoading } = useQuery({
    queryKey: ["salary-transactions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("salary_transactions")
        .select("*")
        .order("salary_month", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const calculateSalaryMutation = useMutation({
    mutationFn: async (values: any) => {
      const employeeId = values.employee_id;
      const salaryMonth = values.salary_month + "-01";

      // Fetch salary structure
      const { data: structure } = await supabase
        .from("salary_structures")
        .select("*")
        .eq("employee_id", employeeId)
        .lte("effective_from", salaryMonth)
        .order("effective_from", { ascending: false })
        .limit(1)
        .single();

      if (!structure) {
        throw new Error("No salary structure found for this employee");
      }

      // Fetch tax deductions
      const { data: deductions } = await supabase
        .from("tax_deductions")
        .select("*")
        .eq("employee_id", employeeId)
        .lte("effective_from", salaryMonth)
        .order("effective_from", { ascending: false })
        .limit(1)
        .single();

      // Calculate overtime (assume ₹100 per hour)
      const overtimeAmount = (parseFloat(values.overtime_hours) || 0) * 100;
      
      // Calculate leave deductions (assume per day salary = gross/30)
      const grossBeforeDeductions = 
        Number(structure.basic_salary) +
        Number(structure.hra) +
        Number(structure.transport_allowance) +
        Number(structure.medical_allowance) +
        Number(structure.special_allowance) +
        Number(structure.other_allowances);
      
      const perDaySalary = grossBeforeDeductions / 30;
      const leaveDeductions = perDaySalary * (parseFloat(values.leave_days_deducted) || 0);

      // Calculate gross salary
      const grossSalary = grossBeforeDeductions + overtimeAmount + (parseFloat(values.bonus_amount) || 0);

      // Calculate total deductions
      const totalDeductions = 
        (deductions?.tds || 0) +
        (deductions?.pf || 0) +
        (deductions?.esi || 0) +
        (deductions?.professional_tax || 0) +
        (deductions?.gratuity || 0) +
        (deductions?.other_deductions || 0) +
        leaveDeductions;

      // Calculate net salary
      const netSalary = grossSalary - totalDeductions;

      // Create salary transaction
      const transaction = {
        employee_id: employeeId,
        salary_month: salaryMonth,
        basic_salary: structure.basic_salary,
        hra: structure.hra,
        transport_allowance: structure.transport_allowance,
        medical_allowance: structure.medical_allowance,
        special_allowance: structure.special_allowance,
        other_allowances: structure.other_allowances,
        overtime_amount: overtimeAmount,
        bonus_amount: parseFloat(values.bonus_amount) || 0,
        gross_salary: grossSalary,
        tds: deductions?.tds || 0,
        pf: deductions?.pf || 0,
        esi: deductions?.esi || 0,
        professional_tax: deductions?.professional_tax || 0,
        gratuity: deductions?.gratuity || 0,
        other_deductions: deductions?.other_deductions || 0,
        leave_deductions: leaveDeductions,
        total_deductions: totalDeductions,
        net_salary: netSalary,
        payment_status: "pending",
        notes: values.notes,
      };

      const { error } = await supabase
        .from("salary_transactions")
        .insert([transaction]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salary-transactions"] });
      toast.success("Salary calculated and saved successfully");
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast.error("Failed to calculate salary: " + error.message);
    },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Salary Calculation
            </CardTitle>
            <CardDescription>
              Auto-calculate salaries based on attendance, leaves, overtime & bonuses
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Calculate Salary
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Calculate Salary</DialogTitle>
                <DialogDescription>
                  Calculate monthly salary for an employee
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => calculateSalaryMutation.mutate(data))} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="employee_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employee ID</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter employee ID" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salary_month"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salary Month</FormLabel>
                        <FormControl>
                          <Input {...field} type="month" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="overtime_hours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Overtime Hours</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" step="0.5" placeholder="0" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bonus_amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bonus Amount</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" step="0.01" placeholder="0.00" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="leave_days_deducted"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Leave Days to Deduct</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" step="0.5" placeholder="0" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Optional notes" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={calculateSalaryMutation.isPending}>
                      {calculateSalaryMutation.isPending ? "Calculating..." : "Calculate"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Gross Salary</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.employee_id}</TableCell>
                  <TableCell>{format(new Date(transaction.salary_month), "MMM yyyy")}</TableCell>
                  <TableCell>₹{transaction.gross_salary.toFixed(2)}</TableCell>
                  <TableCell>₹{transaction.total_deductions.toFixed(2)}</TableCell>
                  <TableCell className="font-semibold">₹{transaction.net_salary.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      transaction.payment_status === "paid" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {transaction.payment_status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {transaction.payment_date ? format(new Date(transaction.payment_date), "PP") : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
