import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/resources", label: "Resources" },
    { href: "/resource-locator", label: "Find Local Support" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="h-12 w-12 relative">
              <svg viewBox="0 0 337 425" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                <path d="M168.092 95.9514C168.671 95.1142 169.985 95.5771 169.912 96.5925L165.624 155.91C165.613 156.069 165.564 156.222 165.481 156.358L84.1479 290.093C83.6592 290.896 82.4322 290.642 82.303 289.711L74.2901 231.981C74.2557 231.733 74.3157 231.481 74.4583 231.275L168.092 95.9514Z" fill="url(#paint0_linear_custom)"/>
                <path d="M236.682 319.13C236.971 320.109 235.779 320.841 235.036 320.14L101.193 193.905C100.828 193.561 100.775 193 101.067 192.593L169.539 97.3529C170.024 96.6775 171.074 96.8557 171.31 97.6536L236.682 319.13Z" fill="url(#paint1_linear_custom)"/>
                <defs>
                  <linearGradient id="paint0_linear_custom" x1="156.63" y1="111.867" x2="90.6838" y2="292.372" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A8E8C7"/>
                    <stop offset="1" stopColor="#252577"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_custom" x1="166.399" y1="109.845" x2="238.596" y2="352.426" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8DEFC9" stopOpacity="0.86"/>
                    <stop offset="0.72" stopColor="#10066A"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="ml-2 text-2xl font-semibold" style={{ color: "#10066A" }}>AriasHealth.ai</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-foreground hover:text-primary transition-colors py-2"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
