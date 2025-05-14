import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import islandDaoLogo from "@/assets/logos/island-dao-logo.png";
import metaplexLogo from "@/assets/logos/metaplex-logo.jpg";
import { grantProjects } from "@/data/grantProjects";

interface TopNavProps {
  className?: string;
}

const TopNav: React.FC<TopNavProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/grants", label: "Grantees", hasDropdown: true },
    { to: "/charts", label: "Analytics" },
    { to: "/process", label: "Evaluation Process" },
    { to: "/team", label: "Team" },
    { to: "/learnings", label: "Learnings" },
  ];
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className={cn("bg-[#1c2431] shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-30 border-b border-[#3c4759]", className)}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src={metaplexLogo} 
              alt="Metaplex Logo" 
              className="h-7 w-7 rounded-full mr-2 border border-gray-700"
            />
            <span className="text-xl font-bold text-[#f1f5fb]">MetaplexDAO Grants</span>
          </Link>
          <div className="hidden md:flex items-center ml-3 border-l border-[#3c4759] pl-3">
            <a 
              href="https://islanddao.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center opacity-60 hover:opacity-100 transition-opacity group"
            >
              <img 
                src={islandDaoLogo} 
                alt="IslandDAO Logo" 
                className="h-4 w-auto mr-1.5 grayscale group-hover:grayscale-0 transition-all" 
              />
              <span className="text-xs text-[#8896b0] group-hover:text-[#a0e0a8] transition-colors">
                Powered by IslandDAO
              </span>
            </a>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            item.hasDropdown ? (
              <div key={item.to} className="relative group">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div
                      className={cn(
                        "flex items-center cursor-pointer text-[#b5bfcc] hover:text-[#3b82f6] transition-colors px-1 py-2",
                        location.pathname.includes(item.to) && "text-[#3b82f6] font-medium border-b-2 border-[#3b82f6]"
                      )}
                    >
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#1c2431] border border-[#3c4759] p-1 min-w-[220px] mt-1">
                    <DropdownMenuItem className="focus:bg-[#2a3341] focus:text-[#3b82f6] text-[#b5bfcc] rounded-md mb-1">
                      <Link to={item.to} className="w-full">
                        View All Grantees
                      </Link>
                    </DropdownMenuItem>
                    <div className="h-px bg-[#3c4759] my-1" />
                    {grantProjects.map((project) => (
                      <DropdownMenuItem 
                        key={project.slug} 
                        className="focus:bg-[#2a3341] focus:text-[#3b82f6] text-[#b5bfcc] rounded-md"
                      >
                        <Link to={`/grants/${project.slug}`} className="w-full">
                          {project.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
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
            )
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
              item.hasDropdown ? (
                <div key={item.to} className="py-2">
                  <Link
                    to={item.to}
                    className={cn(
                      "text-[#b5bfcc] hover:text-[#3b82f6] transition-colors font-medium py-2 flex items-center",
                      location.pathname.includes(item.to) && "text-[#3b82f6]"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  
                  <div className="ml-4 mt-2 flex flex-col space-y-2 border-l border-[#3c4759] pl-4">
                    {grantProjects.map((project) => (
                      <Link
                        key={project.slug}
                        to={`/grants/${project.slug}`}
                        className="text-sm text-[#a0acbd] hover:text-[#3b82f6] transition-colors py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {project.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
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
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopNav;