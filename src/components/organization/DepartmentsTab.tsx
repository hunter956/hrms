import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const initialDepartments = [
  {
    id: "1",
    name: "Operations",
    description: "Handles day-to-day operations",
    parent_department_id: null,
  },
  {
    id: "2",
    name: "Logistics",
    description: "Oversees logistics and supply chain",
    parent_department_id: "1",
  },
  {
    id: "3",
    name: "Finance",
    description: "Manages company finances",
    parent_department_id: null,
  },
  {
    id: "4",
    name: "Payroll",
    description: "Manages employee payroll",
    parent_department_id: "3",
  },
];

export function DepartmentsTab() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [departments, setDepartments] = useState(initialDepartments);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parent_department_id: "",
  });
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({ name: "", description: "", parent_department_id: "" });
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setDepartments(departments.map(dept => 
        dept.id === editingId 
          ? { ...dept, ...formData, parent_department_id: formData.parent_department_id || null }
          : dept
      ));
      toast({ title: "Department updated successfully" });
    } else {
      const newDept = {
        id: String(Date.now()),
        name: formData.name,
        description: formData.description,
        parent_department_id: formData.parent_department_id || null,
      };
      setDepartments([...departments, newDept]);
      toast({ title: "Department created successfully" });
    }
    setIsOpen(false);
    resetForm();
  };

  const handleEdit = (dept: any) => {
    setFormData({
      name: dept.name,
      description: dept.description || "",
      parent_department_id: dept.parent_department_id || "",
    });
    setEditingId(dept.id);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    setDepartments(departments.filter(dept => dept.id !== id));
    toast({ title: "Department deleted successfully" });
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-elevated">
      <CardHeader className="border-b border-border/50 bg-gradient-primary/5">
        <div className="flex items-center justify-between">
          <CardTitle>Departments</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="px-6 py-3 h-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit Department" : "Add New Department"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Department Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  <Label htmlFor="parent">Parent Department</Label>
                  <Select
                    value={formData.parent_department_id}
                    onValueChange={(value) => setFormData({ ...formData, parent_department_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select parent department (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {departments?.filter(d => d.id !== editingId).map((dept) => (
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
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Parent Department</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments?.map((dept) => (
              <TableRow key={dept.id}>
                <TableCell className="font-medium">{dept.name}</TableCell>
                <TableCell>{dept.description}</TableCell>
                <TableCell>
                  {departments.find(d => d.id === dept.parent_department_id)?.name || "-"}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(dept)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(dept.id)}
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