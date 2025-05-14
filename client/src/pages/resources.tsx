import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Github, Globe } from "lucide-react";

const Resources = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <motion.h1 
          className="text-3xl font-bold mb-2 text-gradient"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Metaplex Resources
        </motion.h1>
        <motion.p 
          className="text-[#b5bfcc]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Official developer resources for Metaplex technologies
        </motion.p>
      </div>

      {/* Metaplex Core Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <Card className="border border-[#3c4759]/80 hover:border-[#3b82f6]/60 card-gradient neon-glow transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gradient flex items-center">
              <span className="mr-2">🧱</span> Metaplex Core
            </CardTitle>
            <CardDescription className="text-[#b5bfcc] text-base">
              A lightweight, flexible NFT standard on Solana
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-[#b5bfcc]">
              Metaplex Core is a lightweight, flexible NFT standard on Solana designed for developers building dynamic, composable digital assets. It supports features like modular metadata, on-chain traits, and seamless integration with hybrid DeFi frameworks like MPL-404. Core is ideal for teams building gaming primitives, collectibles, and identity-based NFTs. It's the foundation for the next wave of interoperable web3 assets.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://developers.metaplex.com/mpl-core" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <Button 
                  variant="outline" 
                  className="bg-[#2a3341] border-[#3c4759] hover:border-[#3b82f6]/60 text-[#f1f5fb] space-x-2 hover:bg-[#2a3341]/80 group-hover:animate-glow-pulse transition-all"
                >
                  <BookOpen size={18} className="mr-2" />
                  <span>Documentation</span>
                </Button>
              </a>
              
              <a 
                href="https://github.com/metaplex-foundation/mpl-core" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <Button 
                  variant="outline" 
                  className="bg-[#2a3341] border-[#3c4759] hover:border-[#3b82f6]/60 text-[#f1f5fb] space-x-2 hover:bg-[#2a3341]/80 group-hover:animate-glow-pulse transition-all"
                >
                  <Github size={18} className="mr-2" />
                  <span>GitHub Repo</span>
                </Button>
              </a>
              
              <a 
                href="https://metaplex.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <Button 
                  variant="outline" 
                  className="bg-[#2a3341] border-[#3c4759] hover:border-[#3b82f6]/60 text-[#f1f5fb] space-x-2 hover:bg-[#2a3341]/80 group-hover:animate-glow-pulse transition-all"
                >
                  <Globe size={18} className="mr-2" />
                  <span>Metaplex Site</span>
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* MPL-404 Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="border border-[#3c4759]/80 hover:border-[#3b82f6]/60 card-gradient neon-glow transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gradient flex items-center">
              <span className="mr-2">🔁</span> MPL-404 (Hybrid DeFi Protocol)
            </CardTitle>
            <CardDescription className="text-[#b5bfcc] text-base">
              A hybrid asset framework for swapping between NFTs and fungible tokens
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-[#b5bfcc]">
              MPL-404 is a hybrid asset framework that lets users swap between NFTs and fungible tokens using a dual-escrow mechanism. Built on the MPL-Hybrid protocol, it powers game mechanics like rerolling traits or loot-box style swaps — ideal for dynamic economies. MPL-404 leverages Metaplex Core NFTs and SPL tokens to create composable, gamified experiences across DeFi and NFTs.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://developers.metaplex.com/mpl-hybrid" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <Button 
                  variant="outline" 
                  className="bg-[#2a3341] border-[#3c4759] hover:border-[#3b82f6]/60 text-[#f1f5fb] space-x-2 hover:bg-[#2a3341]/80 group-hover:animate-glow-pulse transition-all"
                >
                  <BookOpen size={18} className="mr-2" />
                  <span>Documentation</span>
                </Button>
              </a>
              
              <a 
                href="https://github.com/metaplex-foundation/mpl-hybrid" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <Button 
                  variant="outline" 
                  className="bg-[#2a3341] border-[#3c4759] hover:border-[#3b82f6]/60 text-[#f1f5fb] space-x-2 hover:bg-[#2a3341]/80 group-hover:animate-glow-pulse transition-all"
                >
                  <Github size={18} className="mr-2" />
                  <span>GitHub Repo</span>
                </Button>
              </a>
              
              <a 
                href="https://metaplex.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <Button 
                  variant="outline" 
                  className="bg-[#2a3341] border-[#3c4759] hover:border-[#3b82f6]/60 text-[#f1f5fb] space-x-2 hover:bg-[#2a3341]/80 group-hover:animate-glow-pulse transition-all"
                >
                  <Globe size={18} className="mr-2" />
                  <span>Metaplex Site</span>
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Additional Info */}
      <motion.div 
        className="mt-8 text-center text-[#8896b0] text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p>
          For more information about Metaplex technologies and grant opportunities, visit <a href="https://metaplex.com" target="_blank" rel="noopener noreferrer" className="text-[#3b82f6] hover:text-[#60a5fa] animate-glow-pulse">metaplex.com</a>
        </p>
      </motion.div>
    </div>
  );
};

export default Resources;