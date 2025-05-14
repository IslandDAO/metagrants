import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import MetaplexLogo from "../logos/metaplex-logo";

const TopNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/grants", label: "Grantees" },
    { to: "/charts", label: "Analytics" },
    { to: "/process", label: "Evaluation Process" },
    { to: "/team", label: "Team" },
    { to: "/learnings", label: "Learnings" },
  ];
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className="bg-[#1c2431] shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-30 border-b border-[#3c4759]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <MetaplexLogo className="h-8 w-auto" />
          <span className="ml-2 text-xl font-bold text-[#f1f5fb]">Grants</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "text-[#b5bfcc] hover:text-[#3b82f6] transition-colors px-1 py-2",
                location.pathname === item.to && "text-[#3b82f6] font-medium border-b-2 border-[#3b82f6]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="text-[#b5bfcc] hover:text-[#3b82f6]"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#2a3341] shadow-md py-3 z-20 border-b border-[#3c4759]">
          <div className="flex flex-col space-y-2 px-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "text-[#b5bfcc] hover:text-[#3b82f6] transition-colors py-2",
                  location.pathname === item.to && "text-[#3b82f6] font-medium"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopNav;