import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { User, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface ProfileUpdateRequestProps {
  userId: string;
}

export default function ProfileUpdateRequest({ userId }: ProfileUpdateRequestProps) {
  const [fieldName, setFieldName] = useState("");
  const [newValue, setNewValue] = useState("");
  const queryClient = useQueryClient();

  const { data: updateRequests } = useQuery({
    queryKey: ["profile-update-requests", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profile_update_requests")
        .select("*")
        .eq("employee_id", userId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const submitUpdateMutation = useMutation({
    mutationFn: async () => {
      if (!fieldName || !newValue) {
        throw new Error("Please fill all fields");
      }

      const { error } = await supabase.from("profile_update_requests").insert({
        employee_id: userId,
        field_name: fieldName,
        new_value: newValue,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Profile update request submitted successfully");
      setFieldName("");
      setNewValue("");
      queryClient.invalidateQueries({ queryKey: ["profile-update-requests", userId] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-500/10 text-green-500";
      case "rejected": return "bg-red-500/10 text-red-500";
      default: return "bg-yellow-500/10 text-yellow-500";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Request Profile Update
          </CardTitle>
          <CardDescription>Submit a request to update your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="field-name">Field to Update *</Label>
                <Select value={fieldName} onValueChange={setFieldName}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Phone Number</SelectItem>
                    <SelectItem value="address">Address</SelectItem>
                    <SelectItem value="emergency_contact">Emergency Contact</SelectItem>
                    <SelectItem value="bank_account">Bank Account</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-value">New Value *</Label>
                <Input
                  id="new-value"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="Enter new value"
                />
              </div>
            </div>

            <Button onClick={() => submitUpdateMutation.mutate()} disabled={submitUpdateMutation.isPending}>
              {submitUpdateMutation.isPending ? "Submitting..." : "Submit Update Request"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            My Update Requests
          </CardTitle>
          <CardDescription>View your profile update request history</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Field Name</TableHead>
                <TableHead>New Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Comments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {updateRequests?.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="capitalize">{request.field_name.replace("_", " ")}</TableCell>
                  <TableCell>{request.new_value}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                  </TableCell>
                  <TableCell>{format(new Date(request.created_at), "PP")}</TableCell>
                  <TableCell>{request.manager_comments || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
