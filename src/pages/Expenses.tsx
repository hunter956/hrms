import ExpenseClaims from "@/components/expenses/ExpenseClaims";
import TravelRequests from "@/components/expenses/TravelRequests";
import Reimbursements from "@/components/expenses/Reimbursements";
import ExpenseReports from "@/components/expenses/ExpenseReports";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Expenses() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Expense & Travel Management</h2>
        <p className="text-muted-foreground">Submit claims, manage travel, track reimbursements and review spending.</p>
      </div>
      <Tabs defaultValue="claims" className="w-full">
        <TabsList className="w-full max-w-full flex flex-wrap gap-2">
          <TabsTrigger value="claims">Expense Claims</TabsTrigger>
          <TabsTrigger value="travel">Travel Requests</TabsTrigger>
          <TabsTrigger value="reimbursements">Reimbursements</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="claims" className="space-y-6">
          <ExpenseClaims />
        </TabsContent>
        <TabsContent value="travel" className="space-y-6">
          <TravelRequests />
        </TabsContent>
        <TabsContent value="reimbursements" className="space-y-6">
          <Reimbursements />
        </TabsContent>
        <TabsContent value="reports" className="space-y-6">
          <ExpenseReports />
        </TabsContent>
      </Tabs>
    </div>
  );
}


