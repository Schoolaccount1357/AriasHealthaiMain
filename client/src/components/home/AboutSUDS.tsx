import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export function AboutSUDS() {
  return (
    <section className="mb-12 bg-white p-6 md:p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Problem Statement</h2>
      
      <div className="prose max-w-none">
        <p className="mb-4">
          Many Veterans face isolation, stigma, and barriers to care — especially in substance use recovery.
          Traditional services don't always meet them where they are.
        </p>
        
        <ul className="mb-4 list-disc pl-5 space-y-2">
          <li>Limited access to timely mental health support</li>
          <li>Difficulty connecting with peers who truly understand their experiences</li>
          <li>Stigma around seeking help for substance use disorders</li>
          <li>Lack of privacy and anonymity in traditional support environments</li>
        </ul>
        
        <p className="mb-4">
          At AriasHealth.ai, we believe that combining AI technology with peer-to-peer connection creates
          a powerful support system that meets veterans exactly where they are in their recovery journey.
        </p>
        
        <div className="bg-accent/20 p-4 rounded-lg my-4">
          <h3 className="font-medium mb-2 text-primary">How Peer Support Helps:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Reduces feelings of isolation</li>
            <li>Provides practical advice from those with similar experiences</li>
            <li>Creates accountability in recovery</li>
            <li>Offers hope through seeing others' progress</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-6">
        <Link 
          href="/resources"
          className="text-primary hover:text-secondary font-medium inline-flex items-center"
        >
          Learn more about SUDS resources for veterans
          <ArrowRight className="h-5 w-5 ml-1" />
        </Link>
      </div>
    </section>
  );
}
