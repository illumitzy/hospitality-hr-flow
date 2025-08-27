import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { AttendanceChart } from "@/components/dashboard/AttendanceChart";
import { PayrollOverview } from "@/components/dashboard/PayrollOverview";
import { Users, Clock, DollarSign, TrendingUp, Heart, AlertTriangle } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome to your HR management system. Here's what's happening today.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <MetricCard
            title="Total Employees"
            value="47"
            icon={Users}
            change={{ value: 5.2, period: "last month" }}
            trend="up"
          />
          <MetricCard
            title="Present Today"
            value="42"
            icon={Clock}
            change={{ value: -2.1, period: "yesterday" }}
            trend="down"
          />
          <MetricCard
            title="Monthly Payroll"
            value="₱945K"
            icon={DollarSign}
            change={{ value: 3.8, period: "last month" }}
            trend="up"
          />
          <MetricCard
            title="Avg Performance"
            value="4.2/5"
            icon={TrendingUp}
            change={{ value: 1.5, period: "last quarter" }}
            trend="up"
          />
          <MetricCard
            title="Benefits Enrolled"
            value="43"
            icon={Heart}
            change={{ value: 8.7, period: "last month" }}
            trend="up"
          />
          <MetricCard
            title="Pending Reviews"
            value="8"
            icon={AlertTriangle}
            className="md:col-span-2 lg:col-span-1"
          />
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AttendanceChart />
          <PayrollOverview />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <RecentActivity />
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-subtle rounded-lg p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors text-sm">
                  Add New Employee
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors text-sm">
                  Process Payroll
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors text-sm">
                  Generate Reports
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors text-sm">
                  Manage Benefits
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
