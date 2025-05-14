import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlowingPalms } from "@/components/ui/smooth-palms";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#121820] text-white">
      {/* Animated background */}
      <GlowingPalms />
      
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 z-20 relative">
        <h1 className="text-6xl sm:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-6">
          404
        </h1>
        
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-[#f1f5fb]">
          Island Not Found
        </h2>
        
        <p className="text-lg sm:text-xl text-[#b5bfcc] max-w-lg mb-8">
          Looks like you've drifted off into uncharted waters. This island hasn't been discovered yet.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/">
              Return to Home Island
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-900/20">
            <Link to="/grants">
              Explore Grant Islands
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
