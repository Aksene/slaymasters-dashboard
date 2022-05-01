import React, {useState, useEffect, useContext, createContext} from 'react'
import {supabase} from '../database/Database'

const  authContext = createContext();

export const AuthProvider = ({children}) => {
    //Call our custom hook
    const auth = useProviderAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext)
}

function useProviderAuth() {
    // If we are logged in return the user object
    // Create useState for user 
    const [user, setUser] = useState(null)

    // Then declare the login & logout function
    const Login = async (email) => {
        const {error, user} = await supabase.auth.signIn({email})

        if(error) {
            console.log(error)
        }

        return {error, user}

    }

    const Logout = async () => {
        const {error} = await supabase.auth.signOut()

        if(error) {
            console.log(error)
        }

        setUser(null)

    }

    useEffect(() => {
        // Everytime the page loads we check if we have a session
        const user = supabase.auth.user()
        setUser(user)

        // Look up the latest event to see if the user was signed in or signed out
        const auth = supabase.auth.onAuthStateChange((event, session) => {
                if(event === 'SIGNED_IN'){
                    setUser(session.user)
                }

                if(event === "SIGNED_OUT"){
                    setUser(null)
                }

                return () => auth.unsubscribe()
        })


    }, [])

    return {
        user,
        Login,
        Logout
    }

}
