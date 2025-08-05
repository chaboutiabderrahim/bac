
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import DailyQuiz from "./pages/DailyQuiz";
import Videos from "./pages/Videos";
import PastExams from "./pages/PastExams";
import StudentShowcase from "./pages/StudentShowcase";
import LearnWithAI from "./pages/LearnWithAI";
import PreviousStudentDashboard from "./pages/PreviousStudentDashboard";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <RoleBasedRoute allowedRoles={['regular_student']}>
                    <Index />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              <Route path="/auth" element={<Auth />} />
              <Route path="/daily-quiz" element={
                <ProtectedRoute>
                  <RoleBasedRoute allowedRoles={['regular_student']}>
                    <DailyQuiz />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              <Route path="/learn-ai" element={
                <ProtectedRoute>
                  <RoleBasedRoute allowedRoles={['regular_student']}>
                    <LearnWithAI />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              <Route path="/videos" element={
                <ProtectedRoute>
                  <RoleBasedRoute allowedRoles={['regular_student']}>
                    <Videos />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              <Route path="/exams" element={
                <ProtectedRoute>
                  <RoleBasedRoute allowedRoles={['regular_student']}>
                    <PastExams />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              <Route path="/students" element={
                <ProtectedRoute>
                  <RoleBasedRoute allowedRoles={['regular_student']}>
                    <StudentShowcase />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              <Route path="/previous-student-dashboard" element={
                <ProtectedRoute>
                  <RoleBasedRoute allowedRoles={['previous_student']}>
                    <PreviousStudentDashboard />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              <Route path="/unauthorized" element={<Unauthorized />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
