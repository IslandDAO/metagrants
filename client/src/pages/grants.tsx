import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search, ExternalLink, ChevronDown } from "lucide-react";
import { grantProjects, GrantProject } from "@/data/grantProjects";

const GrantCard = ({ project }: { project: GrantProject }) => {
  const navigate = useNavigate();
  
  const handleCardClick = (e: React.MouseEvent) => {
    // Only navigate if the click was not on the website link or details link
    if (!(e.target as HTMLElement).closest('a')) {
      navigate(`/grants/${project.slug}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
    >
      <Card 
        className="overflow-hidden h-full card-gradient card-hover neon-glow border border-[#3c4759]/80 hover:border-[#3b82f6]/60 cursor-pointer transition-all duration-300"
        onClick={handleCardClick}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-[#f1f5fb]">{project.name}</h3>
            <Badge 
              className={project.tech === "CORE" 
                ? "bg-[#10b981] text-[#f1f5fb]" 
                : "bg-[#3b82f6] text-[#f1f5fb]"
              } 
              variant="outline"
            >
              {project.tech}
            </Badge>
          </div>
          <div className="mb-3">
            <Badge className="bg-[#2c374b] text-[#b5bfcc]">{project.sector}</Badge>
          </div>
          <p className="text-[#b5bfcc] text-sm mb-4">
            {project.summary}
          </p>
          <div className="border-t border-[#3c4759] pt-3 mt-auto">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium text-[#f1f5fb]">
                    ${project.totalUsd.toLocaleString()}
                  </div>
                  <div className="flex gap-2 text-xs text-[#8896b0]">
                    <span>${project.usdc.toLocaleString()} USDC</span>
                    <span>+{project.mplx.toLocaleString()} MPLX*</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {project.links?.website && (
                    <a 
                      href={project.links.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#b5bfcc] hover:text-[#f97316] transition-colors animate-glow-pulse"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} className="hover:scale-110 transition-transform" />
                    </a>
                  )}
                  <Link 
                    to={`/grants/${project.slug}`}
                    className="text-[#f97316] hover:text-[#fb923c] text-sm font-medium transition-colors animate-glow-pulse flex items-center gap-1 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Details <span className="text-xs">→</span>
                  </Link>
                </div>
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
  const [techDropdownOpen, setTechDropdownOpen] = useState(false);
  const [sectorDropdownOpen, setSectorDropdownOpen] = useState(false);
  
  // Get all unique sectors for the filter dropdown
  const sectors = Array.from(new Set(grantProjects.map((grant: GrantProject) => grant.sector)));
  
  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Close tech dropdown if click is outside
      if (!target.closest('.tech-dropdown-container') && techDropdownOpen) {
        setTechDropdownOpen(false);
      }
      
      // Close sector dropdown if click is outside
      if (!target.closest('.sector-dropdown-container') && sectorDropdownOpen) {
        setSectorDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [techDropdownOpen, sectorDropdownOpen]);
  
  // State for filtered grants
  const [filteredGrants, setFilteredGrants] = useState<GrantProject[]>(grantProjects);
  
  // Update filtered grants when filters change
  useEffect(() => {
    const filtered = grantProjects.filter((grant: GrantProject) => {
      const matchesSearch = 
        searchTerm === "" || 
        grant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grant.summary.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTech = techFilter === "all" || grant.tech === techFilter;
      const matchesSector = sectorFilter === "all" || grant.sector === sectorFilter;
      
      return matchesSearch && matchesTech && matchesSector;
    });
    
    setFilteredGrants(filtered);
  }, [searchTerm, techFilter, sectorFilter]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <motion.h1 
          className="text-3xl font-bold mb-2 text-gradient"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          MetaplexDAO Grants — Cohort 1
        </motion.h1>
        <motion.p 
          className="text-[#b5bfcc]"
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
        className="w-full"
      >
        <Card className="mb-6 border-[#3c4759] card-gradient neon-glow w-full">
          <CardContent className="pt-6 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#b5bfcc] animate-glow-pulse" size={18} />
                <Input
                  placeholder="Search projects..."
                  className="pl-10 bg-[#2c374b] border-[#3c4759] text-[#f1f5fb] placeholder:text-[#8896b0] w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="w-full relative tech-dropdown-container">
                <div 
                  className="flex h-10 w-full items-center justify-between rounded-md border border-[#3c4759] bg-[#2c374b] px-3 py-2 text-sm text-[#f1f5fb] cursor-pointer"
                  onClick={() => setTechDropdownOpen(!techDropdownOpen)}
                >
                  <span>{techFilter === 'all' ? 'All Tech' : techFilter === 'CORE' ? 'Core' : '404'}</span>
                  <ChevronDown className="h-4 w-4 text-[#8896b0]" />
                </div>
                {techDropdownOpen && (
                  <div 
                    className="absolute z-50 w-full mt-1 bg-[#1c2431] border border-[#3c4759] rounded-md shadow-lg p-1"
                  >
                    <div 
                      className={`px-3 py-2 text-[#f1f5fb] hover:bg-[#2c374b] cursor-pointer rounded-sm ${techFilter === 'all' ? 'bg-[#3b82f650]' : ''}`}
                      onClick={() => {
                        setTechFilter('all');
                        setTechDropdownOpen(false);
                      }}
                    >
                      All Tech
                    </div>
                    <div 
                      className={`px-3 py-2 text-[#f1f5fb] hover:bg-[#2c374b] cursor-pointer rounded-sm ${techFilter === 'CORE' ? 'bg-[#3b82f650]' : ''}`}
                      onClick={() => {
                        setTechFilter('CORE');
                        setTechDropdownOpen(false);
                      }}
                    >
                      Core
                    </div>
                    <div 
                      className={`px-3 py-2 text-[#f1f5fb] hover:bg-[#2c374b] cursor-pointer rounded-sm ${techFilter === '404' ? 'bg-[#3b82f650]' : ''}`}
                      onClick={() => {
                        setTechFilter('404');
                        setTechDropdownOpen(false);
                      }}
                    >
                      404
                    </div>
                  </div>
                )}
              </div>
              
              <div className="w-full relative sector-dropdown-container">
                <div 
                  className="flex h-10 w-full items-center justify-between rounded-md border border-[#3c4759] bg-[#2c374b] px-3 py-2 text-sm text-[#f1f5fb] cursor-pointer"
                  onClick={() => setSectorDropdownOpen(!sectorDropdownOpen)}
                >
                  <span>{sectorFilter === 'all' ? 'All Sectors' : sectorFilter}</span>
                  <ChevronDown className="h-4 w-4 text-[#8896b0]" />
                </div>
                {sectorDropdownOpen && (
                  <div 
                    className="absolute z-50 w-full mt-1 bg-[#1c2431] border border-[#3c4759] rounded-md shadow-lg p-1 max-h-60 overflow-y-auto"
                  >
                    <div 
                      className={`px-3 py-2 text-[#f1f5fb] hover:bg-[#2c374b] cursor-pointer rounded-sm ${sectorFilter === 'all' ? 'bg-[#3b82f650]' : ''}`}
                      onClick={() => {
                        setSectorFilter('all');
                        setSectorDropdownOpen(false);
                      }}
                    >
                      All Sectors
                    </div>
                    {sectors.map(sector => (
                      <div 
                        key={sector}
                        className={`px-3 py-2 text-[#f1f5fb] hover:bg-[#2c374b] cursor-pointer rounded-sm ${sectorFilter === sector ? 'bg-[#3b82f650]' : ''}`}
                        onClick={() => {
                          setSectorFilter(sector);
                          setSectorDropdownOpen(false);
                        }}
                      >
                        {sector}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Grant Count */}
      <motion.div
        className="mb-4 text-sm text-[#8896b0]"
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
          <Card className="border-[#3c4759] bg-[#1c2431]">
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <Filter className="h-12 w-12 text-[#3c4759] mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#f1f5fb]">No grants found</h3>
              <p className="text-[#8896b0]">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      {/* Footnote */}
      {filteredGrants.length > 0 && (
        <motion.div
          className="mt-8 text-right text-xs text-[#8896b0]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          * MPLX token value calculated at $0.1 USDC per MPLX
        </motion.div>
      )}
    </div>
  );
};

export default Grants;