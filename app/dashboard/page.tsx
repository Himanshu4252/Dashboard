"use client"
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import supabase from "@/lib/supabase"
import Todo from '../Components/Todo';
import LineGraph from '../Components/LineGraph';
import NewsBox from '../Components/NewsBox';
import WeatherBox from '../Components/WeatherBox';

const Dashboard = () => {

    const [userName, setUserName] = useState<string>("user")
    const[menu, setMenu] = useState<boolean>(false);
    const router = useRouter();

    const handleMenuClick = ()=>{
        setMenu(!menu);
    }
    const handleHomeClick = () =>{
        router.push('/')
    }
    const handleSignOut = async() =>{
        localStorage.removeItem('userEmail');
        document.cookie = 'sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        const { error } = await supabase.auth.signOut()
        router.push('/');
    }

    const getUserName = async()=>{
        const { data, error } = await supabase
        .from('users')
        .select('userName')
        .eq('email', localStorage.getItem('userEmail'))
        .single();

        if(data){
            setUserName(data.userName);
        }
    }
    // const func =async()=>{
    //     const userId = await supabase.auth.getUser();
    //     const emailUser = (userId.data.user?.email);
    //    if(emailUser){
    //     setUserEmail(emailUser);
    //    }
    // }
    useEffect(() => {
        // func();
        getUserName();
       }, []);
   
  return (
    <>
    <div className='flex items-center justify-between border-2 h-[10vh] border-solid px-[15px]'>
        <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">Buddy</h1>
        <div className='flex flex-col relative w-[10vw] items-end '>
            <div className='h-[40px] w-[40px] cursor-pointer' onClick={handleMenuClick}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="100%" height="100%" ><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg> </div>
            {menu ? (<div className='absolute top-[8vh] border-2 border-black h-[120px] w-[130px] rounded-[10px] bg-white'>
                <ul className='flex flex-col justify-around h-full w-full items-center' >
                    <li onClick={handleHomeClick} className= 'cursor-pointer w-full text-center hover:bg-[#b9b9b9]'><button>Homepage</button></li>
                    <li className= ' cursor-pointer w-full text-center hover:bg-[#b9b9b9]'><button>Dark Mode</button></li>
                    <li className= ' cursor-pointer w-full text-center hover:bg-[#b9b9b9]' onClick={handleSignOut}><button>Sign Out</button></li>
                </ul>
            </div>) :(null)}
        </div>        
    </div>
    <div className='p-2'>
        <h1 className='text-[20px] leading-[32px] sm:text-[25px] sm:leading-[40px]'>Welcome {userName}</h1>
        <p className='text-[14px] leading-[24px] font-medium sm:text-[16px] sm:leading-[30px]'>welcome to Buddy app, One place to help you stay updated, and productive throughout the day!</p>
    </div>
    <div className='flex flex-wrap gap-3 px-2 sm:flex-nowrap sm:flex-row'>
        <Todo />
        <div className='w-full rounded-[10px] sm:flex-1'>
            <WeatherBox />
        </div>
    </div>
    <NewsBox/>
    <div className='w-full rounded-[10px] sm:flex-1 bg-green-300'>
        <LineGraph />
    </div>
    </>
  )
}

export default Dashboard