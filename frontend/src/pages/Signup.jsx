import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeadingComponent } from "../components/HeadingComponent";
import { Subheading } from "../components/Subheading";
import { InputComponent } from "../components/InputComponent";
import { ButtonComponent } from "../components/ButtonComponent";
import { BottomWarningComponent } from "../components/BottomWarningComponent";
import { BACKEND_URL } from "../../config";
import { changeName, login } from "../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../assets/Logos/svg/preloader_ripples.svg"
export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)

  const firstNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  return <div className="flex  justify-center  items-center h-screen w-max  sm:w-screen bg-gradient-to-br from-purple-800 to-blue-800 sm:bg-gradient-to-br sm:from-purple-300  sm:to-blue-300">
    {isLoading ? (<Loader />) : null}
    <div className="flex flex-col justify-center   pl-5  border-0 border-white  h-screen bg-white sm:border-2 sm:border-gray-100 w-screen sm:w-96 pr-5 sm:h-max rounded-md pb-5 shadow-none drop-shadow-2xl sm:shadow-2xl sm:shadow-blue-700 ">
      <div className="mb-7 flex flex-col justify-center items-center text-center">
        <HeadingComponent title={'Sign Up'}></HeadingComponent>
        <Subheading content={"Enter your information to create an account"}></Subheading>
      </div>

      <InputComponent label={"Name"} placeholder={"Enter name"} reference={firstNameRef}></InputComponent>
      <InputComponent label={"Email"} placeholder={"example@org.com"} reference={emailRef}></InputComponent>
      <InputComponent label={"Password"} placeholder={"Enter your password"} reference={passwordRef}></InputComponent>


      <div className="mt-4">
        <ButtonComponent label={"Sign Up"} onClick={signUpButtonOnClick}></ButtonComponent>
      </div>

      <BottomWarningComponent text={"Already have an account ?"} to={"/signin"} linkLabel={"Login"} ></BottomWarningComponent>
    </div>

  </div >

  async function signUpButtonOnClick() {
    setIsLoading(true);
    const enteredFisrtName = firstNameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredpassword = passwordRef.current.value;
    if (firstNameRef.current.value === "" || emailRef.current.value === "" || passwordRef.current.value === "") {
      return alert("Enter all the details")
    }

    const res = await fetch(`${BACKEND_URL}/api/v1/user/signup`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: enteredFisrtName,
        email: enteredEmail,
        password: enteredpassword
      })
    });
    setIsLoading(false);
    const ans = await res.json();
    if (res.status === 411 || res.status === 403) {
      return alert(ans.msg)

    }

    dispatch(login());
    dispatch(changeName(enteredFisrtName));
    alert("New user added successfully")

    localStorage.setItem("token", ans.jwt);

    navigate("/", { state: ans })
  }
}
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-70">
    <img className='w-40 h-40' src={Preloader}></img>
  </div>
);
