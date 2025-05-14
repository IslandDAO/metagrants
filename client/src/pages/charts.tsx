import React from "react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, CartesianGrid
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ChartsPage = () => {
  // Data for Application Breakdown (Core vs 404)
  const applicationData = [
    { name: "Metaplex Core", value: 52, percent: 68 },
    { name: "MPL 404", value: 24, percent: 32 }
  ];

  // Data for Funding by Sector
  const sectorFundingData = [
    { name: "Consumer Apps", value: 52500 },
    { name: "Gaming", value: 45000 },
    { name: "Creator & NFT Infra", value: 24500 },
    { name: "Social & Identity", value: 18000 },
    { name: "Data & Analytics", value: 8000 }
  ];

  // Data for Funding Distribution
  const fundingDistributionData = [
    { name: "USDC Distributed", value: 99000 },
    { name: "MPLX Distributed (est. value)", value: 59000 },
    { name: "MPLX Remaining (est. value)", value: 41000 }
  ];

  // Colors for pie charts and bars
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"];

  // Custom tooltip for USD values
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium">{`${payload[0].name}`}</p>
          <p className="text-[#0088FE]">{`Value: $${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for pie chart
  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium">{`${payload[0].name}`}</p>
          <p className="text-[#0088FE]">{`Applications: ${payload[0].value} (${payload[0].payload.percent}%)`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">MetaplexDAO Cohort 1 Analytics</h1>
      <p className="text-gray-600 mb-8">
        Visualizations of application data and funding distribution from Cohort 1 of the MetaplexDAO Grant Program.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Application Breakdown Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Application Breakdown</CardTitle>
            <CardDescription>Core vs 404 Technology Applications</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={applicationData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {applicationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Funding by Sector Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Funding by Sector</CardTitle>
            <CardDescription>Total funding distributed per sector (USD)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sectorFundingData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sectorFundingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Funding Distribution Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Funding Distribution</CardTitle>
          <CardDescription>USDC and MPLX token allocation details</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={fundingDistributionData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Value']}
                labelFormatter={(name) => `${name}`}
              />
              <Legend />
              <Bar dataKey="value" name="USD Value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
        <h3 className="text-xl font-medium mb-4">Key Insights</h3>
        <ul className="space-y-2 list-disc pl-5">
          <li>The majority of applications (68%) were for Metaplex Core technology.</li>
          <li>Consumer Apps and Gaming received the highest funding allocation, representing nearly 65% of total funding.</li>
          <li>A total of $158,000 in value was distributed ($99,000 in USDC and $59,000 in MPLX token value).</li>
          <li>There is approximately $41,000 in MPLX tokens remaining for future distribution.</li>
        </ul>
      </div>
    </div>
  );
};

export default ChartsPage;