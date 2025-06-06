import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Instagram, Mail } from "lucide-react";

export function FinalCTA() {
  return (
    <footer className="bg-[#141e2f] text-white">
      {/* Footer Links Section */}
      <section className="px-10 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="font-semibold text-lg mb-4">AriasHealth.ai</h3>
              <p className="text-sm text-white/70 mb-4">
                AI-powered peer matching for veterans dealing with substance use disorders.
              </p>
              <div className="flex space-x-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="tel:1-800-827-1000" className="hover:text-white transition-colors">VA Treatment (1-800-827-1000)</a></li>
                <li><a href="#" className="hover:text-white transition-colors">VA Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Recovery Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Crisis Help</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Family Support</a></li>
              </ul>
            </div>

            {/* Program */}
            <div>
              <h4 className="font-semibold mb-4">Program</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Research & Outcomes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partner With Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Volunteer</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-white/70">
                <a href="mailto:info@ariashealth.ai" className="flex items-center hover:text-white transition-colors">
                  <Mail className="h-4 w-4 mr-2" />
                  info@ariashealth.ai
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="mt-8 pt-6 border-t border-white/20 text-center">
            <p className="text-sm text-white/70 mb-2">
              AriasHealth.ai was incubated at Harvard University and MIT
            </p>
            <p className="text-xs text-white/50 mb-4">
              © 2025 AriasHealth.ai. All rights reserved. | 
              <a href="#" className="hover:text-white/70 transition-colors ml-1">Privacy Policy</a> | 
              <a href="#" className="hover:text-white/70 transition-colors ml-1">Terms of Service</a>
            </p>
            <div className="border-t border-white/20 pt-4">
              <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]" style={{textShadow: '0 0 25px rgba(255, 255, 255, 0.5), 0 0 35px rgba(255, 255, 255, 0.3), 0 0 45px rgba(255, 255, 255, 0.2)'}}>
                You don't have to do this alone. Find your people. Stay connected.
              </h2>
              <Button 
                asChild
                className="bg-[#3e64dd] text-white hover:bg-[#2a4bba] transition-colors"
                size="lg"
              >
                <Link href="#enrollment-form">
                  Join the Waitlist
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}