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
  },
  {
    id: "2",
    name: "Logistics",
  },
  {
    id: "3",
    name: "Finance",
  },
  {
    id: "4",
    name: "Payroll",
  },
];

const initialBranches = [
  {
    id: "1",
    name: "Head Office",
    location: "New York, USA",
    address: "Main corporate headquarters",
    department_id: null,
  },
  {
    id: "2",
    name: "Branch A",
    location: "London, UK",
    address: "European operations center",
    department_id: null,
  },
  {
    id: "3",
    name: "Branch B",
    location: "Tokyo, Japan",
    address: "APAC regional branch",
    department_id: null,
  },
];

export function BranchesTab() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [branches, setBranches] = useState(initialBranches);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    address: "",
    department_id: "",
  });
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({ name: "", location: "", address: "", department_id: "" });
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setBranches(branches.map(branch => 
        branch.id === editingId 
          ? { ...branch, ...formData, department_id: formData.department_id || null }
          : branch
      ));
      toast({ title: "Branch updated successfully" });
    } else {
      const newBranch = {
        id: String(Date.now()),
        name: formData.name,
        location: formData.location,
        address: formData.address,
        department_id: formData.department_id || null,
      };
      setBranches([...branches, newBranch]);
      toast({ title: "Branch created successfully" });
    }
    setIsOpen(false);
    resetForm();
  };

  const handleEdit = (branch: any) => {
    setFormData({
      name: branch.name,
      location: branch.location || "",
      address: branch.address || "",
      department_id: branch.department_id || "",
    });
    setEditingId(branch.id);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    setBranches(branches.filter(branch => branch.id !== id));
    toast({ title: "Branch deleted successfully" });
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-elevated">
      <CardHeader className="border-b border-border/50 bg-gradient-primary/5">
        <div className="flex items-center justify-between">
          <CardTitle>Branches</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="px-6 py-3 h-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Branch
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit Branch" : "Add New Branch"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Branch Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
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
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {branches?.map((branch) => (
              <TableRow key={branch.id}>
                <TableCell className="font-medium">{branch.name}</TableCell>
                <TableCell>{branch.location || "-"}</TableCell>
                <TableCell>
                  {initialDepartments.find(d => d.id === branch.department_id)?.name || "-"}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(branch)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(branch.id)}
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