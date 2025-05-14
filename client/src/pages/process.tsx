import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Timeline } from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";
import { Sparkles, CheckCircle2, Compass, LightbulbIcon, Award, Users } from "lucide-react";

// Process steps
const processSteps = [
  {
    number: 1,
    title: "Intake via Google Form",
    description: "Initial applications are collected through a standardized Google Form that captures project details, team information, technical goals, and funding requirements."
  },
  {
    number: 2,
    title: "Initial review by council",
    description: "The grant council performs an initial screening of applications, evaluating alignment with program goals, technical feasibility, and potential impact on the ecosystem."
  },
  {
    number: 3,
    title: "Intro call with the builder",
    description: "Shortlisted projects participate in an introductory call to present their project, answer questions, and discuss their vision with the evaluation team."
  },
  {
    number: 4,
    title: "Technical due diligence",
    description: "Technical experts conduct a thorough review of the project's architecture, codebase (if available), technical approach, and implementation plan."
  },
  {
    number: 5,
    title: "Milestone structuring",
    description: "For projects advancing to the funding stage, concrete milestones are established with clear deliverables, timelines, and associated funding allocations."
  },
  {
    number: 6,
    title: "MOU agreement",
    description: "A formal Memorandum of Understanding is drafted and signed, outlining project commitments, milestone schedule, payment terms, and reporting requirements."
  },
  {
    number: 7,
    title: "Comms + Telegram onboarding",
    description: "Successful grantees are publicly announced and onboarded to the program's Telegram group for ongoing communication, support, and community integration."
  }
];

