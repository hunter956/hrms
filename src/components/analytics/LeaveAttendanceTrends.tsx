import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function LeaveAttendanceTrends() {
  const monthly = useMemo(
    () => [
      { month: "2025-06", leaveDays: 120, avgAttendance: 94 },
      { month: "2025-07", leaveDays: 135, avgAttendance: 93 },
      { month: "2025-08", leaveDays: 148, avgAttendance: 92 },
      { month: "2025-09", leaveDays: 110, avgAttendance: 95 },
    ],
    []
  );

  const totals = monthly.reduce(
    (acc, r) => ({ leaveDays: acc.leaveDays + r.leaveDays, avgAttendance: acc.avgAttendance + r.avgAttendance }),
    { leaveDays: 0, avgAttendance: 0 }
  );

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Leave Days (4 mo)</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{totals.leaveDays}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Avg Attendance %</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{Math.round(totals.avgAttendance / monthly.length)}%</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Leave & Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead className="text-right">Leave Days</TableHead>
                  <TableHead className="text-right">Avg Attendance %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthly.map((m) => (
                  <TableRow key={m.month}>
                    <TableCell>{m.month}</TableCell>
                    <TableCell className="text-right">{m.leaveDays}</TableCell>
                    <TableCell className="text-right">{m.avgAttendance}%</TableCell>
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


