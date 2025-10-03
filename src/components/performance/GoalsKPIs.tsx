import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function GoalsKPIs() {
  const [showForm, setShowForm] = useState(false);

  const goals = [
    {
      id: "1",
      employee: "John Doe",
      title: "Increase sales by 20%",
      description: "Focus on new client acquisition",
      category: "Sales",
      targetDate: "2024-12-31",
      progress: 65,
      status: "on-track",
    },
    {
      id: "2",
      employee: "Jane Smith",
      title: "Complete project certification",
      description: "AWS Solutions Architect certification",
      category: "Professional Development",
      targetDate: "2024-09-30",
      progress: 40,
      status: "at-risk",
    },
    {
      id: "3",
      employee: "Mike Johnson",
      title: "Reduce customer churn by 15%",
      description: "Improve customer retention strategies",
      category: "Customer Success",
      targetDate: "2024-11-30",
      progress: 80,
      status: "on-track",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      "on-track": "default",
      "at-risk": "destructive",
      completed: "secondary",
    };
    return (
      <Badge variant={variants[status]}>
        {status.replace("-", " ").toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Goals & KPIs
          </CardTitle>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </CardHeader>
        <CardContent>
          {showForm && (
            <div className="border rounded-lg p-6 mb-6 space-y-4 bg-muted/50">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Employee</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emp1">John Doe</SelectItem>
                      <SelectItem value="emp2">Jane Smith</SelectItem>
                      <SelectItem value="emp3">Mike Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="dev">Professional Development</SelectItem>
                      <SelectItem value="cs">Customer Success</SelectItem>
                      <SelectItem value="ops">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Goal Title</Label>
                <Input placeholder="Enter goal title" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Describe the goal in detail" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Target Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Initial Progress (%)</Label>
                  <Input type="number" placeholder="0" min="0" max="100" />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button>Save Goal</Button>
              </div>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Goal Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Target Date</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {goals.map((goal) => (
                <TableRow key={goal.id}>
                  <TableCell className="font-medium">{goal.employee}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{goal.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {goal.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{goal.category}</TableCell>
                  <TableCell>{goal.targetDate}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress value={goal.progress} className="w-24" />
                      <span className="text-xs text-muted-foreground">
                        {goal.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(goal.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
