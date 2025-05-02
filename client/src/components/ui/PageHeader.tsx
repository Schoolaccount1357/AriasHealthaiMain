import { useLocation } from "wouter";

interface PageHeaderProps {
  title: string;
  tagline?: string;
  description?: string;
  hideTagline?: boolean;
}

export function PageHeader({ 
  title, 
  tagline = "Mental Health, Reimagined for Veterans", 
  description,
  hideTagline = false
}: PageHeaderProps) {
  const [location] = useLocation();
  
  // Hide tagline on resources and resource-locator pages
  const shouldHideTagline = 
    hideTagline || 
    location === "/resources" || 
    location === "/resource-locator" ||
    location.startsWith("/resource-locator/");
    
  console.log("Current location:", location, "Should hide tagline:", shouldHideTagline);

  return (
    <div className="mb-10 text-center">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      {tagline && !shouldHideTagline && (
        <h2 className="text-2xl font-semibold mb-4 text-gradient">{tagline}</h2>
      )}
      {description && (
        <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}