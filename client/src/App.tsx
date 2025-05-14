import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/layout/layout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Projects from "@/pages/projects";
import ProjectDetail from "@/pages/project-detail";
import Team from "@/pages/team";
import Evaluation from "@/pages/evaluation";
import Learnings from "@/pages/learnings";
import Process from "@/pages/process";
import Insights from "@/pages/insights";
import Grants from "@/pages/grants";
import GrantDetail from "@/pages/grant-detail";
import Charts from "@/pages/charts";

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/grants" element={<Grants />} />
          <Route path="/grants/:slug" element={<GrantDetail />} />
          <Route path="/team" element={<Team />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/process" element={<Process />} />
          <Route path="/learnings" element={<Learnings />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
