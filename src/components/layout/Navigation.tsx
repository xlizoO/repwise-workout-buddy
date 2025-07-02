import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "首页", icon: "🏠" },
    { path: "/workouts", label: "训练", icon: "💪" },
    { path: "/plans", label: "计划", icon: "📋" },
    { path: "/progress", label: "进度", icon: "📊" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center py-2 px-3 rounded-lg transition-colors",
              "text-muted-foreground hover:text-foreground",
              location.pathname === item.path && "text-primary bg-secondary"
            )}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;