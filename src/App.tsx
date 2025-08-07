
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SimpleLandingPage from "./pages/SimpleLandingPage";
import ReviewsPage from "./pages/ReviewsPage";
import ReviewFormPage from "./pages/ReviewFormPage";
import FoodieReviewsPage from "./pages/FoodieReviewsPage";
import RestaurantReviewsPage from "./pages/RestaurantReviewsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SimpleLandingPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/reviews/foodie" element={<FoodieReviewsPage />} />
          <Route path="/reviews/restaurant" element={<RestaurantReviewsPage />} />
          <Route path="/review/:id" element={<ReviewFormPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
