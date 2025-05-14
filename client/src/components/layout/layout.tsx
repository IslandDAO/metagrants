import TopNav from "./top-nav";
import Footer from "./footer";
import { ParticlesBackground } from "../ui/particles-background";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#121820] flex flex-col relative overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 overflow-hidden">
        <ParticlesBackground />
      </div>
      
      {/* Top Navigation Bar */}
      <TopNav />
      
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