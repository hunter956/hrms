import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Download, Send, Eye } from "lucide-react";
import { toast } from "sonner";

export function OfferLetters() {
  const [open, setOpen] = useState(false);

  const mockOffers = [
    {
      id: "1",
      candidate: "Sarah Johnson",
      position: "Senior Software Engineer",
      salary: "$120,000",
      joiningDate: "2025-11-01",
      generatedDate: "2025-09-25",
      status: "Sent",
    },
    {
      id: "2",
      candidate: "Michael Chen",
      position: "HR Manager",
      salary: "$95,000",
      joiningDate: "2025-11-15",
      generatedDate: "2025-09-24",
      status: "Accepted",
    },
    {
      id: "3",
      candidate: "Emily Davis",
      position: "Marketing Intern",
      salary: "$45,000",
      joiningDate: "2025-12-01",
      generatedDate: "2025-09-23",
      status: "Draft",
    },
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Offer letter generated successfully");
    setOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Draft":
        return "";
      case "Sent":
        return "bg-hrms-info text-hrms-info-foreground";
      case "Accepted":
        return "bg-hrms-success text-hrms-success-foreground";
      case "Rejected":
        return "bg-destructive text-destructive-foreground";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Offer Letters</h2>
          <p className="text-sm text-muted-foreground">
            Generate and manage offer letters
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover">
              <Plus className="h-4 w-4 mr-2" />
              Generate Offer Letter
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Generate Offer Letter</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="candidate">Candidate Name</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select candidate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="michael">Michael Chen</SelectItem>
                      <SelectItem value="emily">Emily Davis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" placeholder="e.g., Software Engineer" required />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Work Location</Label>
                  <Input id="location" placeholder="e.g., New York Office" required />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="salary">Annual Salary</Label>
                  <Input
                    id="salary"
                    type="number"
                    placeholder="e.g., 120000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joining">Joining Date</Label>
                  <Input id="joining" type="date" required />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="type">Employment Type</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="probation">Probation Period (months)</Label>
                  <Input
                    id="probation"
                    type="number"
                    placeholder="e.g., 3"
                    defaultValue="3"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="benefits">Benefits Package</Label>
                <Textarea
                  id="benefits"
                  placeholder="List benefits: Health insurance, PTO, 401k, etc."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsibilities">Key Responsibilities</Label>
                <Textarea
                  id="responsibilities"
                  placeholder="Outline main job responsibilities..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="terms">Terms & Conditions</Label>
                <Textarea
                  id="terms"
                  placeholder="Add any specific terms and conditions..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary-hover">
                  Generate Letter
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Joining Date</TableHead>
              <TableHead>Generated Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOffers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell className="font-medium">{offer.candidate}</TableCell>
                <TableCell>{offer.position}</TableCell>
                <TableCell>{offer.salary}</TableCell>
                <TableCell>{offer.joiningDate}</TableCell>
                <TableCell>{offer.generatedDate}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(offer.status)}>
                    {offer.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    {offer.status === "Draft" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toast.success("Offer letter sent to candidate")}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
