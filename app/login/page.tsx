"use client"
import { FormEvent, useState, ChangeEvent } from "react"
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";


interface User{
    email: string;
    password: string;
}

const Login:React.FC = () =>{
    const [BtnText, setBtnText] = useState("Log In");
    const router = useRouter();
    const [alertDiv, setAlertDiv] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [user, setUser] = useState<User>({
       email: "",
       password :""
    });


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAlertDiv(false);
        const { name, value } = event.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const onLogin = async(event: FormEvent) =>{
        event.preventDefault();
    setBtnText("Processing...");
    try {
    const {data ,error} = await supabase.auth.signInWithPassword(user);
        if(error){
           setAlertDiv(true);
           setAlertMessage(error.message);
           setBtnText("Log in");
        }
        if(data?.user?.email){
            const userEmail = data.user.email;
            console.log("users email id"+ userEmail);
            localStorage.setItem('userEmail', userEmail );
            const session = supabase.auth.getSession();

            if (session) {
              document.cookie = `sb-access-token=${(await session).data.session?.access_token}; path=/; Secure; SameSite=Strict`;
            }
        router.push('/dashboard');
        }
        // const userdata = await supabase.auth.getUser();
      
    } catch (error) {
      setBtnText("Log in");
       setAlertMessage(Error.name);
      setAlertDiv(true);
      
    }
    }
    return (
        <div className="w-full h-screen flex items-center justify-center relative">
            {alertDiv ?(<div className="h-[10vh] flex items-center justify-center bg-red-300 self-start text-red-600 absolute border-2 border-red-600 w-[90vw]">{alertMessage}</div>) : (null)}
            <form>
            <div className="border-2 border-black rounded-[15px] h-[280px] w-[300px] flex flex-col items-center justify-around">
                <h1 className="text-[22px] font-bold">Log In</h1>
                <div className="flex flex-col items-center justify-around w-[88%] h-[40%]">
                    <input placeholder="email@ex.xom" name="email" className="w-full h-[30px] px-[5px] rounded-[5px] outline-none border border-black" value={user.email} onChange={handleInputChange} required></input>

                    <input placeholder="Password" name="password" type="password" className="w-full h-[30px] px-[5px] rounded-[5px] outline-none border border-black" value={user.password} onChange={handleInputChange} required></input>
                </div>
                <div className="flex flex-col items-center justify-between w-full">
                <button className="border-2 border-green-800 h-[30px] w-[90%] rounded-[8px] bg-[#98dd98] hover:bg-[#7fc77a] font-bold" type="submit" onClick={onLogin}>{BtnText}</button>
                <a href="/signup">Do not have an account</a>
                </div>
            </div>
            </form>
        </div>
    )
}
export default Login;