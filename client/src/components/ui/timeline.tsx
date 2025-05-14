import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TimelineStep {
  number: number;
  title: string;
  description: string;
}

interface TimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export const Timeline = ({ steps, className }: TimelineProps) => {
  return (
    <div className={cn("relative", className)}>
      {/* Main connecting line */}
      <div className="absolute top-0 bottom-0 left-8 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-blue-500 opacity-40 rounded-full mx-auto"></div>
      
      <div className="space-y-12">
        {steps.map((step, index) => (
          <motion.div 
            key={index} 
            className="relative flex items-start group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Animated circle */}
            <div className="flex-shrink-0 w-16 h-16 mr-6 relative">
              <div className="absolute inset-0 bg-[#1a2436] border-2 border-indigo-500/30 rounded-full flex items-center justify-center z-10 shadow-lg shadow-indigo-500/10 group-hover:border-indigo-400 transition-all">
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {step.number}
                </span>
              </div>
              
              {/* Pulsing effect */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 bg-indigo-500 blur-md transition-opacity"></div>
            </div>
            
            {/* Content card with gradient border */}
            <div className="bg-[#1c2431] p-6 rounded-lg border border-[#364156] flex-grow transform transition-all duration-300 hover:translate-x-1 hover:shadow-lg shadow-indigo-900/5 relative">
              {/* Gradient top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-lg"></div>
              
              <h3 className="text-xl font-bold text-[#f1f5fb] mb-2">{step.title}</h3>
              <p className="text-[#b5bfcc]">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}