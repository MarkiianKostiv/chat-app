import React, { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { useLogin } from "../../hooks/useLogin";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { Loader } from "../../componnets/ui/Loader";

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
  }, [response, navigate]);

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
          disabled={loading}
        >
          {loading ? <Loader /> : "Login"}
        </button>

        {response && !loginError && (
          <p className='success-message'>{response.message}</p>
        )}
      </form>
    </div>
  );
};
