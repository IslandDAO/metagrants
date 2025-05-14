import React, { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, CartesianGrid, RadialBarChart, RadialBar,
  LineChart, Line, Area, AreaChart, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, Sector, ScatterChart, Scatter, ZAxis
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { grantProjects } from "@/data/grantProjects";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingUp, Award, ZapIcon } from "lucide-react";

const ChartsPage = () => {
  // Calculate Tech Breakdown (Core vs 404)
  const coreProjects = grantProjects.filter(p => p.tech === "CORE");
  const m404Projects = grantProjects.filter(p => p.tech === "404");
  
  const applicationData = [
    { name: "Metaplex Core", value: coreProjects.length, percent: Math.round((coreProjects.length / grantProjects.length) * 100) },
    { name: "MPL 404", value: m404Projects.length, percent: Math.round((m404Projects.length / grantProjects.length) * 100) }
  ];

  // Calculate Funding by Sector
  const sectors = Array.from(new Set(grantProjects.map(p => p.sector)));
  const sectorFundingData = sectors.map(sector => {
    const projectsInSector = grantProjects.filter(p => p.sector === sector);
    const totalValue = projectsInSector.reduce((sum, p) => sum + p.totalUsd, 0);
    return { 
      name: sector, 
      value: totalValue,
      projects: projectsInSector.length
    };
  }).sort((a, b) => b.value - a.value);

  // Calculate USDC and MPLX distributions
  const totalUsdc = grantProjects.reduce((sum, p) => sum + p.usdc, 0);
  const totalMplx = grantProjects.reduce((sum, p) => sum + p.mplx, 0);
  
  // Assuming MPLX token value is $0.1 per token based on the data
  const mplxRate = 0.1;
  const mplxUsdValue = totalMplx * mplxRate;
  
  // Estimated remaining MPLX tokens for future distribution
  const remainingMplxValue = 410000 * mplxRate; // Approximately $41,000 worth
  
  const fundingDistributionData = [
    { name: "USDC Distributed", value: totalUsdc, fill: "#2775CA" }, // USDC blue
    { name: "MPLX Distributed", value: mplxUsdValue, fill: "#6366F1" }, // Purple for MPLX
    { name: "MPLX Remaining", value: remainingMplxValue, fill: "#A5B4FC" } // Lighter purple for remaining
  ];

  // Distribution by Technology
  const techDistributionData = [
    { 
      name: "Core", 
      usdcValue: coreProjects.reduce((sum, p) => sum + p.usdc, 0),
      mplxValue: coreProjects.reduce((sum, p) => sum + p.mplx, 0) * mplxRate,
      projectCount: coreProjects.length
    },
    { 
      name: "404", 
      usdcValue: m404Projects.reduce((sum, p) => sum + p.usdc, 0),
      mplxValue: m404Projects.reduce((sum, p) => sum + p.mplx, 0) * mplxRate,
      projectCount: m404Projects.length
    }
  ];

  // Notable vs Regular Projects
  const notableProjects = grantProjects.filter(p => p.notable);
  const regularProjects = grantProjects.filter(p => !p.notable);
  
  const projectTypeData = [
    { 
      name: "Notable", 
      value: notableProjects.reduce((sum, p) => sum + p.totalUsd, 0),
      count: notableProjects.length,
      avgFunding: notableProjects.reduce((sum, p) => sum + p.totalUsd, 0) / notableProjects.length,
      fill: "#6366F1"
    },
    { 
      name: "Regular", 
      value: regularProjects.reduce((sum, p) => sum + p.totalUsd, 0),
      count: regularProjects.length,
      avgFunding: regularProjects.reduce((sum, p) => sum + p.totalUsd, 0) / regularProjects.length,
      fill: "#A5B4FC"
    }
  ];

  // Project scatter data (funding amount vs projects count by sector)
  const scatterData = sectors.map(sector => {
    const sectorProjects = grantProjects.filter(p => p.sector === sector);
    const totalFunding = sectorProjects.reduce((sum, p) => sum + p.totalUsd, 0);
    return {
      name: sector,
      x: sectorProjects.length,
      y: totalFunding,
      z: totalFunding / sectorProjects.length
    };
  });

  // Map projects by total funding amount for visualization
  const projectsByFunding = grantProjects.map(p => ({
    name: p.name,
    totalUsd: p.totalUsd,
    tech: p.tech,
    sector: p.sector
  })).sort((a, b) => b.totalUsd - a.totalUsd).slice(0, 8); // Top 8 projects

  // Animation state
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // Animate pie chart sections
  useEffect(() => {
    if (!isAnimating) return;
    
    const timer = setTimeout(() => {
      setActiveIndex((prevIndex) => 
        prevIndex === sectorFundingData.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [activeIndex, isAnimating, sectorFundingData.length]);

  // Render active shape with animation for pie chart
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  
    return (
      <g>
        <text x={cx} y={cy - 20} dy={8} textAnchor="middle" fill="#333" fontSize={16} fontWeight="bold">
          {payload.name}
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="#666">
          ${value.toLocaleString()}
        </text>
        <text x={cx} y={cy + 30} textAnchor="middle" fill="#999">
          ({(percent * 100).toFixed(0)}%)
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8} // Make active segment larger
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          className="filter drop-shadow-md"
        />
      </g>
    );
  };

  // Custom gradient colors
  const gradientColors = {
    core: {
      start: '#6366F1', // Purple
      end: '#A5B4FC'
    },
    m404: {
      start: '#10B981', // Emerald
      end: '#6EE7B7'
    },
    funding: {
      start: '#3B82F6', // Blue
      end: '#93C5FD'
    }
  };

  // Custom tooltip for USD values
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1c2431] p-4 border border-[#364156] shadow-lg rounded-md text-white">
          <p className="font-bold text-lg">{label || payload[0].name}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`tooltip-${index}`} style={{ color: entry.color || '#fff' }}>
              {entry.name}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto py-10 px-4 bg-[#121820] text-white">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          MetaplexDAO Cohort 1 Analytics
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Interactive visualizations of data from the first cohort of the MetaplexDAO Grant Program.
        </p>
      </div>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="bg-gradient-to-br from-[#1c2431] to-[#171f2b] border-[#364156]">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="rounded-full bg-blue-500/20 p-4 mb-4">
              <Award size={28} className="text-blue-400" />
            </div>
            <p className="text-lg text-gray-300 mb-1">Total Grants</p>
            <h3 className="text-3xl font-bold">{grantProjects.length}</h3>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-[#1c2431] to-[#171f2b] border-[#364156]">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="rounded-full bg-purple-500/20 p-4 mb-4">
              <TrendingUp size={28} className="text-purple-400" />
            </div>
            <p className="text-lg text-gray-300 mb-1">Total Value</p>
            <h3 className="text-3xl font-bold">${(totalUsdc + mplxUsdValue).toLocaleString()}</h3>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-[#1c2431] to-[#171f2b] border-[#364156]">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="rounded-full bg-emerald-500/20 p-4 mb-4">
              <Lightbulb size={28} className="text-emerald-400" />
            </div>
            <p className="text-lg text-gray-300 mb-1">USDC Distributed</p>
            <h3 className="text-3xl font-bold">${totalUsdc.toLocaleString()}</h3>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-[#1c2431] to-[#171f2b] border-[#364156]">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="rounded-full bg-amber-500/20 p-4 mb-4">
              <ZapIcon size={28} className="text-amber-400" />
            </div>
            <p className="text-lg text-gray-300 mb-1">MPLX Value</p>
            <h3 className="text-3xl font-bold">${mplxUsdValue.toLocaleString()}</h3>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-12">
        <TabsList className="mb-8 bg-[#1c2431] p-1 space-x-2">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
            Overview
          </TabsTrigger>
          <TabsTrigger value="byTech" className="data-[state=active]:bg-blue-600">
            By Technology
          </TabsTrigger>
          <TabsTrigger value="bySector" className="data-[state=active]:bg-blue-600">
            By Sector
          </TabsTrigger>
          <TabsTrigger value="funding" className="data-[state=active]:bg-blue-600">
            Funding Details
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Application Breakdown - Animated Pie */}
            <Card className="bg-[#1c2431] border-[#364156]">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl text-white">Application Breakdown</CardTitle>
                    <CardDescription className="text-gray-300">Core vs 404 Technology Grants</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-600">
                    {grantProjects.length} Projects
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex justify-center">
                  <ResponsiveContainer width="100%" height={340}>
                    <PieChart>
                      <defs>
                        <linearGradient id="coreGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={gradientColors.core.start} />
                          <stop offset="100%" stopColor={gradientColors.core.end} />
                        </linearGradient>
                        <linearGradient id="m404Gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={gradientColors.m404.start} />
                          <stop offset="100%" stopColor={gradientColors.m404.end} />
                        </linearGradient>
                      </defs>
                      <Pie
                        data={applicationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={{ stroke: '#6366F1', strokeWidth: 1 }}
                      >
                        <Cell fill="url(#coreGradient)" stroke="#6366F1" strokeWidth={2} />
                        <Cell fill="url(#m404Gradient)" stroke="#10B981" strokeWidth={2} />
                      </Pie>
                      <Tooltip formatter={(value, name, props) => [`${value} Projects (${props.payload.percent}%)`, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex justify-center mt-4 space-x-8">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Core Projects</p>
                    <p className="text-2xl font-bold text-blue-400">{coreProjects.length}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">404 Projects</p>
                    <p className="text-2xl font-bold text-emerald-400">{m404Projects.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Funding Distribution Chart - Radial */}
            <Card className="bg-[#1c2431] border-[#364156]">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl text-white">Funding Distribution</CardTitle>
                    <CardDescription className="text-gray-300">USDC and MPLX allocations</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-600">
                    Program Budget: ${(totalUsdc + mplxUsdValue + remainingMplxValue).toLocaleString()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 gap-6">
                  {/* Custom visually clear chart */}
                  <div className="relative pt-2">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium text-white">Total Program Allocation</h3>
                      <p className="text-sm text-gray-400">$200,000 total value</p>
                    </div>
                    
                    <div className="h-16 bg-[#131a25] rounded-lg overflow-hidden flex">
                      <div 
                        className="bg-gradient-to-r from-[#2775CA] to-[#2775CA]/80 h-full flex items-center justify-center"
                        style={{ width: `${(totalUsdc / (totalUsdc + mplxUsdValue + remainingMplxValue)) * 100}%` }}
                      >
                        <span className="text-white font-medium text-sm px-2">
                          USDC
                        </span>
                      </div>
                      <div 
                        className="bg-gradient-to-r from-[#6366F1]/80 to-[#6366F1] h-full flex items-center justify-center"
                        style={{ width: `${(mplxUsdValue / (totalUsdc + mplxUsdValue + remainingMplxValue)) * 100}%` }}
                      >
                        <span className="text-white font-medium text-sm px-2">
                          MPLX Used
                        </span>
                      </div>
                      <div 
                        className="bg-gradient-to-r from-[#A5B4FC]/80 to-[#A5B4FC] h-full flex items-center justify-center"
                        style={{ width: `${(remainingMplxValue / (totalUsdc + mplxUsdValue + remainingMplxValue)) * 100}%` }}
                      >
                        <span className="text-white font-medium text-sm px-2">
                          MPLX Remaining
                        </span>
                      </div>
                    </div>
                    
                    {/* Stats below chart */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="bg-[#171f2b] p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 rounded-full bg-[#2775CA] mr-2"></div>
                          <h4 className="font-medium">USDC Distributed</h4>
                        </div>
                        <p className="text-2xl font-bold">${totalUsdc.toLocaleString()}</p>
                        <p className="text-xs text-gray-400 mt-1">Allocated to 12 Projects</p>
                      </div>
                      
                      <div className="bg-[#171f2b] p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 rounded-full bg-[#6366F1] mr-2"></div>
                          <h4 className="font-medium">MPLX Distributed</h4>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <p className="text-2xl font-bold">{totalMplx.toLocaleString()}</p>
                          <p className="text-sm text-gray-400">tokens</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">≈ ${mplxUsdValue.toLocaleString()} Value</p>
                      </div>
                      
                      <div className="bg-[#171f2b] p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 rounded-full bg-[#A5B4FC] mr-2"></div>
                          <h4 className="font-medium">MPLX Remaining</h4>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <p className="text-2xl font-bold">410,000</p>
                          <p className="text-sm text-gray-400">tokens</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">≈ ${remainingMplxValue.toLocaleString()} Value</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional info from PDF */}
                  <div className="bg-[#171f2b] p-5 rounded-lg mt-4">
                    <h3 className="text-lg font-medium mb-3 text-white">Program Budget Allocation</h3>
                    <ul className="space-y-2 pl-2">
                      <li className="flex items-center gap-2 text-gray-300">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span>Initial allocation: $100,000 USDC and 1,000,000 MPLX tokens</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-300">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span>Average USDC grant size: $8,250</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-300">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span>Overall project acceptance rate: 15.8% (12 of 76 applications)</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-300">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span>Average total grant value: $13,167 per project</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="bySector" className="mt-0">
          <Card className="bg-[#1c2431] border-[#364156]">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center flex-wrap">
                <div>
                  <CardTitle className="text-xl text-white">Funding by Sector</CardTitle>
                  <CardDescription className="text-gray-300">Interactive sector funding breakdown</CardDescription>
                </div>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-600">
                  {sectors.length} Sectors
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div 
                className="flex flex-col items-center"
                onMouseEnter={() => setIsAnimating(false)}
                onMouseLeave={() => setIsAnimating(true)}
              >
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <defs>
                      {sectorFundingData.map((entry, index) => (
                        <linearGradient key={`gradient-${index}`} id={`sectorGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor={`hsl(${index * 50}, 70%, 50%)`} />
                          <stop offset="100%" stopColor={`hsl(${index * 50}, 70%, 70%)`} />
                        </linearGradient>
                      ))}
                    </defs>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={sectorFundingData}
                      cx="50%"
                      cy="50%"
                      innerRadius={90}
                      outerRadius={140}
                      paddingAngle={3}
                      dataKey="value"
                      onMouseEnter={(_, index) => {
                        setActiveIndex(index);
                        setIsAnimating(false);
                      }}
                      onMouseLeave={() => setIsAnimating(true)}
                    >
                      {sectorFundingData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={`url(#sectorGradient${index})`} 
                          stroke="#1c2431"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Funding']}
                      contentStyle={{ backgroundColor: '#1c2431', border: '1px solid #364156', color: 'white' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 w-full">
                  {sectorFundingData.map((sector, index) => (
                    <div 
                      key={`sector-${index}`} 
                      className={`p-4 rounded-lg transition-all ${activeIndex === index ? 'bg-blue-900/30 ring-2 ring-blue-500' : 'bg-[#171f2b]'}`}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: `hsl(${index * 50}, 70%, 60%)` }}
                        />
                        <h5 className="font-medium truncate">{sector.name}</h5>
                      </div>
                      <div className="mt-2">
                        <p className="text-xl font-bold">${sector.value.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">{sector.projects} project{sector.projects !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="byTech" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tech Comparison Chart */}
            <Card className="bg-[#1c2431] border-[#364156]">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-white">Tech Funding Comparison</CardTitle>
                <CardDescription className="text-gray-300">Core vs 404 Funding</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={techDistributionData}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                  >
                    <defs>
                      <linearGradient id="usdcGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#2775CA" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#2775CA" stopOpacity={1} />
                      </linearGradient>
                      <linearGradient id="mplxGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#6366F1" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#6366F1" stopOpacity={1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#364156" />
                    <XAxis type="number" tickFormatter={(value) => `$${value.toLocaleString()}`} stroke="#9CA3AF" />
                    <YAxis type="category" dataKey="name" stroke="#9CA3AF" />
                    <Tooltip 
                      content={<CustomTooltip />}
                      cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }} 
                    />
                    <Legend />
                    <Bar 
                      dataKey="usdcValue" 
                      name="USDC" 
                      stackId="a" 
                      fill="url(#usdcGradient)" 
                      radius={[0, 8, 8, 0]}
                    />
                    <Bar 
                      dataKey="mplxValue" 
                      name="MPLX Value" 
                      stackId="a" 
                      fill="url(#mplxGradient)" 
                      radius={[0, 8, 8, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            {/* Notable vs Regular Projects */}
            <Card className="bg-[#1c2431] border-[#364156]">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-white">Project Types</CardTitle>
                <CardDescription className="text-gray-300">Notable vs Regular Projects</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={350}>
                  <ScatterChart
                    margin={{ top: 10, right: 30, left: 10, bottom: 40 }}
                  >
                    <defs>
                      <radialGradient id="scatterGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#6366F1" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#6366F1" stopOpacity={0.4} />
                      </radialGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#364156" />
                    <XAxis 
                      type="number" 
                      dataKey="count" 
                      name="Projects" 
                      stroke="#9CA3AF"
                      label={{ value: 'Number of Projects', position: 'bottom', fill: '#9CA3AF' }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="value" 
                      name="Funding" 
                      stroke="#9CA3AF"
                      tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                      label={{ value: 'Total Funding', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
                    />
                    <ZAxis 
                      type="number" 
                      dataKey="avgFunding" 
                      range={[60, 200]} 
                      name="Avg Funding" 
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      formatter={(value, name) => {
                        if (name === 'Funding') return [`$${value.toLocaleString()}`, name];
                        if (name === 'Projects') return [value, name];
                        if (name === 'Avg Funding') return [`$${value.toLocaleString()}`, 'Avg Per Project'];
                        return [value, name];
                      }}
                      contentStyle={{ backgroundColor: '#1c2431', border: '1px solid #364156', color: 'white' }}
                    />
                    <Scatter 
                      name="Projects" 
                      data={projectTypeData} 
                      fill="url(#scatterGradient)"
                      shape={(props) => {
                        const { cx, cy, fill, r } = props;
                        return (
                          <g>
                            <circle cx={cx} cy={cy} r={r} fill={fill} />
                            <text x={cx} y={cy} textAnchor="middle" fill="#fff" fontSize={12} dy=".3em">
                              {props.payload.name}
                            </text>
                          </g>
                        );
                      }}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="funding" className="mt-0">
          <Card className="bg-[#1c2431] border-[#364156]">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-white">Project Funding Distribution</CardTitle>
              <CardDescription className="text-gray-300">Top funded projects by technology</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={projectsByFunding}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  barGap={0}
                  barCategoryGap="15%"
                >
                  <defs>
                    <linearGradient id="coreBarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#6366F1" stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient id="m404BarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#364156" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF"
                    angle={-45}
                    textAnchor="end"
                    tick={{ fontSize: 12 }}
                    interval={0}
                    height={60}
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`} 
                    stroke="#9CA3AF"
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Funding']}
                    contentStyle={{ backgroundColor: '#1c2431', border: '1px solid #364156', color: 'white' }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="totalUsd" 
                    name="Total Funding" 
                    radius={[8, 8, 0, 0]}
                    fill={(entry) => entry.tech === "CORE" ? "url(#coreBarGradient)" : "url(#m404BarGradient)"}
                    label={{
                      position: 'top',
                      formatter: (value) => `$${(value/1000).toFixed(0)}k`,
                      fontSize: 11,
                      fill: '#9CA3AF'
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Key Insights section with better contrast */}
      <Card className="bg-[#1c2431] border-[#364156]">
        <CardHeader>
          <CardTitle className="text-xl text-white">Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4 text-gray-200">
            <li className="flex items-start gap-3">
              <div className="shrink-0 rounded-full bg-blue-500/20 p-1">
                <ZapIcon size={16} className="text-blue-400" />
              </div>
              <span>
                The majority of grants ({Math.round((coreProjects.length / grantProjects.length) * 100)}%) were for Metaplex Core technology with {coreProjects.length} projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="shrink-0 rounded-full bg-purple-500/20 p-1">
                <ZapIcon size={16} className="text-purple-400" />
              </div>
              <span>
                {sectorFundingData[0].name} and {sectorFundingData[1].name} received the highest funding allocation, representing nearly {Math.round(((sectorFundingData[0].value + sectorFundingData[1].value) / (totalUsdc + mplxUsdValue)) * 100)}% of total funding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="shrink-0 rounded-full bg-emerald-500/20 p-1">
                <ZapIcon size={16} className="text-emerald-400" />
              </div>
              <span>
                A total of ${(totalUsdc + mplxUsdValue).toLocaleString()} in value was distributed (${totalUsdc.toLocaleString()} in USDC and ${mplxUsdValue.toLocaleString()} in MPLX token value).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="shrink-0 rounded-full bg-amber-500/20 p-1">
                <ZapIcon size={16} className="text-amber-400" />
              </div>
              <span>
                There is approximately ${remainingMplxValue.toLocaleString()} in MPLX tokens remaining for future distribution.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsPage;