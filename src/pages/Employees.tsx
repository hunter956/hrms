import { useState } from "react";
import { Plus, Filter, Download, Clock, Calendar, DollarSign, TrendingUp, LogOut, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div className="relative">
          <h1 className="text-4xl font-bold text-[#1e293b]">
            Employee Management
          </h1>
          <p className="text-[#64748b] mt-3 text-lg">
            Manage your workforce and employee information
          </p>
          <div className="absolute -top-2 -left-2 w-12 h-12 bg-[#0ea5e9]/20 rounded-full blur-xl"></div>
        </div>
        <Button 
          onClick={() => window.location.href = '/employees/add'}
          className="px-6 py-3 h-auto"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Employee
        </Button>
      </div>

      <div className="bg-[#f9fafb] p-6 rounded-xl shadow-elevated border border-[#e2e8f0]">
        <h2 className="text-lg font-semibold text-[#1e293b] mb-4">Related Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Button variant="outline" className="justify-start gap-2" onClick={() => window.open('/employees', '_blank', 'noopener,noreferrer')}>
            <Users className="h-4 w-4" /> Employee Management
          </Button>
          <Button variant="outline" className="justify-start gap-2" onClick={() => window.open('/attendance', '_blank', 'noopener,noreferrer')}>
            <Clock className="h-4 w-4" /> Attendance & Time
          </Button>
          <Button variant="outline" className="justify-start gap-2" onClick={() => window.open('/leaves', '_blank', 'noopener,noreferrer')}>
            <Calendar className="h-4 w-4" /> Leave Management
          </Button>
          <Button variant="outline" className="justify-start gap-2" onClick={() => window.open('/payroll', '_blank', 'noopener,noreferrer')}>
            <DollarSign className="h-4 w-4" /> Payroll Management
          </Button>
          <Button variant="outline" className="justify-start gap-2" onClick={() => window.open('/performance', '_blank', 'noopener,noreferrer')}>
            <TrendingUp className="h-4 w-4" /> Performance
          </Button>
          <Button variant="outline" className="justify-start gap-2" onClick={() => window.open('/exit', '_blank', 'noopener,noreferrer')}>
            <LogOut className="h-4 w-4" /> Exit Management
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 bg-[#f9fafb] p-6 rounded-xl shadow-elevated border border-[#e2e8f0]">
        <div className="flex-1">
          <Input
            placeholder="Search employees by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
          />
        </div>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-full sm:w-[200px] bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="hr">HR</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          More Filters
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
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