import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PlatformSelection from "./pages/PlatformSelection";
import ImageUpload from "./pages/ImageUpload";
import AdForm from "./pages/AdForm";
import GeneratedAds from "./pages/GeneratedAds";
import AdLibrary from "./pages/AdLibrary";
import ChatHistory from "./pages/ChatHistory";
import Refinement from "./pages/Refinement";
import BrandProfile from "./pages/BrandProfile";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-ad" element={<PlatformSelection />} />
          <Route path="/image-upload" element={<ImageUpload />} />
          <Route path="/ad-form" element={<AdForm />} />
          <Route path="/ad-library" element={<AdLibrary />} />
          <Route path="/chat-history" element={<ChatHistory />} />
          <Route path="/generated-ads" element={<GeneratedAds />} />
          <Route path="/refinement" element={<Refinement />} />
          <Route path="/brand-profile" element={<BrandProfile />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
