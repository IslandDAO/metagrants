import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
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
import { projects } from "@/data/projects";
import { formatCurrency } from "@/lib/utils";
import { ChevronLeft, ExternalLink, Calendar, DollarSign, Users, FileText, LinkIcon } from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Find the project with the matching ID
    const foundProject = projects.find((p) => p.id === id);
    setProject(foundProject);
    setLoading(false);
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-secondary mb-2">Project Not Found</h2>
        <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been removed.</p>
        <Link href="/projects">
          <Button>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </div>
    );
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "In Development":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <>
      <div className="mb-6">
        <Link href="/projects" className="text-secondary hover:text-secondary-light flex items-center mb-4">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Projects
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6">
            <img 
              src={project.imageUrl} 
              alt={project.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <Badge className={getStatusColor(project.status)} variant="outline">
                {project.status}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">{project.name}</h1>
            </div>
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
              <TabsTrigger value="updates">Updates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Project Overview</CardTitle>
                  <CardDescription>Project description and details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{project.description}</p>
                  <p className="text-gray-700">{project.longDescription || "The project aims to create innovative blockchain solutions that address real-world problems while maintaining a focus on user experience and security. By leveraging decentralized technology, the team is building tools that empower users and developers alike."}</p>
                  
                  <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-2">Key Features</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Cross-chain interoperability</li>
                      <li>Enhanced security protocols</li>
                      <li>User-friendly interface</li>
                      <li>Scalable architecture</li>
                      <li>Community governance</li>
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-2">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Blockchain", "Smart Contracts", "Web3", "React", "TypeScript"].map((tech) => (
                        <Badge key={tech} variant="outline" className="bg-gray-100">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="milestones">
              <Card>
                <CardHeader>
                  <CardTitle>Project Milestones</CardTitle>
                  <CardDescription>Development timeline and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { 
                        title: "MVP Development", 
                        date: "Q1 2023", 
                        description: "Development of minimum viable product with core functionality", 
                        completed: true 
                      },
                      { 
                        title: "Beta Testing", 
                        date: "Q2 2023", 
                        description: "Closed beta with select users to gather feedback and identify improvements", 
                        completed: project.status !== "In Development" 
                      },
                      { 
                        title: "Public Launch", 
                        date: "Q3 2023", 
                        description: "Official release with full feature set and documentation", 
                        completed: project.status === "Completed" 
                      },
                      { 
                        title: "Ecosystem Integration", 
                        date: "Q4 2023", 
                        description: "Partnerships and integrations with complementary projects", 
                        completed: false 
                      }
                    ].map((milestone, index) => (
                      <div key={index} className="relative pl-8 pb-6 border-l-2 border-gray-200 last:pb-0">
                        <div className="absolute -left-2 mt-1.5">
                          <div className={`rounded-full h-4 w-4 ${milestone.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                          <h3 className="text-lg font-semibold">{milestone.title}</h3>
                          <Badge variant="outline" className="sm:ml-2 mb-2 sm:mb-0 w-fit">
                            <Calendar className="h-3 w-3 mr-1" />
                            {milestone.date}
                          </Badge>
                        </div>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="team">
              <Card>
                <CardHeader>
                  <CardTitle>Project Team</CardTitle>
                  <CardDescription>The people behind the project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        name: "Alex Morgan",
                        role: "Project Lead",
                        bio: "Experienced blockchain developer with 5+ years in the space",
                        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
                      },
                      {
                        name: "Jamie Chen",
                        role: "Lead Engineer",
                        bio: "Full-stack developer specializing in decentralized applications",
                        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
                      },
                      {
                        name: "Chris Wilson",
                        role: "Product Designer",
                        bio: "UX/UI designer focused on creating intuitive blockchain interfaces",
                        avatar: "https://randomuser.me/api/portraits/men/67.jpg"
                      },
                      {
                        name: "Taylor Reed",
                        role: "Community Manager",
                        bio: "Responsible for outreach, partnerships, and user engagement",
                        avatar: "https://randomuser.me/api/portraits/women/54.jpg"
                      }
                    ].map((member, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-16 w-16 rounded-full overflow-hidden">
                            <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{member.name}</h3>
                          <p className="text-sm text-primary-foreground font-medium">{member.role}</p>
                          <p className="text-gray-600 mt-1 text-sm">{member.bio}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="updates">
              <Card>
                <CardHeader>
                  <CardTitle>Project Updates</CardTitle>
                  <CardDescription>Latest news and progress reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        title: "Major Milestone Achieved",
                        date: "July 15, 2023",
                        content: "We're excited to announce that we've completed our first major development milestone ahead of schedule. The core protocol is now operational on the testnet with promising initial results."
                      },
                      {
                        title: "New Partnership Announced",
                        date: "June 22, 2023",
                        content: "We've established a strategic partnership with BlockchainX to enhance our cross-chain capabilities. This collaboration will allow us to expand our ecosystem and provide users with more flexibility."
                      },
                      {
                        title: "Community Feedback Implemented",
                        date: "May 10, 2023",
                        content: "Based on the valuable feedback from our community testing sessions, we've implemented several UI improvements and performance optimizations. Thank you to everyone who participated!"
                      }
                    ].map((update, index) => (
                      <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{update.title}</h3>
                          <span className="text-sm text-gray-500">{update.date}</span>
                        </div>
                        <p className="text-gray-700">{update.content}</p>
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
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Funding Amount</p>
                      <p className="font-medium">{formatCurrency(project.fundingAmount)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium">{new Date(project.startDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Team Size</p>
                      <p className="font-medium">4 members</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium">{project.category || "DeFi"}</p>
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
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Website
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                      </svg>
                      Twitter
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.608 1.2495-1.8447-.2762-3.6677-.2762-5.4878 0-.1634-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                      </svg>
                      Discord
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Related Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects
                    .filter(p => p.id !== id)
                    .slice(0, 3)
                    .map(relatedProject => (
                      <Link key={relatedProject.id} href={`/projects/${relatedProject.id}`}>
                        <div className="flex items-start space-x-3 hover:bg-gray-50 p-2 rounded-md transition cursor-pointer">
                          <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={relatedProject.imageUrl} 
                              alt={relatedProject.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-secondary">{relatedProject.name}</h4>
                            <p className="text-xs text-gray-500 truncate">{relatedProject.description.slice(0, 60)}...</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ProjectDetail;
