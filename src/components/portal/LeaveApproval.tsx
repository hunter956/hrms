import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface LeaveApprovalProps {
  managerId?: string;
}

// Hardcoded pending leave requests data
const initialPendingRequests = [
  {
    id: "1",
    employee_id: "emp-8a7b9c4d",
    leave_type: "casual",
    start_date: "2024-10-15",
    end_date: "2024-10-17",
    days_count: 3,
    reason: "Family function - sister's wedding",
    status: "pending",
    manager_comments: null,
    created_at: "2024-10-05T10:30:00Z"
  },
  {
    id: "2",
    employee_id: "emp-5f3e2d1a",
    leave_type: "sick",
    start_date: "2024-10-12",
    end_date: "2024-10-13",
    days_count: 2,
    reason: "Medical appointment and recovery",
    status: "pending",
    manager_comments: null,
    created_at: "2024-10-06T14:20:00Z"
  },
  {
    id: "3",
    employee_id: "emp-9b2c4e6f",
    leave_type: "vacation",
    start_date: "2024-10-20",
    end_date: "2024-10-25",
    days_count: 6,
    reason: "Pre-planned family vacation to Kerala",
    status: "pending",
    manager_comments: null,
    created_at: "2024-09-28T09:15:00Z"
  },
  {
    id: "4",
    employee_id: "emp-7d4a5b8c",
    leave_type: "personal",
    start_date: "2024-10-18",
    end_date: "2024-10-18",
    days_count: 1,
    reason: "Personal work - property documentation",
    status: "pending",
    manager_comments: null,
    created_at: "2024-10-07T11:45:00Z"
  },
  {
    id: "5",
    employee_id: "emp-3c8f1e9a",
    leave_type: "sick",
    start_date: "2024-10-10",
    end_date: "2024-10-11",
    days_count: 2,
    reason: "Fever and cold symptoms",
    status: "pending",
    manager_comments: null,
    created_at: "2024-10-08T08:30:00Z"
  }
];

export default function LeaveApproval({ managerId = "manager123" }: LeaveApprovalProps) {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [comments, setComments] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingRequests, setPendingRequests] = useState(initialPendingRequests);
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

  const handleApprove = (request: any) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const handleReject = (request: any) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const submitDecision = (status: string) => {
    if (!selectedRequest) return;

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      // Remove the request from pending list
      setPendingRequests(pendingRequests.filter(req => req.id !== selectedRequest.id));
      
      showNotification('success', "Leave request updated successfully");
      setIsDialogOpen(false);
      setSelectedRequest(null);
      setComments("");
      setIsSubmitting(false);
    }, 500);
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

      <div className="max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending Leave Requests
            </CardTitle>
            <CardDescription>Review and approve/reject leave requests from your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Employee ID</th>
                    <th className="text-left p-3 font-medium">Leave Type</th>
                    <th className="text-left p-3 font-medium">Start Date</th>
                    <th className="text-left p-3 font-medium">End Date</th>
                    <th className="text-left p-3 font-medium">Days</th>
                    <th className="text-left p-3 font-medium">Reason</th>
                    <th className="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests?.map((request) => (
                    <tr key={request.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{request.employee_id.substring(0, 8)}...</td>
                      <td className="p-3 capitalize">{request.leave_type}</td>
                      <td className="p-3">{formatDate(request.start_date)}</td>
                      <td className="p-3">{formatDate(request.end_date)}</td>
                      <td className="p-3">{request.days_count}</td>
                      <td className="p-3 max-w-xs truncate">{request.reason}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApprove(request)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReject(request)}
                          >
                            <XCircle className="h-4 w-4 mr-1 text-red-500" />
                            Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {pendingRequests.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-gray-500">
                        No pending leave requests
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Leave Request</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Employee ID</p>
                <p className="font-medium">{selectedRequest.employee_id}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Leave Type</p>
                <p className="font-medium capitalize">{selectedRequest.leave_type}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">
                  {formatDate(selectedRequest.start_date)} - {formatDate(selectedRequest.end_date)} ({selectedRequest.days_count} days)
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Reason</p>
                <p className="font-medium">{selectedRequest.reason}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Manager Comments</label>
                <Textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Add comments (optional)"
                  rows={3}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  onClick={() => submitDecision("rejected")}
                  disabled={isSubmitting}
                >
                  <XCircle className="h-4 w-4 mr-1 text-red-500" />
                  Reject
                </Button>
                <Button
                  onClick={() => submitDecision("approved")}
                  disabled={isSubmitting}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}