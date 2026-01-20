import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Timetable from "./pages/Timetable";
import Attendance from "./pages/Attendance";
import Academics from "./pages/Academics";
import Leave from "./pages/Leave";
import Assessments from "./pages/Assessments";
import Communication from "./pages/Communication";
import Counseling from "./pages/Counseling";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/communication" element={<Communication />} />
          <Route path="/counseling" element={<Counseling />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
