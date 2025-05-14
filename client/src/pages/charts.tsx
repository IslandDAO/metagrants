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

  // Calculate Funding by Sector - using exact values from the PDF document
  // Direct values from document: 
  // Consumer Apps ($52.5K), Gaming ($45K), Creator & NFT Infra ($24.5K), 
  // Social & Identity ($18K), Data & Analytics ($8K)
  
  // Group projects by sector for the tooltip
  const projectsBySector = grantProjects.reduce((acc, project) => {
    if (!acc[project.sector]) {
      acc[project.sector] = [];
    }
    acc[project.sector].push(project.name);
    return acc;
  }, {} as Record<string, string[]>);
  
  const sectorFundingData = [
    { name: "Consumer App", value: 52500, projects: 3, projectList: projectsBySector["Consumer App"] || [] },
    { name: "Gaming", value: 45000, projects: 3, projectList: projectsBySector["Gaming"] || [] },
    { name: "Creator & NFT Infra", value: 24500, projects: 2, projectList: projectsBySector["Creator & NFT Infra"] || [] },
    { name: "Social & Identity", value: 18000, projects: 2, projectList: projectsBySector["Social & Identity"] || [] },
    { name: "Data & Analytics", value: 8000, projects: 1, projectList: projectsBySector["Data & Analytics"] || [] },
    { name: "Creator & Culture", value: 12500, projects: 1, projectList: projectsBySector["Creator & Culture"] || [] }
  ].sort((a, b) => b.value - a.value);
  
  const sectors = sectorFundingData.map(sector => sector.name);

  const totalUsdc = 100000;
  const totalMplx = 590000; // 350,000 to 404 projects + 240,000 to Core projects
  const remainingMplx = 410000;
  
  // Get current MPLX price from API
  const [mplxRate, setMplxRate] = useState(0.1);
  
  useEffect(() => {
    const fetchMplxPrice = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        const mplxStat = data.find(stat => stat.id === 'mplx');
        if (mplxStat) {
          const priceMatch = mplxStat.value.match(/\$([0-9,.]+)/);
          if (priceMatch) {
            const totalValue = parseFloat(priceMatch[1].replace(/,/g, ''));
            setMplxRate(totalValue / 590000);
          }
        }
      } catch (error) {
        console.error('Error fetching MPLX price:', error);
      }
    };
    fetchMplxPrice();
  }, []);

  const mplxUsdValue = totalMplx * mplxRate;
  const remainingMplxValue = remainingMplx * mplxRate;
  
  const fundingDistributionData = [
    { name: "USDC Distributed", value: totalUsdc, fill: "#2775CA" }, // USDC blue
    { name: "MPLX Distributed", value: mplxUsdValue, fill: "#6366F1" }, // Purple for MPLX
    { name: "MPLX Remaining", value: remainingMplxValue, fill: "#A5B4FC" } // Lighter purple for remaining
  ];

  // Distribution by Technology - using exact values from the document
  // Calculate the Core vs 404 distribution percentages
  const core404RatioData = {
    // Core: 8 grants awarded ($46,500 USDC and 240,000 MPLX)
    core: {
      usdcValue: 46500, // Sum from document
      mplxValue: 240000 * mplxRate,
      projectCount: 8
    },
    // 404: 4 grants awarded ($53,500 USDC and 350,000 MPLX)
    m404: {
      usdcValue: 53500, // Sum from document
      mplxValue: 350000 * mplxRate,
      projectCount: 4
    }
  };
  
  const techDistributionData = [
    { 
      name: "Core", 
      usdcValue: core404RatioData.core.usdcValue,
      mplxValue: core404RatioData.core.mplxValue,
      totalValue: core404RatioData.core.usdcValue + core404RatioData.core.mplxValue,
      projectCount: core404RatioData.core.projectCount
    },
    { 
      name: "404", 
      usdcValue: core404RatioData.m404.usdcValue,
      mplxValue: core404RatioData.m404.mplxValue,
      totalValue: core404RatioData.m404.usdcValue + core404RatioData.m404.mplxValue,
      projectCount: core404RatioData.m404.projectCount
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
    usdc: p.usdc,
    mplx: p.mplx,
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
        <text x={cx} y={cy - 20} dy={8} textAnchor="middle" fill="#FFFFFF" fontSize={16} fontWeight="bold">
          {payload.name}
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="#E5E7EB" fontSize={14}>
          ${value.toLocaleString()}
        </text>
        <text x={cx} y={cy + 30} textAnchor="middle" fill="#E5E7EB" fontSize={12}>
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

  // Custom tooltip for all chart types
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      // Check if this is the applications pie chart by checking if the payload contains "Metaplex Core" or "MPL 404"
      const isApplicationChart = payload[0]?.name === "Metaplex Core" || payload[0]?.name === "MPL 404";
      
      // Check if this is the sector funding pie chart
      const isSectorChart = payload[0]?.payload?.projectList !== undefined;
      
      return (
        <div className="bg-[#121820]/95 p-4 backdrop-blur-sm shadow-xl rounded-md text-white">
          <div className="font-bold text-lg text-blue-300 mb-1">{label || payload[0].name}</div>
          {payload.map((entry: any, index: number) => {
            // For application pie chart - show count without $ sign
            if (isApplicationChart) {
              return (
                <div key={`tooltip-${index}`} className="flex justify-between items-center">
                  <span className="font-medium text-md mr-4">{entry.name}</span>
                  <div>
                    <span className="font-bold text-lg">{entry.value} projects</span>
                    <span className="text-xs text-blue-300 ml-2">({(entry.payload.percent * 100).toFixed(1)}%)</span>
                  </div>
                </div>
              );
            }
            
            // For sector funding pie chart - show project list
            else if (isSectorChart) {
              const projectList = entry.payload.projectList || [];
              const totalFunding = entry.value;
              const percentOfTotal = entry.payload.percent;
              
              return (
                <div key={`tooltip-${index}`} className="flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-md">{entry.name} Sector</span>
                    <div>
                      <span className="font-bold text-lg">${totalFunding.toLocaleString()}</span>
                      <span className="text-xs text-blue-300 ml-2">({(percentOfTotal * 100).toFixed(1)}%)</span>
                    </div>
                  </div>
                  
                  {/* Project list */}
                  <div className="bg-[#1a2436] p-2 rounded mt-1">
                    <p className="text-sm font-medium text-blue-200 mb-1">Projects in this sector:</p>
                    <ul className="list-disc pl-4 text-sm space-y-1">
                      {projectList.map((projectName: string, i: number) => (
                        <li key={`project-${i}`}>{projectName}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }
            
            // For other charts
            return (
              <div key={`tooltip-${index}`} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color || '#6366F1' }}></div>
                <span className="font-medium mr-2">{entry.name}:</span>
                <span className="font-bold">${entry.value.toLocaleString()}</span>
              </div>
            );
          })}
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
            <h3 className="text-3xl font-bold">12</h3>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-[#1c2431] to-[#171f2b] border-[#364156]">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="rounded-full bg-purple-500/20 p-4 mb-4">
              <TrendingUp size={28} className="text-purple-400" />
            </div>
            <p className="text-lg text-gray-300 mb-1">Total Value</p>
            <h3 className="text-3xl font-bold">$159,000</h3>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-[#1c2431] to-[#171f2b] border-[#364156]">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="rounded-full bg-emerald-500/20 p-4 mb-4">
              <Lightbulb size={28} className="text-emerald-400" />
            </div>
            <p className="text-lg text-gray-300 mb-1">USDC Distributed</p>
            <h3 className="text-3xl font-bold">$100,000</h3>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-[#1c2431] to-[#171f2b] border-[#364156]">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="rounded-full bg-amber-500/20 p-4 mb-4">
              <ZapIcon size={28} className="text-amber-400" />
            </div>
            <p className="text-lg text-gray-300 mb-1">MPLX Value</p>
            <h3 className="text-3xl font-bold">$59,000</h3>
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

                      >
                        <Cell fill="url(#coreGradient)" stroke="#6366F1" strokeWidth={2} />
                        <Cell fill="url(#m404Gradient)" stroke="#10B981" strokeWidth={2} />
                      </Pie>
                      <Tooltip 
                        content={<CustomTooltip />}
                        cursor={false}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex justify-center space-x-2 mt-4">
                  <div className="bg-[#131a25] p-4 rounded-lg text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-[#6366F1] mr-2"></div>
                      <h5 className="font-medium">Core Projects</h5>
                    </div>
                    <p className="text-2xl font-bold text-white">{coreProjects.length}</p>
                    <p className="text-xs text-gray-400">
                      {Math.round((coreProjects.length / grantProjects.length) * 100)}% of total
                    </p>
                  </div>
                  <div className="bg-[#131a25] p-4 rounded-lg text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-[#10B981] mr-2"></div>
                      <h5 className="font-medium">404 Projects</h5>
                    </div>
                    <p className="text-2xl font-bold text-white">{m404Projects.length}</p>
                    <p className="text-xs text-gray-400">
                      {Math.round((m404Projects.length / grantProjects.length) * 100)}% of total
                    </p>
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
                        <p className="text-2xl font-bold">$100,000</p>
                        <p className="text-xs text-gray-400 mt-1">Exact USDC amount to 12 Projects</p>
                      </div>
                      
                      <div className="bg-[#171f2b] p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 rounded-full bg-[#6366F1] mr-2"></div>
                          <h4 className="font-medium">MPLX Distributed</h4>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <p className="text-2xl font-bold">590,000</p>
                          <p className="text-sm text-gray-400">tokens</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">≈ $59,000 Value</p>
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
                        <p className="text-xs text-gray-400 mt-1">≈ $41,000 Value</p>
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
              <div className="flex flex-row items-start space-x-4">
                {/* Left side - Selected sector info box */}
                <div className="w-1/4 bg-[#131a25] p-4 rounded-lg shadow-lg">
                  <h3 className="font-bold text-lg text-blue-300 mb-2">
                    {sectorFundingData[activeIndex].name}
                  </h3>
                  <div className="mb-2">
                    <p className="text-xl font-bold text-white">${sectorFundingData[activeIndex].value.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">
                      {Math.round((sectorFundingData[activeIndex].value / 
                        sectorFundingData.reduce((sum, item) => sum + item.value, 0)) * 100)}% of total
                    </p>
                  </div>
                  
                  {/* Project list */}
                  <div className="mt-4">
                    <p className="text-sm font-medium text-blue-200 mb-1">Projects in this sector:</p>
                    <ul className="list-disc pl-4 text-sm space-y-1">
                      {sectorFundingData[activeIndex].projectList.map((projectName: string, i: number) => (
                        <li key={`project-${i}`} className="text-gray-300">{projectName}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Right side - Pie chart */}
                <div className="w-3/4"
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
                      
                      {/* Active Sector Info Display in Center */}
                      <text 
                        x="50%" 
                        y="50%" 
                        textAnchor="middle" 
                        dominantBaseline="middle" 
                        fill="#FFFFFF" 
                        fontSize={16} 
                        fontWeight="bold"
                      >
                        {sectorFundingData[activeIndex].name}
                      </text>
                      <text 
                        x="50%" 
                        y="50%" 
                        dy="25" 
                        textAnchor="middle" 
                        dominantBaseline="middle" 
                        fill="#FFFFFF" 
                        fontSize={14}
                      >
                        ${sectorFundingData[activeIndex].value.toLocaleString()}
                      </text>
                      <text 
                        x="50%" 
                        y="50%" 
                        dy="45" 
                        textAnchor="middle" 
                        dominantBaseline="middle" 
                        fill="#9CA3AF" 
                        fontSize={12}
                      >
                        ({Math.round((sectorFundingData[activeIndex].value / 
                          sectorFundingData.reduce((sum, item) => sum + item.value, 0)) * 100)}%)
                      </text>
                      
                      <Pie
                        activeIndex={activeIndex}
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
                            stroke={activeIndex === index ? "#FFFFFF" : "#1c2431"}
                            strokeWidth={activeIndex === index ? 4 : 2}
                            strokeDasharray={activeIndex === index ? "0" : "0"}
                            opacity={activeIndex === index ? 1 : 0.8}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Sector buttons without separator */}
                <div className="mt-8">
                  <div className="flex flex-wrap gap-4">
                    {sectorFundingData.map((sector, index) => (
                      <div 
                        key={`sector-${index}`} 
                        className={`flex-grow min-w-[200px] max-w-[250px] p-4 rounded-lg transition-all
                          ${activeIndex === index 
                            ? 'bg-blue-900/30 border-l-4 border-blue-500 shadow-lg shadow-blue-500/10' 
                            : 'bg-[#171f2b] border-l-4 border-transparent hover:border-blue-500/50'}`}
                        onMouseEnter={() => setActiveIndex(index)}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-5 h-5 rounded-full flex-shrink-0" 
                            style={{ backgroundColor: `hsl(${index * 50}, 70%, 60%)` }}
                          />
                          <h5 className="font-medium text-white">{sector.name}</h5>
                        </div>
                        <div className="mt-3 flex justify-between items-baseline">
                          <p className="text-xl font-bold text-white">${sector.value.toLocaleString()}</p>
                          <p className="text-sm text-blue-300">{sector.projects} 
                            <span className="text-blue-300/70 text-xs"> project{sector.projects !== 1 ? 's' : ''}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
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
                {/* Custom visualization instead of BarChart */}
                <div className="space-y-8">
                  {techDistributionData.map((tech, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className={`text-lg font-semibold ${tech.name === "Core" ? "text-indigo-300" : "text-emerald-300"}`}>
                            {tech.name}
                          </span>
                          <span className="text-xs ml-2 text-gray-400">
                            {tech.name === "Core" ? "7 projects" : "5 projects"}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-bold text-white">${tech.totalValue.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      {/* Main progress bar */}
                      <div className="h-6 w-full bg-gray-800/60 rounded-lg overflow-hidden relative">
                        <div 
                          className={`h-full ${tech.name === "Core" ? "bg-indigo-500/70" : "bg-emerald-500/70"}`}
                          style={{
                            width: `${(tech.totalValue / 95000) * 100}%`, // Using the higher value (Core) as baseline
                            transition: "width 1s ease-in-out"
                          }}
                        />
                        
                        {/* Labels inside bar */}
                        <div className="absolute inset-0 flex items-center justify-between px-3">
                          <div className="flex gap-2 items-center text-white text-xs">
                            <div className={`h-2 w-2 rounded-full ${tech.name === "Core" ? "bg-indigo-300" : "bg-emerald-300"}`} />
                            <span>{tech.name === "Core" ? "$60,500 USDC + $34,500 MPLX" : "$39,500 USDC + $24,500 MPLX"}</span>
                          </div>
                          <div className="text-white text-xs font-medium">
                            {tech.name === "Core" ? "60%" : "40%"}
                          </div>
                        </div>
                      </div>
                      
                      {/* USDC and MPLX detailed breakdown */}
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5 mb-1">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            <span className="text-xs text-blue-300">USDC</span>
                          </div>
                          <div className="h-2 w-full bg-gray-800/40 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500"
                              style={{
                                width: `${(tech.usdcValue / tech.totalValue) * 100}%`,
                                transition: "width 1.2s ease-in-out"
                              }}
                            />
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-400">${tech.usdcValue.toLocaleString()}</span>
                            <span className="text-xs text-gray-400">{Math.round((tech.usdcValue / tech.totalValue) * 100)}%</span>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5 mb-1">
                            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                            <span className="text-xs text-purple-300">MPLX</span>
                          </div>
                          <div className="h-2 w-full bg-gray-800/40 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-purple-500"
                              style={{
                                width: `${(tech.mplxValue / tech.totalValue) * 100}%`,
                                transition: "width 1.2s ease-in-out"
                              }}
                            />
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-400">${tech.mplxValue.toLocaleString()}</span>
                            <span className="text-xs text-gray-400">{Math.round((tech.mplxValue / tech.totalValue) * 100)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Comparison metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t border-gray-700/50">
                    <div className="bg-[#1a2436]/50 p-3 rounded-lg">
                      <p className="text-xs text-gray-400">Average Grant (Core)</p>
                      <p className="text-lg font-bold text-indigo-300">$13,571</p>
                    </div>
                    <div className="bg-[#1a2436]/50 p-3 rounded-lg">
                      <p className="text-xs text-gray-400">Average Grant (404)</p>
                      <p className="text-lg font-bold text-emerald-300">$12,800</p>
                    </div>
                    <div className="bg-[#1a2436]/50 p-3 rounded-lg">
                      <p className="text-xs text-gray-400">USDC/MPLX Ratio (Core)</p>
                      <p className="text-lg font-bold text-blue-300">64/36</p>
                    </div>
                    <div className="bg-[#1a2436]/50 p-3 rounded-lg">
                      <p className="text-xs text-gray-400">USDC/MPLX Ratio (404)</p>
                      <p className="text-lg font-bold text-blue-300">62/38</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-right text-gray-500">* MPLX token value calculated at $0.1 USDC per MPLX</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Application & Selection Process */}
            <Card className="bg-[#1c2431] border-[#364156]">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-white">Application Process</CardTitle>
                <CardDescription className="text-gray-300">Applications & Selection Details</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Application stats */}
                  <div className="bg-gradient-to-br from-[#1a2436] to-[#151e2a] rounded-lg p-5">
                    <h3 className="text-lg font-semibold mb-4 text-blue-300">Application Statistics</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="h-5 w-full bg-[#131a25] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                            style={{ width: '68%' }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-2 text-sm">
                          <span className="text-gray-400">Metaplex Core</span>
                          <span className="text-white font-medium">52 (68%)</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="h-5 w-full bg-[#131a25] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                            style={{ width: '32%' }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-2 text-sm">
                          <span className="text-gray-400">MPL 404</span>
                          <span className="text-white font-medium">24 (32%)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                      <div className="bg-[#131a25] p-3 rounded-lg flex flex-col items-center">
                        <span className="text-xs text-gray-400">Total Applications</span>
                        <span className="text-xl font-bold text-white">76</span>
                      </div>
                      
                      <div className="bg-[#131a25] p-3 rounded-lg flex flex-col items-center">
                        <span className="text-xs text-gray-400">Acceptance Rate</span>
                        <span className="text-xl font-bold text-white">15.8%</span>
                      </div>
                      
                      <div className="bg-[#131a25] p-3 rounded-lg flex flex-col items-center">
                        <span className="text-xs text-gray-400">Avg Request</span>
                        <span className="text-xl font-bold text-white">$39,618</span>
                      </div>
                      
                      <div className="bg-[#131a25] p-3 rounded-lg flex flex-col items-center">
                        <span className="text-xs text-gray-400">Avg Awarded</span>
                        <span className="text-xl font-bold text-white">$13,167</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Selection Process */}
                  <div className="bg-gradient-to-br from-[#1a2436] to-[#151e2a] rounded-lg p-5">
                    <h3 className="text-lg font-semibold mb-4 text-purple-300">Selection Process</h3>
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center">
                        <div className="rounded-full bg-blue-500/20 w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-blue-400 font-semibold">1</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">Application Intake</p>
                          <p className="text-sm text-gray-400">Applications submitted via Google Form and tracked in CRM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="rounded-full bg-blue-500/20 w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-blue-400 font-semibold">2</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">Initial Review</p>
                          <p className="text-sm text-gray-400">Projects discussed in weekly council calls</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="rounded-full bg-blue-500/20 w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-blue-400 font-semibold">3</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">Intro Call</p>
                          <p className="text-sm text-gray-400">20-minute introductory calls with promising teams</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="rounded-full bg-blue-500/20 w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-blue-400 font-semibold">4</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">Technical Diligence</p>
                          <p className="text-sm text-gray-400">Technical specs and milestone planning</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="rounded-full bg-blue-500/20 w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-blue-400 font-semibold">5</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">Agreement & Execution</p>
                          <p className="text-sm text-gray-400">MOU issued with milestone-based funding</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
              <div>
                <div className="overflow-hidden rounded-lg bg-gradient-to-b from-[#161f2d] to-[#121824]">
                  <div className="px-4 py-2 bg-[#1a2537] flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <h3 className="text-sm font-medium text-white">Top Funded Projects by Category</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                        <span className="text-xs text-gray-300">Core</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        <span className="text-xs text-gray-300">404</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {projectsByFunding
                        .sort((a, b) => b.totalUsd - a.totalUsd)
                        .slice(0, 6)
                        .map((project, index) => (
                          <div 
                            key={`project-card-${index}`} 
                            className={`relative overflow-hidden rounded-lg p-4 transition-all shadow-lg
                              ${project.tech === "CORE" 
                                ? "bg-gradient-to-br from-indigo-900/20 to-indigo-900/5 border border-indigo-800/30" 
                                : "bg-gradient-to-br from-emerald-900/20 to-emerald-900/5 border border-emerald-800/30"
                              }
                            `}
                            style={{
                              boxShadow: project.tech === "CORE" 
                                ? "0 4px 20px rgba(99, 102, 241, 0.15)" 
                                : "0 4px 20px rgba(16, 185, 129, 0.15)"
                            }}
                          >
                            <div className={`absolute top-0 right-0 w-16 h-16 opacity-30 -mt-8 -mr-8 rounded-full
                              ${project.tech === "CORE" ? "bg-indigo-600" : "bg-emerald-600"}
                            `}></div>
                            
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-bold text-lg text-white leading-tight pr-5">
                                {project.name}
                              </h4>
                              <span className={`text-xs px-2 py-1 rounded-md 
                                ${project.tech === "CORE" 
                                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" 
                                  : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                }`}>
                                {project.tech}
                              </span>
                            </div>
                            
                            <div className="flex items-end justify-between">
                              <div>
                                <p className="text-sm text-gray-400">{project.sector}</p>
                              </div>
                              <div className="text-right">
                                <div className="flex flex-col items-end">
                                  <p className={`text-xl font-bold 
                                    ${project.tech === "CORE" ? "text-indigo-300" : "text-emerald-300"}`}>
                                    ${(project.totalUsd / 1000).toFixed(1)}k
                                  </p>
                                  <div className="flex items-center gap-2 text-xs">
                                    <span className="text-blue-300">${project.usdc.toLocaleString()} USDC</span>
                                    <span className="text-purple-300">+{project.mplx.toLocaleString()} MPLX</span>
                                  </div>
                                </div>
                                <div className="w-full bg-gray-800 h-2 mt-2 rounded-full overflow-hidden flex">
                                  {/* USDC portion */}
                                  <div 
                                    className={`h-full bg-blue-500`}
                                    style={{ 
                                      width: `${(project.usdc / project.totalUsd) * 100}%`,
                                    }}
                                  ></div>
                                  {/* MPLX portion (at MPLX = 0.1 USDC) */}
                                  <div 
                                    className={`h-full bg-purple-500`}
                                    style={{ 
                                      width: `${((project.mplx * 0.1) / project.totalUsd) * 100}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
                
                {/* Total funding display */}
                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex-1 bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-4 rounded-lg border border-blue-800/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-400">Total Funding</p>
                        <p className="text-3xl font-bold text-white mt-1">$159,000</p>
                        <div className="flex gap-3 mt-2">
                          <div className="flex items-center gap-1.5">
                            <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>
                            <span className="text-xs text-blue-300">$100,000 USDC</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="h-2.5 w-2.5 rounded-full bg-purple-500"></div>
                            <span className="text-xs text-purple-300">$59,000 MPLX*</span>
                          </div>
                        </div>
                      </div>
                      <div className="h-12 w-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-blue-400" />
                      </div>
                    </div>
                    
                    <div className="mt-3 bg-gray-800/50 h-3 rounded-full overflow-hidden flex">
                      <div className="h-full bg-blue-500" style={{width: '63%'}}></div>
                      <div className="h-full bg-purple-500" style={{width: '37%'}}></div>
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-gradient-to-r from-indigo-900/20 to-indigo-900/5 p-4 rounded-lg border border-indigo-800/30">
                    <p className="text-sm text-gray-400">Core Projects</p>
                    <p className="text-2xl font-bold text-indigo-300 mt-1">$95,000</p>
                    
                    <div className="flex gap-2 mt-1.5">
                      <span className="text-xs text-blue-300">$60,500 USDC</span>
                      <span className="text-xs text-purple-300">+ $34,500 MPLX*</span>
                    </div>
                    
                    <div className="flex flex-col mt-3 gap-2">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-800/50 h-2 rounded-full overflow-hidden flex">
                          <div className="h-full bg-blue-500" style={{width: '64%'}}></div>
                          <div className="h-full bg-purple-500" style={{width: '36%'}}></div>
                        </div>
                        <p className="text-xs ml-3 text-indigo-300 whitespace-nowrap">60%</p>
                      </div>
                      
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>7 projects</span>
                        <span>CORE</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-gradient-to-r from-emerald-900/20 to-emerald-900/5 p-4 rounded-lg border border-emerald-800/30">
                    <p className="text-sm text-gray-400">404 Projects</p>
                    <p className="text-2xl font-bold text-emerald-300 mt-1">$64,000</p>
                    
                    <div className="flex gap-2 mt-1.5">
                      <span className="text-xs text-blue-300">$39,500 USDC</span>
                      <span className="text-xs text-purple-300">+ $24,500 MPLX*</span>
                    </div>
                    
                    <div className="flex flex-col mt-3 gap-2">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-800/50 h-2 rounded-full overflow-hidden flex">
                          <div className="h-full bg-blue-500" style={{width: '62%'}}></div>
                          <div className="h-full bg-purple-500" style={{width: '38%'}}></div>
                        </div>
                        <p className="text-xs ml-3 text-emerald-300 whitespace-nowrap">40%</p>
                      </div>
                      
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>5 projects</span>
                        <span>404</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Footnote */}
                <p className="text-right mt-2 text-xs text-gray-500">* MPLX token value calculated at $0.1 USDC per MPLX</p>
              </div>
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
                The notable projects (top 5) received 42% of the total distributed value with an average of $13,258 per project.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="shrink-0 rounded-full bg-purple-500/20 p-1">
                <ZapIcon size={16} className="text-purple-400" />
              </div>
              <span>
                Consumer Apps ($52,500) and Gaming ($45,000) sectors received the highest funding, representing 61% of total funding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="shrink-0 rounded-full bg-emerald-500/20 p-1">
                <ZapIcon size={16} className="text-emerald-400" />
              </div>
              <span>
                $159,000 in total value was distributed ($100,000 in USDC and $59,000 in MPLX token value) across 12 projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="shrink-0 rounded-full bg-amber-500/20 p-1">
                <ZapIcon size={16} className="text-amber-400" />
              </div>
              <span>
                There are {remainingMplx.toLocaleString()} MPLX tokens (${remainingMplxValue.toLocaleString()}*) remaining for future distribution in cohort 2.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      {/* Footnote for MPLX calculation */}
      <div className="text-right mt-4 text-xs text-gray-400 pr-4">
        * MPLX token value calculated at $0.1 USDC per MPLX
      </div>
    </div>
  );
};

export default ChartsPage;