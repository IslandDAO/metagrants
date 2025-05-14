import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={cn(
        "bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition transform hover:scale-105 border border-[#a2dadb]",
        className
      )}>
        <div className="text-4xl font-bold text-[#c8444d] mb-2">{value}</div>
        <div className="text-[#40526c]">{title}</div>
      </Card>
    </motion.div>
  );
};

export default StatCard;
