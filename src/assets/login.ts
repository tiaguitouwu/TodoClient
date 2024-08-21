import { customFetch } from "../api/fetch"; // Asegúrate de que customFetch esté bien importado
import Cookies from 'universal-cookie'; // Importa la librería para manejar cookies si aún no lo has hecho

const cookies = new Cookies();

export async function login(usuario: string, password: string): Promise<void> {
    try {
        const response = await customFetch('user/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario, password }),
        });

        const data = await response.json();

        if (response.ok) {
            cookies.set("session", data.token);
        }
    } catch (error) {
        // Aquí también puedes manejar errores de red u otros problemas que puedan ocurrir
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred.");
        }
    }
}