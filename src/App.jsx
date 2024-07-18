import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
// import './App.css'
import {FaEdit} from "react-icons/fa"
import {AiFillDelete} from "react-icons/ai"
import { v4 as uuidv4 } from 'uuid';
 // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

function App() {
  const [todo, setTodo] = useState("")
  const [todos , setTodos] = useState([])
  const [finished, setfinished] = useState(true)
 
  useEffect(() => {
   let todoString = JSON.parse(localStorage.getItem("todos"))
   if(todoString){ 
   let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
   }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggle = (e) => {
    setfinished(!finished)
  }

  const handleEdit = (e, id)=>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id)=>{
  let newTodos = todos.filter(item=>{
    return item.id !== id
  })
  setTodos(newTodos)
  saveToLS()
  }
  
  const handleAdd = ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
   setTodo("");
   saveToLS()
  }

  const handleChange = (e)=>{
   setTodo(e.target.value)
  } 

  const handleCheckbox = (e) => {
  let id = e.target.name;
  let index = todos.findIndex(item=>{
    return item.id === id;
  })
  let newTodos = [...todos]
  newTodos[index].isCompleted = !newTodos[index].isCompleted
  setTodos(newTodos)
  saveToLS()
  }
    

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-orange-300 min-h-[87vh] md:w-[35%]">
      <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>

        <div className="addTask my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold'>Add a Task</h2>
          <div className="flex">
          <input onChange={handleChange} checked ={todo} type="text" className='w-1/2'/>
          <button onClick={handleAdd} disabled={todo.length<=1} className='bg-orange-400 rounded-md px-3 py-1 font-semibold hover:bg-orange-500 mx-5'>Add your Task</button>
          </div>
        </div>
        <input className='my-4' id='show' onChange={toggle} type="checkbox" checked={finished} />
        <label className='mx-2' htmlFor="show">Show Finished Task</label> 
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-xl font-bold'>Your Goals Todo :-</h2>
        <div className="tasks">
          {todos.length === 0 && <div className='m-5 font-medium'>{"<-----No Task to perform----->"}</div> }
          {todos.map(item=>{
            
          return (finished || !item.isCompleted) && <div key={item.id} className="task flex w-1/2 my-3 justify-between">
            <div className='flex gap-5'>
            <input name={item.id} onChange={handleCheckbox} type="checkbox" className='accent-orange-500 w-5 h-5' checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex">
              <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-orange-400 rounded-md px-3 py-1 font-semibold hover:bg-orange-500 mx-3'>Edit</button>
              <button onClick= {(e)=>{handleDelete(e, item.id)}} className='bg-orange-400 rounded-md px-3 py-1 font-semibold hover:bg-orange-500 mx-3'>Delete</button>
            </div>
          </div>
           })}
        </div>
      </div>
    </>
  )
}

export default App
