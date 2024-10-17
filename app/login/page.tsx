import React from "react";
import Image from "next/image";
import LoginForm from "@/components/LoginForm";

const LoginPage = () => {

  return (
    <div className="h-screen sm:flex justify-between items-center max-w-5xl mx-auto">
      {/* Left side - Image */}
      <div className="w-full flex-1 h-full relative hidden sm:flex">
        <Image src={'https://media.istockphoto.com/id/484757150/photo/medical-illustrate.jpg?s=612x612&w=0&k=20&c=jp6RaYHu4HCzNEPcnlEw7N-5YiL_kKj5U5DpoMuxyTA='} alt="Login illustration" layout="fill" priority />
      </div>

      {/* Right side - Login form */}
      <div className="w-full h-full flex-1 p-8 flex justify-center items-center">
       <LoginForm/>
      </div>
    </div>
  );
};

export default LoginPage;