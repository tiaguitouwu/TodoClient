import { useEffect, useState } from "react";
import { getProtectedData } from "../assets/login";

export default function useProtected(){

    const [message, setMessage] = useState('');

    useEffect(() => {
      const fetchProtectedData = async () => {
        try {
          const data = await getProtectedData();
          setMessage(data);
        } catch (error) {
          console.error('Error al obtener datos protegidos', error);
          setMessage('No autorizado');
        }
      };
  
      fetchProtectedData();
    }, []);

    return{ message }
}

