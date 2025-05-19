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
              className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500 cursor-pointer"
              onClick={(e) => handleCardClick(project.slug, e)}
            >
              <div className="p-5">
                <div className="flex justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{project.name}</h3>
                  <span className={
                    project.tech === "CORE" 
                      ? "bg-[#10b981] text-[#f1f5fb] text-[10px] font-medium px-1.5 leading-none py-0.5 rounded inline-flex items-center" 
                      : "bg-[#3b82f6] text-[#f1f5fb] text-[10px] font-medium px-1.5 leading-none py-0.5 rounded inline-flex items-center"
                  }>
                    {project.tech}
                  </span>
                </div>
                
                <div className="mb-3">
                  <span className="bg-[#2c374b] text-[#b5bfcc] text-[10px] font-medium px-1.5 leading-none py-0.5 rounded inline-flex items-center">
                    {project.sector}
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">
                  {project.summary}
                </p>
                
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white text-sm font-medium">
                        ${project.totalUsd.toLocaleString()}
                      </div>
                      <div className="text-gray-500 text-xs">
                        ${project.usdc.toLocaleString()} USDC + {project.mplx.toLocaleString()} MPLX
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {project.links?.website && (
                        <a
                          href={project.links.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Website
                        </a>
                      )}
                      <Link
                        to={`/grants/${project.slug}`}
                        className="text-blue-400 hover:text-blue-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Details →
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