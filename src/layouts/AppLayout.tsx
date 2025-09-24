
import { Outlet, Link } from "react-router-dom"  //Para llamar componentes padres
import { ToastContainer } from "react-toastify"  //Notificacion 
import 'react-toastify/dist/ReactToastify.css' //Llalamos la hoja de estilos
import Logo from "@/components/Logo"
import NavMenu from "@/components/NavMenu"


export default function AppLayout() {
  return (

    <>
        <header className="bg-gray-800 py-5">
            <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                <div className="w-64"> 
                  <Link to = {`/`}>
                    <Logo />
                  </Link>
                </div>
                
                <NavMenu />
            </div>
            
        </header>

        <section className="max-w-screen-2xl mx-auto mt-10 p-5">
             <Outlet/> {/* Llama al componente hijo definido en Router*/}
        </section>
       
       <footer className="py-5">
        <p className="text-center">© {new Date().getFullYear()} UpTask. All Rights Reserved.</p>
       </footer>

       <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
       />
    </>

  )
}
