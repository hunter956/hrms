import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import LeaveApplication from "@/components/portal/LeaveApplication";
import LeaveApproval from "@/components/portal/LeaveApproval";
import AttendanceView from "@/components/portal/AttendanceView";
import PayslipView from "@/components/portal/PayslipView";
import ExpenseRequests from "@/components/portal/ExpenseRequests";
import ExpenseApproval from "@/components/portal/ExpenseApproval";
import ProfileUpdateRequest from "@/components/portal/ProfileUpdateRequest";
import { User } from "@supabase/supabase-js";

export default function Portal() {
  const [user, setUser] = useState<User | null>(null);
  const [isManager, setIsManager] = useState(true); // Demo: show as manager
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  
  // Demo user ID for preview
  const demoUserId = "demo-user-id";

  useEffect(() => {
    // Get current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
        checkUserRoles(user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        checkUserRoles(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUserRoles = async (userId: string) => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);

    if (error) {
      console.log("Role check error:", error);
      return;
    }

    const roles = data?.map(r => r.role) || [];
    setIsManager(roles.includes("manager"));
    setIsAdmin(roles.includes("admin"));
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
          <TabsTrigger value="leave-apply">Apply Leave</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="payslips">Payslips</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="profile">Update Profile</TabsTrigger>
          {(isManager || isAdmin) && (
            <>
              <TabsTrigger value="leave-approval">Approve Leaves</TabsTrigger>
              <TabsTrigger value="expense-approval">Approve Expenses</TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="leave-apply" className="space-y-4">
          <LeaveApplication userId={user?.id || demoUserId} />
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <AttendanceView userId={user?.id || demoUserId} />
        </TabsContent>

        <TabsContent value="payslips" className="space-y-4">
          <PayslipView userId={user?.id || demoUserId} />
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <ExpenseRequests userId={user?.id || demoUserId} />
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <ProfileUpdateRequest userId={user?.id || demoUserId} />
        </TabsContent>

        {(isManager || isAdmin) && (
          <>
            <TabsContent value="leave-approval" className="space-y-4">
              <LeaveApproval managerId={user?.id || demoUserId} />
            </TabsContent>

            <TabsContent value="expense-approval" className="space-y-4">
              <ExpenseApproval managerId={user?.id || demoUserId} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}
