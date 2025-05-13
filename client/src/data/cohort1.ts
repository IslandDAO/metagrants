export interface Grant {
  id: string;
  slug: string;
  name: string;
  sector: string;
  techStack: "Core" | "404";
  summary: string;
  totalValue: string;
  description?: string;
  imageUrl: string;
  links?: {
    website?: string;
    github?: string;
    twitter?: string;
  };
}

export const cohort1Grants: Grant[] = [
  {
    id: "1",
    slug: "faenora",
    name: "Faenora",
    sector: "Marketplace",
    techStack: "Core",
    summary: "A decentralized marketplace for NFTs with royalty enforcement and creator-first tools",
    totalValue: "$10,000 USDC + 100,000 MPLX",
    description: "Faenora is building a next-generation NFT marketplace with built-in royalty enforcement, advanced creator tools, and community governance features to ensure sustainable revenue for artists and collectors.",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
    links: {
      website: "https://example.com/faenora",
      github: "https://github.com/faenora",
      twitter: "https://twitter.com/faenora"
    }
  },
  {
    id: "2",
    slug: "metaverify",
    name: "MetaVerify",
    sector: "Identity",
    techStack: "404",
    summary: "Verifiable credentials system for NFT provenance and authentication",
    totalValue: "$8,000 USDC + 80,000 MPLX",
    description: "MetaVerify provides a comprehensive authentication system for NFTs, enabling creators to prove ownership and verify the authenticity of digital assets across multiple blockchain networks.",
    imageUrl: "https://images.unsplash.com/photo-1566837945700-30057527ade0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    links: {
      website: "https://example.com/metaverify",
      github: "https://github.com/metaverify",
      twitter: "https://twitter.com/metaverify"
    }
  },
  {
    id: "3",
    slug: "dimensionals",
    name: "Dimensionals",
    sector: "Gaming",
    techStack: "Core",
    summary: "Cross-game NFT ecosystem with interoperable assets and shared inventory",
    totalValue: "$12,000 USDC + 120,000 MPLX",
    description: "Dimensionals is creating a unified gaming ecosystem where NFT assets can be used across multiple games and virtual worlds, providing true ownership and interoperability for players.",
    imageUrl: "https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    links: {
      website: "https://example.com/dimensionals",
      github: "https://github.com/dimensionals",
      twitter: "https://twitter.com/dimensionals"
    }
  },
  {
    id: "4",
    slug: "tokenecho",
    name: "TokenEcho",
    sector: "Analytics",
    techStack: "404",
    summary: "Advanced NFT analytics and market intelligence platform",
    totalValue: "$9,000 USDC + 90,000 MPLX",
    description: "TokenEcho provides real-time analytics and market intelligence for NFT collections, helping creators and collectors make data-driven decisions through comprehensive visualization tools and trend analysis.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    links: {
      website: "https://example.com/tokenecho",
      github: "https://github.com/tokenecho",
      twitter: "https://twitter.com/tokenecho"
    }
  },
  {
    id: "5",
    slug: "artlabs",
    name: "ArtLabs",
    sector: "Creation Tools",
    techStack: "Core",
    summary: "Creative suite for NFT generation, animation, and on-chain programming",
    totalValue: "$11,000 USDC + 110,000 MPLX",
    description: "ArtLabs offers a comprehensive suite of tools for digital artists to create, animate, and program NFTs with advanced features like on-chain generative art capabilities and interactive elements.",
    imageUrl: "https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1274&q=80",
    links: {
      website: "https://example.com/artlabs",
      github: "https://github.com/artlabs",
      twitter: "https://twitter.com/artlabs"
    }
  },
  {
    id: "6",
    slug: "nftbridge",
    name: "NFTBridge",
    sector: "Infrastructure",
    techStack: "404",
    summary: "Cross-chain NFT transfer protocol with lossless metadata preservation",
    totalValue: "$10,000 USDC + 100,000 MPLX",
    description: "NFTBridge enables seamless movement of NFTs between different blockchain networks while preserving all metadata, provenance, and royalty information to ensure creator rights are maintained across ecosystems.",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
    links: {
      website: "https://example.com/nftbridge",
      github: "https://github.com/nftbridge",
      twitter: "https://twitter.com/nftbridge"
    }
  },
  {
    id: "7",
    slug: "communityforge",
    name: "CommunityForge",
    sector: "DAO Tools",
    techStack: "Core",
    summary: "Governance and treasury management tools for NFT communities",
    totalValue: "$7,000 USDC + 70,000 MPLX",
    description: "CommunityForge provides comprehensive governance tools for NFT communities, including proposal creation, voting mechanisms, and treasury management features specifically designed for NFT-based DAOs.",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    links: {
      website: "https://example.com/communityforge",
      github: "https://github.com/communityforge",
      twitter: "https://twitter.com/communityforge"
    }
  },
  {
    id: "8",
    slug: "omnichain",
    name: "OmniChain",
    sector: "Infrastructure",
    techStack: "404",
    summary: "Unified metadata standard for cross-platform NFT compatibility",
    totalValue: "$8,000 USDC + 80,000 MPLX",
    description: "OmniChain is developing a unified metadata standard that ensures NFTs remain compatible across different platforms, marketplaces, and virtual environments, solving fragmentation issues in the ecosystem.",
    imageUrl: "https://images.unsplash.com/photo-1642790551116-53440853b207?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    links: {
      website: "https://example.com/omnichain",
      github: "https://github.com/omnichain",
      twitter: "https://twitter.com/omnichain"
    }
  },
  {
    id: "9",
    slug: "musicblocks",
    name: "MusicBlocks",
    sector: "Music NFTs",
    techStack: "Core",
    summary: "Music NFT platform with dynamic composition and royalty distribution",
    totalValue: "$9,000 USDC + 90,000 MPLX",
    description: "MusicBlocks combines NFT technology with music licensing to create a platform where artists can tokenize their music, enable dynamic composition, and ensure fair royalty distribution to all contributors.",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    links: {
      website: "https://example.com/musicblocks",
      github: "https://github.com/musicblocks",
      twitter: "https://twitter.com/musicblocks"
    }
  },
  {
    id: "10",
    slug: "vaultguard",
    name: "VaultGuard",
    sector: "Security",
    techStack: "404",
    summary: "Multi-signature wallet and security solution for high-value NFT collections",
    totalValue: "$6,000 USDC + 60,000 MPLX",
    description: "VaultGuard provides advanced security solutions for NFT collectors, including multi-signature wallets, theft prevention protocols, and recovery mechanisms to protect high-value digital assets.",
    imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    links: {
      website: "https://example.com/vaultguard",
      github: "https://github.com/vaultguard",
      twitter: "https://twitter.com/vaultguard"
    }
  },
  {
    id: "11",
    slug: "phygital",
    name: "Phygital",
    sector: "Physical + Digital",
    techStack: "Core",
    summary: "Bridging physical items with digital NFTs using embedded NFC and authenticity verification",
    totalValue: "$7,000 USDC + 70,000 MPLX",
    description: "Phygital creates a seamless connection between physical products and digital NFTs using NFC technology, enabling brands and artists to provide authenticated digital twins for physical collectibles.",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    links: {
      website: "https://example.com/phygital",
      github: "https://github.com/phygital",
      twitter: "https://twitter.com/phygital"
    }
  },
  {
    id: "12",
    slug: "metasurface",
    name: "MetaSurface",
    sector: "Virtual Worlds",
    techStack: "Core",
    summary: "Interactive environments for displaying and experiencing NFT collections in virtual spaces",
    totalValue: "$10,000 USDC + 100,000 MPLX",
    description: "MetaSurface builds immersive virtual environments where NFT collectors can showcase their digital assets, interact with other collectors, and experience art and collectibles in novel three-dimensional contexts.",
    imageUrl: "https://images.unsplash.com/photo-1603356033288-acfcb54801e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    links: {
      website: "https://example.com/metasurface",
      github: "https://github.com/metasurface",
      twitter: "https://twitter.com/metasurface"
    }
  }
];