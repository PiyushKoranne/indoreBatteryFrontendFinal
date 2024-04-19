import React, { useEffect, useState } from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'



function KnowMore({pageData}) {
		const navigate = useNavigate();
  	const backend_url = import.meta.env.VITE_BACKEND_URL;
    return (
        <section className="category-wr mb-[50px] mt-[100px]">
            <div className="center-wr">
                <div className="upper-content-wr flex items-center mb-[50px] ]">
                    <figure className="w-[40%]">
                      {pageData?.sectionContent[0]?.elementAttrSrcImg === "" ? <Skeleton className="h-[500px] w-[100%]" /> :  <img src={`${backend_url}/images/${pageData?.sectionContent[0]?.elementAttrSrcImg}`} alt="Online Battery Store - Car & Inverter Batteries Online image" />}
                    </figure>
                    <div className="know-more-wr w-[66%] ml-[61px] mr-[61px] pt-[60px]">
                      {pageData?.sectionContent[2]?.elementValue === "" ? <Skeleton className="mb-[40px] h-[30px]" /> : <h3 dangerouslySetInnerHTML={{__html:pageData?.sectionContent[2]?.elementValue}}></h3>}
                      {pageData?.sectionContent[3]?.elementValue === "" ? <Skeleton count={5} /> : <div dangerouslySetInnerHTML={{__html:pageData?.sectionContent[3]?.elementValue}}></div>}                        
                      <Link to={"/about-us"} ><button className="btn-special-spread-second bg-[#1B283A]">{pageData?.sectionContent[1]?.elementValue}</button></Link>
                    </div>
                </div>
                <div className="py-[40px] border-[1px] border-[rgba(0,0,0,0.15)] rounded-[8px] mt-[100px] mb-[100px] solid text-[#202020] text-center">
                <ul className="flex items-center justify-center">
                    <li className="banner-after-elem w-[14.28%] know-more cursor-pointer">
                    <Link to={"/categories/two-wheeler-batteries"} className="flex items-center justify-center flex-col">
                        <figure  className=" w-[60px] h-[58px] mb-[10px]">
                          <img src="/images/twoWheelers.png" alt="indore battery feature image" />
                        </figure> 
                        <figcaption className="w-[100px] text-center font-[400] font-['Sora'] text-[14px] transition-all ">Two Wheelers</figcaption>
                    </Link>
                    </li>
                    <li className="banner-after-elem w-[14.28%] know-more cursor-pointer">

                    <Link to={"/categories/three-wheeler-batteries"} className="flex items-center justify-center flex-col">
                        <figure  className=" w-[60px] h-[58px] flex items-center justify-center mb-[10px]">
                          <img src="/images/threeWheelers.png" alt="indore battery feature image" />
                        </figure><figcaption className="w-[100px] text-center font-[400] font-['Sora'] text-[14px] transition-all ">Three Wheelers</figcaption></Link>
                    </li>
                    <li className="banner-after-elem w-[14.28%] know-more cursor-pointer">
                    <Link to={"/categories/car-batteries"} className="flex items-center justify-center flex-col">
                        <figure  className=" w-[60px] h-[58px] flex items-center justify-center mb-[10px]">
                          <img src="/images/passengerVechile.png" alt="indore battery feature image" />
                        </figure>
                       <figcaption className="w-[100px] text-center font-[400] font-['Sora'] text-[14px] transition-all ">Passenger Vechiles</figcaption></Link>
                    </li>
                    <li className="banner-after-elem w-[14.28%] know-more cursor-pointer">
                    <Link to={"/categories/truck-batteries"} className="flex items-center justify-center flex-col">
                        <figure  className=" w-[60px] h-[58px] flex items-center justify-center mb-[10px]">
                          <img src="/images/commercialVechile.png" alt="indore battery feature image" />
                        </figure>
                       <figcaption className="w-[100px] text-center font-[400] font-['Sora'] text-[14px] transition-all ">Commercial Vechiles</figcaption></Link>
                    </li>
					<li className="banner-after-elem w-[14.28%] know-more cursor-pointer">
          <Link to={"/categories/inverter-batteries"} className="flex items-center justify-center flex-col">
                        <figure  className=" w-[60px] h-[58px] flex items-center justify-center mb-[10px]">
                          <img src="/images/invertors.png" alt="indore battery feature image" />
                        </figure>
                       <figcaption className="w-[100px] text-center font-[400] font-['Sora'] text-[14px] transition-all ">Invertors & Batteries</figcaption></Link>
                    </li>

					<li className="banner-after-elem w-[14.28%] know-more cursor-pointer">
          <Link to={"/categories/e-vehicle-batteries"} className="flex items-center justify-center flex-col">
                        <figure  className=" w-[60px] h-[58px] flex items-center justify-center mb-[10px]">
                          <img src="/images/eVechiles.png" alt="indore battery feature image" />
                        </figure>
                        <figcaption className="w-[100px] text-center font-[400] font-['Sora'] text-[14px] transition-all ">E-Vechiles</figcaption></Link>
                    </li>
					<li className="banner-after-elem w-[14.28%] know-more cursor-pointer">
          <Link to={"/categories/e-vehicle-batteries"} className="flex items-center justify-center flex-col">
                        <figure  className=" w-[60px] h-[58px] flex items-center justify-center mb-[10px]">
                          <img src="/images/otherApplications.png" alt="indore battery feature image" />
                        </figure>
					<figcaption className="w-[100px] text-center font-[400] font-['Sora'] text-[14px] transition-all ">Other Applications</figcaption></Link>
                    </li>
                </ul>
            </div>
            </div>
        </section>
    )
}
export default KnowMore