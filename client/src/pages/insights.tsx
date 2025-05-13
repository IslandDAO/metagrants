import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LightbulbIcon, BarChart4, Globe, Users, TrendingUp, LineChart, Target } from "lucide-react";

// Define key insights data
const insights = [
  {
    id: 1,
    title: "Collaborative Refinement Essential",
    description: "Most submissions required collaborative refinement between the grant committee and applicants. This iterative process significantly improved proposal quality and project outcomes. Building in a dedicated review and refinement phase proved to be critical for program success.",
    icon: Users,
    category: "Application Process"
  },
  {
    id: 2,
    title: "IRL Events Drive Quality Applications",
    description: "In-person engagement through IslandDAO events consistently led to higher-quality applications. Direct conversations allowed for better project scoping and alignment with program goals before formal application submission.",
    icon: Target,
    category: "Community Building"
  },
  {
    id: 3,
    title: "Core Protocol Dominates Mindshare",
    description: "Metaplex Core had significantly higher mindshare than MPL 404 among developers. This suggests a need for increased education and awareness around the 404 protocol to achieve better balance in ecosystem development.",
    icon: BarChart4,
    category: "Technology Trends"
  },
  {
    id: 4,
    title: "Mid-Program Alignment Improvements",
    description: "Project scope and alignment with ecosystem goals improved significantly mid-program. The introduction of structured milestone reviews and regular check-ins helped refine deliverables and ensure mutual benefit.",
    icon: TrendingUp,
    category: "Program Management"
  },
  {
    id: 5,
    title: "Unexpected Global Interest",
    description: "Strong interest emerged from unexpected global regions, particularly Japan, Southeast Asia, and Eastern Europe. This highlights the importance of international outreach and possibly localized materials for future programs.",
    icon: Globe,
    category: "Geographic Reach"
  },
  {
    id: 6,
    title: "Technical Mentorship Adds Value",
    description: "Projects that received hands-on technical mentorship showed significantly better execution and alignment. Implementing a formal mentorship structure improved both project quality and speed of development.",
    icon: LightbulbIcon,
    category: "Support Structure"
  },
  {
    id: 7,
    title: "Metrics-Driven Evaluation Success",
    description: "Implementing a metrics-driven evaluation framework in the second half of the program allowed for more objective assessment and better resource allocation. Data-based decision making improved both selection and ongoing project support.",
    icon: LineChart,
    category: "Evaluation Process"
  }
];

const Insights = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <motion.h1 
          className="text-3xl font-bold text-secondary mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Program Insights & Reflections
        </motion.h1>
        <motion.p 
          className="text-gray-600 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Key learnings and observations from our first cohort of MetaplexDAO grants. These insights inform our approach 
          to future programs and highlight important trends in the ecosystem.
        </motion.p>
      </div>

      {/* Key Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
          >
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <insight.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {insight.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">
                  {insight.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Summary Section */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Looking Forward</CardTitle>
            <CardDescription>
              How these insights will shape our future programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              The lessons from our inaugural grant program have provided valuable guidance for future iterations. We're committed to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Enhanced Collaboration</h3>
                <p className="text-sm text-gray-600">
                  Formalizing the collaborative refinement process with dedicated touchpoints and structured feedback.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Global Outreach</h3>
                <p className="text-sm text-gray-600">
                  Expanding our international presence with region-specific resources and localized community building.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Protocol Balance</h3>
                <p className="text-sm text-gray-600">
                  Creating dedicated educational initiatives to increase awareness and adoption of all Metaplex protocols.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Insights;