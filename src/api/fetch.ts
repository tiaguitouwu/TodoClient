
import Cookies from "universal-cookie";

const API_URL = import.meta.env.VITE_URL_API;
const cookies = new Cookies()
const getAuthToken = () => cookies.get('session')

export const customFetch = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
  const token = getAuthToken(); 
  const headers: HeadersInit = {
    ...options.headers,
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    console.log('Token inválido o expirado. Redirigiendo a login...');
    // Aquí puedes implementar redirección a la página de login o refrescar el token
    // Por ejemplo, podrías usar `window.location.href = '/login';` para redirigir
    window.location.href = '/'
  }

  if (!response.ok) {
    const error = await response.json();
    const errorMessage = (error.errors && error.errors[0] && error.errors[0].message) 
    ? error.errors[0].message 
    : "An error occurred during login.";

    throw new Error(errorMessage || 'Error desconocido');
  }

  return response;
};
