import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Star, TrendingUp, FileText, Plus, Edit, Trash2, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const PerformanceRating = () => {
  const [showForm, setShowForm] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);

  const ratings = [
    {
      id: "1",
      employee: "John Doe",
      position: "Senior Sales Executive",
      department: "Sales",
      period: "Q3 2024",
      selfRating: 4.2,
      managerRating: 4.5,
      finalRating: 4.4,
      status: "completed",
      trend: "up",
      feedback: "Exceptional performance in client acquisition and team collaboration.",
      goals: "Exceeded sales targets by 25%",
    },
    {
      id: "2",
      employee: "Jane Smith",
      position: "Software Engineer",
      department: "Engineering",
      period: "Q3 2024",
      selfRating: 4.0,
      managerRating: 4.2,
      finalRating: 4.1,
      status: "completed",
      trend: "stable",
      feedback: "Strong technical skills and consistent delivery of quality code.",
      goals: "Completed 3 major features on time",
    },
    {
      id: "3",
      employee: "Mike Johnson",
      position: "Customer Success Manager",
      department: "Customer Success",
      period: "Q3 2024",
      selfRating: 3.8,
      managerRating: 4.0,
      finalRating: 3.9,
      status: "pending",
      trend: "down",
      feedback: "Good customer handling, needs improvement in response time.",
      goals: "Maintained customer satisfaction above 85%",
    },
  ];

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-sky-600";
    if (rating >= 3.0) return "text-yellow-600";
    return "text-red-600";
  };

  const getRatingBadge = (rating) => {
    if (rating >= 4.5) return { label: "Outstanding", variant: "default" };
    if (rating >= 4.0) return { label: "Exceeds", variant: "secondary" };
    if (rating >= 3.0) return { label: "Meets", variant: "secondary" };
    return { label: "Needs Improvement", variant: "destructive" };
  };

  const handleView = (rating) => {
    setSelectedRating(rating);
    setViewDialogOpen(true);
  };

  const handleEdit = (rating) => {
    setSelectedRating(rating);
    setEditDialogOpen(true);
  };

  const handleDelete = (rating) => {
    setSelectedRating(rating);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleting rating:", selectedRating?.id);
    setDeleteDialogOpen(false);
    setSelectedRating(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.1 / 5.0</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "82%" }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              +0.2 from previous period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground mt-2">
              Rating ≥ 4.5 (12% of workforce)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Reviews
            </CardTitle>
            <FileText className="h-4 w-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "87%" }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              132 of 152 reviews completed
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Performance Ratings Overview
          </CardTitle>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Rating
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
                  <Label>Period</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="q1">Q1 2024</SelectItem>
                      <SelectItem value="q2">Q2 2024</SelectItem>
                      <SelectItem value="q3">Q3 2024</SelectItem>
                      <SelectItem value="q4">Q4 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Self Rating (0-5)</Label>
                  <Input type="number" placeholder="0.0" min="0" max="5" step="0.1" />
                </div>
                <div className="space-y-2">
                  <Label>Manager Rating (0-5)</Label>
                  <Input type="number" placeholder="0.0" min="0" max="5" step="0.1" />
                </div>
                <div className="space-y-2">
                  <Label>Final Rating (0-5)</Label>
                  <Input type="number" placeholder="0.0" min="0" max="5" step="0.1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Feedback</Label>
                <Textarea placeholder="Enter performance feedback" />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button>Save Rating</Button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-semibold">Employee</th>
                  <th className="text-left p-4 font-semibold">Position</th>
                  <th className="text-left p-4 font-semibold">Department</th>
                  <th className="text-left p-4 font-semibold">Period</th>
                  <th className="text-left p-4 font-semibold">Self Rating</th>
                  <th className="text-left p-4 font-semibold">Manager Rating</th>
                  <th className="text-left p-4 font-semibold">Final Rating</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ratings.map((rating) => {
                  const badge = getRatingBadge(rating.finalRating);
                  return (
                    <tr key={rating.id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{rating.employee}</td>
                      <td className="p-4">{rating.position}</td>
                      <td className="p-4">{rating.department}</td>
                      <td className="p-4">{rating.period}</td>
                      <td className="p-4">
                        <span className={getRatingColor(rating.selfRating)}>
                          {rating.selfRating.toFixed(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={getRatingColor(rating.managerRating)}>
                          {rating.managerRating.toFixed(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${getRatingColor(rating.finalRating)}`}>
                            {rating.finalRating.toFixed(1)}
                          </span>
                          <Badge variant={badge.variant}>{badge.label}</Badge>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={rating.status === "completed" ? "secondary" : "default"}>
                          {rating.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleView(rating)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(rating)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(rating)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* View Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Performance Review Details</DialogTitle>
            <DialogDescription>
              Complete performance review for {selectedRating?.employee}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Employee</Label>
                <p className="font-medium">{selectedRating?.employee}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Position</Label>
                <p className="font-medium">{selectedRating?.position}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Department</Label>
                <p className="font-medium">{selectedRating?.department}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Period</Label>
                <p className="font-medium">{selectedRating?.period}</p>
              </div>
            </div>
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <Label>Self Rating:</Label>
                <span className={`font-bold text-lg ${getRatingColor(selectedRating?.selfRating || 0)}`}>
                  {selectedRating?.selfRating.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <Label>Manager Rating:</Label>
                <span className={`font-bold text-lg ${getRatingColor(selectedRating?.managerRating || 0)}`}>
                  {selectedRating?.managerRating.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <Label>Final Rating:</Label>
                <span className={`font-bold text-lg ${getRatingColor(selectedRating?.finalRating || 0)}`}>
                  {selectedRating?.finalRating.toFixed(1)}
                </span>
              </div>
            </div>
            <div className="border-t pt-4">
              <Label className="text-muted-foreground">Feedback</Label>
              <p className="mt-2 text-sm">{selectedRating?.feedback}</p>
            </div>
            <div className="border-t pt-4">
              <Label className="text-muted-foreground">Goals Achievement</Label>
              <p className="mt-2 text-sm">{selectedRating?.goals}</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Performance Rating</DialogTitle>
            <DialogDescription>
              Update the performance rating details below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Employee</Label>
                <Input defaultValue={selectedRating?.employee} disabled />
              </div>
              <div className="space-y-2">
                <Label>Period</Label>
                <Select defaultValue={selectedRating?.period}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Q1 2024">Q1 2024</SelectItem>
                    <SelectItem value="Q2 2024">Q2 2024</SelectItem>
                    <SelectItem value="Q3 2024">Q3 2024</SelectItem>
                    <SelectItem value="Q4 2024">Q4 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Self Rating (0-5)</Label>
                <Input 
                  type="number" 
                  defaultValue={selectedRating?.selfRating} 
                  min="0" 
                  max="5" 
                  step="0.1" 
                />
              </div>
              <div className="space-y-2">
                <Label>Manager Rating (0-5)</Label>
                <Input 
                  type="number" 
                  defaultValue={selectedRating?.managerRating} 
                  min="0" 
                  max="5" 
                  step="0.1" 
                />
              </div>
              <div className="space-y-2">
                <Label>Final Rating (0-5)</Label>
                <Input 
                  type="number" 
                  defaultValue={selectedRating?.finalRating} 
                  min="0" 
                  max="5" 
                  step="0.1" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select defaultValue={selectedRating?.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Feedback</Label>
              <Textarea 
                defaultValue={selectedRating?.feedback} 
                placeholder="Enter performance feedback" 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setEditDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the performance rating for "{selectedRating?.employee}" 
              from {selectedRating?.period}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}