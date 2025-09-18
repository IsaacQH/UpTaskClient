import axios from "axios"

//Creamos este archivo para facilitar la edicion cuando cambiemos de servidor y asi solo llamemos la fujncion a nuestros componentes.

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL  //Llama al URL 
})

export default api

