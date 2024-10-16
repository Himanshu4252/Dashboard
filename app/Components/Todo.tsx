'use client'
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import supabase from '@/lib/supabase'; // Import your Supabase client
import { NextResponse } from 'next/server';


const Todo = () => {

  const [userId, setUserId] = useState<string | null>(null);
  const [input, setInput] = useState<string>('');
  const [tasks, setTasks] = useState<string | null>();
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('tasks')
      .eq('id', userId)
      .single();
        if (error) {
            console.error('Failed to fetch tasks:', error);
        }
  };

  useEffect(() => {
    const currentuser = async() =>{
        const {data, error} = await supabase.auth.getUser();
        if(error){
          console.log(error.message)
        }
        if(data?.user){
          const foundUser = data.user.id;
          setUserId(foundUser);
          console.log("use effect found the user id - " + userId)
        }
    }
    currentuser();

  //   // fetchTasks();
  
  }, []);

  // // Handle input change
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  // // Add a new task
  const handleAddTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  //   if (!input) return;
  //   try {
  //     const {data, error: fetchError} = await supabase.from('users').select('userName').eq('id',  userId);
  //     if(fetchError){
  //       console.log("error encountered while trying to fetch tasks"+ fetchError.message);
  //     }
  //     const currentTasks = "";

  //     console.log("current data");
  //     console.log(data)
  //     const updatedTasks = [...currentTasks, input];
  //     console.log("updated tasks "+updatedTasks);
  //     try {
  //       const res = await supabase.from('users').update({tasks : updatedTasks}).eq('id', userId);
  //       console.log("result of saving the tasks "+res);
  //     } catch (error) {
  //       console.log("error in saving the tasks in the databse"+error)
  //     }
  //   } catch (error) {
  //     return NextResponse.json({message: "failed to fetch the tasks", error}, {status: 400});
      
  //   }
    
  //   return { success: true, message: 'Task added successfully' };

  };

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
    // try {
    //   await Promise.all(
    //     selectedTasks.map(async (taskId) => {
    //       // Here you will have to use the index or some unique identifier to remove tasks
    //       await supabase
    //         .from('users')
    //         .update({ tasks: supabase.raw(`array_remove(tasks, '${tasks[taskId].text}')`) }) // Remove the task from the tasks array
    //         .eq('id', YOUR_USER_ID); // Replace with actual user ID
    //     })
    //   );

  //     // Fetch the updated tasks list
  //     fetchTasks();
  //     setSelectedTasks([]);
  //   } catch (error) {
  //     console.error('Failed to delete tasks:', error);
  //   }
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
        {/* {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-2 min-h-[30px] px-2 border-2 rounded-md"
          >
            <input
              type="checkbox"
              checked={selectedTasks.includes(task.id)}
              onChange={() => handleTaskSelection(task.id)}
            />
            <label>{task.text}</label>
          </div>
        ))} */}
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
