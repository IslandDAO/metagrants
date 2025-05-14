import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProjectById(Number(req.params.id));
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // API routes for team members
  app.get("/api/team", async (req, res) => {
    try {
      const team = await storage.getAllTeamMembers();
      res.json(team);
    } catch (error) {
      console.error("Error fetching team members:", error);
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });

  app.get("/api/team/:id", async (req, res) => {
    try {
      const teamMember = await storage.getTeamMemberById(Number(req.params.id));
      if (!teamMember) {
        return res.status(404).json({ message: "Team member not found" });
      }
      res.json(teamMember);
    } catch (error) {
      console.error("Error fetching team member:", error);
      res.status(500).json({ message: "Failed to fetch team member" });
    }
  });

  // API routes for project milestones
  app.get("/api/projects/:projectId/milestones", async (req, res) => {
    try {
      const milestones = await storage.getMilestonesByProjectId(Number(req.params.projectId));
      res.json(milestones);
    } catch (error) {
      console.error("Error fetching milestones:", error);
      res.status(500).json({ message: "Failed to fetch milestones" });
    }
  });

  // API routes for project team members
  app.get("/api/projects/:projectId/team", async (req, res) => {
    try {
      const team = await storage.getProjectTeamByProjectId(Number(req.params.projectId));
      res.json(team);
    } catch (error) {
      console.error("Error fetching project team:", error);
      res.status(500).json({ message: "Failed to fetch project team" });
    }
  });

  // API routes for project updates
  app.get("/api/projects/:projectId/updates", async (req, res) => {
    try {
      const updates = await storage.getProjectUpdatesByProjectId(Number(req.params.projectId));
      res.json(updates);
    } catch (error) {
      console.error("Error fetching project updates:", error);
      res.status(500).json({ message: "Failed to fetch project updates" });
    }
  });

  // API route for stats
  app.get("/api/stats", async (req, res) => {
    try {
      // Hard-coded stats data since storage doesn't have getStats() method
      const stats = [
        { id: 'applications', title: 'Applications Received', value: '76' },
        { id: 'grants', title: 'Grants Funded', value: '12' },
        { id: 'usdc', title: 'USDC Allocated', value: '$100,000' },
        { id: 'mplx', title: 'MPLX Allocated', value: '590,000' }
      ];
      
      // No need to fetch MPLX price as it's a static display value
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // API route for grant applications
  app.post("/api/applications", async (req, res) => {
    try {
      const application = await storage.createApplication(req.body);
      res.status(201).json(application);
    } catch (error) {
      console.error("Error creating application:", error);
      res.status(500).json({ message: "Failed to create application" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
