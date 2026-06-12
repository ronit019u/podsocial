import { getMe, logout } from "@/service/authService";
import { type AuthContextType, type User } from "@/types";
import { createContext, useContext } from "react";
    import { useQuery, useQueryClient } from "@tanstack/react-query";
//because react requires default value when initializing a context
const AuthContext = createContext<AuthContextType | null >(null);

//this is a function that has expects object children React.ReactNode tells complier that
//children can be anything that React is capable of rendering them 
export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const queryClient = useQueryClient()

    //automatically runs when the application first loads
    //because backend uses the httpOnly cookie it asks server handles the network conversation
    const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,         // if /me returns 401, don't retry
    staleTime: Infinity,  // don't refetch in background unnecessarily
  });

    const login = (userData: User) =>  {
        //puts the user in cache
        queryClient.setQueryData(["me"], userData)
        //verify with the backend fixes the problem logout not showing without refereshing the browser
        queryClient.invalidateQueries({queryKey:["me"]})
    }

    const logoutUser = async() => {
        await logout()
      queryClient.setQueryData(["me"], null)
      queryClient.invalidateQueries({queryKey:["me"]})
    };

    if(isLoading) return <div>Loading...</div>

    // only cares about user nothing else 
    return (
        <AuthContext.Provider value={{user: user ?? null, login, logout: logoutUser, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

  export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) throw new Error("useAuth must be used inside AuthProvider")
    return context;
}

