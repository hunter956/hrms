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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Users } from "lucide-react";
import { format } from "date-fns";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function RosterManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    employee_id: "",
    shift_id: "",
    effective_from: format(new Date(), "yyyy-MM-dd"),
    effective_to: "",
    days_of_week: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  });

  const { data: rosters, isLoading } = useQuery({
    queryKey: ["rosters"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rosters")
        .select("*, shifts(*)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: shifts } = useQuery({
    queryKey: ["shifts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("shifts").select("*");
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from("rosters").insert({
        employee_id: data.employee_id,
        shift_id: data.shift_id,
        effective_from: data.effective_from,
        effective_to: data.effective_to || null,
        days_of_week: data.days_of_week,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Roster created successfully" });
      queryClient.invalidateQueries({ queryKey: ["rosters"] });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create roster",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("rosters").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Roster deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["rosters"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete roster",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      employee_id: "",
      shift_id: "",
      effective_from: format(new Date(), "yyyy-MM-dd"),
      effective_to: "",
      days_of_week: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    });
  };

  const handleDayToggle = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      days_of_week: prev.days_of_week.includes(day)
        ? prev.days_of_week.filter((d) => d !== day)
        : [...prev.days_of_week, day],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.days_of_week.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one day",
        variant: "destructive",
      });
      return;
    }
    createMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Users className="h-5 w-5" />
            Roster Management
          </h3>
          <p className="text-sm text-muted-foreground">
            Assign shifts to employees
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Assign Roster
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Create Roster Assignment</DialogTitle>
                <DialogDescription>
                  Assign a shift schedule to an employee
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="employee_id">Employee ID *</Label>
                  <Input
                    id="employee_id"
                    required
                    value={formData.employee_id}
                    onChange={(e) =>
                      setFormData({ ...formData, employee_id: e.target.value })
                    }
                    placeholder="Enter employee ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shift_id">Shift *</Label>
                  <Select
                    value={formData.shift_id}
                    onValueChange={(value) =>
                      setFormData({ ...formData, shift_id: value })
                    }
                    required
                  >
                    <SelectTrigger id="shift_id">
                      <SelectValue placeholder="Select a shift" />
                    </SelectTrigger>
                    <SelectContent>
                      {shifts?.map((shift) => (
                        <SelectItem key={shift.id} value={shift.id}>
                          {shift.name} ({shift.start_time} - {shift.end_time})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="effective_from">Effective From *</Label>
                    <Input
                      id="effective_from"
                      type="date"
                      required
                      value={formData.effective_from}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          effective_from: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="effective_to">Effective To</Label>
                    <Input
                      id="effective_to"
                      type="date"
                      value={formData.effective_to}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          effective_to: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Working Days *</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {DAYS_OF_WEEK.map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox
                          id={day}
                          checked={formData.days_of_week.includes(day)}
                          onCheckedChange={() => handleDayToggle(day)}
                        />
                        <label
                          htmlFor={day}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {day}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending}>
                  Create Roster
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee ID</TableHead>
              <TableHead>Shift</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Working Days</TableHead>
              <TableHead>Effective From</TableHead>
              <TableHead>Effective To</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : rosters?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No rosters found. Create your first roster assignment!
                </TableCell>
              </TableRow>
            ) : (
              rosters?.map((roster) => (
                <TableRow key={roster.id}>
                  <TableCell className="font-medium">
                    {roster.employee_id}
                  </TableCell>
                  <TableCell>{roster.shifts?.name}</TableCell>
                  <TableCell>
                    {roster.shifts?.start_time} - {roster.shifts?.end_time}
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {roster.days_of_week?.map((day) => (
                        <span
                          key={day}
                          className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs"
                        >
                          {day.slice(0, 3)}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(new Date(roster.effective_from), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    {roster.effective_to
                      ? format(new Date(roster.effective_to), "MMM dd, yyyy")
                      : "Ongoing"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMutation.mutate(roster.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
