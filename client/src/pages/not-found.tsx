import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#121820]">
      <Card className="w-full max-w-md mx-4 border border-[#3c4759] bg-[#1c2431]">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-[#f97316]" />
            <h1 className="text-2xl font-bold text-[#f1f5fb]">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-[#40526c]">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
