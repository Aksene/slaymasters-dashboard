import { useAuth } from "../Auth/auth";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({children}) => {
        const isAdmin = false
        // Call custom useAuth hook
        const auth = useAuth()

        if(auth.user.id === "6bf87d06-1275-4229-8d6d-e1fbc56fa297"){
                isAdmin = true
        }else{
                isAdmin = false
        }
        // If user is logged in then direct the user to the page
        // If not then direct them to the sign in page using Navigate
        return isAdmin ? children : <Navigate to ={"/sign-in"}/>
}

export default AdminProtectedRoute;
