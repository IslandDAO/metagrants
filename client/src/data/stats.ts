export interface Stat {
  id: string;
  title: string;
  value: string;
}

export const stats: Stat[] = [
  {
    id: "applications",
    title: "Applications Received",
    value: "76"
  },
  {
    id: "projects",
    title: "Grants Awarded",
    value: "12"
  },
  {
    id: "usdc",
    title: "USDC Allocated",
    value: "$99,000"
  },
  {
    id: "mplx",
    title: "MPLX Tokens Allocated",
    value: "590,000"
  },
  {
    id: "acceptance",
    title: "Acceptance Rate",
    value: "15.8%"
  },
  {
    id: "milestone",
    title: "Milestone-Based Grants",
    value: "85%"
  }
];
