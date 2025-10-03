import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface ExpenseApprovalProps {
  managerId: string;
}

export default function ExpenseApproval({ managerId }: ExpenseApprovalProps) {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [comments, setComments] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: pendingExpenses } = useQuery({
    queryKey: ["pending-expense-requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("expense_requests")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateRequestMutation = useMutation({
    mutationFn: async ({ requestId, status, comments }: { requestId: string; status: string; comments: string }) => {
      const { error } = await supabase
        .from("expense_requests")
        .update({
          status,
          manager_id: managerId,
          manager_comments: comments,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", requestId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Expense request updated successfully");
      setIsDialogOpen(false);
      setSelectedRequest(null);
      setComments("");
      queryClient.invalidateQueries({ queryKey: ["pending-expense-requests"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleReview = (request: any) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const submitDecision = (status: string) => {
    if (selectedRequest) {
      updateRequestMutation.mutate({
        requestId: selectedRequest.id,
        status,
        comments,
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Pending Expense Requests
          </CardTitle>
          <CardDescription>Review and approve/reject expense requests from your team</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingExpenses?.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.employee_id.substring(0, 8)}...</TableCell>
                  <TableCell className="capitalize">{request.category}</TableCell>
                  <TableCell>₹{request.amount.toFixed(2)}</TableCell>
                  <TableCell>{format(new Date(request.expense_date), "PP")}</TableCell>
                  <TableCell className="max-w-xs truncate">{request.description}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReview(request)}
                      >
                        Review
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Expense Request</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Employee ID</p>
                <p className="font-medium">{selectedRequest.employee_id}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium capitalize">{selectedRequest.category}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="font-medium">₹{selectedRequest.amount.toFixed(2)}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{format(new Date(selectedRequest.expense_date), "PP")}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="font-medium">{selectedRequest.description}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Manager Comments</label>
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
                  disabled={updateRequestMutation.isPending}
                >
                  <XCircle className="h-4 w-4 mr-1 text-red-500" />
                  Reject
                </Button>
                <Button
                  onClick={() => submitDecision("approved")}
                  disabled={updateRequestMutation.isPending}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
