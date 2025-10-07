import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

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
  const [editingId, setEditingId] = useState(null);
  const [designations, setDesignations] = useState(initialDesignations);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: "1",
    department_id: "",
  });
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", level: "1", department_id: "" });
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!formData.title) return;
    
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
      showToast("Designation updated successfully");
    } else {
      const newDesignation = {
        id: String(Date.now()),
        title: formData.title,
        description: formData.description,
        level: parseInt(formData.level),
        department_id: formData.department_id || null,
      };
      setDesignations([...designations, newDesignation]);
      showToast("Designation created successfully");
    }
    setIsOpen(false);
    resetForm();
  };

  const handleEdit = (designation) => {
    setFormData({
      title: designation.title,
      description: designation.description || "",
      level: designation.level.toString(),
      department_id: designation.department_id || "",
    });
    setEditingId(designation.id);
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    setDesignations(designations.filter(designation => designation.id !== id));
    showToast("Designation deleted successfully");
  };

  const getLevelBadgeColor = (level) => {
    if (level <= 2) return "bg-blue-100 text-blue-800";
    if (level <= 4) return "bg-green-100 text-green-800";
    return "bg-gray-100 text-gray-800";
  };

  const getLevelLabel = (level) => {
    const labels = {
      1: "Executive",
      2: "Senior Management",
      3: "Middle Management",
      4: "Junior Management",
      5: "Staff"
    };
    return labels[level] || `Level ${level}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-slate-200">
      <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Designations & Roles</h2>
          <button
            onClick={() => {
              resetForm();
              setIsOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
                Add Designation
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Title</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Description</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Level</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Department</th>
                <th className="text-right py-3 px-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {designations.map((designation) => (
                <tr key={designation.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-800">{designation.title}</td>
                  <td className="py-3 px-4 text-slate-600">{designation.description || "-"}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelBadgeColor(designation.level)}`}>
                      Level {designation.level} - {getLevelLabel(designation.level)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {initialDepartments.find(d => d.id === designation.department_id)?.name || "-"}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleEdit(designation)}
                      className="inline-flex items-center justify-center p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors mr-2"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(designation.id)}
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
                {editingId ? "Edit Designation" : "Add New Designation"}
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
                <label htmlFor="title" className="block text-sm font-medium text-slate-700">
                  Designation Title *
                </label>
                <input
                    id="title"
                  type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                <label htmlFor="level" className="block text-sm font-medium text-slate-700">
                  Hierarchy Level
                </label>
                <select
                  id="level"
                    value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1">Level 1 - Executive</option>
                  <option value="2">Level 2 - Senior Management</option>
                  <option value="3">Level 3 - Middle Management</option>
                  <option value="4">Level 4 - Junior Management</option>
                  <option value="5">Level 5 - Staff</option>
                </select>
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
                  disabled={!formData.title}
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