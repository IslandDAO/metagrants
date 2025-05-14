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
    title: "Lead Admin / Grants Council",
    bio: "A founding partner of Cultur3 Capital, a crypto focused VC with a number of investments across Solana, SoCalStreet has been active in the broader ecosystem since 2021. He has led the current DecentraGrants program for IslandDAO, and has been an advisor to Metaplex since the protocols launch.",
    imageUrl: "/src/assets/team-avatars/mark.png",
    role: "core",
    twitter: "https://x.com/socalstreet",
    expertise: ["Admin Lead", "Grants Council", "Advisor"]
  },
  {
    name: "BeeMan",
    title: "Technical Lead, Council Member",
    bio: "Leads technical due diligence across all applications. Reviews build specs, advises grantees on implementation, and helps shape milestone structuring. In Cohort Two, he will continue this role while also expanding his 'build in public' video content initiative, which he launched in collaboration with the Metaplex marketing team.",
    imageUrl: "/src/assets/team-avatars/beeman.png",
    role: "core",
    twitter: "https://x.com/beeman_nl",
    expertise: ["Technical Evaluation", "Developer Content", "Milestone Structuring"]
  },
  {
    name: "Tony",
    title: "Developer Relations, Foundation Liaison",
    bio: "Technical and developer relations lead from the Metaplex Foundation. Plays a critical role in ensuring that top-of-funnel grantees are successfully onboarded into the Metaplex developer ecosystem. Advises teams on how to integrate with existing Metaplex tools and helps avoid redundancy by guiding applicants toward underutilized capabilities in the stack.",
    imageUrl: "/src/assets/team-avatars/tony.png",
    role: "core",
    twitter: "https://x.com/tonyboyletweets",
    expertise: ["Developer Relations", "Product Education", "Ecosystem Awareness"]
  },
  {
    name: "Kai",
    title: "Grants Council / Admin Support",
    bio: "Kai is a core member of the IslandDAO and is active as a Research/Write. Previous Streamflow Content & Research. Produced research in collaboration with protocols including Reserve Protocol, Forgd (previously TokenomicsDAO), and more. Currently, Blocmates Research Analyst.",
    imageUrl: "/src/assets/team-avatars/kai.png",
    role: "core",
    twitter: "https://x.com/DefiVaults",
    expertise: ["Grants Council", "Admin Support", "Research"]
  },
  {
    name: "Chris",
    title: "Grants Council / Admin Support",
    bio: "Whale's is a core member of the IslandDAO community. Beyond leading numerous feedback initiatives for the DAO, Whales has been integral in the operations of the DAO handling administration, operations and business strategy.",
    imageUrl: "/src/assets/team-avatars/chris.png",
    role: "core",
    twitter: "https://x.com/Whalesfriend",
    expertise: ["Grants Council", "Admin Support", "Operations"]
  },
  {
    name: "Parzicano",
    title: "Grants Council Member",
    bio: "Serves on the grants council as an account management and research lead. Parzicano evaluates applications, provides technical and strategic assessment, and contributes to the council's collective decision-making process. His research expertise helps inform the program's direction and identify promising areas for investment.",
    imageUrl: "/src/assets/team-avatars/parzicano.png",
    role: "advisor",
    twitter: "https://x.com/Parzicano",
    expertise: ["Account Management", "Research", "Application Review"]
  },
  {
    name: "Shadyy",
    title: "Grants Council Member",
    bio: "Key member of the grants council focusing on account management and research. Shady's expertise helps evaluate applications and manage relationships with funded projects. His role in research helps identify trends and opportunities that inform the council's funding decisions and strategic direction.",
    imageUrl: "/src/assets/team-avatars/shadyy.png",
    role: "advisor",
    twitter: "https://x.com/notemxem",
    expertise: ["Account Management", "Research", "Grant Evaluation"]
  },
  {
    name: "iCoder",
    title: "Grants Council Member",
    bio: "Active member of the grants council with a focus on account management and research initiatives. iCoder helps evaluate technical aspects of applications and maintains relationships with grantees. His research contributions help the council stay informed about emerging technologies and approaches relevant to the program's objectives.",
    imageUrl: "/src/assets/team-avatars/icoder.png",
    role: "advisor",
    twitter: "https://x.com/Ify_Ezeugwu",
    expertise: ["Account Management", "Research", "Technical Assessment"]
  },
  {
    name: "Dimitri",
    title: "Comms / Grants Council",
    bio: "Taki is a IslandDAO core contributor in operations, marketing & business development. He runs discord services teams for IslandDAO with clients such as Marinade, Realms, Zignaly Working with Realms on marketing & socials Previously: Solflare (marketing, socials)",
    imageUrl: "https://pbs.twimg.com/profile_images/1678486528141078528/4w4eMkNL_400x400.jpg",
    role: "advisor",
    twitter: "https://x.com/Milimalism",
    expertise: ["Communications", "Grants Council", "Marketing"]
  }
];