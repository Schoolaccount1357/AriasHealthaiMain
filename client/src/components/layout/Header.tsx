import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [activeLink, setActiveLink] = useState("/");

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/resource-locator", label: "Public Support" },
    { href: "/resources", label: "Veteran Resources" },
  ];

  useEffect(() => {
    setActiveLink(location);
  }, [location]);

  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          <Link href="/">
            <div className="flex items-center cursor-pointer group">
              <div className="h-16 w-16 sm:h-20 sm:w-20 relative transition-transform duration-300 group-hover:scale-105">
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
              <span className="-ml-3 sm:-ml-4 text-lg sm:text-xl font-semibold transition-all duration-300 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#10066A] group-hover:to-[#3e64dd]" style={{ color: "#10066A" }}>AriasHealth.ai</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "relative py-1 px-2 transition-all duration-300 ease-in-out", 
                  "hover:text-primary",
                  "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 after:ease-out",
                  activeLink === link.href ? 
                    "text-primary font-semibold after:w-full" : 
                    "text-foreground after:w-0 hover:after:w-full"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  aria-label="Menu - M-E-N-U"
                  className="group transition-all duration-200 hover:bg-[#10066A]/5 px-4 py-3 min-h-[44px]"
                >
                  <span className="text-base font-medium">Menu</span>
                  <span className="sr-only">Menu spelled out: M-E-N-U</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav aria-label="Mobile navigation menu" className="mt-8">
                  <div className="flex flex-col space-y-4">
                    <Link href="/resource-locator">
                      <a className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
                        Public Support
                      </a>
                    </Link>
                    <Link href="/resources">
                      <a className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
                        Veterans Resources
                      </a>
                    </Link>
                    {navLinks.map((link, index) => (
                      <Link 
                        key={link.href} 
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "relative py-3 px-3 transition-all duration-200 ease-in-out text-lg",
                          "hover:text-primary hover:pl-6 focus:text-primary focus:pl-6",
                          "after:absolute after:left-0 after:top-0 after:bottom-0 after:w-0.5 after:bg-primary after:transition-all after:duration-200 after:ease-out",
                          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded",
                          activeLink === link.href ? 
                            "pl-6 text-primary font-semibold after:h-full" : 
                            "text-foreground after:h-0 hover:after:h-full focus:after:h-full"
                        )}
                        aria-label={`Navigate to ${link.label} page`}
                        tabIndex={0}
                      >
                        <span aria-hidden="false">{link.label}</span>
                        <span className="sr-only">
                          {link.label.split('').join('-')} - Navigation item {index + 1} of {navLinks.length}
                        </span>
                      </Link>
                    ))}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}