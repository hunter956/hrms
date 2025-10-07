import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

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
  const [editingId, setEditingId] = useState(null);
  const [departments, setDepartments] = useState(initialDepartments);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parent_department_id: "",
  });
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", parent_department_id: "" });
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!formData.name) return;
    
    if (editingId) {
      setDepartments(departments.map(dept => 
        dept.id === editingId 
          ? { ...dept, ...formData, parent_department_id: formData.parent_department_id || null }
          : dept
      ));
      showToast("Department updated successfully");
    } else {
      const newDept = {
        id: String(Date.now()),
        name: formData.name,
        description: formData.description,
        parent_department_id: formData.parent_department_id || null,
      };
      setDepartments([...departments, newDept]);
      showToast("Department created successfully");
    }
    setIsOpen(false);
    resetForm();
  };

  const handleEdit = (dept) => {
    setFormData({
      name: dept.name,
      description: dept.description || "",
      parent_department_id: dept.parent_department_id || "",
    });
    setEditingId(dept.id);
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    setDepartments(departments.filter(dept => dept.id !== id));
    showToast("Department deleted successfully");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-slate-200">
      <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Departments</h2>
          <button
            onClick={() => {
              resetForm();
              setIsOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add Department
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
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Parent Department</th>
                <th className="text-right py-3 px-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-800">{dept.name}</td>
                  <td className="py-3 px-4 text-slate-600">{dept.description}</td>
                  <td className="py-3 px-4 text-slate-600">
                    {departments.find(d => d.id === dept.parent_department_id)?.name || "-"}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleEdit(dept)}
                      className="inline-flex items-center justify-center p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors mr-2"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(dept.id)}
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
                {editingId ? "Edit Department" : "Add New Department"}
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
                  Department Name *
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
                <label htmlFor="parent" className="block text-sm font-medium text-slate-700">
                  Parent Department
                </label>
                <select
                  id="parent"
                  value={formData.parent_department_id}
                  onChange={(e) => setFormData({ ...formData, parent_department_id: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">None</option>
                  {departments.filter(d => d.id !== editingId).map((dept) => (
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