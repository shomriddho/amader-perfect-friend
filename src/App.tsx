import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HomePage from "@/pages/HomePage";
import LettersPage from "@/pages/LettersPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/letters" element={<LettersPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
