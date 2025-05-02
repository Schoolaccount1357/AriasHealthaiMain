# AriasHealth.ai Project Instructions

## Recent Changes

### Removal of Subheadline from Specific Pages

**Component Modified**: `client/src/components/ui/PageHeader.tsx`

**Description of Changes**:
- The subheadline "Mental Health, Reimagined for Veterans" has been removed from the following pages:
  - Resources page (`/resources` route)
  - Resource Locator page (`/resource-locator` route)

**Implementation Details**:
1. Added `useLocation` hook from `wouter` to determine the current route
2. Added logic to conditionally hide the tagline based on the current route
3. Added a new optional `hideTagline` prop to allow manual control when needed
4. The tagline continues to appear on the homepage and other pages where appropriate

**Code Implementation**:
```jsx
// Hide tagline on resources and resource-locator pages
const shouldHideTagline = 
  hideTagline || 
  location === "/resources" || 
  location === "/resource-locator" ||
  location.startsWith("/resource-locator/");

// Later in the JSX...
{tagline && !shouldHideTagline && (
  <h2 className="text-2xl font-semibold mb-4 text-gradient">{tagline}</h2>
)}
```
