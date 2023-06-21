import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNameTrainer } from "../../store/slices/nameTrainer.slice";
import { setDarkMode } from "../../store/slices/darkMode.slice";

const Header = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const darkMode = useSelector((store) => store.darkMode);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeMenu = () => setIsShowMenu(!isShowMenu);
  const handleChangeTheme = () => {
    dispatch(setDarkMode(!darkMode));
  };

  const handleClickLogout = () => {
    dispatch(setNameTrainer(""));
    navigate("/");
  };
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col justify-center relative">
      <div className="flex items-end w-full h-14 bg-[#DD1A1A] bottom-0 self-center px-2 xxs:h-20 md:h-24 lg:px-16 py-2">
        <img
          src="/images/logopok.svg"
          alt=""
          className="w-[200px] xxs:w-[250px] md:w-[350px]"
        />
      </div>
      <div className="h-7 bg-black bottom-0 xxs:h-10 md:h-12"></div>
      <div
        className="absolute w-[50px] h-[50px] flex justify-center items-center bg-white -bottom-2 right-5 rounded-full border-[6px] border-black xxs:w-[65px] xxs:h-[65px] xxs:border-[7px] md:border-[9px] md:h-[85px] md:w-[85px] cursor-pointer"
        onClick={handleChangeMenu}
      >
        <div className="realtive w-[24px] h-[24px] xxs:w-[34px] xxs:h-[34px] bg-black rounded-full border-black border-[5px] xxs:border-[7px] md:border-[8px] md:w-[44px] md:h-[44px] flex justify-center items-center">
          <AiOutlineMenu className="text-white md:text-xl lg:text-2xl" />
        </div>
      </div>
      <div
        className={`absolute h-[150px] w-screen -bottom-[150px] z-50 bg-black/90 text-white p-5 justify-center items-end lg:h-[220px] lg:-bottom-[220px] ${
          !isShowMenu ? "invisible opacity-0" : "visible opacity-100"
        }  transition-opacity`}
      >
        <ul className="flex flex-col gap-4 w-full px-4 h-full items-end justify-end lg:gap-5">
          <Link to="/pokedex">
            <li className="flex gap-2 items-center justify-end lg:text-2xl">
              Home <AiFillHome />
            </li>
          </Link>
          {darkMode && (
            <li
              className="flex gap-2 items-center justify-end lg:text-2xl cursor-pointer"
              onClick={handleChangeTheme}
            >
              Light <BsFillSunFill />
            </li>
          )}
          {!darkMode && (
            <li
              className="flex gap-2 items-center justify-end lg:text-2xl cursor-pointer"
              onClick={handleChangeTheme}
            >
              Dark <BsFillMoonFill />
            </li>
          )}
          <li
            className="flex gap-2 items-center justify-end lg:text-2xl cursor-pointer"
            onClick={handleClickLogout}
          >
            Logout <BiLogOutCircle />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
