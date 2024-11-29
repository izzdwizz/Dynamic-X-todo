import React, { useState } from "react";
import { Form } from "../components/Form";

const App = () => {
  const [isLogin, setIsLogin] = useState(false); // Toggle between login and register

  const togglePage = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-transparent ">
      <div className="w-full max-w-md px-8 py-[2rem] bg-white shadow-lg rounded-lg">
        {isLogin ? (
          <Form
            title="Login"
            fields={["email", "password"]}
            cta="Login"
            switchMessage="Don't have an account?"
            switchAction={togglePage}
            ctaButtonColor="bg-[#000070]"
          />
        ) : (
          <Form
            title="Register"
            fields={["email", "password"]}
            cta="Register"
            switchMessage="Already have an account?"
            switchAction={togglePage}
            ctaButtonColor="bg-[#000070]"
            setIsLogin={setIsLogin}
          />
        )}
      </div>
    </div>
  );
};

export default App;
