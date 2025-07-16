
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DailyQuiz from "./pages/DailyQuiz";
import Videos from "./pages/Videos";
import PastExams from "./pages/PastExams";
import StudentShowcase from "./pages/StudentShowcase";
import LearnWithAI from "./pages/LearnWithAI";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/daily-quiz" element={<DailyQuiz />} />
          <Route path="/learn-ai" element={<LearnWithAI />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/exams" element={<PastExams />} />
          <Route path="/students" element={<StudentShowcase />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
