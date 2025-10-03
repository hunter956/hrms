import { useState } from "react";
import { Plus, Filter, Download } from "lucide-react";
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Employee Management
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Manage your workforce and employee information
          </p>
          <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-primary/10 rounded-full blur-xl"></div>
        </div>
        <Button 
          onClick={() => window.location.href = '/employees/add'}
          className="bg-gradient-primary shadow-primary hover:shadow-elevated hover:scale-105 transition-all duration-300 px-6 py-3 h-auto"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Employee
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 bg-gradient-card p-6 rounded-xl shadow-elevated border border-border/50">
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
        <Button variant="outline" className="flex items-center gap-2 hover:bg-accent/50 hover:scale-105 transition-all duration-300">
          <Filter className="h-4 w-4" />
          More Filters
        </Button>
        <Button variant="outline" className="flex items-center gap-2 hover:bg-accent/50 hover:scale-105 transition-all duration-300">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Employee Table */}
      <EmployeeTable />

      {/* Employee Stats Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-gradient-card p-6 rounded-xl shadow-elevated text-center border border-border/50 hover:scale-105 transition-all duration-300 hover:shadow-primary/5">
          <div className="text-3xl font-bold text-primary mb-2">1,248</div>
          <div className="text-sm text-muted-foreground">Total Employees</div>
        </div>
        <div className="bg-gradient-card p-6 rounded-xl shadow-elevated text-center border border-border/50 hover:scale-105 transition-all duration-300 hover:shadow-hrms-success/5">
          <div className="text-3xl font-bold text-hrms-success mb-2">1,195</div>
          <div className="text-sm text-muted-foreground">Active</div>
        </div>
        <div className="bg-gradient-card p-6 rounded-xl shadow-elevated text-center border border-border/50 hover:scale-105 transition-all duration-300 hover:shadow-accent/5">
          <div className="text-3xl font-bold text-accent mb-2">28</div>
          <div className="text-sm text-muted-foreground">On Leave</div>
        </div>
        <div className="bg-gradient-card p-6 rounded-xl shadow-elevated text-center border border-border/50 hover:scale-105 transition-all duration-300 hover:shadow-destructive/5">
          <div className="text-3xl font-bold text-destructive mb-2">25</div>
          <div className="text-sm text-muted-foreground">Inactive</div>
        </div>
      </div>
    </div>
  );
}