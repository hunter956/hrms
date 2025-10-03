import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalaryStructure from "@/components/payroll/SalaryStructure";
import SalaryCalculation from "@/components/payroll/SalaryCalculation";
import SalarySlips from "@/components/payroll/SalarySlips";
import TaxDeductions from "@/components/payroll/TaxDeductions";

export default function Payroll() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Payroll Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage salary structures, calculations, tax deductions, and generate salary slips
        </p>
      </header>

      <Tabs defaultValue="structure" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="structure">Salary Structure</TabsTrigger>
          <TabsTrigger value="calculation">Salary Calculation</TabsTrigger>
          <TabsTrigger value="slips">Salary Slips</TabsTrigger>
          <TabsTrigger value="tax">Tax Deductions</TabsTrigger>
        </TabsList>

        <TabsContent value="structure" className="space-y-4">
          <SalaryStructure />
        </TabsContent>

        <TabsContent value="calculation" className="space-y-4">
          <SalaryCalculation />
        </TabsContent>

        <TabsContent value="slips" className="space-y-4">
          <SalarySlips />
        </TabsContent>

        <TabsContent value="tax" className="space-y-4">
          <TaxDeductions />
        </TabsContent>
      </Tabs>
    </div>
  );
}
