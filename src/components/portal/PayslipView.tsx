import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

interface PayslipViewProps {
  userId?: string;
}

// Hardcoded payslips data
const initialPayslips = [
  {
    id: "1",
    employee_id: "user123",
    salary_month: "2024-09-01",
    gross_salary: 75000.00,
    total_deductions: 8250.00,
    net_salary: 66750.00,
    payment_status: "paid",
    payment_date: "2024-10-01"
  },
  {
    id: "2",
    employee_id: "user123",
    salary_month: "2024-08-01",
    gross_salary: 75000.00,
    total_deductions: 8250.00,
    net_salary: 66750.00,
    payment_status: "paid",
    payment_date: "2024-09-01"
  },
  {
    id: "3",
    employee_id: "user123",
    salary_month: "2024-07-01",
    gross_salary: 75000.00,
    total_deductions: 8250.00,
    net_salary: 66750.00,
    payment_status: "paid",
    payment_date: "2024-08-01"
  },
  {
    id: "4",
    employee_id: "user123",
    salary_month: "2024-06-01",
    gross_salary: 72000.00,
    total_deductions: 7920.00,
    net_salary: 64080.00,
    payment_status: "paid",
    payment_date: "2024-07-01"
  },
  {
    id: "5",
    employee_id: "user123",
    salary_month: "2024-05-01",
    gross_salary: 72000.00,
    total_deductions: 7920.00,
    net_salary: 64080.00,
    payment_status: "paid",
    payment_date: "2024-06-01"
  },
  {
    id: "6",
    employee_id: "user123",
    salary_month: "2024-04-01",
    gross_salary: 72000.00,
    total_deductions: 7920.00,
    net_salary: 64080.00,
    payment_status: "paid",
    payment_date: "2024-05-01"
  },
  {
    id: "7",
    employee_id: "user123",
    salary_month: "2024-03-01",
    gross_salary: 70000.00,
    total_deductions: 7700.00,
    net_salary: 62300.00,
    payment_status: "paid",
    payment_date: "2024-04-01"
  },
  {
    id: "8",
    employee_id: "user123",
    salary_month: "2024-02-01",
    gross_salary: 70000.00,
    total_deductions: 7700.00,
    net_salary: 62300.00,
    payment_status: "paid",
    payment_date: "2024-03-01"
  },
  {
    id: "9",
    employee_id: "user123",
    salary_month: "2024-01-01",
    gross_salary: 70000.00,
    total_deductions: 7700.00,
    net_salary: 62300.00,
    payment_status: "paid",
    payment_date: "2024-02-01"
  },
  {
    id: "10",
    employee_id: "user123",
    salary_month: "2023-12-01",
    gross_salary: 68000.00,
    total_deductions: 7480.00,
    net_salary: 60520.00,
    payment_status: "paid",
    payment_date: "2024-01-01"
  },
  {
    id: "11",
    employee_id: "user123",
    salary_month: "2023-11-01",
    gross_salary: 68000.00,
    total_deductions: 7480.00,
    net_salary: 60520.00,
    payment_status: "paid",
    payment_date: "2023-12-01"
  },
  {
    id: "12",
    employee_id: "user123",
    salary_month: "2023-10-01",
    gross_salary: 68000.00,
    total_deductions: 7480.00,
    net_salary: 60520.00,
    payment_status: "paid",
    payment_date: "2023-11-01"
  }
];

export default function PayslipView({ userId = "user123" }: PayslipViewProps) {
  const [payslips] = useState(initialPayslips);
  const [isLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'info' | 'success', message: string } | null>(null);

  const formatMonth = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  const showNotification = (type: 'info' | 'success', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDownload = (payslip: any) => {
    showNotification('info', "PDF download functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
          notification.type === 'info' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              My Payslips
            </CardTitle>
            <CardDescription>Download your salary slips</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading payslips...</div>
            ) : payslips && payslips.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Month</th>
                      <th className="text-left p-3 font-medium">Gross Salary</th>
                      <th className="text-left p-3 font-medium">Deductions</th>
                      <th className="text-left p-3 font-medium">Net Salary</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payslips.map((payslip) => (
                      <tr key={payslip.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{formatMonth(payslip.salary_month)}</td>
                        <td className="p-3">₹{payslip.gross_salary.toFixed(2)}</td>
                        <td className="p-3">₹{payslip.total_deductions.toFixed(2)}</td>
                        <td className="p-3 font-semibold">₹{payslip.net_salary.toFixed(2)}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            payslip.payment_status === "paid" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {payslip.payment_status}
                          </span>
                        </td>
                        <td className="p-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownload(payslip)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No payslips available yet. Your payslips will appear here once processed.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}