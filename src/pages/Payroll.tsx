import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SalaryStructure from "@/components/payroll/SalaryStructure";
import SalaryCalculation from "@/components/payroll/SalaryCalculation";
import SalarySlips from "@/components/payroll/SalarySlips";
import TaxDeductions from "@/components/payroll/TaxDeductions";

export default function Payroll() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Employee Management
      </Button>

      <header>
        <h1 className="text-3xl font-bold text-[#1e293b]">
          Payroll Management
        </h1>
        <p className="text-[#64748b] mt-2">
          Manage salary structures, calculations, tax deductions, and generate salary slips
        </p>
      </header>

      <Tabs defaultValue="structure" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto bg-[#f9fafb] border border-[#e2e8f0]">
          <TabsTrigger value="structure" className="data-[state=active]:bg-[#2563eb] data-[state=active]:text-white hover:bg-[#e0f2fe] hover:text-[#1e293b] transition-all duration-300 hover:scale-[1.02]">Salary Structure</TabsTrigger>
          <TabsTrigger value="calculation" className="data-[state=active]:bg-[#2563eb] data-[state=active]:text-white hover:bg-[#e0f2fe] hover:text-[#1e293b] transition-all duration-300 hover:scale-[1.02]">Salary Calculation</TabsTrigger>
          <TabsTrigger value="slips" className="data-[state=active]:bg-[#2563eb] data-[state=active]:text-white hover:bg-[#e0f2fe] hover:text-[#1e293b] transition-all duration-300 hover:scale-[1.02]">Salary Slips</TabsTrigger>
          <TabsTrigger value="tax" className="data-[state=active]:bg-[#2563eb] data-[state=active]:text-white hover:bg-[#e0f2fe] hover:text-[#1e293b] transition-all duration-300 hover:scale-[1.02]">Tax Deductions</TabsTrigger>
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