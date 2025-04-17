import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export function AboutSUDS() {
  return (
    <section className="mb-12 bg-white p-6 md:p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Understanding Substance Use Disorders</h2>
      
      <div className="prose max-w-none">
        <p className="mb-4">
          Substance Use Disorders (SUDS) affect many veterans who have served our country. 
          These conditions can develop from various factors including:
        </p>
        
        <ul className="mb-4 list-disc pl-5 space-y-2">
          <li>Combat exposure and related trauma</li>
          <li>Transition challenges when returning to civilian life</li>
          <li>Physical injuries and related pain management</li>
          <li>Mental health conditions including PTSD, depression, and anxiety</li>
        </ul>
        
        <p className="mb-4">
          Recovery is possible with the right support network. AriasHealth.ai creates a 
          confidential environment where veterans are matched with ideal peers who understand 
          their specific challenges based on our AI pairing technology.
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
