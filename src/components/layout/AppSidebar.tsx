import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Heart,
  Building2,
  Settings
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    group: "Overview"
  },
  {
    title: "Employees",
    url: "/employees",
    icon: Users,
    group: "Human Capital"
  },
  {
    title: "Attendance",
    url: "/attendance",
    icon: Clock,
    group: "Human Capital"
  },
  {
    title: "Payroll",
    url: "/payroll",
    icon: DollarSign,
    group: "Finance"
  },
  {
    title: "Compensation",
    url: "/compensation",
    icon: TrendingUp,
    group: "Finance"
  },
  {
    title: "Benefits",
    url: "/benefits",
    icon: Heart,
    group: "Benefits"
  },
];

const groupedItems = navigationItems.reduce((acc, item) => {
  if (!acc[item.group]) {
    acc[item.group] = [];
  }
  acc[item.group].push(item);
  return acc;
}, {} as Record<string, typeof navigationItems>);

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  const getNavClassName = (isActive: boolean) => {
    return isActive 
      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
      : "hover:bg-muted text-foreground";
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
            <Building2 className="h-6 w-6 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold text-foreground">HR-4</h2>
              <p className="text-xs text-muted-foreground">Hotel & Restaurant</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        {Object.entries(groupedItems).map(([group, items]) => (
          <SidebarGroup key={group}>
            {!isCollapsed && (
              <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                {group}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-10 mb-1">
                      <NavLink 
                        to={item.url}
                        className={getNavClassName(isActive(item.url))}
                      >
                        <item.icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                        {!isCollapsed && <span className="font-medium">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}