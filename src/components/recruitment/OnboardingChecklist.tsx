import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function OnboardingChecklist() {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const mockOnboarding = [
    {
      id: "1",
      employee: "Sarah Johnson",
      position: "Senior Software Engineer",
      joiningDate: "2025-11-01",
      progress: 75,
      status: "In Progress",
      tasksCompleted: 9,
      totalTasks: 12,
    },
    {
      id: "2",
      employee: "Michael Chen",
      position: "HR Manager",
      joiningDate: "2025-11-15",
      progress: 100,
      status: "Completed",
      tasksCompleted: 12,
      totalTasks: 12,
    },
    {
      id: "3",
      employee: "Emily Davis",
      position: "Marketing Intern",
      joiningDate: "2025-12-01",
      progress: 25,
      status: "In Progress",
      tasksCompleted: 3,
      totalTasks: 12,
    },
  ];

  const onboardingTasks = [
    {
      category: "Documentation",
      tasks: [
        { id: 1, name: "Employment contract signed", completed: true },
        { id: 2, name: "Tax forms (W-4, I-9) submitted", completed: true },
        { id: 3, name: "Bank details for payroll", completed: true },
        { id: 4, name: "Emergency contact information", completed: false },
      ],
    },
    {
      category: "System Setup",
      tasks: [
        { id: 5, name: "Email account created", completed: true },
        { id: 6, name: "Access credentials provided", completed: true },
        { id: 7, name: "Software licenses assigned", completed: true },
        { id: 8, name: "Hardware equipment delivered", completed: false },
      ],
    },
    {
      category: "Orientation",
      tasks: [
        { id: 9, name: "Company policies reviewed", completed: true },
        { id: 10, name: "Team introduction completed", completed: true },
        { id: 11, name: "Office tour completed", completed: true },
        { id: 12, name: "Training schedule provided", completed: false },
      ],
    },
  ];

  const handleTaskToggle = (taskId: number) => {
    toast.success("Task status updated");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Onboarding Checklist
          </h2>
          <p className="text-sm text-muted-foreground">
            Track new employee onboarding progress
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Employees" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Employees</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Search by name..." className="max-w-sm" />
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Joining Date</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Tasks</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOnboarding.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.employee}</TableCell>
                <TableCell>{item.position}</TableCell>
                <TableCell>{item.joiningDate}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={item.progress} className="w-[100px]" />
                    <span className="text-sm text-muted-foreground">
                      {item.progress}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {item.tasksCompleted}/{item.totalTasks}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      item.status === "Completed"
                        ? "bg-hrms-success text-hrms-success-foreground"
                        : "bg-hrms-info text-hrms-info-foreground"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedEmployee(item)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!selectedEmployee}
        onOpenChange={() => setSelectedEmployee(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Onboarding Checklist</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedEmployee.employee}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedEmployee.position} • Joining:{" "}
                    {selectedEmployee.joiningDate}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {selectedEmployee.progress}%
                  </div>
                  <p className="text-sm text-muted-foreground">Complete</p>
                </div>
              </div>

              <div className="space-y-6">
                {onboardingTasks.map((category) => (
                  <div key={category.category} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-foreground">
                        {category.category}
                      </h4>
                      <Badge variant="outline">
                        {category.tasks.filter((t) => t.completed).length}/
                        {category.tasks.length}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {category.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <Checkbox
                            id={`task-${task.id}`}
                            checked={task.completed}
                            onCheckedChange={() => handleTaskToggle(task.id)}
                          />
                          <Label
                            htmlFor={`task-${task.id}`}
                            className={`flex-1 cursor-pointer ${
                              task.completed
                                ? "text-muted-foreground line-through"
                                : ""
                            }`}
                          >
                            {task.name}
                          </Label>
                          {task.completed && (
                            <CheckCircle2 className="h-4 w-4 text-hrms-success" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedEmployee(null)}
                >
                  Close
                </Button>
                <Button className="bg-primary hover:bg-primary-hover">
                  Mark All Complete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
