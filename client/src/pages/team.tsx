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
import { Twitter, Linkedin, Globe, Mail, Github, ChevronDown } from "lucide-react";
import { team, TeamMember } from "@/data/team";

// Component for team member card
const TeamMemberCard = ({ 
  member, 
  highlighted = false,
  isFirst = false 
}: { 
  member: TeamMember, 
  highlighted?: boolean,
  isFirst?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: isFirst ? 0.1 : 0.2 }}
      className="h-full w-[240px]"
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <Card 
        className={`h-full bg-[#1c2431] border-[#364156] ${highlighted ? 'border-indigo-500/30' : ''} overflow-hidden relative`}
      >
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${highlighted ? 'from-indigo-400 via-purple-400 to-blue-400' : 'from-indigo-500 to-purple-500'}`}></div>
                
        <CardContent className="p-6 flex flex-col h-full relative z-10">
          <div className="flex flex-col items-center text-center mb-4">
            <Avatar className={`h-20 w-20 mb-4 ring-2 ${highlighted ? 'ring-indigo-400' : 'ring-indigo-500/30'} ring-offset-2 ring-offset-[#1c2431]`}>
              <AvatarImage src={member.imageUrl} alt={member.name} />
              <AvatarFallback className="bg-indigo-500/20 text-indigo-200">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex items-center">
              <h3 className="text-xl font-bold text-[#f1f5fb]">{member.name}</h3>
              {highlighted && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">
                  Lead
                </span>
              )}
            </div>
            <p className="text-indigo-300 text-sm font-medium mb-2">{member.title}</p>
          </div>
          
          <Collapsible 
            open={isOpen} 
            onOpenChange={setIsOpen}
            className="flex-grow mb-4"
          >
            <div className="text-[#b5bfcc] text-sm mb-2 line-clamp-3">
              {!isOpen && member.bio}
            </div>
            
            <CollapsibleContent className="text-[#b5bfcc] text-sm">
              <div className="mt-2">
                {member.bio}
              </div>
            </CollapsibleContent>
            
            <CollapsibleTrigger className="flex items-center justify-center w-full mt-2 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
              <span>{isOpen ? "Read less" : "Read more"}</span>
              <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
          </Collapsible>
          
          {member.expertise && member.expertise.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {member.expertise.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="outline" 
                  className="bg-indigo-500/10 border-indigo-500/30 text-indigo-200 hover:bg-indigo-500/20 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          )}
          
          <div className="flex justify-center space-x-3 pt-2 mt-4 border-t border-[#364156]">
            {member.twitter && (
              <a 
                href={member.twitter}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#b5bfcc] hover:text-blue-400 transition-colors"
              >
                <Twitter size={16} />
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
  // Create a new array with lead at the beginning
  const sortedTeam = [...team].sort((a, b) => {
    if (a.role === "lead") return -1;
    if (b.role === "lead") return 1;
    return 0;
  });
  
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
      
      {/* All team members in a grid */}
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >  
        {/* Split team into two rows */}
        <div className="flex flex-col space-y-10">
          {/* First row */}
          <div className="flex flex-wrap justify-center gap-6">
            {sortedTeam.slice(0, Math.ceil(sortedTeam.length / 2)).map((member, index) => (
              <TeamMemberCard 
                key={member.name} 
                member={member} 
                highlighted={member.role === "lead"}
                isFirst={index === 0}
              />
            ))}
          </div>
          
          {/* Second row */}
          <div className="flex flex-wrap justify-center gap-6">
            {sortedTeam.slice(Math.ceil(sortedTeam.length / 2)).map((member, index) => (
              <TeamMemberCard 
                key={member.name} 
                member={member} 
                highlighted={member.role === "lead"}
                isFirst={false}
              />
            ))}
          </div>
        </div>
      </motion.div>
      
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