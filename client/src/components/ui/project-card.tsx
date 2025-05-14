import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { formatCurrency, truncateText } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Completed" | "In Development";
  fundingAmount: number;
  imageUrl: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-[#3b82f6] text-[#f1f5fb]";
    case "Completed":
      return "bg-[#10b981] text-[#f1f5fb]";
    case "In Development":
      return "bg-[#f97316] text-[#f1f5fb]";
    default:
      return "bg-[#3c4759] text-[#f1f5fb]";
  }
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  description,
  status,
  fundingAmount,
  imageUrl,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
    >
      <Card className="overflow-hidden h-full transition hover:shadow-lg border border-[#3c4759] bg-[#1c2431]">
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-[#f1f5fb]">{name}</h3>
            <Badge className={getStatusColor(status)} variant="outline">
              {status}
            </Badge>
          </div>
          <p className="text-[#b5bfcc] text-sm mb-4">
            {truncateText(description, 100)}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-sm font-medium text-[#f97316]">{formatCurrency(fundingAmount)}</span>
              <span className="text-xs text-[#b5bfcc] ml-1">funding</span>
            </div>
            <Link 
              to={`/projects/${id}`}
              className="text-[#3b82f6] hover:text-[#60a5fa] text-sm font-medium"
            >
              Learn More
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
