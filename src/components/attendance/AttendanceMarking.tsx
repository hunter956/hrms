import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
import { format } from "date-fns";
import { Clock, LogIn, LogOut } from "lucide-react";

export function AttendanceMarking() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [employeeId, setEmployeeId] = useState("");
  const [markingMethod, setMarkingMethod] = useState("manual");
  const [notes, setNotes] = useState("");

  const today = format(new Date(), "yyyy-MM-dd");

  const { data: todayAttendance } = useQuery({
    queryKey: ["today-attendance", employeeId, today],
    queryFn: async () => {
      if (!employeeId) return null;
      const { data } = await supabase
        .from("attendance_records")
        .select("*")
        .eq("employee_id", employeeId)
        .eq("date", today)
        .maybeSingle();
      return data;
    },
    enabled: !!employeeId,
  });

  const checkInMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("attendance_records").insert({
        employee_id: employeeId,
        date: today,
        check_in_time: new Date().toISOString(),
        status: "present",
        marking_method: markingMethod,
        notes: notes || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Checked in successfully" });
      queryClient.invalidateQueries({ queryKey: ["today-attendance"] });
      queryClient.invalidateQueries({ queryKey: ["attendance-stats"] });
      setNotes("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to check in",
        variant: "destructive",
      });
    },
  });

  const checkOutMutation = useMutation({
    mutationFn: async () => {
      if (!todayAttendance?.id) throw new Error("No check-in record found");
      
      const checkInTime = new Date(todayAttendance.check_in_time);
      const checkOutTime = new Date();
      const hoursWorked = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);
      const overtimeHours = Math.max(0, hoursWorked - 8); // Assuming 8-hour workday

      const { error } = await supabase
        .from("attendance_records")
        .update({
          check_out_time: checkOutTime.toISOString(),
          overtime_hours: parseFloat(overtimeHours.toFixed(2)),
          notes: notes || todayAttendance.notes,
        })
        .eq("id", todayAttendance.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Checked out successfully" });
      queryClient.invalidateQueries({ queryKey: ["today-attendance"] });
      queryClient.invalidateQueries({ queryKey: ["attendance-stats"] });
      setNotes("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to check out",
        variant: "destructive",
      });
    },
  });

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
          Mark employee attendance for {format(new Date(), "MMMM dd, yyyy")}
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
                  ? format(new Date(todayAttendance.check_in_time), "HH:mm:ss")
                  : "Not checked in"}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Check Out:</span>{" "}
              <span className="font-medium">
                {todayAttendance.check_out_time
                  ? format(new Date(todayAttendance.check_out_time), "HH:mm:ss")
                  : "Not checked out"}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <Button
          onClick={() => checkInMutation.mutate()}
          disabled={!employeeId || hasCheckedIn || checkInMutation.isPending}
          className="flex-1"
        >
          <LogIn className="mr-2 h-4 w-4" />
          Check In
        </Button>
        <Button
          onClick={() => checkOutMutation.mutate()}
          disabled={!employeeId || !hasCheckedIn || hasCheckedOut || checkOutMutation.isPending}
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
