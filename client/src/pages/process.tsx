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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, CheckCircle2 } from "lucide-react";

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
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <motion.h1 
          className="text-3xl font-bold text-secondary mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Grant Selection Process
        </motion.h1>
        <motion.p 
          className="text-gray-600 max-w-3xl"
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
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-secondary mb-6">Selection Process</h2>
        <Timeline steps={processSteps} className="mb-6" />
      </motion.div>

      {/* Milestone-Based Funding Highlight */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Alert className="bg-primary/5 border-primary/20">
          <InfoIcon className="h-5 w-5 text-primary" />
          <AlertTitle className="text-primary text-lg font-medium">Milestone-Based Funding</AlertTitle>
          <AlertDescription className="text-gray-700">
            <p className="mb-3">
              <strong>85% of grants</strong> are distributed through our milestone-based funding model, ensuring accountability 
              and alignment throughout the development process.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white rounded-lg p-4 border">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm">Clear Deliverables</h3>
                    <p className="text-sm text-gray-600">Each milestone has specific technical deliverables that must be completed.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm">Staged Payments</h3>
                    <p className="text-sm text-gray-600">Funding is released incrementally as milestones are successfully completed.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm">Regular Updates</h3>
                    <p className="text-sm text-gray-600">Teams provide bi-weekly progress updates and demo their work.</p>
                  </div>
                </div>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      </motion.div>

      {/* Program Structure */}
      <motion.div
        className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {/* Application Requirements */}
        <Card>
          <CardHeader>
            <Badge className="w-fit mb-2">Requirements</Badge>
            <CardTitle>What We Look For</CardTitle>
            <CardDescription>
              Key elements of successful grant applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                "Clear project objectives and measurable outcomes",
                "Strong technical expertise and implementation plan",
                "Demonstrated understanding of the Metaplex ecosystem",
                "Realistic timeline and resource allocation",
                "Potential for broader ecosystem impact",
                "Open-source commitment (when applicable)",
                "Sustainable project maintenance plan"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Support Structure */}
        <Card>
          <CardHeader>
            <Badge className="w-fit mb-2">Support</Badge>
            <CardTitle>Beyond Funding</CardTitle>
            <CardDescription>
              How we support grantees throughout the process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                "Technical mentorship from MetaplexDAO experts",
                "Integration support for Metaplex protocols",
                "Community visibility and promotion",
                "Connection to potential users and partners",
                "Regular feedback and guidance sessions",
                "Documentation and knowledge sharing",
                "Opportunities for follow-on funding"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Evaluation Committee */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Evaluation Committee</CardTitle>
            <CardDescription>
              Our diverse committee brings together technical expertise and ecosystem knowledge
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <div key={index} className="p-4 border rounded-lg">
                  <h3 className="font-semibold">{member.role}</h3>
                  <p className="text-sm text-gray-600 mt-1">{member.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Process;