import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Award, Plus, AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

  const [editingCertification, setEditingCertification] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [notification, setNotification] = useState("");

  const [formData, setFormData] = useState({
    employee: "",
    certificationName: "",
    type: "",
    issueDate: "",
    expiryDate: "",
  });

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const calculateStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry >= today ? "Active" : "Expired";
  };

  const calculateCompliance = (expiryDate) => {
    const daysUntilExpiry = getDaysUntilExpiry(expiryDate);
    if (daysUntilExpiry < 0) return "Non-Compliant";
    if (daysUntilExpiry <= 30) return "Expiring Soon";
    return "Compliant";
  };

  const handleAddCertification = (e) => {
    e.preventDefault();
    
    const newCertification = {
      id: certifications.length + 1,
      employee: formData.employee,
      certificationName: formData.certificationName,
      type: formData.type,
      issueDate: formData.issueDate,
      expiryDate: formData.expiryDate,
      status: calculateStatus(formData.expiryDate),
      compliance: calculateCompliance(formData.expiryDate),
    };
    
    setCertifications([...certifications, newCertification]);
    setIsCreateDialogOpen(false);
    setFormData({
      employee: "",
      certificationName: "",
      type: "",
      issueDate: "",
      expiryDate: "",
    });
    showNotification("Certification added successfully");
  };

  const handleEditCertification = (cert) => {
    setEditingCertification(cert);
    setFormData({
      employee: cert.employee,
      certificationName: cert.certificationName,
      type: cert.type,
      issueDate: cert.issueDate,
      expiryDate: cert.expiryDate,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateCertification = (e) => {
    e.preventDefault();
    
    setCertifications(certifications.map(cert => 
      cert.id === editingCertification.id 
        ? {
            ...cert,
            employee: formData.employee,
            certificationName: formData.certificationName,
            type: formData.type,
            issueDate: formData.issueDate,
            expiryDate: formData.expiryDate,
            status: calculateStatus(formData.expiryDate),
            compliance: calculateCompliance(formData.expiryDate),
          }
        : cert
    ));
    
    setIsEditDialogOpen(false);
    setEditingCertification(null);
    setFormData({
      employee: "",
      certificationName: "",
      type: "",
      issueDate: "",
      expiryDate: "",
    });
    showNotification("Certification updated successfully");
  };

  const handleRenewCertification = (cert) => {
    const today = new Date();
    const newExpiryDate = new Date(today);
    newExpiryDate.setFullYear(today.getFullYear() + 1);
    
    setCertifications(certifications.map(c => 
      c.id === cert.id 
        ? {
            ...c,
            issueDate: today.toISOString().split('T')[0],
            expiryDate: newExpiryDate.toISOString().split('T')[0],
            status: "Active",
            compliance: "Compliant",
          }
        : c
    ));
    
    showNotification(`${cert.certificationName} renewed successfully`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "default";
      case "Expired":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getComplianceColor = (compliance) => {
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

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 max-w-5xl mx-auto">
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}
      
      <Card className="border-[#e2e8f0] bg-gradient-to-br from-white to-[#f9fafb] shadow-lg">
        <CardHeader className="border-b border-[#e2e8f0] bg-gradient-to-r from-[#f9fafb] to-white">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Certifications & Compliance</CardTitle>
              <CardDescription>Manage employee certifications and compliance training</CardDescription>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="px-6 py-3 h-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Certification
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add Certification</DialogTitle>
                  <DialogDescription>
                    Record a new certification or compliance training
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="employee">Employee</Label>
                    <Input 
                      id="employee" 
                      value={formData.employee}
                      onChange={(e) => setFormData({...formData, employee: e.target.value})}
                      placeholder="e.g., John Doe"
                      required 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="certName">Certification Name</Label>
                    <Input 
                      id="certName" 
                      value={formData.certificationName}
                      onChange={(e) => setFormData({...formData, certificationName: e.target.value})}
                      placeholder="e.g., PMP Certification" 
                      required 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Professional">Professional</SelectItem>
                        <SelectItem value="Compliance">Compliance</SelectItem>
                        <SelectItem value="Technical">Technical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="issueDate">Issue Date</Label>
                      <Input 
                        id="issueDate" 
                        type="date" 
                        value={formData.issueDate}
                        onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input 
                        id="expiryDate" 
                        type="date" 
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                        required 
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCertification} className="px-6 py-3 h-auto">Add Certification</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
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
                      <TableCell className="font-medium whitespace-nowrap">{cert.employee}</TableCell>
                      <TableCell className="min-w-[220px]">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          {cert.certificationName}
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{cert.type}</TableCell>
                      <TableCell className="whitespace-nowrap">{new Date(cert.issueDate).toLocaleDateString()}</TableCell>
                      <TableCell className="whitespace-nowrap">{new Date(cert.expiryDate).toLocaleDateString()}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          {daysUntilExpiry < 30 && daysUntilExpiry > 0 && (
                            <AlertCircle className="h-4 w-4 text-orange-500" />
                          )}
                          {daysUntilExpiry < 0 && (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className={daysUntilExpiry < 30 && daysUntilExpiry > 0 ? "text-orange-500" : daysUntilExpiry < 0 ? "text-red-500" : ""}>
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
                      <TableCell className="whitespace-nowrap">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditCertification(cert)}>
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleRenewCertification(cert)}>
                            Renew
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Certification</DialogTitle>
                <DialogDescription>
                  Update the certification details
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-employee">Employee</Label>
                  <Input 
                    id="edit-employee" 
                    value={formData.employee}
                    onChange={(e) => setFormData({...formData, employee: e.target.value})}
                    placeholder="e.g., John Doe"
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-certName">Certification Name</Label>
                  <Input 
                    id="edit-certName" 
                    value={formData.certificationName}
                    onChange={(e) => setFormData({...formData, certificationName: e.target.value})}
                    placeholder="e.g., PMP Certification" 
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Compliance">Compliance</SelectItem>
                      <SelectItem value="Technical">Technical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-issueDate">Issue Date</Label>
                    <Input 
                      id="edit-issueDate" 
                      type="date" 
                      value={formData.issueDate}
                      onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-expiryDate">Expiry Date</Label>
                    <Input 
                      id="edit-expiryDate" 
                      type="date" 
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                      required 
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateCertification}>Update Certification</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Card>
    </div>
  );
};

export default CertificationCompliance;