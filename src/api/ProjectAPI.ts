import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type { ProjectFormData } from "types";


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