import TopNav from "./top-nav";
import Footer from "./footer";
import { GlowingPalms } from "../ui/palm-animation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#121820] flex flex-col relative overflow-hidden">
      {/* Palm Tree Background with Glowing Effect */}
      <GlowingPalms />
      
      {/* Top Navigation Bar */}
      <TopNav className="relative z-20" />
      
      {/* Application Banner - Visible on all pages */}
      <div 
        onClick={() => window.open('https://bit.ly/DeanslistMPLX', '_blank')}
        className="relative z-20 bg-gradient-to-r from-[#059669] via-[#10b981] to-[#059669] cursor-pointer overflow-hidden flex items-center py-2 px-1 shadow-lg shadow-emerald-900/20 hover:shadow-emerald-500/20 transition-all duration-300 sticky top-16"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/10 to-emerald-400/0 animate-pulse-slow"></div>
        <div className="marquee-container w-full overflow-hidden">
          <div className="marquee-content whitespace-nowrap animate-marquee flex items-center text-white font-medium">
            <span className="mx-4">🚀 Cohort 2 Applications Now Open</span>
            <span className="mx-4">💻 Apply Today for Funding and Support</span>
            <span className="mx-4">🌐 Building on Metaplex? We Want to Hear From You</span>
            <span className="mx-4">💰 $150K+ in Funding Available</span>
            <span className="mx-4">✨ Click Here to Apply Now</span>
            <span className="mx-4">🚀 Cohort 2 Applications Now Open</span>
            <span className="mx-4">💻 Apply Today for Funding and Support</span>
            <span className="mx-4">🌐 Building on Metaplex? We Want to Hear From You</span>
            <span className="mx-4">💰 $150K+ in Funding Available</span>
            <span className="mx-4">✨ Click Here to Apply Now</span>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <main className="flex-grow pt-6 px-4 md:px-8 pb-8 relative z-10">
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