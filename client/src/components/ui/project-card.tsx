import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { formatCurrency, truncateText } from "@/lib/utils";
import { Link } from "wouter";

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
      return "bg-green-100 text-green-800";
    case "Completed":
      return "bg-blue-100 text-blue-800";
    case "In Development":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
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
      <Card className="overflow-hidden h-full transition hover:shadow-lg">
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-secondary">{name}</h3>
            <Badge className={getStatusColor(status)} variant="outline">
              {status}
            </Badge>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            {truncateText(description, 100)}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-900">{formatCurrency(fundingAmount)}</span>
              <span className="text-xs text-gray-500 ml-1">funding</span>
            </div>
            <Link 
              href={`/projects/${id}`}
              className="text-secondary hover:text-secondary-light text-sm font-medium"
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
