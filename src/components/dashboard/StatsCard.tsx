import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon: Icon 
}: StatsCardProps) {
  const changeColor = {
    positive: "text-hrms-success",
    negative: "text-destructive", 
    neutral: "text-muted-foreground"
  }[changeType];

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-white to-[#f9fafb] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-[#e2e8f0] group">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-[#2563eb] to-[#0ea5e9] rounded-full blur-xl"></div>
      </div>
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
        <CardTitle className="text-sm font-medium text-[#64748b] group-hover:text-[#1e293b] transition-colors">
          {title}
        </CardTitle>
        <div className="p-3 bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] rounded-xl group-hover:from-[#2563eb]/10 group-hover:to-[#0ea5e9]/10 transition-all duration-300 shadow-sm">
          <Icon className="h-5 w-5 text-[#2563eb] group-hover:text-[#0ea5e9] transition-colors" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-3xl font-bold text-[#1e293b] mb-2 group-hover:text-[#2563eb] transition-colors">{value}</div>
        {change && (
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              changeType === 'positive' ? 'bg-green-500' : 
              changeType === 'negative' ? 'bg-red-500' : 'bg-[#64748b]'
            }`}></div>
            <p className={`text-sm ${changeColor} font-medium`}>
              {change}
            </p>
          </div>
        )}
      </CardContent>
      
      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb]/5 to-[#0ea5e9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Card>
  );
}