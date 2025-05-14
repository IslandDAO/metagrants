import { Link } from "react-router-dom";
import { Twitter, Github, MessageCircle } from "lucide-react";
import MetaplexLogo from "../logos/metaplex-logo";
import IslandDaoLogo from "../logos/island-dao-logo";

const Footer = () => {
  return (
    <footer className="bg-[#1c2431] py-6 mt-12 text-[#b5bfcc] border-t border-[#3c4759]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <MetaplexLogo className="h-7 w-auto" />
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
              href="https://twitter.com/metaplex" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2a3341] p-2 rounded-full hover:bg-[#3c4759] transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4 text-[#3b82f6]" />
            </a>
            <a 
              href="https://github.com/metaplex-foundation" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2a3341] p-2 rounded-full hover:bg-[#3c4759] transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4 text-[#3b82f6]" />
            </a>
            <a 
              href="https://discord.com/invite/metaplex" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2a3341] p-2 rounded-full hover:bg-[#3c4759] transition-colors"
              aria-label="Discord"
            >
              <MessageCircle className="h-4 w-4 text-[#3b82f6]" />
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