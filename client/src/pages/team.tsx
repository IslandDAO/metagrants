import { useState } from "react";
import { motion } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Linkedin, Globe, Mail, Github, ChevronDown } from "lucide-react";

import { team, TeamMember } from "@/data/team";

// X logo SVG component
const XLogo = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Component for team member card
const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  const [isOpen, setIsOpen] = useState(false);
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="h-full bg-[#1c2431] border-[#364156] overflow-hidden relative flex flex-col">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        <CardContent className="p-4 flex flex-col h-full">
          {/* Header - Fixed height */}
          <div className="flex flex-col items-center text-center mb-3">
            <Avatar className="h-16 w-16 mb-2 ring-2 ring-indigo-500/30 ring-offset-2 ring-offset-[#1c2431]">
              <AvatarImage src={member.imageUrl} alt={member.name} />
              <AvatarFallback className="bg-indigo-500/20 text-indigo-200">{initials}</AvatarFallback>
            </Avatar>
            <h3 className="text-base font-bold text-[#f1f5fb] line-clamp-1">{member.name}</h3>
            <p className="text-indigo-300 text-xs font-medium line-clamp-1">{member.title}</p>
          </div>
          
          {/* Bio section - Fixed height with truncation */}
          <Collapsible 
            open={isOpen} 
            onOpenChange={setIsOpen}
            className="mb-3 flex-grow"
          >
            <div className="text-[#b5bfcc] text-xs mb-1 line-clamp-5">
              {!isOpen && member.bio}
            </div>
            
            <CollapsibleContent className="text-[#b5bfcc] text-xs">
              <div className="mt-1">
                {member.bio}
              </div>
            </CollapsibleContent>
            
            {member.bio.length > 100 && (
              <CollapsibleTrigger className="flex items-center justify-center w-full mt-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                <span>{isOpen ? "Read less" : "Read more"}</span>
                <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </CollapsibleTrigger>
            )}
          </Collapsible>
          
          {/* Expertise tags - Scrollable when needed */}
          {member.expertise && member.expertise.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3 max-h-[70px] overflow-y-auto scrollbar-hide">
              {member.expertise.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="outline" 
                  className="bg-indigo-500/10 border-indigo-500/30 text-indigo-200 hover:bg-indigo-500/20 transition-colors text-xs py-0"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          )}
          
          {/* Social links - Fixed height */}
          <div className="flex justify-center space-x-3 pt-2 border-t border-[#364156] mt-auto">
            {member.twitter && (
              <a 
                href={member.twitter}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#b5bfcc] hover:text-gray-100 transition-colors"
              >
                <XLogo size={16} />
              </a>
            )}
            {member.linkedin && (
              <a 
                href={member.linkedin}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#b5bfcc] hover:text-blue-400 transition-colors"
              >
                <Linkedin size={16} />
              </a>
            )}
            {member.github && (
              <a 
                href={member.github}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#b5bfcc] hover:text-purple-400 transition-colors"
              >
                <Github size={16} />
              </a>
            )}
            {member.website && (
              <a 
                href={member.website}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#b5bfcc] hover:text-indigo-400 transition-colors"
              >
                <Globe size={16} />
              </a>
            )}
            {member.email && (
              <a 
                href={`mailto:${member.email}`}
                className="text-[#b5bfcc] hover:text-green-400 transition-colors"
              >
                <Mail size={16} />
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Main team page component
const Team = () => {
  const coreTeam = team.filter((member) => member.role === "core");
  const advisors = team.filter((member) => member.role === "advisor");
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <motion.h1 
          className="text-3xl font-bold text-[#f1f5fb] mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Meet Our Team
        </motion.h1>
        <motion.p 
          className="text-[#b5bfcc] max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          The dedicated team behind the MetaplexDAO grant program managed by IslandDAO. Our combined expertise in 
          program management, technical evaluation, and community building helps us identify and support promising 
          projects within the Metaplex ecosystem.
        </motion.p>
      </div>
      
      <Tabs defaultValue="core" className="mb-12">
        <TabsList className="mb-8 bg-[#1a2436] border border-[#364156]">
          <TabsTrigger value="core" className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300">Core Team</TabsTrigger>
          <TabsTrigger value="advisors" className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300">Advisors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="core">
          <div className="flex flex-nowrap gap-4 overflow-x-auto pb-4 px-1 scrollbar-hide">
            {coreTeam.map((member) => (
              <div key={member.name} className="flex-none w-[270px] h-[350px] transition-transform hover:scale-[1.02]">
                <TeamMemberCard member={member} />
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="advisors">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {advisors.map((member) => (
              <div key={member.name} className="h-[350px] w-[270px] mx-auto md:mx-0">
                <TeamMemberCard member={member} />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <motion.div
        className="bg-gradient-to-r from-[#1a2436] to-[#1d2a40] p-8 rounded-lg border border-indigo-500/20 text-center mb-6 overflow-hidden relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-indigo-500/5 rounded-full"></div>
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-purple-500/5 rounded-full"></div>
        
        <h2 className="text-2xl font-bold text-[#f1f5fb] mb-4">Join Our Team</h2>
        <p className="text-[#b5bfcc] max-w-2xl mx-auto mb-6">
          We're always looking for talented individuals passionate about web3, decentralized technology, and building the future of digital assets.
        </p>
        <a 
          href="mailto:team@islanddao.org" 
          className="px-5 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/30 transition-colors inline-flex items-center gap-2"
        >
          <Mail size={16} />
          <span>Reach out to learn about open positions</span>
        </a>
      </motion.div>
    </div>
  );
};

export default Team;