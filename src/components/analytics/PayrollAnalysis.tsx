import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function PayrollAnalysis() {
  const byDept = useMemo(
    () => [
      { department: "Engineering", headcount: 42, monthlyCost: 4800000 },
      { department: "Sales", headcount: 28, monthlyCost: 2300000 },
      { department: "HR", headcount: 7, monthlyCost: 520000 },
      { department: "Finance", headcount: 9, monthlyCost: 780000 },
    ],
    []
  );

  const total = byDept.reduce((s, d) => s + d.monthlyCost, 0);

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Monthly Payroll</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">₹{total.toLocaleString()}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Avg Cost / Employee</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">₹{Math.round(total / byDept.reduce((s, d) => s + d.headcount, 0)).toLocaleString()}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Cost Dept</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{byDept.reduce((a, b) => (a.monthlyCost > b.monthlyCost ? a : b)).department}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payroll by Department</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Headcount</TableHead>
                  <TableHead className="text-right">Monthly Cost</TableHead>
                  <TableHead className="text-right">Cost / Employee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {byDept.map((d) => (
                  <TableRow key={d.department}>
                    <TableCell>{d.department}</TableCell>
                    <TableCell className="text-right">{d.headcount}</TableCell>
                    <TableCell className="text-right">₹{d.monthlyCost.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{Math.round(d.monthlyCost / d.headcount).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


