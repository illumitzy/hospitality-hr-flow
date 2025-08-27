import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Heart, Shield, Stethoscope, Car, GraduationCap, Plus, FileText } from "lucide-react";

interface HealthProvider {
  id: string;
  name: string;
  type: "HMO" | "Insurance" | "Clinic";
  coverage: string;
  monthlyPremium: number;
  maxBenefit: number;
  network: string;
}

interface BenefitEnrollment {
  employeeId: string;
  employeeName: string;
  position: string;
  enrollments: {
    hmo: string | null;
    life: boolean;
    dental: boolean;
    travel: boolean;
    training: boolean;
  };
  dependents: number;
  totalCost: number;
  status: "enrolled" | "pending" | "declined";
}

const healthProviders: HealthProvider[] = [
  {
    id: "1",
    name: "PhilCare",
    type: "HMO",
    coverage: "Comprehensive",
    monthlyPremium: 2500,
    maxBenefit: 150000,
    network: "500+ hospitals nationwide"
  },
  {
    id: "2",
    name: "Maxicare",
    type: "HMO", 
    coverage: "Premium",
    monthlyPremium: 3200,
    maxBenefit: 300000,
    network: "800+ hospitals nationwide"
  },
  {
    id: "3",
    name: "Intellicare",
    type: "HMO",
    coverage: "Basic",
    monthlyPremium: 1800,
    maxBenefit: 100000,
    network: "300+ hospitals nationwide"
  }
];

const benefitEnrollments: BenefitEnrollment[] = [
  {
    employeeId: "1",
    employeeName: "Maria Santos",
    position: "Front Desk Manager",
    enrollments: {
      hmo: "PhilCare",
      life: true,
      dental: true,
      travel: true,
      training: true
    },
    dependents: 2,
    totalCost: 4500,
    status: "enrolled"
  },
  {
    employeeId: "2",
    employeeName: "John Dela Cruz",
    position: "Head Chef",
    enrollments: {
      hmo: "Maxicare",
      life: true,
      dental: true,
      travel: false,
      training: true
    },
    dependents: 3,
    totalCost: 5200,
    status: "enrolled"
  },
  {
    employeeId: "3",
    employeeName: "Sarah Wilson",
    position: "Housekeeping Supervisor",
    enrollments: {
      hmo: "Intellicare",
      life: true,
      dental: false,
      travel: false,
      training: false
    },
    dependents: 1,
    totalCost: 2800,
    status: "pending"
  },
  {
    employeeId: "4",
    employeeName: "Robert Garcia",
    position: "Server",
    enrollments: {
      hmo: "PhilCare",
      life: false,
      dental: false,
      travel: false,
      training: true
    },
    dependents: 0,
    totalCost: 3000,
    status: "enrolled"
  }
];

const Benefits = () => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "enrolled":
        return "bg-success text-success-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      case "declined":
        return "bg-danger text-danger-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const enrolledCount = benefitEnrollments.filter(b => b.status === 'enrolled').length;
  const pendingCount = benefitEnrollments.filter(b => b.status === 'pending').length;
  const totalBenefitsCost = benefitEnrollments.reduce((sum, b) => sum + b.totalCost, 0);
  const enrollmentRate = (enrolledCount / benefitEnrollments.length) * 100;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Benefits Administration</h1>
            <p className="text-muted-foreground">Manage employee benefits enrollment and healthcare providers</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Add Provider
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Benefits Cost</p>
                  <p className="text-xl font-bold text-foreground">{formatCurrency(totalBenefitsCost)}</p>
                  <p className="text-xs text-muted-foreground">Monthly</p>
                </div>
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Enrolled</p>
                  <p className="text-2xl font-bold text-success">{enrolledCount}</p>
                  <p className="text-xs text-muted-foreground">Employees</p>
                </div>
                <div className="h-10 w-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-warning">{pendingCount}</p>
                  <p className="text-xs text-muted-foreground">Applications</p>
                </div>
                <div className="h-10 w-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Enrollment Rate</p>
                  <p className="text-2xl font-bold text-foreground">{enrollmentRate.toFixed(0)}%</p>
                  <Progress value={enrollmentRate} className="mt-2" />
                </div>
                <div className="h-10 w-10 bg-secondary-accent/10 rounded-lg flex items-center justify-center">
                  <Stethoscope className="h-5 w-5 text-secondary-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="enrollments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="enrollments">Employee Enrollments</TabsTrigger>
            <TabsTrigger value="providers">Healthcare Providers</TabsTrigger>
          </TabsList>

          <TabsContent value="enrollments" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Benefits Enrollment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {benefitEnrollments.map((enrollment) => (
                    <div
                      key={enrollment.employeeId}
                      className="p-6 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                              {getInitials(enrollment.employeeName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-foreground text-lg">{enrollment.employeeName}</h4>
                            <p className="text-muted-foreground">{enrollment.position}</p>
                            <p className="text-sm text-muted-foreground">
                              {enrollment.dependents} dependent(s)
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(enrollment.status)}>
                            {enrollment.status.toUpperCase()}
                          </Badge>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Monthly Cost</p>
                            <p className="font-bold text-foreground">{formatCurrency(enrollment.totalCost)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <div className="flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">HMO</p>
                            <p className="text-sm font-medium">
                              {enrollment.enrollments.hmo || "Not enrolled"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Life Insurance</p>
                            <p className="text-sm font-medium">
                              {enrollment.enrollments.life ? "✓ Enrolled" : "✗ Not enrolled"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Dental</p>
                            <p className="text-sm font-medium">
                              {enrollment.enrollments.dental ? "✓ Enrolled" : "✗ Not enrolled"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Travel Insurance</p>
                            <p className="text-sm font-medium">
                              {enrollment.enrollments.travel ? "✓ Enrolled" : "✗ Not enrolled"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Training</p>
                            <p className="text-sm font-medium">
                              {enrollment.enrollments.training ? "✓ Enrolled" : "✗ Not enrolled"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="providers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {healthProviders.map((provider) => (
                <Card key={provider.id} className="shadow-soft hover:shadow-medium transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">{provider.name}</CardTitle>
                      <Badge variant="outline">{provider.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Coverage Type</p>
                      <p className="font-medium text-foreground">{provider.coverage}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Premium</p>
                        <p className="font-medium text-foreground">{formatCurrency(provider.monthlyPremium)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Max Benefit</p>
                        <p className="font-medium text-foreground">{formatCurrency(provider.maxBenefit)}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Network</p>
                      <p className="text-sm text-foreground">{provider.network}</p>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Benefits;