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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.slug}
              className="bg-[#1a2235] border border-[#374151] rounded-xl overflow-hidden cursor-pointer 
                        hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300"
              onClick={(e) => handleCardClick(project.slug, e)}
              style={{
                background: 'linear-gradient(180deg, #1a2235 0%, #1a1d2c 100%)',
                transform: 'translateZ(0)',
                position: 'relative'
              }}
            >
              {/* Subtle accent color at top of card */}
              <div 
                className={`h-1 w-full ${project.tech === "CORE" ? "bg-gradient-to-r from-[#0f9668] to-transparent" : "bg-gradient-to-r from-[#2563eb] to-transparent"}`}
              ></div>
              
              <div className="p-6">
                <div className="flex justify-between mb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">{project.name}</h3>
                  <span className={
                    project.tech === "CORE" 
                      ? "text-[#34d399] text-xs font-medium inline-flex items-center gap-1 after:content-[''] after:w-1.5 after:h-1.5 after:rounded-full after:bg-[#34d399]"
                      : "text-[#60a5fa] text-xs font-medium inline-flex items-center gap-1 after:content-[''] after:w-1.5 after:h-1.5 after:rounded-full after:bg-[#60a5fa]"
                  }>
                    {project.tech}
                  </span>
                </div>
                
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="text-[#9ca3af] text-xs font-medium bg-[#2a2f3a] px-2 py-1 rounded-full">
                    {project.sector}
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm mb-5 line-clamp-3">
                  {project.summary}
                </p>
                
                <div className="border-t border-[#2d3748] pt-4 mt-auto">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white text-sm font-semibold">
                        ${project.totalUsd.toLocaleString()}
                      </div>
                      <div className="text-gray-500 text-xs">
                        ${project.usdc.toLocaleString()} USDC + {project.mplx.toLocaleString()} MPLX
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      {project.links?.website && (
                        <a
                          href={project.links.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Website
                        </a>
                      )}
                      <Link
                        to={`/grants/${project.slug}`}
                        className="text-blue-400 hover:text-blue-300 font-medium transition-colors text-sm"
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
        <div className="bg-[#1a2235] border border-[#374151] p-8 rounded-xl text-center shadow-md">
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <p className="text-xl text-white mb-2">No matching projects found</p>
            <p className="text-gray-400">Try adjusting your search criteria or filters</p>
          </div>
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