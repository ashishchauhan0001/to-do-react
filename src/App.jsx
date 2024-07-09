import { useEffect, useState } from 'react'
import {Todoprovider} from "./Contexts"
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  
  const [todos,setTodos]=useState([]) // by default empty array

  // here "todo" ko add krna h and prev is the previous state of array enter Id unique using date and add other values
  // after it same as it is todo Given by the user and add all the values in the beg. of the array using spread function in js.
  const addTodo=(todo)=>{
    setTodos((prev)=>[{id:Date.now(),...todo},...prev])
  }

  // map is use to iterate the array.
  const updateTodo=(id,todo)=>{
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id ? todo:prevTodo)))
  }

   // yes we are doing toggle here via map and we can spread the values and make changes in anyone of them
  const toggleComplete=(id)=>{
    setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id===id?{...prevTodo,completed:!prevTodo.completed} :prevTodo))
  }
  
  // filter is use to filter the array means take all the id's which are not equal to id
  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((todo)=>todo.id!=id))
  }

  // bydefault it return items in string so need to convert in JSON
  useEffect(() => { 
 const todos=JSON.parse(localStorage.getItem("todos"))

 if(todos&&todos.length>0){
  setTodos(todos)
 }
  },[])

  useEffect(() => {
   localStorage.setItem("todos",JSON.stringify(todos))
  }, [todos])
  
  

  return (
    <Todoprovider value={{todos,addTodo,deleteTodo,toggleComplete,updateTodo}}>
    <div className="bg-[#d5e77a] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-black">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>(
                          <div key={todo.id} className='w-full'>
                            <TodoItem todo={todo}/>
                             </div>
                        ))}
                    </div>
                </div>
            </div>
    </Todoprovider>
  )
}

export default App
