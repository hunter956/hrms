import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

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
  const [editingId, setEditingId] = useState(null);
  const [teams, setTeams] = useState(initialTeams);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    department_id: "",
    branch_id: "",
  });
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", department_id: "", branch_id: "" });
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!formData.name) return;
    
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
      showToast("Team updated successfully");
    } else {
      const newTeam = {
        id: String(Date.now()),
        name: formData.name,
        description: formData.description,
        department_id: formData.department_id || null,
        branch_id: formData.branch_id || null,
      };
      setTeams([...teams, newTeam]);
      showToast("Team created successfully");
    }
    setIsOpen(false);
    resetForm();
  };

  const handleEdit = (team) => {
    setFormData({
      name: team.name,
      description: team.description || "",
      department_id: team.department_id || "",
      branch_id: team.branch_id || "",
    });
    setEditingId(team.id);
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    setTeams(teams.filter(team => team.id !== id));
    showToast("Team deleted successfully");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-slate-200">
      <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Teams</h2>
          <button
            onClick={() => {
              resetForm();
              setIsOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add Team
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Description</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Department</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Branch</th>
                <th className="text-right py-3 px-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-800">{team.name}</td>
                  <td className="py-3 px-4 text-slate-600">{team.description || "-"}</td>
                  <td className="py-3 px-4 text-slate-600">
                    {initialDepartments.find(d => d.id === team.department_id)?.name || "-"}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {initialBranches.find(b => b.id === team.branch_id)?.name || "-"}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleEdit(team)}
                      className="inline-flex items-center justify-center p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors mr-2"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(team.id)}
                      className="inline-flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-xl font-semibold text-slate-800">
                {editingId ? "Edit Team" : "Add New Team"}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-slate-100 rounded transition-colors"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                  Team Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-slate-700">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="department" className="block text-sm font-medium text-slate-700">
                  Department
                </label>
                <select
                  id="department"
                  value={formData.department_id}
                  onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">None</option>
                  {initialDepartments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="branch" className="block text-sm font-medium text-slate-700">
                  Branch
                </label>
                <select
                  id="branch"
                  value={formData.branch_id}
                  onChange={(e) => setFormData({ ...formData, branch_id: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">None</option>
                  {initialBranches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!formData.name}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-bottom duration-300 z-50">
          {toast}
        </div>
      )}
    </div>
  );
}