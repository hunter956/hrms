import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

interface AttendanceViewProps {
  userId: string;
}

export default function AttendanceView({ userId }: AttendanceViewProps) {
  const { data: attendanceRecords, isLoading } = useQuery({
    queryKey: ["attendance", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("attendance")
        .select("*")
        .eq("employee_id", userId)
        .order("date", { ascending: false })
        .limit(30);
      if (error) throw error;
      return data;
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          My Attendance
        </CardTitle>
        <CardDescription>View your attendance records for the last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div>Loading attendance records...</div>
        ) : attendanceRecords && attendanceRecords.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Work Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{format(new Date(record.date), "PP")}</TableCell>
                  <TableCell>{record.check_in_time || "-"}</TableCell>
                  <TableCell>{record.check_out_time || "-"}</TableCell>
                  <TableCell className="capitalize">{record.status}</TableCell>
                  <TableCell>{record.total_hours ? `${record.total_hours.toFixed(2)}h` : "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No attendance records found. Your attendance will appear here once marked.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
