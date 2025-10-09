import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { AuthLayout } from "./components/layout/AuthLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import Organization from "./pages/Organization";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import Payroll from "./pages/Payroll";
import Portal from "./pages/Portal";
import Expenses from "./pages/Expenses";
import Recruitment from "./pages/Recruitment";
import Performance from "./pages/Performance";
import Training from "./pages/Training";
import Integrations from "./pages/Integrations";
import Analytics from "./pages/Analytics";
import Exit from "./pages/Exit";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Compliance from "./pages/Compliance";
import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes - No Layout */}
          <Route path="/login" element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          } />
          <Route path="/forgot-password" element={
            <AuthLayout>
              <ForgotPassword />
            </AuthLayout>
          } />
          
          {/* Protected Routes - With Layout */}
          <Route path="/" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/employees" element={
            <Layout>
              <Employees />
            </Layout>
          } />
          <Route path="/employees/add" element={
            <Layout>
              <AddEmployee />
            </Layout>
          } />
          {/* Placeholder routes for other modules */}
          <Route path="/organization" element={
            <Layout>
              <Organization />
            </Layout>
          } />
          <Route path="/attendance" element={
            <Layout>
              <Attendance />
            </Layout>
          } />
          <Route path="/leaves" element={
            <Layout>
              <Leaves />
            </Layout>
          } />
          <Route path="/payroll" element={
            <Layout>
              <Payroll />
            </Layout>
          } />
          <Route path="/recruitment" element={
            <Layout>
              <Recruitment />
            </Layout>
          } />
          <Route path="/performance" element={
            <Layout>
              <Performance />
            </Layout>
          } />
          <Route path="/training" element={
            <Layout>
              <Training />
            </Layout>
          } />
          <Route path="/portal" element={
            <Layout>
              <Portal />
            </Layout>
          } />
          <Route path="/notifications" element={
            <Layout>
              <Notifications />
            </Layout>
          } />
          <Route path="/integrations" element={
            <Layout>
              <Integrations />
            </Layout>
          } />
          <Route path="/analytics" element={
            <Layout>
              <Analytics />
            </Layout>
          } />
          <Route path="/profile" element={
            <Layout>
              <Profile />
            </Layout>
          } />
          <Route path="/expenses" element={
            <Layout>
              <Expenses />
            </Layout>
          } />
          <Route path="/compliance" element={
            <Layout>
              <Compliance />
            </Layout>
          } />
          <Route path="/exit" element={
            <Layout>
              <Exit />
            </Layout>
          } />
          <Route path="/settings" element={
            <Layout>
              <Settings />
            </Layout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={
            <Layout>
              <NotFound />
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
