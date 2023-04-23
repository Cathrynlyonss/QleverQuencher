import Goals from "./pages/goals"
import Login from './pages/login';
import { getAuth, signOut } from "firebase/auth";

const ProtectedRoutes2 = () => {
    const isAuth = getAuth();
    return (isAuth.currentUser != null) ? <Goals/> : <Login/>
};

export default ProtectedRoutes2
