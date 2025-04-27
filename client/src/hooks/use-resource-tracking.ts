import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type ResourceType = "call" | "text" | "chat";

export function useResourceTracking() {
  const { toast } = useToast();
  
  const trackResourceUsage = useMutation({
    mutationFn: async (resourceType: ResourceType) => {
      return apiRequest("/api/resource/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ resourceType })
      });
    },
    onError: (error) => {
      // We don't want to show errors to users for tracking - just log to console
      console.error("Failed to track resource usage:", error);
    }
  });

  const trackResourceClick = (resourceType: ResourceType, action: () => void) => {
    // Track the resource usage
    trackResourceUsage.mutate(resourceType);
    
    // Execute the action (e.g., making a call, sending a text)
    action();
  };

  return { trackResourceClick };
}