import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Program learnings categories
const learningCategories = [
  {
    id: "application-process",
    title: "Application Process",
    learnings: [
      {
        title: "Clearer Documentation",
        description: "We learned that providing more detailed documentation about the application requirements and evaluation criteria helped attract higher quality proposals. For future cohorts, we'll create even more comprehensive guides with examples.",
        impact: "High"
      },
      {
        title: "Two-Phase Application",
        description: "Implementing a two-phase application process—with an initial short-form application followed by detailed proposals for shortlisted projects—reduced the burden on applicants while maintaining quality.",
        impact: "Medium"
      },
      {
        title: "Application Templates",
        description: "Standardized templates for technical descriptions, roadmaps, and budgets made proposals easier to compare and evaluate, while giving applicants clearer structure.",
        impact: "High"
      }
    ]
  },
  {
    id: "project-selection",
    title: "Project Selection",
    learnings: [
      {
        title: "Diverse Evaluation Panel",
        description: "Including technical experts, community representatives, and ecosystem partners in the evaluation process provided more balanced assessments of project potential.",
        impact: "High"
      },
      {
        title: "Technical Interviews",
        description: "Adding live technical interviews for finalist projects revealed important insights about team capabilities that weren't evident from written applications alone.",
        impact: "High"
      },
      {
        title: "Portfolio Approach",
        description: "Deliberately selecting a mix of project types, risk levels, and development stages created a more resilient grant portfolio with complementary components.",
        impact: "Medium"
      }
    ]
  },
  {
    id: "program-management",
    title: "Program Management",
    learnings: [
      {
        title: "Milestone-Based Funding",
        description: "Breaking grant disbursements into milestone-based payments improved accountability and provided natural checkpoints for project guidance.",
        impact: "High"
      },
      {
        title: "Community Showcases",
        description: "Regular public demos where grantees presented their progress increased visibility, attracted additional resources, and created healthy accountability.",
        impact: "Medium"
      },
      {
        title: "Technical Support Sessions",
        description: "Offering optional technical support sessions with ecosystem experts helped teams overcome obstacles faster and build with best practices.",
        impact: "Medium"
      }
    ]
  },
  {
    id: "ecosystem-impact",
    title: "Ecosystem Impact",
    learnings: [
      {
        title: "Documentation Improvements",
        description: "Several grantees contributed significant improvements to protocol documentation, benefiting the entire ecosystem beyond their specific projects.",
        impact: "High"
      },
      {
        title: "Tool Reusability",
        description: "Emphasizing reusable components and open-source licensing has enabled tools developed by grantees to be adopted by other projects in the ecosystem.",
        impact: "High"
      },
      {
        title: "Cross-Project Collaboration",
        description: "Facilitating introductions between complementary projects led to unexpected collaborations and more integrated solutions.",
        impact: "Medium"
      }
    ]
  }
];

// Cohort 1 statistics
const cohortStats = [
  { label: "Applications Received", value: "76" },
  { label: "Projects Funded", value: "12" },
  { label: "Total USDC Allocated", value: "$100,000" },
  { label: "Total MPLX Allocated", value: "590,000" },
  { label: "MPLX for Cohort 2", value: "410,000" },
  { label: "Average Grant Size", value: "$8,333" },
  { label: "Core/404 Ratio", value: "8:4" }
];

// Key results
const keyResults = [
  {
    category: "Technical Achievements",
    results: [
      "12 new open-source repositories with Metaplex integrations",
      "3 significant core protocol improvements",
      "4 developer tooling projects simplifying onboarding",
      "5 new NFT utility demonstrations"
    ]
  },
  {
    category: "Ecosystem Growth",
    results: [
      "28% increase in Metaplex SDK usage",
      "320+ new developers onboarded through grantee workshops",
      "6 projects continuing development beyond grant period",
      "4 projects receiving additional funding from other sources"
    ]
  },
  {
    category: "Community Impact",
    results: [
      "8 educational resources created for developers",
      "12 public demos showcasing new possibilities",
      "40+ articles and tutorials published by grantees",
      "3 community projects built on grantee infrastructure"
    ]
  }
];

