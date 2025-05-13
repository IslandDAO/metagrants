export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  role: "core" | "advisor";
  twitter?: string;
  linkedin?: string;
  website?: string;
  email?: string;
  expertise?: string[];
}

export const team: TeamMember[] = [
  {
    name: "Alex Chen",
    title: "Executive Director",
    bio: "Alex leads IslandDAO's strategic initiatives and oversees the grant program management. Previously, he worked at several Web3 foundations managing ecosystem growth and developer relations.",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "core",
    twitter: "https://twitter.com/alexchen",
    linkedin: "https://linkedin.com/in/alexchen",
    email: "alex@islanddao.org",
    expertise: ["Ecosystem Development", "Governance", "Strategy"]
  },
  {
    name: "Maria Rodriguez",
    title: "Technical Program Manager",
    bio: "Maria manages the technical evaluation process for grants, working closely with developers and reviewers. She has extensive experience in Web3 development and project management.",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "core",
    twitter: "https://twitter.com/maria_r",
    linkedin: "https://linkedin.com/in/mariarodriguez",
    email: "maria@islanddao.org",
    expertise: ["Technical Assessment", "Project Management", "Smart Contracts"]
  },
  {
    name: "David Kim",
    title: "Community Lead",
    bio: "David focuses on community engagement and supporting grantees with their outreach efforts. He previously built several developer communities in the blockchain space.",
    imageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    role: "core",
    twitter: "https://twitter.com/davidkim",
    linkedin: "https://linkedin.com/in/davidkim",
    email: "david@islanddao.org",
    expertise: ["Community Building", "Developer Relations", "Events"]
  },
  {
    name: "Sophia Wang",
    title: "Finance Manager",
    bio: "Sophia oversees the financial aspects of the grant program, including disbursements, reporting, and compliance. She has a background in traditional finance and crypto treasury management.",
    imageUrl: "https://randomuser.me/api/portraits/women/29.jpg",
    role: "core",
    linkedin: "https://linkedin.com/in/sophiawang",
    email: "sophia@islanddao.org",
    expertise: ["Treasury Management", "Financial Reporting", "Compliance"]
  },
  {
    name: "Dr. James Carter",
    title: "Research Advisor",
    bio: "James advises on technical research directions and evaluates cutting-edge proposals. He holds a PhD in Computer Science and has published extensively on blockchain technology.",
    imageUrl: "https://randomuser.me/api/portraits/men/52.jpg",
    role: "advisor",
    twitter: "https://twitter.com/drjcarter",
    website: "https://jamescarter.dev",
    expertise: ["Cryptography", "Consensus Mechanisms", "Scaling Solutions"]
  },
  {
    name: "Elena Petrova",
    title: "Governance Advisor",
    bio: "Elena provides guidance on DAO governance structures and decision-making processes. She has helped establish governance frameworks for several prominent DAOs and protocols.",
    imageUrl: "https://randomuser.me/api/portraits/women/14.jpg",
    role: "advisor",
    twitter: "https://twitter.com/elenapetrova",
    linkedin: "https://linkedin.com/in/elenapetrova",
    expertise: ["DAO Governance", "Tokenomics", "Community Voting"]
  },
  {
    name: "Michael Johnson",
    title: "NFT Strategy Advisor",
    bio: "Michael specializes in NFT market strategies and business models. He has founded two successful NFT platforms and advises projects on sustainable growth and monetization.",
    imageUrl: "https://randomuser.me/api/portraits/men/42.jpg",
    role: "advisor",
    twitter: "https://twitter.com/mjohnson",
    website: "https://mjohnson.io",
    expertise: ["NFT Markets", "Digital Collectibles", "Creator Economy"]
  },
  {
    name: "Aisha Patel",
    title: "Technical Security Advisor",
    bio: "Aisha reviews the security aspects of grant applications and provides guidance on best practices. She has a background in smart contract auditing and security consulting.",
    imageUrl: "https://randomuser.me/api/portraits/women/38.jpg",
    role: "advisor",
    twitter: "https://twitter.com/aishapatel",
    linkedin: "https://linkedin.com/in/aishapatel",
    expertise: ["Smart Contract Security", "Risk Assessment", "Security Auditing"]
  }
];