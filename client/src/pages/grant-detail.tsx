import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ExternalLink, DollarSign, Tag, FileText } from "lucide-react";
import { grantProjects, GrantProject } from "@/data/grantProjects";

const GrantDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [grant, setGrant] = useState<GrantProject | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Find the grant with the matching slug
    const foundGrant = grantProjects.find((g: GrantProject) => g.slug === slug);
    setGrant(foundGrant);
    setLoading(false);
  }, [slug]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f97316]"></div>
      </div>
    );
  }
  
  if (!grant) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-[#f1f5fb] mb-2">Grant Not Found</h2>
        <p className="text-[#b5bfcc] mb-6">The grant you're looking for doesn't exist or has been removed.</p>
        <Link to="/grants">
          <Button>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Grants
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <Link to="/grants" className="text-[#f97316] hover:text-[#fb923c] flex items-center mb-4">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Grants
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <div className="flex flex-wrap justify-between items-center mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-[#f1f5fb]">{grant.name}</h1>
              <div className="flex gap-2 mt-2 md:mt-0">
                <Badge 
                  className={grant.tech === "CORE" 
                    ? "bg-[#10b981] text-[#f1f5fb]" 
                    : "bg-[#3b82f6] text-[#f1f5fb]"
                  } 
                  variant="outline"
                >
                  {grant.tech}
                </Badge>
                <Badge className="bg-[#2c374b] text-[#b5bfcc]">{grant.sector}</Badge>
              </div>
            </div>
            <p className="text-xl text-[#b5bfcc]">{grant.summary}</p>
          </div>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card className="border-[#3c4759] bg-[#1c2431]">
                <CardHeader>
                  <CardTitle className="text-[#f1f5fb]">Project Description</CardTitle>
                  <CardDescription className="text-[#b5bfcc]">Details about the project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[#b5bfcc]">{grant.description || "Detailed description will be available soon."}</p>
                  
                  <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-2 text-[#f1f5fb]">Technical Details</h3>
                    <p className="text-[#b5bfcc]">
                      This project utilizes the MetaplexDAO {grant.tech} technology to build innovative solutions
                      in the {grant.sector} space. The development team is focused on creating a user-friendly
                      product that addresses key challenges in the ecosystem.
                    </p>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-2 text-[#f1f5fb]">Impact & Outcomes</h3>
                    <p className="text-[#b5bfcc]">
                      The grant supports development of crucial infrastructure that will benefit the
                      broader Metaplex community. Key outcomes include improved user experiences,
                      enhanced functionality, and greater ecosystem integration.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="milestones">
              <Card className="border-[#3c4759] bg-[#1c2431]">
                <CardHeader>
                  <CardTitle className="text-[#f1f5fb]">Project Milestones</CardTitle>
                  <CardDescription className="text-[#b5bfcc]">Development timeline and goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { 
                        title: "Research & Planning", 
                        date: "Q1 2023", 
                        description: "Market research, technical specifications, and architecture design", 
                        completed: true 
                      },
                      { 
                        title: "MVP Development", 
                        date: "Q2 2023", 
                        description: "Building core functionality and essential features", 
                        completed: true 
                      },
                      { 
                        title: "Testing & Refinement", 
                        date: "Q3 2023", 
                        description: "Beta testing, user feedback, and iterative improvements", 
                        completed: grant.notable
                      },
                      { 
                        title: "Public Launch", 
                        date: "Q4 2023", 
                        description: "Official release with marketing campaign and community onboarding", 
                        completed: false 
                      }
                    ].map((milestone, index) => (
                      <div key={index} className="relative pl-8 pb-6 border-l-2 border-[#3c4759] last:pb-0">
                        <div className="absolute -left-2 mt-1.5">
                          <div className={`rounded-full h-4 w-4 ${milestone.completed ? 'bg-[#10b981]' : 'bg-[#3c4759]'}`}></div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                          <h3 className="text-lg font-semibold text-[#f1f5fb]">{milestone.title}</h3>
                          <Badge variant="outline" className="sm:ml-2 mb-2 sm:mb-0 w-fit border-[#3c4759] text-[#b5bfcc]">
                            {milestone.date}
                          </Badge>
                        </div>
                        <p className="text-[#b5bfcc]">{milestone.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="team">
              <Card className="border-[#3c4759] bg-[#1c2431]">
                <CardHeader>
                  <CardTitle className="text-[#f1f5fb]">Project Team</CardTitle>
                  <CardDescription className="text-[#b5bfcc]">The people behind the project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        name: "Project Lead",
                        role: "Technical Director",
                        bio: "Experienced blockchain developer with strong background in Solana and Metaplex technologies",
                      },
                      {
                        name: "Developer",
                        role: "Senior Engineer",
                        bio: "Specialized in Web3 frontend development with focus on user experience and interface design",
                      },
                      {
                        name: "Product Manager",
                        role: "Strategy Lead",
                        bio: "Responsible for roadmap planning, feature prioritization, and stakeholder coordination",
                      },
                      {
                        name: "Community Manager",
                        role: "Engagement Lead",
                        bio: "Handles community outreach, user feedback collection, and ecosystem partnership development",
                      }
                    ].map((member, index) => (
                      <div key={index} className="p-4 border border-[#3c4759] rounded-lg bg-[#2c374b]">
                        <h3 className="font-semibold text-lg text-[#f1f5fb]">{member.name}</h3>
                        <p className="text-sm text-[#f97316] font-medium">{member.role}</p>
                        <p className="text-[#b5bfcc] mt-2 text-sm">{member.bio}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-6">
            <Card className="border-[#3c4759] bg-[#1c2431]">
              <CardHeader>
                <CardTitle className="text-[#f1f5fb]">Grant Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-[#f97316] mr-2" />
                    <div>
                      <p className="text-sm text-[#8896b0]">Total Grant Value</p>
                      <p className="font-medium text-[#f1f5fb]">${grant.totalUsd.toLocaleString()} USD</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-[#f97316] mr-2" />
                    <div>
                      <p className="text-sm text-[#8896b0]">USDC Allocation</p>
                      <p className="font-medium text-[#f1f5fb]">${grant.usdc.toLocaleString()} USDC</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-[#f97316] mr-2" />
                    <div>
                      <p className="text-sm text-[#8896b0]">MPLX Tokens</p>
                      <p className="font-medium text-[#f1f5fb]">{grant.mplx.toLocaleString()} MPLX</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Tag className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Tech Stack</p>
                      <p className="font-medium">Metaplex {grant.tech}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Sector</p>
                      <p className="font-medium">{grant.sector}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Project Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {grant.links?.website && (
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={grant.links.website} target="_blank" rel="noopener noreferrer">
                        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
                          <path d="M12 6a2 2 0 100 4 2 2 0 000-4z"></path>
                          <path d="M6.09 12.5a6 6 0 0110.82 0"></path>
                        </svg>
                        Website
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </a>
                    </Button>
                  )}
                  
                  {grant.links?.x && (
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={grant.links.x} target="_blank" rel="noopener noreferrer">
                        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25H5.756a3.56 3.56 0 0 0-3.53 3.568v12.364a3.56 3.56 0 0 0 3.53 3.568h12.488a3.56 3.56 0 0 0 3.53-3.568V5.818a3.56 3.56 0 0 0-3.53-3.568Zm-7.143 15.955a.936.936 0 0 1-.311.06H8.974c-.324 0-.438-.168-.209-.382l2.156-2.12c.088-.087.088-.262 0-.35L8.77 13.296c-.230-.214-.115-.382.21-.382h1.816c.115 0 .23.029.31.095l2.193 2.045c.344.323.344.85 0 1.173l-2.198 1.978Z"></path>
                          <path d="M13.445 14.096a.936.936 0 0 0-.311-.06h-1.816c-.324 0-.438.168-.21.382l2.157 2.12c.088.087.088.262 0 .35l-2.152 2.116c-.229.214-.114.382.21.382h1.816c.115 0 .23-.028.311-.095l2.197-1.978c.344-.324.344-.85 0-1.173l-2.202-2.044Z"></path>
                        </svg>
                        X (Twitter)
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GrantDetail;