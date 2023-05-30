import { server, endpoints } from "../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebySide from "../components/SidebySide";
import { loginFields } from "../utils/form";
import { Login } from "../interfaces/form";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import useAuthorization from "../hooks/authorization";

export default function Login() {
  // check if user is authenticated and redirect to home if true
  useAuthorization("/login");
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({emailorusername: "", password: ""} as Login);
  const [errors, setErrors] = useState([] as string[]);
  const dispatch = useDispatch();

  // set time to empty errors using setTimeout to avoid memory leaks and UseEffect
  useEffect(() => {
    if(errors.length == 0) return;
    const errorsWipeChrono =() => {
      setErrors([] as string[]);
    };
    setTimeout(errorsWipeChrono, 5000);
    return () => {
      clearTimeout(5000);
    }
  }, [errors]);



  const authLogin = async (e: SubmitEvent) => {
    e.preventDefault();
    if(!loginData.emailorusername || !loginData.password) return setErrors([...errors, "Please fill in all fields"]);
    try {
      const authResponse =  await server.post(endpoints.login, loginData);

      if(authResponse.data.ok){
        // dispatch auth action to the store:
        console.log("logged in", authResponse.data.user);
        dispatch(login(authResponse.data.user));
        return navigate("/");
      }

    } catch (error : any) {
      console.error(error);
      error.response?.status == 500 ? setErrors([...errors, "Somethings went wrong please try again soon."]) : setErrors([...errors, error.response.data.error]);
    }
  }

  return (
    <SidebySide title="Login" fields={loginFields} onSubmit={authLogin} authData={[loginData, setLoginData]} errors={errors}/>
  )
}
