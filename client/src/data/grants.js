/**
 * @typedef {Object} GrantProject
 * @property {string} id - Unique identifier for the grant
 * @property {string} slug - URL-friendly identifier
 * @property {string} name - Project name
 * @property {string} sector - Industry sector or category
 * @property {"CORE" | "404"} tech - Technology stack used (Core or 404)
 * @property {string} summary - Short project summary
 * @property {string} description - Detailed project description
 * @property {number} totalUsd - Total grant value in USD
 * @property {number} usdc - Amount allocated in USDC
 * @property {number} mplx - Amount allocated in MPLX tokens
 * @property {boolean} notable - Whether this is a notable/featured project
 * @property {Object} links - Project links
 * @property {string} [links.website] - Website URL
 * @property {string} [links.github] - GitHub repository URL
 * @property {string} [links.x] - X (Twitter) URL
 */

/** @type {GrantProject[]} */
export const grantProjects = [
  {
    id: "1",
    slug: "faenora",
    name: "Faenora",
    sector: "NFT Marketplace",
    tech: "CORE",
    summary: "A next-generation NFT marketplace with focus on fair royalties distribution and creator advocacy.",
    description: "Faenora is developing a comprehensive NFT marketplace that prioritizes creator rights and fair royalty distribution. By leveraging Metaplex's Core technology, they're building a platform that ensures creators receive their rightful share of secondary sales while providing collectors with a transparent and user-friendly trading experience. Their innovative royalty enforcement mechanisms help sustain the creator economy in the NFT space.",
    totalUsd: 15000,
    usdc: 7500,
    mplx: 150000,
    notable: true,
    links: {
      website: "https://faenora.io",
      github: "https://github.com/faenora",
      x: "https://x.com/faenora"
    }
  },
  {
    id: "2",
    slug: "verxio",
    name: "Verxio",
    sector: "DeFi Integration",
    tech: "404",
    summary: "Bridging the gap between NFTs and DeFi with innovative lending and fractional ownership protocols.",
    description: "Verxio is creating a suite of DeFi tools that integrate with NFT protocols, allowing users to unlock the financial value of their digital assets. Using Metaplex's 404 framework, they're developing lending protocols where NFTs can be used as collateral, as well as fractional ownership mechanisms that increase liquidity and accessibility in the market. This project aims to expand the utility of NFTs beyond collectibles and into financial instruments.",
    totalUsd: 18000,
    usdc: 9000,
    mplx: 180000,
    notable: false,
    links: {
      website: "https://verxio.finance",
      github: "https://github.com/verxio-labs",
      x: "https://x.com/verxioprotocol"
    }
  },
  {
    id: "3",
    slug: "nftforge",
    name: "NFT Forge",
    sector: "Creator Tools",
    tech: "CORE",
    summary: "No-code tools for creators to mint, manage, and monetize NFT collections without technical knowledge.",
    description: "NFT Forge is building a comprehensive suite of no-code tools that empower artists and creators to launch professional NFT collections without requiring technical expertise. The platform includes customizable smart contract templates, metadata management systems, and integrated promotion tools - all accessible through an intuitive interface. By lowering technical barriers, NFT Forge aims to bring the next million creators into the web3 space.",
    totalUsd: 12000,
    usdc: 6000,
    mplx: 120000,
    notable: true,
    links: {
      website: "https://nftforge.app",
      github: "https://github.com/nftforge",
      x: "https://x.com/nftforge"
    }
  },
  {
    id: "4",
    slug: "metaquality",
    name: "MetaQuality",
    sector: "Infrastructure",
    tech: "404",
    summary: "Quality assurance and testing framework for Metaplex token standards and applications.",
    description: "MetaQuality is developing specialized QA infrastructure for decentralized applications built on Metaplex standards. Their comprehensive testing framework helps developers identify vulnerabilities and optimize performance before deployment. The project includes automated test suites for common use cases, security auditing tools, and performance benchmarking specifically calibrated for NFT applications.",
    totalUsd: 10000,
    usdc: 5000,
    mplx: 100000,
    notable: false,
    links: {
      website: "https://metaquality.dev",
      github: "https://github.com/metaquality",
      x: "https://x.com/metaquality"
    }
  },
  {
    id: "5",
    slug: "onchain-identity",
    name: "OnChain Identity",
    sector: "Digital Identity",
    tech: "CORE",
    summary: "Decentralized identity solutions using NFTs as verifiable credentials and reputation markers.",
    description: "OnChain Identity leverages NFT technology to create portable digital identity solutions. Their platform enables users to build comprehensive on-chain reputations through verifiable credentials, participation badges, and achievement tokens. This creates trust in decentralized environments without compromising user privacy, as individuals maintain complete control over how and when to share their credentials.",
    totalUsd: 16000,
    usdc: 8000,
    mplx: 160000,
    notable: true,
    links: {
      website: "https://onchainid.xyz",
      github: "https://github.com/onchainid",
      x: "https://x.com/onchainidentity"
    }
  },
  {
    id: "6",
    slug: "meta-analytics",
    name: "Meta Analytics",
    sector: "Data & Analytics",
    tech: "404",
    summary: "Advanced analytics platform for tracking NFT market trends, collection performance, and user behavior.",
    description: "Meta Analytics is building comprehensive data infrastructure for the Metaplex ecosystem. Their platform aggregates and analyzes on-chain data to provide actionable insights for creators, collectors, and developers. The toolkit includes market trend analysis, collection performance metrics, wallet profiling, and predictive modeling to help stakeholders make more informed decisions in the NFT space.",
    totalUsd: 9000,
    usdc: 4500,
    mplx: 90000,
    notable: false,
    links: {
      website: "https://meta-analytics.xyz",
      github: "https://github.com/meta-analytics",
      x: "https://x.com/metaanalytics"
    }
  },
  {
    id: "7",
    slug: "metadata-hub",
    name: "Metadata Hub",
    sector: "Infrastructure",
    tech: "CORE",
    summary: "Decentralized storage and indexing solution for NFT metadata with enhanced performance and reliability.",
    description: "Metadata Hub addresses the critical challenge of metadata storage and retrieval in the NFT ecosystem. Their solution provides a decentralized, high-performance infrastructure for storing, indexing, and serving NFT metadata. By implementing advanced caching mechanisms, redundant storage, and optimized retrieval protocols, Metadata Hub ensures that NFT information remains accessible and immutable over time.",
    totalUsd: 14000,
    usdc: 7000,
    mplx: 140000,
    notable: true,
    links: {
      website: "https://metadatahub.network",
      github: "https://github.com/metadata-hub",
      x: "https://x.com/metadatahub"
    }
  },
  {
    id: "8",
    slug: "gameverse",
    name: "GameVerse",
    sector: "Gaming",
    tech: "404",
    summary: "Integrating Metaplex NFTs into gaming ecosystems with cross-game asset compatibility and utility.",
    description: "GameVerse is creating a middleware solution that enables game developers to seamlessly incorporate Metaplex NFTs into their projects. Their framework supports cross-game asset compatibility, allowing players to use their NFTs across multiple gaming environments. The platform includes tools for asset rendering, balance management, and gameplay integration, making it easier for developers to add meaningful NFT utility to their games.",
    totalUsd: 13000,
    usdc: 6500,
    mplx: 130000,
    notable: false,
    links: {
      website: "https://gameverse.world",
      github: "https://github.com/gameverse",
      x: "https://x.com/gameversexyz"
    }
  },
  {
    id: "9",
    slug: "nft-gate",
    name: "NFT Gate",
    sector: "Access Control",
    tech: "CORE",
    summary: "Gated access solutions using NFTs for premium content, events, and exclusive community spaces.",
    description: "NFT Gate provides comprehensive infrastructure for token-gated experiences using Metaplex NFTs. Their toolkit enables creators and organizations to restrict access to premium content, virtual events, physical spaces, and community platforms based on NFT ownership. The solution includes verification protocols, customizable access rules, and integration options for popular platforms and services.",
    totalUsd: 11000,
    usdc: 5500,
    mplx: 110000,
    notable: true,
    links: {
      website: "https://nftgate.app",
      github: "https://github.com/nft-gate",
      x: "https://x.com/nftgate"
    }
  },
  {
    id: "10",
    slug: "meta-bridge",
    name: "Meta Bridge",
    sector: "Interoperability",
    tech: "404",
    summary: "Cross-chain bridge for Metaplex NFTs enabling seamless movement between Solana and other blockchains.",
    description: "Meta Bridge is developing interoperability infrastructure that allows Metaplex NFTs to be transferred between Solana and other major blockchains. Their solution maintains the provenance, metadata integrity, and royalty information of NFTs as they move across chains. This expands market access for creators and enhances liquidity by connecting previously isolated ecosystems through a secure and user-friendly bridging mechanism.",
    totalUsd: 17000,
    usdc: 8500,
    mplx: 170000,
    notable: false,
    links: {
      website: "https://metabridge.network",
      github: "https://github.com/meta-bridge",
      x: "https://x.com/meta_bridge"
    }
  },
  {
    id: "11",
    slug: "dynamic-nft",
    name: "Dynamic NFT",
    sector: "Creator Tools",
    tech: "CORE",
    summary: "Framework for creating evolving NFTs that change based on on-chain events, user interactions, or external data.",
    description: "Dynamic NFT is building infrastructure for creating NFTs that evolve over time in response to on-chain activity, user interactions, or real-world events. Their toolkit includes a visual editor for designing state transitions, a trigger system for monitoring relevant events, and rendering engines that dynamically update NFT appearances. This opens new creative possibilities for storytelling, gamification, and utility in the NFT space.",
    totalUsd: 15000,
    usdc: 7500,
    mplx: 150000,
    notable: true,
    links: {
      website: "https://dynamicnft.xyz",
      github: "https://github.com/dynamic-nft",
      x: "https://x.com/dynamic_nft"
    }
  },
  {
    id: "12",
    slug: "meta-render",
    name: "Meta Render",
    sector: "Infrastructure",
    tech: "404",
    summary: "High-performance rendering service for complex 3D and interactive NFT content with low latency.",
    description: "Meta Render provides specialized infrastructure for efficiently rendering complex NFT content, including 3D models, animations, and interactive elements. Their distributed rendering network ensures that computationally intensive NFTs can be displayed quickly across devices while maintaining high quality. The service includes adaptive resolution based on device capabilities, caching optimizations, and support for next-generation immersive content formats.",
    totalUsd: 14000,
    usdc: 7000,
    mplx: 140000,
    notable: false,
    links: {
      website: "https://metarender.io",
      github: "https://github.com/meta-render",
      x: "https://x.com/meta_render"
    }
  }
];