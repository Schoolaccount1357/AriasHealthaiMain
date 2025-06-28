import { Button } from "@/components/ui/button";
import { Phone, Globe } from "lucide-react";
import { useResourceTracking } from "@/hooks/use-resource-tracking";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CrisisResourcesProps {
  variant?: "full" | "compact";
  className?: string;
}

export function CrisisResources({ variant = "full", className = "" }: CrisisResourcesProps) {
  const { trackResourceClick } = useResourceTracking();

  if (variant === "compact") {
    return (
      <div className={`p-3 rounded-lg border border-[#3e64dd]/30 bg-[#3e64dd]/5 ${className}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#3e64dd]">In crisis? Get help now</p>
            <p className="text-xs text-muted-foreground">Free, confidential support 24/7</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => trackResourceClick("call", () => window.location.href = "tel:988")}
              size="sm"
              className="bg-[#3e64dd] hover:bg-[#2a4bba]"
            >
              <Phone className="h-3 w-3 mr-1" />
              Call
            </Button>
            <Button 
              onClick={() => trackResourceClick("text", () => window.location.href = "sms:838255")}
              size="sm"
              variant="outline"
              className="border-[#3e64dd] text-[#3e64dd] hover:bg-[#3e64dd]/10"
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
          <h2 className="text-xl font-semibold flex items-center">
            <Phone className="h-5 w-5 mr-2 text-[#3e64dd]" />
            Need immediate help?
          </h2>
          <p className="mt-1 text-sm">
            If you're in crisis or having thoughts of suicide, speak with a trained counselor now.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={() => trackResourceClick("call", () => window.location.href = "tel:988")}
            className="bg-[#3e64dd] hover:bg-[#2a4bba] transition-all duration-300 relative overflow-hidden group shadow-md hover:shadow-lg active:scale-[0.98]"
            size="sm"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
            <span className="relative z-10 flex items-center">
              <Phone className="h-3 w-3 mr-1 transition-transform duration-300 group-hover:scale-110" />
              Call 988 - Press 1
            </span>
          </Button>

          <Button 
            onClick={() => trackResourceClick("text", () => window.location.href = "sms:838255")}
            className="bg-[#3e64dd] hover:bg-[#2a4bba] transition-all duration-300 relative overflow-hidden group shadow-md hover:shadow-lg active:scale-[0.98]"
            size="sm"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
            <span className="relative z-10 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Text 838255
            </span>
          </Button>

          <Button 
            onClick={() => trackResourceClick("chat", () => window.open("https://www.veteranscrisisline.net/get-help/chat", "_blank"))}
            className="bg-[#3e64dd] hover:bg-[#2a4bba] transition-all duration-300 relative overflow-hidden group shadow-md hover:shadow-lg active:scale-[0.98]"
            size="sm"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
            <span className="relative z-10 flex items-center">
              <Globe className="h-3 w-3 mr-1 transition-transform duration-300 group-hover:scale-110" />
              Chat Online
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}