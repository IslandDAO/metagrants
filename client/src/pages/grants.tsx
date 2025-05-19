import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { grantProjects, GrantProject } from "@/data/grantProjects";

function GrantsList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [techFilter, setTechFilter] = useState('all');
  const [sectorFilter, setSectorFilter] = useState('all');

  // Get unique sectors for dropdown
  const uniqueSectors = Array.from(
    new Set(grantProjects.map((project) => project.sector))
  );

  // Filter projects based on search term and filters
  const filteredProjects = grantProjects.filter((project) => {
    // Search filter
    const matchesSearch =
      searchTerm === '' ||
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchTerm.toLowerCase());

    // Tech filter
    const matchesTech = techFilter === 'all' || project.tech === techFilter;

    // Sector filter
    const matchesSector = sectorFilter === 'all' || project.sector === sectorFilter;

    return matchesSearch && matchesTech && matchesSector;
  });

  const handleCardClick = (slug: string, e: React.MouseEvent) => {
    // Only navigate if the click wasn't on a link
    if (!(e.target as HTMLElement).closest('a')) {
      navigate(`/grants/${slug}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-4">MetaplexDAO Grants - Cohort 1</h1>
      <p className="text-gray-400 mb-8">Explore projects funded by MetaplexDAO</p>

      {/* Filter Section */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search Input */}
            <div className="flex-1 min-w-[280px]">
              <label htmlFor="search" className="block mb-2 text-sm text-gray-300">
                Search Projects
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by name or description..."
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Tech Filter */}
            <div className="w-full sm:w-auto">
              <label htmlFor="tech" className="block mb-2 text-sm text-gray-300">
                Technology
              </label>
              <select
                id="tech"
                className="w-full sm:w-40 p-2 bg-gray-700 border border-gray-600 rounded text-white"
                value={techFilter}
                onChange={(e) => setTechFilter(e.target.value)}
              >
                <option value="all">All Tech</option>
                <option value="CORE">Core</option>
                <option value="404">404</option>
              </select>
            </div>

            {/* Sector Filter */}
            <div className="w-full sm:w-auto">
              <label htmlFor="sector" className="block mb-2 text-sm text-gray-300">
                Sector
              </label>
              <select
                id="sector"
                className="w-full sm:w-64 p-2 bg-gray-700 border border-gray-600 rounded text-white"
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
              >
                <option value="all">All Sectors</option>
                {uniqueSectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Results Counter */}
        <div className="text-sm text-gray-400">
          Showing {filteredProjects.length} of {grantProjects.length} projects
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.slug}
              className="overflow-hidden h-full card-gradient card-hover neon-glow border border-[#3c4759]/80 hover:border-[#3b82f6]/60 cursor-pointer transition-all duration-300 rounded-lg"
              onClick={(e) => handleCardClick(project.slug, e)}
            >
              <div className="p-6">
                <div className="flex justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{project.name}</h3>
                  <span 
                    className={project.tech === "CORE" 
                      ? "bg-[#10b981] text-white text-xs px-3 py-1 rounded-md" 
                      : "bg-[#3b82f6] text-white text-xs px-3 py-1 rounded-md"
                    }
                  >
                    {project.tech}
                  </span>
                </div>
                
                <div className="mb-3">
                  <span className="bg-[#2c374b] text-[#b5bfcc] text-xs px-2 py-1 rounded-full">
                    {project.sector}
                  </span>
                </div>
                
                <p className="text-[#b5bfcc] text-sm mb-4">
                  {project.summary}
                </p>
                
                <div className="border-t border-[#3c4759] pt-3 mt-auto">
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:scale-110 transition-transform"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
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
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 p-8 rounded-lg text-center">
          <p className="text-xl text-white mb-2">No matching projects found</p>
          <p className="text-gray-400">Try adjusting your search criteria</p>
        </div>
      )}
      
      {/* Footnote */}
      <div className="mt-8 text-right text-xs text-gray-500">
        * MPLX value calculated at approximately $0.1 USDC per MPLX
      </div>
    </div>
  );
}

export default GrantsList;