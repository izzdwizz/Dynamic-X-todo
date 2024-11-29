import React, { useState } from "react";
import { useLoginUser } from "../hooks/auth/login.hooks";
import { useAuthContext } from "../Context/AuthContext";
import { useRegisterUser } from "../hooks/auth/register.hooks";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export const Form = ({
  title,
  fields,
  cta,
  switchMessage,
  switchAction,
  ctaButtonColor,
  setIsLogin,
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const { mutate: loginUser } = useLoginUser();
  const { mutate: registerUser } = useRegisterUser();
  const { setUserData, setUserToken } = useAuthContext();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    fields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      } else if (
        field === "email" &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData[field])
      ) {
        newErrors[field] = "Invalid email address";
      } else if (field === "password" && formData[field].length < 6) {
        newErrors[field] = "Password must be at least 6 characters";
      }
    });
    return newErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      if (title === "Login") {
        loginUser(formData, {
          onSuccess: (response) => {
            setUserToken(response?.data?.token);

            if (response?.data) {
              toast.success("Success");
              setFormData({});
              setTimeout(() => navigate("/create-task"), 5000);
            }
          },
          onError: (error) => {
            toast.error("Unfortunately an error occured:", error);
          },
        });
      } else {
        registerUser(formData, {
          onSuccess: (response) => {
            if (response?.data) {
              setUserData(response?.data?.data);

              toast.success("User successfully registered!");
              setFormData({});
              setTimeout(() => setIsLogin(true), 5000);
            }
          },
          onError: (error) => {
            toast.error("Unfortunately an error occured:", error);
          },
        });
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center opacity-80">
        {title}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="block text-sm font-medium text-gray-700 pb-2 capitalize"
            >
              {field}
            </label>
            <input
              type={field === "password" ? "password" : "text"}
              id={field}
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors[field] ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring focus:ring-indigo-200`}
            />
            {errors[field] && (
              <p className="mt-1 text-sm text-red-500">{errors[field]}</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className={`${ctaButtonColor} text-white w-full py-2 mt-8 rounded-[2rem] shadow hover:opacity-80`}
        >
          {cta}
        </button>
      </form>
      <p className="mt-[2rem] text-slate-400 font-[200] text-sm text-center">
        {switchMessage}{" "}
        <button
          onClick={switchAction}
          className="text-indigo-600  hover:opacity-80"
        >
          Click here
        </button>
      </p>
    </div>
  );
};
