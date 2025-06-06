import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { WaitlistFormData } from "@/utils/types";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { ChevronLeft, ChevronRight, Clock, Users, Heart } from "lucide-react";
import { waitlistSchema } from "@shared/schema";

export function EnrollmentForm() {
  const { toast } = useToast();
  const { announce } = useAccessibility();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  // Form for enhanced waitlist with demographics
  const waitlistForm = useForm<z.infer<typeof waitlistSchema>>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      race: "",
      ethnicity: "",
      serviceStatus: "",
      militaryBranch: "",
      serviceYears: "",
      deploymentHistory: "",
      location: "",
      zipCode: "",
      educationLevel: "",
      employmentStatus: "",
      householdIncome: "",
      substanceUseHistory: "",
      mentalHealthStatus: "",
      previousTreatment: "",
      communicationPreferences: "",
      supportGroupPreferences: "",
      languagePreference: "",
      reasonForInterest: "",
      referralSource: ""
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
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-5 sm:p-6 md:p-10">
      <div className="text-center mb-6 sm:mb-10">
        <div className="max-w-3xl mx-auto bg-[#10066A] p-4 rounded-lg text-white mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-bold mb-2">Help Shape the Future of Peer Support</h3>
          <p className="text-xs sm:text-sm">
            We're conducting a research study to improve mental health resources through technology.
            Your voice matters.
          </p>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-3 sm:mb-4">Join the Waitlist</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-2">
          Be among the first to access AriasHealth.ai's revolutionary peer support platform when we launch
        </p>
      </div>
      
      <Form {...waitlistForm}>
        <form onSubmit={waitlistForm.handleSubmit(handleSubmit)} className="space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FormField
              control={waitlistForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">First Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" className="h-11 sm:h-10" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
            
            <FormField
              control={waitlistForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Last Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" className="h-11 sm:h-10" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={waitlistForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" type="email" className="h-11 sm:h-10" {...field} />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
          
          <FormField
            control={waitlistForm.control}
            name="serviceStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">Service Status</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-11 sm:h-10">
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
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
          
          <FormField
            control={waitlistForm.control}
            name="reasonForInterest"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">Why are you interested in AriasHealth.ai? (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us why you're interested in our platform"
                    className="min-h-[120px] sm:min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
          
          <div className="flex justify-center pt-2 sm:pt-4">
            <Button 
              type="submit" 
              className="w-full py-6 sm:py-3 text-base sm:max-w-md bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold relative overflow-hidden group transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
              disabled={waitlistSubmitMutation.isPending}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
              <span className="relative z-10 group-active:scale-[0.98] transition-transform duration-100">
                {waitlistSubmitMutation.isPending ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Join the Waitlist"
                )}
              </span>
            </Button>
          </div>
          
          <p className="text-center text-xs sm:text-sm text-gray-500 mt-4">
            By joining, you'll be first to know when we launch. We respect your privacy and will never share your information.
          </p>
        </form>
      </Form>
    </div>
  );
}