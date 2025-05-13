import { Link } from "react-router-dom";
import { Twitter, Github, MessageCircle } from "lucide-react";
import MetaplexLogo from "../logos/metaplex-logo";
import IslandDaoLogo from "../logos/island-dao-logo";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <MetaplexLogo className="h-8 w-auto" />
              <div className="h-6 w-0.5 bg-gray-300"></div>
              <IslandDaoLogo className="h-8 w-auto" />
            </div>
            <p className="text-gray-600 text-sm">
              Supporting innovative projects building on Metaplex technology through grant funding, 
              technical support, and ecosystem resources.
            </p>
          </div>
          
          {/* Links */}
          <div className="md:text-center">
            <h3 className="text-lg font-semibold mb-4 text-secondary">Quick Links</h3>
            <div className="space-y-2">
              <div><Link to="/grants" className="text-gray-600 hover:text-primary">Grantees</Link></div>
              <div><Link to="/team" className="text-gray-600 hover:text-primary">Team</Link></div>
              <div><Link to="/process" className="text-gray-600 hover:text-primary">Evaluation Process</Link></div>
              <div><Link to="/learnings" className="text-gray-600 hover:text-primary">Learnings</Link></div>
              <div><Link to="/insights" className="text-gray-600 hover:text-primary">Insights</Link></div>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="md:text-right">
            <h3 className="text-lg font-semibold mb-4 text-secondary">Connect With Us</h3>
            <div className="flex space-x-4 md:justify-end">
              <a 
                href="https://twitter.com/metaplex" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-blue-400" />
              </a>
              <a 
                href="https://github.com/metaplex-foundation" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-gray-800" />
              </a>
              <a 
                href="https://discord.com/invite/metaplex" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
                aria-label="Discord"
              >
                <MessageCircle className="h-5 w-5 text-indigo-500" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© 2023-2025 Metaplex Foundation & IslandDAO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;