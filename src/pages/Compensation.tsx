import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrendingUp, DollarSign, Award, History, Plus } from "lucide-react";

interface CompensationRecord {
  id: string;
  employeeName: string;
  position: string;
  currentSalary: number;
  salaryGrade: string;
  lastIncrease: {
    date: string;
    amount: number;
    percentage: number;
    reason: string;
  };
  nextReview: string;
  performanceRating: number;
  marketValue: {
    min: number;
    max: number;
    median: number;
  };
}

const compensationData: CompensationRecord[] = [
  {
    id: "1",
    employeeName: "Maria Santos",
    position: "Front Desk Manager",
    currentSalary: 35000,
    salaryGrade: "Grade 5",
    lastIncrease: {
      date: "2024-01-15",
      amount: 3000,
      percentage: 9.4,
      reason: "Performance Review"
    },
    nextReview: "2025-01-15",
    performanceRating: 4.5,
    marketValue: {
      min: 30000,
      max: 40000,
      median: 35000
    }
  },
  {
    id: "2",
    employeeName: "John Dela Cruz",
    position: "Head Chef",
    currentSalary: 45000,
    salaryGrade: "Grade 6",
    lastIncrease: {
      date: "2023-08-20",
      amount: 5000,
      percentage: 12.5,
      reason: "Promotion"
    },
    nextReview: "2024-12-20",
    performanceRating: 4.8,
    marketValue: {
      min: 40000,
      max: 55000,
      median: 47500
    }
  },
  {
    id: "3",
    employeeName: "Sarah Wilson",
    position: "Housekeeping Supervisor",
    currentSalary: 28000,
    salaryGrade: "Grade 4",
    lastIncrease: {
      date: "2023-11-10",
      amount: 2000,
      percentage: 7.7,
      reason: "Annual Review"
    },
    nextReview: "2024-11-10",
    performanceRating: 4.2,
    marketValue: {
      min: 25000,
      max: 32000,
      median: 28500
    }
  },
  {
    id: "4",
    employeeName: "Robert Garcia",
    position: "Server",
    currentSalary: 18000,
    salaryGrade: "Grade 2",
    lastIncrease: {
      date: "2023-05-05",
      amount: 1500,
      percentage: 9.1,
      reason: "Performance Review"
    },
    nextReview: "2024-05-05",
    performanceRating: 4.0,
    marketValue: {
      min: 16000,
      max: 22000,
      median: 19000
    }
  }
];

const Compensation = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getPerformanceColor = (rating: number) => {
    if (rating >= 4.5) return "text-success";
    if (rating >= 4.0) return "text-warning";
    return "text-muted-foreground";
  };

  const isReviewDue = (reviewDate: string) => {
    const today = new Date();
    const review = new Date(reviewDate);
    const diffTime = review.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  const totalPayroll = compensationData.reduce((sum, record) => sum + record.currentSalary, 0);
  const avgSalary = totalPayroll / compensationData.length;
  const reviewsDue = compensationData.filter(record => isReviewDue(record.nextReview)).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Compensation Planning</h1>
            <p className="text-muted-foreground">Manage salary adjustments and performance-based incentives</p>
          </div>
          <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Salary Adjustment
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Compensation</p>
                  <p className="text-xl font-bold text-foreground">{formatCurrency(totalPayroll * 12)}</p>
                  <p className="text-xs text-muted-foreground">Annual</p>
                </div>
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Salary</p>
                  <p className="text-xl font-bold text-foreground">{formatCurrency(avgSalary)}</p>
                  <p className="text-xs text-muted-foreground">Monthly</p>
                </div>
                <div className="h-10 w-10 bg-secondary-accent/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-secondary-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Reviews Due</p>
                  <p className="text-2xl font-bold text-warning">{reviewsDue}</p>
                  <p className="text-xs text-muted-foreground">Next 30 days</p>
                </div>
                <div className="h-10 w-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <History className="h-5 w-5 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Performers</p>
                  <p className="text-2xl font-bold text-success">
                    {compensationData.filter(r => r.performanceRating >= 4.5).length}
                  </p>
                  <p className="text-xs text-muted-foreground">Rating ≥ 4.5</p>
                </div>
                <div className="h-10 w-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compensation Records */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Employee Compensation Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {compensationData.map((record) => {
                const marketPosition = ((record.currentSalary - record.marketValue.min) / 
                  (record.marketValue.max - record.marketValue.min)) * 100;
                
                return (
                  <div
                    key={record.id}
                    className="p-6 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                            {getInitials(record.employeeName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-foreground text-lg">{record.employeeName}</h4>
                          <p className="text-muted-foreground">{record.position}</p>
                          <Badge variant="outline" className="mt-1">
                            {record.salaryGrade}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {isReviewDue(record.nextReview) && (
                          <Badge className="bg-warning text-warning-foreground">
                            Review Due
                          </Badge>
                        )}
                        <Button variant="outline" size="sm">
                          Adjust Salary
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Salary</p>
                          <p className="text-xl font-bold text-foreground">{formatCurrency(record.currentSalary)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Performance Rating</p>
                          <p className={`text-lg font-semibold ${getPerformanceColor(record.performanceRating)}`}>
                            {record.performanceRating}/5.0
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Last Increase</p>
                          <p className="font-medium text-foreground">
                            {formatCurrency(record.lastIncrease.amount)} ({record.lastIncrease.percentage}%)
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(record.lastIncrease.date).toLocaleDateString()} - {record.lastIncrease.reason}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Market Range</p>
                          <p className="font-medium text-foreground">
                            {formatCurrency(record.marketValue.min)} - {formatCurrency(record.marketValue.max)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Median: {formatCurrency(record.marketValue.median)}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Next Review</p>
                          <p className="font-medium text-foreground">
                            {new Date(record.nextReview).toLocaleDateString()}
                          </p>
                          <div className="w-full bg-muted rounded-full h-2 mt-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${Math.min(Math.max(marketPosition, 0), 100)}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Market position: {marketPosition.toFixed(0)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Compensation;