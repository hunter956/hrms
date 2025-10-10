import { useState } from "react";
import { Plus, Filter, Download, Clock, Calendar, DollarSign, TrendingUp, LogOut, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Employees() {
  const navigate = useNavigate();


  return (
    <div className="space-y-8 animate-fade-in">
      {/* <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div className="relative">
          <h1 className="text-4xl font-bold text-[#1e293b] inline-block mr-3">
           Employee Management
          </h1>
          <p className="text-[#64748b] text-lg inline-block">
            (Manage your workforce and employee information)
          </p>
          <div className="absolute -top-2 -left-2 w-12 h-12 bg-[#0ea5e9]/20 rounded-full blur-xl"></div>
        </div>
      </div> */}

      <div className="bg-[#f9fafb] p-6 rounded-xl shadow-elevated border border-[#e2e8f0]">
      <h2 className="text-lg font-semibold text-[#1e293b] mb-4">Related Modules</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* <Button variant="outline" className="justify-start gap-2" onClick={() => navigate('/employees')}>
          <Users className="h-4 w-4" /> Employee Management
        </Button> */}
        <Button variant="outline" className="justify-start gap-2" onClick={() => navigate('/attendance')}>
          <Clock className="h-4 w-4" /> Attendance & Time
        </Button>
        <Button variant="outline" className="justify-start gap-2" onClick={() => navigate('/leaves')}>
          <Calendar className="h-4 w-4" /> Leave Management
        </Button>
        <Button variant="outline" className="justify-start gap-2" onClick={() => navigate('/payroll')}>
          <DollarSign className="h-4 w-4" /> Payroll Management
        </Button>
        <Button variant="outline" className="justify-start gap-2" onClick={() => navigate('/performance')}>
          <TrendingUp className="h-4 w-4" /> Performance
        </Button>
        <Button variant="outline" className="justify-start gap-2" onClick={() => navigate('/exit')}>
          <LogOut className="h-4 w-4" /> Exit Management
        </Button>
      </div>
    </div>


      {/* Employee Table */}
      <EmployeeTable />

      {/* Employee Stats Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-[#f9fafb] p-6 rounded-xl shadow-elevated text-center border border-[#e2e8f0] hover:scale-105 transition-all duration-300 hover:shadow-lg">
          <div className="text-3xl font-bold text-[#2563eb] mb-2">1,248</div>
          <div className="text-sm text-[#64748b]">Total Employees</div>
        </div>
        <div className="bg-[#f9fafb] p-6 rounded-xl shadow-elevated text-center border border-[#e2e8f0] hover:scale-105 transition-all duration-300 hover:shadow-lg">
          <div className="text-3xl font-bold text-hrms-success mb-2">1,195</div>
          <div className="text-sm text-[#64748b]">Active</div>
        </div>
        <div className="bg-[#f9fafb] p-6 rounded-xl shadow-elevated text-center border border-[#e2e8f0] hover:scale-105 transition-all duration-300 hover:shadow-lg">
          <div className="text-3xl font-bold text-[#0ea5e9] mb-2">28</div>
          <div className="text-sm text-[#64748b]">On Leave</div>
        </div>
        <div className="bg-[#f9fafb] p-6 rounded-xl shadow-elevated text-center border border-[#e2e8f0] hover:scale-105 transition-all duration-300 hover:shadow-lg">
          <div className="text-3xl font-bold text-destructive mb-2">25</div>
          <div className="text-sm text-[#64748b]">Inactive</div>
        </div>
      </div>
    </div>
  );
}