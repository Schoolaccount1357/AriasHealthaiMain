import { Link } from "wouter";
import { Users, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="font-bold text-lg mb-4">Veterans Connect</h3>
            <p className="text-neutral-lighter text-sm mb-4">
              Supporting veterans through connection, community, and compassionate care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-neutral-lighter">
              <li><a href="#" className="hover:text-accent transition-colors">SUDS Information</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">VA Resources</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Recovery Support</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Crisis Help</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Family Support</a></li>
            </ul>
          </div>
          
          {/* Column 3 - Program */}
          <div>
            <h3 className="font-bold text-lg mb-4">Program</h3>
            <ul className="space-y-2 text-sm text-neutral-lighter">
              <li><a href="#" className="hover:text-accent transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Research & Outcomes</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Partner With Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Volunteer</a></li>
            </ul>
          </div>
          
          {/* Column 4 - Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-neutral-lighter">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-accent" />
                <span>support@veteransconnect.org</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-accent" />
                <span>1-800-555-VETS (8387)</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-accent" />
                <span>123 Veterans Way<br />Washington, DC 20001</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t border-neutral text-center text-sm text-neutral-lighter">
          <p>
            &copy; {currentYear} Veterans Connect. All rights reserved. | 
            <Link href="/privacy-policy" className="hover:text-accent transition-colors ml-1 mr-1">
              Privacy Policy
            </Link> | 
            <Link href="/terms-of-service" className="hover:text-accent transition-colors ml-1">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
