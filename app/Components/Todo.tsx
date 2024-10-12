'use client'
import React, {useState, FormEvent, ChangeEvent} from 'react'

interface Task {
  id: number;
  text: string;
}

const Todo = () => {
  const[input ,setInput] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const handleInput = (event: ChangeEvent<HTMLInputElement>) =>{
      setInput(event.target.value);
  }
  const handleAddTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input) return;
    setTasks((prevTasks) => [...prevTasks, { id: Date.now(), text: input }]);
    setInput('');
  };
  return (
    <div className='h-[400px] w-[320px] border-2 border-black rounded ml-1 flex flex-col p-2 gap-2'>
        <form onSubmit={handleAddTask} className='flex flex-row h-[30px] w-[100%] gap-1'>
        <input type='text' placeholder='enter your task for today' value={input} onChange={handleInput} required className=' outline-none border border-black rounded-[5px] px-1'/>
        <input type='submit' className='border-2 border-green-900 h-full w-full text-[#006700] bg-[#a5ffa5] hover:bg-[#66d466] rounded-[5px]' value="Add task"></input>
        </form>



    </div>
  )
}

export default Todo