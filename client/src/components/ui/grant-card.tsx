import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { truncateText } from "@/lib/utils";
import { Link } from "wouter";
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
      <Card className="overflow-hidden h-full transition hover:shadow-lg border border-emerald-700 bg-emerald-800">
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={grant.imageUrl} 
            alt={grant.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-orange-200">{grant.name}</h3>
            <Badge 
              className={grant.techStack === "Core" 
                ? "bg-green-700 text-green-100" 
                : "bg-blue-700 text-blue-100"
              } 
              variant="outline"
            >
              {grant.techStack}
            </Badge>
          </div>
          <div className="mb-3">
            <Badge className="bg-emerald-700 text-emerald-100 mr-2">{grant.sector}</Badge>
          </div>
          <p className="text-emerald-200 text-sm mb-4">
            {truncateText(grant.summary, 100)}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-sm font-medium text-orange-300">{grant.totalValue}</span>
            </div>
            <Link 
              href={`/grants/${grant.slug}`}
              className="text-orange-400 hover:text-orange-300 text-sm font-medium"
            >
              Learn More
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GrantCard;