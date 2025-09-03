import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Plus, Search, MoreHorizontal, Mail, Phone } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "on-leave";
  startDate: string;
  salary: number;
}

const employees: Employee[] = [
  {
    id: "1",
    name: "Maria Santos",
    position: "Front Desk Manager",
    department: "Hotel Operations",
    email: "maria.santos@grandhotel.com",
    phone: "+63 912 345 6789",
    status: "active",
    startDate: "2022-03-15",
    salary: 35000
  },
  {
    id: "2",
    name: "John Dela Cruz",
    position: "Head Chef",
    department: "Restaurant",
    email: "john.delacruz@grandhotel.com",
    phone: "+63 998 765 4321",
    status: "active",
    startDate: "2021-08-20",
    salary: 45000
  },
  {
    id: "3",
    name: "Sarah Wilson",
    position: "Housekeeping Supervisor",
    department: "Hotel Operations",
    email: "sarah.wilson@grandhotel.com",
    phone: "+63 917 234 5678",
    status: "on-leave",
    startDate: "2020-11-10",
    salary: 28000
  },
  {
    id: "4",
    name: "Robert Garcia",
    position: "Server",
    department: "Restaurant",
    email: "robert.garcia@grandhotel.com",
    phone: "+63 923 456 7890",
    status: "active",
    startDate: "2023-05-05",
    salary: 18000
  },
  {
    id: "5",
    name: "Lisa Reyes",
    position: "Receptionist",
    department: "Hotel Operations",
    email: "lisa.reyes@grandhotel.com",
    phone: "+63 934 567 8901",
    status: "active",
    startDate: "2023-01-12",
    salary: 22000
  }
];

const Employees = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "inactive":
        return "bg-muted text-muted-foreground";
      case "on-leave":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatSalary = (amount: number) => {
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Employees</h1>
            <p className="text-muted-foreground">Manage your hotel and restaurant staff</p>
          </div>
          <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search employees..." 
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  All ({employees.length})
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Active ({employees.filter(e => e.status === 'active').length})
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  On Leave ({employees.filter(e => e.status === 'on-leave').length})
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <Card key={employee.id} className="shadow-soft hover:shadow-medium transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {getInitials(employee.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {employee.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{employee.position}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Department</span>
                  <span className="text-sm font-medium text-foreground">{employee.department}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className={getStatusColor(employee.status)}>
                    {employee.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Salary</span>
                  <span className="text-sm font-medium text-foreground">{formatSalary(employee.salary)}</span>
                </div>
                
                <div className="pt-2 border-t border-border space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{employee.phone}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Employees;