import React, { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { useLogin } from "../../hooks/useLogin";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { Loader } from "../../componnets/ui/Loader";
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from "../../hooks/useGoogleLogin";
import { GoogleLogin } from "@react-oauth/google";
import { ProgressLoader } from "../../componnets/ui/ProgrresLoader";

export const Login = () => {
  const {
    formState,
    handleInputChange,
    validateForm,
    error: formError,
  } = useForm({
    identifier: "",
    password: "",
  });

  const { login, loading, error: loginError, response } = useLogin();
  const {
    googleLogin,
    loading: googleLoading,
    response: googleResponse,
    error: googleError,
  } = useGoogleLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    await login(formState);

    if (response) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (response) {
      navigate("/");
    }
    if (googleResponse) {
      navigate("/");
    }
  }, [response, googleResponse, navigate]);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    const user: any = jwtDecode(token);

    const googleUserData = {
      email: user.email,
      email_verified: user.email_verified,
    };

    await googleLogin(googleUserData);
  };

  const handleGoogleError = () => {
    console.log("Login Failed");
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
            name='identifier'
            placeholder='Type email or username'
            value={formState.identifier}
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
        {(formError || loginError) && (
          <p className='error-message'>{formError || loginError}</p>
        )}
        <h3>
          Do not have an account yet? <Link to={"/sign-up"}>Sign up</Link>
        </h3>
        <button
          className='submit-btn'
          type='submit'
          disabled={loading || googleLoading}
        >
          {loading ? <Loader /> : "Login"}
        </button>

        <h3>Or login with Google</h3>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
        {googleLoading && <ProgressLoader />}

        {googleError && <p className='error-message'>{googleError}</p>}

        {response && !loginError && !googleError && (
          <p className='success-message'>{response.message}</p>
        )}
      </form>
    </div>
  );
};
