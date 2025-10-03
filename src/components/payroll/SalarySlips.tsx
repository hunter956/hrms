import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Download } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function SalarySlips() {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const { data: transactions, isLoading } = useQuery({
    queryKey: ["salary-transactions-slips"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("salary_transactions")
        .select("*")
        .order("salary_month", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handlePreview = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsPreviewOpen(true);
  };

  const handleDownloadPDF = (transaction: any) => {
    // In a real application, you would generate a proper PDF here
    toast.info("PDF download functionality would be implemented here");
  };

  const handleDownloadExcel = (transaction: any) => {
    // In a real application, you would generate an Excel file here
    toast.info("Excel download functionality would be implemented here");
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
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Net Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.employee_id}</TableCell>
                  <TableCell>{format(new Date(transaction.salary_month), "MMM yyyy")}</TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Salary Slip Preview</DialogTitle>
            </DialogHeader>
            {selectedTransaction && (
              <div className="space-y-6 p-6 border rounded-lg">
                <div className="text-center border-b pb-4">
                  <h2 className="text-2xl font-bold">Salary Slip</h2>
                  <p className="text-muted-foreground">
                    {format(new Date(selectedTransaction.salary_month), "MMMM yyyy")}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Employee ID</p>
                    <p className="font-semibold">{selectedTransaction.employee_id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Date</p>
                    <p className="font-semibold">
                      {selectedTransaction.payment_date 
                        ? format(new Date(selectedTransaction.payment_date), "PP")
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
                  <div className="text-right text-primary">₹{selectedTransaction.net_salary.toFixed(2)}</div>
                </div>

                {selectedTransaction.notes && (
                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground">Notes</p>
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
