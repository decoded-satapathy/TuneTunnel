import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HeadingComponent } from "../components/HeadingComponent"
import { Subheading } from "../components/Subheading"
import { InputComponent } from "../components/InputComponent";
import { ButtonComponent } from "../components/ButtonComponent";
import { BottomWarningComponent } from "../components/BottomWarningComponent";
import { BACKEND_URL } from "../../config";
import { login, changeName } from "../redux/features/userSlice";
import { useDispatch } from "react-redux";
import Preloader from "../assets/Logos/svg/preloader_ripples.svg"

export function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const inputFields = {
  //   username: "",
  //   password: "",
  // }

  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  return <div className="flex justify-center items-center h-screen w-max  sm:w-screen bg-white sm:bg-gradient-to-br sm:from-purple-300  sm:to-blue-300">
    {isLoading ? (<Loader />) : null}
    <div className="pl-5  bg-white border-0 border-white  sm:border-2 sm:border-gray-100 w-screen h-max sm:w-80 pr-5 sm:h-max rounded-md pb-5 shadow-none sm:shadow-2xl sm:shadow-blue-800 ">
      <div className="mb-7 flex flex-col justify-center items-center text-center">
        <HeadingComponent title="Sign In"></HeadingComponent>
        <Subheading content="Enter your credentials to access your account"></Subheading>
      </div>

      <InputComponent label="Email" placeholder="Enter your email" reference={emailRef}></InputComponent>
      <InputComponent label="Password" placeholder="Enter your password" reference={passwordRef} ></InputComponent>


      <div className="mt-4">
        <ButtonComponent label="Sign In" onClick={signInButtonOnClick}></ButtonComponent>
      </div>


      <BottomWarningComponent text="Don't have an account?" to="/signup" linkLabel={"SignUp"}></BottomWarningComponent>

    </div>
  </div >

  async function signInButtonOnClick() {
    setIsLoading(true);
    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      return alert("Enter all the details")
    }

    const res = await fetch(`${BACKEND_URL}/api/v1/user/signin`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: emailRef.current.value, password: passwordRef.current.value })
    });
    const ans = await res.json();
    if (res.status === 405) {
      alert(ans.msg);
      setIsLoading(false)
      return navigate("/signup")
    }
    if (res.status === 411) {
      setIsLoading(false)
      return alert(ans.msg)

    }

    localStorage.setItem("token", ans.jwt);
    dispatch(login());
    dispatch(changeName(ans.name));
    setIsLoading(false)
    alert("Login is successfully")

    navigate("/", { state: ans })
  }
}
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-70">
    <img className='w-40 h-40' src={Preloader}></img>
  </div>
);
