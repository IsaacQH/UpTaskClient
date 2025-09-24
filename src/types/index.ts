//Archivo de los tipados y schemas

import {z} from "zod";


//  -------------- PROJECT -----------------
//Schema de projecto
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
})

//Schema de projectos en ARRAY
export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true
    })
)

//Creamos el type para Project
export type Project = z.infer<typeof projectSchema>  
//Creamos el type para ProjectFormData usando solo los modelos que pedimos
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'> 


//  -------------- TASK -----------------

//Definimos las opciones de status
export const TaskStatusSchema = z.enum([ "pending" , "onHold" , "inProgress",  "underReview" , "complete" ]) 

//Schema de Tasks
export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: TaskStatusSchema  //Debe ser uno de los definidos arriba
})

//Tipo de dato para task
export type Task = z.infer<typeof taskSchema>
//Tipo de dato para FormTask
export type TaskFormData = Pick<Task, 'name' | 'description'>