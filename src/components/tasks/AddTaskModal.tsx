import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TaskForm from './TaskForm';
import { useForm } from 'react-hook-form';
import type { TaskFormData } from '@/types/index';
import { useMutation } from '@tanstack/react-query';
import { createTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

export default function AddTaskModal() {

    const navigate = useNavigate() //Instanciamos el useNavigate
    const queryClient = useQueryClient() //Instanciamos el queryClient para invalidar cache

    //Leer si Modal existe   ---
    const location =  useLocation() //Instanciamos, este nos permite leer en objeto lo que haya en la URL.
    const queryParams = new URLSearchParams(location.search)  //Busca numero de params pasados en la URL
    const modalTask = queryParams.get('newTask')   //Revisa que exista el valor buscado en el queryParams (true, null)
    const show = modalTask ? true : false
    //----

    //Obtener Project ID
    const params = useParams() //Recuperamos url data
    const projectId = params.projectId!   //Recuperams el id y no puede ser undefined
    //----
    
    const initialValues:TaskFormData = {  //Valores iniciales del taskForm seran vacios
        name: '',
        description: ''
    }

    const {register, handleSubmit, formState: {errors}, reset} = useForm({defaultValues: initialValues})  //Definmimos los valores iniciales

    const { mutate } = useMutation({
        mutationFn: createTask,   //Aqqui es mutrate porque en handle con mutation pasamos los datos
        onError: (error) => {
            toast.error(error.message)  //Muestra un toast de error
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['projectDetails']})  //elimina el cache
            toast.success(data) //Muestra un toast de success con el return data  (Checar backend)
            reset()   //Resetea el form
            navigate(location.pathname, {replace: true})  //Nos navega de regreso al modal
        }
    })

    const handleCreateTask = (formData: TaskFormData) => {   //Manejamos el submit
        const data = {
            formData,
            projectId
        }
        mutate(data)  //Enviamos data al mutate para la funcion y el procesamiento
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        New Task
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Complete the form and  {''}
                                        <span className="text-fuchsia-600">create a task</span>.
                                    </p>

                                    <form
                                        className='mt-10 space-y-3'
                                        noValidate={true}
                                        onSubmit={handleSubmit(handleCreateTask)}
                                    >
                                        <TaskForm 
                                            register={register}
                                            errors={errors}
                                        />
                                        <input 
                                            type="submit" 
                                            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 uppercase text-white font-bold cursor-pointer transition-colors mt-5"
                                            value="Add Task"
                                        />
                                    </form> 

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}