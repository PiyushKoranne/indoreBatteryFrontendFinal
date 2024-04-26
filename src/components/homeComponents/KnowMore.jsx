import React, { useEffect, useState } from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import log from "../../utils/utilityFunctions";



function KnowMore({ pageData }) {
	const navigate = useNavigate();
	const backend_url = import.meta.env.VITE_BACKEND_URL;
	return (
		<section className="category-wr mb-[50px] mt-[100px]">
			<div className="center-wr">
				<div className="upper-content-wr flex items-center mb-[50px] ]">
					<figure className="w-[40%]">
						{pageData?.sectionContent[0]?.elementAttrSrcImg === "" ? <Skeleton className="h-[500px] w-[100%]" /> : <img src={`${backend_url}/images/${pageData?.sectionContent[0]?.elementAttrSrcImg}`} alt="Online Battery Store - Car & Inverter Batteries Online image" />}
					</figure>
					<div className="know-more-wr w-[66%] 1200:mx-[60px] ml-[61px] mr-[61px] 1200:pt-[60px] 320:pt-[0px] 320:mx-auto 320:text-center 1200:text-left">
						{pageData?.sectionContent[2]?.elementValue === "" ? <Skeleton className="mb-[40px] h-[30px]" /> : <h3 dangerouslySetInnerHTML={{ __html: pageData?.sectionContent[2]?.elementValue }}></h3>}
						{pageData?.sectionContent[3]?.elementValue === "" ? <Skeleton count={5} /> : <div dangerouslySetInnerHTML={{ __html: pageData?.sectionContent[3]?.elementValue }}></div>}
						<Link to={"/about-us"}><button className="btn-special-spread-second bg-[#1B283A]">{pageData?.sectionContent[1]?.elementValue}</button></Link>
					</div>
				</div>
				<div className="know-more-swiper 980:py-[40px] 320:py-[10px] border-[1px] border-[rgba(0,0,0,0.15)] rounded-[8px] mt-[100px] mb-[100px] solid text-[#202020] text-center">
					<Swiper 
						id={'know-more-swiper-320'}
						key={'know-more-swiper-320'}
						className=" 320:block 980:hidden 320:w-full 1200:w-[73%] banner-swiper"
						spaceBetween={0}
						slidesPerView={window.innerWidth >= 560 ? 2 : 1}
						autoHeight={true}
						autoplay={{
							delay: 2000,
							disableOnInteraction: false
						}}
						loop
						modules={[Autoplay, Pagination]}
						pagination={{ clickable: "true" }}
						onSlideChange={() => { log('slide change') }}
						onSwiper={(swiper) => { log(swiper) }}
					>
						<SwiperSlide>
							<li className="banner-after-elem 320:w-full know-more cursor-pointer pb-[40px]">
								<Link to={"/categories/two-wheeler-batteries"} className="flex items-center justify-center flex-col">
									<figure className=" 1200:w-[60px] 320:w-[40px] 320:h-auto h-[58px] mb-[10px]">
										<img src="/images/twoWheelers.png" alt="indore battery feature image" />
									</figure>
									<figcaption className="w-[100px] text-center font-[400] font-['Sora'] 320:text-[12px] 560:text-[14px] 1200:text-[16px] transition-all 768:w-[200px] 1024:w-fit">Two Wheelers</figcaption>
								</Link>
							</li>
						</SwiperSlide>
						<SwiperSlide>
							<li className="banner-after-elem 320:w-full know-more cursor-pointer pb-[40px]">

								<Link to={"/categories/three-wheeler-batteries"} className="flex items-center justify-center flex-col">
									<figure className=" 1200:w-[60px] 320:w-[40px] 320:h-auto h-[58px] flex items-center justify-center mb-[10px]">
										<img src="/images/threeWheelers.png" alt="indore battery feature image" />
									</figure><figcaption className="w-[100px] text-center font-[400] font-['Sora'] 320:text-[12px] 560:text-[14px] 1200:text-[16px] transition-all 768:w-[200px] 1024:w-fit">Three Wheelers</figcaption></Link>
							</li>
						</SwiperSlide>
						<SwiperSlide>
							<li className="banner-after-elem 320:w-full know-more cursor-pointer pb-[40px]">
								<Link to={"/categories/car-batteries"} className="flex items-center justify-center flex-col">
									<figure className=" 1200:w-[60px] 320:w-[40px] 320:h-auto h-[58px] flex items-center justify-center mb-[10px]">
										<img src="/images/passengerVechile.png" alt="indore battery feature image" />
									</figure>
									<figcaption className="w-[100px] text-center font-[400] font-['Sora'] 320:text-[12px] 560:text-[14px] 1200:text-[16px] transition-all 768:w-[200px] 1024:w-fit ">Passenger Vehicles</figcaption></Link>
							</li>
						</SwiperSlide>
						<SwiperSlide>
							<li className="banner-after-elem 320:w-full know-more cursor-pointer pb-[40px]">
								<Link to={"/categories/truck-batteries"} className="flex items-center justify-center flex-col">
									<figure className=" 1200:w-[60px] 320:w-[40px] 320:h-auto h-[58px] flex items-center justify-center mb-[10px]">
										<img src="/images/commercialVechile.png" alt="indore battery feature image" />
									</figure>
									<figcaption className="w-[100px] text-center font-[400] font-['Sora'] 320:text-[12px] 560:text-[14px] 1200:text-[16px] transition-all 768:w-[200px] 1024:w-fit ">Commercial Vehicles</figcaption></Link>
							</li>
						</SwiperSlide>
						<SwiperSlide>
							<li className="banner-after-elem 320:w-full know-more cursor-pointer pb-[40px]">
								<Link to={"/categories/inverter-batteries"} className="flex items-center justify-center flex-col">
									<figure className=" 1200:w-[60px] 320:w-[40px] 320:h-auto h-[58px] flex items-center justify-center mb-[10px]">
										<img src="/images/invertors.png" alt="indore battery feature image" />
									</figure>
									<figcaption className="w-[100px] text-center font-[400] font-['Sora'] 320:text-[12px] 560:text-[14px] 1200:text-[16px] transition-all 768:w-[200px] 1024:w-fit ">Invertors & Batteries</figcaption></Link>
							</li>
						</SwiperSlide>
						<SwiperSlide>
							<li className="banner-after-elem 320:w-full know-more cursor-pointer pb-[40px]">
								<Link to={"/categories/e-vehicle-batteries"} className="flex items-center justify-center flex-col">
									<figure className=" 1200:w-[60px] 320:w-[40px] 320:h-auto h-[58px] flex items-center justify-center mb-[10px]">
										<img src="/images/eVehicles.png" alt="indore battery feature image" />
									</figure>
									<figcaption className="w-[100px] text-center font-[400] font-['Sora'] 320:text-[12px] 560:text-[14px] 1200:text-[16px] transition-all 768:w-[200px] 1024:w-fit ">E-Vehicles</figcaption></Link>
							</li>
						</SwiperSlide>
						<SwiperSlide>
							<li className="banner-after-elem 320:w-full know-more cursor-pointer pb-[40px]">
								<Link to={"/categories/e-vehicle-batteries"} className="flex items-center justify-center flex-col">
									<figure className=" 1200:w-[60px] 320:w-[40px] 320:h-auto h-[58px] flex items-center justify-center mb-[10px]">
										<img src="/images/otherApplications.png" alt="indore battery feature image" />
									</figure>
									<figcaption className="w-[100px] text-center font-[400] font-['Sora'] 320:text-[12px] 560:text-[14px] 1200:text-[16px] transition-all 768:w-[200px] 1024:w-fit ">Other Applications</figcaption></Link>
							</li>
						</SwiperSlide>
					</Swiper>
					<ul className="flex items-center justify-center 980:flex 320:hidden flex-wrap 850:gap-[40px] 1200:justify-evenly">
						<li className="banner-after-elem w-[14.28%] 320:w-1/2  850:w-[30%] 1200:w-fit know-more cursor-pointer">
							<Link to={"/categories/two-wheeler-batteries"} className="flex items-center justify-center flex-col">
								<figure className=" 1368:w-[60px] 320:w-[40px] 320:h-auto h-[58px] mb-[10px]">
									<img src="/images/twoWheelers.png" alt="indore battery feature image" />
								</figure>
								<figcaption className="w-[100px] text-center font-[400] font-['Sora'] 320:text-[12px] 560:text-[14px] 1368:text-[16px] transition-all 768:w-[200px] 1024:w-fit">Two Wheelers</figcaption>
							</Link>
						</li>
						<li className="banner-after-elem w-[14.28%] 320:w-1/2  850:w-[30%] 1200:w-fit know-more cursor-pointer">

							<Link to={"/categories/three-wheeler-batteries"} className="flex items-center justify-center flex-col">
								<figure className=" 1368:w-[60px] 320:w-[40px] 320:h-auto h-[58px] flex items-center justify-center mb-[10px]">
									<img src="/images/threeWheelers.png" alt="indore battery feature image" />
								</figure><figcaption className="w-[100px] text-center font-[400] font-['Sora'] 320:text-[12px] 560:text-[14px] 1368:text-[16px] transition-all 768:w-[200px] 1024:w-fit">Three Wheelers</figcaption></Link>
						</li>
						<li className="banner-after-elem w-[14.28%] 320:w-1/2  850:w-[30%] 1200:w-fit know-more cursor-pointer">
							<Link to={"/categories/car-batteries"} className="flex items-center justify-center flex-col">
								<figure className=" 1368:w-[60px] 320:w-[40px] 320:h-auto h-[58px] flex items-center justify-center mb-[10px]">
									<img src="/images/passengerVechile.png" alt="indore battery feature image" />
								</figure>
								<figcaption className="w-[100px] text-center font-[400] font-['Sora'] 320:text-[12px] 560:text-[14px] 1368:text-[16px] transition-all 768:w-[200px] 1024:w-fit ">Passenger Vehicles</figcaption></Link>
						</li>
						<li className="banner-after-elem w-[14.28%] 320:w-1/2  850:w-[30%] 1200:w-fit know-more cursor-pointer">
							<Link to={"/categories/truck-batteries"} className="flex items-center justify-center flex-col">
								<figure className=" 1368:w-[60px] 320:w-[40px] 320:h-auto h-[58px] flex items-center justify-center mb-[10px]">
									<img src="/images/commercialVechile.png" alt="indore battery feature image" />
								</figure>
								<figcaption className="w-[100px] text-center font-[400] font-['Sora'] 320:text-[12px] 560:text-[14px] 1368:text-[16px] transition-all 768:w-[200px] 1024:w-fit ">Commercial Vehicles</figcaption></Link>
						</li>
						<li className="banner-after-elem w-[14.28%] 320:w-1/2  850:w-[30%] 1200:w-fit know-more cursor-pointer">
							<Link to={"/categories/inverter-batteries"} className="flex items-center justify-center flex-col">
								<figure className=" 1368:w-[60px] 320:w-[40px] 320:h-auto h-[58px] flex items-center justify-center mb-[10px]">
									<img src="/images/invertors.png" alt="indore battery feature image" />
								</figure>
								<figcaption className="w-[100px] text-center font-[400] font-['Sora'] 320:text-[12px] 560:text-[14px] 1368:text-[16px] transition-all 768:w-[200px] 1024:w-fit ">Invertors & Batteries</figcaption></Link>
						</li>

						<li className="banner-after-elem w-[14.28%] 320:w-1/2  850:w-[30%] 1200:w-fit know-more cursor-pointer">
							<Link to={"/categories/e-vehicle-batteries"} className="flex items-center justify-center flex-col">
								<figure className=" 1368:w-[60px] 320:w-[40px] 320:h-auto h-[58px] flex items-center justify-center mb-[10px]">
									<img src="/images/eVehicles.png" alt="indore battery feature image" />
								</figure>
								<figcaption className="w-[100px] text-center font-[400] font-['Sora'] 320:text-[12px] 560:text-[14px] 1368:text-[16px] transition-all 768:w-[200px] 1024:w-fit ">E-Vehicles</figcaption></Link>
						</li>
						<li className="banner-after-elem w-[14.28%] 320:w-1/2  850:w-[30%] 1200:w-fit know-more cursor-pointer">
							<Link to={"/categories/e-vehicle-batteries"} className="flex items-center justify-center flex-col">
								<figure className=" 1368:w-[60px] 320:w-[40px] 320:h-auto h-[58px] flex items-center justify-center mb-[10px]">
									<img src="/images/otherApplications.png" alt="indore battery feature image" />
								</figure>
								<figcaption className="w-[100px] text-center font-[400] font-['Sora'] 320:text-[12px] 560:text-[14px] 1368:text-[16px] transition-all 768:w-[200px] 1024:w-fit ">Other Applications</figcaption></Link>
						</li>
					</ul>
				</div>
			</div>
		</section>
	)
}
export default KnowMore