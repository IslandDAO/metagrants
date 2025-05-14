import { cn } from "@/lib/utils";

interface MetaplexLogoProps {
  className?: string;
}

const MetaplexLogo: React.FC<MetaplexLogoProps> = ({ className }) => {
  return (
    <div className={cn("font-bold text-white", className)}>
      <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
        Metaplex
      </span>
    </div>
  );
};

export default MetaplexLogo;