const Learnings = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <motion.h1 
          className="text-3xl font-bold text-gradient mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Program Learnings
        </motion.h1>
        <motion.p 
          className="text-[#b5bfcc] max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Insights and outcomes from our first cohort of MetaplexDAO grants.
          <br />
          We're sharing what worked, what we learned, and how we're improving the program for future rounds.
        </motion.p>
      </div>

      {/* Cohort Statistics */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-gradient mb-6">Cohort 1 Overview</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 gap-2">
          {cohortStats.map((stat, index) => (
            <Card key={index} className="text-center card-gradient card-hover neon-glow">
              <CardContent className="p-3">
                <p className="text-xl font-bold text-gradient animate-glow-pulse">{stat.value}</p>
                <p className="text-xs text-[#b5bfcc]">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Key Results Tabs */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-gradient mb-6">Key Results</h2>
        <Card className="card-gradient neon-glow card-hover" onClick={(e) => {
            // Only apply card hover effect if clicking the card directly
            if (e.target === e.currentTarget) {
              e.stopPropagation();
            }
          }}>
          <CardContent className="p-6">
            <Tabs defaultValue={keyResults[0].category}>
              <TabsList className="mb-6 bg-[#1c2431]/50 border-primary/30 relative z-10 p-1 flex justify-start w-full overflow-x-auto">
                {keyResults.map((result, index) => (
                  <TabsTrigger 
                    key={index} 
                    value={result.category}
                    className="relative z-20 px-4 py-2 mx-1 cursor-pointer rounded-md transition-all duration-300 text-gray-300
                      data-[state=active]:bg-primary/30 
                      data-[state=active]:border-b-2 
                      data-[state=active]:border-primary
                      data-[state=active]:text-primary 
                      data-[state=active]:shadow-glow 
                      data-[state=active]:font-medium
                      hover:bg-primary/10"
                    onClick={(e) => {
                      // Prevent events from propagating to parent elements
                      e.stopPropagation();
                    }}
                  >
                    <span className="flex items-center whitespace-nowrap relative z-30">
                      {result.category}
                      {result.category !== keyResults[0].category && (
                        <span className="ml-1 text-xs text-primary animate-pulse">•</span>
                      )}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {keyResults.map((result, index) => (
                <TabsContent 
                  key={index} 
                  value={result.category}
                  className="animate-in fade-in-50 slide-in-from-bottom-5 duration-300"
                >
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {result.results.map((item, idx) => (
                      <li key={idx} className="flex items-start bg-[#1c2431]/30 p-3 rounded-md hover:bg-[#1c2431]/50 transition-colors">
                        <span className="text-primary font-bold mr-2 animate-glow-pulse">✓</span>
                        <span className="text-[#f1f5fb]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Program Learnings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-gradient mb-6">Program Learnings</h2>
        
        <Accordion type="single" collapsible className="mb-6 shadow-glow">
          {learningCategories.map((category, index) => (
            <AccordionItem key={index} value={category.id} className="border-primary/20 mb-4 rounded-lg overflow-hidden bg-[#1c2431]/30 hover:bg-[#1c2431]/50 transition-colors">
              <AccordionTrigger className="text-xl font-semibold py-4 text-gradient">
                {category.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 gap-4 pt-2">
                  {category.learnings.map((learning, idx) => (
                    <Card key={idx} className="card-gradient neon-glow card-hover">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg text-gradient">{learning.title}</CardTitle>
                          <Badge 
                            className={
                              learning.impact === "High" 
                                ? "bg-green-500/20 text-green-400" 
                                : "bg-blue-500/20 text-blue-400"
                            }
                          >
                            {learning.impact} Impact
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#b5bfcc]">{learning.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>

      {/* Future Plans */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="card-gradient neon-glow">
          <CardHeader>
            <CardTitle className="text-gradient">Looking Ahead: Cohort 2</CardTitle>
            <CardDescription className="text-[#b5bfcc]">
              How we're applying these learnings to future grant rounds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-[#b5bfcc]">
                Based on the success and learnings from our first cohort, we're excited to announce that planning for Cohort 2 is underway.
                The next round will incorporate the improvements identified during our first phase, with a few key changes:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="rounded-lg p-4 card-gradient neon-glow card-hover">
                  <h3 className="font-semibold mb-2 text-gradient">Focused Funding Tracks</h3>
                  <p className="text-sm text-[#b5bfcc]">
                    We'll offer specific funding tracks aligned with ecosystem priorities, including infrastructure, consumer applications, and developer tooling.
                  </p>
                </div>
                <div className="rounded-lg p-4 card-gradient neon-glow card-hover">
                  <h3 className="font-semibold mb-2 text-gradient">Enhanced Support Program</h3>
                  <p className="text-sm text-[#b5bfcc]">
                    Expanding technical mentorship, business development support, and community resources available to grantees.
                  </p>
                </div>
                <div className="rounded-lg p-4 card-gradient neon-glow card-hover">
                  <h3 className="font-semibold mb-2 text-gradient">Collaborative Selection</h3>
                  <p className="text-sm text-[#b5bfcc]">
                    Adding a community voting component to the selection process while maintaining technical evaluation standards.
                  </p>
                </div>
                <div className="rounded-lg p-4 card-gradient neon-glow card-hover">
                  <h3 className="font-semibold mb-2 text-gradient">Increased Funding Pool</h3>
                  <p className="text-sm text-[#b5bfcc]">
                    Growing the total funding allocation to support more projects and enable larger grants for ambitious initiatives.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Learnings;