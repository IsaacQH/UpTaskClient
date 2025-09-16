import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route  element={<AppLayout />}>  {/* Route global de Applicacion y Layout */}
                    <Route path='/' element={<DashboardView/>} index /> {/* Definimos ruta y view general */} 
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

