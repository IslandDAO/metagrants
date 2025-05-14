import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { grantProjects } from "@/data/grants";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

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

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Calculate statistics
  const totalGrants = grantProjects.length;
  const totalFunding = grantProjects.reduce((sum, grant) => sum + grant.totalUsd, 0);
  const averageGrant = Math.round(totalFunding / totalGrants);
  const coreCount = grantProjects.filter(grant => grant.tech === "CORE").length;
  const count404 = grantProjects.filter(grant => grant.tech === "404").length;
  
  // Prepare data for charts
  const techDistribution = [
    { name: "Core", value: coreCount },
    { name: "404", value: count404 },
  ];
  
  const TECH_COLORS = ["#4f46e5", "#10b981"];
  
  // Get sector distribution
  const sectors = Array.from(new Set(grantProjects.map((grant: GrantProject) => grant.sector)));
  const sectorData = sectors.map(sector => {
    const count = grantProjects.filter((grant: GrantProject) => grant.sector === sector).length;
    const funding = grantProjects
      .filter((grant: GrantProject) => grant.sector === sector)
      .reduce((sum, grant) => sum + grant.totalUsd, 0);
    
    return {
      name: sector,
      count,
      funding
    };
  }).sort((a, b) => b.count - a.count);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <motion.h1 
          className="text-3xl font-bold text-gradient mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Grant Dashboard
        </motion.h1>
        <motion.p 
          className="text-[#b5bfcc] max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Visualization and analysis of MetaplexDAO Grants Cohort 1 distribution and impact.
        </motion.p>
      </div>
      
      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="card-gradient neon-glow card-hover">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-gradient mb-1">{totalGrants}</div>
              <p className="text-sm text-[#b5bfcc]">Total Grants</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="card-gradient neon-glow card-hover">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-gradient mb-1">{formatCurrency(totalFunding)}</div>
              <p className="text-sm text-[#b5bfcc]">Total Funding</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="card-gradient neon-glow card-hover">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-gradient mb-1">{formatCurrency(averageGrant)}</div>
              <p className="text-sm text-[#b5bfcc]">Average Grant</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="card-gradient neon-glow card-hover">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-gradient mb-1">{sectors.length}</div>
              <p className="text-sm text-[#b5bfcc]">Sectors Funded</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Dashboard Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-6"
      >
        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <TabsList className="mb-8 bg-[#1c2431]/50 border-primary/30">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-gradient data-[state=active]:shadow-glow"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="sectors"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-gradient data-[state=active]:shadow-glow"
            >
              Sectors
            </TabsTrigger>
            <TabsTrigger 
              value="table"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-gradient data-[state=active]:shadow-glow"
            >
              Grant Table
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-gradient neon-glow">
                <CardHeader>
                  <CardTitle className="text-gradient">Technology Distribution</CardTitle>
                  <CardDescription className="text-[#b5bfcc]">
                    Breakdown of grants by technology stack
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={techDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {techDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={TECH_COLORS[index % TECH_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} grants`, 'Count']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-gradient neon-glow">
                <CardHeader>
                  <CardTitle className="text-gradient">Funding Distribution</CardTitle>
                  <CardDescription className="text-[#b5bfcc]">
                    Top sectors by funding allocation
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={sectorData.slice(0, 5)}
                        margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                      >
                        <XAxis type="number" tickFormatter={formatCurrency} />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip formatter={(value) => [formatCurrency(value as number), 'Funding']} />
                        <Bar dataKey="funding" fill="#4f46e5" name="Funding" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2 card-gradient neon-glow">
                <CardHeader>
                  <CardTitle className="text-gradient">Grant Highlights</CardTitle>
                  <CardDescription className="text-[#b5bfcc]">
                    Notable projects from Cohort 1
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {grantProjects
                      .filter((grant: GrantProject) => grant.notable)
                      .slice(0, 3)
                      .map((grant: GrantProject) => (
                        <Card 
                          key={grant.id} 
                          className="border border-[#3c4759]/80 hover:border-[#3b82f6]/60 card-gradient neon-glow cursor-pointer card-hover transition-all duration-300"
                          onClick={() => window.location.href = `/grants/${grant.slug}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-gradient">{grant.name}</h3>
                              <Badge variant="outline" className={grant.tech === "CORE" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"}>
                                {grant.tech}
                              </Badge>
                            </div>
                            <p className="text-sm text-[#b5bfcc] mb-3 line-clamp-3">{grant.summary}</p>
                            <div className="flex justify-between items-center">
                              <Badge variant="secondary" className="bg-[#2c374b] text-[#b5bfcc]">{grant.sector}</Badge>
                              <Link 
                                to={`/grants/${grant.slug}`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Button variant="link" size="sm" className="p-0 text-[#f97316] hover:text-[#fb923c] animate-glow-pulse">View Details</Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Sectors Tab */}
          <TabsContent value="sectors">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sector Analysis</CardTitle>
                  <CardDescription>
                    Distribution of grants by sector
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={sectorData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                      >
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="count" name="Number of Grants" fill="#8884d8" />
                        <Bar yAxisId="right" dataKey="funding" name="Funding ($)" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sectorData.map((sector, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{sector.name}</CardTitle>
                      <CardDescription>
                        {sector.count} projects • {formatCurrency(sector.funding)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="space-y-2">
                        {grantProjects
                          .filter((grant: GrantProject) => grant.sector === sector.name)
                          .map((grant: GrantProject) => (
                            <Link key={grant.id} to={`/grants/${grant.slug}`} className="block">
                              <div className="p-2 border border-[#3c4759]/80 hover:border-[#3b82f6]/60 rounded-md card-gradient card-hover neon-glow transition-all duration-300">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-gradient">{grant.name}</span>
                                  <Badge variant="outline" className={grant.tech === "CORE" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"}>
                                    {grant.tech}
                                  </Badge>
                                </div>
                              </div>
                            </Link>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Table Tab */}
          <TabsContent value="table">
            <Card>
              <CardHeader>
                <CardTitle>Complete Grant List</CardTitle>
                <CardDescription>
                  Details of all funded projects in Cohort 1
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="p-3 text-left">Project</th>
                        <th className="p-3 text-left">Sector</th>
                        <th className="p-3 text-left">Tech</th>
                        <th className="p-3 text-right">Funding</th>
                        <th className="p-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {grantProjects.map((grant: GrantProject) => (
                        <tr 
                          key={grant.id} 
                          className="hover:bg-[#232b3d] cursor-pointer transition-all duration-300 relative hover-neon-table border-b border-[#3c4759]/40 hover:border-[#3b82f6]/50" 
                          onClick={() => window.location.href = `/grants/${grant.slug}`}
                        >
                          <td className="p-3">
                            <div className="font-medium text-gradient">{grant.name}</div>
                            <div className="text-sm text-[#b5bfcc] truncate max-w-[250px]">{grant.summary}</div>
                          </td>
                          <td className="p-3">{grant.sector}</td>
                          <td className="p-3">
                            <Badge className={grant.tech === "CORE" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"}>
                              {grant.tech}
                            </Badge>
                          </td>
                          <td className="p-3 text-right font-medium">{formatCurrency(grant.totalUsd)}</td>
                          <td className="p-3 text-center">
                            <Link 
                              to={`/grants/${grant.slug}`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Button variant="outline" size="sm" className="animate-glow-pulse hover:scale-105 transition-transform text-[#f97316] border-[#f97316] hover:bg-[#f97316]/10">View</Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Dashboard;