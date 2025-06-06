import { useState } from "react";
import { FAQItem } from "@/utils/types";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "How is my privacy protected?",
      answer: "Your privacy is our top priority. We use end-to-end encryption for all communications, and your personal information is protected according to HIPAA standards. All data is stored securely, and we never share your information with third parties without your explicit consent.",
      isOpen: false
    },
    {
      id: 2,
      question: "How does the matching algorithm work?",
      answer: "Our AI-powered matching system analyzes multiple factors including service background, recovery stage, personal interests, and communication preferences. Natural Language Processing (NLP) helps identify compatible peers based on your unique experiences and goals for recovery.",
      isOpen: false
    },
    {
      id: 3,
      question: "Is this program only for veterans with diagnosed SUDS?",
      answer: "No, our program is open to all veterans who are concerned about substance use, whether formally diagnosed or not. We also welcome veterans in all stages of recovery, from those just beginning to consider change to those with years of sobriety who want to support others.",
      isOpen: false
    },
    {
      id: 4,
      question: "What if I need immediate help?",
      answer: "This program is not designed for crisis situations. If you need immediate assistance, please contact the Veterans Crisis Line at 1-800-273-8255 and Press 1, or text 838255. For substance use emergencies, call 911 or go to your nearest emergency room.",
      isOpen: false
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Frequently Asked Questions</h2>
      
      <div className="space-y-4">
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((faq) => (
            <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
              <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors py-4 px-4 bg-white rounded-lg shadow hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-2 text-muted-foreground bg-white border-t border-border">
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
