
import { useParams, Navigate, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectAPI"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import TaskList from "@/components/tasks/TaskList"


export default function ProjectDetailsView() {

    const params = useParams()  //Obtenemos los valores pasados en param
    const projectId = params.projectId!   //Capturamos el projectID
    const navigate = useNavigate() //Instanciamos (activamos) la funcion de navigate para refirigir en botones

    const { data, isLoading, isError } = useQuery({
        queryKey: ['projectDetails', projectId],  //Tenemos que definir un unique key en useQuery pero aqui con el id para que cree diferentes keys 
        queryFn: () => getProjectById(projectId),  //Funcion que conecta con la API
        retry: false   //cancelamos que lo reintente
    })

    if(isLoading) return "Loading..."  //Captura cuando ste cargando el query

    if(isError) return <Navigate to='/404'/>  //Nos navega a una pagina de error

    if(data) return (  //   Si existen datos entonces regresamos el TSX
                <>
                    <h1 className="text-5xl font-black">{data.projectName}</h1>
                    <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

                    <nav className="my-5 flex gap-3">
                        <button
                            type="button"
                            className="bg-violet-500 hover:bg-violet-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-4xl"
                            onClick={() => navigate(location.pathname + '?newTask=true')}
                        >Create Task</button>
                    </nav>

                    <TaskList
                        tasks={data.tasks}
                    />

                    <AddTaskModal/>
                    
                </>
            )  

}
