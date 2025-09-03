import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DollarSign, Download, Play, FileText, Calculator } from "lucide-react";

interface PayrollRecord {
  id: string;
  employeeName: string;
  position: string;
  baseSalary: number;
  overtime: number;
  bonuses: number;
  deductions: {
    sss: number;
    philHealth: number;
    pagIbig: number;
    tax: number;
  };
  netPay: number;
  status: "processed" | "pending" | "reviewed";
}

const payrollRecords: PayrollRecord[] = [
  {
    id: "1",
    employeeName: "Maria Santos",
    position: "Front Desk Manager",
    baseSalary: 35000,
    overtime: 3500,
    bonuses: 5000,
    deductions: {
      sss: 1400,
      philHealth: 875,
      pagIbig: 200,
      tax: 4200
    },
    netPay: 36825,
    status: "processed"
  },
  {
    id: "2",
    employeeName: "John Dela Cruz",
    position: "Head Chef",
    baseSalary: 45000,
    overtime: 4200,
    bonuses: 8000,
    deductions: {
      sss: 1800,
      philHealth: 1125,
      pagIbig: 200,
      tax: 6800
    },
    netPay: 49277,
    status: "processed"
  },
  {
    id: "3",
    employeeName: "Sarah Wilson",
    position: "Housekeeping Supervisor",
    baseSalary: 28000,
    overtime: 1200,
    bonuses: 2000,
    deductions: {
      sss: 1120,
      philHealth: 700,
      pagIbig: 200,
      tax: 2800
    },
    netPay: 26380,
    status: "reviewed"
  },
  {
    id: "4",
    employeeName: "Robert Garcia",
    position: "Server",
    baseSalary: 18000,
    overtime: 2400,
    bonuses: 1000,
    deductions: {
      sss: 720,
      philHealth: 450,
      pagIbig: 200,
      tax: 1500
    },
    netPay: 18530,
    status: "pending"
  }
];

const Payroll = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "processed":
        return "bg-success text-success-foreground";
      case "reviewed":
        return "bg-warning text-warning-foreground";
      case "pending":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const totalPayroll = payrollRecords.reduce((sum, record) => sum + record.netPay, 0);
  const processedCount = payrollRecords.filter(r => r.status === 'processed').length;
  const pendingCount = payrollRecords.filter(r => r.status === 'pending').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payroll</h1>
            <p className="text-muted-foreground">Manage employee compensation and payroll processing</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Reports
            </Button>
            <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">
              <Play className="w-4 h-4 mr-2" />
              Process Payroll
            </Button>
          </div>
        </div>

        {/* Payroll Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Payroll</p>
                  <p className="text-xl font-bold text-foreground">{formatCurrency(totalPayroll)}</p>
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
                  <p className="text-sm text-muted-foreground">Processed</p>
                  <p className="text-2xl font-bold text-success">{processedCount}</p>
                </div>
                <div className="h-10 w-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-success" />
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
                </div>
                <div className="h-10 w-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Calculator className="h-5 w-5 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-lg font-bold text-foreground">November 2024</p>
                </div>
                <div className="h-10 w-10 bg-secondary-accent/10 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-secondary-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payroll Records */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">November 2024 Payroll</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payrollRecords.map((record) => {
                const totalDeductions = Object.values(record.deductions).reduce((sum, val) => sum + val, 0);
                const grossPay = record.baseSalary + record.overtime + record.bonuses;

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
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(record.status)}>
                          {record.status.toUpperCase()}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Payslip
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Base Salary</p>
                        <p className="font-medium text-foreground">{formatCurrency(record.baseSalary)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Overtime</p>
                        <p className="font-medium text-foreground">{formatCurrency(record.overtime)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Bonuses</p>
                        <p className="font-medium text-foreground">{formatCurrency(record.bonuses)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Gross Pay</p>
                        <p className="font-medium text-foreground">{formatCurrency(grossPay)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Deductions</p>
                        <p className="font-medium text-danger">-{formatCurrency(totalDeductions)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Net Pay</p>
                        <p className="font-bold text-lg text-success">{formatCurrency(record.netPay)}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-2">Deduction Breakdown:</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                        <div>SSS: {formatCurrency(record.deductions.sss)}</div>
                        <div>PhilHealth: {formatCurrency(record.deductions.philHealth)}</div>
                        <div>Pag-IBIG: {formatCurrency(record.deductions.pagIbig)}</div>
                        <div>Tax: {formatCurrency(record.deductions.tax)}</div>
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

export default Payroll;