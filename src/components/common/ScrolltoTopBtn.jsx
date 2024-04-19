import React, { useState, useEffect } from "react";

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
      <figure onClick={scrollToTop} className={`scroll-to-top ${showButton && 'scroll-top-show'}`}>
				<img src="/images/scrolltop.png" width={50} alt="" />
			</figure>

			// <figure className="fixed bottom-[100px] right-[30px] bg-white p-0 w-[50px]">
			// 	<img src="/images/scroll-top-1.png" width={'50px'} alt="" />
			// </figure>
  );
}

export default ScrollToTopButton;
