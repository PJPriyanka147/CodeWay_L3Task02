import AppLayout from "./components/Applayout";
import { Routes, Route } from "react-router-dom";
import Task from "./components/Task";
import { Toaster } from "react-hot-toast";
import todo from '../src/assets/todo.jpg';

function App() {
  console.log('render app..')
  return (
    <AppLayout>
      <Toaster
        position="top-right"
        gutter={8}
      />
      <Routes>
        <Route path="/:projectId" element={<Task />} />
        <Route path="/" element={
          <div className="flex w-full flex-col h-full relative bg-orange-300">
            <img src={todo} className="absolute top-52 h-96 w-96 right-0" alt="" /> 
            <h1 className=" text-indigo-500 top-24 text-6xl font-bold absolute inline pl-8">Project Planner</h1>
            <p className=" absolute text-gray-400 w-4/5 top-48 text-4xl pl-8">Supercharge Your Productivity with Our Revolutionary Project Planner!!</p>
          </div>
        } />
      </Routes>
    </AppLayout>
  );
}

export default App;
