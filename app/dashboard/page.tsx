'use client'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { useRouter } from 'next/navigation';
import { fetchUserData, toggleDarkMode } from '../store/slices/dashboardSlice'; // Import actions
import supabase from "@/lib/supabase";
import Todo from '../Components/Todo';
import LineGraph from '../Components/LineGraph';
import NewsBox from '../Components/NewsBox';
import WeatherBox from '../Components/WeatherBox';
import TechsUsed from '../Components/TechsUsed';
import { AppDispatch } from '../store';
import SearchPanel from '../Components/SearchPanel'
const Dashboard = () => {
  // Dispatch and selector from Redux
  const dispatch = useDispatch<AppDispatch>();
  const { userName, darkMode } = useSelector((state: any) => state.dashboard); // Use Redux state

  const [menu, setMenu] = React.useState<boolean>(false);
  const[notificationPanel, setNotificationPanel] = useState<boolean>(false);
const [searchBar, setSearchBar] = useState<boolean>(false);
  const router = useRouter();

  // Handle menu click toggle
  const handleMenuClick = () => {
    setNotificationPanel(false);
	setSearchBar(false);
    setMenu(!menu);

  }
//handle notification panel click
const handleNotificationClick = () =>{
		setSearchBar(false);
		setMenu(false);
		setNotificationPanel(!notificationPanel);
	}
//handle searchBar click
const handleSearch = ()=>{
		setMenu(false);
		setNotificationPanel(false);
		setSearchBar(!searchBar);
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
	setMenu(false);
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
      <div className='flex items-center justify-between h-[10vh] px-[15px] relative z-[60] position-fixed right-0 top-0 left-0 '>
        <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl dark:text-[#7400ff]">Buddy</h1>
        <div className='flex flex-row justify-between relative gap-2 items-center h-full'>
		<div className='flex justify-between items-center max-w-[190px] relative'>
			<div className='relative h-[50px] w-[50px] flex items-center justify-center' onClick={handleNotificationClick}>
				<div className='absolute ml-[25px] mb-[25px] rounded-full h-[20px] w-[20px] flex justify-center items-center text-white bg-red-500 border border-white'>4</div>
				<svg className="w-6 h-6 stroke-black dark:stroke-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.00195 17H5.60636C4.34793 17 3.71872 17 3.58633 16.9023C3.4376 16.7925 3.40126 16.7277 3.38515 16.5436C3.37082 16.3797 3.75646 15.7486 4.52776 14.4866C5.32411 13.1835 6.00031 11.2862 6.00031 8.6C6.00031 7.11479 6.63245 5.69041 7.75766 4.6402C8.88288 3.59 10.409 3 12.0003 3C13.5916 3 15.1177 3.59 16.2429 4.6402C17.3682 5.69041 18.0003 7.11479 18.0003 8.6C18.0003 11.2862 18.6765 13.1835 19.4729 14.4866C20.2441 15.7486 20.6298 16.3797 20.6155 16.5436C20.5994 16.7277 20.563 16.7925 20.4143 16.9023C20.2819 17 19.6527 17 18.3943 17H15.0003M9.00195 17L9.00031 18C9.00031 19.6569 10.3435 21 12.0003 21C13.6572 21 15.0003 19.6569 15.0003 18V17M9.00195 17H15.0003" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>		 
			</div>
			<div className='relative h-[50px] w-[50px] flex items-center justify-center'>
				<div className='absolute ml-[25px] mb-[25px] rounded-full h-[20px] w-[20px] flex justify-center items-center text-white bg-red-500'>8</div>
				<svg className="w-6 h-6 stroke-black dark:stroke-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7 9H17M7 13H17M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>

				
			</div>
			<div className='h-[50px] w-[50px] flex items-center justify-center' onClick={handleSearch}>
				<svg className="w-6 h-6 fill-black dark:fill-white" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 13.024q0-2.624 1.024-5.056t2.784-4.16 4.16-2.752 5.056-1.056q2.656 0 5.056 1.056t4.16 2.752 2.784 4.16 1.024 5.056q0 3.616-1.984 6.816l7.072 7.040q0.864 0.896 0.864 2.144t-0.864 2.112-2.144 0.864-2.112-0.864l-7.040-7.040q-3.2 1.952-6.816 1.952-2.656 0-5.056-1.024t-4.16-2.784-2.784-4.128-1.024-5.088zM4 13.024q0 2.464 1.216 4.544t3.296 3.264 4.512 1.216q1.824 0 3.488-0.704t2.88-1.92 1.92-2.88 0.736-3.52-0.736-3.52-1.92-2.848-2.88-1.92-3.488-0.736q-2.432 0-4.512 1.216t-3.296 3.296-1.216 4.512z"/>
				</svg>	
			</div>
		</div>
		 <div className='h-[40px] w-[40px] cursor-pointer dark:bg-[#7400ff]' onClick={handleMenuClick}>
            		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="100%" height="100%">
              		<path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
            		</svg>
          	</div>	
        	</div>
      		</div>
		{notificationPanel ? (<>
				<div className="inset-0 bg-black/30 backdrop-blur-sm fixed z-20" onClick={() => setNotificationPanel(false)} />
				<div className='flex flex-col absolute border-2 border-white h-[90vh] w-[280px] right-0 z-50 rounded-[6px] justify-center items-center bg-white dark:bg-[#101215]'>
					<p>No Notification for Now, Come back Later!</p>
			</div>
					</>
		): null	}
		{menu ? (<>
			<div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20" onClick={() => setMenu(false)} />

            	<div className='absolute border-2 h-[220px] w-[250px] rounded-[10px] backdrop-blur-xl bg-white right-0 z-50 dark:bg-[#101215] flex flex-col pb-[2px]'>
              		<ul className='flex flex-col w-full p-2'>
                		<li onClick={handleHomeClick} className='cursor-pointer w-full text-center hover:bg-[#7a7a7a] h-[45px] flex items-center pl-2'>
                  			<button>Homepage</button>
                		</li>
                		<li onClick={handleToggleDarkMode} className='cursor-pointer w-full text-center hover:bg-[#7a7a7a] h-[45px] flex items-center pl-2'>
                  			<button>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
                		</li>
                		<li className='cursor-pointer w-full text-center hover:bg-[#7a7a7a] h-[45px] flex items-center pl-2'>
                  			<button>About</button>
                		</li>
				<li className='cursor-pointer w-full text-center hover:bg-[#7a7a7a] h-[45px] flex items-center pl-2' onClick={handleSignOut}>
                  			<button>Sign Out</button>
                		</li>
              		</ul>
			<div className='mr-[10px] self-end'> <p>Version 1.1.2 </p></div>
            	</div>
          	</>
		) : null}
		{searchBar ? (<>
			<div className="fixed inset-0 backdrop-blur-sm z-20 bg-black/30" onClick={() => setSearchBar(false)} />
			<SearchPanel />
	</>) : null}
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
        <div className="w-full sm:w-[300px] border-2 border-black rounded-[10px] h-[400px] flex justify-center items-center mt-[10px]">
          <TechsUsed />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

