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
  { label: "Total MPLX Allocated", value: "1,000,000" },
  { label: "Average Grant Size", value: "$8,333" },
  { label: "Core/404 Ratio", value: "6:6" }
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
          className="text-3xl font-bold text-secondary mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Program Learnings
        </motion.h1>
        <motion.p 
          className="text-gray-600 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Insights and outcomes from our first cohort of MetaplexDAO grants. We're sharing what worked, what we learned, 
          and how we're improving the program for future rounds.
        </motion.p>
      </div>

      {/* Cohort Statistics */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-secondary mb-6">Cohort 1 Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cohortStats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
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
        <h2 className="text-2xl font-bold text-secondary mb-6">Key Results</h2>
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue={keyResults[0].category}>
              <TabsList className="mb-6">
                {keyResults.map((result, index) => (
                  <TabsTrigger key={index} value={result.category}>
                    {result.category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {keyResults.map((result, index) => (
                <TabsContent key={index} value={result.category}>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.results.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-primary font-bold mr-2">✓</span>
                        <span>{item}</span>
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
        <h2 className="text-2xl font-bold text-secondary mb-6">Program Learnings</h2>
        
        <Accordion type="single" collapsible className="mb-6">
          {learningCategories.map((category, index) => (
            <AccordionItem key={index} value={category.id}>
              <AccordionTrigger className="text-xl font-semibold py-4">
                {category.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 gap-4 pt-2">
                  {category.learnings.map((learning, idx) => (
                    <Card key={idx}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{learning.title}</CardTitle>
                          <Badge 
                            className={
                              learning.impact === "High" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-blue-100 text-blue-800"
                            }
                          >
                            {learning.impact} Impact
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">{learning.description}</p>
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
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Looking Ahead: Cohort 2</CardTitle>
            <CardDescription>
              How we're applying these learnings to future grant rounds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700">
                Based on the success and learnings from our first cohort, we're excited to announce that planning for Cohort 2 is underway.
                The next round will incorporate the improvements identified during our first phase, with a few key changes:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Focused Funding Tracks</h3>
                  <p className="text-sm text-gray-600">
                    We'll offer specific funding tracks aligned with ecosystem priorities, including infrastructure, consumer applications, and developer tooling.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Enhanced Support Program</h3>
                  <p className="text-sm text-gray-600">
                    Expanding technical mentorship, business development support, and community resources available to grantees.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Collaborative Selection</h3>
                  <p className="text-sm text-gray-600">
                    Adding a community voting component to the selection process while maintaining technical evaluation standards.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Increased Funding Pool</h3>
                  <p className="text-sm text-gray-600">
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