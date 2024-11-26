import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div>
      <Link to="/create-task" className="cursor-pointer">
        SignIn
      </Link>
    </div>
  );
};

export default SignIn;
