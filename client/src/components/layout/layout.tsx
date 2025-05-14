import TopNav from "./top-nav";
import Footer from "./footer";
import { PalmTreeBackground } from "../ui/palm-tree-pixel";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#121820] flex flex-col relative overflow-hidden">
      {/* Palm Tree Background */}
      <PalmTreeBackground />
      
      {/* Top Navigation Bar */}
      <TopNav className="relative z-20" />
      
      {/* Main content area */}
      <main className="flex-grow pt-24 px-4 md:px-8 pb-8 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;