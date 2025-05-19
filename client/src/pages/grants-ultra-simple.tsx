import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { grantProjects, GrantProject } from "@/data/grantProjects";

const Grants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [techFilter, setTechFilter] = useState("all");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [filteredGrants, setFilteredGrants] = useState(grantProjects);
  const navigate = useNavigate();
  
  // Get all unique sectors
  const sectors = Array.from(new Set(grantProjects.map(grant => grant.sector)));
  
  // Update filtered grants when filters change
  useEffect(() => {
    const filtered = grantProjects.filter(grant => {
      // Match search term
      const matchesSearch = 
        searchTerm === "" || 
        grant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grant.summary.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Match tech filter
      const matchesTech = techFilter === "all" || grant.tech === techFilter;
      
      // Match sector filter
      const matchesSector = sectorFilter === "all" || grant.sector === sectorFilter;
      
      return matchesSearch && matchesTech && matchesSector;
    });
    
    setFilteredGrants(filtered);
  }, [searchTerm, techFilter, sectorFilter]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">MetaplexDAO Grants — Cohort 1</h1>
      <p className="text-gray-400 mb-8">Showcasing projects funded to grow the Metaplex protocol</p>

      {/* Simple Filter Controls */}
      <div className="bg-gray-800 p-4 rounded-lg mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Search Input */}
          <div>
            <label htmlFor="search" className="block mb-2 text-sm text-gray-300">Search</label>
            <input
              id="search"
              type="text"
              placeholder="Search projects..."
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Tech Filter */}
          <div>
            <label htmlFor="tech-filter" className="block mb-2 text-sm text-gray-300">Technology</label>
            <select
              id="tech-filter"
              value={techFilter}
              onChange={(e) => setTechFilter(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            >
              <option value="all">All Tech</option>
              <option value="CORE">Core</option>
              <option value="404">404</option>
            </select>
          </div>
          
          {/* Sector Filter */}
          <div>
            <label htmlFor="sector-filter" className="block mb-2 text-sm text-gray-300">Sector</label>
            <select
              id="sector-filter"
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            >
              <option value="all">All Sectors</option>
              {sectors.map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grant Count */}
      <div className="mb-4 text-sm text-gray-400">
        Showing {filteredGrants.length} of {grantProjects.length} grants
      </div>

      {/* Grants Grid */}
      {filteredGrants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGrants.map(grant => (
            <div 
              key={grant.slug} 
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 cursor-pointer"
              onClick={() => navigate(`/grants/${grant.slug}`)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white">{grant.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${grant.tech === "CORE" ? "bg-green-600" : "bg-blue-600"}`}>
                    {grant.tech}
                  </span>
                </div>
                
                <div className="mb-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-gray-700 text-gray-300">
                    {grant.sector}
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">
                  {grant.summary}
                </p>
                
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium text-white">
                        ${grant.totalUsd.toLocaleString()}
                      </div>
                      <div className="flex gap-2 text-xs text-gray-400">
                        <span>${grant.usdc.toLocaleString()} USDC</span>
                        <span>+{grant.mplx.toLocaleString()} MPLX*</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {grant.links?.website && (
                        <a 
                          href={grant.links.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Website
                        </a>
                      )}
                      <Link 
                        to={`/grants/${grant.slug}`}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium hover:underline"
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
        <div className="bg-gray-800 rounded-lg p-12 text-center">
          <h3 className="text-xl font-semibold mb-2 text-white">No grants found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
      
      {/* Footnote */}
      {filteredGrants.length > 0 && (
        <div className="mt-8 text-right text-xs text-gray-400">
          * MPLX token value calculated at $0.1 USDC per MPLX
        </div>
      )}
    </div>
  );
};

export default Grants;