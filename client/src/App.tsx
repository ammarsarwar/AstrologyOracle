import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ConstellationView from "@/pages/ConstellationView";
import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/constellation/:id" component={ConstellationView} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col h-screen">
          <Header />
          <main className="flex-1 overflow-hidden">
            <Router />
          </main>
          <MobileNavigation />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
