import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TestimonialSlider from "../common/TestimonialSlider";


function Testimonial({pageData}){
  
    return(
		<>
		<section className="testimonial-section mb-[150px]">
            <div className="my-0 mx-auto max-w-[1500px]">
                <div className="text-center">
                <h3 className="w-[100%] mt-[10%] mb-[25px] text-[34px] text-[#000] font-[800] uppercase">
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