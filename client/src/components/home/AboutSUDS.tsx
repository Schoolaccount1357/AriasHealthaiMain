import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export function AboutSUDS() {
  return (
    <section className="mb-12 bg-white p-5 sm:p-6 md:p-8 rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">Understanding Substance Use Disorders</h2>
      
      <div className="prose max-w-none prose-sm sm:prose-base">
        <p className="mb-3 sm:mb-4 text-sm sm:text-base">
          Substance Use Disorders (SUDs) affect many veterans as they navigate the complexities of military-to-civilian transition. 
          These challenges require specialized understanding and support.
        </p>
        
        <div className="bg-accent/20 p-3 sm:p-4 rounded-lg my-4">
          <h3 className="font-medium mb-2 text-primary text-base sm:text-lg">Key Facts About Veterans & SUDs:</h3>
          <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-sm sm:text-base">
            <li>Veterans are twice as likely to develop substance use disorders compared to civilians</li>
            <li>Combat exposure and trauma significantly increase risk factors</li>
            <li>Co-occurring mental health conditions are common</li>
            <li>Early intervention and peer support improve outcomes significantly</li>
          </ul>
        </div>
        
        <p className="mb-3 sm:mb-4 text-sm sm:text-base">
          Our platform recognizes these unique challenges and provides specialized matching that considers 
          military experience, trauma exposure, and recovery stage to create the most effective peer connections.
        </p>
      </div>
      
      <div className="mt-5 sm:mt-6">
        <a 
          href="https://www.va.gov/health-care/health-needs-conditions/substance-use-problems/"
          target="_blank"
          rel="noopener noreferrer"
          className="group text-primary hover:text-secondary font-medium inline-flex items-center text-sm sm:text-base relative overflow-hidden"
        >
          <span className="relative z-10 inline-flex items-center transition-all duration-300 group-hover:translate-x-1">
            Visit Website
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
        </a>
      </div>
    </section>
  );
}
