import { useState } from "react";
import { CheckCircle, XCircle, Clock, X } from "lucide-react";

const generateExpenseRequests = () => {
  const categories = ['travel', 'food', 'equipment', 'software', 'training', 'utilities'];
  const descriptions = [
    'Client meeting travel expenses',
    'Team lunch for project milestone',
    'New laptop for development work',
    'Annual software license renewal',
    'Professional development course',
    'Office supplies and stationery'
  ];
  
  const requests = [];
  const today = new Date();
  
  for (let i = 0; i < 8; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    requests.push({
      id: `exp-${i + 1}`,
      employee_id: `EMP${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      amount: Math.floor(Math.random() * 50000) + 500,
      expense_date: date.toISOString().split('T')[0],
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      status: 'pending',
      created_at: date.toISOString(),
      manager_id: null,
      manager_comments: null,
      reviewed_at: null
    });
  }
  
  return requests.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export default function ExpenseApproval({ managerId = "MGR001" }) {
  const [pendingExpenses, setPendingExpenses] = useState(() => generateExpenseRequests());
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [comments, setComments] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleReview = (request) => {
    setSelectedRequest(request);
    setComments("");
    setIsDialogOpen(true);
  };

  const submitDecision = (status) => {
    if (!selectedRequest) return;
    
    setIsProcessing(true);
    
    // Simulate async operation
    setTimeout(() => {
      setPendingExpenses(prev => 
        prev.filter(req => req.id !== selectedRequest.id)
      );
      
      setIsDialogOpen(false);
      setSelectedRequest(null);
      setComments("");
      setIsProcessing(false);
      
      // Show success message
      const message = status === 'approved' 
        ? '✓ Expense request approved successfully'
        : '✓ Expense request rejected';
      console.log(message);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
              <Clock className="h-6 w-6" />
              Pending Expense Requests
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Review and approve/reject expense requests from your team
            </p>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Employee ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Description</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingExpenses.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-gray-500">
                        No pending expense requests
                      </td>
                    </tr>
                  ) : (
                    pendingExpenses.map((request) => (
                      <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {request.employee_id.substring(0, 8)}...
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900 capitalize">
                          {request.category}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          ₹{request.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {formatDate(request.expense_date)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900 max-w-xs truncate">
                          {request.description}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleReview(request)}
                            className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {isDialogOpen && selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
              <div className="border-b border-gray-200 p-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  Review Expense Request
                </h3>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Employee ID</p>
                  <p className="font-medium text-gray-900">{selectedRequest.employee_id}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-medium text-gray-900 capitalize">{selectedRequest.category}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="font-medium text-gray-900">₹{selectedRequest.amount.toFixed(2)}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium text-gray-900">{formatDate(selectedRequest.expense_date)}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="font-medium text-gray-900">{selectedRequest.description}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Manager Comments</label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Add comments (optional)"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    onClick={() => setIsDialogOpen(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    disabled={isProcessing}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => submitDecision("rejected")}
                    disabled={isProcessing}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-1 disabled:opacity-50"
                  >
                    <XCircle className="h-4 w-4 text-red-500" />
                    Reject
                  </button>
                  <button
                    onClick={() => submitDecision("approved")}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1 disabled:opacity-50"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}