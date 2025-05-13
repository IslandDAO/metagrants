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
    name: "Sofia Chen",
    title: "Program Director",
    bio: "With over 10 years in blockchain technology and venture capital, Sofia leads the strategic direction of the MetaplexDAO Grants Program. Previously, she was a partner at Blockchain Ventures and led ecosystem development at Ethereum Foundation.",
    imageUrl: "https://randomuser.me/api/portraits/women/35.jpg",
    role: "core",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    email: "sofia@metaplexdao.com",
    expertise: ["Strategy", "Investment", "Ecosystem Building"]
  },
  {
    name: "Marcus Johnson",
    title: "Technical Lead",
    bio: "A veteran blockchain developer with expertise in cryptography and distributed systems. Marcus oversees the technical evaluation of grant applications and provides guidance to funded projects. Former CTO of a successful DeFi protocol.",
    imageUrl: "https://randomuser.me/api/portraits/men/42.jpg",
    role: "core",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    website: "https://personal-website.com",
    email: "marcus@metaplexdao.com",
    expertise: ["Technical Architecture", "Smart Contracts", "Cryptography"]
  },
  {
    name: "Elena Rodriguez",
    title: "Mentorship Coordinator",
    bio: "Elena connects funded projects with mentors and resources to maximize their chance of success. With a background in community building and startup acceleration, she has helped launch over 50 Web3 projects.",
    imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    role: "core",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    email: "elena@metaplexdao.com",
    expertise: ["Mentorship", "Community", "Project Management"]
  },
  {
    name: "Dr. Michael Rivera",
    title: "Blockchain Economics Advisor",
    bio: "Leading researcher in tokenomics and blockchain incentive design. Michael advises projects on economic models and governance structures.",
    imageUrl: "https://randomuser.me/api/portraits/men/42.jpg",
    role: "advisor",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    expertise: ["Tokenomics", "Governance", "Economic Design"]
  },
  {
    name: "Sarah Johnson",
    title: "Web3 Strategy Advisor",
    bio: "Former head of strategy at a major blockchain foundation with expertise in ecosystem growth and development.",
    imageUrl: "https://randomuser.me/api/portraits/women/24.jpg",
    role: "advisor",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    expertise: ["Strategy", "Growth", "Ecosystem"]
  },
  {
    name: "Raj Patel",
    title: "DeFi Technical Advisor",
    bio: "Smart contract security expert who has audited major DeFi protocols and developed best practices for the industry.",
    imageUrl: "https://randomuser.me/api/portraits/men/36.jpg",
    role: "advisor",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    expertise: ["Smart Contracts", "Security", "DeFi"]
  },
  {
    name: "Aisha Mohamed",
    title: "Product Strategy Advisor",
    bio: "Product leader with experience scaling blockchain applications to millions of users. Specializes in UX and adoption challenges.",
    imageUrl: "https://randomuser.me/api/portraits/women/53.jpg",
    role: "advisor",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    expertise: ["Product", "UX", "Growth"]
  },
  {
    name: "David Chen",
    title: "NFT & Digital Art Advisor",
    bio: "Pioneer in the NFT space who has worked with major artists and brands. Expert in NFT marketplaces and creator economies.",
    imageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    role: "advisor",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    expertise: ["NFTs", "Art", "Marketplaces"]
  },
  {
    name: "Lila Washington",
    title: "Compliance & Regulation Advisor",
    bio: "Attorney specializing in blockchain regulation and compliance. Helps projects navigate the evolving regulatory landscape.",
    imageUrl: "https://randomuser.me/api/portraits/women/14.jpg",
    role: "advisor",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    expertise: ["Compliance", "Regulation", "Legal"]
  },
  {
    name: "Jamal Carter",
    title: "Infrastructure & Scalability Advisor",
    bio: "Expert in blockchain infrastructure, layer 2 scaling solutions, and network optimization. Former lead engineer at a major L1 blockchain.",
    imageUrl: "https://randomuser.me/api/portraits/men/55.jpg",
    role: "advisor",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    expertise: ["Infrastructure", "Scaling", "Performance"]
  }
];
