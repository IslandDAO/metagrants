import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/layout";
import { Twitter, Linkedin, Globe, Mail, Github, ChevronDown, User, Users } from "lucide-react";
import { team, TeamMember } from "@/data/team";

// Component for featured team member (leadership)
const LeadershipCard = ({ member }: { member: TeamMember }) => {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden"
    >
      <Card className="bg-gradient-to-b from-[#1d2839] to-[#141d2c] border-indigo-500/30 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-400 via-purple-500 to-blue-500"></div>
        
        <CardContent className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            {/* Avatar and name section */}
            <div className="flex flex-col items-center text-center md:text-left md:items-start md:w-1/3">
              <div className="relative">
                <Avatar className="h-32 w-32 mb-6 ring-4 ring-indigo-500/30 ring-offset-2 ring-offset-[#1d2839]">
                  <AvatarImage src={member.imageUrl} alt={member.name} />
                  <AvatarFallback className="bg-indigo-800 text-indigo-200 text-3xl">{initials}</AvatarFallback>
                </Avatar>
                <span className="absolute -top-2 -right-2 px-3 py-1 bg-indigo-500 text-white text-xs font-semibold rounded-full shadow-lg">
                  Lead
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
              <p className="text-indigo-200 font-medium mb-4">{member.title}</p>
              
              <div className="flex space-x-3">
                {member.twitter && (
                  <a 
                    href={member.twitter}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/40 hover:text-white transition-colors"
                  >
                    <Twitter size={18} />
                  </a>
                )}
                {member.linkedin && (
                  <a 
                    href={member.linkedin}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/40 hover:text-white transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {member.github && (
                  <a 
                    href={member.github}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/40 hover:text-white transition-colors"
                  >
                    <Github size={18} />
                  </a>
                )}
                {member.website && (
                  <a 
                    href={member.website}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/40 hover:text-white transition-colors"
                  >
                    <Globe size={18} />
                  </a>
                )}
                {member.email && (
                  <a 
                    href={`mailto:${member.email}`}
                    className="p-2 rounded-full bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/40 hover:text-white transition-colors"
                  >
                    <Mail size={18} />
                  </a>
                )}
              </div>
            </div>
            
            {/* Bio and expertise section */}
            <div className="md:w-2/3">
              <div className="prose prose-invert max-w-none mb-6">
                <p className="text-gray-300 leading-relaxed text-lg">{member.bio}</p>
              </div>
              
              {member.expertise && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {member.expertise.map((skill) => (
                    <Badge 
                      key={skill} 
                      className="bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 border-indigo-500/30"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Component for team member card
const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  const [showBio, setShowBio] = useState(false);
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
      whileHover={{ scale: 1.02 }}
    >
      <Card className="h-full bg-[#1c2431] border-[#364156] hover:border-indigo-500/30 overflow-hidden relative transition-all duration-300">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        <CardContent className="p-6">
          <div className="flex flex-col h-full">
            {/* Avatar and name */}
            <div className="flex flex-col items-center text-center mb-4">
              <Avatar className="h-24 w-24 mb-4 ring-2 ring-indigo-500/30 ring-offset-2 ring-offset-[#1c2431]">
                <AvatarImage src={member.imageUrl} alt={member.name} />
                <AvatarFallback className="bg-indigo-500/20 text-indigo-200 text-xl">{initials}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-indigo-300 text-sm font-medium">{member.title}</p>
            </div>
            
            {/* Bio section with toggle */}
            <div className="flex-grow">
              <div 
                className={`text-gray-300 text-sm transition-all duration-300 ${showBio ? 'max-h-[500px] mb-4' : 'max-h-[80px] overflow-hidden relative mb-2'}`}
              >
                <p>{member.bio}</p>
                {!showBio && (
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1c2431] to-transparent"></div>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBio(!showBio)}
                className="w-full text-indigo-400 hover:text-indigo-200 hover:bg-indigo-500/20 text-xs flex items-center justify-center"
              >
                {showBio ? 'Show Less' : 'Read More'}
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showBio ? 'rotate-180' : ''}`} />
              </Button>
            </div>
            
            {/* Expertise tags */}
            {member.expertise && member.expertise.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {member.expertise.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="outline" 
                    className="bg-indigo-500/10 border-indigo-500/30 text-indigo-200 text-xs"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Social icons */}
            <div className="flex justify-center gap-3 mt-4 pt-4 border-t border-indigo-500/20">
              {member.twitter && (
                <a 
                  href={member.twitter}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-blue-400 transition-colors"
                >
                  <Twitter size={16} />
                </a>
              )}
              {member.linkedin && (
                <a 
                  href={member.linkedin}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-blue-400 transition-colors"
                >
                  <Linkedin size={16} />
                </a>
              )}
              {member.github && (
                <a 
                  href={member.github}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-purple-400 transition-colors"
                >
                  <Github size={16} />
                </a>
              )}
              {member.website && (
                <a 
                  href={member.website}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-400 transition-colors"
                >
                  <Globe size={16} />
                </a>
              )}
              {member.email && (
                <a 
                  href={`mailto:${member.email}`}
                  className="text-indigo-300 hover:text-green-400 transition-colors"
                >
                  <Mail size={16} />
                </a>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Main team page component
export default function TeamPage() {
  // Find lead member
  const leadMember = team.find(member => member.role === "lead");
  
  // Get non-lead members
  const otherMembers = team.filter(member => member.role !== "lead");
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        {/* Page header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-blue-200 to-purple-200 mb-4">
            Meet Our Team
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            The dedicated professionals behind the MetaplexDAO grant program managed by IslandDAO. Our combined expertise in blockchain development, program management, and community building helps us identify and support promising projects.
          </p>
        </motion.div>
        
        {/* Leadership section */}
        {leadMember && (
          <section className="mb-16">
            <motion.div 
              className="flex items-center mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <User className="text-indigo-400 mr-2 h-5 w-5" />
              <h2 className="text-2xl font-bold text-white">Leadership</h2>
              <div className="ml-4 h-px flex-grow bg-indigo-500/20"></div>
            </motion.div>
            
            <LeadershipCard member={leadMember} />
          </section>
        )}
        
        {/* Team members section */}
        <section>
          <motion.div 
            className="flex items-center mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Users className="text-indigo-400 mr-2 h-5 w-5" />
            <h2 className="text-2xl font-bold text-white">Grants Council & Advisors</h2>
            <div className="ml-4 h-px flex-grow bg-indigo-500/20"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherMembers.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </section>
        
        {/* Join section */}
        <motion.section
          className="mt-20 bg-gradient-to-br from-[#1a2436] to-[#1d2a40] p-8 rounded-lg border border-indigo-500/20 text-center overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
          
          {/* Background elements */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-indigo-600/5"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-purple-600/5"></div>
          
          <h2 className="text-2xl font-bold text-white mb-4 relative z-10">Join Our Mission</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8 relative z-10">
            We're always looking for passionate individuals to join our team. If you're interested in blockchain technology, web3, and building the future of digital assets, we'd love to hear from you.
          </p>
          
          <Button 
            size="lg"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-none relative z-10"
            onClick={() => window.location.href = 'mailto:team@islanddao.org'}
          >
            <Mail className="mr-2 h-4 w-4" />
            Get in Touch
          </Button>
        </motion.section>
      </div>
    </Layout>
  );
}