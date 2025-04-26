import { Link } from "wouter";
import { Users, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#141e2f] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="font-bold text-xl mb-4">AriasHealth.ai</h3>
            <p className="text-white/80 text-sm mb-4">
              AI-powered peer matching for veterans dealing with substance use disorders.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-white/80 transition-colors" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-white/80 transition-colors" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/p/DIwQCspJw6o/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li><a href="#" className="hover:text-white transition-colors">SUDS Information</a></li>
              <li><a href="#" className="hover:text-white transition-colors">VA Resources</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Recovery Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Crisis Help</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Family Support</a></li>
            </ul>
          </div>
          
          {/* Column 3 - Program */}
          <div>
            <h3 className="font-bold text-lg mb-4">Program</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Research & Outcomes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partner With Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Volunteer</a></li>
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
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-white" />
                <span>1-800-555-VETS (8387)</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-white" />
                <span>123 Veterans Way<br />Washington, DC 20001</span>
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
