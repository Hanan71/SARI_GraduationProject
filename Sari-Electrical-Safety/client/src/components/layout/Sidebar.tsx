import { Link, useLocation } from "wouter";
import { LayoutDashboard, BarChart3, AlertTriangle, Lightbulb, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [location] = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Analytics", href: "/analytics", icon: BarChart3 },
    { label: "Alerts", href: "/alerts", icon: AlertTriangle },
    { label: "Energy Tips", href: "/tips", icon: Lightbulb },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border h-screen fixed left-0 top-0 z-50">
      
      {/* قسم اللوجو - تم تكبيره وتوسيطه هنا */}
      <div className="p-8 border-b border-border/50 flex flex-col items-center justify-center bg-secondary/5">
        <div className="w-full flex justify-center items-center mb-4">
          <img 
            src="/logo.png" 
            alt="Sari Logo" 
            className="w-full h-auto max-h-32 object-contain" // كبرنا الحجم ليمتد على عرض السايدبار
            style={{ 
              filter: "drop-shadow(0px 0px 15px rgba(34, 211, 238, 0.25))" // زيادة التوهج للبروز
            }}
          />
        </div>
        
        {/* معلومات الإصدار تحت اللوجو في المنتصف */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground font-mono bg-secondary px-2 py-0.5 rounded">v1.0</span>
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em]">AI Safety</span>
          </div>
        </div>
      </div>

      {/* قائمة التنقل */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium",
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

      {/* الجزء السفلي - حالة النظام وتسجيل الخروج */}
      <div className="p-4 border-t border-border/50 space-y-2">
        <div className="p-4 bg-secondary/30 rounded-xl mb-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-mono text-muted-foreground uppercase">System Online</span>
          </div>
          <p className="text-[10px] text-muted-foreground/60 text-center">Server Time: {new Date().toLocaleTimeString()}</p>
        </div>
        
        <button 
          onClick={() => logout()}
          className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-xl transition-colors font-medium text-sm"
        >
          <LogOut className="w-5 h-5" />
          Disconnect
        </button>
      </div>
    </aside>
  );
}