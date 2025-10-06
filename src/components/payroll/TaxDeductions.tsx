import { useState } from "react";
import { Plus, Edit, Trash2, Receipt, X } from "lucide-react";

const initialDeductions = [
  {
    id: "1",
    employee_id: "EMP001",
    tds: 5000,
    pf: 1800,
    esi: 750,
    professional_tax: 200,
    gratuity: 500,
    other_deductions: 300,
    effective_from: "2024-01-01",
  },
  {
    id: "2",
    employee_id: "EMP002",
    tds: 7500,
    pf: 2100,
    esi: 900,
    professional_tax: 200,
    gratuity: 600,
    other_deductions: 150,
    effective_from: "2024-01-01",
  },
  {
    id: "3",
    employee_id: "EMP003",
    tds: 3000,
    pf: 1500,
    esi: 600,
    professional_tax: 200,
    gratuity: 400,
    other_deductions: 200,
    effective_from: "2024-02-01",
  }
];

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

export default function TaxDeductions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deductions, setDeductions] = useState(initialDeductions);
  
  const [formData, setFormData] = useState({
    employee_id: "",
    tds: "",
    pf: "",
    esi: "",
    professional_tax: "",
    gratuity: "",
    other_deductions: "",
    effective_from: getCurrentDate(),
  });

  const resetForm = () => {
    setFormData({
      employee_id: "",
      tds: "",
      pf: "",
      esi: "",
      professional_tax: "",
      gratuity: "",
      other_deductions: "",
      effective_from: getCurrentDate(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const payload = {
      employee_id: formData.employee_id,
      tds: parseFloat(formData.tds) || 0,
      pf: parseFloat(formData.pf) || 0,
      esi: parseFloat(formData.esi) || 0,
      professional_tax: parseFloat(formData.professional_tax) || 0,
      gratuity: parseFloat(formData.gratuity) || 0,
      other_deductions: parseFloat(formData.other_deductions) || 0,
      effective_from: formData.effective_from,
    };

    if (editingId) {
      setDeductions(prev => 
        prev.map(d => d.id === editingId ? { ...d, ...payload } : d)
      );
    } else {
      const newDeduction = {
        ...payload,
        id: Date.now().toString(),
      };
      setDeductions(prev => [newDeduction, ...prev]);
    }

    setIsDialogOpen(false);
    setEditingId(null);
    resetForm();
  };

  const handleDelete = (id) => {
    setDeductions(prev => prev.filter(d => d.id !== id));
  };

  const handleEdit = (deduction) => {
    setEditingId(deduction.id);
    setFormData({
      employee_id: deduction.employee_id,
      tds: deduction.tds.toString(),
      pf: deduction.pf.toString(),
      esi: deduction.esi.toString(),
      professional_tax: deduction.professional_tax.toString(),
      gratuity: deduction.gratuity.toString(),
      other_deductions: deduction.other_deductions.toString(),
      effective_from: deduction.effective_from,
    });
    setIsDialogOpen(true);
  };

  const calculateTotal = (deduction) => {
    return (
      parseFloat(deduction.tds) +
      parseFloat(deduction.pf) +
      parseFloat(deduction.esi) +
      parseFloat(deduction.professional_tax) +
      parseFloat(deduction.gratuity) +
      parseFloat(deduction.other_deductions)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
                  <Receipt className="h-6 w-6" />
                  Tax Deductions Management
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Configure TDS, PF, ESI, and other statutory deductions
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingId(null);
                  resetForm();
                  setIsDialogOpen(true);
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Deductions
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Employee ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">TDS</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">PF</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">ESI</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Professional Tax</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Gratuity</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Other</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Total</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Effective From</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {deductions.map((deduction) => (
                    <tr key={deduction.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{deduction.employee_id}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">₹{deduction.tds}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">₹{deduction.pf}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">₹{deduction.esi}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">₹{deduction.professional_tax}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">₹{deduction.gratuity}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">₹{deduction.other_deductions}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                        ₹{calculateTotal(deduction).toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{formatDate(deduction.effective_from)}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(deduction)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(deduction.id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {isDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="border-b border-gray-200 p-6 flex items-center justify-between sticky top-0 bg-white">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingId ? "Edit" : "Add"} Tax Deductions
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Configure tax deductions for an employee
                  </p>
                </div>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employee ID
                    </label>
                    <input
                      type="text"
                      name="employee_id"
                      value={formData.employee_id}
                      onChange={handleChange}
                      placeholder="Enter employee ID"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        TDS
                      </label>
                      <input
                        type="number"
                        name="tds"
                        value={formData.tds}
                        onChange={handleChange}
                        step="0.01"
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        PF (Provident Fund)
                      </label>
                      <input
                        type="number"
                        name="pf"
                        value={formData.pf}
                        onChange={handleChange}
                        step="0.01"
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ESI
                      </label>
                      <input
                        type="number"
                        name="esi"
                        value={formData.esi}
                        onChange={handleChange}
                        step="0.01"
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Professional Tax
                      </label>
                      <input
                        type="number"
                        name="professional_tax"
                        value={formData.professional_tax}
                        onChange={handleChange}
                        step="0.01"
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gratuity
                      </label>
                      <input
                        type="number"
                        name="gratuity"
                        value={formData.gratuity}
                        onChange={handleChange}
                        step="0.01"
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Other Deductions
                      </label>
                      <input
                        type="number"
                        name="other_deductions"
                        value={formData.other_deductions}
                        onChange={handleChange}
                        step="0.01"
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Effective From
                    </label>
                    <input
                      type="date"
                      name="effective_from"
                      value={formData.effective_from}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsDialogOpen(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}