import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, ShieldCheck, LifeBuoy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import emailjs from '@emailjs/browser';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Generate a reset token (in production, this should come from your backend)
      const resetToken = Math.random().toString(36).substring(2, 15);
      const resetLink = "http://localhost:8080/reset-password";

      // EmailJS configuration
      const serviceId = 'service_w2vwoup'; // Replace with your EmailJS service ID
      const templateId = 'template_jv7m08q'; // Replace with your EmailJS template ID
      const publicKey = 'PAh4Fg2yBcP4iwBry'; // Replace with your EmailJS public key

      // Template parameters
      const templateParams = {
        email:email,
        to_email: email,
        // reset_link: resetLink,
        // user_email: email,
      };

      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      setSubmitted(true);
    } catch (err) {
      console.error('Failed to send email:', err);
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-[#f9fafb] via-white to-[#f0f9ff] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-gradient-to-r from-[#2563eb]/10 to-[#0ea5e9]/10 blur-3xl"></div>
      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-r from-[#0ea5e9]/10 to-[#2563eb]/10 blur-2xl"></div>

      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <Card className="w-full max-w-lg border-[#e2e8f0] bg-gradient-to-br from-white to-[#f9fafb] shadow-2xl">
          <CardHeader className="space-y-2 text-center pb-6">
            <CardTitle className="text-2xl font-bold text-[#1e293b]">Forgot Password</CardTitle>
            <p className="text-[#64748b]">We'll send you a secure link to reset it</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {submitted ? (
              <div className="space-y-4 text-center">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] flex items-center justify-center shadow-lg">
                  <ShieldCheck className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <div className="text-lg font-semibold text-[#1e293b]">Check your email</div>
                  <p className="text-sm text-[#64748b]">
                    If an account exists for <span className="font-medium text-[#1e293b]">{email}</span>, you'll receive a password reset link shortly.
                  </p>
                </div>
                <div className="flex justify-center gap-3">
                  <Link to="/login">
                    <Button variant="outline" className="border-[#e2e8f0]">Back to login</Button>
                  </Link>
                  <Button onClick={() => setSubmitted(false)} className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white">Use different email</Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-[#1e293b]">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#64748b]" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 border-[#e2e8f0] focus:border-[#2563eb] focus:ring-[#2563eb]"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] hover:from-[#1d4ed8] hover:to-[#0284c7] text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send reset link'
                  )}
                </Button>

                <div className="flex items-center justify-between text-sm">
                  <Link to="/login" className="text-[#2563eb] hover:text-[#1d4ed8] font-medium flex items-center gap-1">
                    <ArrowLeft className="h-4 w-4" /> Back to login
                  </Link>
                  <a href="#" className="text-[#64748b] hover:text-[#1e293b] flex items-center gap-1">
                    <LifeBuoy className="h-4 w-4" /> Need help?
                  </a>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}