import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";
import { ThemeContext } from "../Context/ThemeContext.jsx";

const Register = () => {
  const { registerUsers } = useContext(UserContext);
  const { darkMode } = useContext(ThemeContext);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password)
      return alert("Fill all fields");
    registerUsers(form);
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen
        ${darkMode ? "bg-gray-900" : "bg-green-100"}`}
    >
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col p-8 w-full max-w-md shadow-2xl rounded-2xl gap-2
          ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-black"}`}
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Register
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleInput}
          className={`p-2 rounded-2xl outline-none border
            ${darkMode
              ? "bg-blue-950  text-white"
              : "border-green-300"}`}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInput}
          className={`p-2 rounded-2xl outline-none border
            ${darkMode
              ? "bg-blue-950  text-white"
              : "border-green-300"}`}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInput}
          className={`p-2 rounded-2xl outline-none border
            ${darkMode
              ? "bg-blue-950 text-white"
              : "border-green-300"}`}
        />

        <button
          type="submit"
          className={`p-2 rounded-2xl 
            ${darkMode
              ? "bg-blue-500  text-gray-900"
              : "bg-green-900  text-white"}`}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;