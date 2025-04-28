import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type ResourceType = "call" | "text" | "chat";
type StateResourceTracking = {
  state: string;
  resourceName: string;
  category: string;
};

export function useResourceTracking() {
  const { toast } = useToast();
  
  const trackResourceUsage = useMutation({
    mutationFn: async (resourceType: ResourceType) => {
      return apiRequest("POST", "/api/resource/track", { resourceType });
    },
    onError: (error) => {
      // We don't want to show errors to users for tracking - just log to console
      console.error("Failed to track resource usage:", error);
    }
  });
  
  const trackStateResourceUsage = useMutation({
    mutationFn: async (data: StateResourceTracking) => {
      return apiRequest("POST", "/api/resource/track-state", data);
    },
    onError: (error) => {
      // We don't want to show errors to users for tracking - just log to console
      console.error("Failed to track state resource usage:", error);
    }
  });

  const trackResourceClick = (resourceType: ResourceType, action: () => void) => {
    // Track the resource usage
    trackResourceUsage.mutate(resourceType);
    
    // Execute the action (e.g., making a call, sending a text)
    action();
  };
  
  const trackStateResourceClick = (data: StateResourceTracking, action: () => void) => {
    // Track the state resource usage
    trackStateResourceUsage.mutate(data);
    
    // Execute the action (e.g., visiting the website)
    action();
  };

  return { trackResourceClick, trackStateResourceClick };
}