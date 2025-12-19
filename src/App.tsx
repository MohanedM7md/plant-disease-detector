import { TooltipProvider } from "@/components/ui/tooltip";
import {  Routes, Route } from "react-router";
import Index from "./pages";

const App = () => (
    <TooltipProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        </Routes>
    </TooltipProvider>
);

export default App;
