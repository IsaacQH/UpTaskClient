import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { dashboardProjectSchema, type Project, type ProjectFormData } from "../types";

//Metodo para hacer post del proyecto
export async function createProject(formData:ProjectFormData) {
    try {
        const {data} = await api.post('/projects', formData)  //Hacemos post con los datos y destructuramos la respuesta data para guardar el valor
        return data  //Regresamos el data
    } catch (error) {
        if(isAxiosError(error) && error.response){  //Si existe un error en el Axios y en la respuesta
           throw new Error(error.response.data.error)   //Creamos el error segun el mensaje del backend
        }
        
    }
}   

//Metodo para mostrar TODOS los proyectos
export async function getProjects() {
    try {
        const {data} = await api.get('/projects')  //Hacemos get en la API.
        const response = dashboardProjectSchema.safeParse(data) //le damos el schema
        if(response.success) return response  //Regresamos el data
    } catch (error) {
        if(isAxiosError(error) && error.response){  //Si existe un error en el Axios y en la respuesta
           throw new Error(error.response.data.error)   //Creamos el error segun el mensaje del backend
        }
        
    }
}   

//Metodo para obtener UN proyecto
export async function getProjectById(id:Project['_id']) {
    try {
        const {data} = await api.get(`/projects/${id}`)  //Hacemos get en la API hacia el 
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){  //Si existe un error en el Axios y en la respuesta
           throw new Error(error.response.data.error)   //Creamos el error segun el mensaje del backend
        }
        
    }
}   

type ProjectAPIType = {
    formData: ProjectFormData,
    projectId: Project['_id']
}

//Metodo para obtener UN proyecto
export async function updateProject({formData, projectId} : ProjectAPIType) {
    try {
        const {data} = await api.put<string>(`/projects/${projectId}`, formData)  //Hacemos update en la API hacia el 
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){  //Si existe un error en el Axios y en la respuesta
           throw new Error(error.response.data.error)   //Creamos el error segun el mensaje del backend
        }      
    }
}   

//Metodo para eliminar UN proyecto
export async function deleteProject(projectId:Project['_id']) {
    try {
        const {data} = await api.delete<string>(`/projects/${projectId}`)  //Hacemos update en la API hacia el 
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){  //Si existe un error en el Axios y en la respuesta
           throw new Error(error.response.data.error)   //Creamos el error segun el mensaje del backend
        }      
    }
}   