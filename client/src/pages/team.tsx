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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Twitter, Linkedin, Globe, Mail } from "lucide-react";
import { team, TeamMember } from "@/data/team";

// Component for team member card
const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center mb-4">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={member.imageUrl} alt={member.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-primary text-sm font-medium">{member.title}</p>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
          
          {member.expertise && member.expertise.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {member.expertise.map((skill) => (
                <Badge key={skill} variant="outline" className="bg-gray-100">
                  {skill}
                </Badge>
              ))}
            </div>
          )}
          
          <div className="flex justify-center space-x-3 pt-2 border-t">
            {member.twitter && (
              <a 
                href={member.twitter}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-400"
              >
                <Twitter size={18} />
              </a>
            )}
            {member.linkedin && (
              <a 
                href={member.linkedin}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-700"
              >
                <Linkedin size={18} />
              </a>
            )}
            {member.website && (
              <a 
                href={member.website}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-purple-600"
              >
                <Globe size={18} />
              </a>
            )}
            {member.email && (
              <a 
                href={`mailto:${member.email}`}
                className="text-gray-500 hover:text-green-600"
              >
                <Mail size={18} />
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
          className="text-3xl font-bold text-secondary mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Team
        </motion.h1>
        <motion.p 
          className="text-gray-600 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Meet the dedicated professionals behind the MetaplexDAO grant program. Our team combines expertise in blockchain technology, 
          community building, and ecosystem development to support innovative projects building on Metaplex.
        </motion.p>
      </div>
      
      <Tabs defaultValue="core" className="mb-12">
        <TabsList className="mb-8">
          <TabsTrigger value="core">Core Team</TabsTrigger>
          <TabsTrigger value="advisors">Advisors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="core">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreTeam.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="advisors">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advisors.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <motion.div
        className="bg-gray-50 p-8 rounded-lg border text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-secondary mb-4">Join Our Team</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-4">
          We're always looking for talented individuals passionate about web3, decentralized technology, and building the future of digital assets.
        </p>
        <a 
          href="mailto:team@islanddao.org" 
          className="text-primary hover:text-primary-dark font-medium"
        >
          Reach out to learn about open positions
        </a>
      </motion.div>
    </div>
  );
};

export default Team;