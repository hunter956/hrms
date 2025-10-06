import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calculator, Plus } from "lucide-react";

// Hardcoded salary structures
const salaryStructures = {
  "EMP001": {
    basic_salary: 30000,
    hra: 12000,
    transport_allowance: 3000,
    medical_allowance: 2000,
    special_allowance: 5000,
    other_allowances: 3000,
  },
  "EMP002": {
    basic_salary: 40000,
    hra: 16000,
    transport_allowance: 4000,
    medical_allowance: 2500,
    special_allowance: 7000,
    other_allowances: 4000,
  },
  "EMP003": {
    basic_salary: 50000,
    hra: 20000,
    transport_allowance: 5000,
    medical_allowance: 3000,
    special_allowance: 9000,
    other_allowances: 5000,
  },
};

// Hardcoded tax deductions
const taxDeductions = {
  "EMP001": {
    tds: 3000,
    pf: 3600,
    esi: 550,
    professional_tax: 200,
    gratuity: 1440,
    other_deductions: 0,
  },
  "EMP002": {
    tds: 5000,
    pf: 4800,
    esi: 730,
    professional_tax: 200,
    gratuity: 1920,
    other_deductions: 0,
  },
  "EMP003": {
    tds: 7500,
    pf: 6000,
    esi: 920,
    professional_tax: 200,
    gratuity: 2400,
    other_deductions: 0,
  },
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const formatFullDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const getCurrentMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

export default function SalaryCalculation() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      employee_id: "EMP001",
      salary_month: "2025-09-01",
      basic_salary: 30000,
      hra: 12000,
      transport_allowance: 3000,
      medical_allowance: 2000,
      special_allowance: 5000,
      other_allowances: 3000,
      overtime_amount: 500,
      bonus_amount: 2000,
      gross_salary: 57500,
      tds: 3000,
      pf: 3600,
      esi: 550,
      professional_tax: 200,
      gratuity: 1440,
      other_deductions: 0,
      leave_deductions: 0,
      total_deductions: 8790,
      net_salary: 48710,
      payment_status: "paid",
      payment_date: "2025-09-05",
    },
    {
      id: 2,
      employee_id: "EMP002",
      salary_month: "2025-09-01",
      basic_salary: 40000,
      hra: 16000,
      transport_allowance: 4000,
      medical_allowance: 2500,
      special_allowance: 7000,
      other_allowances: 4000,
      overtime_amount: 1000,
      bonus_amount: 3000,
      gross_salary: 77500,
      tds: 5000,
      pf: 4800,
      esi: 730,
      professional_tax: 200,
      gratuity: 1920,
      other_deductions: 0,
      leave_deductions: 0,
      total_deductions: 12650,
      net_salary: 64850,
      payment_status: "pending",
      payment_date: null,
    },
  ]);
  const [nextId, setNextId] = useState(3);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const [formData, setFormData] = useState({
    employee_id: "",
    salary_month: getCurrentMonth(),
    overtime_hours: "",
    bonus_amount: "",
    leave_days_deducted: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      employee_id: "",
      salary_month: getCurrentMonth(),
      overtime_hours: "",
      bonus_amount: "",
      leave_days_deducted: "",
      notes: "",
    });
  };

  const calculateSalary = (e) => {
    e.preventDefault();
    setIsCalculating(true);
    
    try {
      const employeeId = formData.employee_id;
      const salaryMonth = formData.salary_month + "-01";

      // Fetch salary structure
      const structure = salaryStructures[employeeId];

      if (!structure) {
        alert("No salary structure found for this employee");
        setIsCalculating(false);
        return;
      }

      // Fetch tax deductions
      const deductions = taxDeductions[employeeId];

      // Calculate overtime (assume ₹100 per hour)
      const overtimeAmount = (parseFloat(formData.overtime_hours) || 0) * 100;
     
      // Calculate leave deductions (assume per day salary = gross/30)
      const grossBeforeDeductions =
        Number(structure.basic_salary) +
        Number(structure.hra) +
        Number(structure.transport_allowance) +
        Number(structure.medical_allowance) +
        Number(structure.special_allowance) +
        Number(structure.other_allowances);
     
      const perDaySalary = grossBeforeDeductions / 30;
      const leaveDeductions = perDaySalary * (parseFloat(formData.leave_days_deducted) || 0);

      // Calculate gross salary
      const grossSalary = grossBeforeDeductions + overtimeAmount + (parseFloat(formData.bonus_amount) || 0);

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
        id: nextId,
        employee_id: employeeId,
        salary_month: salaryMonth,
        basic_salary: structure.basic_salary,
        hra: structure.hra,
        transport_allowance: structure.transport_allowance,
        medical_allowance: structure.medical_allowance,
        special_allowance: structure.special_allowance,
        other_allowances: structure.other_allowances,
        overtime_amount: overtimeAmount,
        bonus_amount: parseFloat(formData.bonus_amount) || 0,
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
        payment_date: null,
        notes: formData.notes,
      };

      setTransactions([transaction, ...transactions]);
      setNextId(nextId + 1);
      alert("Salary calculated and saved successfully");
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      alert("Failed to calculate salary: " + error.message);
    } finally {
      setIsCalculating(false);
    }
  };

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
                  Calculate monthly salary for an employee (EMP001, EMP002, or EMP003)
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Employee ID</label>
                  <Input
                    name="employee_id"
                    value={formData.employee_id}
                    onChange={handleInputChange}
                    placeholder="Enter employee ID (EMP001, EMP002, EMP003)"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Salary Month</label>
                  <Input
                    name="salary_month"
                    type="month"
                    value={formData.salary_month}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Overtime Hours</label>
                  <Input
                    name="overtime_hours"
                    type="number"
                    step="0.5"
                    value={formData.overtime_hours}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Bonus Amount</label>
                  <Input
                    name="bonus_amount"
                    type="number"
                    step="0.01"
                    value={formData.bonus_amount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Leave Days to Deduct</label>
                  <Input
                    name="leave_days_deducted"
                    type="number"
                    step="0.5"
                    value={formData.leave_days_deducted}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Notes</label>
                  <Input
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Optional notes"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={calculateSalary} disabled={isCalculating}>
                    {isCalculating ? "Calculating..." : "Calculate"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium">Employee ID</th>
                <th className="text-left p-2 font-medium">Month</th>
                <th className="text-left p-2 font-medium">Gross Salary</th>
                <th className="text-left p-2 font-medium">Deductions</th>
                <th className="text-left p-2 font-medium">Net Salary</th>
                <th className="text-left p-2 font-medium">Status</th>
                <th className="text-left p-2 font-medium">Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="p-2">{transaction.employee_id}</td>
                  <td className="p-2">{formatDate(transaction.salary_month)}</td>
                  <td className="p-2">₹{transaction.gross_salary.toFixed(2)}</td>
                  <td className="p-2">₹{transaction.total_deductions.toFixed(2)}</td>
                  <td className="p-2 font-semibold">₹{transaction.net_salary.toFixed(2)}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      transaction.payment_status === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {transaction.payment_status}
                    </span>
                  </td>
                  <td className="p-2">
                    {transaction.payment_date ? formatFullDate(transaction.payment_date) : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}