import React from "react";
import { useForm } from "../../hooks/useForm";
import { useSignup } from "../../hooks/useSignup";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { Loader } from "../../componnets/ui/Loader";

export const SignUp = () => {
  const {
    formState,
    handleInputChange,
    validateForm,
    error: formError,
  } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loading, error: signupError, response } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    await signup(formState);

    if (response && !signupError) {
      navigate("/");
    }
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
        {(formError || signupError) && (
          <p className='error-message'>{formError || signupError}</p>
        )}

        <h3>
          Already have an account? <Link to={"/login"}>Log in</Link>
        </h3>
        <button
          className='submit-btn'
          type='submit'
          disabled={loading}
        >
          {loading ? <Loader /> : "Sign up"}
        </button>

        {response && <p className='success-message'>{response.message}</p>}
      </form>
    </div>
  );
};
