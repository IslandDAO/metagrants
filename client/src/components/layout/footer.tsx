import { Link } from "react-router-dom";
import { Twitter, Github, MessageCircle } from "lucide-react";
import MetaplexLogo from "../logos/metaplex-logo";
import IslandDaoLogo from "../logos/island-dao-logo";

const Footer = () => {
  return (
    <footer className="bg-[#f7c6a3] py-6 mt-12 text-[#40526c]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and Description */}
          <div className="flex items-center gap-4">
            <MetaplexLogo className="h-7 w-auto" />
            <div className="h-6 w-0.5 bg-[#c9b290]"></div>
            <IslandDaoLogo className="h-7 w-auto" />
          </div>
          
          {/* Links - Horizontal Layout */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm">
            <Link to="/grants" className="text-[#40526c] hover:text-[#c8444d]">Grantees</Link>
            <Link to="/team" className="text-[#40526c] hover:text-[#c8444d]">Team</Link>
            <Link to="/process" className="text-[#40526c] hover:text-[#c8444d]">Evaluation</Link>
            <Link to="/learnings" className="text-[#40526c] hover:text-[#c8444d]">Learnings</Link>
            <Link to="/charts" className="text-[#40526c] hover:text-[#c8444d]">Analytics</Link>
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-2">
            <a 
              href="https://twitter.com/metaplex" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#bce3c5] p-2 rounded-full hover:bg-[#a2dadb] transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4 text-[#40526c]" />
            </a>
            <a 
              href="https://github.com/metaplex-foundation" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#bce3c5] p-2 rounded-full hover:bg-[#a2dadb] transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4 text-[#40526c]" />
            </a>
            <a 
              href="https://discord.com/invite/metaplex" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#bce3c5] p-2 rounded-full hover:bg-[#a2dadb] transition-colors"
              aria-label="Discord"
            >
              <MessageCircle className="h-4 w-4 text-[#40526c]" />
            </a>
          </div>
        </div>
        
        <div className="mt-4 text-center text-xs text-[#40526c]">
          <p>© 2023-2025 Metaplex Foundation & IslandDAO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;