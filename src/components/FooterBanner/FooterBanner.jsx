import React, { useState } from "react";

const FooterBanner = () => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isMouseOverTwo, setIsMouseOverTwo] = useState(false);
  const [animation, setAnimation] = useState(false);

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseOut = () => {
    setIsMouseOver(false);
  };

  const handleMouseOverTwo = () => {
    setIsMouseOverTwo(true);
  };

  const handleMouseOutTwo = () => {
    setIsMouseOverTwo(false);
  };

  const addAnimation = () => {
    setAnimation(true);
  };
  const removeAnimation = () => {
    setAnimation(false);
  };

  const imageStyle = {
    transform: isMouseOver ? "scale(1.1)" : "scale(1)",
    transition: "transform 0.3s ease",
  };
  const imageStyleTwo = {
    transform: isMouseOverTwo ? "scale(1.1)" : "scale(1)",
    transition: "transform 0.3s ease",
  };
  const textAnimation = {
    color: animation ? "black" : "transparent",
    "WebkitTextStroke": "2px black",
    opacity: "10",
    transition: "ease 0.4s",
  };
  return (
    <div className="flex h-[30vh] sm:h-[60vh] md:h-[65vh] lg:h-[80vh] xl:px-6 lg:px-4 px-2 md:py-3 my-14 ">
      <div
        className="bg-[#EAE9E4] w-2/4  h-full  rounded-l-lg relative "
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div className="overflow-hidden object-cover object-center object absolute z-10 h-full">
          <img
            className="h-full bg-transparent z-10"
            src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fexclusive%2Fwomen.png&w=1200&q=75"
            alt=""
            style={imageStyle}
          />
        </div>
        <div className="absolute text-3xl sm:text-2xl top-[25%] left-5 sm:top-4 sm:left-[60%] md:left-[70%] font-normal opacity-[.2]">
          NEW YEAR
        </div>
        <div className="absolute hidden sm:block sm:text-[250px] md:text-[160px] font-extrabold  top-8 z-0 left-[10%] md:left-[50%] lg:left-[65%] opacity-5">
          20
        </div>
        <button className="md:text-xl z-20 text-xs sm:text-base  bg-black text-white rounded-lg md:py-5 sm:py-4 py-3  md:px-6 px-2 sm:px-5 shadow-lg absolute top-[75%] sm:top-[80%] md:left-[35%] lg:left-[55%] left-[15%] sm:left-[35%] hover:bg-white hover:text-black">
          #WOMEN EXCLUSIVE
        </button>
      </div>

      <div
        className="bg-[#E5E7EB] w-2/4 rounded-r-lg h-full  relative secondImageContainer"
        onMouseOver={handleMouseOverTwo}
        onMouseOut={handleMouseOutTwo}
      >
        <div className="overflow-hidden absolute z-10 h-full">
          <img
            className="h-[100%] z-10 "
            src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fexclusive%2Fmen.png&w=1200&q=75"
            alt=""
            style={imageStyleTwo}
          />
        </div>
        <div className="absolute left-4 top-[25%] sm:top-4 sm:left-9 md:left-4 text-3xl sm:text-2xl opacity-[.2] ">
          EXCLUSIVE
        </div>
        <div
          className="absolute hidden sm:block text-[250px] md:text-[160px] font-extrabold left-4 top-8 z-0 "
          onMouseOver={addAnimation}
          onMouseOut={removeAnimation}
          style={textAnimation}
        >
          24
        </div>
        <button className="md:text-xl sm:text-base text-xs py-3 sm:py-4 md:py-5 px-3 sm:left-8 left-10 md:px-6 shadow-lg bg-black text-white rounded-lg absolute z-20 top-[75%] sm:top-[80%] md:left-10  hover:bg-white hover:text-black">
          #MEN EXCLUSIVE
        </button>
      </div>
    </div>
  );
};

export default FooterBanner;
