
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import { login, changeName } from "../redux/features/userSlice";
import { useDispatch } from "react-redux";
import Preloader from "../assets/Logos/svg/preloader_ripples.svg";
import "./Login.css"
export function SignIn() {
  const handleSwitch1 = () => {
    document.querySelector(".loginMsg").classList.toggle("visibility");
    document.querySelector(".frontbox").classList.add("moving");
    document.querySelector(".signupMsg").classList.toggle("visibility");
    document.querySelector(".signup").classList.toggle("hide");
    document.querySelector(".login").classList.toggle("hide");
  };

  const handleSwitch2 = () => {
    document.querySelector(".loginMsg").classList.toggle("visibility");
    document.querySelector(".frontbox").classList.remove("moving");
    document.querySelector(".signupMsg").classList.toggle("visibility");
    document.querySelector(".signup").classList.toggle("hide");
    document.querySelector(".login").classList.toggle("hide");
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  async function signInButtonOnClick() {
    setIsLoading(true);
    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      alert("Enter all the details");
      setIsLoading(false);
      return;
    }

    try {
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
        navigate("/signup");
      } else if (res.status === 411) {
        alert(ans.msg);
      } else {
        localStorage.setItem("token", ans.jwt);
        dispatch(login());
        dispatch(changeName(ans.name));
        alert("Login is successful");
        navigate("/", { state: ans });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const firstNameRef = useRef();
  const emailRef1 = useRef();
  const passwordRef1 = useRef();

  const signUpButtonOnClick = async () => {
    setIsLoading(true);
    const enteredFirstName = firstNameRef.current.value;
    const enteredEmail = emailRef1.current.value;
    const enteredPassword = passwordRef1.current.value;
    if (!enteredFirstName || !enteredEmail || !enteredPassword) {
      setIsLoading(false);
      return alert("Enter all the details");
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: enteredFirstName,
          email: enteredEmail,
          password: enteredPassword,
        }),
      });

      const ans = await res.json();
      setIsLoading(false);

      if (res.status === 411 || res.status === 403) {
        return alert(ans.msg);
      }

      dispatch(login());
      dispatch(changeName(enteredFirstName));
      alert("New user added successfully");

      localStorage.setItem("token", ans.jwt);

      navigate("/", { state: ans });
    } catch (error) {
      setIsLoading(false);
      alert("An error occurred. Please try again.");
    }
  };


  return (
    <div className="background1">
      {isLoading ? <Loader /> : null}
      <div className="container">
        <div className="backbox">
          <div className="loginMsg">
            <div className="textcontent" onClick={handleSwitch1} id="switch1">
              <p className="title">Don't Have an account?</p>
              <Link to="/signup">
                <button>Sign Up</button>
              </Link>
            </div>
          </div>
          <div className="signupMsg visibility">
            <div className="textcontent" onClick={handleSwitch2} id="switch2">
              <p className="title">Have an account?</p>
              <Link to="/signin">
                <button>Log In</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="frontbox">
          <div className="login">
            <h2>Log In</h2>
            <div className="inputbox">
              <input
                type="text"
                name="email"
                placeholder="Email"
                ref={emailRef}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                ref={passwordRef}
              />
            </div>
            <p><Link to="/forgot-password">Forgot password?</Link></p>
            <button onClick={signInButtonOnClick}>Log In</button>
          </div>

          <div className="signup hide">
            <h2>Sign Up</h2>
            <div className="inputbox">
              <input
                type="text"
                name="fullName"
                placeholder="Enter Full Name"
                ref={firstNameRef}
              />
              <input
                type="text"
                name="email"
                placeholder="Enter Email"
                ref={emailRef1}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                ref={passwordRef1}
              />
            </div>
            <button onClick={signUpButtonOnClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-70">
    <img className='w-40 h-40' src={Preloader} alt="Loading..." />
  </div>
);


