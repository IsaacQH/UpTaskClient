import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import ProjectForm from "./ProjectForm";
import { Link, useParams, useNavigate } from "react-router-dom";
import { type ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient} from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectFormProps = {
    data:ProjectFormData
}

export default function EditProjectForm({data}:EditProjectFormProps) {

        const params = useParams()  //Obtenemos los valores pasados en param
        const projectId = params.projectId!   //Capturamos el projectID
        const navigate = useNavigate()            //declarams el use navigate

        const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {        //declaramos los valores iniciales
            projectName: data.projectName,
            clientName: data.clientName,
            description: data.description
        }}) //Creamos el state del form con sus valores default

        const queryClient = useQueryClient() //Instanciamos el queryClient para invalidar cache

        const { mutate } = useMutation({      //Intanciamos el muttation y extraemos mutate
            mutationFn: updateProject,       //Mutation function que sera el update
            onError: (error) => {        //Si hay un error entonces
                toast.error(error.message)
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries({queryKey: ['projects']})  //Imvalida el queriy pasado para no usar el cache
                queryClient.invalidateQueries({queryKey: ['editProject', projectId]})  //Invalida el queriy pasado para no usar el cache
                toast.success(data)   //Regresa el data del res de backend (el mensaje ccreado correctamente)
                navigate('/')  //nos llevara a la apg principal despues de crear el proyecto
            }
        })
        
        const handleForm = (formData:ProjectFormData) => {
            const data = {  //Creamos un objeto para mandarle mulstiples variables al data
                formData,
                projectId
            }
            mutate(data)
        }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                    <h1 className="text-5xl font-black">Edit project</h1>
                    <p className="text-2xl font-light text-gray-500 mt-5">Complete the blank fields</p>

                    <nav className="my-6 mt-9">
                        <Link to="/">
                        <button className="flex items-center space-x-2 bg-violet-500 hover:bg-violet-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-4xl">
                            <ArrowLeftIcon className="h-5 w-5 mr-2" />
                            <span>Return</span>
                        </button>
                        </Link>
                    </nav>

                    <form
                        className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                        onSubmit={handleSubmit(handleForm)} //Llamamos el metodo de useForm
                        noValidate  //Desabilitamos HTML5 para vbalidar con react hook form
                    >
                        
                        <ProjectForm
                            register={register}
                            errors={errors}
                        />

                        <input 
                            type="submit"
                            value="Save project"
                            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 uppercase text-white font-bold cursor-pointer transition-colors"
                            />
                    </form>
                </div>
        </>
  )
}
