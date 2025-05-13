import { cn } from "@/lib/utils";

interface IslandDaoLogoProps {
  className?: string;
}

const IslandDaoLogo: React.FC<IslandDaoLogoProps> = ({ className }) => {
  return (
    <svg 
      className={cn("text-black", className)} 
      viewBox="0 0 512 512" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M512 256C512 397.385 397.385 512 256 512C114.615 512 0 397.385 0 256C0 114.615 114.615 0 256 0C397.385 0 512 114.615 512 256Z"
        fill="#BCECBE"
      />
      <g fill="currentColor">
        <path d="M330 264C379.12 214.88 379.12 174.5 330 125.5C280.88 174.62 280.88 214.88 330 264Z" />
        <path d="M255.5 264C304.62 214.88 304.62 174.5 255.5 125.5C206.38 174.62 206.38 214.88 255.5 264Z" />
        <path d="M182 264C231.12 214.88 231.12 174.5 182 125.5C132.88 174.62 132.88 214.88 182 264Z" />
        <path d="M256 264L256 375" />
        <path d="M256 400a25 25 0 0 0 25-25H231a25 25 0 0 0 25 25Z" />
        <path d="M180 400H332" />
        <path d="M204 435H308" />
        <path d="M228 470H284" />
      </g>
    </svg>
  );
};

export default IslandDaoLogo;