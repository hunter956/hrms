import { useState, useMemo } from "react";
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

// Hardcoded attendance records
const mockRecords = [
  {
    id: "1",
    employee_id: "EMP001",
    date: "2025-10-06",
    check_in_time: "2025-10-06T09:00:00",
    check_out_time: "2025-10-06T18:00:00",
    status: "present",
    overtime_hours: 0,
    marking_method: "biometric",
    notes: null,
  },
  {
    id: "2",
    employee_id: "EMP002",
    date: "2025-10-06",
    check_in_time: "2025-10-06T09:15:00",
    check_out_time: "2025-10-06T18:30:00",
    status: "late",
    overtime_hours: 0.5,
    marking_method: "biometric",
    notes: "Arrived 15 minutes late",
  },
  {
    id: "3",
    employee_id: "EMP003",
    date: "2025-10-06",
    check_in_time: null,
    check_out_time: null,
    status: "absent",
    overtime_hours: 0,
    marking_method: "manual",
    notes: "Unexcused absence",
  },
  {
    id: "4",
    employee_id: "EMP004",
    date: "2025-10-06",
    check_in_time: "2025-10-06T09:05:00",
    check_out_time: "2025-10-06T20:00:00",
    status: "present",
    overtime_hours: 2,
    marking_method: "biometric",
    notes: "Working on urgent project",
  },
  {
    id: "5",
    employee_id: "EMP005",
    date: "2025-10-06",
    check_in_time: "2025-10-06T09:00:00",
    check_out_time: "2025-10-06T13:00:00",
    status: "half-day",
    overtime_hours: 0,
    marking_method: "manual",
    notes: "Medical appointment",
  },
  {
    id: "6",
    employee_id: "EMP001",
    date: "2025-10-05",
    check_in_time: "2025-10-05T08:55:00",
    check_out_time: "2025-10-05T17:30:00",
    status: "present",
    overtime_hours: 0,
    marking_method: "biometric",
    notes: null,
  },
  {
    id: "7",
    employee_id: "EMP006",
    date: "2025-10-06",
    check_in_time: null,
    check_out_time: null,
    status: "on-leave",
    overtime_hours: 0,
    marking_method: "manual",
    notes: "Approved annual leave",
  },
  {
    id: "8",
    employee_id: "EMP007",
    date: "2025-10-06",
    check_in_time: "2025-10-06T09:20:00",
    check_out_time: "2025-10-06T18:00:00",
    status: "late",
    overtime_hours: 0,
    marking_method: "biometric",
    notes: "Traffic delay",
  },
];

export function AttendanceTable() {
  const [searchDate, setSearchDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [employeeSearch, setEmployeeSearch] = useState("");

  // Filter records based on search criteria
  const records = useMemo(() => {
    return mockRecords.filter((record) => {
      const matchesDate = !searchDate || record.date === searchDate;
      const matchesEmployee = !employeeSearch || 
        record.employee_id.toLowerCase().includes(employeeSearch.toLowerCase());
      return matchesDate && matchesEmployee;
    });
  }, [searchDate, employeeSearch]);

  const isLoading = false;

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