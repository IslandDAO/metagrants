import { cn } from "@/lib/utils";

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
      <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-gray-200 mx-auto"></div>
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="relative flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center z-10 mr-4">
              {step.number}
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex-grow">
              <h3 className="text-xl font-bold text-gray-800 mb-1">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}