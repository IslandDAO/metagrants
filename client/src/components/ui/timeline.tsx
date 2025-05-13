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

const Timeline: React.FC<TimelineProps> = ({ steps, className }) => {
  return (
    <div className={cn("relative", className)}>
      {/* Desktop Timeline */}
      <div className="hidden md:block">
        <div className="h-1 bg-gray-200 absolute top-9 left-0 right-0 z-0"></div>
        <div className="flex justify-between relative z-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="w-1/4 px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-secondary font-bold">{step.number}</span>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 mx-2">
                <h3 className="font-semibold text-lg mb-2 text-secondary">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Mobile Timeline */}
      <div className="md:hidden">
        <div className="w-1 bg-gray-200 absolute top-0 bottom-0 left-4 z-0"></div>
        <div className="space-y-6 relative z-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="flex"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center mr-4">
                <span className="text-secondary font-bold text-sm">{step.number}</span>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 flex-1">
                <h3 className="font-semibold text-lg mb-2 text-secondary">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
