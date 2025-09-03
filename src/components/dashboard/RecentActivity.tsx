import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, DollarSign } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "attendance" | "payroll" | "employee";
  message: string;
  time: string;
  status?: "success" | "warning" | "info";
}

const recentActivities: ActivityItem[] = [
  {
    id: "1",
    type: "attendance",
    message: "Maria Santos checked in late (9:15 AM)",
    time: "2 hours ago",
    status: "warning"
  },
  {
    id: "2",
    type: "payroll",
    message: "November payroll processed successfully",
    time: "1 day ago",
    status: "success"
  },
  {
    id: "3",
    type: "employee",
    message: "New employee John Doe onboarded",
    time: "2 days ago",
    status: "info"
  },
  {
    id: "4",
    type: "attendance",
    message: "5 employees submitted overtime requests",
    time: "3 days ago",
    status: "info"
  },
  {
    id: "5",
    type: "payroll",
    message: "Sarah Wilson received performance bonus",
    time: "1 week ago",
    status: "success"
  }
];

export function RecentActivity() {
  const getIcon = (type: string) => {
    switch (type) {
      case "attendance":
        return Clock;
      case "payroll":
        return DollarSign;
      case "employee":
        return User;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "success":
        return "bg-success text-success-foreground";
      case "warning":
        return "bg-warning text-warning-foreground";
      case "info":
        return "bg-secondary-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivities.map((activity) => {
          const Icon = getIcon(activity.type);
          return (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm text-foreground leading-relaxed">
                  {activity.message}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                  {activity.status && (
                    <Badge variant="outline" className={`text-xs ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}