import Daily from "./pages/daily"
import Login from './pages/login';
import { getAuth, signOut } from "firebase/auth";

const ProtectedRoutes1 = () => {
    const isAuth = getAuth();
    return (isAuth.currentUser != null) ? <Daily/> : <Login/>
};

export default ProtectedRoutes1
