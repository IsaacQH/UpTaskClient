import api from "@/lib/axios";  //Link de la api
import { type TaskFormData, type Project, type Task } from "../types";  //importamos el typo de dato
import { isAxiosError } from "axios";  //Funcion para capturar error de axios

type TaskAPI= {
    formData: TaskFormData,
    projectId: Project['_id'],
    taskId: Task['_id']
}

export async function createTask({formData, projectId} : Pick<TaskAPI, 'formData' | 'projectId'> ) {
    try {
        const url = `/projects/${projectId}/tasks` //URL De la API para create tasks
        const { data } = await api.post<string>(url, formData)  // Extraemos data. Hacemos un post al URL indicado con los datos de formData
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){  //Si existe error en axios y hay una respuesta en el error
            throw new Error(error.response.data.error)   //Creamos el error segun el mensaje del backend
        }
    }
}

export async function getTaskById({projectId, taskId} :  Pick<TaskAPI, 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}` //URL De la API para create tasks
        const {data} = await api.get(url) // Extraemos data. Hacemos un post al URL indicado con los datos de formData
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){  //Si existe error en axios y hay una respuesta en el error
            throw new Error(error.response.data.error)   //Creamos el error segun el mensaje del backend
        }
    }
}

export async function updateTask({projectId, taskId, formData}:Pick<TaskAPI,  'projectId' | 'taskId' | 'formData'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}` //URL De la API para create tasks
        const {data} = await api.put<string>(url, formData) // Extraemos data. Hacemos un post al URL indicado con los datos de formData
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){  //Si existe error en axios y hay una respuesta en el error
            throw new Error(error.response.data.error)   //Creamos el error segun el mensaje del backend
        }
    }
}

export async function deleteTask({taskId, projectId}:Pick<TaskAPI, 'taskId' | 'projectId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}` //URL De la API para create tasks
        const {data} = await api.delete<string>(url) // Extraemos data. Hacemos un post al URL indicado con los datos de formData
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){  //Si existe error en axios y hay una respuesta en el error
            throw new Error(error.response.data.error)   //Creamos el error segun el mensaje del backend
        }
    }
}