import { useState } from "react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accessibility, Eye, Type, Zap, Settings } from "lucide-react";

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isHighContrast,
    toggleHighContrast,
    fontSize,
    setFontSize,
    reducedMotion,
    toggleReducedMotion,
  } = useAccessibility();

  return (
    <>
      {/* Floating accessibility button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Open accessibility settings. Accessibility spelled out: A-C-C-E-S-S-I-B-I-L-I-T-Y"
              title="Accessibility Settings"
            >
              <Accessibility className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">
                Accessibility menu button. The word accessibility is spelled: A-C-C-E-S-S-I-B-I-L-I-T-Y. 
                Click to open accessibility options including high contrast mode, font size adjustment, and reduced motion settings.
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md glass-modal">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" aria-hidden="true" />
                <span>Accessibility Settings</span>
                <span className="sr-only">A-C-C-E-S-S-I-B-I-L-I-T-Y spelled out</span>
              </DialogTitle>
              <DialogDescription>
                Customize your viewing experience with accessibility options.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* High Contrast Mode */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    <span aria-label="High Contrast Mode - H-I-G-H C-O-N-T-R-A-S-T M-O-D-E">High Contrast Mode</span>
                  </CardTitle>
                  <CardDescription>
                    Increases contrast for better visibility
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="high-contrast"
                      checked={isHighContrast}
                      onCheckedChange={toggleHighContrast}
                      aria-describedby="high-contrast-description"
                    />
                    <Label htmlFor="high-contrast" className="text-sm">
                      {isHighContrast ? 'Enabled' : 'Disabled'}
                    </Label>
                  </div>
                  <p id="high-contrast-description" className="text-xs text-muted-foreground mt-2">
                    Enhances text and background contrast for improved readability
                  </p>
                </CardContent>
              </Card>

              {/* Font Size */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Type className="h-4 w-4" aria-hidden="true" />
                    <span aria-label="Font Size - F-O-N-T S-I-Z-E">Font Size</span>
                  </CardTitle>
                  <CardDescription>
                    Adjust text size for better readability
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={fontSize} onValueChange={setFontSize}>
                    <SelectTrigger aria-label="Select font size">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="extra-large">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-2">
                    Increases text size throughout the application
                  </p>
                </CardContent>
              </Card>

              {/* Reduced Motion */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Zap className="h-4 w-4" aria-hidden="true" />
                    <span aria-label="Reduced Motion - R-E-D-U-C-E-D M-O-T-I-O-N">Reduced Motion</span>
                  </CardTitle>
                  <CardDescription>
                    Minimizes animations and transitions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="reduced-motion"
                      checked={reducedMotion}
                      onCheckedChange={toggleReducedMotion}
                      aria-describedby="reduced-motion-description"
                    />
                    <Label htmlFor="reduced-motion" className="text-sm">
                      {reducedMotion ? 'Enabled' : 'Disabled'}
                    </Label>
                  </div>
                  <p id="reduced-motion-description" className="text-xs text-muted-foreground mt-2">
                    Reduces motion and animations that may cause discomfort
                  </p>
                </CardContent>
              </Card>

              {/* Keyboard Navigation Info */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Keyboard Navigation</CardTitle>
                  <CardDescription>
                    Use these keyboard shortcuts to navigate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Tab</span>
                      <span className="text-muted-foreground">Next element</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shift + Tab</span>
                      <span className="text-muted-foreground">Previous element</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Enter / Space</span>
                      <span className="text-muted-foreground">Activate button</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Escape</span>
                      <span className="text-muted-foreground">Close dialog</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}