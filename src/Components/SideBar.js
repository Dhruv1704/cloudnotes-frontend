import React from "react";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

const SideBar = () => {

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['web-token'])
    const logOut = () => {
        removeCookie("web-token")
        localStorage.removeItem('notes')
        navigate("/")
    }

    return (
        <div
            className={"hidden border-r-[1px] border-[#ebebeb] md:block h-[100vh] fixed md:flex flex-col justify-between items-center pt-4 pb-12 px-10"}>
            <div>
                <h1 className={"decoration-0 select-none font-bold text-2xl"}>cloudnotes</h1>
            </div>
            <div onClick={logOut}
                 className={"bg-black w-[56px] h-[56px] rounded-full flex items-center justify-center cursor-pointer select-none active:scale-95"}>
                <i className="fa-solid fa-arrow-right-from-bracket text-white"></i>
            </div>
        </div>
    )
}

export default SideBar;
