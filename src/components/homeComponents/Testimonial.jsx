import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TestimonialSlider from "../common/TestimonialSlider";


function Testimonial({pageData}){
  
    return(
		<>
		<section className="testimonial-section 320:mt-[35px] 560:mt-[60px] 1024:mt-[75px] 1200:mt-[100px] 1200:pb-[200px] 320:mb-[50px] 768:mb-[60px] 1024:mb-[100px]">
            <div className="my-0 mx-auto max-w-[1500px]">
                <div className="">
                <h3 className="w-[100%] mb-[25px] text-center text-[34px] text-[#202020] font-[800] uppercase">
                OUR HAPPY <span>CUSTOMERS</span>
                </h3>        
                </div>
            <div className=" w-full flex items-center justify-center">
           		<TestimonialSlider/>
            </div>

            </div>
        </section>
		</>
    )
}

export default Testimonial;