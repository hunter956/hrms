import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Download } from "lucide-react";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const formatFullDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatMonthYear = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

// Hardcoded transactions data
const hardcodedTransactions = [
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
    notes: "Regular monthly salary"
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
    notes: ""
  },
  {
    id: 3,
    employee_id: "EMP003",
    salary_month: "2025-08-01",
    basic_salary: 50000,
    hra: 20000,
    transport_allowance: 5000,
    medical_allowance: 3000,
    special_allowance: 9000,
    other_allowances: 5000,
    overtime_amount: 1500,
    bonus_amount: 5000,
    gross_salary: 98500,
    tds: 7500,
    pf: 6000,
    esi: 920,
    professional_tax: 200,
    gratuity: 2400,
    other_deductions: 0,
    leave_deductions: 1833.33,
    total_deductions: 18853.33,
    net_salary: 79646.67,
    payment_status: "paid",
    payment_date: "2025-08-05",
    notes: "Includes performance bonus"
  },
  {
    id: 4,
    employee_id: "EMP001",
    salary_month: "2025-08-01",
    basic_salary: 30000,
    hra: 12000,
    transport_allowance: 3000,
    medical_allowance: 2000,
    special_allowance: 5000,
    other_allowances: 3000,
    overtime_amount: 0,
    bonus_amount: 0,
    gross_salary: 55000,
    tds: 3000,
    pf: 3600,
    esi: 550,
    professional_tax: 200,
    gratuity: 1440,
    other_deductions: 0,
    leave_deductions: 0,
    total_deductions: 8790,
    net_salary: 46210,
    payment_status: "paid",
    payment_date: "2025-08-05",
    notes: ""
  }
];

export default function SalarySlips() {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [transactions] = useState(hardcodedTransactions);

  const handlePreview = (transaction) => {
    setSelectedTransaction(transaction);
    setIsPreviewOpen(true);
  };

  const handleDownloadPDF = (transaction) => {
    alert("PDF download functionality would be implemented here");
  };

  const handleDownloadExcel = (transaction) => {
    alert("Excel download functionality would be implemented here");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Salary Slips
        </CardTitle>
        <CardDescription>
          View and download salary slips (PDF/Excel)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium">Employee ID</th>
                <th className="text-left p-2 font-medium">Month</th>
                <th className="text-left p-2 font-medium">Net Salary</th>
                <th className="text-left p-2 font-medium">Status</th>
                <th className="text-left p-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="p-2">{transaction.employee_id}</td>
                  <td className="p-2">{formatDate(transaction.salary_month)}</td>
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
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePreview(transaction)}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadPDF(transaction)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadExcel(transaction)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Excel
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Salary Slip Preview</DialogTitle>
            </DialogHeader>
            {selectedTransaction && (
              <div className="space-y-6 p-6 border rounded-lg">
                <div className="text-center border-b pb-4">
                  <h2 className="text-2xl font-bold">Salary Slip</h2>
                  <p className="text-gray-600">
                    {formatMonthYear(selectedTransaction.salary_month)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Employee ID</p>
                    <p className="font-semibold">{selectedTransaction.employee_id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Date</p>
                    <p className="font-semibold">
                      {selectedTransaction.payment_date 
                        ? formatFullDate(selectedTransaction.payment_date)
                        : "Pending"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold border-b pb-2">Earnings</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Basic Salary:</div>
                    <div className="text-right">₹{selectedTransaction.basic_salary.toFixed(2)}</div>
                    <div>HRA:</div>
                    <div className="text-right">₹{selectedTransaction.hra.toFixed(2)}</div>
                    <div>Transport Allowance:</div>
                    <div className="text-right">₹{selectedTransaction.transport_allowance.toFixed(2)}</div>
                    <div>Medical Allowance:</div>
                    <div className="text-right">₹{selectedTransaction.medical_allowance.toFixed(2)}</div>
                    <div>Special Allowance:</div>
                    <div className="text-right">₹{selectedTransaction.special_allowance.toFixed(2)}</div>
                    <div>Other Allowances:</div>
                    <div className="text-right">₹{selectedTransaction.other_allowances.toFixed(2)}</div>
                    <div>Overtime:</div>
                    <div className="text-right">₹{selectedTransaction.overtime_amount.toFixed(2)}</div>
                    <div>Bonus:</div>
                    <div className="text-right">₹{selectedTransaction.bonus_amount.toFixed(2)}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 font-semibold border-t pt-2">
                    <div>Gross Salary:</div>
                    <div className="text-right">₹{selectedTransaction.gross_salary.toFixed(2)}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold border-b pb-2">Deductions</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>TDS:</div>
                    <div className="text-right">₹{selectedTransaction.tds.toFixed(2)}</div>
                    <div>PF:</div>
                    <div className="text-right">₹{selectedTransaction.pf.toFixed(2)}</div>
                    <div>ESI:</div>
                    <div className="text-right">₹{selectedTransaction.esi.toFixed(2)}</div>
                    <div>Professional Tax:</div>
                    <div className="text-right">₹{selectedTransaction.professional_tax.toFixed(2)}</div>
                    <div>Gratuity:</div>
                    <div className="text-right">₹{selectedTransaction.gratuity.toFixed(2)}</div>
                    <div>Leave Deductions:</div>
                    <div className="text-right">₹{selectedTransaction.leave_deductions.toFixed(2)}</div>
                    <div>Other Deductions:</div>
                    <div className="text-right">₹{selectedTransaction.other_deductions.toFixed(2)}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 font-semibold border-t pt-2">
                    <div>Total Deductions:</div>
                    <div className="text-right">₹{selectedTransaction.total_deductions.toFixed(2)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 font-bold text-lg border-t-2 pt-4">
                  <div>Net Salary:</div>
                  <div className="text-right text-blue-600">₹{selectedTransaction.net_salary.toFixed(2)}</div>
                </div>

                {selectedTransaction.notes && (
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600">Notes</p>
                    <p className="text-sm">{selectedTransaction.notes}</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}