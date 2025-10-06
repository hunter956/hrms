import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Clock } from "lucide-react";

// Hardcoded shifts data
const initialShifts = [
  {
    id: "1",
    name: "Morning Shift",
    start_time: "09:00",
    end_time: "17:00",
    grace_period_minutes: 15,
    description: "Standard morning shift for office staff",
    created_at: "2025-10-01T00:00:00",
  },
  {
    id: "2",
    name: "Evening Shift",
    start_time: "14:00",
    end_time: "22:00",
    grace_period_minutes: 10,
    description: "Evening shift for customer support",
    created_at: "2025-10-02T00:00:00",
  },
  {
    id: "3",
    name: "Night Shift",
    start_time: "22:00",
    end_time: "06:00",
    grace_period_minutes: 20,
    description: "Night shift for 24/7 operations",
    created_at: "2025-10-03T00:00:00",
  },
  {
    id: "4",
    name: "Full Day",
    start_time: "08:00",
    end_time: "18:00",
    grace_period_minutes: 15,
    description: "Extended full day shift",
    created_at: "2025-10-04T00:00:00",
  },
];

export function ShiftManagement() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<any>(null);
  const [shifts, setShifts] = useState(initialShifts);

  const [formData, setFormData] = useState({
    name: "",
    start_time: "",
    end_time: "",
    grace_period_minutes: 0,
    description: "",
  });

  const isLoading = false;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newShift = {
      id: Date.now().toString(),
      name: formData.name,
      start_time: formData.start_time,
      end_time: formData.end_time,
      grace_period_minutes: formData.grace_period_minutes,
      description: formData.description,
      created_at: new Date().toISOString(),
    };

    setShifts([newShift, ...shifts]);
    toast({ title: "Success", description: "Shift created successfully" });
    setIsDialogOpen(false);
    resetForm();
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    setShifts(
      shifts.map((shift) =>
        shift.id === editingShift.id
          ? {
              ...shift,
              name: formData.name,
              start_time: formData.start_time,
              end_time: formData.end_time,
              grace_period_minutes: formData.grace_period_minutes,
              description: formData.description,
            }
          : shift
      )
    );
    toast({ title: "Success", description: "Shift updated successfully" });
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setShifts(shifts.filter((shift) => shift.id !== id));
    toast({ title: "Success", description: "Shift deleted successfully" });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      start_time: "",
      end_time: "",
      grace_period_minutes: 0,
      description: "",
    });
    setEditingShift(null);
  };

  const handleEdit = (shift: any) => {
    setEditingShift(shift);
    setFormData({
      name: shift.name,
      start_time: shift.start_time,
      end_time: shift.end_time,
      grace_period_minutes: shift.grace_period_minutes,
      description: shift.description || "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (editingShift) {
      handleUpdate(e);
    } else {
      handleCreate(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Shift Management
          </h3>
          <p className="text-sm text-muted-foreground">
            Create and manage work shifts
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="px-6 py-3 h-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add Shift
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {editingShift ? "Edit Shift" : "Create New Shift"}
                </DialogTitle>
                <DialogDescription>
                  Define shift timings and grace period
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Shift Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Morning Shift"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start_time">Start Time *</Label>
                    <Input
                      id="start_time"
                      type="time"
                      required
                      value={formData.start_time}
                      onChange={(e) =>
                        setFormData({ ...formData, start_time: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end_time">End Time *</Label>
                    <Input
                      id="end_time"
                      type="time"
                      required
                      value={formData.end_time}
                      onChange={(e) =>
                        setFormData({ ...formData, end_time: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grace_period">Grace Period (minutes)</Label>
                  <Input
                    id="grace_period"
                    type="number"
                    min="0"
                    value={formData.grace_period_minutes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        grace_period_minutes: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Optional description..."
                  />
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
                <Button type="submit">
                  {editingShift ? "Update" : "Create"}
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
              <TableHead>Shift Name</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Grace Period</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : shifts?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No shifts found. Create your first shift!
                </TableCell>
              </TableRow>
            ) : (
              shifts?.map((shift) => (
                <TableRow key={shift.id}>
                  <TableCell className="font-medium">{shift.name}</TableCell>
                  <TableCell>{shift.start_time}</TableCell>
                  <TableCell>{shift.end_time}</TableCell>
                  <TableCell>{shift.grace_period_minutes} min</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {shift.description || "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(shift)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(shift.id)}
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