import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Link } from "wouter";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookie-consent");
    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    setShowConsent(false);
  };

  const handleDismiss = () => {
    // Set a session-only consent
    // This will show the banner again on next visit
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-50 p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex-1 pr-4">
          <h3 className="text-lg font-semibold mb-2">Cookie Consent</h3>
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            This website uses cookies to enhance user experience and analyze site usage. We only use essential cookies and anonymized analytics. 
            By using our website, you consent to our use of cookies in accordance with our{" "}
            <Link href="/privacy-policy" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-row gap-2 mt-2 md:mt-0">
          <Button variant="secondary" size="sm" onClick={handleDismiss}>
            <X className="h-4 w-4 mr-1" />
            Dismiss
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}