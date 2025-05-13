import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Timeline from "@/components/ui/timeline";
import { 
  CheckCircle2, 
  ClipboardCheck, 
  User, 
  Lightbulb, 
  Zap, 
  ShieldCheck,
  BarChart,
  Globe,
  Code,
  Download
} from "lucide-react";

const Evaluation = () => {
  const evaluationCriteria = [
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "Innovation",
      description: "We evaluate how projects push boundaries and explore new solutions in blockchain technology.",
      criteria: [
        "Uniqueness of approach",
        "Novel technology implementation",
        "Potential industry impact",
        "Differentiation from existing solutions"
      ]
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Feasibility",
      description: "Projects are assessed on their technical viability and implementation approach.",
      criteria: [
        "Technical architecture",
        "Development roadmap",
        "Resource allocation",
        "Risk assessment"
      ]
    },
    {
      icon: <User className="h-8 w-8 text-primary" />,
      title: "Team",
      description: "The experience and expertise of the team is a critical factor in project success.",
      criteria: [
        "Technical background",
        "Domain expertise",
        "Track record",
        "Commitment level" 
      ]
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Impact",
      description: "We prioritize projects that create meaningful impact in the blockchain ecosystem.",
      criteria: [
        "User benefit",
        "Ecosystem contribution",
        "Scalability potential",
        "Sustainability"
      ]
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: "Market Fit",
      description: "Projects should demonstrate a clear market need and adoption strategy.",
      criteria: [
        "Target audience definition",
        "Market research",
        "Go-to-market strategy",
        "User acquisition plan"
      ]
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Open Source",
      description: "We value projects that contribute to the open-source community.",
      criteria: [
        "Code quality",
        "Documentation",
        "Community engagement",
        "License compatibility"
      ]
    }
  ];

  const evaluationProcessSteps = [
    {
      number: 1,
      title: "Initial Screening",
      description: "Applications are reviewed for completeness and alignment with program focus areas",
    },
    {
      number: 2,
      title: "Technical Review",
      description: "Technical committee evaluates feasibility, architecture, and implementation plans",
    },
    {
      number: 3,
      title: "Impact Assessment",
      description: "Projects are assessed for potential ecosystem impact and market fit",
    },
    {
      number: 4,
      title: "Team Interview",
      description: "Shortlisted teams participate in interviews to discuss their vision and approach",
    },
    {
      number: 5,
      title: "Final Decision",
      description: "Grant committee makes final funding decisions based on comprehensive evaluation",
    },
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
          Evaluation Process
        </motion.h1>
        <motion.p 
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Learn how we evaluate and select projects for the MetaplexDAO Grants Program
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
              <h2 className="text-2xl font-bold text-secondary mb-4">Our Evaluation Philosophy</h2>
              <p className="text-gray-700 mb-4">
                At MetaplexDAO Grants Program, we believe in a comprehensive, fair, and transparent evaluation process. 
                Our approach balances technical merit with real-world impact potential, ensuring we fund projects that 
                not only push technological boundaries but also address meaningful challenges in the blockchain ecosystem.
              </p>
              <p className="text-gray-700 mb-4">
                Each application undergoes a rigorous multi-stage review process, involving technical experts, 
                industry advisors, and community representatives to provide diverse perspectives on project potential.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="bg-primary px-3 py-1 rounded-full text-secondary text-sm font-medium">Transparent</Badge>
                <Badge className="bg-primary px-3 py-1 rounded-full text-secondary text-sm font-medium">Comprehensive</Badge>
                <Badge className="bg-primary px-3 py-1 rounded-full text-secondary text-sm font-medium">Fair</Badge>
                <Badge className="bg-primary px-3 py-1 rounded-full text-secondary text-sm font-medium">Merit-based</Badge>
              </div>
            </div>
            <div className="md:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80" 
                alt="Evaluation process" 
                className="h-full w-full object-cover md:rounded-tr-xl md:rounded-br-xl"
              />
            </div>
          </div>
        </Card>
      </motion.div>

      <Tabs defaultValue="criteria" className="mb-12">
        <TabsList className="w-full md:w-auto mb-6">
          <TabsTrigger value="criteria">Evaluation Criteria</TabsTrigger>
          <TabsTrigger value="process">Review Process</TabsTrigger>
          <TabsTrigger value="scoring">Scoring Methodology</TabsTrigger>
        </TabsList>
        
        <TabsContent value="criteria">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {evaluationCriteria.map((criterion, index) => (
                <Card key={index} className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-center mb-2">
                      {criterion.icon}
                    </div>
                    <CardTitle>{criterion.title}</CardTitle>
                    <CardDescription>{criterion.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {criterion.criteria.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="process">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Evaluation Timeline</CardTitle>
                <CardDescription>
                  Our comprehensive review process typically takes 4-6 weeks from application to decision
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Timeline steps={evaluationProcessSteps} />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="mb-2">
                    <ClipboardCheck className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Application Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Each application is reviewed by at least three committee members who assess project fit, feasibility, and potential impact. 
                    This initial review filters out projects that don't align with program goals or lack sufficient detail.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="mb-2">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Technical Deep Dive</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Projects that pass initial screening undergo a detailed technical assessment by our engineering team. 
                    This includes code review (if available), architecture evaluation, and technical feasibility analysis.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="mb-2">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Team Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    We evaluate the team's expertise, experience, and track record in the blockchain space. 
                    Strong teams with relevant skills and demonstrated commitment receive higher consideration.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="scoring">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Scoring System</CardTitle>
                <CardDescription>
                  We use a comprehensive scoring methodology to evaluate projects consistently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left p-3 border">Criteria</th>
                        <th className="text-left p-3 border">Weight</th>
                        <th className="text-left p-3 border">Scoring (1-5)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border">Innovation & Originality</td>
                        <td className="p-3 border">25%</td>
                        <td className="p-3 border">
                          <p><strong>5:</strong> Revolutionary approach with significant advances</p>
                          <p><strong>3:</strong> Meaningful improvements to existing solutions</p>
                          <p><strong>1:</strong> Minor iterative changes to established technology</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border">Technical Feasibility</td>
                        <td className="p-3 border">20%</td>
                        <td className="p-3 border">
                          <p><strong>5:</strong> Robust architecture with proven implementation path</p>
                          <p><strong>3:</strong> Reasonable technical approach with some challenges</p>
                          <p><strong>1:</strong> Significant technical risks or unrealistic approach</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border">Team Capability</td>
                        <td className="p-3 border">20%</td>
                        <td className="p-3 border">
                          <p><strong>5:</strong> Exceptional team with directly relevant experience</p>
                          <p><strong>3:</strong> Competent team with some relevant experience</p>
                          <p><strong>1:</strong> Limited experience or missing key expertise</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border">Ecosystem Impact</td>
                        <td className="p-3 border">20%</td>
                        <td className="p-3 border">
                          <p><strong>5:</strong> Transformative ecosystem impact with wide-reaching benefits</p>
                          <p><strong>3:</strong> Meaningful contribution to specific ecosystem components</p>
                          <p><strong>1:</strong> Limited or indirect ecosystem benefits</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border">Market Potential</td>
                        <td className="p-3 border">15%</td>
                        <td className="p-3 border">
                          <p><strong>5:</strong> Clear market need with strong adoption strategy</p>
                          <p><strong>3:</strong> Identified market with reasonable adoption potential</p>
                          <p><strong>1:</strong> Unclear market fit or limited adoption potential</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Final Evaluation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Projects receive a weighted score based on the criteria above. The final evaluation includes:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Quantitative assessment (numerical scoring)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Qualitative feedback from reviewers</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Team interview assessment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Portfolio fit consideration</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Funding level appropriateness</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Decision Communication</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    All applicants receive detailed feedback regardless of the funding decision:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Comprehensive evaluation summary</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Identified strengths and weaknesses</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Specific improvement suggestions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">For funded projects: next steps and milestones</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">For declined projects: reapplication guidance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>

      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Evaluation Resources</CardTitle>
            <CardDescription>
              Download our detailed evaluation documentation and templates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start h-auto py-3" asChild>
                <a href="#" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  <div className="text-left">
                    <p className="font-medium">Evaluation Framework</p>
                    <p className="text-xs text-gray-500">PDF - 1.2MB</p>
                  </div>
                </a>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto py-3" asChild>
                <a href="#" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  <div className="text-left">
                    <p className="font-medium">Application Template</p>
                    <p className="text-xs text-gray-500">DOCX - 780KB</p>
                  </div>
                </a>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto py-3" asChild>
                <a href="#" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  <div className="text-left">
                    <p className="font-medium">Scoring Guide</p>
                    <p className="text-xs text-gray-500">PDF - 950KB</p>
                  </div>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-primary/20">
          <CardContent className="p-6 md:p-8">
            <div className="md:flex justify-between items-center">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h3 className="text-xl font-bold text-secondary mb-2">Ready to Apply for a Grant?</h3>
                <p className="text-gray-700">
                  Now that you understand our evaluation process, we encourage you to submit your project for consideration. 
                  Applications are evaluated on a rolling basis, with decisions typically made within 4-6 weeks.
                </p>
              </div>
              <div>
                <Button size="lg" className="bg-secondary hover:bg-secondary-light text-white">
                  Apply for Funding
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default Evaluation;
