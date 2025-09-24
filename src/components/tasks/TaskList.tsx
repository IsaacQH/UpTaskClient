

import type { Task } from "@/types/index"
import TaskCard from "./TaskCard"

//------ Tipados del compoente ---------
type TaskListProps = {  //Tipado de props
    tasks: Task[]
}
type GroupedTasks = { [key:string] : Task[]}

const initialStatusGropus : GroupedTasks= {   //Ininicamos valores para evitar error. Agrupacion vacia
        pending: [],
        onHold: [],
        inProgress: [],
        underReview: [],
        complete: []
}
//-------------------------------------

//Definicion de diccioonarios para traducir el status
const statusTranslations : {[key:string] : string} = {  //Le decimos que el key sera string al igual que el valor
        pending: 'Pending',
        onHold: 'On Hold',
        inProgress: 'In Progress',
        underReview: 'Under Review',
        complete: 'Complete'
}
const statusStyles: {[key:string] : string} = {  //Le decimos que el key sera string al igual que el valor
        pending: 'border-t-indigo-500 text-indigo-500',
        onHold: 'border-t-red-500 text-red-500',
        inProgress: 'border-t-cyan-700 text-cyan-500',
        underReview: 'border-t-amber-500 text-amber-500',
        complete: 'border-t-emerald-500 text-emerald-500'
}
//-------------------------

export default function TaskList({tasks}: TaskListProps) {

    //Funcion que agrupara los tipos de tareas
    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGropus);  //Iniciamos valor

    
  return (
    <>
    <h2 className="text-5xl font-black my-10 bg">Tareas</h2>
            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32 '>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                        <h3 className={`capitalize text-xl font-bold border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}>{statusTranslations[status]}</h3>
                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className="text-gray-500 text-center pt-3">There are no tasks</li>
                            ) : (
                                tasks.map(task => <TaskCard key={task._id} task={task} />)
                            )}
                        </ul>
                    </div>
                ))}
            </div>

    </>
  )
}
