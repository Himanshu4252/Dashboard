'use client';

import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { setDeadline as setDeadlineRedux } from '../store/slices/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchUser, addTask, completeTasks, toggleTaskSelection } from '../store/slices/todoSlice';

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [input, setInput] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');

  const {
    user,
    selectedTasks,
    loading,
    error,
  } = useSelector((state: RootState) => state.todo);

  // 🔁 Fetch user data from localStorage and then Supabase
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      dispatch(fetchUser(storedEmail));
    }
  }, [dispatch]);

  // ✅ Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

	const handleDeadlineChange = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setDeadline(value);
  dispatch(setDeadlineRedux(value)); // 💥 Sync it into Redux!
};
  // 📝 Submit new task
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user?.email && input.trim() && deadline.trim()) {
	dispatch(addTask({ email: user.email, task: input.trim() }));

      setInput('');
      setDeadline('');
    }
  };

  // ☑️ Toggle task selection
  const handleCheckboxToggle = (index: number) => {
    dispatch(toggleTaskSelection(index));
  };

  // ✅ Complete selected tasks
  const handleComplete = () => {
    if (user?.email && selectedTasks.length > 0) {
      dispatch(completeTasks({ email: user.email }));
    }
  };

  return (
<div className="h-[400px] w-[320px] border-2 border-black rounded-[15px] ml-1 flex flex-col p-2 gap-2 dark:bg-[#101215] dark:border-gray-500">
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-1">
        <div className="flex flex-row gap-[2px]">
          <input
            type="text"
            placeholder="Enter your task for today"
            value={input}
            onChange={handleInputChange}
            required
            className="outline-none border border-black rounded-[5px] px-1 w-full dark:bg-[#3e3c3c]"
          />
          <input
            type="time"
            value={deadline}
            onChange={handleDeadlineChange}
            className="outline-none border border-black rounded-[5px] px-1 dark:bg-[#3e3c3c]"
            required
          />
	 <p className="text-red-500">⏳</p>
        </div>
        <input
          type="submit"
          value="Add task"
          className="border-2 border-green-900 w-full text-[#006700] bg-[#a5ffa5] hover:bg-[#66d466] rounded-[5px] dark:bg-[#724CF9] dark:hover:bg-[#653FE0] dark:border-[#653FE0] dark:text-white"/>
      </form>

      {/* Tasks List */}
      <div className="flex flex-col gap-2 overflow-y-auto">
        {loading ? (
          <p>Loading tasks...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : user?.tasks && user.tasks.length > 0 ? (
          [...user.tasks]
  .sort((a, b) => {
    const parseDeadline = (task: any) => {
      const datePart = task.deadline?.split(' ')[0];
      const timePart = task.deadline?.split(' ')[1];
      if (!datePart || !timePart) return Infinity;

      const formattedTime = `${timePart.slice(0, 2)}:${timePart.slice(2, 4)}:00`;
      const deadline = new Date(`${datePart}T${formattedTime}`);

      const now = new Date();
      if (deadline < now) deadline.setDate(deadline.getDate() + 1);

      return deadline.getTime();
    };

    return parseDeadline(a) - parseDeadline(b);
  })
  .map((taskWithDeadline, index) => {

		const timeChunk = taskWithDeadline.deadline?.split(' ')[1]; // e.g., '121700'
		const deadlineTimeStr = taskWithDeadline.deadline?.split(' ')[1]; // e.g., '121700'
const deadlineDateStr = taskWithDeadline.deadline?.split(' ')[0]; // e.g., '2025-04-21'

// Default time color
let timeColor = 'text-green-500';

let displayTime = '??:??';

if (deadlineTimeStr && deadlineDateStr) {
  const formattedTime = `${deadlineTimeStr.slice(0, 2)}:${deadlineTimeStr.slice(2, 4)}`;
  displayTime = formattedTime;

  // Combine date and time into a Date object
  const taskDeadline = new Date(`${deadlineDateStr}T${formattedTime}:00`);
  const now = new Date();
	if (taskDeadline.getTime() < now.getTime()) {
  taskDeadline.setDate(taskDeadline.getDate() + 1);
	}
  const diffMs = taskDeadline.getTime() - now.getTime();
  const diffHours = diffMs / (1000 * 60 * 60); // in hours

  if (diffHours < 1) timeColor = 'text-red-500';
  else if (diffHours < 4) timeColor = 'text-yellow-400';
}


		return (
            		<div key={index} className="flex items-center gap-2 px-2 border-2 rounded-md dark:bg-[#242424] dark:border-1 dark:border-black">
             			 <input
               			 type="checkbox"
               			 checked={selectedTasks.includes(index)}
               			 onChange={() => handleCheckboxToggle(index)}
              				/>
             			 <p className="dark:text-gray-300">{taskWithDeadline.task}</p>
				<div className="border-1 border-black min-h-[30px] min-w-[80px] ml-auto flex items-center justify-center">
 					 <p className={`${timeColor}`}>{displayTime}</p>
				</div>

            		</div>
         		 );
	 		})
        		) : (
          <p>No tasks available for now.</p>
        )}
      </div>

      <button
        onClick={handleComplete}
        className="w-full h-[30px] border-green-900 rounded bg-[#a5ffa5] hover:bg-[#66d466] mt-auto transition-colors dark:bg-[#724CF9] dark:text-white dark:hover:bg-[#653FE0]"
      >
        Complete
      </button>
    </div>
  );
};

export default TodoList;

