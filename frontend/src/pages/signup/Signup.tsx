import React, { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { useSignup } from "../../hooks/useSignup";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { Loader } from "../../componnets/ui/Loader";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useGoogleSignup } from "../../hooks/useGoogleRegister";
import { ProgressLoader } from "../../componnets/ui/ProgrresLoader";

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
  const {
    googleSignup,
    loading: googleLoading,
    response: googleResponse,
    error: googleError,
  } = useGoogleSignup();
  const navigate = useNavigate();

  useEffect(() => {
    if (response && !signupError) {
      navigate("/");
    }
    if (googleResponse && !googleError) {
      navigate("/");
    }
  }, [response, signupError, googleError, googleResponse, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    await signup(formState);
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    const user: any = jwtDecode(token);

    const googleUserData = {
      username: user.email.split("@")[0],
      firstName: user.given_name,
      lastName: user.family_name,
      email: user.email,
    };

    await googleSignup(googleUserData);
  };

  const handleGoogleError = () => {
    console.log("Login Failed");
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
        <h3>Or sign-up width Google?</h3>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
        {googleLoading && <ProgressLoader />}

        {googleError && <p className='error-message'>{googleError}</p>}

        {response && <p className='success-message'>{response.message}</p>}
      </form>
    </div>
  );
};
