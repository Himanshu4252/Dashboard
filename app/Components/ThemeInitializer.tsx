'use client'
import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase';

export default function ThemeInitializer (){
        const[email, setEmail] = useState<string | null>(null);
        const [theme, setTheme] = useState<string>("light");
        useEffect(()=>{
                const fetchTheme = async() =>{
                    const storedEmail = localStorage.getItem('userEmail');
                    if(!storedEmail) return;
                    
                    const { data ,error} = await supabase
                    .from('users')
                    .select('darkMode')
                    .eq('email', storedEmail)
                    .single();
                    if(error){
                        console.log("error fetching theme", error);
                        }
                    const prefersDark = !!data?.darkMode;
                    console.log('[ThemeInit] applying theme', prefersDark ? 'dark':'light' );

                    setTheme(prefersDark ? 'dark':'light');
                    document.documentElement.classList.toggle('dark', prefersDark);
                    document.documentElement.classList.toggle('light', !prefersDark);
                    console.log('final classList: ', [...document.documentElement.classList]);
                    };
                   fetchTheme();

            }, []);
        return null;
  }
