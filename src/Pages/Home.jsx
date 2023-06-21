import React from "react";
import FooterHome from "../components/FooterHome";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNameTrainer } from "../store/slices/nameTrainer.slice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.nameTrainer.value;
    dispatch(setNameTrainer(name))
    navigate('/pokedex')
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white gap-5 px-4 relative">
      <img src="/images/logopok.svg" alt="" className="w-[275px] xxs:w-[375px] md:w-[500px]" />
      <div className="flex flex-col justify-center items-center gap-1">
        <h2 className="text-[#FE1936] text-3xl font-bold xxs:text-4xl md:text-5xl">¡Hi, Trainer!</h2>
        <p className="text-sm xxs:text-lg md:text-2xl">To get started, enter your name</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center"
      >
        <input
          type="text"
          id="nameTrainer"
          placeholder="Your name..."
          className="bg-white h-8 px-3 text-sm outline-none shadow-md rounded-sm text-gray-600 hover:border-gray-100 hover:border-[1px] xxs:text-xl md:text-2xl md:h-14"
        />
        <button className="bg-[#D93F3F] text-white text-sm px-4 h-8 shadow-md rounded-sm xxs:text-xl md:text-2xl md:h-14 md:px-6">
          Go!
        </button>
      </form>
      <FooterHome />
    </div>
  );
};

export default Home;
