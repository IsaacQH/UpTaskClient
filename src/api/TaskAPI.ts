import api from "@/lib/axios";  //Link de la api
import { type TaskFormData, type Project } from "../types";  //importamos el typo de dato
import { isAxiosError } from "axios";  //Funcion para capturar error de axios

type TaskAPI= {
    formData: TaskFormData,
    projectId: Project['_id']
}

export async function createTask({formData, projectId} : Pick<TaskAPI, 'formData' | 'projectId'> ) {
    try {
        const url = `/projects/${projectId}/tasks`
        const { data } = await api.post<string>(url, formData)  // Extraemos data. Hacemos un post al URL indicado con los datos de formData
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response)  //Si existe error en axios y hay una respuesta en el error
         throw new Error(error.response.data.error)   //Creamos el error segun el mensaje del backend
    }
}