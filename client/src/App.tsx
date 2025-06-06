import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import ResourceLocator from "./pages/ResourceLocator";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import VideoRoom from "./pages/VideoRoom";
import NotFound from "./pages/not-found";
import { MainLayout } from "./components/layout/MainLayout";
import { ThemeProvider } from "./components/common/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <MainLayout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/contact" component={Contact} />
            <Route path="/resources" component={Resources} />
            <Route path="/resource-locator" component={ResourceLocator} />
            <Route path="/terms" component={TermsOfService} />
            <Route path="/privacy" component={PrivacyPolicy} />
            <Route path="/room/:roomId" component={VideoRoom} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </MainLayout>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;