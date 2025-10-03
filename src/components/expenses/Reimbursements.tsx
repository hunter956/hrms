import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

type Reimbursement = {
  id: string;
  claimId: string;
  employee: string;
  amount: number;
  status: "Pending" | "Processing" | "Paid";
  paidOn?: string;
};

export default function Reimbursements() {
  const [filter, setFilter] = useState("");
  const [items] = useState<Reimbursement[]>([
    { id: "r1", claimId: "C-1001", employee: "Aarav Sharma", amount: 3250, status: "Pending" },
    { id: "r2", claimId: "C-1002", employee: "Neha Verma", amount: 1280, status: "Processing" },
    { id: "r3", claimId: "C-1003", employee: "Rahul Singh", amount: 5600, status: "Paid", paidOn: "2025-09-27" },
  ]);

  const filtered = useMemo(() => {
    const q = filter.toLowerCase();
    return items.filter((i) =>
      i.claimId.toLowerCase().includes(q) ||
      i.employee.toLowerCase().includes(q) ||
      i.status.toLowerCase().includes(q)
    );
  }, [filter, items]);

  const totalPending = useMemo(() =>
    items.filter((i) => i.status !== "Paid").reduce((sum, i) => sum + i.amount, 0),
    [items]
  );

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Pending</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">₹{totalPending.toFixed(2)}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Processing</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{items.filter((i) => i.status === "Processing").length}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Paid</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{items.filter((i) => i.status === "Paid").length}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reimbursement Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 mb-3">
            <Input placeholder="Search by claim ID, employee or status" value={filter} onChange={(e) => setFilter(e.target.value)} />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim ID</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Paid On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">No records</TableCell>
                  </TableRow>
                )}
                {filtered.map((i) => (
                  <TableRow key={i.id}>
                    <TableCell>{i.claimId}</TableCell>
                    <TableCell>{i.employee}</TableCell>
                    <TableCell className="text-right">₹{i.amount.toFixed(2)}</TableCell>
                    <TableCell>{i.status}</TableCell>
                    <TableCell>{i.paidOn || "—"}</TableCell>
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


