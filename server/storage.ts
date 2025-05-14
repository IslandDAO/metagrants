import { 
  users, type User, type InsertUser,
  type Project, type TeamMember, type Milestone,
  type ProjectTeam, type ProjectUpdate, type Application 
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getAllProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  
  // Team methods
  getAllTeamMembers(): Promise<TeamMember[]>;
  getTeamMemberById(id: number): Promise<TeamMember | undefined>;
  
  // Milestone methods
  getMilestonesByProjectId(projectId: number): Promise<Milestone[]>;
  
  // Project team methods
  getProjectTeamByProjectId(projectId: number): Promise<ProjectTeam[]>;
  
  // Project updates methods
  getProjectUpdatesByProjectId(projectId: number): Promise<ProjectUpdate[]>;
  
  // Application methods
  createApplication(application: any): Promise<Application>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private teamMembers: Map<number, TeamMember>;
  private milestones: Map<number, Milestone[]>;
  private projectTeams: Map<number, ProjectTeam[]>;
  private projectUpdates: Map<number, ProjectUpdate[]>;
  private applications: Application[];
  
  currentId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.teamMembers = new Map();
    this.milestones = new Map();
    this.projectTeams = new Map();
    this.projectUpdates = new Map();
    this.applications = [];
    this.currentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }
  
  async getProjectById(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }
  
  // Team methods
  async getAllTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values());
  }
  
  async getTeamMemberById(id: number): Promise<TeamMember | undefined> {
    return this.teamMembers.get(id);
  }
  
  // Milestone methods
  async getMilestonesByProjectId(projectId: number): Promise<Milestone[]> {
    return this.milestones.get(projectId) || [];
  }
  
  // Project team methods
  async getProjectTeamByProjectId(projectId: number): Promise<ProjectTeam[]> {
    return this.projectTeams.get(projectId) || [];
  }
  
  // Project updates methods
  async getProjectUpdatesByProjectId(projectId: number): Promise<ProjectUpdate[]> {
    return this.projectUpdates.get(projectId) || [];
  }
  
  // Application methods
  async createApplication(application: any): Promise<Application> {
    const newApplication = application as Application;
    this.applications.push(newApplication);
    return newApplication;
  }
}

export const storage = new MemStorage();
