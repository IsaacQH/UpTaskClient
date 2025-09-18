//Archivo de los tipados y schemas

import {z} from "zod";


//  --------------PROJECT -----------------
//Schema de projecto
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
})
//Creamos el type para Project
export type Project = z.infer<typeof projectSchema>  
//Creamos el type para ProjectFormData usando solo los modelos que pedimos
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'> 


