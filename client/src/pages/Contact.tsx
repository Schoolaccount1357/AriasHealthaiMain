import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, MessageSquare, Phone, MapPin } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  }),
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters."
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters."
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log(data);
    // Here you would typically send the data to your API
    alert("Thank you for your message. We'll get back to you soon!");
    form.reset();
  }

  return (
    <MainLayout>
      <PageHeader
        title="Contact Us" 
        description="Have questions about AriasHealth.ai? Get in touch with our team."
      />

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="bg-[#141e2f] text-white p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="mr-3 h-5 w-5 text-[#3e64dd] mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-300">support@ariashealth.ai</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="mr-3 h-5 w-5 text-[#3e64dd] mt-0.5" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-300">(888) 555-1234</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-[#3e64dd] mt-0.5" />
                <div>
                  <p className="font-medium">Office</p>
                  <p className="text-gray-300">1234 Innovation Dr, Suite 500<br />San Diego, CA 92121</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-medium mb-3">Hours of Operation</h4>
              <p className="text-gray-300">Monday - Friday: 9:00 AM - 5:00 PM PST</p>
            </div>
            
            <div className="mt-8">
              <p className="text-sm text-gray-300">
                For immediate crisis support, please call the Veterans Crisis Line at 988 and press 1.
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="youremail@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="What is this regarding?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="How can we help you?" 
                        className="min-h-[150px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-[#3e64dd] hover:bg-[#2a4bba]"
                size="lg"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </MainLayout>
  );
}