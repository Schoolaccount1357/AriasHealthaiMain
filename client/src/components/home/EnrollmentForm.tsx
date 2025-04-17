import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { WaitlistFormData } from "@/utils/types";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { waitlistSchema } from "@shared/schema";

export function EnrollmentForm() {
  const { toast } = useToast();
  
  // Form for waitlist
  const waitlistForm = useForm<z.infer<typeof waitlistSchema>>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      serviceStatus: "",
      reasonForInterest: ""
    }
  });
  
  // API call to submit waitlist form
  const waitlistSubmitMutation = useMutation({
    mutationFn: async (data: WaitlistFormData) => {
      const response = await apiRequest("POST", "/api/waitlist/join", data);
      return response;
    },
    onSuccess: () => {
      toast({
        title: "You're on the list!",
        description: "Thank you for joining our waitlist. We'll notify you when AriasHealth.ai launches."
      });
      
      // Reset form
      waitlistForm.reset();
    },
    onError: (error) => {
      toast({
        title: "Submission Error",
        description: "There was an error adding you to the waitlist. Please try again.",
        variant: "destructive"
      });
      console.error("Waitlist submission error:", error);
    }
  });
  
  // Handle form submission
  const handleSubmit = (data: WaitlistFormData) => {
    waitlistSubmitMutation.mutate(data);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4">Join the Waitlist</h2>
        <p className="text-gray-600">
          Be among the first to access AriasHealth.ai's revolutionary peer support platform when we launch
        </p>
      </div>
      
      <Form {...waitlistForm}>
        <form onSubmit={waitlistForm.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={waitlistForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={waitlistForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={waitlistForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={waitlistForm.control}
            name="serviceStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Status</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active-duty">Active Duty</SelectItem>
                    <SelectItem value="veteran">Veteran</SelectItem>
                    <SelectItem value="family-member">Family Member</SelectItem>
                    <SelectItem value="healthcare-provider">Healthcare Provider</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={waitlistForm.control}
            name="reasonForInterest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Why are you interested in AriasHealth.ai? (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us why you're interested in our platform"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-center pt-4">
            <Button 
              type="submit" 
              className="w-full max-w-md bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3"
              disabled={waitlistSubmitMutation.isPending}
            >
              {waitlistSubmitMutation.isPending ? "Processing..." : "Join the Waitlist"}
            </Button>
          </div>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            By joining, you'll be first to know when we launch. We respect your privacy and will never share your information.
          </p>
        </form>
      </Form>
    </div>
  );
}