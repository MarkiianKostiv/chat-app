import React from "react";
import { useForm } from "../../hooks/useForm";
import "./Login.css";
import { Link } from "react-router-dom";

export const Login = () => {
  const { formState, handleInputChange, validateForm, error } = useForm({
    emailOrUsername: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("Email or Username:", formState.emailOrUsername);
    console.log("Password:", formState.password);
  };

  return (
    <div className='login-container'>
      <h1>Login ChatApp</h1>
      <form
        className='login-form'
        onSubmit={handleSubmit}
      >
        <label className='input-container'>
          Email or Username:
          <input
            type='text'
            name='emailOrUsername'
            placeholder='Type email or username'
            value={formState.emailOrUsername}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className='input-container'>
          Password:
          <input
            type='password'
            name='password'
            placeholder='Type your password'
            value={formState.password}
            onChange={handleInputChange}
            required
          />
        </label>
        {error && <p className='error-message'>{error}</p>}
        <h3>
          Do not have account yet? <Link to={"/sign-up"}>Sign in</Link>
        </h3>
        <button
          className='submit-btn'
          type='submit'
        >
          Login
        </button>
      </form>
    </div>
  );
};
