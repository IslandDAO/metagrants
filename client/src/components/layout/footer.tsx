import { Link } from "react-router-dom";
import { Twitter, Github, MessageCircle } from "lucide-react";
import islandDaoLogo from "@/assets/logos/island-dao-logo.png";
import metaplexLogo from "@/assets/logos/metaplex-logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-[#1c2431] py-6 mt-12 text-[#b5bfcc] border-t border-[#3c4759]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo with Powered by IslandDAO */}
          <div className="flex items-center">
            <div className="flex items-center">
              <img 
                src={metaplexLogo} 
                alt="Metaplex Logo" 
                className="h-6 w-6 rounded-full mr-2 border border-gray-700"
              />
              <span className="text-lg font-bold text-[#f1f5fb]">MetaplexDAO</span>
            </div>
            
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
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm">
            <Link to="/grants" className="text-[#b5bfcc] hover:text-[#3b82f6]">Grantees</Link>
            <Link to="/team" className="text-[#b5bfcc] hover:text-[#3b82f6]">Team</Link>
            <Link to="/process" className="text-[#b5bfcc] hover:text-[#3b82f6]">Evaluation</Link>
            <Link to="/learnings" className="text-[#b5bfcc] hover:text-[#3b82f6]">Learnings</Link>
            <Link to="/charts" className="text-[#b5bfcc] hover:text-[#3b82f6]">Analytics</Link>
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-2">
            <a 
              href="https://x.com/islanddao" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2a3341] p-2 rounded-full hover:bg-[#3c4759] transition-colors"
              aria-label="X (Twitter)"
            >
              <Twitter className="h-4 w-4 text-[#3b82f6]" />
            </a>
            <a 
              href="https://discord.gg/7zCZH7ym32" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2a3341] p-2 rounded-full hover:bg-[#3c4759] transition-colors"
              aria-label="Discord"
            >
              <MessageCircle className="h-4 w-4 text-[#3b82f6]" />
            </a>
            <a 
              href="https://islanddao.org/" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2a3341] p-2 rounded-full hover:bg-[#3c4759] transition-colors"
              aria-label="Website"
            >
              <svg className="h-4 w-4 text-[#3b82f6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </a>
          </div>
        </div>
        
        <div className="mt-4 text-center text-xs text-[#b5bfcc]">
          <p>© 2023-2025 Metaplex Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;