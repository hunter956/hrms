import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Leaves() {
  const kpis = [
    { label: "Total Employees", value: 86 },
    { label: "On Leave Today", value: 7 },
    { label: "Pending Approvals", value: 12 },
    { label: "Avg Utilization (YTD)", value: "68%" },
  ];

  const balances = [
    { type: "Annual Leave", allocated: 20, used: 12, remaining: 8 },
    { type: "Sick Leave", allocated: 10, used: 3, remaining: 7 },
    { type: "Casual Leave", allocated: 7, used: 2, remaining: 5 },
  ];

  const recentRequests = [
    { id: "L-1021", employee: "Aarav Sharma", type: "Annual", from: "2025-09-28", to: "2025-09-30", days: 3, status: "Pending" },
    { id: "L-1020", employee: "Neha Verma", type: "Sick", from: "2025-09-27", to: "2025-09-27", days: 1, status: "Approved" },
    { id: "L-1019", employee: "Rahul Singh", type: "Casual", from: "2025-09-25", to: "2025-09-26", days: 2, status: "Rejected" },
    { id: "L-1018", employee: "Isha Kapoor", type: "Annual", from: "2025-09-20", to: "2025-09-22", days: 3, status: "Approved" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage employee leave types, balances, requests, and holidays
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">{k.label}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">{k.value}</CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Balances (Sample)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Allocated</TableHead>
                  <TableHead className="text-right">Used</TableHead>
                  <TableHead className="text-right">Remaining</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {balances.map((b) => (
                  <TableRow key={b.type}>
                    <TableCell>{b.type}</TableCell>
                    <TableCell className="text-right">{b.allocated}</TableCell>
                    <TableCell className="text-right">{b.used}</TableCell>
                    <TableCell className="text-right">{b.remaining}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Leave Requests (Sample)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead className="text-right">Days</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentRequests.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.id}</TableCell>
                    <TableCell>{r.employee}</TableCell>
                    <TableCell>{r.type}</TableCell>
                    <TableCell>{r.from}</TableCell>
                    <TableCell>{r.to}</TableCell>
                    <TableCell className="text-right">{r.days}</TableCell>
                    <TableCell>
                      {r.status === "Approved" && <Badge variant="default">Approved</Badge>}
                      {r.status === "Pending" && <Badge variant="secondary">Pending</Badge>}
                      {r.status === "Rejected" && <Badge variant="destructive">Rejected</Badge>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="p-6">
        <Alert>
          <Calendar className="h-4 w-4" />
          <AlertTitle>Database Setup Recommended</AlertTitle>
          <AlertDescription>
            The live Leave Management feature requires database tables (leave types, balances, requests, holidays). This page currently shows static demo data.
          </AlertDescription>
        </Alert>
      </Card>
    </div>
  );
}
