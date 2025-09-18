
import { Link, useNavigate } from "react-router-dom"        //Importamos para navegar entre paginas y usar el state de navigate
import { useForm } from "react-hook-form"                   //importamos el state form para procesar formularios
import { useMutation } from "@tanstack/react-query"         //Importamos un Mutation para reactqury u los metodos http
import { toast } from "react-toastify"                      //Llamamos a los toast
import { ArrowLeftIcon } from "@heroicons/react/20/solid"   //Importamos icono
import ProjectForm from "@/components/projects/ProjectForm"
import type { ProjectFormData } from "@/types/index"
import { createProject } from "@/api/ProjectAPI"

export default function CreateProjectView() {
    const navigate = useNavigate()            //declarams el use navigate
    const initialValues : ProjectFormData = {        //declaramos los valores iniciales
        projectName: "",
        clientName: "",
        description: ""
    }
    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues}) //Creamos el state del form con sus valores default

    const {mutate} = useMutation({   //Instanciamos el useMutation
        mutationFn: createProject,  //Funcion que activara o que contiene el HTTP
        onError: (error) => {        //Si hay un error entonces
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)   //Regresa el data del res de backend (el mensaje ccreado correctamente)
            navigate('/')  //nos llevara a la apg principal despues de crear el proyecto
        }
    })  

    const handleForm = (formData:ProjectFormData) => mutate(formData)  //Este procesa los datos desde reactquery instanciado


    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Creating new project</h1>
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
                        value="Create Project"
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 uppercase text-white font-bold cursor-pointer transition-colors"
                        />
                </form>
            </div>
        </>
    )
}
