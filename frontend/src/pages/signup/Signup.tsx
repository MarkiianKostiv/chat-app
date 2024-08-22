import React from "react";
import { useForm } from "../../hooks/useForm";
import "./Signup.css";
import { Link } from "react-router-dom";
export const SignUp = () => {
  const { formState, handleInputChange, validateForm, error } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("firstName:", formState.firstName);
    console.log("lastName:", formState.lastName);
    console.log("email:", formState.email);
    console.log("username:", formState.username);
    console.log("password:", formState.password);
    console.log("confirmPassword:", formState.confirmPassword);
  };

  return (
    <div className='login-container'>
      <h1>Sign up ChatApp</h1>
      <form
        className='login-form'
        onSubmit={handleSubmit}
      >
        <div className='labels-container'>
          <div className='left-container'>
            <label className='input-container'>
              First name:
              <input
                type='text'
                name='firstName'
                placeholder='Type your First name'
                value={formState.firstName}
                onChange={handleInputChange}
                required
              />
            </label>
            <label className='input-container'>
              Username:
              <input
                type='text'
                name='username'
                placeholder='Type your username'
                value={formState.username}
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
          </div>
          <div className='right-container'>
            <label className='input-container'>
              Last name:
              <input
                type='text'
                name='lastName'
                placeholder='Type your Last name'
                value={formState.lastName}
                onChange={handleInputChange}
                required
              />
            </label>
            <label className='input-container'>
              Email:
              <input
                type='text'
                name='email'
                placeholder='Type your email'
                value={formState.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <label className='input-container'>
              Confirm Password:
              <input
                type='password'
                name='confirmPassword'
                placeholder='Confirm your password'
                value={formState.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
        </div>
        {error && <p className='error-message'>{error}</p>}

        <h3>
          Already have account? <Link to={"/login"}>Log in</Link>
        </h3>
        <button
          className='submit-btn'
          type='submit'
        >
          Sign up
        </button>
      </form>
    </div>
  );
};
