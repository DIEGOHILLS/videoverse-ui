
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import AuthenticatedHeader from "./components/AuthenticatedHeader";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import RealHome from "./pages/RealHome";
import Watch from "./pages/Watch";
import RealWatch from "./pages/RealWatch";
import Auth from "./pages/Auth";
import VideoUpload from "./components/VideoUpload";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {user ? (
        <>
          <AuthenticatedHeader onToggleSidebar={toggleSidebar} />
          <div className="flex">
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
            <main className={`flex-1 transition-all duration-300 ${
              sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
            }`}>
              <Routes>
                <Route path="/" element={<RealHome />} />
                <Route path="/watch" element={<RealWatch />} />
                <Route path="/upload" element={<VideoUpload />} />
                <Route path="/explore" element={<RealHome />} />
                <Route path="/subscriptions" element={<RealHome />} />
                <Route path="/library" element={<RealHome />} />
                <Route path="/category/:category" element={<RealHome />} />
                <Route path="/search" element={<RealHome />} />
                <Route path="/auth" element={<Navigate to="/" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={
            <>
              <Header onToggleSidebar={toggleSidebar} />
              <div className="flex">
                <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
                <main className={`flex-1 transition-all duration-300 ${
                  sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
                }`}>
                  <div className="max-w-4xl mx-auto p-6 text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to VideoVerse</h1>
                    <p className="text-xl text-muted-foreground mb-8">
                      Discover, watch, and share amazing videos from creators around the world.
                    </p>
                    <button 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-medium text-lg transition-colors"
                      onClick={() => window.location.href = '/auth'}
                    >
                      Get Started
                    </button>
                  </div>
                </main>
              </div>
            </>
          } />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      )}
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <div className="dark">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </div>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
