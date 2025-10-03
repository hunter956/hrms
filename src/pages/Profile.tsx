import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
  const [basic, setBasic] = useState({
    name: "HR Admin",
    email: "admin@company.com",
    role: "Administrator",
    position: "HR Manager",
    department: "Human Resources",
  });

  const [contact, setContact] = useState({
    phone: "+91 98765 43210",
    location: "Mumbai, IN",
  });

  const [employee, _] = useState({
    employeeId: "EMP-0001",
    joiningDate: "2022-04-01",
    supervisor: "CEO",
    employmentType: "Full-time",
  });

  const [avatarFile, setAvatarFile] = useState<File | undefined>();
  const avatarUrl = useMemo(() => (avatarFile ? URL.createObjectURL(avatarFile) : "/avatars/admin.jpg"), [avatarFile]);

  const [security, setSecurity] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

  const saveBasic = (e: React.FormEvent) => { e.preventDefault(); };
  const saveContact = (e: React.FormEvent) => { e.preventDefault(); };
  const changePassword = (e: React.FormEvent) => { e.preventDefault(); if (security.newPassword !== security.confirmPassword) return; setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" }); };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground mt-2">View and update your account information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatarUrl} alt={basic.name} />
              <AvatarFallback>{basic.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files?.[0])} />
              <p className="text-xs text-muted-foreground">JPG/PNG, up to 2MB.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={saveBasic}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={basic.name} onChange={(e) => setBasic((v) => ({ ...v, name: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={basic.email} onChange={(e) => setBasic((v) => ({ ...v, email: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" value={basic.role} onChange={(e) => setBasic((v) => ({ ...v, role: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input id="position" value={basic.position} onChange={(e) => setBasic((v) => ({ ...v, position: e.target.value }))} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" value={basic.department} onChange={(e) => setBasic((v) => ({ ...v, department: e.target.value }))} />
              </div>
              <div className="md:col-span-2 flex items-center justify-end gap-2">
                <Button type="submit">Save</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={saveContact}>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={contact.phone} onChange={(e) => setContact((v) => ({ ...v, phone: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={contact.location} onChange={(e) => setContact((v) => ({ ...v, location: e.target.value }))} />
              </div>
              <div className="md:col-span-2 flex items-center justify-end gap-2">
                <Button type="submit">Save</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employee Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">Employee ID</div>
            <div>{employee.employeeId}</div>
            <div className="text-muted-foreground">Joining Date</div>
            <div>{employee.joiningDate}</div>
            <div className="text-muted-foreground">Supervisor</div>
            <div>{employee.supervisor}</div>
            <div className="text-muted-foreground">Employment Type</div>
            <div>{employee.employmentType}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={changePassword}>
            <div className="space-y-2">
              <Label htmlFor="current">Current Password</Label>
              <Input id="current" type="password" value={security.currentPassword} onChange={(e) => setSecurity((v) => ({ ...v, currentPassword: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new">New Password</Label>
              <Input id="new" type="password" value={security.newPassword} onChange={(e) => setSecurity((v) => ({ ...v, newPassword: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input id="confirm" type="password" value={security.confirmPassword} onChange={(e) => setSecurity((v) => ({ ...v, confirmPassword: e.target.value }))} />
            </div>
            <div className="md:col-span-3 flex items-center justify-end gap-2">
              <Button type="submit">Change Password</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


