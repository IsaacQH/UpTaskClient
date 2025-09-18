
import { Link } from "react-router-dom"

export default function DashboardView() {
  return (
    <>
      <h1 className="text-5xl font-black">My Projects</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Handle and manage your projects</p>

      <nav className="my-6 mt-9">
        <Link
          className="bg-violet-500 hover:bg-violet-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors  rounded-4xl"
          to='/projects/create'
        >New Project</Link>
      </nav>
    </>
  )
}
