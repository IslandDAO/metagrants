export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  status: "Active" | "Completed" | "In Development";
  fundingAmount: number;
  startDate: string;
  category?: string;
  tags?: string[];
  imageUrl: string;
}

export const projects: Project[] = [
  {
    id: "decentral-vault",
    name: "DecentralVault",
    description: "A secure, multi-chain asset management protocol for institutions and DAOs",
    longDescription: "DecentralVault provides a comprehensive solution for organizations to manage digital assets across multiple blockchain networks with advanced security features including multi-signature authorization, tiered access controls, and automated compliance checks. The platform aims to bridge the gap between traditional finance and decentralized ecosystems.",
    status: "Active",
    fundingAmount: 75000,
    startDate: "2023-04-15",
    category: "DeFi",
    tags: ["Asset Management", "Multi-chain", "Security"],
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
  },
  {
    id: "artblock-market",
    name: "ArtBlock Market",
    description: "Decentralized NFT marketplace with creator-friendly royalties and community governance",
    longDescription: "ArtBlock Market is revolutionizing the NFT space with a focus on sustainable creator economies. The platform implements an innovative royalty enforcement mechanism, community-driven curation, and transparent revenue sharing. Artists maintain control over their work while collectors enjoy a seamless discovery and trading experience.",
    status: "Completed",
    fundingAmount: 120000,
    startDate: "2022-09-30",
    category: "NFT",
    tags: ["Marketplace", "Creator Economy", "Royalties"],
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
  },
  {
    id: "green-block",
    name: "GreenBlock",
    description: "Carbon-neutral blockchain infrastructure with verifiable environmental impact metrics",
    longDescription: "GreenBlock is addressing the environmental concerns associated with blockchain technology by developing carbon-neutral infrastructure solutions. The project includes a novel consensus mechanism that minimizes energy consumption, a carbon offset integration layer, and transparent impact reporting tools for projects built on the platform.",
    status: "In Development",
    fundingAmount: 95000,
    startDate: "2023-02-10",
    category: "Infrastructure",
    tags: ["Sustainability", "Climate", "Carbon-neutral"],
    imageUrl: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: "chainlink",
    name: "ChainLink Protocol",
    description: "Secure cross-chain messaging and data verification protocol for Web3 applications",
    status: "Active",
    fundingAmount: 110000,
    startDate: "2023-03-22",
    category: "Infrastructure",
    tags: ["Cross-chain", "Interoperability", "Security"],
    imageUrl: "https://images.unsplash.com/photo-1621501473804-77f14f1bddaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "defi-pulse",
    name: "DeFi Pulse Analytics",
    description: "Advanced analytics and risk assessment tools for decentralized finance protocols",
    status: "Completed",
    fundingAmount: 85000,
    startDate: "2022-11-05",
    category: "DeFi",
    tags: ["Analytics", "Risk Management", "Data"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "identity-hub",
    name: "IdentityHub",
    description: "Self-sovereign identity solution with privacy-preserving credential verification",
    status: "In Development",
    fundingAmount: 130000,
    startDate: "2023-01-15",
    category: "Identity",
    tags: ["SSI", "Privacy", "Authentication"],
    imageUrl: "https://images.unsplash.com/photo-1566837945700-30057527ade0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "dao-governance",
    name: "DAOgovernance",
    description: "Comprehensive governance tools for decentralized autonomous organizations",
    status: "Active",
    fundingAmount: 105000,
    startDate: "2022-12-10",
    category: "DAO",
    tags: ["Governance", "Voting", "Community"],
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "defi-aggregator",
    name: "DeFi Yield Aggregator",
    description: "Automated yield optimization platform across multiple DeFi protocols",
    status: "Completed",
    fundingAmount: 90000,
    startDate: "2022-08-20",
    category: "DeFi",
    tags: ["Yield", "Automation", "Optimization"],
    imageUrl: "https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1102&q=80"
  },
  {
    id: "nft-gaming",
    name: "CryptoArcade",
    description: "Blockchain gaming platform with fully on-chain game mechanics and composable assets",
    status: "In Development",
    fundingAmount: 150000,
    startDate: "2023-05-01",
    category: "Gaming",
    tags: ["NFT", "Gaming", "On-chain"],
    imageUrl: "https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "layer2-scaling",
    name: "ZKscale",
    description: "Zero-knowledge proof scaling solution for Ethereum with high throughput and low fees",
    status: "Active",
    fundingAmount: 200000,
    startDate: "2022-10-15",
    category: "Scaling",
    tags: ["Layer 2", "ZK", "Ethereum"],
    imageUrl: "https://images.unsplash.com/photo-1642790551116-53440853b207?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
  },
  {
    id: "data-oracle",
    name: "TruthNode",
    description: "Decentralized oracle network for reliable off-chain data access with economic security guarantees",
    status: "Completed",
    fundingAmount: 125000,
    startDate: "2022-07-01",
    category: "Oracle",
    tags: ["Data", "Oracle", "Off-chain"],
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: "privacy-protocol",
    name: "ShieldTx",
    description: "Privacy-preserving transaction protocol with regulatory compliance capabilities",
    status: "In Development",
    fundingAmount: 160000,
    startDate: "2023-04-05",
    category: "Privacy",
    tags: ["Confidential", "Compliance", "Transactions"],
    imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  }
];
