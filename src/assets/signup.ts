import Cookies from "universal-cookie";
import { customFetch } from "../api/fetch";

const cookies = new Cookies();

export async function signup(usuario:string,password:string): Promise<string> {
    const response = await customFetch('user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username:usuario, password:password }),
    });

    const data = await response.json();

    if (response.ok) {
      cookies.set("session",data.token)
      return JSON.stringify('OK');
    }else{
      throw new Error(JSON.stringify(data.errors[0].message));
    }
    
} 


