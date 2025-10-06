import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LeaveApplicationProps {
  userId?: string;
}

// Hardcoded leave balances data
const initialLeaveBalances = [
  {
    id: "1",
    user_id: "user123",
    leave_type: "sick",
    total_days: 12,
    remaining_days: 8
  },
  {
    id: "2",
    user_id: "user123",
    leave_type: "casual",
    total_days: 10,
    remaining_days: 7
  },
  {
    id: "3",
    user_id: "user123",
    leave_type: "vacation",
    total_days: 15,
    remaining_days: 12
  },
  {
    id: "4",
    user_id: "user123",
    leave_type: "personal",
    total_days: 5,
    remaining_days: 3
  },
  {
    id: "5",
    user_id: "user123",
    leave_type: "maternity",
    total_days: 90,
    remaining_days: 90
  }
];

// Hardcoded leave requests data
const initialLeaveRequests = [
  {
    id: "1",
    employee_id: "user123",
    leave_type: "casual",
    start_date: "2024-09-10",
    end_date: "2024-09-12",
    days_count: 3,
    reason: "Family function",
    status: "approved",
    manager_comments: "Approved. Enjoy!",
    created_at: "2024-09-05T10:30:00Z"
  },
  {
    id: "2",
    employee_id: "user123",
    leave_type: "sick",
    start_date: "2024-08-20",
    end_date: "2024-08-22",
    days_count: 3,
    reason: "Medical appointment and recovery",
    status: "approved",
    manager_comments: "Get well soon",
    created_at: "2024-08-19T14:20:00Z"
  },
  {
    id: "3",
    employee_id: "user123",
    leave_type: "vacation",
    start_date: "2024-10-15",
    end_date: "2024-10-18",
    days_count: 4,
    reason: "Family vacation to Goa",
    status: "pending",
    manager_comments: null,
    created_at: "2024-09-25T09:15:00Z"
  },
  {
    id: "4",
    employee_id: "user123",
    leave_type: "personal",
    start_date: "2024-07-28",
    end_date: "2024-07-29",
    days_count: 2,
    reason: "Personal work",
    status: "rejected",
    manager_comments: "Project deadline approaching. Please reschedule.",
    created_at: "2024-07-20T11:45:00Z"
  }
];

export default function LeaveApplication({ userId = "user123" }: LeaveApplicationProps) {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaveBalances] = useState(initialLeaveBalances);
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
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

  const applyLeave = () => {
    if (!leaveType || !startDate || !endDate || !reason) {
      showNotification('error', "Please fill all fields");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const daysCount = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      const newRequest = {
        id: String(Date.now()),
        employee_id: userId,
        leave_type: leaveType,
        start_date: startDate,
        end_date: endDate,
        days_count: daysCount,
        reason: reason,
        status: "pending",
        manager_comments: null,
        created_at: new Date().toISOString()
      };

      setLeaveRequests([newRequest, ...leaveRequests]);
      showNotification('success', "Leave request submitted successfully");
      
      // Reset form
      setLeaveType("");
      setStartDate("");
      setEndDate("");
      setReason("");
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
              <Calendar className="h-5 w-5" />
              Leave Balances
            </CardTitle>
            <CardDescription>Your available leave balance for this year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {leaveBalances?.map((balance) => (
                <div key={balance.id} className="p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                  <p className="text-sm text-gray-600 capitalize">{balance.leave_type}</p>
                  <p className="text-2xl font-bold">{balance.remaining_days}</p>
                  <p className="text-xs text-gray-500">of {balance.total_days} days</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5" />
              Apply for Leave
            </CardTitle>
            <CardDescription>Submit a new leave request</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="leave-type">Leave Type *</Label>
                  <Select value={leaveType} onValueChange={setLeaveType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sick">Sick Leave</SelectItem>
                      <SelectItem value="casual">Casual Leave</SelectItem>
                      <SelectItem value="vacation">Vacation</SelectItem>
                      <SelectItem value="personal">Personal Leave</SelectItem>
                      <SelectItem value="maternity">Maternity Leave</SelectItem>
                      <SelectItem value="paternity">Paternity Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date *</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date *</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason *</Label>
                <Textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Provide a reason for your leave request"
                  rows={3}
                />
              </div>

              <Button onClick={applyLeave} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Leave Request"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Leave Requests</CardTitle>
            <CardDescription>View your leave request history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Leave Type</th>
                    <th className="text-left p-3 font-medium">Start Date</th>
                    <th className="text-left p-3 font-medium">End Date</th>
                    <th className="text-left p-3 font-medium">Days</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests?.map((request) => (
                    <tr key={request.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 capitalize">{request.leave_type}</td>
                      <td className="p-3">{formatDate(request.start_date)}</td>
                      <td className="p-3">{formatDate(request.end_date)}</td>
                      <td className="p-3">{request.days_count}</td>
                      <td className="p-3">
                        <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                      </td>
                      <td className="p-3">{request.manager_comments || "-"}</td>
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