import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AccessibilityContextType {
  isHighContrast: boolean;
  toggleHighContrast: () => void;
  fontSize: 'normal' | 'large' | 'extra-large';
  setFontSize: (size: 'normal' | 'large' | 'extra-large') => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  screenReaderAnnouncements: string[];
  announce: (message: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'extra-large'>('normal');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [screenReaderAnnouncements, setScreenReaderAnnouncements] = useState<string[]>([]);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedHighContrast = localStorage.getItem('accessibility-high-contrast') === 'true';
    const savedFontSize = localStorage.getItem('accessibility-font-size') as 'normal' | 'large' | 'extra-large' || 'normal';
    const savedReducedMotion = localStorage.getItem('accessibility-reduced-motion') === 'true';

    setIsHighContrast(savedHighContrast);
    setFontSize(savedFontSize);
    setReducedMotion(savedReducedMotion);

    // Apply initial accessibility classes
    updateDocumentClasses(savedHighContrast, savedFontSize, savedReducedMotion);
  }, []);

  const updateDocumentClasses = (highContrast: boolean, fontSizeVal: string, reducedMotionVal: boolean) => {
    const root = document.documentElement;
    
    // High contrast mode
    if (highContrast) {
      root.classList.add('accessibility-high-contrast');
    } else {
      root.classList.remove('accessibility-high-contrast');
    }

    // Font size
    root.classList.remove('accessibility-font-large', 'accessibility-font-extra-large');
    if (fontSizeVal === 'large') {
      root.classList.add('accessibility-font-large');
    } else if (fontSizeVal === 'extra-large') {
      root.classList.add('accessibility-font-extra-large');
    }

    // Reduced motion
    if (reducedMotionVal) {
      root.classList.add('accessibility-reduced-motion');
    } else {
      root.classList.remove('accessibility-reduced-motion');
    }
  };

  const toggleHighContrast = () => {
    const newValue = !isHighContrast;
    setIsHighContrast(newValue);
    localStorage.setItem('accessibility-high-contrast', newValue.toString());
    updateDocumentClasses(newValue, fontSize, reducedMotion);
    announce(newValue ? 'High contrast mode enabled' : 'High contrast mode disabled');
  };

  const handleSetFontSize = (size: 'normal' | 'large' | 'extra-large') => {
    setFontSize(size);
    localStorage.setItem('accessibility-font-size', size);
    updateDocumentClasses(isHighContrast, size, reducedMotion);
    announce(`Font size changed to ${size}`);
  };

  const toggleReducedMotion = () => {
    const newValue = !reducedMotion;
    setReducedMotion(newValue);
    localStorage.setItem('accessibility-reduced-motion', newValue.toString());
    updateDocumentClasses(isHighContrast, fontSize, newValue);
    announce(newValue ? 'Reduced motion enabled' : 'Reduced motion disabled');
  };

  const announce = (message: string) => {
    setScreenReaderAnnouncements(prev => [...prev, message]);
    // Remove announcement after a short delay to keep the array clean
    setTimeout(() => {
      setScreenReaderAnnouncements(prev => prev.slice(1));
    }, 1000);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        isHighContrast,
        toggleHighContrast,
        fontSize,
        setFontSize: handleSetFontSize,
        reducedMotion,
        toggleReducedMotion,
        screenReaderAnnouncements,
        announce,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}

// Screen reader announcement component
export function ScreenReaderAnnouncements() {
  const { screenReaderAnnouncements } = useAccessibility();

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      role="status"
    >
      {screenReaderAnnouncements.map((announcement, index) => (
        <div key={index}>{announcement}</div>
      ))}
    </div>
  );
}