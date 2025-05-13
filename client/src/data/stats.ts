export interface Stat {
  id: string;
  title: string;
  value: string;
}

export const stats: Stat[] = [
  {
    id: "funding",
    title: "Total Funding Distributed",
    value: "$1.2M"
  },
  {
    id: "projects",
    title: "Projects Funded",
    value: "42"
  },
  {
    id: "countries",
    title: "Countries Represented",
    value: "18"
  },
  {
    id: "success",
    title: "Project Success Rate",
    value: "87%"
  }
];
