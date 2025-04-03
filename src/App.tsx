
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Artistes from "./pages/Artistes";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Export from "./pages/Export";
import { AuthProvider } from "./contexts/AuthContext";
import AuthGuard from "./components/AuthGuard";
import Dashboard from "./pages/admin/Dashboard";
import ArtistesAdmin from "./pages/admin/ArtistesAdmin";
import SiteSettings from "./pages/admin/SiteSettings";
import CategoriesAdmin from "./pages/admin/CategoriesAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <Routes>
          {/* Pages publiques */}
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/artistes" element={<Artistes />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/export" element={<Export />} />
          
          {/* Pages d'administration protégées */}
          <Route 
            path="/admin" 
            element={
              <AuthGuard requireAdmin={true}>
                <Dashboard />
              </AuthGuard>
            } 
          />
          <Route 
            path="/admin/artistes" 
            element={
              <AuthGuard requireAdmin={true}>
                <ArtistesAdmin />
              </AuthGuard>
            } 
          />
          <Route 
            path="/admin/parametres" 
            element={
              <AuthGuard requireAdmin={true}>
                <SiteSettings />
              </AuthGuard>
            } 
          />
          <Route 
            path="/admin/categories" 
            element={
              <AuthGuard requireAdmin={true}>
                <CategoriesAdmin />
              </AuthGuard>
            } 
          />
          
          {/* Redirection et 404 */}
          <Route path="/admin/*" element={<Navigate to="/admin" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
