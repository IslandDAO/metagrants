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
            <div className="h-6 w-0.5 bg-emerald-700"></div>
            <IslandDaoLogo className="h-7 w-auto" />
          </div>
          
          {/* Links - Horizontal Layout */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm">
            <Link to="/grants" className="text-orange-100 hover:text-orange-300">Grantees</Link>
            <Link to="/team" className="text-orange-100 hover:text-orange-300">Team</Link>
            <Link to="/process" className="text-orange-100 hover:text-orange-300">Evaluation</Link>
            <Link to="/learnings" className="text-orange-100 hover:text-orange-300">Learnings</Link>
            <Link to="/charts" className="text-orange-100 hover:text-orange-300">Analytics</Link>
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-2">
            <a 
              href="https://twitter.com/metaplex" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-800 p-2 rounded-full hover:bg-emerald-700 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4 text-orange-200" />
            </a>
            <a 
              href="https://github.com/metaplex-foundation" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-800 p-2 rounded-full hover:bg-emerald-700 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4 text-orange-200" />
            </a>
            <a 
              href="https://discord.com/invite/metaplex" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-800 p-2 rounded-full hover:bg-emerald-700 transition-colors"
              aria-label="Discord"
            >
              <MessageCircle className="h-4 w-4 text-orange-200" />
            </a>
          </div>
        </div>
        
        <div className="mt-4 text-center text-xs text-emerald-300">
          <p>© 2023-2025 Metaplex Foundation & IslandDAO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;