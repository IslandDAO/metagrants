import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { truncateText } from "@/lib/utils";
import { Link } from "react-router-dom";
import { type Grant } from "@/data/cohort1";

interface GrantCardProps {
  grant: Grant;
}

const GrantCard: React.FC<GrantCardProps> = ({ grant }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
    >
      <Card className="overflow-hidden h-full card-gradient card-hover neon-glow rounded-xl">
        <div className="w-full h-48 overflow-hidden rounded-t-xl">
          <img 
            src={grant.imageUrl} 
            alt={grant.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-[#f1f5fb]">{grant.name}</h3>
            <Badge 
              className={grant.techStack === "Core" 
                ? "bg-[#3b82f6] text-[#f1f5fb] animate-glow-pulse" 
                : "bg-[#8b5cf6] text-[#f1f5fb] animate-glow-pulse"
              } 
              variant="outline"
            >
              {grant.techStack}
            </Badge>
          </div>
          <div className="mb-3">
            <Badge className="bg-[#0ea5e9] text-[#f1f5fb] mr-2">{grant.sector}</Badge>
          </div>
          <p className="text-[#b5bfcc] text-sm mb-4">
            {truncateText(grant.summary, 100)}
          </p>
          <div className="flex justify-between items-center mt-auto">
            <div className="flex items-center">
              <span className="text-sm font-medium text-[#f97316]">{grant.totalValue}</span>
            </div>
            <Link 
              to={`/grants/${grant.slug}`}
              className="text-[#3b82f6] hover:text-[#60a5fa] text-sm font-medium flex items-center"
            >
              Learn More
              <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GrantCard;