import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
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
import { ChevronLeft, ChevronRight, Clock, Users, Heart, Shield } from "lucide-react";
import { waitlistSchema } from "@shared/schema";

export function SimpleEnrollmentForm() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
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

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const waitlistSubmitMutation = useMutation({
    mutationFn: async (data: z.infer<typeof waitlistSchema>) => {
      const response = await apiRequest("POST", "/api/waitlist/join", data);
      return response;
    },
    onSuccess: () => {
      toast({
        title: "You're on the list!",
        description: "Thank you for joining our waitlist. We'll notify you when AriasHealth.ai launches."
      });
      waitlistForm.reset();
      setCurrentStep(1);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to join waitlist. Please try again.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (values: z.infer<typeof waitlistSchema>) => {
    waitlistSubmitMutation.mutate(values);
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Basic Information</h3>
              <p className="text-muted-foreground text-sm">Let's start with some basic details about you</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={waitlistForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" className="h-12" {...field} />
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
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" className="h-12" {...field} />
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
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Service Information</h3>
              <p className="text-muted-foreground text-sm">Tell us about your military connection</p>
            </div>

            <FormField
              control={waitlistForm.control}
              name="serviceStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Status *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your service status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active-duty">Active Duty</SelectItem>
                      <SelectItem value="veteran">Veteran</SelectItem>
                      <SelectItem value="family-member">Family Member</SelectItem>
                      <SelectItem value="supporter">Supporter</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Your Interest</h3>
              <p className="text-muted-foreground text-sm">Help us understand what brings you here</p>
            </div>

            <FormField
              control={waitlistForm.control}
              name="reasonForInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Why are you interested in AriasHealth.ai?</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us what draws you to our platform..." 
                      className="resize-none min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Almost Done!</h3>
              <p className="text-muted-foreground text-sm">Review your information and join our waitlist</p>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div><strong>Name:</strong> {waitlistForm.watch("firstName")} {waitlistForm.watch("lastName")}</div>
              <div><strong>Email:</strong> {waitlistForm.watch("email")}</div>
              <div><strong>Service Status:</strong> {waitlistForm.watch("serviceStatus")}</div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-8 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Join the Waitlist for Early Access
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Be among the first to experience AI-powered peer support when we launch.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Estimated completion time: 2-3 minutes</span>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardTitle className="text-lg">Step {currentStep} of {totalSteps}</CardTitle>
                <CardDescription>
                  {currentStep === 1 && "Basic Information"}
                  {currentStep === 2 && "Service Information"}
                  {currentStep === 3 && "Your Interest"}
                  {currentStep === 4 && "Review & Submit"}
                </CardDescription>
              </div>
              <div className="text-sm text-muted-foreground">
                {Math.round(progressPercentage)}% Complete
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </CardHeader>

          <CardContent>
            <Form {...waitlistForm}>
              <form onSubmit={waitlistForm.handleSubmit(onSubmit)} className="space-y-6">
                {renderStepContent()}
              </form>
            </Form>
            
            {/* Navigation buttons - clearly visible */}
            <div className="mt-8 pt-6 border-t-2 border-muted">
              <div className="flex gap-4">
                {currentStep > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={previousStep}
                    className="flex-1 h-14 text-lg font-semibold"
                  >
                    <ChevronLeft className="h-5 w-5 mr-2" />
                    Previous
                  </Button>
                )}
                
                {currentStep < totalSteps ? (
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    className="flex-1 h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Next Step
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    type="button"
                    onClick={waitlistForm.handleSubmit(onSubmit)}
                    className="flex-1 h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={waitlistSubmitMutation.isPending}
                  >
                    {waitlistSubmitMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Joining...
                      </>
                    ) : (
                      "Join Waitlist"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}