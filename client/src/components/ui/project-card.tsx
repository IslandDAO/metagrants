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
      return "bg-[#bce3c5] text-[#40526c]";
    case "Completed":
      return "bg-[#a2dadb] text-[#40526c]";
    case "In Development":
      return "bg-[#f7c6a3] text-[#40526c]";
    default:
      return "bg-gray-100 text-[#40526c]";
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
      <Card className="overflow-hidden h-full transition hover:shadow-lg border border-[#a2dadb] bg-white">
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-[#40526c]">{name}</h3>
            <Badge className={getStatusColor(status)} variant="outline">
              {status}
            </Badge>
          </div>
          <p className="text-[#40526c] text-sm mb-4">
            {truncateText(description, 100)}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-sm font-medium text-[#c8444d]">{formatCurrency(fundingAmount)}</span>
              <span className="text-xs text-[#40526c] ml-1">funding</span>
            </div>
            <Link 
              to={`/projects/${id}`}
              className="text-[#c8444d] hover:text-[#a03841] text-sm font-medium"
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
