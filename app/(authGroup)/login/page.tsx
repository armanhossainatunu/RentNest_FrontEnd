import React from "react";
import LoginForm from "./_components/loginForm";


const loginPage = () => {
  return (
    <>
      <div className="flex min-h-[calc(100vh-70px)] items-center justify-center">
        <div className="w-full max-w-sm space-y-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-3xl font-bold">Welcome to Back!</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default loginPage;
