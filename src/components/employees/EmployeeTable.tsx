import { useState } from "react";
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: "Active" | "Inactive" | "On Leave";
  joinDate: string;
  avatar?: string;
}

const sampleEmployees: Employee[] = [
  {
    id: "EMP001",
    name: "John Doe",
    email: "john.doe@company.com",
    department: "Engineering",
    position: "Senior Developer",
    status: "Active",
    joinDate: "2023-01-15",
  },
  {
    id: "EMP002", 
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    department: "Marketing", 
    position: "Marketing Manager",
    status: "Active",
    joinDate: "2022-11-20",
  },
  {
    id: "EMP003",
    name: "Mike Chen",
    email: "mike.chen@company.com", 
    department: "Sales",
    position: "Sales Representative",
    status: "On Leave",
    joinDate: "2023-03-10",
  },
  {
    id: "EMP004",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    department: "HR",
    position: "HR Specialist", 
    status: "Active",
    joinDate: "2022-08-05",
  },
];

export function EmployeeTable() {
  const [employees] = useState<Employee[]>(sampleEmployees);

  const getStatusColor = (status: Employee["status"]) => {
  switch (status) {
    case "Active":
      return "bg-hrms-success text-white";
    case "On Leave":
      return "bg-hrms-warning text-white";
    case "Inactive":
      return "bg-destructive text-white";
    default:
      return "bg-muted text-white";
  }
};

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-gradient-card rounded-xl shadow-elevated border border-border/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-muted/50 to-muted/30 border-b border-border/50">
            <TableHead className="font-semibold text-foreground">Employee</TableHead>
            <TableHead className="font-semibold text-foreground">Department</TableHead>
            <TableHead className="font-semibold text-foreground">Position</TableHead>
            <TableHead className="font-semibold text-foreground">Status</TableHead>
            <TableHead className="font-semibold text-foreground">Join Date</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id} className="hover:bg-muted/20 transition-colors border-b border-border/30">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                    <AvatarImage src={employee.avatar} alt={employee.name} />
                    <AvatarFallback className="bg-gradient-primary/10 text-primary font-semibold">
                      {getInitials(employee.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{employee.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {employee.email}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(employee.status)}>
                  {employee.status}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(employee.joinDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-[#e0f2fe] hover:text-[#1e293b] transition-all duration-300 hover:scale-[1.02]">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}