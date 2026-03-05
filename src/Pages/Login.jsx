import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext.jsx";
import { ThemeContext } from "../Context/ThemeContext.jsx";

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const { darkMode } = useContext(ThemeContext);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password)
      return alert("Fill all fields");
    loginUser(form);
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen
        ${darkMode ? "bg-black" : "bg-green-100"}`}
    >
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col p-8 w-full max-w-md shadow-2xl rounded-2xl gap-4
          ${darkMode ? "bg-blue-100 text-gray-100" : "bg-white text-gray-900"}`}
      >
        <h2 className="text-2xl  rounded-2xl text-black font-bold text-center mb-6">
          Login Here!
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Your Email..."
          onChange={handleInput}
          className={`p-2 rounded-2xl outline-none border
            ${darkMode
              ? "bg-blue-950  text-white"
              : "border-green-500"}`}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Your Password..."
          onChange={handleInput}
          className={`p-2 rounded-2xl outline-none border
            ${darkMode
              ? "bg-blue-950  text-white"
              : "border-green-500"}`}
        />

        <button
          type="submit"
          className={`p-2 rounded font-semibold transition
            ${darkMode
              ? "bg-blue-950 rounded-2xl"
              : "bg-green-900 rounded-2xl text-white"}`}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;