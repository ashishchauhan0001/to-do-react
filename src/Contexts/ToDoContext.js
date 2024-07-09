import { createContext , useContext} from "react";


export const TodoContext=createContext({
    todos:[
        {
            id:1,
            todo:"Todo msg",
            completed: false,
        }
    ],
    updateTodo:(id,todo)=>{},
    addTodo:(todo)=>{},
    deleteTodo:(id)=>{},
    toggleComplete:(id)=>{}
})

export const useTodo=()=>{
    return useContext(TodoContext)
}

export const Todoprovider=TodoContext.Provider