import { cn } from "@/lib/utils";

interface IslandDaoLogoProps {
  className?: string;
}

const IslandDaoLogo: React.FC<IslandDaoLogoProps> = ({ className }) => {
  return (
    <svg 
      className={cn("h-12 w-auto", className)}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M100 25C83.17 41.83 66.33 58.67 49.5 75.5C58.17 66.83 66.83 58.17 75.5 49.5C75.5 58.17 75.5 66.83 75.5 75.5C83.67 67.33 91.83 59.17 100 51C108.17 59.17 116.33 67.33 124.5 75.5C124.5 66.83 124.5 58.17 124.5 49.5C133.17 58.17 141.83 66.83 150.5 75.5C133.67 58.67 116.83 41.83 100 25Z"/>
      <path d="M100 75.5V110.5C100 118.5 104.5 125 100 125C95.5 125 100 118.5 100 110.5V75.5Z"/>
      <path d="M80 135.5C80 142.95 88.95 149 100 149C111.05 149 120 142.95 120 135.5C120 135.5 100 135.5 80 135.5Z"/>
      <path d="M65 152.5H135V157.5H65V152.5Z"/>
      <path d="M75 162.5H125V167.5H75V162.5Z"/>
      <path d="M85 172.5H115V177.5H85V172.5Z"/>
    </svg>
  );
};

export default IslandDaoLogo;
