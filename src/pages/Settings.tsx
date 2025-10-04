import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  const [account, setAccount] = useState({ email: "admin@company.com", password: "" });
  const [notif, setNotif] = useState({ email: true, push: false, approvals: true, reminders: true });
  const [privacy, setPrivacy] = useState({ showEmail: true, showPhone: false, showDepartment: true });
  const [appearance, setAppearance] = useState({ theme: "system" as "light" | "dark" | "system", density: "comfortable" });
  const [language, setLanguage] = useState("en");
  const [security, setSecurity] = useState({ twoFA: false, sessions: 3 });

  const save = (e: React.FormEvent) => { e.preventDefault(); };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Configure your preferences and account options.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={save}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={account.email} onChange={(e) => setAccount((v) => ({ ...v, email: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Change Password</Label>
                <Input id="password" type="password" value={account.password} onChange={(e) => setAccount((v) => ({ ...v, password: e.target.value }))} />
              </div>
              <div className="flex justify-end">
                <Button type="submit">Save</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <label className="flex items-center justify-between text-sm">
              <span>Email Alerts</span>
              <Switch checked={notif.email} onCheckedChange={(v) => setNotif((n) => ({ ...n, email: v }))} />
            </label>
            <label className="flex items-center justify-between text-sm">
              <span>Push Notifications</span>
              <Switch checked={notif.push} onCheckedChange={(v) => setNotif((n) => ({ ...n, push: v }))} />
            </label>
            <label className="flex items-center justify-between text-sm">
              <span>Approval Updates</span>
              <Switch checked={notif.approvals} onCheckedChange={(v) => setNotif((n) => ({ ...n, approvals: v }))} />
            </label>
            <label className="flex items-center justify-between text-sm">
              <span>Reminders</span>
              <Switch checked={notif.reminders} onCheckedChange={(v) => setNotif((n) => ({ ...n, reminders: v }))} />
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <label className="flex items-center justify-between text-sm">
              <span>Show Email</span>
              <Switch checked={privacy.showEmail} onCheckedChange={(v) => setPrivacy((p) => ({ ...p, showEmail: v }))} />
            </label>
            <label className="flex items-center justify-between text-sm">
              <span>Show Phone</span>
              <Switch checked={privacy.showPhone} onCheckedChange={(v) => setPrivacy((p) => ({ ...p, showPhone: v }))} />
            </label>
            <label className="flex items-center justify-between text-sm">
              <span>Show Department</span>
              <Switch checked={privacy.showDepartment} onCheckedChange={(v) => setPrivacy((p) => ({ ...p, showDepartment: v }))} />
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={appearance.theme} onValueChange={(v) => setAppearance((a) => ({ ...a, theme: v as any }))}>
                <SelectTrigger><SelectValue placeholder="Theme" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Density</Label>
              <Select value={appearance.density} onValueChange={(v) => setAppearance((a) => ({ ...a, density: v }))}>
                <SelectTrigger><SelectValue placeholder="Density" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="comfortable">Comfortable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Language</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={language} onValueChange={(v) => setLanguage(v)}>
              <SelectTrigger className="w-[220px]"><SelectValue placeholder="Language" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <label className="flex items-center justify-between text-sm">
              <span>Two-Factor Authentication</span>
              <Switch checked={security.twoFA} onCheckedChange={(v) => setSecurity((s) => ({ ...s, twoFA: v }))} />
            </label>
            <div className="text-sm text-muted-foreground">Active Sessions: {security.sessions}</div>
            <div>
              <Button variant="outline" size="sm" className="hover:bg-[#e0f2fe] hover:text-[#1e293b] transition-all duration-300 hover:scale-[1.02]">Manage Sessions</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


