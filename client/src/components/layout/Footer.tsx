import { Link } from "wouter";
import { Mail, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#1e3a8a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="font-bold text-xl mb-4">AriasHealth.ai</h3>
            <p className="text-white/80 text-sm mb-4">
              AI-powered peer support to reduce isolation and prevent substance use
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/p/DIwQCspJw6o/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li><a href="https://www.va.gov/health-care/health-needs-conditions/substance-use-problems/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">VA Treatment (1-800-827-1000)</a></li>
              <li><a href="https://www.va.gov/health/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">VA Resources</a></li>
              <li><a href="https://www.maketheconnection.net" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Recovery Support</a></li>
              <li><a href="https://www.veteranscrisisline.net" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Crisis Help</a></li>
              <li><a href="https://www.mentalhealth.va.gov" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Family Support</a></li>
            </ul>
          </div>
          
          {/* Column 3 - Program */}
          <div>
            <h3 className="font-bold text-lg mb-4">Program</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/#success-stories" className="hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link href="/#research" className="hover:text-white transition-colors">Research & Outcomes</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Partner With Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Volunteer</Link></li>
            </ul>
          </div>
          
          {/* Column 4 - Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-white" />
                <span>info@ariashealth.ai</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm text-white/80">
          <div className="mb-2">
            <p>AriasHealth.ai was incubated at Harvard University and MIT</p>
          </div>
          <p>
            &copy; {currentYear} AriasHealth.ai. All rights reserved. | 
            <Link href="/privacy-policy" className="text-white hover:text-white/80 transition-colors ml-1 mr-1 font-medium">
              Privacy Policy
            </Link> | 
            <Link href="/terms-of-service" className="text-white hover:text-white/80 transition-colors ml-1 font-medium">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}