const Process = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <motion.h1 
          className="text-3xl font-bold text-[#f1f5fb] mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Grant Selection Process
        </motion.h1>
        <motion.p 
          className="text-[#b5bfcc] max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Our structured approach to selecting and supporting grant recipients ensures 
          transparency, fairness, and successful project outcomes for the Metaplex ecosystem.
        </motion.p>
      </div>

      {/* Process Timeline */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center mr-3">
            <Compass className="h-5 w-5 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-[#f1f5fb]">Selection Journey</h2>
        </div>
        <Timeline steps={processSteps} className="mb-6" />
      </motion.div>

      {/* Milestone-Based Funding Highlight */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="bg-gradient-to-r from-[#1a2436] to-[#1d2a40] border border-indigo-500/20 rounded-xl overflow-hidden">
          <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-90"></div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Sparkles className="h-6 w-6 text-indigo-400 mr-3" />
              <h2 className="text-2xl font-bold text-[#f1f5fb]">Milestone-Based Funding</h2>
            </div>
            
            <p className="text-[#b5bfcc] mb-6 pl-9">
              <span className="text-indigo-300 font-medium">85% of grants</span> are distributed through our milestone-based funding model, 
              ensuring accountability and alignment throughout the development process.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <motion.div 
                className="bg-[#1c2431] border border-[#364156] rounded-lg p-5 shadow-lg relative overflow-hidden group"
                whileHover={{ translateY: -5, transition: { duration: 0.2 } }}
                variants={itemVariants}
              >
                <div className="absolute top-0 right-0 h-20 w-20 bg-indigo-500/10 rounded-full -mt-10 -mr-10"></div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#f1f5fb]">Clear Deliverables</h3>
                    <p className="text-sm text-[#b5bfcc] mt-1">Each milestone has specific technical deliverables that must be completed.</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-[#1c2431] border border-[#364156] rounded-lg p-5 shadow-lg relative overflow-hidden group"
                whileHover={{ translateY: -5, transition: { duration: 0.2 } }}
                variants={itemVariants}
              >
                <div className="absolute top-0 right-0 h-20 w-20 bg-indigo-500/10 rounded-full -mt-10 -mr-10"></div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#f1f5fb]">Staged Payments</h3>
                    <p className="text-sm text-[#b5bfcc] mt-1">Funding is released incrementally as milestones are successfully completed.</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-[#1c2431] border border-[#364156] rounded-lg p-5 shadow-lg relative overflow-hidden group"
                whileHover={{ translateY: -5, transition: { duration: 0.2 } }}
                variants={itemVariants}
              >
                <div className="absolute top-0 right-0 h-20 w-20 bg-indigo-500/10 rounded-full -mt-10 -mr-10"></div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#f1f5fb]">Regular Updates</h3>
                    <p className="text-sm text-[#b5bfcc] mt-1">Teams provide bi-weekly progress updates and demo their work.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Program Structure */}
      <motion.div
        className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Application Requirements */}
        <motion.div variants={itemVariants}>
          <Card className="bg-[#1c2431] border-[#364156] overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <CardHeader>
              <Badge className="w-fit mb-2 border-indigo-500/30 text-indigo-300 bg-indigo-500/10">Requirements</Badge>
              <CardTitle className="text-[#f1f5fb]">What We Look For</CardTitle>
              <CardDescription className="text-[#b5bfcc]">
                Key elements of successful grant applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Clear project objectives and measurable outcomes",
                  "Strong technical expertise and implementation plan",
                  "Demonstrated understanding of the Metaplex ecosystem",
                  "Realistic timeline and resource allocation",
                  "Potential for broader ecosystem impact",
                  "Open-source commitment (when applicable)",
                  "Sustainable project maintenance plan"
                ].map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3 mt-0.5 group-hover:bg-indigo-500/40 transition-colors flex-shrink-0">
                      <LightbulbIcon className="h-3.5 w-3.5 text-indigo-400" />
                    </div>
                    <span className="text-[#b5bfcc]">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Support Structure */}
        <motion.div variants={itemVariants}>
          <Card className="bg-[#1c2431] border-[#364156] overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            <CardHeader>
              <Badge className="w-fit mb-2 border-blue-500/30 text-blue-300 bg-blue-500/10">Support</Badge>
              <CardTitle className="text-[#f1f5fb]">Beyond Funding</CardTitle>
              <CardDescription className="text-[#b5bfcc]">
                How we support grantees throughout the process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Technical mentorship from MetaplexDAO experts",
                  "Integration support for Metaplex protocols",
                  "Community visibility and promotion",
                  "Connection to potential users and partners",
                  "Regular feedback and guidance sessions",
                  "Documentation and knowledge sharing",
                  "Opportunities for follow-on funding"
                ].map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5 group-hover:bg-blue-500/40 transition-colors flex-shrink-0">
                      <Award className="h-3.5 w-3.5 text-blue-400" />
                    </div>
                    <span className="text-[#b5bfcc]">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Evaluation Committee */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="bg-[#1c2431] border-[#364156] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
          <CardHeader>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mr-3">
                <Users className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-[#f1f5fb]">Evaluation Committee</CardTitle>
                <CardDescription className="text-[#b5bfcc]">
                  Our diverse committee brings together technical expertise and ecosystem knowledge
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {[
                {
                  role: "Technical Evaluators",
                  description: "Engineers and developers who assess technical feasibility, architecture, and implementation plans"
                },
                {
                  role: "Ecosystem Representatives",
                  description: "Community members who evaluate potential impact and integration with existing tools and services"
                },
                {
                  role: "Strategic Advisors",
                  description: "Experienced builders who provide guidance on project viability and market fit within the ecosystem"
                },
                {
                  role: "Governance Members",
                  description: "DAO representatives who ensure alignment with broader MetaplexDAO objectives and values"
                },
                {
                  role: "Project Managers",
                  description: "Operational team members who assess project planning, milestones, and resource allocation"
                },
                {
                  role: "Community Advocates",
                  description: "Representatives who evaluate user experience, adoption potential, and community benefit"
                }
              ].map((member, index) => (
                <motion.div 
                  key={index} 
                  className="p-5 border border-[#364156] bg-[#1a2436] rounded-lg hover:border-purple-500/30 transition-colors group relative overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className="absolute -top-16 -right-16 w-32 h-32 bg-purple-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <h3 className="font-semibold text-[#f1f5fb] mb-2">{member.role}</h3>
                  <p className="text-sm text-[#b5bfcc]">{member.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Process;