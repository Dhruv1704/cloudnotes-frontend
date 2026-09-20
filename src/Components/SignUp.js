import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext";
import { useClickAway } from "@uidotdev/usehooks";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

export default function SignUp(props) {

    const signRef = useClickAway(() => {
        setSignUpDisplay(false);
    });

    const {passwordHideShow, setSignUpDisplay, signUpDisplay} = props;
    const context = useContext(noteContext);
    const {setProgress, tst} = context;
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['web-token']);

    const closeModal = () => {
        document.getElementById("sign-form").reset();
        setSignUpDisplay(false)
    }

    const [credentials, setCredentials] = useState({fname: "", lname: "", email: "", password: ""});

    const signUp = async (e) => {
        e.preventDefault();
        if (!navigator.onLine) {
            tst("You're offline", "error")
            return;
        }
        setProgress(30);
        const {fname, lname, email, password} = credentials;
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/authen/createuser`, {
            method: "POST",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({"name": fname + " " + lname, email, password})
        });
        setProgress(50)
        const json = await response.json();
        tst(json.message,json.type)
        if (json.type==="success") {
            setCookie("web-token", json.webToken, {path: '/', maxAge: 60 * 60 * 24 * 10, secure: true})
            closeModal()
            navigate("/notes")
        }
        setProgress(100)
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }


    function validatePassword() {
        const password = document.getElementById("password2");
        const confirm_password = document.getElementById("password3");
        if (password.value !== confirm_password.value) {
            confirm_password.setCustomValidity("Passwords Don't Match");
        } else {
            confirm_password.setCustomValidity('');
        }
    }

    return (
        <>
            <div className={`${signUpDisplay?"visible opacity-100":"invisible opacity-0"} transform duration-300 ease-in-out z-10 fixed top-0 w-full h-full bg-[#ffffffcc]`} id={"sign-div"}>
                <form
                    className={`${signUpDisplay?"scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"} transform ease-in-out duration-300 relative top-[20%] shadow-xl w-[350px] h-[382px] bg-white m-auto py-2 px-4 rounded-lg`}
                    id={"sign-form"} onSubmit={signUp} ref={signRef}>
                    <div className={"border-b-[1px] pb-2 border-gray-300"}>
                        <span
                            className={"text-[#aaaaaa] float-right font-bold text-3xl cursor-pointer hover:text-black decoration-0"}
                            onClick={closeModal}>&times;</span>
                        <h1 className={"text-3xl font-bold"}>Sign Up</h1>
                        <small>It's quick and easy</small>
                    </div>
                    <div className={"flex justify-between"}>
                        <input type={"text"} placeholder={"First Name"} name={"fname"}
                               className={"border-[1px] border-[#dddfe2] my-4 p-2 rounded-md w-36"}
                               onChange={onChange} minLength={3} required/>
                        <input type="text" placeholder={"Last Name"} name={"lname"}
                               className={"border-[1px] border-[#dddfe2] my-4 p-2 rounded-md w-36"}
                               onChange={onChange} required/>
                    </div>
                    <input type={"email"} placeholder={"Email Address"} name={"email"}
                           className={"border-[1px] border-[#dddfe2] mb-4 p-2 rounded-md w-full"}
                           onChange={onChange} required/>
                    <input type={"password"} placeholder={"New Password"} name={"password"} id="password2"
                           className={"border-[1px] border-[#dddfe2] mb-4 p-2 rounded-md w-full"} onChange={onChange}
                           minLength={5} required/>
                    <i className="fa-solid fa-eye cursor-pointer absolute top-[220px] right-9 text-[#7A7A85]" id="eye2"
                       onClick={() => passwordHideShow(2)}></i>
                    <input type={"password"} placeholder={"Confirm Password"} name={"cpassword"} id="password3"
                           className={"border-[1px] border-[#dddfe2] mb-4 p-2 rounded-md w-full"} onChange={onChange}
                           onKeyUp={validatePassword} minLength={5}
                           required/>
                    <i className="fa-solid fa-eye cursor-pointer absolute top-[278px] right-9 text-[#7A7A85]" id="eye3"
                       onClick={() => passwordHideShow(3)}></i>
                    <div className={"flex justify-center"}>
                        <button type={"submit"}
                                className={"bg-[#42b72a] text-white p-2 rounded-md text-lg font-semibold px-6 active:scale-95"}>Sign
                            Up
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
