import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface PayslipViewProps {
  userId: string;
}

export default function PayslipView({ userId }: PayslipViewProps) {
  const { data: payslips, isLoading } = useQuery({
    queryKey: ["payslips", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("salary_transactions")
        .select("*")
        .eq("employee_id", userId)
        .order("salary_month", { ascending: false })
        .limit(12);
      if (error) throw error;
      return data;
    },
  });

  const handleDownload = (payslip: any) => {
    toast.info("PDF download functionality would be implemented here");
  };

  return (
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
          <div>Loading payslips...</div>
        ) : payslips && payslips.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Gross Salary</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payslips.map((payslip) => (
                <TableRow key={payslip.id}>
                  <TableCell>{format(new Date(payslip.salary_month), "MMMM yyyy")}</TableCell>
                  <TableCell>₹{payslip.gross_salary.toFixed(2)}</TableCell>
                  <TableCell>₹{payslip.total_deductions.toFixed(2)}</TableCell>
                  <TableCell className="font-semibold">₹{payslip.net_salary.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      payslip.payment_status === "paid" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {payslip.payment_status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload(payslip)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No payslips available yet. Your payslips will appear here once processed.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
