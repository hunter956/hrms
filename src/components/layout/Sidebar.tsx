import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Users, 
  Building2, 
  Clock, 
  Calendar, 
  DollarSign, 
  UserCheck, 
  TrendingUp, 
  GraduationCap, 
  Settings, 
  Receipt, 
  FileText, 
  LogOut, 
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Employee Management", url: "/employees", icon: Users },
  { title: "Organization Structure", url: "/organization", icon: Building2 },
  { title: "Attendance & Time", url: "/attendance", icon: Clock },
  { title: "Leave Management", url: "/leaves", icon: Calendar },
  { title: "Payroll Management", url: "/payroll", icon: DollarSign },
  { title: "Recruitment", url: "/recruitment", icon: UserCheck },
  { title: "Performance", url: "/performance", icon: TrendingUp },
  { title: "Training", url: "/training", icon: GraduationCap },
  { title: "Employee Portal", url: "/portal", icon: Settings },
  { title: "Analytics & Reports", url: "/analytics", icon: BarChart3 },
  { title: "Integrations", url: "/integrations", icon: Settings },
  { title: "Expenses", url: "/expenses", icon: Receipt },
  { title: "Compliance", url: "/compliance", icon: FileText },
  { title: "Exit Management", url: "/exit", icon: LogOut },
];

export function HRMSSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = !open;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavCls = (active: boolean) =>
    active 
      ? "bg-gradient-primary text-primary-foreground shadow-primary/20 shadow-lg border border-primary/20" 
      : "hover:bg-accent/50 hover:text-accent-foreground hover:shadow-sm transition-all duration-300 hover:scale-[1.02]";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} border-r bg-gradient-to-b from-card via-card/90 to-card/80 backdrop-blur-sm shadow-elevated transition-smooth`}
      collapsible="icon"
    >
            <div className="flex h-16 items-center justify-between px-4 border-b border-border/50 bg-gradient-primary/5">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <img
              src="https://globtechnoitsolution.com:8443/ec-admin-dev-ui/assets/images/logo.png"
              alt="GlobTechno Logo"
              className="h-8 w-auto" // Adjusts image height to fit nicely in 64px header
            />
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Glob HRMS
            </h1>
          </div>
        )}
        <SidebarTrigger className="ml-auto hover:bg-accent/50 transition-colors" />
      </div>

      <SidebarContent className="py-4">
        <SidebarGroup>
          {/* <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Core Modules
          </SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`${getNavCls(isActive(item.url))} flex items-center gap-3 px-3 py-2 rounded-lg font-medium`}
                      title={collapsed ? item.title : ""}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}