interface PageHeaderProps {
  title: string;
  tagline?: string;
  description?: string;
}

export function PageHeader({ title, tagline = "A Global Wellness and Resilience Platform", description }: PageHeaderProps) {
  return (
    <div className="mb-10 text-center">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      {tagline && (
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