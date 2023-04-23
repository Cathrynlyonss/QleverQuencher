import Weekly from "./pages/weekly"
import Daily from "./pages/daily"
import Login from './pages/login';
import { getAuth, signOut } from "firebase/auth";

const ProtectedRoutes = () => {
    const isAuth = getAuth();
    return (isAuth.currentUser != null) ? <Weekly/> : <Login/>
};

export default ProtectedRoutes