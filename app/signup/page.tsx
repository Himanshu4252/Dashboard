"use client";

import { FormEvent, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

interface User {
  userName: string;
  email: string;
  gender: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const [BtnText, setBtnText] = useState("Sign Up");
  const router = useRouter();
  const [alertMessage, setAlertMessage] = useState<string>("Please Provide complete information.");
  const [alertDiv, setAlertDiv] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    userName: "",
    email: "",
    gender: "",
    password: "",
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
      setBtnText("Sign Up");
      return;
    }

    if (!isPasswordValid) {
      setAlertMessage("Please confirm your password!");
      setAlertDiv(true);
      setBtnText("Sign Up");
      return;
    }

    try {
      const { email, password, userName, gender } = user;
      const { data: authData, error: authError } = await supabase.auth.signUp({ password, email });

      if (authError) {
        console.log(authError);
        setAlertMessage(authError.message);
        setAlertDiv(true);
        setBtnText("Sign Up");
      } else {
        const { data, error } = await supabase.from("users").insert([{ email, userName, gender }]);
        if (error) {
          console.log(error);
          setAlertMessage("Failed to save user info.");
          setAlertDiv(true);
          setBtnText("Sign Up");
        } else {
          router.push("/login");
        }
      }
    } catch (error: any) {
      setBtnText("Sign Up");
      const alertMessage = error?.response?.data?.message || "An unexpected error occurred.";
      setAlertMessage(alertMessage);
      setAlertDiv(true);
    }
  };

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

    {/* Signup Form */}
      <div className="rounded-2xl p-1 w-full max-w-[360px] border border-white/30 bg-white/10 backdrop-blur-md shadow-xl">
    <form
      onSubmit={onSignup}
      className="max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl w-full p-5 flex flex-col items-center gap-4"
    >       <h1 className="text-[22px] font-bold">Sign Up</h1>

        <input
          placeholder="Your unique userName"
          name="userName"
          className="w-full h-[35px] px-3 rounded-md border border-black outline-none bg-transparent placeholder-gray-800"
          value={user.userName}
          onChange={handleInputChange}
          required
        />
        <input
          placeholder="Email@example.com"
          name="email"
          type="email"
          className="w-full h-[35px] px-3 rounded-md border border-black outline-none bg-transparent placeholder-gray-800"
          value={user.email}
          onChange={handleInputChange}
          required
        />

        <div className="w-full text-[14px] flex justify-around items-center">
          <label className="mr-2">Gender:</label>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1">
              <input id="male" type="radio" name="gender" value="male" onChange={handleInputChange} required />
              Male
            </label>
            <label className="flex items-center gap-1">
              <input id="female" type="radio" name="gender" value="female" onChange={handleInputChange} required />
              Female
            </label>
          </div>
        </div>

        <input
          placeholder="Password (6-8 characters)"
          name="password"
          type="password"
          className="w-full h-[35px] px-3 rounded-md border border-black outline-none bg-transparent placeholder-gray-800"
          value={user.password}
          onChange={handleInputChange}
          required
        />
        <input
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          className="w-full h-[35px] px-3 rounded-md border border-black outline-none bg-transparent placeholder-gray-800"
          onChange={handleInputChange}
          required
        />

        <button
          className="border border-black h-[35px] w-full rounded-md bg-[#140aad] hover:bg-[#08025e] font-bold transition-all duration-200 text-white"
          type="submit"
        >
          {BtnText}
        </button>
        <a href="/login" className="text-sm text-black font-bold hover:underline">
          Already have an account?
        </a>
      </form>
    </div>
  </div>
	);
};

export default Signup;

