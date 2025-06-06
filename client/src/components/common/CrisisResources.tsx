import { Button } from "@/components/ui/button";
import { Phone, Globe } from "lucide-react";
import { useResourceTracking } from "@/hooks/use-resource-tracking";

interface CrisisResourcesProps {
  variant?: "full" | "compact";
  className?: string;
}

export function CrisisResources({ variant = "full", className = "" }: CrisisResourcesProps) {
  const { trackResourceClick } = useResourceTracking();
  
  if (variant === "compact") {
    return (
      <div className={`p-3 rounded-lg border border-blue-700/30 bg-blue-700/5 ${className}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-700">In crisis? Get help now</p>
            <p className="text-xs text-slate-600">Free, confidential support 24/7</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => trackResourceClick("call", () => window.location.href = "tel:988")}
              size="sm"
              className="bg-blue-700 hover:bg-blue-800"
            >
              <Phone className="h-3 w-3 mr-1" />
              Call
            </Button>
            <Button 
              onClick={() => trackResourceClick("text", () => window.location.href = "sms:838255")}
              size="sm"
              variant="outline"
              className="border-blue-700 text-blue-700 hover:bg-blue-700/10"
            >
              Text
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`p-5 rounded-lg bg-[#141e2f] text-white ${className}`}>
      <div className="flex flex-col space-y-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center text-white">
            <Phone className="h-5 w-5 mr-2 text-emerald-400" />
            Need immediate help?
          </h2>
          <p className="mt-1 text-sm text-gray-200">
            If you're in crisis or having thoughts of suicide, speak with a trained counselor now.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={() => trackResourceClick("call", () => window.location.href = "tel:988")}
            className="bg-blue-700 hover:bg-blue-800"
            size="sm"
          >
            <Phone className="h-3 w-3 mr-1" />
            Call 988 - Press 1
          </Button>
          
          <Button 
            onClick={() => trackResourceClick("text", () => window.location.href = "sms:838255")}
            className="bg-blue-700 hover:bg-blue-800"
            size="sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Text 838255
          </Button>
          
          <Button 
            onClick={() => trackResourceClick("chat", () => window.open("https://www.veteranscrisisline.net/get-help/chat", "_blank"))}
            className="bg-blue-700 hover:bg-blue-800"
            size="sm"
          >
            <Globe className="h-3 w-3 mr-1" />
            Chat Online
          </Button>
        </div>
      </div>
    </div>
  );
}