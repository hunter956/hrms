import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Award, Plus, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const CertificationCompliance = () => {
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      employee: "Alice Johnson",
      certificationName: "PMP Certification",
      type: "Professional",
      issueDate: "2023-06-15",
      expiryDate: "2026-06-15",
      status: "Active",
      compliance: "Compliant",
    },
    {
      id: 2,
      employee: "Bob Smith",
      certificationName: "Safety Training",
      type: "Compliance",
      issueDate: "2023-12-01",
      expiryDate: "2024-12-01",
      status: "Active",
      compliance: "Expiring Soon",
    },
    {
      id: 3,
      employee: "Carol Davis",
      certificationName: "First Aid Certification",
      type: "Compliance",
      issueDate: "2023-01-20",
      expiryDate: "2024-01-20",
      status: "Expired",
      compliance: "Non-Compliant",
    },
  ]);

  const handleAddCertification = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Certification added successfully");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "Expired":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getComplianceColor = (compliance: string) => {
    switch (compliance) {
      case "Compliant":
        return "default";
      case "Expiring Soon":
        return "secondary";
      case "Non-Compliant":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Certifications & Compliance</CardTitle>
            <CardDescription>Manage employee certifications and compliance training</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button  className="px-6 py-3 h-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Certification
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Certification</DialogTitle>
                <DialogDescription>
                  Record a new certification or compliance training
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddCertification}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="employee">Employee</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emp1">Alice Johnson</SelectItem>
                        <SelectItem value="emp2">Bob Smith</SelectItem>
                        <SelectItem value="emp3">Carol Davis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="certName">Certification Name</Label>
                    <Input id="certName" placeholder="e.g., PMP Certification" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="compliance">Compliance</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="issueDate">Issue Date</Label>
                      <Input id="issueDate" type="date" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input id="expiryDate" type="date" required />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit"  className="px-6 py-3 h-auto">Add Certification</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Certification</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Days Until Expiry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Compliance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certifications.map((cert) => {
              const daysUntilExpiry = getDaysUntilExpiry(cert.expiryDate);
              return (
                <TableRow key={cert.id}>
                  <TableCell className="font-medium">{cert.employee}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      {cert.certificationName}
                    </div>
                  </TableCell>
                  <TableCell>{cert.type}</TableCell>
                  <TableCell>
                    {new Date(cert.issueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(cert.expiryDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {daysUntilExpiry < 30 && daysUntilExpiry > 0 && (
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                      )}
                      {daysUntilExpiry < 0 && (
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      )}
                      <span className={daysUntilExpiry < 30 ? "text-orange-500" : ""}>
                        {daysUntilExpiry < 0 ? "Expired" : `${daysUntilExpiry} days`}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(cert.status)}>
                      {cert.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getComplianceColor(cert.compliance)}>
                      {cert.compliance}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Renew</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CertificationCompliance;
