import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  BookOpen,
  Calendar,
  Download,
  ExternalLink,
  FileText,
  Globe,
  Lightbulb,
  MessageSquare,
  Quote,
  ThumbsUp,
  TrendingUp,
  Award,
} from "lucide-react";

const Learnings = () => {
  const insights = [
    {
      title: "Building Sustainable Blockchain Ecosystems",
      content: "Our initial focus on pure technological innovation has evolved to emphasize sustainable ecosystem development. Projects that demonstrate long-term viability and community engagement have shown significantly higher success rates.",
      author: "Sofia Chen, Program Director",
      date: "October 2023",
      icon: <Globe className="h-6 w-6 text-primary" />
    },
    {
      title: "The Importance of Milestone-Based Funding",
      content: "Implementing milestone-based funding has improved project accountability and completion rates by 37%. This structure helps teams set realistic goals and provides natural points for course correction.",
      author: "Marcus Johnson, Grant Coordinator",
      date: "August 2023",
      icon: <TrendingUp className="h-6 w-6 text-primary" />
    },
    {
      title: "Mentorship Impact on Project Success",
      content: "Projects that actively engaged with our mentor network showed a 42% higher success rate compared to those with minimal mentor interaction. Technical guidance and network connections proved most valuable.",
      author: "Elena Rodriguez, Mentorship Lead",
      date: "July 2023",
      icon: <ThumbsUp className="h-6 w-6 text-primary" />
    }
  ];

  const caseStudies = [
    {
      title: "DeFi Risk Management Protocol",
      category: "DeFi Infrastructure",
      funding: "$95,000",
      summary: "A risk assessment and management protocol for DeFi platforms that substantially improved security practices across the ecosystem.",
      outcomes: [
        "Integrated with 12 major DeFi platforms",
        "Prevented an estimated $3.4M in potential exploits",
        "Open-sourced security auditing tools",
        "Built active community of 1,500+ developers"
      ],
      learnings: "The project's success highlighted the critical importance of security infrastructure in DeFi. The team's focus on developer experience and comprehensive documentation accelerated adoption beyond initial projections."
    },
    {
      title: "Cross-Chain Identity Solution",
      category: "Digital Identity",
      funding: "$120,000",
      summary: "A decentralized identity protocol enabling seamless verification across multiple blockchain networks while preserving user privacy.",
      outcomes: [
        "Supported 7 blockchain networks at launch",
        "Achieved 28,000 verified identities in first quarter",
        "Reduced integration time by 75% compared to alternatives",
        "Won 'Most Innovative Protocol' at Blockchain Summit 2023"
      ],
      learnings: "The project demonstrated that focusing on standards compatibility and developer tools was more effective than pursuing novel technological approaches. Early engagement with potential integration partners was crucial to success."
    }
  ];

  const programImprovements = [
    {
      title: "Enhanced Technical Review Process",
      description: "We've expanded our technical review committee to include specialized experts in key areas including DeFi, digital identity, and scalability solutions.",
      status: "Implemented",
      date: "Q3 2023"
    },
    {
      title: "Streamlined Application Process",
      description: "Based on applicant feedback, we've simplified our application form while maintaining the depth of information needed for proper evaluation.",
      status: "Implemented",
      date: "Q2 2023"
    },
    {
      title: "Expanded Mentorship Network",
      description: "We've added 15 new mentors with diverse expertise to provide more comprehensive support to funded projects.",
      status: "Implemented",
      date: "Q3 2023"
    },
    {
      title: "Community Governance Input",
      description: "We're developing a framework to incorporate community input in grant selection for specific funding categories.",
      status: "In Progress",
      date: "Q1 2024"
    },
    {
      title: "Enhanced Impact Measurement",
      description: "We're implementing improved metrics to better assess and report on the long-term impact of funded projects.",
      status: "In Progress",
      date: "Q4 2023"
    }
  ];

  return (
    <>
      <div className="mb-8">
        <motion.h1 
          className="text-3xl font-bold text-secondary mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Program Learnings
        </motion.h1>
        <motion.p 
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Insights, outcomes, and continuous improvements from the MetaplexDAO Grants Program
        </motion.p>
      </div>

      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <div className="md:flex">
            <div className="md:w-2/3 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-secondary mb-4">Learning from Our Journey</h2>
              <p className="text-gray-700 mb-4">
                At MetaplexDAO Grants Program, we're committed to continuous improvement through thoughtful reflection 
                and adaptation. By sharing our insights, successes, and challenges, we aim to not only enhance our own 
                processes but also contribute valuable knowledge to the broader blockchain grant ecosystem.
              </p>
              <p className="text-gray-700 mb-4">
                This page documents key learnings from our program operations, project outcomes, and community feedback. 
                We believe that transparency in our evolution helps build trust with applicants, funded teams, and the 
                community at large.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                  <Award className="h-8 w-8 text-secondary mb-2" />
                  <p className="text-sm text-gray-600">3 Funding Cohorts Completed</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                  <ThumbsUp className="h-8 w-8 text-secondary mb-2" />
                  <p className="text-sm text-gray-600">87% Project Success Rate</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-secondary mb-2" />
                  <p className="text-sm text-gray-600">5 Process Improvements</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" 
                alt="Learning and growth" 
                className="h-full w-full object-cover md:rounded-tr-xl md:rounded-br-xl"
              />
            </div>
          </div>
        </Card>
      </motion.div>

      <Tabs defaultValue="insights" className="mb-12">
        <TabsList className="w-full md:w-auto mb-6">
          <TabsTrigger value="insights">Key Insights</TabsTrigger>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
          <TabsTrigger value="improvements">Program Improvements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="insights">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {insights.map((insight, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      {insight.icon}
                    </div>
                    <CardTitle>{insight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-6">
                      {insight.content}
                    </p>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="w-full">
                      <p className="font-medium text-secondary text-sm">{insight.author}</p>
                      <p className="text-gray-500 text-xs">{insight.date}</p>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Quote className="h-5 w-5 mr-2 text-primary" />
                  Expert Perspectives
                </CardTitle>
                <CardDescription>
                  Insights from our advisors on blockchain funding and ecosystem development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-5 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 italic mb-4">
                      "The most successful grant programs we've observed share three key characteristics: clear strategic focus, 
                      strong technical evaluation capacity, and robust post-funding support systems. MetaplexDAO's evolution 
                      over the past year demonstrates significant maturation in all three areas."
                    </p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                        <img 
                          src="https://randomuser.me/api/portraits/men/42.jpg" 
                          alt="Dr. Michael Rivera" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-secondary">Dr. Michael Rivera</p>
                        <p className="text-gray-500 text-sm">Blockchain Economics Institute</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 italic mb-4">
                      "What distinguishes high-impact blockchain grant programs is their ability to identify and support 
                      projects that address genuine ecosystem gaps rather than chasing trends. The shift toward 
                      infrastructure and developer tooling we're seeing in MetaplexDAO's recent cohorts reflects this 
                      important strategic evolution."
                    </p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                        <img 
                          src="https://randomuser.me/api/portraits/women/24.jpg" 
                          alt="Sarah Johnson" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-secondary">Sarah Johnson</p>
                        <p className="text-gray-500 text-sm">Web3 Foundations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="case-studies">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {caseStudies.map((study, index) => (
              <Card key={index} className="mb-6 overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-2/3 p-6">
                    <div className="flex flex-wrap items-center mb-3 gap-2">
                      <h3 className="text-xl font-bold text-secondary mr-2">{study.title}</h3>
                      <Badge>{study.category}</Badge>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <FileText className="h-4 w-4 mr-1" />
                      <span className="mr-4">Grant Amount: {study.funding}</span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-secondary mb-1">Project Summary</h4>
                      <p className="text-gray-700">{study.summary}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-secondary mb-1">Key Outcomes</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {study.outcomes.map((outcome, i) => (
                          <li key={i}>{outcome}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-secondary mb-1">Key Learnings</h4>
                      <p className="text-gray-700">{study.learnings}</p>
                    </div>
                  </div>
                  <div className="md:w-1/3 bg-gray-100 flex flex-col justify-center items-center p-6">
                    <div className="text-center mb-6">
                      <BarChart className="h-12 w-12 text-primary mx-auto mb-3" />
                      <h4 className="font-semibold text-secondary mb-1">Success Metrics</h4>
                      <p className="text-gray-600 text-sm">Key performance indicators achieved</p>
                    </div>
                    
                    <div className="space-y-4 w-full">
                      <div className="bg-white p-3 rounded-lg text-center">
                        <p className="text-2xl font-bold text-secondary">100%</p>
                        <p className="text-xs text-gray-600">Milestone Completion</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center">
                        <p className="text-2xl font-bold text-secondary">6 mos</p>
                        <p className="text-xs text-gray-600">Time to Market</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center">
                        <p className="text-2xl font-bold text-secondary">3.5x</p>
                        <p className="text-xs text-gray-600">Follow-on Funding</p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="mt-6" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        View Full Case Study
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                  Team Reflections
                </CardTitle>
                <CardDescription>
                  Perspectives from funded project teams on their grant experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-5 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 italic mb-4">
                      "Beyond the financial support, the structured milestone framework forced us to maintain focus on our core 
                      deliverables when we might have been tempted to chase new features. The technical mentorship helped us 
                      navigate complex implementation challenges much faster than we could have on our own."
                    </p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                        <img 
                          src="https://randomuser.me/api/portraits/women/65.jpg" 
                          alt="Leila Patel" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-secondary">Leila Patel</p>
                        <p className="text-gray-500 text-sm">CTO, DeFi Risk Management Protocol</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 italic mb-4">
                      "The most valuable aspect of the MetaplexDAO grant wasn't just the funding—it was the connections to 
                      integration partners and the credibility it provided our project in the ecosystem. The technical 
                      review process, while rigorous, significantly improved our architecture before we wrote a single line of code."
                    </p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                        <img 
                          src="https://randomuser.me/api/portraits/men/32.jpg" 
                          alt="David Kim" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-secondary">David Kim</p>
                        <p className="text-gray-500 text-sm">Founder, Cross-Chain Identity Solution</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="improvements">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                  Continuous Improvement
                </CardTitle>
                <CardDescription>
                  How we've evolved the MetaplexDAO Grants Program based on feedback and lessons learned
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {programImprovements.map((improvement, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mt-1">
                        <Badge
                          className={
                            improvement.status === "Implemented" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {improvement.status}
                        </Badge>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h3 className="font-semibold text-secondary">{improvement.title}</h3>
                          <div className="ml-2 flex items-center text-sm text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            {improvement.date}
                          </div>
                        </div>
                        <p className="text-gray-700 mt-1">{improvement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application Process Metrics</CardTitle>
                  <CardDescription>
                    Key improvements in our application and review process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Application Completion Rate</span>
                        <span className="text-sm font-medium text-green-600">+24%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Improved from 51% to 75% after form simplification</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Review Turnaround Time</span>
                        <span className="text-sm font-medium text-green-600">-38%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '62%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Reduced from 6.5 weeks to 4 weeks</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Applicant Satisfaction</span>
                        <span className="text-sm font-medium text-green-600">+18%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Improved from 69% to 87% satisfaction rating</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Feedback Comprehensiveness</span>
                        <span className="text-sm font-medium text-green-600">+45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Improved from 47% to 92% rating feedback quality</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Program Success Metrics</CardTitle>
                  <CardDescription>
                    Key performance indicators for funded projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Project Milestone Completion</span>
                        <span className="text-sm font-medium text-green-600">+31%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Improved from 56% to 87% after milestone refinement</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Time to Market</span>
                        <span className="text-sm font-medium text-green-600">-27%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '73%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Reduced average time from 10 months to 7.3 months</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Community Engagement</span>
                        <span className="text-sm font-medium text-green-600">+63%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '81%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Increased community participation in funded projects</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Follow-on Funding Success</span>
                        <span className="text-sm font-medium text-green-600">+105%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '69%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Projects securing additional funding after grant</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Program Reports & Resources</CardTitle>
            <CardDescription>
              Comprehensive analysis and documentation of our grant program outcomes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start h-auto py-3" asChild>
                <a href="#" className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">Annual Impact Report 2023</p>
                    <p className="text-xs text-gray-500">PDF - 4.2MB</p>
                  </div>
                </a>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto py-3" asChild>
                <a href="#" className="flex items-center">
                  <BarChart className="mr-2 h-4 w-4 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">Project Success Metrics</p>
                    <p className="text-xs text-gray-500">PDF - 2.8MB</p>
                  </div>
                </a>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto py-3" asChild>
                <a href="#" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">Grant Program Playbook</p>
                    <p className="text-xs text-gray-500">PDF - 3.5MB</p>
                  </div>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Separator className="my-6" />
        <div className="text-center">
          <h3 className="text-lg font-semibold text-secondary mb-2">Share Your Feedback</h3>
          <p className="text-gray-600 mb-4">
            We're constantly evolving our program based on community input. Have suggestions or feedback?
          </p>
          <Button className="bg-secondary hover:bg-secondary-light text-white" asChild>
            <a href="mailto:feedback@metaplexdao.com">
              <MessageSquare className="mr-2 h-4 w-4" />
              Send Feedback
            </a>
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default Learnings;
