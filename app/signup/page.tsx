"use client"
import {FormEvent, useState, ChangeEvent} from "react"
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
interface User{
    userName: string;
    email: string;
    gender: string;
    password: string;
    confirmPassword: string;
}

const Signup: React.FC =() =>{
    const [BtnText, setBtnText] = useState("Sign Up");
    const router = useRouter();
    const[alertMessage, setAlertMessage] = useState<string>('Please Provide complete information.');
    const [alertDiv, setAlertDiv] = useState<boolean>(false);
    const [user, setUser] = useState<User>({
       userName: "",
       email: "",
       gender: "",
       password :"",
       confirmPassword: "",
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAlertDiv(false);
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
      };
    
      const onSignup = async (event: FormEvent) => {
        event.preventDefault();
        setBtnText("Processing...");
        const isEmptyField = Object.values(user).some((value) => value.trim() === "");
        const isPasswordValid = user.password === user.confirmPassword;

        if (isEmptyField) {
            setAlertMessage("Please fill out all fields.");
            setAlertDiv(true);
            return;
        }
        if(!isPasswordValid){
            setAlertMessage("Please confirm your password!");
            setAlertDiv(true);
            return;
        }

        try {
            const{email, password, userName, gender} = user;
            const { data: authData, error: authError } = await supabase.auth.signUp({ password, email });
            if(authError){
                console.log(authError);
            }
            else{
                const { data, error } = await supabase.from("users").insert([{ email, userName, gender}]);
                if(error){
                    console.log(error);
                }
               else{
                router.push("/login");
               }
            }
            
            
        } 
        catch (error: any) {
            setBtnText("Sign Up");
            const alertMessage = error.response.data.message
            if(alertMessage){
                setAlertMessage(alertMessage);
            }
            setAlertDiv(true);
        }
      };
    
    return (
        <div className="w-full h-screen flex items-center justify-center relative">
            {alertDiv ?(<div className="h-[10vh] flex items-center justify-center bg-red-300 self-start text-red-600 absolute border-2 border-red-600 w-[90vw]">{alertMessage}</div>) : (null)}
            <form>
            <div className="border-2 border-black rounded-[15px] h-[350px] w-[310px] flex flex-col items-center justify-around">
                <h1 className="text-[22px] font-bold">Sign Up</h1>
                <div className="flex flex-col items-center justify-around w-[88%] h-[65%]">
                    <input placeholder="Your unique userName" name="userName" className="w-full h-[30px] px-[5px] rounded-[5px] outline-none border border-black" value={user.userName} onChange={handleInputChange} required></input>
                    <input placeholder="Email@example.com" name="email" type="email" className="w-full h-[30px] px-[5px] rounded-[5px] outline-none border border-black" value={user.email} onChange={handleInputChange} required></input>
                    <div className="h-[30px] w-full text-[14px] flex justify-around items-center">
                    <label >Gender</label>
                    <div className="flex items-center gap-[3px]">
                    <input id="male" type="radio" name="gender" value="male" onChange={handleInputChange} required />
                    <label htmlFor="gender">Male</label>
                    </div>

                    <div className="flex items-center gap-[3px]">
                    <input id="female" type="radio" name="gender" value="female" onChange={handleInputChange} required/>
                    <label htmlFor="gender">Female</label>                        
                    </div>               
                    </div>

                    <input placeholder="Password (6-8 characters)" name="password" type="password" className="w-full h-[30px] px-[5px] rounded-[5px] outline-none border border-black" value={user.password} onChange={handleInputChange} required></input>
                    <input placeholder="Confirm Password" type="password" name="confirmPassword" className="w-full h-[30px] px-[5px] rounded-[5px] outline-none border border-black" onChange={handleInputChange} required></input>
                </div>
                <div className="flex flex-col items-center justify-between w-full">
                <button className="border-2 border-green-800 h-[30px] w-[90%] rounded-[8px] bg-[#98dd98] hover:bg-[#7fc77a] font-bold" type="submit"  onClick={onSignup}>{BtnText}</button>
                <a href="/login">Already have an account</a>
                </div>
            </div>
            </form>
        </div>
    )
}
export default Signup;
