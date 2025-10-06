import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, DollarSign } from "lucide-react";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function SalaryStructure() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [nextId, setNextId] = useState(4);

  const [structures, setStructures] = useState([
    {
      id: "1",
      employee_id: "EMP001",
      basic_salary: 30000,
      hra: 12000,
      transport_allowance: 3000,
      medical_allowance: 2000,
      special_allowance: 5000,
      other_allowances: 3000,
      effective_from: "2025-01-01",
      created_at: "2025-01-01T00:00:00Z"
    },
    {
      id: "2",
      employee_id: "EMP002",
      basic_salary: 40000,
      hra: 16000,
      transport_allowance: 4000,
      medical_allowance: 2500,
      special_allowance: 7000,
      other_allowances: 4000,
      effective_from: "2025-01-01",
      created_at: "2025-01-01T00:00:00Z"
    },
    {
      id: "3",
      employee_id: "EMP003",
      basic_salary: 50000,
      hra: 20000,
      transport_allowance: 5000,
      medical_allowance: 3000,
      special_allowance: 9000,
      other_allowances: 5000,
      effective_from: "2025-01-01",
      created_at: "2025-01-01T00:00:00Z"
    }
  ]);

  const [formData, setFormData] = useState({
    employee_id: "",
    basic_salary: "",
    hra: "",
    transport_allowance: "",
    medical_allowance: "",
    special_allowance: "",
    other_allowances: "",
    effective_from: getCurrentDate(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      employee_id: "",
      basic_salary: "",
      hra: "",
      transport_allowance: "",
      medical_allowance: "",
      special_allowance: "",
      other_allowances: "",
      effective_from: getCurrentDate(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const payload = {
        employee_id: formData.employee_id,
        basic_salary: parseFloat(formData.basic_salary) || 0,
        hra: parseFloat(formData.hra) || 0,
        transport_allowance: parseFloat(formData.transport_allowance) || 0,
        medical_allowance: parseFloat(formData.medical_allowance) || 0,
        special_allowance: parseFloat(formData.special_allowance) || 0,
        other_allowances: parseFloat(formData.other_allowances) || 0,
        effective_from: formData.effective_from,
      };

      if (editingId) {
        // Update existing structure
        setStructures(structures.map(s => 
          s.id === editingId ? { ...s, ...payload } : s
        ));
        alert("Salary structure updated");
      } else {
        // Add new structure
        const newStructure = {
          ...payload,
          id: nextId.toString(),
          created_at: new Date().toISOString()
        };
        setStructures([newStructure, ...structures]);
        setNextId(nextId + 1);
        alert("Salary structure created");
      }

      setIsDialogOpen(false);
      setEditingId(null);
      resetForm();
    } catch (error) {
      alert("Failed to save salary structure: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (structure) => {
    setEditingId(structure.id);
    setFormData({
      employee_id: structure.employee_id,
      basic_salary: structure.basic_salary.toString(),
      hra: structure.hra.toString(),
      transport_allowance: structure.transport_allowance.toString(),
      medical_allowance: structure.medical_allowance.toString(),
      special_allowance: structure.special_allowance.toString(),
      other_allowances: structure.other_allowances.toString(),
      effective_from: structure.effective_from,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this salary structure?")) {
      setStructures(structures.filter(s => s.id !== id));
      alert("Salary structure deleted");
    }
  };

  const calculateTotal = (structure) => {
    return (
      parseFloat(structure.basic_salary) +
      parseFloat(structure.hra) +
      parseFloat(structure.transport_allowance) +
      parseFloat(structure.medical_allowance) +
      parseFloat(structure.special_allowance) +
      parseFloat(structure.other_allowances)
    );
  };

  const handleOpenDialog = () => {
    setEditingId(null);
    resetForm();
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Salary Structure Management
            </CardTitle>
            <CardDescription>
              Define salary components for employees
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenDialog} className="px-6 py-3 h-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Structure
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit" : "Add"} Salary Structure
                </DialogTitle>
                <DialogDescription>
                  Define salary components for an employee
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Employee ID</label>
                  <Input
                    name="employee_id"
                    value={formData.employee_id}
                    onChange={handleInputChange}
                    placeholder="Enter employee ID"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Basic Salary</label>
                    <Input
                      name="basic_salary"
                      type="number"
                      step="0.01"
                      value={formData.basic_salary}
                      onChange={handleInputChange}
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">HRA</label>
                    <Input
                      name="hra"
                      type="number"
                      step="0.01"
                      value={formData.hra}
                      onChange={handleInputChange}
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Transport Allowance</label>
                    <Input
                      name="transport_allowance"
                      type="number"
                      step="0.01"
                      value={formData.transport_allowance}
                      onChange={handleInputChange}
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Medical Allowance</label>
                    <Input
                      name="medical_allowance"
                      type="number"
                      step="0.01"
                      value={formData.medical_allowance}
                      onChange={handleInputChange}
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Special Allowance</label>
                    <Input
                      name="special_allowance"
                      type="number"
                      step="0.01"
                      value={formData.special_allowance}
                      onChange={handleInputChange}
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Other Allowances</label>
                    <Input
                      name="other_allowances"
                      type="number"
                      step="0.01"
                      value={formData.other_allowances}
                      onChange={handleInputChange}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Effective From</label>
                  <Input
                    name="effective_from"
                    type="date"
                    value={formData.effective_from}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium">Employee ID</th>
                <th className="text-left p-2 font-medium">Basic</th>
                <th className="text-left p-2 font-medium">HRA</th>
                <th className="text-left p-2 font-medium">Transport</th>
                <th className="text-left p-2 font-medium">Medical</th>
                <th className="text-left p-2 font-medium">Special</th>
                <th className="text-left p-2 font-medium">Other</th>
                <th className="text-left p-2 font-medium">Total</th>
                <th className="text-left p-2 font-medium">Effective From</th>
                <th className="text-left p-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {structures.map((structure) => (
                <tr key={structure.id} className="border-b">
                  <td className="p-2">{structure.employee_id}</td>
                  <td className="p-2">₹{structure.basic_salary}</td>
                  <td className="p-2">₹{structure.hra}</td>
                  <td className="p-2">₹{structure.transport_allowance}</td>
                  <td className="p-2">₹{structure.medical_allowance}</td>
                  <td className="p-2">₹{structure.special_allowance}</td>
                  <td className="p-2">₹{structure.other_allowances}</td>
                  <td className="p-2 font-semibold">
                    ₹{calculateTotal(structure).toFixed(2)}
                  </td>
                  <td className="p-2">{formatDate(structure.effective_from)}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(structure)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(structure.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}