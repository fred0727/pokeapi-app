import React from "react";

const FooterHome = () => {
  return (
    <div className="absolute w-screen bottom-0 flex justify-center">
      <div className="w-screen absolute h-16 xxs:h-24 bg-[#DD1A1A] bottom-0 self-center"></div>
      <div className="w-screen absolute h-6 xxs:h-10 bg-black bottom-0"></div>
      <div className="w-[50px] h-[50px] xxs:w-[75px] xxs:h-[75px] absolute flex justify-center items-center z-50 bg-white bottom-0 rounded-full border-[6px] border-black xxs:border-[8px]">
        <div className="w-[24px] h-[24px] xxs:w-[42px] xxs:h-[42px] bg-gray-800 rounded-full border-black border-[5px] xxs:border-[8px]"></div>
      </div>
    </div>
  );
};

export default FooterHome;
