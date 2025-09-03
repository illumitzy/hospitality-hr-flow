import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: number;
    period: string;
  };
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  trend = "neutral",
  className 
}: MetricCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-danger";
      default:
        return "text-muted-foreground";
    }
  };

  const getTrendIcon = () => {
    if (!change) return null;
    const sign = change.value >= 0 ? "+" : "";
    return `${sign}${change.value}%`;
  };

  return (
    <Card className={`shadow-soft hover:shadow-medium transition-shadow duration-200 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground mb-1">
          {value}
        </div>
        {change && (
          <p className={`text-xs ${getTrendColor()}`}>
            {getTrendIcon()} from {change.period}
          </p>
        )}
      </CardContent>
    </Card>
  );
}