
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import Interviews from "./pages/Interviews";
import Candidates from "./pages/Candidates";
import InterviewRoom from "./pages/InterviewRoom";
import CandidateDashboard from "./pages/CandidateDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
          <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/interview-room" element={<InterviewRoom />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
