import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { team } from "@/data/team";
import { Linkedin, Twitter, Globe, Mail } from "lucide-react";

const Team = () => {
  return (
    <>
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
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Meet the dedicated individuals behind the MetaplexDAO Grants Program
        </motion.p>
      </div>

      {/* Team Introduction */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <div className="md:flex">
            <div className="md:w-2/3 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-secondary mb-4">Fostering Innovation Through Collaboration</h2>
              <p className="text-gray-700 mb-4">
                Our team brings together expertise from blockchain technology, finance, entrepreneurship, and community development to create a comprehensive support system for innovative projects.
              </p>
              <p className="text-gray-700 mb-4">
                With diverse backgrounds and skills, we're able to provide mentorship and guidance across technical implementation, tokenomics, go-to-market strategies, and community building.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-secondary">15+</p>
                  <p className="text-sm text-gray-600">Team Members</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-secondary">40+</p>
                  <p className="text-sm text-gray-600">Years Combined Experience</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-secondary">7</p>
                  <p className="text-sm text-gray-600">Countries Represented</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80" 
                alt="Team collaboration" 
                className="h-full w-full object-cover md:rounded-tr-xl md:rounded-br-xl"
              />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Core Team */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-secondary mb-6">Core Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.filter(member => member.role === "core").map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-56 overflow-hidden">
                <img 
                  src={member.imageUrl} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-secondary mb-1">{member.name}</h3>
                <p className="text-primary-foreground font-medium mb-3">{member.title}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="flex space-x-3">
                  {member.twitter && (
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400">
                      <Twitter size={18} />
                    </a>
                  )}
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700">
                      <Linkedin size={18} />
                    </a>
                  )}
                  {member.website && (
                    <a href={member.website} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
                      <Globe size={18} />
                    </a>
                  )}
                  <a href={`mailto:${member.email || "contact@metaplex.io"}`} className="text-gray-500 hover:text-gray-900">
                    <Mail size={18} />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Advisors */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-secondary mb-6">Advisors & Mentors</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {team.filter(member => member.role === "advisor").map((member, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="h-24 w-24 rounded-full overflow-hidden mb-4">
                    <img 
                      src={member.imageUrl} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-secondary">{member.name}</h3>
                  <p className="text-primary-foreground text-sm">{member.title}</p>
                </div>
                <div className="flex justify-center space-x-3">
                  {member.twitter && (
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400">
                      <Twitter size={16} />
                    </a>
                  )}
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700">
                      <Linkedin size={16} />
                    </a>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {member.expertise.map((skill, i) => (
                    <Badge key={i} variant="outline" className="bg-gray-100">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Join the Team */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-secondary to-secondary-light text-white">
          <CardHeader>
            <CardTitle>Join Our Team</CardTitle>
            <CardDescription className="text-gray-200">
              Interested in contributing to the MetaplexDAO Grants Program?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              We're always looking for passionate individuals with expertise in blockchain technology, 
              decentralized finance, community building, and project management to join our team of mentors and advisors.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Mentor Opportunities</h3>
                <p className="text-gray-200 text-sm mb-4">
                  Share your expertise with innovative projects and help shape the future of blockchain technology.
                </p>
                <a href="#" className="text-primary hover:text-primary-dark font-medium">Learn More →</a>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Review Committee</h3>
                <p className="text-gray-200 text-sm mb-4">
                  Help evaluate project applications and make funding recommendations based on technical merit and impact.
                </p>
                <a href="#" className="text-primary hover:text-primary-dark font-medium">Apply Now →</a>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default Team;
