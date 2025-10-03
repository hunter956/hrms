import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Notifications() {
  const [email, setEmail] = useState({ enabled: true, from: "hr@acme.com", smtpHost: "smtp.example.com" });
  const [sms, setSms] = useState({ enabled: false, provider: "Twilio", senderId: "ACMEHR" });

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    // demo-only
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={save}>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={email.enabled} onChange={(e) => setEmail((v) => ({ ...v, enabled: e.target.checked }))} /> Enabled
            </label>
            <div className="space-y-2">
              <Label htmlFor="from">From Address</Label>
              <Input id="from" value={email.from} onChange={(e) => setEmail((v) => ({ ...v, from: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp">SMTP Host</Label>
              <Input id="smtp" value={email.smtpHost} onChange={(e) => setEmail((v) => ({ ...v, smtpHost: e.target.value }))} />
            </div>
            <div className="flex items-center justify-end">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SMS Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={save}>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={sms.enabled} onChange={(e) => setSms((v) => ({ ...v, enabled: e.target.checked }))} /> Enabled
            </label>
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <Input id="provider" value={sms.provider} onChange={(e) => setSms((v) => ({ ...v, provider: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sender">Sender ID</Label>
              <Input id="sender" value={sms.senderId} onChange={(e) => setSms((v) => ({ ...v, senderId: e.target.value }))} />
            </div>
            <div className="flex items-center justify-end">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


