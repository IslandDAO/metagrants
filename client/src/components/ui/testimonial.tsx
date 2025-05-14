import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  projectName: string;
  projectType: string;
  testimonial: string;
  rating: number;
  year: number;
  initial?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  name,
  projectName,
  projectType,
  testimonial,
  rating,
  year,
  initial,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full border border-[#3c4759] bg-[#1c2431]">
        <CardContent className="p-6">
          <div className="flex items-start mb-4">
            <div className="mr-4">
              <div className="w-12 h-12 bg-[#3b82f6] rounded-full flex items-center justify-center text-[#f1f5fb] font-bold text-xl">
                {initial || name[0]}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-[#f1f5fb]">{projectName}</h3>
              <p className="text-[#b5bfcc] text-sm">{projectType}</p>
            </div>
          </div>
          <p className="text-[#b5bfcc] mb-4">{testimonial}</p>
          <div className="flex items-center mt-2">
            <div className="text-[#f97316] flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5"
                  fill={i < rating ? "currentColor" : "none"}
                />
              ))}
            </div>
            <div className="ml-2 text-sm text-[#b5bfcc]">Funded in {year}</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Testimonial;
