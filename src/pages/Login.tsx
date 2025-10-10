import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Building2, Users, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { setAuthToken } from "@/lib/api"; 

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const API_BASE_URL = import.meta.env.VITE_USER_SERVICE_URL;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), 
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        toast({ 
          title: "Login Failed", 
          description: errorData?.message || "Please check your credentials.", 
          variant: "destructive", 
        });
        return; 
      }

      const data = await response.json();
      
 
      if (!data.token) {
        toast({ 
          title: "Login Failed", 
          description: "No authentication token received.", 
          variant: "destructive", 
        });
        return;
      }

      console.log("Token received, length:", data.token.length);
      

      setAuthToken(data.token);
      
      toast({ 
        title: "Login Successful", 
        description: "Welcome back!", 
        variant: "success", 
        duration: 4000
      });

      setTimeout(() => {
        navigate("/");
      }, 100);

    } catch (error) {
      console.error("Login error:", error);
      toast({ 
        title: "Error", 
        description: "An unexpected error occurred. Please try again.", 
        variant: "destructive", 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-[#f9fafb] via-white to-[#f0f9ff] relative overflow-hidden">

      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>


      <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-gradient-to-r from-[#2563eb]/10 to-[#0ea5e9]/10 blur-3xl"></div>
      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-r from-[#0ea5e9]/10 to-[#2563eb]/10 blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-gradient-to-r from-[#2563eb]/5 to-[#0ea5e9]/5 blur-xl"></div>

      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">

          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r  flex items-center justify-center ">
                  <img src="https://globtechnoitsolution.com:8443/ec-admin-dev-ui/assets/images/logo.png"
                  alt="GlobeTecno Logo" className="w-16 h-16 rounded-2xl object-contain"/>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-[#1e293b]">GlobTecnho</h1>
                  <p className="text-[#64748b] text-lg">Human Resource Management System</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-[#1e293b]">Welcome back!</h2>
                <p className="text-[#64748b] text-lg leading-relaxed">
                  Access your comprehensive HR dashboard and manage all aspects of your workforce 
                  with our powerful, intuitive platform.
                </p>
              </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-[#e2e8f0] bg-gradient-to-br from-white to-[#f9fafb] shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] flex items-center justify-center">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-[#1e293b]">Employee Management</span>
                </div>
                <p className="text-sm text-[#64748b]">Comprehensive employee lifecycle management</p>
              </div>
              
              <div className="p-4 rounded-xl border border-[#e2e8f0] bg-gradient-to-br from-white to-[#f9fafb] shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#0ea5e9] to-[#2563eb] flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-[#1e293b]">Leave & Attendance</span>
                </div>
                <p className="text-sm text-[#64748b]">Streamlined leave and attendance tracking</p>
              </div>
              
              <div className="p-4 rounded-xl border border-[#e2e8f0] bg-gradient-to-br from-white to-[#f9fafb] shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-[#1e293b]">Analytics & Reports</span>
                </div>
                <p className="text-sm text-[#64748b]">Powerful insights and reporting tools</p>
              </div>
              
              <div className="p-4 rounded-xl border border-[#e2e8f0] bg-gradient-to-br from-white to-[#f9fafb] shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#0ea5e9] to-[#2563eb] flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-[#1e293b]">Organization</span>
                </div>
                <p className="text-sm text-[#64748b]">Complete organizational structure management</p>
              </div>
            </div>


            <div className="flex gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#2563eb]">500+</div>
                <div className="text-sm text-[#64748b]">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#0ea5e9]">99.9%</div>
                <div className="text-sm text-[#64748b]">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#2563eb]">24/7</div>
                <div className="text-sm text-[#64748b]">Support</div>
              </div>
            </div>
          </div>


          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md border-[#e2e8f0] bg-gradient-to-br from-white to-[#f9fafb] shadow-2xl">
              <CardHeader className="space-y-2 text-center pb-8">
                <CardTitle className="text-2xl font-bold text-[#1e293b]">Sign In</CardTitle>
                <p className="text-[#64748b]">Enter your credentials to access your account</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-[#1e293b]">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#64748b]" />
                      <Input
                        id="username"
                        name="username"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="pl-10 border-[#e2e8f0] focus:border-[#2563eb] focus:ring-[#2563eb]"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-[#1e293b]">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#64748b]" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 border-[#e2e8f0] focus:border-[#2563eb] focus:ring-[#2563eb]"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#64748b] hover:text-[#1e293b]"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        disabled={isLoading}
                      />
                      <Label htmlFor="remember" className="text-sm text-[#64748b]">
                        Remember me
                      </Label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-[#2563eb] hover:text-[#1d4ed8] font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] hover:from-[#1d4ed8] hover:to-[#0284c7] text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#e2e8f0]"></div>
                  </div>
                  {/* <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-[#64748b]">Or continue with</span>
                  </div> */}
                </div>

                {/* <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="border-[#e2e8f0] hover:bg-[#f9fafb] hover:border-[#2563eb] transition-all duration-300"
                    disabled={isLoading}
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#e2e8f0] hover:bg-[#f9fafb] hover:border-[#2563eb] transition-all duration-300"
                    disabled={isLoading}
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </Button>
                </div> */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}