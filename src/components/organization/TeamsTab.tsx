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
  { id: "1", name: "Operations" },
  { id: "2", name: "Logistics" },
  { id: "3", name: "Finance" },
  { id: "4", name: "Payroll" },
];

const initialBranches = [
  { id: "1", name: "Head Office" },
  { id: "2", name: "Branch A" },
  { id: "3", name: "Branch B" },
];

const initialTeams = [
  {
    id: "1",
    name: "Development Team",
    description: "Software development and engineering",
    department_id: "1",
    branch_id: "1",
  },
  {
    id: "2",
    name: "Support Team",
    description: "Customer support and assistance",
    department_id: "1",
    branch_id: "2",
  },
  {
    id: "3",
    name: "Accounting Team",
    description: "Financial reporting and accounting",
    department_id: "3",
    branch_id: "1",
  },
];

export function TeamsTab() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [teams, setTeams] = useState(initialTeams);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    department_id: "",
    branch_id: "",
  });
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({ name: "", description: "", department_id: "", branch_id: "" });
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setTeams(teams.map(team => 
        team.id === editingId 
          ? { 
              ...team, 
              ...formData, 
              department_id: formData.department_id || null,
              branch_id: formData.branch_id || null,
            }
          : team
      ));
      toast({ title: "Team updated successfully" });
    } else {
      const newTeam = {
        id: String(Date.now()),
        name: formData.name,
        description: formData.description,
        department_id: formData.department_id || null,
        branch_id: formData.branch_id || null,
      };
      setTeams([...teams, newTeam]);
      toast({ title: "Team created successfully" });
    }
    setIsOpen(false);
    resetForm();
  };

  const handleEdit = (team: any) => {
    setFormData({
      name: team.name,
      description: team.description || "",
      department_id: team.department_id || "",
      branch_id: team.branch_id || "",
    });
    setEditingId(team.id);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    setTeams(teams.filter(team => team.id !== id));
    toast({ title: "Team deleted successfully" });
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-elevated">
      <CardHeader className="border-b border-border/50 bg-gradient-primary/5">
        <div className="flex items-center justify-between">
          <CardTitle>Teams</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="px-6 py-3 h-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Team
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit Team" : "Add New Team"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Team Name *</Label>
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
                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Select
                    value={formData.branch_id}
                    onValueChange={(value) => setFormData({ ...formData, branch_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {initialBranches?.map((branch) => (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.name}
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
              <TableHead>Department</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams?.map((team) => (
              <TableRow key={team.id}>
                <TableCell className="font-medium">{team.name}</TableCell>
                <TableCell>{team.description || "-"}</TableCell>
                <TableCell>
                  {initialDepartments.find(d => d.id === team.department_id)?.name || "-"}
                </TableCell>
                <TableCell>
                  {initialBranches.find(b => b.id === team.branch_id)?.name || "-"}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(team)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(team.id)}
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