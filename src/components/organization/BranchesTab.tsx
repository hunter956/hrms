import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

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
  const [editingId, setEditingId] = useState(null);
  const [branches, setBranches] = useState(initialBranches);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    address: "",
    department_id: "",
  });
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const resetForm = () => {
    setFormData({ name: "", location: "", address: "", department_id: "" });
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!formData.name) return;
    
    if (editingId) {
      setBranches(branches.map(branch => 
        branch.id === editingId 
          ? { ...branch, ...formData, department_id: formData.department_id || null }
          : branch
      ));
      showToast("Branch updated successfully");
    } else {
      const newBranch = {
        id: String(Date.now()),
        name: formData.name,
        location: formData.location,
        address: formData.address,
        department_id: formData.department_id || null,
      };
      setBranches([...branches, newBranch]);
      showToast("Branch created successfully");
    }
    setIsOpen(false);
    resetForm();
  };

  const handleEdit = (branch) => {
    setFormData({
      name: branch.name,
      location: branch.location || "",
      address: branch.address || "",
      department_id: branch.department_id || "",
    });
    setEditingId(branch.id);
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    setBranches(branches.filter(branch => branch.id !== id));
    showToast("Branch deleted successfully");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-slate-200">
      <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Branches</h2>
          <button
            onClick={() => {
              resetForm();
              setIsOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
                Add Branch
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Location</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Department</th>
                <th className="text-right py-3 px-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((branch) => (
                <tr key={branch.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-800">{branch.name}</td>
                  <td className="py-3 px-4 text-slate-600">{branch.location || "-"}</td>
                  <td className="py-3 px-4 text-slate-600">
                    {initialDepartments.find(d => d.id === branch.department_id)?.name || "-"}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleEdit(branch)}
                      className="inline-flex items-center justify-center p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors mr-2"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(branch.id)}
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
                {editingId ? "Edit Branch" : "Add New Branch"}
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
                  Branch Name *
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
                <label htmlFor="location" className="block text-sm font-medium text-slate-700">
                  Location
                </label>
                <input
                    id="location"
                  type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              
                <div className="space-y-2">
                <label htmlFor="address" className="block text-sm font-medium text-slate-700">
                  Address
                </label>
                <textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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