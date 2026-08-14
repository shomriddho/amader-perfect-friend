import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "./pages/Main";

// Lazy load pages so they split into separate JS chunks
const HomePage = lazy(() => import("@/pages/HomePage"));
const LettersPage = lazy(() => import("@/pages/LettersPage"));

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-sky-50" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/letters" element={<LettersPage />} />
            <Route path="/main" element={<Main />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
