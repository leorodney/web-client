import { useNavigate } from "react-router-dom";
import { endpoints, server } from "../utils/axios";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { FormEvent } from "react";

export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const authLogout = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const logoutResponse = await server.get(endpoints.logout);
            if(logoutResponse.data.ok) {
                dispatch(logout())
                return navigate("/login");
            };
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <form onSubmit={authLogout} className="flex items-center justify-evenly w-full group cursor-pointer">
        <i className="fi fi-br-sign-out-alt text-red-400 group-hover:text-red-500 transition-all flex items-center text-sm"></i>
        <button type="submit" className="text-red-400 group-hover:text-red-500 transition-all font-medium text-sm text-center">Logout</button>
    </form>
  )
};
