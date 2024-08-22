import { useState } from "react";

interface FormState {
  [key: string]: string;
}

export const useForm = (initialState: FormState) => {
  const [formState, setFormState] = useState(initialState);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const validateForm = () => {
    const isFormValid = Object.values(formState).every((value) => value !== "");
    if (!isFormValid) {
      setError("Please fill in all fields.");
      return false;
    }
    setError("");
    return true;
  };

  return {
    formState,
    handleInputChange,
    validateForm,
    error,
  };
};
