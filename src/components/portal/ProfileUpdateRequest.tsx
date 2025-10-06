import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User, PlusCircle } from "lucide-react";

interface ProfileUpdateRequestProps {
  userId: string;
}

// Hardcoded initial data
const INITIAL_REQUESTS = [
  {
    id: "1",
    employee_id: "user123",
    field_name: "phone",
    new_value: "+1 234-567-8900",
    status: "approved",
    created_at: "2024-09-15T10:30:00Z",
    manager_comments: "Approved after verification"
  },
  {
    id: "2",
    employee_id: "user123",
    field_name: "address",
    new_value: "123 Main St, New York, NY 10001",
    status: "pending",
    created_at: "2024-10-01T14:20:00Z",
    manager_comments: null
  },
  {
    id: "3",
    employee_id: "user123",
    field_name: "emergency_contact",
    new_value: "Jane Doe - +1 555-123-4567",
    status: "rejected",
    created_at: "2024-08-20T09:15:00Z",
    manager_comments: "Please provide relationship details"
  }
];

export default function ProfileUpdateRequest({ userId }: ProfileUpdateRequestProps) {
  const [fieldName, setFieldName] = useState("");
  const [newValue, setNewValue] = useState("");
  const [updateRequests, setUpdateRequests] = useState(INITIAL_REQUESTS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!fieldName || !newValue) {
      alert("Please fill all fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newRequest = {
        id: String(updateRequests.length + 1),
        employee_id: userId,
        field_name: fieldName,
        new_value: newValue,
        status: "pending",
        created_at: new Date().toISOString(),
        manager_comments: null
      };

      setUpdateRequests([newRequest, ...updateRequests]);
      setFieldName("");
      setNewValue("");
      setIsSubmitting(false);
      
      // Show success message
      alert("Profile update request submitted successfully");
    }, 500);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

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

            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Update Request"}
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
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Field Name</th>
                  <th className="text-left p-4 font-medium">New Value</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Submitted</th>
                  <th className="text-left p-4 font-medium">Comments</th>
                </tr>
              </thead>
              <tbody>
                {updateRequests.map((request) => (
                  <tr key={request.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 capitalize">{request.field_name.replace("_", " ")}</td>
                    <td className="p-4">{request.new_value}</td>
                    <td className="p-4">
                      <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                    </td>
                    <td className="p-4">{formatDate(request.created_at)}</td>
                    <td className="p-4">{request.manager_comments || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}