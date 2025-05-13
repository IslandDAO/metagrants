import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Home, 
  BarChart2, 
  Briefcase, 
  Users, 
  Shield, 
  BookOpen
} from "lucide-react";
import MetaplexLogo from "../logos/metaplex-logo";
import IslandDaoLogo from "../logos/island-dao-logo";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [location] = useLocation();
  
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: BarChart2 },
    { href: "/projects", label: "Projects", icon: Briefcase },
    { href: "/team", label: "Team", icon: Users },
    { href: "/evaluation", label: "Evaluation", icon: Shield },
    { href: "/learnings", label: "Learnings", icon: BookOpen },
  ];
  
  return (
    <aside className={cn("w-64 bg-secondary text-white fixed h-full z-50 overflow-y-auto", className)}>
      <div className="p-5 flex flex-col h-full">
        {/* Logo */}
        <div className="mb-8 mt-2">
          <div className="flex justify-center mb-5">
            <MetaplexLogo className="h-5 w-auto" />
          </div>
          <div className="flex justify-center">
            <div className="bg-primary p-2 rounded-lg">
              <IslandDaoLogo className="h-12 w-auto" />
            </div>
          </div>
        </div>
        
        {/* Navigation Links */}
        <nav className="mb-auto">
          {navItems.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={cn(
                  "flex items-center px-4 py-3 text-white hover:bg-secondary-light rounded-md transition mb-1",
                  isActive && "bg-secondary-light"
                )}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        {/* Footer */}
        <div className="mt-auto pt-5 border-t border-gray-700">
          <div className="px-4 py-2 text-xs text-gray-400">
            © 2023 MetaplexDAO & IslandDAO
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
