import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateStatus } from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import { formateDate } from '@/utils/utils';
import { statusTranslations } from '@/locales/es';
import type { TaskStatus } from '@/types/index';


export default function TaskModalDetails() {
    
    const navigate = useNavigate() //Instanciasmo navigate

     //Leer si Modal existe y obtner taskid  ---
    const location =  useLocation() //Instanciamos, este nos permite leer en objeto lo que haya en la URL.
    const queryParams = new URLSearchParams(location.search)  //Busca numero de params pasados en la URL
    const taskId = queryParams.get('viewTask')!   //Revisa que exista el valor buscado en el queryParams (true, null)
   
    //Obener Porject Id
    const params = useParams()
    const projectId = params.projectId! //Guardamos el projectId del url
    
    const show = taskId ? true : false  //Si existe taskId se mostrara el show
    
    const { data, isError, error } = useQuery({
        queryKey: ['task', taskId],  //Key del query unico
        queryFn: () => getTaskById({projectId, taskId}),  //Invocamos la funcion
        enabled: !!taskId,   //Solo si taskId existe (si se pica en el valor)
        retry: false
    })

    const queryClient = useQueryClient()  //Instanciamos queryclient para la recarga de los query
    
    const {mutate} = useMutation({     //Hcemos el mutation para postear el status
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['projectDetails']})  //hacemos que recargue el query y no cuarde el cache
            queryClient.invalidateQueries({queryKey: ['task']})  //hacemos que recargue el query
            toast.success(data)
            navigate(location.pathname, {replace: true})  //Nos navega de regreso al modal
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus  //OBTENEMOS EL STATUS DEL EVENTO DE select y lo definimos como el typo de dato
        const data = {projectId, taskId, status}
        console.log(data)
        mutate(data)  //Hacemos mutate para hacer el post
    }

    if(isError){   
        toast.error(error.message, {toastId: 'error'})
        return <Navigate to={`/projects/${projectId}`}/>  //Redireccionamos a los proyectos
    }
  
    if(data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace:true})}>
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
                                    <p className='text-sm text-slate-400'>Created on: {formateDate(data.createdAt)}</p>
                                    <p className='text-sm text-slate-400'>Last update: {formateDate(data.updatedAt)}</p>
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.name}
                                    </Dialog.Title>
                                    <p className='text-lg text-slate-500 mb-2'>Description: {data.description}</p>
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold text-slate-600'>Estado Actual:</label>
                                        <select 
                                            className='w-full p-3 mt-4 bg-white border border-gray-300 rounded-xl'
                                            defaultValue={data.status}
                                            onChange={handleChange}
                                        >{Object.entries(statusTranslations).map(([key, value]) => (
                                            <option key={key} value={key} >{value}</option>
                                        ))}</select>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}