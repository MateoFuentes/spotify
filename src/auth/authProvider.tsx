import { useContext, createContext, useState } from "react";

interface AuthProviderProps{
    children: React.ReactNode
}

const authContext = createContext(
    {
        isAuthenticated: false
    }
)

export function AuthProvider( {children}: AuthProviderProps ){
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1]!

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    const valid = token ? true : false;
    const [isAuthenticated, serIsAuthenticated] = useState(valid);

    return (
        <authContext.Provider value={{ isAuthenticated }}>
            {children}     
        </authContext.Provider>
    )   
}

export const useAuth = () => useContext(authContext);