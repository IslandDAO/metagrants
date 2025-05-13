import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search, ExternalLink } from "lucide-react";
import { grantProjects } from "@/data/grants";

// Define the type for grant projects
interface GrantProject {
  id: string;
  slug: string;
  name: string;
  sector: string;
  tech: "CORE" | "404";
  summary: string;
  description: string;
  totalUsd: number;
  usdc: number;
  mplx: number;
  notable: boolean;
  links?: {
    website?: string;
    github?: string;
    x?: string;
  };
}

const GrantCard = ({ project }: { project: GrantProject }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
    >
      <Card className="overflow-hidden h-full transition hover:shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-secondary">{project.name}</h3>
            <Badge 
              className={project.tech === "CORE" 
                ? "bg-green-100 text-green-800" 
                : "bg-blue-100 text-blue-800"
              } 
              variant="outline"
            >
              {project.tech}
            </Badge>
          </div>
          <div className="mb-3">
            <Badge className="bg-gray-100 text-gray-800">{project.sector}</Badge>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            {project.summary}
          </p>
          <div className="border-t pt-3 mt-auto">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium text-gray-900">
                ${project.totalUsd.toLocaleString()}
              </div>
              <div className="flex space-x-2">
                {project.links?.website && (
                  <a 
                    href={project.links.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-secondary"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
                <Link 
                  to={`/grants/${project.slug}`}
                  className="text-secondary hover:text-secondary-light text-sm font-medium"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Grants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [techFilter, setTechFilter] = useState("all");
  const [sectorFilter, setSectorFilter] = useState("all");
  
  // Get all unique sectors for the filter dropdown
  const sectors = Array.from(new Set(grantProjects.map((grant: GrantProject) => grant.sector)));
  
  // Filter grants based on search term, tech stack, and sector
  const filteredGrants = grantProjects.filter((grant: GrantProject) => {
    const matchesSearch = grant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           grant.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTech = techFilter === "all" || grant.tech === techFilter;
    const matchesSector = sectorFilter === "all" || grant.sector === sectorFilter;
    
    return matchesSearch && matchesTech && matchesSector;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <motion.h1 
          className="text-3xl font-bold text-secondary mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          MetaplexDAO Grants — Cohort 1
        </motion.h1>
        <motion.p 
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Showcasing projects funded to grow the Metaplex protocol
        </motion.p>
      </div>

      {/* Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search projects..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={techFilter} onValueChange={setTechFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Tech" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tech</SelectItem>
                  <SelectItem value="CORE">Core</SelectItem>
                  <SelectItem value="404">404</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  {sectors.map((sector: string) => (
                    <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Grant Count */}
      <motion.div
        className="mb-4 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Showing {filteredGrants.length} of {grantProjects.length} grants
      </motion.div>

      {/* Grants Grid */}
      {filteredGrants.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {filteredGrants.map((grant: GrantProject) => (
            <GrantCard key={grant.slug} project={grant} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <Filter className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No grants found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default Grants;