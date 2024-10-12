"use client"
import React, {useState} from 'react'
import { useRouter } from 'next/navigation';
import supabase from "@/lib/supabase"
import Todo from '../Components/Todo';

const Dashboard = () => {
    const[menu, setMenu] = useState<boolean>(false);
    const router = useRouter();

    const handleMenuClick = ()=>{
        setMenu(!menu);
    }
    const handleHomeClick = () =>{
        router.push('/')
    }
    const handleSignOut = async() =>{
        const { error } = await supabase.auth.signOut()
        router.push('/');
    }
  return (
    <>
    <div className='flex items-center justify-between border-2 h-[10vh] border-solid px-[15px]'>
        <h1>Welcome, Himanshu Kumar</h1>
        <div className='flex flex-col relative w-[10vw] items-end '>
            <div className='h-[40px] w-[40px] cursor-pointer' onClick={handleMenuClick}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="100%" height="100%" ><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg> </div>
            {menu ? (<div className='absolute top-[8vh] border-2 border-black h-[120px] w-[130px] rounded-[10px] bg-white'>
                <ul className='flex flex-col justify-around h-full w-full items-center' >
                    <li onClick={handleHomeClick} className= 'cursor-pointer w-full text-center hover:bg-[#b9b9b9]'>Homepage</li>
                    <li className= ' cursor-pointer w-full text-center hover:bg-[#b9b9b9]'>Dark Mode</li>
                    <li className= ' cursor-pointer w-full text-center hover:bg-[#b9b9b9]' onClick={handleSignOut}>Sign out</li>
                </ul>
            </div>) :(null)}
        </div>
        
    </div>
    <div className='w-full min-h-screen flex flex-wrap items-center justify-center gap-2'>
    <Todo />
    </div>

    </>
  )
}

export default Dashboard