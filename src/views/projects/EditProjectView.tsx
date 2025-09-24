import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectAPI"
import EditProjectForm from "@/components/projects/EditProjectForm"


export default function EditProjectView() {

    const params = useParams()  //Obtenemos los valores pasados en param
    const projectId = params.projectId!   //Capturamos el projectID

      const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId],  //Tenemos que definir un unique key en useQuery pero aqui con el id para que cree diferentes keys 
        queryFn: () => getProjectById(projectId),  //Funcion que conecta con la API
        retry: false   //cancelamos que lo reintente
       })

        if(isLoading) return "Loading..."  //Captura cuadnoe ste cargando el query
        if(isError) return <Navigate to='/404'/>  //Nos navega a una pagina de error

        if(data) return <EditProjectForm  data={data} />  //Si existe el data, llamamos al FORM
}
