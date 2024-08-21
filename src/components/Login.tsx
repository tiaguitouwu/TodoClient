import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../assets/login";

interface ButtonTypes {
  value: string;
}

interface InputProps {
    type: string;
    id: string;
    name: string;
    label: string;
    placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ type, id, name, label, placeholder, value, onChange }: InputProps) {
    return (
      <label className="text-gray-500 block mt-3">
        {label}
        <input
          autoComplete={name}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-black focus:outline-none focus:ring focus:ring-gray-200"
        />
      </label>
    );
  }
  
  function Button({ value }: ButtonTypes) {
    return (
      <button
        type="submit"
        className="mt-6 transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-slate-700 to-slate-500 hover:from-gray-600 hover:to-gray-400 focus:bg-black transform hover:-translate-y-1 hover:shadow-lg"
      >
        {value}
      </button>
    );
  }


export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ Username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // Función para eliminar todas las cookies
    const deleteAllCookies = () => {
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
    };
    deleteAllCookies();

    // Capturar el mensaje de error del estado de navegación
    if (location.state && location.state.error) {
      setErrorMessage(location.state.error);
    }
  }, [location.state]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Validar entradas antes de enviar
    if (!formData.Username || !formData.password) {
      setErrorMessage("Please enter both username and password.");
      return;
    }
    try {
      await login(formData.Username, formData.password);
      navigate("/Todo");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message || "An error occurred during login.");
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };



  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen w-screen font-mono">
      <div className="border-t-8 rounded-sm border-black bg-white p-12 shadow-2xl w-96">
        <h1 className="font-bold text-center block text-2xl">Log In</h1>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            id="Username"
            name="Username"
            label="Username"
            placeholder="Username"
            value={formData.Username}
            onChange={handleInputChange}
          />
          <Input
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder="••••••••••"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button value="Submit" />
        </form>
        <div className="text-center mt-4">
          <a href="/Register" className="text-blue-500 hover:text-blue-700">
            Don't have an account? Register here
          </a>
        </div>
      </div>
    </div>
  );
}
  