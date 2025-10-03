import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Search, Calendar } from "lucide-react";

export function AttendanceTable() {
  const [searchDate, setSearchDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [employeeSearch, setEmployeeSearch] = useState("");

  const { data: records, isLoading } = useQuery({
    queryKey: ["attendance-records", searchDate, employeeSearch],
    queryFn: async () => {
      let query = supabase
        .from("attendance_records")
        .select("*")
        .order("date", { ascending: false });

      if (searchDate) {
        query = query.eq("date", searchDate);
      }

      if (employeeSearch) {
        query = query.ilike("employee_id", `%${employeeSearch}%`);
      }

      const { data, error } = await query.limit(100);
      if (error) throw error;
      return data;
    },
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      present: "default",
      late: "secondary",
      absent: "destructive",
      "half-day": "secondary",
      "on-leave": "secondary",
    };
    return (
      <Badge variant={variants[status] || "default"}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Attendance Records
        </h3>
        <p className="text-sm text-muted-foreground">
          View and search attendance records
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="searchDate">Date</Label>
          <Input
            id="searchDate"
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="employeeSearch">Search Employee</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="employeeSearch"
              placeholder="Employee ID..."
              value={employeeSearch}
              onChange={(e) => setEmployeeSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Overtime (hrs)</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : records?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              records?.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.employee_id}</TableCell>
                  <TableCell>{format(new Date(record.date), "MMM dd, yyyy")}</TableCell>
                  <TableCell>
                    {record.check_in_time
                      ? format(new Date(record.check_in_time), "HH:mm:ss")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {record.check_out_time
                      ? format(new Date(record.check_out_time), "HH:mm:ss")
                      : "-"}
                  </TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell>{Number(record.overtime_hours).toFixed(2)}</TableCell>
                  <TableCell className="capitalize">{record.marking_method}</TableCell>
                  <TableCell className="max-w-xs truncate">{record.notes || "-"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
