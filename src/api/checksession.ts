import { useNavigate } from "react-router-dom";
import { customFetch } from "./fetch";


export async function checkSession(navigate: ReturnType<typeof useNavigate>) {

    try {
        const response = await customFetch("user/current-user", {
          method: "GET"
        });

        if (!response.ok) {
            // Lanzar un error con un mensaje claro
            throw new Error(`Session invalid. Please log in again. Status: ${response.status}`);
          }
      
          // Si la sesión es válida, retornar `true`
          return true;
        } catch (error) {
          console.error("Error checking session:", error);
          navigate("/"); // Redirigir si hay un error
          throw error; // Lanzar el error para ser capturado en el componente
        }
}