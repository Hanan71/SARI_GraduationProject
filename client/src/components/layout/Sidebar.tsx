import { Link, useLocation } from "wouter";
import { LayoutDashboard, BarChart3, AlertTriangle,Lightbulb, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";


export function Sidebar() {
  const [location] = useLocation();
  const { logout } = useAuth();

// تأكدي من إضافة Lightbulb في جملة الـ import في أعلى الملف
  // import { LayoutDashboard, BarChart3, AlertTriangle, Lightbulb } from "lucide-react";

  const navItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Analytics", href: "/analytics", icon: BarChart3 },
    { label: "Alerts", href: "/alerts", icon: AlertTriangle },
    { label: "Energy Tips", href: "/tips", icon: Lightbulb }, // 💡 السطر الجديد هنا
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border h-screen fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-border/50">
        <h1 className="text-2xl font-display font-bold text-primary tracking-wider flex items-center gap-2">
          <span className="w-2 h-8 bg-primary rounded-sm"></span>
          SARI
          <span className="text-xs text-muted-foreground font-normal bg-secondary px-2 py-0.5 rounded ml-2">v1.0</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-2 font-mono">AI Electrical Safety System</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group font-medium",
              isActive 
                ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_-5px_hsla(var(--primary),0.3)]" 
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}>
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/50 space-y-2">
        <div className="p-4 bg-secondary/30 rounded-lg mb-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-mono text-muted-foreground uppercase">System Online</span>
          </div>
          <p className="text-[10px] text-muted-foreground/60">Server Time: {new Date().toLocaleTimeString()}</p>
        </div>
        
        <button 
          onClick={() => logout()}
          className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors font-medium text-sm"
        >
          <LogOut className="w-5 h-5" />
          Disconnect
        </button>
      </div>
    </aside>
  );
}
