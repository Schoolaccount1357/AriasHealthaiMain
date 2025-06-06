import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
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
import { ChevronLeft, ChevronRight, Clock, Users, Heart, Shield } from "lucide-react";
import { waitlistSchema } from "@shared/schema";

export function EnhancedEnrollmentForm() {
  const { toast } = useToast();
  const { announce } = useAccessibility();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  // Enhanced form with comprehensive demographics
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

  // Step navigation functions
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      announce(`Moved to step ${currentStep + 1} of ${totalSteps}`);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      announce(`Moved to step ${currentStep - 1} of ${totalSteps}`);
    }
  };

  // API call to submit waitlist form
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
      announce("Successfully joined waitlist");
      
      // Reset form and go back to step 1
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

  // Step content components with mobile-optimized touch targets
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" aria-hidden="true" />
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
                      <Input 
                        placeholder="Enter your first name" 
                        className="h-12 text-base touch-manipulation"
                        {...field} 
                      />
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
                      <Input 
                        placeholder="Enter your last name" 
                        className="h-12 text-base touch-manipulation"
                        {...field} 
                      />
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
                    <Input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="h-12 text-base touch-manipulation"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={waitlistForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        type="tel" 
                        placeholder="(555) 123-4567" 
                        className="h-12 text-base touch-manipulation"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={waitlistForm.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        className="h-12 text-base touch-manipulation"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold mb-2">Military & Demographics</h3>
              <p className="text-muted-foreground text-sm">Help us understand your background</p>
            </div>

            <FormField
              control={waitlistForm.control}
              name="serviceStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Status *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 text-base touch-manipulation">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={waitlistForm.control}
                name="militaryBranch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Military Branch</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base touch-manipulation">
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="army">Army</SelectItem>
                        <SelectItem value="navy">Navy</SelectItem>
                        <SelectItem value="air-force">Air Force</SelectItem>
                        <SelectItem value="marines">Marines</SelectItem>
                        <SelectItem value="coast-guard">Coast Guard</SelectItem>
                        <SelectItem value="space-force">Space Force</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={waitlistForm.control}
                name="serviceYears"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Service</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base touch-manipulation">
                          <SelectValue placeholder="Select years" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0-2">0-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="11-15">11-15 years</SelectItem>
                        <SelectItem value="16-20">16-20 years</SelectItem>
                        <SelectItem value="20+">20+ years</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={waitlistForm.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base touch-manipulation">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={waitlistForm.control}
                name="race"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Race/Ethnicity</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base touch-manipulation">
                          <SelectValue placeholder="Select race/ethnicity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="white">White/Caucasian</SelectItem>
                        <SelectItem value="black">Black/African American</SelectItem>
                        <SelectItem value="hispanic">Hispanic/Latino</SelectItem>
                        <SelectItem value="asian">Asian</SelectItem>
                        <SelectItem value="native-american">Native American</SelectItem>
                        <SelectItem value="pacific-islander">Pacific Islander</SelectItem>
                        <SelectItem value="mixed">Mixed Race</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold mb-2">Support & Preferences</h3>
              <p className="text-muted-foreground text-sm">Tell us about your support needs</p>
            </div>

            <FormField
              control={waitlistForm.control}
              name="substanceUseHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Substance Use Experience</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 text-base touch-manipulation">
                        <SelectValue placeholder="Select your experience" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="current-struggle">Currently struggling</SelectItem>
                      <SelectItem value="in-recovery">In recovery</SelectItem>
                      <SelectItem value="past-experience">Past experience</SelectItem>
                      <SelectItem value="supporting-someone">Supporting someone else</SelectItem>
                      <SelectItem value="no-experience">No personal experience</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={waitlistForm.control}
              name="communicationPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Communication</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 text-base touch-manipulation">
                        <SelectValue placeholder="How would you like to communicate?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="video-chat">Video Chat</SelectItem>
                      <SelectItem value="voice-only">Voice Only</SelectItem>
                      <SelectItem value="text-chat">Text Chat</SelectItem>
                      <SelectItem value="group-sessions">Group Sessions</SelectItem>
                      <SelectItem value="one-on-one">One-on-One</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={waitlistForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State/Region</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., California, TX" 
                        className="h-12 text-base touch-manipulation"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={waitlistForm.control}
                name="languagePreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language Preference</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base touch-manipulation">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="bilingual">Bilingual (English/Spanish)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold mb-2">Final Details</h3>
              <p className="text-muted-foreground text-sm">Just a few more details to personalize your experience</p>
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
                      className="resize-none min-h-[100px] text-base touch-manipulation" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={waitlistForm.control}
              name="referralSource"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How did you hear about us?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 text-base touch-manipulation">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="social-media">Social Media</SelectItem>
                      <SelectItem value="friend-family">Friend/Family</SelectItem>
                      <SelectItem value="healthcare-provider">Healthcare Provider</SelectItem>
                      <SelectItem value="va-resource">VA Resource</SelectItem>
                      <SelectItem value="search-engine">Search Engine</SelectItem>
                      <SelectItem value="news-article">News Article</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-8 bg-gradient-to-b from-background to-muted/30" role="region" aria-labelledby="enrollment-heading">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 id="enrollment-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Join the Waitlist for Early Access
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Be among the first to experience AI-powered peer support when we launch.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" aria-hidden="true" />
            <span>Estimated completion time: 3-5 minutes</span>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardTitle className="text-lg">Step {currentStep} of {totalSteps}</CardTitle>
                <CardDescription>
                  {currentStep === 1 && "Basic Information"}
                  {currentStep === 2 && "Military & Demographics"}
                  {currentStep === 3 && "Support & Preferences"}
                  {currentStep === 4 && "Final Details"}
                </CardDescription>
              </div>
              <div className="text-sm text-muted-foreground">
                {Math.round(progressPercentage)}% Complete
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2" aria-label={`Form progress: ${Math.round(progressPercentage)}% complete`} />
          </CardHeader>

          <CardContent>
            <Form {...waitlistForm}>
              <form onSubmit={waitlistForm.handleSubmit(onSubmit)} className="space-y-6">
                {renderStepContent()}

                {/* Navigation buttons with mobile optimization */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                  {currentStep > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={previousStep}
                      className="h-12 flex-1 text-base touch-manipulation min-h-[44px]"
                      aria-label="Go to previous step"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                      Previous
                    </Button>
                  )}
                  
                  {currentStep < totalSteps ? (
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      className="h-12 flex-1 text-base bg-primary hover:bg-primary/90 touch-manipulation min-h-[44px]"
                      aria-label="Go to next step"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" aria-hidden="true" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      className="h-12 flex-1 text-base bg-primary hover:bg-primary/90 touch-manipulation min-h-[44px]"
                      disabled={waitlistSubmitMutation.isPending}
                      aria-label="Submit enrollment form"
                    >
                      {waitlistSubmitMutation.isPending ? "Joining..." : "Join Waitlist"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Skip navigation link for accessibility */}
        <div className="mt-4 text-center">
          <button
            type="button"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
            onClick={() => setCurrentStep(totalSteps)}
          >
            Skip to final step
          </button>
        </div>
      </div>
    </section>
  );
}