'use client'

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { useRouter } from 'next/navigation';
import { fetchUserData, toggleDarkMode } from '../store/slices/dashboardSlice'; // Import actions
import supabase from "@/lib/supabase";
import Todo from '../Components/Todo';
import LineGraph from '../Components/LineGraph';
import NewsBox from '../Components/NewsBox';
import WeatherBox from '../Components/WeatherBox';
import TechsUsed from '../Components/TechsUsed';
import { RootState, AppDispatch } from '../store';

const Dashboard = () => {
  // Dispatch and selector from Redux
  const dispatch = useDispatch<AppDispatch>();
  const { userName, darkMode } = useSelector((state: any) => state.dashboard); // Use Redux state

  const [menu, setMenu] = React.useState<boolean>(false);
  const router = useRouter();

  // Handle menu click toggle
  const handleMenuClick = () => {
    setMenu(!menu);
  }

  // Handle home page redirect
  const handleHomeClick = () => {
    router.push('/');
  }

  // Handle sign out
  const handleSignOut = async () => {
    localStorage.removeItem('userEmail');
    document.cookie = 'sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    const { error } = await supabase.auth.signOut();
    router.push('/');
  }

  // Fetch user data from Redux state
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      dispatch(fetchUserData(email)); // Fetch user data when component mounts
    }
  }, [dispatch]);

  // Toggle Dark Mode and update Redux state
  const handleToggleDarkMode = async () => {
    dispatch(toggleDarkMode()); // Toggle dark mode in Redux
    const email = localStorage.getItem('userEmail');
    if (email) {
      await supabase
        .from('users')
        .update({ darkMode: !darkMode })
        .eq('email', email)
        .single();
    }
  }

  return (
    <>
      <div className='flex items-center justify-between h-[10vh] px-[15px]'>
        <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl dark:text-[#7400ff]">Buddy</h1>
        <div className='flex flex-col relative w-[10vw] items-end'>
          <div className='h-[40px] w-[40px] cursor-pointer dark:bg-[#7400ff]' onClick={handleMenuClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="100%" height="100%">
              <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
            </svg>
          </div>
          {menu ? (
            <div className='absolute top-[8vh] border-2 h-[120px] w-[130px] rounded-[10px] backdrop-blur-xl bg-transparent dark'>
              <ul className='flex flex-col justify-around h-full w-full items-center'>
                <li onClick={handleHomeClick} className='cursor-pointer w-full text-center hover:bg-[#b9b9b9]'>
                  <button>Homepage</button>
                </li>
                <li onClick={handleToggleDarkMode} className='cursor-pointer w-full text-center hover:bg-[#b9b9b9]'>
                  <button>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
                </li>
                <li className='cursor-pointer w-full text-center hover:bg-[#b9b9b9]' onClick={handleSignOut}>
                  <button>Sign Out</button>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
      <div className='p-2'>
        <h1 className='text-[20px] leading-[32px] sm:text-[25px] sm:leading-[40px]'>Welcome {userName}</h1>
        <p className='text-[14px] leading-[24px] font-medium sm:text-[16px] sm:leading-[30px] dark:text-[#AAAAAA]'>
          Welcome to Buddy app, One place to help you stay updated, and productive throughout the day!
        </p>
      </div>
      <div className='flex flex-wrap gap-3 px-2 sm:flex-nowrap sm:flex-row justify-center'>
        <Todo />
        <div className='w-full rounded-[10px] sm:flex-1'>
          <WeatherBox />
        </div>
      </div>
      <NewsBox />
      <div className="flex flex-col sm:flex-row sm:justify-between w-full">
        <div className="w-full rounded-[10px] sm:flex-1 bg-green-300 mt-2">
          <LineGraph />
        </div>
        <div className="w-full sm:w-[300px] border-2 border-black rounded h-[400px] flex justify-center items-center mt-2 sm:mt-0">
          <TechsUsed />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

