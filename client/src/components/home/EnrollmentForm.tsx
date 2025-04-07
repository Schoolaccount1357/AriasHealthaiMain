import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { FormStep, EnrollmentFormData } from "@/utils/types";
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
import { 
  basicInfoSchema,
  militaryBackgroundSchema,
  healthHistorySchema,
  preferencesSchema
} from "@shared/schema";

export function EnrollmentForm() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formSteps, setFormSteps] = useState<FormStep[]>([
    { id: 1, title: "Basic Information", isCompleted: false, isActive: true },
    { id: 2, title: "Military Background", isCompleted: false, isActive: false },
    { id: 3, title: "Health History", isCompleted: false, isActive: false },
    { id: 4, title: "Preferences", isCompleted: false, isActive: false }
  ]);
  
  // Form for step 1: Basic Information
  const basicInfoForm = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      gender: ""
    }
  });
  
  // Form for step 2: Military Background
  const militaryBackgroundForm = useForm<z.infer<typeof militaryBackgroundSchema>>({
    resolver: zodResolver(militaryBackgroundSchema),
    defaultValues: {
      branch: "",
      rank: "",
      serviceYears: "",
      deploymentCount: 0
    }
  });
  
  // Form for step 3: Health History
  const healthHistoryForm = useForm<z.infer<typeof healthHistorySchema>>({
    resolver: zodResolver(healthHistorySchema),
    defaultValues: {
      sudsHistory: "",
      treatmentHistory: "",
      currentStatus: "",
      mentalHealthConditions: ""
    }
  });
  
  // Form for step 4: Preferences
  const preferencesForm = useForm<z.infer<typeof preferencesSchema>>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      communicationPreference: "",
      peerPreferences: "",
      goals: "",
      additionalInfo: ""
    }
  });
  
  // Get the active form based on current step
  const getActiveForm = () => {
    switch (currentStep) {
      case 1:
        return basicInfoForm;
      case 2:
        return militaryBackgroundForm;
      case 3:
        return healthHistoryForm;
      case 4:
        return preferencesForm;
      default:
        return basicInfoForm;
    }
  };
  
  // Step validation mutation
  const validateStepMutation = useMutation({
    mutationFn: async ({ step, data }: { step: number; data: any }) => {
      const response = await apiRequest("POST", "/api/veterans/validate-step", { step, data });
      return response.json();
    },
    onSuccess: (_, { step }) => {
      // Mark current step as completed
      setFormSteps(prev => prev.map(s => 
        s.id === step ? { ...s, isCompleted: true, isActive: false } :
        s.id === step + 1 ? { ...s, isActive: true } : s
      ));
      
      // Move to next step
      setCurrentStep(prev => prev + 1);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: error instanceof Error ? error.message : "Please check your form inputs and try again."
      });
    }
  });
  
  // Form submission mutation
  const submitFormMutation = useMutation({
    mutationFn: async (data: EnrollmentFormData) => {
      const response = await apiRequest("POST", "/api/veterans/enroll", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Form Submitted Successfully",
        description: "Thank you for enrolling. We'll be in touch soon.",
      });
      
      // Reset forms and go back to step 1
      basicInfoForm.reset();
      militaryBackgroundForm.reset();
      healthHistoryForm.reset();
      preferencesForm.reset();
      
      setFormSteps(prev => prev.map(s => 
        s.id === 1 ? { ...s, isActive: true, isCompleted: false } :
        { ...s, isActive: false, isCompleted: false }
      ));
      
      setCurrentStep(1);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: error instanceof Error ? error.message : "There was an error submitting your form. Please try again."
      });
    }
  });
  
  // Handle next step
  const handleNextStep = () => {
    const form = getActiveForm();
    form.handleSubmit((data) => {
      validateStepMutation.mutate({ step: currentStep, data });
    })();
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setFormSteps(prev => prev.map(s => 
        s.id === currentStep ? { ...s, isActive: false } :
        s.id === currentStep - 1 ? { ...s, isActive: true } : s
      ));
      
      setCurrentStep(prev => prev - 1);
    }
  };
  
  // Handle final form submission
  const handleSubmit = () => {
    const form = getActiveForm();
    form.handleSubmit((finalStepData) => {
      // Combine all form data
      const completeFormData: EnrollmentFormData = {
        ...basicInfoForm.getValues(),
        ...militaryBackgroundForm.getValues(),
        ...healthHistoryForm.getValues(),
        ...finalStepData
      };
      
      submitFormMutation.mutate(completeFormData);
    })();
  };
  
  return (
    <section id="enrollment-form" className="bg-white p-6 md:p-8 rounded-lg shadow-lg mb-12">
      <h2 className="text-2xl font-bold mb-2 text-foreground">Pre-Enrollment Form</h2>
      <p className="text-muted-foreground mb-6">All information is kept confidential and secure. Your privacy is our priority.</p>
      
      {/* Form Progress Indicator */}
      <div className="form-progress-bar flex mb-8 border-b border-border">
        {formSteps.map((step) => (
          <button 
            key={step.id}
            className={`flex-1 text-center py-3 font-medium text-sm ${
              step.isActive ? 'active' : step.isCompleted ? 'completed' : 'text-muted-foreground'
            }`}
            onClick={() => {
              // Only allow clicking on completed steps or the current active step
              if (step.isCompleted || step.isActive) {
                setFormSteps(prev => prev.map(s => 
                  s.id === step.id ? { ...s, isActive: true } :
                  { ...s, isActive: false }
                ));
                setCurrentStep(step.id);
              }
            }}
          >
            {step.id}. {step.title}
          </button>
        ))}
      </div>
      
      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <Form {...basicInfoForm}>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={basicInfoForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your first name" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={basicInfoForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your last name" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={basicInfoForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Enter your email" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={basicInfoForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      placeholder="Enter your phone number" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={basicInfoForm.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={basicInfoForm.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        <SelectItem value="self-describe">Prefer to self-describe</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      )}
      
      {/* Step 2: Military Background */}
      {currentStep === 2 && (
        <Form {...militaryBackgroundForm}>
          <form className="space-y-6">
            <FormField
              control={militaryBackgroundForm.control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch of Service</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="army">Army</SelectItem>
                      <SelectItem value="navy">Navy</SelectItem>
                      <SelectItem value="air-force">Air Force</SelectItem>
                      <SelectItem value="marines">Marine Corps</SelectItem>
                      <SelectItem value="coast-guard">Coast Guard</SelectItem>
                      <SelectItem value="space-force">Space Force</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={militaryBackgroundForm.control}
              name="rank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Highest Rank Achieved</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your highest rank" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={militaryBackgroundForm.control}
              name="serviceYears"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Service</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select years served..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0-2">0-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="11-15">11-15 years</SelectItem>
                      <SelectItem value="16-20">16-20 years</SelectItem>
                      <SelectItem value="21+">21+ years</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={militaryBackgroundForm.control}
              name="deploymentCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Deployments</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
      
      {/* Step 3: Health History */}
      {currentStep === 3 && (
        <Form {...healthHistoryForm}>
          <form className="space-y-6">
            <FormField
              control={healthHistoryForm.control}
              name="sudsHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience with Substance Use</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please describe your experience with substance use..." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={healthHistoryForm.control}
              name="treatmentHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous Treatment (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe any previous treatment experiences..." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={healthHistoryForm.control}
              name="currentStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Recovery Status</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your current status..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="considering-change">Considering change</SelectItem>
                      <SelectItem value="early-recovery">Early recovery (0-6 months)</SelectItem>
                      <SelectItem value="sustained-recovery">Sustained recovery (6 months-1 year)</SelectItem>
                      <SelectItem value="long-term-recovery">Long-term recovery (1+ years)</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={healthHistoryForm.control}
              name="mentalHealthConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Mental Health Conditions (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List any diagnosed mental health conditions that may be relevant..." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
      
      {/* Step 4: Preferences */}
      {currentStep === 4 && (
        <Form {...preferencesForm}>
          <form className="space-y-6">
            <FormField
              control={preferencesForm.control}
              name="communicationPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Communication Method</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred method..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="video">Video chat</SelectItem>
                      <SelectItem value="text">Text-based chat</SelectItem>
                      <SelectItem value="group">Group sessions</SelectItem>
                      <SelectItem value="individual">Individual sessions</SelectItem>
                      <SelectItem value="combination">Combination of methods</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={preferencesForm.control}
              name="peerPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peer Matching Preferences (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe any preferences for peer matching (e.g., similar service branch, age, etc.)..." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={preferencesForm.control}
              name="goals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goals for Participation</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What do you hope to achieve through this program?" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={preferencesForm.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any other information you'd like to share..." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
      
      {/* Form Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {currentStep > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevStep}
            disabled={validateStepMutation.isPending || submitFormMutation.isPending}
          >
            Previous
          </Button>
        ) : (
          <div></div> // Empty div to maintain flex spacing
        )}
        
        {currentStep < 4 ? (
          <Button
            type="button"
            onClick={handleNextStep}
            disabled={validateStepMutation.isPending}
          >
            {validateStepMutation.isPending ? "Processing..." : "Next Step"}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={submitFormMutation.isPending}
          >
            {submitFormMutation.isPending ? "Submitting..." : "Submit Form"}
          </Button>
        )}
      </div>
    </section>
  );
}
