import { Menu } from "lucide-react";
import MetaplexLogo from "../logos/metaplex-logo";

interface MobileNavProps {
  onMenuToggle: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ onMenuToggle }) => {
  return (
    <div className="md:hidden fixed top-0 left-0 z-40 w-full bg-secondary text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button 
          onClick={onMenuToggle}
          className="mr-4 focus:outline-none"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex items-center">
          <MetaplexLogo className="h-5 w-auto mr-2" />
          <span className="text-sm font-semibold">MetaplexDAO Grants</span>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
