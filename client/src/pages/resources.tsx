import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Github, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import metaplexLogo from "@assets/metaplex.jpg";

const Resources = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <motion.h1 
          className="text-3xl font-bold mb-2 text-white"
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
          Official developer resources for <a 
            href="https://developers.metaplex.com" 
            target="_blank"
            rel="noopener noreferrer" 
            className="text-[#3b82f6] hover:text-[#60a5fa] transition-colors"
          >Metaplex technologies</a>
        </motion.p>
      </div>

      {/* Metaplex Core Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 relative group"
      >

        <Card className="border border-[#3c4759]/80 hover:border-[#3b82f6]/60 hover:shadow-[0_0_8px_rgba(59,130,246,0.25)] card-gradient transition-all duration-500 relative">
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500 text-transparent bg-clip-text flex items-center">
              <div className="w-10 h-10 rounded-md flex items-center justify-center bg-gradient-to-br from-[#3b82f6]/20 to-[#8b5cf6]/20 border border-[#3b82f6]/30 mr-3">
                <img 
                  src={metaplexLogo} 
                  alt="Metaplex Logo" 
                  className="h-full w-full p-0.5 rounded-sm object-cover" 
                />
              </div>
              Metaplex Core
            </CardTitle>
            <CardDescription className="text-[#b5bfcc] text-lg pl-[52px]">
              A lightweight, flexible NFT standard on Solana
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-[#b5bfcc]">
              Metaplex Core is a lightweight, flexible NFT standard on Solana designed for developers building dynamic, composable digital assets. It supports features like modular metadata, on-chain traits, and seamless integration with hybrid DeFi frameworks like MPL-404. Core is ideal for teams building gaming primitives, collectibles, and identity-based NFTs. It's the foundation for the next wave of interoperable web3 assets.
            </p>
            
            <div className="flex flex-wrap gap-4 relative z-20">
              <a 
                href="https://developers.metaplex.com/docs/token-metadata" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
                onClick={(e) => e.stopPropagation()}
              >
                <Button 
                  variant="outline" 
                  className="bg-[#2a3341] border-[#3c4759] hover:border-[#3b82f6]/40 text-[#f1f5fb] hover:text-white hover:shadow-[0_0_5px_rgba(59,130,246,0.3)] transition-all duration-500"
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-gradient-to-r from-[#3b82f6]/20 to-[#8b5cf6]/20 border border-[#3b82f6]/30 mr-2 group-hover:border-[#3b82f6]/40">
                    <BookOpen size={14} className="text-[#3b82f6]/80 group-hover:text-[#60a5fa]/90" />
                  </div>
                  <span>Documentation</span>
                </Button>
              </a>
              
              <a 
                href="https://github.com/metaplex-foundation/mpl-core" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
                onClick={(e) => e.stopPropagation()}
              >
                <Button 
                  variant="outline" 
                  className="bg-[#2a3341] border-[#3c4759] hover:border-[#3b82f6]/40 text-[#f1f5fb] hover:text-white hover:shadow-[0_0_5px_rgba(59,130,246,0.3)] transition-all duration-500"
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-gradient-to-r from-[#3b82f6]/20 to-[#8b5cf6]/20 border border-[#3b82f6]/30 mr-2 group-hover:border-[#3b82f6]/40">
                    <Github size={14} className="text-[#3b82f6]/80 group-hover:text-[#60a5fa]/90" />
                  </div>
                  <span>GitHub Repo</span>
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
        className="relative group"
      >

        <Card className="border border-[#3c4759]/80 hover:border-[#8b5cf6]/60 hover:shadow-[0_0_8px_rgba(139,92,246,0.25)] card-gradient transition-all duration-500 relative">
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-500 text-transparent bg-clip-text flex items-center">
              <div className="w-10 h-10 rounded-md flex items-center justify-center bg-gradient-to-br from-[#8b5cf6]/20 to-[#3b82f6]/20 border border-[#8b5cf6]/30 mr-3">
                <img 
                  src={metaplexLogo} 
                  alt="Metaplex Logo" 
                  className="h-full w-full p-0.5 rounded-sm object-cover" 
                />
              </div>
              MPL-404
            </CardTitle>
            <CardDescription className="text-[#b5bfcc] text-lg pl-[52px]">
              Hybrid DeFi Protocol for NFTs and fungible tokens
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-[#b5bfcc]">
              MPL-404 is a hybrid asset framework that lets users swap between NFTs and fungible tokens using a dual-escrow mechanism. Built on the MPL-Hybrid protocol, it powers game mechanics like rerolling traits or loot-box style swaps — ideal for dynamic economies. MPL-404 leverages Metaplex Core NFTs and SPL tokens to create composable, gamified experiences across DeFi and NFTs.
            </p>
            
            <div className="flex flex-wrap gap-4 relative z-20">
              <a 
                href="https://developers.metaplex.com/docs/mpl-hybrid/overview" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
                onClick={(e) => e.stopPropagation()}
              >
                <Button 
                  variant="outline" 
                  className="bg-[#2a3341] border-[#3c4759] hover:border-[#8b5cf6]/60 text-[#f1f5fb] hover:text-white hover:shadow-[0_0_5px_rgba(139,92,246,0.4)] transition-all duration-500"
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-gradient-to-r from-[#8b5cf6]/20 to-[#3b82f6]/20 border border-[#8b5cf6]/30 mr-2 group-hover:border-[#8b5cf6]/60">
                    <BookOpen size={14} className="text-[#8b5cf6]/80 group-hover:text-[#a78bfa]" />
                  </div>
                  <span>Documentation</span>
                </Button>
              </a>
              
              <a 
                href="https://github.com/metaplex-foundation/mpl-hybrid" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
                onClick={(e) => e.stopPropagation()}
              >
                <Button 
                  variant="outline" 
                  className="bg-[#2a3341] border-[#3c4759] hover:border-[#8b5cf6]/60 text-[#f1f5fb] hover:text-white hover:shadow-[0_0_5px_rgba(139,92,246,0.4)] transition-all duration-500"
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-gradient-to-r from-[#8b5cf6]/20 to-[#3b82f6]/20 border border-[#8b5cf6]/30 mr-2 group-hover:border-[#8b5cf6]/60">
                    <Github size={14} className="text-[#8b5cf6]/80 group-hover:text-[#a78bfa]" />
                  </div>
                  <span>GitHub Repo</span>
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Resources;