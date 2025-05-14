import { cn } from "@/lib/utils";
import metaplexLogoPath from "@/assets/logos/metaplex-logo.jpg";

interface MetaplexLogoProps {
  className?: string;
}

const MetaplexLogo: React.FC<MetaplexLogoProps> = ({ className }) => {
  return (
    <img 
      src={metaplexLogoPath} 
      alt="Metaplex Logo" 
      className={cn(className)} 
    />
  );
};

export default MetaplexLogo;