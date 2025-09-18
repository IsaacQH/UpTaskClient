import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateProjectView from "./views/projects/CreateProjectView";

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route  element={<AppLayout />}>  {/* Route global de Applicacion y Layout */}
                    <Route path='/' element={<DashboardView/>} /> {/* Definimos ruta y view general */} 
                    <Route path='/projects/create' element={<CreateProjectView/>} /> 
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

