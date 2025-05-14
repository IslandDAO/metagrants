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
    title: "Program Lead, Council Chair",
    bio: "Leads all aspects of the program—from application intake and milestone tracking to council coordination and communications. In Cohort Two, Mark will also serve as the public face of the Grants Program, acting as primary liaison to the Metaplex Foundation Comms Team, hosting Twitter Spaces and grant updates, and representing the Grants Program on Metaplex DAO-wide calls.",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "core",
    twitter: "https://twitter.com/markmetaplex",
    email: "mark@islanddao.org",
    expertise: ["Admin Lead", "Treasury Operations", "Communications Lead"]
  },
  {
    name: "BeeMan",
    title: "Technical Lead, Council Member",
    bio: "Leads technical due diligence across all applications. Reviews build specs, advises grantees on implementation, and helps shape milestone structuring. In Cohort Two, he will continue this role while also expanding his 'build in public' video content initiative, which he launched in collaboration with the Metaplex marketing team.",
    imageUrl: "https://randomuser.me/api/portraits/men/44.jpg",
    role: "core",
    twitter: "https://twitter.com/beeman_dev",
    github: "https://github.com/beeman",
    expertise: ["Technical Evaluation", "Developer Content", "Milestone Structuring"]
  },
  {
    name: "Tony",
    title: "Developer Relations, Foundation Liaison",
    bio: "Technical and developer relations lead from the Metaplex Foundation. Plays a critical role in ensuring that top-of-funnel grantees are successfully onboarded into the Metaplex developer ecosystem. Advises teams on how to integrate with existing Metaplex tools and helps avoid redundancy by guiding applicants toward underutilized capabilities in the stack.",
    imageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    role: "core",
    twitter: "https://twitter.com/tonymetaplex",
    linkedin: "https://linkedin.com/in/tonymetaplex",
    expertise: ["Developer Relations", "Product Education", "Ecosystem Awareness"]
  },
  {
    name: "Kai",
    title: "Analytics & Content Lead, Council Member",
    bio: "In the first cohort, supported admin workflows, data tracking, and general operations alongside his role vetting applications on the grants council. In the second cohort, he will lead the analytics integration initiative, partnering with Glint Analytics to track key on-chain metrics for each grantee, and oversee digital media production—including demo reels, project intros, and storytelling content for grantees. Kai is a professional video and digital editor.",
    imageUrl: "https://randomuser.me/api/portraits/men/29.jpg",
    role: "core",
    twitter: "https://twitter.com/kaimetaplex",
    expertise: ["Analytics Integration", "Media Production", "Treasury Operations"]
  },
  {
    name: "Chris",
    title: "Co-founder, Admin Lead, Council Member",
    bio: "Co-founder of Dean's List (Now Island DAO) and serves as administrative lead for the LLC that issues grants from the program (distinct from Island DAO). As a core member of Island DAOs, Chris is a driving force behind their IRL events and works to ensure alignment with the grants program. He is also an active participant in the Grants Council, regularly reviewing applications, evaluating milestone structures, and contributing to applicant selection.",
    imageUrl: "https://randomuser.me/api/portraits/men/52.jpg",
    role: "core",
    twitter: "https://twitter.com/chrismetaplex",
    linkedin: "https://linkedin.com/in/chrismetaplex",
    expertise: ["Treasury Operations", "Application Review", "IRL Events"]
  },
  {
    name: "Parzicano",
    title: "Grants Council Member",
    bio: "Serves on the grants council as an account management and research lead. Parzicano evaluates applications, provides technical and strategic assessment, and contributes to the council's collective decision-making process. His research expertise helps inform the program's direction and identify promising areas for investment.",
    imageUrl: "https://randomuser.me/api/portraits/men/62.jpg",
    role: "advisor",
    twitter: "https://twitter.com/parzicano",
    expertise: ["Account Management", "Research", "Application Review"]
  },
  {
    name: "Shady",
    title: "Grants Council Member",
    bio: "Key member of the grants council focusing on account management and research. Shady's expertise helps evaluate applications and manage relationships with funded projects. His role in research helps identify trends and opportunities that inform the council's funding decisions and strategic direction.",
    imageUrl: "https://randomuser.me/api/portraits/men/42.jpg",
    role: "advisor",
    twitter: "https://twitter.com/shadymetaplex",
    website: "https://shadymetaplex.io",
    expertise: ["Account Management", "Research", "Grant Evaluation"]
  },
  {
    name: "iCoder",
    title: "Grants Council Member",
    bio: "Active member of the grants council with a focus on account management and research initiatives. iCoder helps evaluate technical aspects of applications and maintains relationships with grantees. His research contributions help the council stay informed about emerging technologies and approaches relevant to the program's objectives.",
    imageUrl: "https://randomuser.me/api/portraits/men/72.jpg",
    role: "advisor",
    twitter: "https://twitter.com/icodermetaplex",
    github: "https://github.com/icoder",
    expertise: ["Account Management", "Research", "Technical Assessment"]
  }
];