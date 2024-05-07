import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";

function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
      <figure onClick={scrollToTop} className={`z-[101] p-[10px] rounded-full bg-white border-2 border-[#ff7637] shadow-md 1200:block scroll-to-top ${showButton && 'scroll-top-show'}`}>
				<FaArrowUp className="text-[#202020] text-[20px]" />
			</figure>
  );
}

export default ScrollToTopButton;
