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
         <div className="w-full h-screen overflow-hidden relative flex items-center justify-center">
  {/* Background */}
  <div
    className="absolute inset-0 -z-10 bg-center bg-no-repeat bg-cover pointer-events-none"
    style={{
      backgroundImage: "url('/BG.svg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  />

  {/* Alert Box */}
  {alertDiv && (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-200 text-red-800 border border-red-600 px-4 py-2 rounded shadow-lg z-10 max-w-[90%]">
      {alertMessage}
    </div>
  )}

  {/* Login Form Container with glass blur */}
  <div className="rounded-2xl p-1 w-full max-w-[360px] border border-white/30 bg-white/10 backdrop-blur-md shadow-xl">
    <form
      onSubmit={onLogin}
      className="max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl w-full p-5 flex flex-col items-center gap-4"
    >
      <h1 className="text-[22px] font-bold text-black">Log In</h1>

      <input
        placeholder="email@ex.xom"
        name="email"
        type="email"
        className="w-full h-[35px] px-3 rounded-md border border-black outline-none bg-transparent placeholder-gray-800 text-black text-base"
        value={user.email}
        onChange={handleInputChange}
        required
      />

      <input
        placeholder="Password"
        name="password"
        type="password"
        className="w-full h-[35px] px-3 rounded-md border border-black outline-none bg-transparent placeholder-gray-800 text-black text-base"
        value={user.password}
        onChange={handleInputChange}
        required
      />

      <button
	 className="border border-black h-[35px] w-full rounded-md bg-[#140aad] hover:bg-[#08025e] font-bold transition-all duration-200 text-white"       
        type="submit"
      >
        {BtnText}
      </button>

      <a
        href="/signup"
        className="text-sm text-black font-bold hover:underline"
      >
        Do not have an account?
      </a>
    </form>
  </div>
</div>   )
}
export default Login;
