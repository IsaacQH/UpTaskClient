import { useLocation, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getTaskById } from "@/api/TaskAPI"
import EditTaskModal from "./EditTaskModal"
import { Navigate } from "react-router-dom"



export default function EditTaskData() {

     //Leer si Modal existe   ---
    const location =  useLocation() //Instanciamos, este nos permite leer en objeto lo que haya en la URL.
    const queryParams = new URLSearchParams(location.search)  //Busca numero de params pasados en la URL
    const taskId = queryParams.get('editTask')!   //Revisa que exista el valor buscado en el queryParams (true, null)
    //----

    //Obntenemos los datos del 
    const params = useParams()
    const projectId = params.projectId!   //OPbtenemos el project id del url

    const { data, isError } = useQuery({
        queryKey: ['task', taskId],   //Le damos el identificador con task y id para que sea unico
        queryFn: () => getTaskById({projectId, taskId}),  //Funcion que conecta con la API
        enabled: !!taskId,     //En vase a una comporbacion de que exista el id se ejecuta
        retry: false
    })

    if(isError) return <Navigate to={'/404'}/>    //Si detecta un error en el query, madna al 404 

    if(data) return <EditTaskModal data={data} taskId={taskId}/>   //Si existen datos regresamos el Modal
}
