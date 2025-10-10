import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthLayout } from "./components/layout/AuthLayout";
import { Layout } from "./components/layout/Layout";
import PrivateRoute from "@/components/PrivateRoute";

import Login from "@/pages/Login";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import Dashboard from "@/pages/Dashboard";
import Employees from "@/pages/Employees";
import AddEmployee from "@/pages/AddEmployee";
import Organization from "@/pages/Organization";
import Attendance from "@/pages/Attendance";
import Leaves from "@/pages/Leaves";
import Payroll from "@/pages/Payroll";
import Recruitment from "@/pages/Recruitment";
import Performance from "@/pages/Performance";
import Training from "@/pages/Training";
import Portal from "@/pages/Portal";
import Notifications from "@/pages/Notifications";
import Integrations from "@/pages/Integrations";
import Analytics from "@/pages/Analytics";
import Profile from "@/pages/Profile";
import Expenses from "@/pages/Expenses";
import Compliance from "@/pages/Compliance";
import Exit from "@/pages/Exit";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

import { queryClient } from "@/lib/queryClient";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* ✅ Public Routes */}
          <Route element={<PrivateRoute />}>
            {/* Protected Routes - With Layout */}
            <Route
              path="/"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/employees"
              element={
                <Layout>
                  <Employees />
                </Layout>
              }
            />
            <Route
              path="/employees/add"
              element={
                <Layout>
                  <AddEmployee />
                </Layout>
              }
            />
            <Route
              path="/organization"
              element={
                <Layout>
                  <Organization />
                </Layout>
              }
            />
            <Route
              path="/attendance"
              element={
                <Layout>
                  <Attendance />
                </Layout>
              }
            />
            <Route
              path="/leaves"
              element={
                <Layout>
                  <Leaves />
                </Layout>
              }
            />
            <Route
              path="/payroll"
              element={
                <Layout>
                  <Payroll />
                </Layout>
              }
            />
            <Route
              path="/recruitment"
              element={
                <Layout>
                  <Recruitment />
                </Layout>
              }
            />
            <Route
              path="/performance"
              element={
                <Layout>
                  <Performance />
                </Layout>
              }
            />
            <Route
              path="/training"
              element={
                <Layout>
                  <Training />
                </Layout>
              }
            />
            <Route
              path="/portal"
              element={
                <Layout>
                  <Portal />
                </Layout>
              }
            />
            <Route
              path="/notifications"
              element={
                <Layout>
                  <Notifications />
                </Layout>
              }
            />
            <Route
              path="/integrations"
              element={
                <Layout>
                  <Integrations />
                </Layout>
              }
            />
            <Route
              path="/analytics"
              element={
                <Layout>
                  <Analytics />
                </Layout>
              }
            />
            <Route
              path="/profile"
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
            <Route
              path="/expenses"
              element={
                <Layout>
                  <Expenses />
                </Layout>
              }
            />
            <Route
              path="/compliance"
              element={
                <Layout>
                  <Compliance />
                </Layout>
              }
            />
            <Route
              path="/exit"
              element={
                <Layout>
                  <Exit />
                </Layout>
              }
            />
            <Route
              path="/settings"
              element={
                <Layout>
                  <Settings />
                </Layout>
              }
            />
            <Route
              path="*"
              element={
                <Layout>
                  <NotFound />
                </Layout>
              }
            />
          </Route>

          {/* 🚪 Public Routes (Login & Forgot Password) */}
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <AuthLayout>
                <ForgotPassword />
              </AuthLayout>
            }
          />
        <Route
          path="/reset-password"
          element={
            <AuthLayout>
              <ResetPassword />
            </AuthLayout>
          }
        />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
