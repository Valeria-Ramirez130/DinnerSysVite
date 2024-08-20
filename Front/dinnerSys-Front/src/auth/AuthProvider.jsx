import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    UserId: "",
    setUserId: () => { },
    Nombre: "",
    setNombre: () => { },
    Apellido: "",
    setApellido: () => {},
    Rol: "",
    setRol: () => { }
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("User")
    );

    if (!isAuthenticated) {
        localStorage.clear();
    }

    console.log(isAuthenticated)

    const userData = useMemo(() => {
        // console.log("Calculating user data...");
        if (isAuthenticated) {
            const DataUsuario = JSON.parse(localStorage.getItem("User"));
            return {
                UserId: DataUsuario.id,
                Nombre: DataUsuario.Nombre,
                Apellido: DataUsuario.Apellido,
                Rol: DataUsuario.rol
            };
        }
        return {
            UserId: "",
            Rol: "",
            Nombre: "",
            Apellido: ""
        };
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, ...userData}}>
            {children}
        </AuthContext.Provider>
    );
}
