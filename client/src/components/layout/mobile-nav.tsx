import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Home,
  BarChart2,
  Briefcase,
  Award,
  Users,
  Shield,
  BookOpen,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MetaplexLogo from "@/components/logos/metaplex-logo";

interface MobileNavProps {
  onMenuToggle: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ onMenuToggle }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/dashboard", label: "Dashboard", icon: BarChart2 },
    { to: "/projects", label: "Projects", icon: Briefcase },
    { to: "/grants", label: "Grants", icon: Award },
    { to: "/team", label: "Team", icon: Users },
    { to: "/evaluation", label: "Evaluation", icon: Shield },
    { to: "/learnings", label: "Learnings", icon: BookOpen },
  ];
  
  const handleNavClick = () => {
    setOpen(false);
    onMenuToggle();
  };
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={onMenuToggle}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-secondary p-0 max-w-[280px]">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-secondary-light flex items-center justify-between">
            <MetaplexLogo className="h-8 w-auto" />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setOpen(false)}
              className="text-white hover:bg-secondary-light"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="flex-1 overflow-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;
                const Icon = item.icon;
                
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={handleNavClick}
                      className={cn(
                        "flex items-center px-4 py-3 text-white hover:bg-secondary-light rounded-md transition",
                        isActive && "bg-secondary-light"
                      )}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-secondary-light">
            <div className="text-xs text-gray-400">
              © 2023-2025 MetaplexDAO & IslandDAO
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;