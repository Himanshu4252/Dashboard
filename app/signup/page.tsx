"use client"
import {FormEvent, useState, ChangeEvent} from "react"
import { useRouter } from "next/navigation";
import Axios from 'axios';
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
        try {
            const response = await Axios.post("http://localhost:3000/api/users/signup", user);
            console.log(response);
            router.push("/login");
            
        } 
        catch (error:any) {
            setBtnText("Sign Up")
            setAlertDiv(true);
            console.error("Error occurred on signup page:", error.message);
        }
      };
    
    


    return (
        <div className="w-full h-screen flex items-center justify-center ">
            {alertDiv ?(<div className="h-[10vh] w-[200px] flex items-center justify-center bg-red-300 text-red-600">Please Correct the details...</div>) : (null)}
            <form>
            <div className="border-2 border-black rounded-[15px] h-[350px] w-[310px] flex flex-col items-center justify-around">
                <h1 className="text-[22px] font-bold">Sign Up</h1>
                <div className="flex flex-col items-center justify-around w-[88%] h-[65%]">
                    <input placeholder="UserName" name="userName" className="w-full h-[30px] px-[5px] rounded-[5px] outline-none border border-black" value={user.userName} onChange={handleInputChange} required></input>
                    <input placeholder="Email@example.com" name="email" type="email" className="w-full h-[30px] px-[5px] rounded-[5px] outline-none border border-black" value={user.email} onChange={handleInputChange} required></input>
                    <div className="h-[30px] w-full text-[14px] flex justify-between items-center">
                    <label >Gender</label>

                    <div className="flex items-center gap-[3px]">
                    <input id="male" type="radio" name="gender" value="male" onChange={handleInputChange} required />
                    <label htmlFor="gender">Male</label>
                    </div>

                    <div className="flex items-center gap-[3px]">
                    <input id="female" type="radio" name="gender" value="female" onChange={handleInputChange} required/>
                    <label htmlFor="gender">Female</label>                        
                    </div>

                    <div className="flex items-center gap-[3px]">
                    <input id="other" type="radio" name="gender" value="other" onChange={handleInputChange}  required/>
                    <label htmlFor="gender">Other</label>                        
                    </div>

                    </div>

                    <input placeholder="Password" name="password" type="password" className="w-full h-[30px] px-[5px] rounded-[5px] outline-none border border-black" value={user.password} onChange={handleInputChange} required></input>
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