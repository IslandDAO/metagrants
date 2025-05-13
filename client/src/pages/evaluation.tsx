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

// Evaluation steps
const evaluationSteps = [
  {
    number: 1,
    title: "Application Submission",
    description: "Projects submit detailed applications outlining their proposal, technical approach, team experience, and how their project benefits the Metaplex ecosystem."
  },
  {
    number: 2,
    title: "Initial Screening",
    description: "Our team reviews all applications for completeness and alignment with program objectives. Projects that meet basic requirements advance to the technical review stage."
  },
  {
    number: 3,
    title: "Technical Evaluation",
    description: "Technical experts evaluate proposals on innovation, feasibility, technical architecture, and implementation plan. Strong technical applications advance to the next phase."
  },
  {
    number: 4,
    title: "Community Impact Assessment",
    description: "Projects are evaluated on their potential ecosystem impact, community engagement strategy, and ability to serve Metaplex users and developers."
  },
  {
    number: 5,
    title: "Panel Interview",
    description: "Promising projects participate in a video interview with our grant committee to discuss their proposal, answer questions, and elaborate on technical details."
  },
  {
    number: 6,
    title: "Final Selection",
    description: "Based on all evaluation criteria, our committee makes final selections. Selected projects are notified and grant terms are established."
  },
  {
    number: 7,
    title: "Milestone Tracking",
    description: "Funded projects work toward predefined milestones, receiving staged funding upon completion and review of each development phase."
  }
];

// Criteria categories with their specific criteria
const evaluationCriteria = [
  {
    category: "Technical Merit",
    criteria: [
      "Innovation level and uniqueness of approach",
      "Technical feasibility and implementation plan",
      "Architecture quality and scalability considerations",
      "Security practices and vulnerability prevention",
      "Code quality and development standards"
    ]
  },
  {
    category: "Team Experience",
    criteria: [
      "Relevant technical background and expertise",
      "Prior experience with blockchain development",
      "Track record of successful project delivery",
      "Team composition and skill coverage",
      "Commitment level and project timeline"
    ]
  },
  {
    category: "Ecosystem Impact",
    criteria: [
      "Potential benefit to Metaplex community",
      "Alignment with ecosystem growth objectives",
      "User experience improvements",
      "Developer tooling and infrastructure enhancements",
      "Market expansion potential"
    ]
  },
  {
    category: "Sustainability",
    criteria: [
      "Long-term maintenance and support plans",
      "Business model viability (if applicable)",
      "Community engagement strategy",
      "Plans for future development",
      "Resource allocation and budgeting"
    ]
  }
];

const Evaluation = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <motion.h1 
          className="text-3xl font-bold text-secondary mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Grant Evaluation Process
        </motion.h1>
        <motion.p 
          className="text-gray-600 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Our rigorous evaluation process ensures that funding is awarded to high-quality projects 
          that advance the Metaplex ecosystem and deliver meaningful value to users and developers.
        </motion.p>
      </div>

      {/* Process Timeline */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-secondary mb-6">Application Journey</h2>
        <Timeline steps={evaluationSteps} className="mb-6" />
      </motion.div>

      {/* Evaluation Criteria */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-secondary mb-6">Evaluation Criteria</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {evaluationCriteria.map((category, index) => (
            <Card key={index} className="h-full">
              <CardHeader className="pb-2">
                <Badge className="w-fit mb-2">{category.category}</Badge>
                <CardDescription>
                  How we evaluate applications in this category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.criteria.map((criterion, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-gray-700 text-sm">{criterion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Cohort Selection */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Cohort Selection</CardTitle>
            <CardDescription>
              How we choose our final cohort of grantees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              For Cohort 1, we received 76 applications and selected 12 projects for funding. Our selection strategy aims to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Balance Tech Focus</h3>
                <p className="text-sm text-gray-600">
                  We select a mix of Core and 404 technology projects to ensure balanced ecosystem development across the Metaplex protocol.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Diverse Sectors</h3>
                <p className="text-sm text-gray-600">
                  We fund projects across different sectors to support various use cases and applications of Metaplex technology.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Range of Project Sizes</h3>
                <p className="text-sm text-gray-600">
                  Our cohort includes both smaller experimental projects and larger, more established teams to foster innovation at all levels.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Complementary Solutions</h3>
                <p className="text-sm text-gray-600">
                  We select projects that work well together and address different parts of the ecosystem to create a comprehensive development landscape.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Application Tips */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Tips for Future Applicants</CardTitle>
            <CardDescription>
              How to strengthen your application in future rounds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Be Specific</h3>
                <p className="text-sm text-gray-600">
                  Clearly define your project's goals, technical approach, and measurable outcomes. Vague proposals rarely make it past initial screening.
                </p>
              </div>
              <div className="p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Show Your Work</h3>
                <p className="text-sm text-gray-600">
                  Include links to prototypes, previous projects, or GitHub repositories to demonstrate your team's capabilities and commitment.
                </p>
              </div>
              <div className="p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Focus on Impact</h3>
                <p className="text-sm text-gray-600">
                  Explain how your project benefits the broader Metaplex ecosystem, not just your specific application or user base.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Evaluation;