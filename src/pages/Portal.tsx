import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import LeaveApplication from "@/components/portal/LeaveApplication";
import LeaveApproval from "@/components/portal/LeaveApproval";
import AttendanceView from "@/components/portal/AttendanceView";
import PayslipView from "@/components/portal/PayslipView";
import ExpenseRequests from "@/components/portal/ExpenseRequests";
import ExpenseApproval from "@/components/portal/ExpenseApproval";
import ProfileUpdateRequest from "@/components/portal/ProfileUpdateRequest";

// Hardcoded user data
const DEMO_USER = {
  id: "demo-user-123",
  email: "john.doe@company.com",
  name: "John Doe",
  role: "manager", // Can be: "employee", "manager", "admin"
};

export default function Portal() {
  const [user, setUser] = useState(DEMO_USER);
  const [isManager, setIsManager] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate checking user roles
    checkUserRoles(DEMO_USER.id);
  }, []);

  const checkUserRoles = (userId: string) => {
    // Hardcoded role logic - you can modify DEMO_USER.role above to test different views
    const userRole = DEMO_USER.role;
    
    setIsManager(userRole === "manager" || userRole === "admin");
    setIsAdmin(userRole === "admin");
    
    console.log("User roles loaded:", { 
      userId, 
      role: userRole, 
      isManager: userRole === "manager" || userRole === "admin",
      isAdmin: userRole === "admin" 
    });
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {isManager || isAdmin ? "Manager & Employee Portal" : "Employee Self-Service Portal"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {isManager || isAdmin 
            ? "Manage your tasks and approve team requests" 
            : "Apply for leaves, view attendance, and manage your profile"}
        </p>
      </header>

      <Tabs defaultValue="leave-apply" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 lg:w-auto">
          <TabsTrigger value="profile">Update Profile</TabsTrigger>
          <TabsTrigger value="payslips">Payslips</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leave-apply">Apply Leave</TabsTrigger>

          {(isManager || isAdmin) && (
            <>
              <TabsTrigger value="leave-approval">Approve Leaves</TabsTrigger>
            </>
          )}

          <TabsTrigger value="expenses">Expenses</TabsTrigger>

          {(isManager || isAdmin) && (
            <>
              <TabsTrigger value="expense-approval">Approve Expenses</TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="leave-apply" className="space-y-4">
          <LeaveApplication userId={user.id} />
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <AttendanceView userId={user.id} />
        </TabsContent>

        <TabsContent value="payslips" className="space-y-4">
          <PayslipView userId={user.id} />
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <ExpenseRequests userId={user.id} />
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <ProfileUpdateRequest userId={user.id} />
        </TabsContent>

        {(isManager || isAdmin) && (
          <>
            <TabsContent value="leave-approval" className="space-y-4">
              <LeaveApproval managerId={user.id} />
            </TabsContent>

            <TabsContent value="expense-approval" className="space-y-4">
              <ExpenseApproval managerId={user.id} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}