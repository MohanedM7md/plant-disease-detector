import { TooltipProvider } from "@/components/ui/tooltip";
import {  Routes, Route } from "react-router";
import Index from "./pages/Index";

const App = () => (
    <TooltipProvider>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
    </TooltipProvider>
);

export default App;
