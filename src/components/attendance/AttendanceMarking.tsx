import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Clock, LogIn, LogOut } from "lucide-react";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDateTime = (date) => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  return `${monthNames[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`;
};

const formatTime = (isoString) => {
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

export function AttendanceMarking() {
  const { toast } = useToast();
  const [employeeId, setEmployeeId] = useState("");
  const [markingMethod, setMarkingMethod] = useState("manual");
  const [notes, setNotes] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState({});

  const today = formatDate(new Date());
  const todayAttendance = attendanceRecords[`${employeeId}-${today}`] || null;

  const handleCheckIn = () => {
    if (!employeeId) {
      toast({
        title: "Error",
        description: "Please enter employee ID",
        variant: "destructive",
      });
      return;
    }

    const recordKey = `${employeeId}-${today}`;
    setAttendanceRecords({
      ...attendanceRecords,
      [recordKey]: {
        id: String(Date.now()),
        employee_id: employeeId,
        date: today,
        check_in_time: new Date().toISOString(),
        check_out_time: null,
        status: "present",
        marking_method: markingMethod,
        notes: notes || null,
        overtime_hours: 0,
      },
    });

    toast({ title: "Success", description: "Checked in successfully" });
    setNotes("");
  };

  const handleCheckOut = () => {
    if (!todayAttendance?.id) {
      toast({
        title: "Error",
        description: "No check-in record found",
        variant: "destructive",
      });
      return;
    }

    const checkInTime = new Date(todayAttendance.check_in_time);
    const checkOutTime = new Date();
    const hoursWorked = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);
    const overtimeHours = Math.max(0, hoursWorked - 8);

    const recordKey = `${employeeId}-${today}`;
    setAttendanceRecords({
      ...attendanceRecords,
      [recordKey]: {
        ...todayAttendance,
        check_out_time: checkOutTime.toISOString(),
        overtime_hours: parseFloat(overtimeHours.toFixed(2)),
        notes: notes || todayAttendance.notes,
      },
    });

    toast({ title: "Success", description: "Checked out successfully" });
    setNotes("");
  };

  const hasCheckedIn = !!todayAttendance?.check_in_time;
  const hasCheckedOut = !!todayAttendance?.check_out_time;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Daily Attendance Marking
        </h3>
        <p className="text-sm text-muted-foreground">
          Mark employee attendance for {formatDateTime(new Date())}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="employeeId">Employee ID</Label>
          <Input
            id="employeeId"
            placeholder="Enter employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="method">Marking Method</Label>
          <Select value={markingMethod} onValueChange={setMarkingMethod}>
            <SelectTrigger id="method">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="biometric">Biometric</SelectItem>
              <SelectItem value="punch">Punch In/Out</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          placeholder="Add any notes about this attendance record..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {todayAttendance && (
        <div className="p-4 bg-muted rounded-lg space-y-2">
          <p className="text-sm font-medium">Today's Status:</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Check In:</span>{" "}
              <span className="font-medium">
                {todayAttendance.check_in_time
                  ? formatTime(todayAttendance.check_in_time)
                  : "Not checked in"}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Check Out:</span>{" "}
              <span className="font-medium">
                {todayAttendance.check_out_time
                  ? formatTime(todayAttendance.check_out_time)
                  : "Not checked out"}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <Button
          onClick={handleCheckIn}
          disabled={!employeeId || hasCheckedIn}
          className="flex-1"
        >
          <LogIn className="mr-2 h-4 w-4" />
          Check In
        </Button>
        <Button
          onClick={handleCheckOut}
          disabled={!employeeId || !hasCheckedIn || hasCheckedOut}
          variant="outline"
          className="flex-1"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Check Out
        </Button>
      </div>
    </div>
  );
}