import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const initialDepartments = [
  { id: "1", name: "Operations" },
  { id: "2", name: "Logistics" },
  { id: "3", name: "Finance" },
  { id: "4", name: "Payroll" },
];

const initialDesignations = [
  {
    id: "1",
    title: "Chief Executive Officer",
    description: "Overall strategic leadership",
    level: 1,
    department_id: null,
  },
  {
    id: "2",
    title: "Vice President",
    description: "Senior executive management",
    level: 2,
    department_id: "1",
  },
  {
    id: "3",
    title: "Director",
    description: "Department head and strategic planning",
    level: 2,
    department_id: "3",
  },
  {
    id: "4",
    title: "Manager",
    description: "Team management and operations",
    level: 3,
    department_id: "1",
  },
  {
    id: "5",
    title: "Senior Associate",
    description: "Experienced professional role",
    level: 4,
    department_id: "2",
  },
  {
    id: "6",
    title: "Associate",
    description: "Entry-level professional",
    level: 5,
    department_id: null,
  },
];

export function DesignationsTab() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [designations, setDesignations] = useState(initialDesignations);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: "1",
    department_id: "",
  });
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({ title: "", description: "", level: "1", department_id: "" });
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setDesignations(designations.map(designation => 
        designation.id === editingId 
          ? { 
              ...designation, 
              title: formData.title,
              description: formData.description,
              level: parseInt(formData.level),
              department_id: formData.department_id || null,
            }
          : designation
      ));
      toast({ title: "Designation updated successfully" });
    } else {
      const newDesignation = {
        id: String(Date.now()),
        title: formData.title,
        description: formData.description,
        level: parseInt(formData.level),
        department_id: formData.department_id || null,
      };
      setDesignations([...designations, newDesignation]);
      toast({ title: "Designation created successfully" });
    }
    setIsOpen(false);
    resetForm();
  };

  const handleEdit = (designation: any) => {
    setFormData({
      title: designation.title,
      description: designation.description || "",
      level: designation.level.toString(),
      department_id: designation.department_id || "",
    });
    setEditingId(designation.id);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    setDesignations(designations.filter(designation => designation.id !== id));
    toast({ title: "Designation deleted successfully" });
  };

  const getLevelBadgeVariant = (level: number) => {
    if (level <= 2) return "default";
    if (level <= 5) return "secondary";
    return "destructive";
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-elevated">
      <CardHeader className="border-b border-border/50 bg-gradient-primary/5">
        <div className="flex items-center justify-between">
          <CardTitle>Designations & Roles</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="px-6 py-3 h-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Designation
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit Designation" : "Add New Designation"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Designation Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Hierarchy Level</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) => setFormData({ ...formData, level: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Level 1 - Executive</SelectItem>
                      <SelectItem value="2">Level 2 - Senior Management</SelectItem>
                      <SelectItem value="3">Level 3 - Middle Management</SelectItem>
                      <SelectItem value="4">Level 4 - Junior Management</SelectItem>
                      <SelectItem value="5">Level 5 - Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={formData.department_id}
                    onValueChange={(value) => setFormData({ ...formData, department_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {initialDepartments?.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-primary">
                    {editingId ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {designations?.map((designation) => (
              <TableRow key={designation.id}>
                <TableCell className="font-medium">{designation.title}</TableCell>
                <TableCell>{designation.description || "-"}</TableCell>
                <TableCell>
                  <Badge variant={getLevelBadgeVariant(designation.level)}>
                    Level {designation.level}
                  </Badge>
                </TableCell>
                <TableCell>
                  {initialDepartments.find(d => d.id === designation.department_id)?.name || "-"}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(designation)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(designation.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}