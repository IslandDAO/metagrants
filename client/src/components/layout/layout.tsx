import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import MobileNav from "./mobile-nav";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Close sidebar when switching from mobile to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <Sidebar className={`hidden md:block`} />
      
      {/* Mobile Nav with Hamburger Menu */}
      <div className="sticky top-0 z-40 flex h-16 md:hidden items-center bg-white border-b px-4">
        <MobileNav onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="ml-4 font-semibold">MetaplexDAO Grants</div>
      </div>
      
      {/* Overlay when mobile sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Main content area */}
      <main className="md:pl-64 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;