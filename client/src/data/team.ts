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
  github?: string;
  expertise?: string[];
}

export const team: TeamMember[] = [
  {
    name: "Mark",
    title: "Program Lead",
    bio: "Mark leads the MetaplexDAO grant program, managing all administrative operations, communications, and treasury operations. With extensive experience in web3 communities, he ensures the program's success through strategic oversight and operational excellence.",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "core",
    twitter: "https://twitter.com/markmetaplex",
    email: "mark@islanddao.org",
    expertise: ["Program Management", "Treasury Operations", "Communications"]
  },
  {
    name: "BeeMan",
    title: "Technical Lead",
    bio: "BeeMan oversees all technical aspects of the grant evaluation process, providing expert guidance on code reviews, architecture, and implementation strategies. His deep expertise in blockchain and Metaplex technologies enables rigorous assessment of technical grant proposals.",
    imageUrl: "https://randomuser.me/api/portraits/men/44.jpg",
    role: "core",
    twitter: "https://twitter.com/beeman_dev",
    github: "https://github.com/beeman",
    expertise: ["Technical Evaluation", "Blockchain Development", "Architecture Review"]
  },
  {
    name: "Tony",
    title: "DevRel & Metaplex Foundation Liaison",
    bio: "Tony bridges the gap between grantees and the Metaplex Foundation, ensuring alignment of project goals with ecosystem objectives. Through developer relations and community engagement, he helps projects maximize their impact and integration within the Metaplex ecosystem.",
    imageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    role: "core",
    twitter: "https://twitter.com/tonymetaplex",
    linkedin: "https://linkedin.com/in/tonymetaplex",
    expertise: ["Developer Relations", "Ecosystem Integration", "Foundation Coordination"]
  },
  {
    name: "Kai",
    title: "Admin, Analytics & Media",
    bio: "Kai manages the analytical and media aspects of the grant program, tracking project metrics, creating visual assets, and supporting administrative functions. His data-driven approach ensures transparency and measurable outcomes for all funded projects.",
    imageUrl: "https://randomuser.me/api/portraits/men/29.jpg",
    role: "core",
    twitter: "https://twitter.com/kaimetaplex",
    expertise: ["Data Analytics", "Media Production", "Program Administration"]
  },
  {
    name: "Chris",
    title: "Admin Lead & IslandDAO Co-founder",
    bio: "As IslandDAO co-founder and administrative lead, Chris provides strategic guidance and operational expertise to the grant program. His leadership ensures the program maintains its vision while achieving practical outcomes for the Metaplex ecosystem.",
    imageUrl: "https://randomuser.me/api/portraits/men/52.jpg",
    role: "core",
    twitter: "https://twitter.com/chrismetaplex",
    linkedin: "https://linkedin.com/in/chrismetaplex",
    expertise: ["DAO Leadership", "Program Administration", "Strategic Planning"]
  },
  {
    name: "Parzicano",
    title: "Council Member & Research Lead",
    bio: "Parzicano serves on the grant evaluation council while leading research initiatives to identify promising directions for ecosystem development. His technical background and research methodology help inform funding priorities and technical standards.",
    imageUrl: "https://randomuser.me/api/portraits/men/62.jpg",
    role: "advisor",
    twitter: "https://twitter.com/parzicano",
    expertise: ["Technical Research", "Grant Evaluation", "Ecosystem Analysis"]
  },
  {
    name: "Shady",
    title: "Council Member & Strategic Advisor",
    bio: "As a council member, Shady evaluates grant applications and provides strategic guidance on ecosystem development. His experience in blockchain projects and community building offers valuable insights for identifying high-potential initiatives.",
    imageUrl: "https://randomuser.me/api/portraits/men/42.jpg",
    role: "advisor",
    twitter: "https://twitter.com/shadymetaplex",
    website: "https://shadymetaplex.io",
    expertise: ["Strategic Planning", "Application Review", "Community Building"]
  },
  {
    name: "iCoder",
    title: "Council Member & Technical Advisor",
    bio: "iCoder brings deep technical expertise to the grant evaluation process, focusing on code quality, architecture, and scalability concerns. His rigorous technical assessments ensure that funded projects maintain high engineering standards and technical feasibility.",
    imageUrl: "https://randomuser.me/api/portraits/men/72.jpg",
    role: "advisor",
    twitter: "https://twitter.com/icodermetaplex",
    github: "https://github.com/icoder",
    expertise: ["Technical Assessment", "Code Review", "Architecture Design"]
  }
];