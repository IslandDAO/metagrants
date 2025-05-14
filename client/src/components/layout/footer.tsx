import { Link } from "react-router-dom";
// Import minimal icons to customize the appearance
import islandDaoLogo from "@/assets/logos/island-dao-logo.png";
import metaplexLogo from "@/assets/logos/metaplex-logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-[#1c2431] py-4 mt-12 text-[#b5bfcc] border-t border-[#3c4759]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between">
          {/* Logo with Powered by IslandDAO */}
          <div className="flex items-center mb-2 md:mb-0">
            <a 
              href="https://www.metaplex.com/grants" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img 
                src={metaplexLogo} 
                alt="Metaplex Logo" 
                className="h-6 w-6 rounded-full mr-2 border border-gray-700"
              />
              <span className="text-sm font-bold text-[#f1f5fb] hover:text-[#3b82f6] transition-colors">MetaplexDAO</span>
            </a>
            
            <div className="flex items-center ml-3 border-l border-[#3c4759] pl-3">
              <a 
                href="https://islanddao.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center opacity-70 hover:opacity-100 transition-opacity group"
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
          
          {/* Links - Horizontal Layout */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs mb-2 md:mb-0">
            <Link to="/grants" className="text-[#b5bfcc] hover:text-[#3b82f6]">Grantees</Link>
            <Link to="/team" className="text-[#b5bfcc] hover:text-[#3b82f6]">Team</Link>
            <Link to="/process" className="text-[#b5bfcc] hover:text-[#3b82f6]">Evaluation</Link>
            <Link to="/learnings" className="text-[#b5bfcc] hover:text-[#3b82f6]">Learnings</Link>
            <Link to="/charts" className="text-[#b5bfcc] hover:text-[#3b82f6]">Analytics</Link>
            <Link to="/resources" className="text-[#b5bfcc] hover:text-[#3b82f6]">Resources</Link>
          </div>
          
          {/* Social Links and Copyright */}
          <div className="flex items-center justify-end space-x-4">
            <div className="flex space-x-2">
              <a 
                href="https://x.com/islanddao" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2a3341] p-2 rounded-full hover:bg-[#3c4759] transition-colors"
                aria-label="X (Twitter)"
              >
                {/* X Logo */}
                <svg className="h-3.5 w-3.5 text-[#3b82f6]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href="https://discord.gg/7zCZH7ym32" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2a3341] p-2 rounded-full hover:bg-[#3c4759] transition-colors"
                aria-label="Discord"
              >
                {/* Discord Logo */}
                <svg className="h-3.5 w-3.5 text-[#3b82f6]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
              </a>
              <a 
                href="https://islanddao.org/" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2a3341] p-2 rounded-full hover:bg-[#3c4759] transition-colors"
                aria-label="Website"
              >
                <svg className="h-3.5 w-3.5 text-[#3b82f6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </a>
            </div>
            
            <span className="text-xs text-[#8896b0]">© 2020-2025 IslandDAO</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;