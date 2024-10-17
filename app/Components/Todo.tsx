'use client'
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import supabase from '@/lib/supabase'; 


const Todo = () => {
  
  const [input, setInput] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [tasks, setTasks] = useState<string []>([]);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);


  const fetchTasks = async () => {
    if(userEmail){
    const { data, error } = await supabase
      .from('users')
      .select('tasks')
      .eq('email', userEmail)
      .single();
      if(error){
        console.log(error);
      }

        const tasksFetched = await data?.tasks;
        if(tasksFetched){
          setTasks(tasksFetched);
        }
      }
             
  };

  const emailFetcher = async() =>{
    const emailUser = localStorage.getItem('userEmail');
    if(emailUser){
      setUserEmail(emailUser);
    }

  }

  useEffect(() => {
   emailFetcher();
   fetchTasks();
  }, [userEmail]);

  // // Handle input change
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  // // Add a new task
  const handleAddTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentTasks = tasks;
    const updatedTasks = [...currentTasks, input];
    const { error: updateError } = await supabase
    .from('users')
    .update({ tasks: updatedTasks })
    .eq('email', userEmail);

    if(updateError){
      console.log(updateError.message);
    }
    setInput('');
  };


  useEffect(() => {
    fetchTasks();
   }, [handleAddTask]);

  

  // Handle task selection
  const handleTaskSelection = (taskId: number) => {
    setSelectedTasks((prevSelected) =>
      prevSelected.includes(taskId)
        ? prevSelected.filter((id) => id !== taskId)
        : [...prevSelected, taskId]
    );
  };
  
  // Complete selected tasks
  const handleComplete = async () => {
    const updatedTasks = tasks.filter((task, index) => !selectedTasks.includes(index));
    const { error: updateError } = await supabase
    .from('users')
    .update({ tasks: updatedTasks })
    .eq('email', userEmail);
    setTasks(updatedTasks);
    setSelectedTasks([]);   
  };

  return (
    <div className="h-[400px] w-[320px] border-2 border-black rounded ml-1 flex flex-col p-2 gap-2">
      <form onSubmit={handleAddTask} className="flex flex-row h-[30px] w-[100%] gap-1">
        <input
          type="text"
          placeholder="Enter your task for today"
          value={input}
          onChange={handleInput}
          required
          className="outline-none border border-black rounded-[5px] px-1"
        />
        <input
          type="submit"
          className="border-2 border-green-900 h-full w-full text-[#006700] bg-[#a5ffa5] hover:bg-[#66d466] rounded-[5px]"
          value="Add task"
        />
      </form>
      {/* Tasks list */}
      <div className="flex flex-col gap-2 overflow-y-auto">
      {tasks.length > 0 ? (
    tasks.map((task, index) => (
      <div
        key={index}
        className="flex items-center gap-2 min-h-[30px] px-2 border-2 rounded-md"
      >
        <input
          type="checkbox"
          checked={selectedTasks.includes(index)}
          onChange={() => handleTaskSelection(index)}
        />
        <label>{task}</label>
      </div>
    ))
  ) : (
    <p>No tasks available for Now</p>
  )} 
      </div>
      <button
        className="w-full h-[30px] border-green-900 rounded bg-[#a5ffa5] hover:bg-[#66d466] mt-auto"
        onClick={handleComplete}
      >
        Complete
      </button>
    </div>
  );
};

export default Todo;
