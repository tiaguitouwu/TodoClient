export interface Todo{
    _id:number,
    title:string,
    completado:boolean
}

export interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}