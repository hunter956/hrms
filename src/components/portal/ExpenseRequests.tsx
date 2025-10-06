import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Receipt, PlusCircle } from "lucide-react";

interface ExpenseRequestsProps {
  userId?: string;
}

// Hardcoded initial expenses data
const initialExpenses = [
  {
    id: "1",
    employee_id: "user123",
    category: "travel",
    amount: 1250.00,
    expense_date: "2024-09-15",
    description: "Flight tickets for client meeting in Mumbai",
    status: "approved",
    manager_comments: "Approved as per travel policy",
    created_at: "2024-09-16T10:30:00Z"
  },
  {
    id: "2",
    employee_id: "user123",
    category: "meals",
    amount: 450.75,
    expense_date: "2024-09-20",
    description: "Team lunch with client",
    status: "pending",
    manager_comments: null,
    created_at: "2024-09-21T14:20:00Z"
  },
  {
    id: "3",
    employee_id: "user123",
    category: "accommodation",
    amount: 3500.00,
    expense_date: "2024-09-18",
    description: "Hotel stay for 2 nights in Mumbai",
    status: "approved",
    manager_comments: "Within budget limits",
    created_at: "2024-09-19T09:15:00Z"
  },
  {
    id: "4",
    employee_id: "user123",
    category: "supplies",
    amount: 890.50,
    expense_date: "2024-08-25",
    description: "Office supplies and stationery",
    status: "rejected",
    manager_comments: "Please submit itemized receipts",
    created_at: "2024-08-26T11:45:00Z"
  }
];

export default function ExpenseRequests({ userId = "user123" }: ExpenseRequestsProps) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [description, setDescription] = useState("");
  const [expenses, setExpenses] = useState(initialExpenses);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const submitExpense = () => {
    if (!category || !amount || !expenseDate || !description) {
      showNotification('error', "Please fill all fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      const newExpense = {
        id: String(Date.now()),
        employee_id: userId,
        category,
        amount: parseFloat(amount),
        expense_date: expenseDate,
        description,
        status: "pending",
        manager_comments: null,
        created_at: new Date().toISOString()
      };

      setExpenses([newExpense, ...expenses]);
      showNotification('success', "Expense request submitted successfully");
      
      // Reset form
      setCategory("");
      setAmount("");
      setExpenseDate("");
      setDescription("");
      setIsSubmitting(false);
    }, 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-500/10 text-green-500";
      case "rejected": return "bg-red-500/10 text-red-500";
      default: return "bg-yellow-500/10 text-yellow-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5" />
              Submit Expense Request
            </CardTitle>
            <CardDescription>Request reimbursement for business expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="meals">Meals & Entertainment</SelectItem>
                      <SelectItem value="accommodation">Accommodation</SelectItem>
                      <SelectItem value="supplies">Office Supplies</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expense-date">Expense Date *</Label>
                  <Input
                    id="expense-date"
                    type="date"
                    value={expenseDate}
                    onChange={(e) => setExpenseDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide details about this expense"
                  rows={3}
                />
              </div>

              <Button onClick={submitExpense} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Expense Request"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              My Expense Requests
            </CardTitle>
            <CardDescription>View your expense request history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Category</th>
                    <th className="text-left p-3 font-medium">Amount</th>
                    <th className="text-left p-3 font-medium">Date</th>
                    <th className="text-left p-3 font-medium">Description</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses?.map((expense) => (
                    <tr key={expense.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 capitalize">{expense.category}</td>
                      <td className="p-3">₹{expense.amount.toFixed(2)}</td>
                      <td className="p-3">{formatDate(expense.expense_date)}</td>
                      <td className="p-3 max-w-xs truncate">{expense.description}</td>
                      <td className="p-3">
                        <Badge className={getStatusColor(expense.status)}>{expense.status}</Badge>
                      </td>
                      <td className="p-3">{expense.manager_comments || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}