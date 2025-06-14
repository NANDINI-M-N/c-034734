
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ServerError from "./pages/ServerError";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import Interviews from "./pages/Interviews";
import Candidates from "./pages/Candidates";
import InterviewRoom from "./pages/InterviewRoom";
import CandidateDashboard from "./pages/CandidateDashboard";
import Schedule from "./pages/Schedule";
import AdminDashboard from "./pages/AdminDashboard";
import Reports from "./pages/Reports";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Protected Routes */}
              <Route 
                path="/recruiter-dashboard" 
                element={
                  <ProtectedRoute requireRole="recruiter">
                    <RecruiterDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/candidate-dashboard" 
                element={
                  <ProtectedRoute requireRole="candidate">
                    <CandidateDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin-dashboard" 
                element={
                  <ProtectedRoute requireRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/interviews" 
                element={
                  <ProtectedRoute>
                    <Interviews />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/candidates" 
                element={
                  <ProtectedRoute requireRole="recruiter">
                    <Candidates />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/interview-room" 
                element={
                  <ProtectedRoute>
                    <InterviewRoom />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/schedule" 
                element={
                  <ProtectedRoute>
                    <Schedule />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reports" 
                element={
                  <ProtectedRoute requireRole="recruiter">
                    <Reports />
                  </ProtectedRoute>
                } 
              />
              
              {/* Error Routes */}
              <Route path="/error" element={<ServerError />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
