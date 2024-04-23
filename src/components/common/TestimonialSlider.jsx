import React, { useEffect, useRef, useState } from "react";
import { Swiper,SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import axios from "axios";

function TestimonialSlider(){
	const swiperRef = useRef(null);
	const [testimonials,setTestimonails] = useState([])

	const getAllTestimonials = async () => {
		const response = await axios.get(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-testimonials`);
		console.log("This is testimonials",response?.data)
		if(response.status === 200){
			setTestimonails(response?.data)
		}
	}

	useEffect(()=>{
		getAllTestimonials()
	},[])

    return(
        <div className="flex relative w-full items-center">
			<button onClick={()=>{swiperRef.current.slidePrev()}} className="w-[35px] h-[35px] bg-[#000000] text-white absolute transition-all hover:bg-[#ff7637] flex items-center justify-center left-[0px]"><img src="/images/swiperLefticon.png" alt="" /></button>
			<button onClick={()=>{swiperRef.current.slideNext()}} className="w-[35px] h-[35px] bg-[#000000] text-white absolute transition-all hover:bg-[#ff7637] flex items-center justify-center right-[0px]"><img src="/images/swiperRighticon.png" alt="" /></button>
			<Swiper
				spaceBetween={30}
				slidesPerView={window.innerWidth > 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1} 
				autoHeight={true}
				autoplay={{
					delay:2000,
					disableOnInteraction:false
				}}
				loop
				modules={[Autoplay]}
				onSwiper={(swiper)=>{ swiperRef.current = swiper}}
				className="relative w-[90%] mt-[25px]"
				>
					<SwiperSlide className="flex items-center justify-center">
						<div className="w-[100%] relative min-h-[427px] flex flex-col items-start justify-start border-[1px] border-[rgba(0,0,0,0.15)] shadow-lg h-auto">
							<div className="flex pt-[25px] px-[25px] items-center gap-[20px]">
								<figure>
									<img src="/images/reviewer-image.png" alt="" />
								</figure>
								<div>
									<p className="font-semibold leading-[20px]">Aman Jain</p>
									<p className="font-[300] text-[15px] leading-[20px]">March 6 2024, 11:10AM</p>
								</div>
							</div>
							<div className="flex items-center px-[25px] pt-[25px] pb-[10px] gap-[5px]">
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
							</div>
							<p className="px-[25px] text-wrap break-words w-[100%] py-[10px] h-[215px] overflow-auto">
								Aman Jain gives Indore Battery,Luminous|Microtek|Amaron|Exide|Amaron Quanta Inverter/UPS/car battery wholesale store 5 stars rating
							</p>
							<div className="px-[25px] pt-[10px] pb-[25px] absolute bottom-0 flex items-center gap-[10px]">
								<figure>
									<img width={'25px'} src="/images/google-logo.png" alt="" />
								</figure>
								<p className="leading-[20px] font-[300]">Review on Google</p>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="w-[100%] relative min-h-[427px] flex flex-col items-start justify-start border-[1px] border-[rgba(0,0,0,0.15)] shadow-lg h-auto">
							<div className="flex pt-[25px] px-[25px] items-center gap-[20px]">
								<figure>
									<img src="/images/reviewer-image-3.png" alt="" />
								</figure>
								<div>
									<p className="font-semibold leading-[20px]">brijesh gupta</p>
									<p className="font-[300] text-[15px] leading-[20px]">February 11 2024, 11:10AM</p>
								</div>
							</div>
							<div className="flex items-center px-[25px] pt-[25px] pb-[10px] gap-[5px]">
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
							</div>
							<p className="px-[25px] text-wrap break-words w-[100%] py-[10px] h-[215px] overflow-auto">
								I have purchases multiple battery and each time the service and prices is best.
							</p>
							<div className="px-[25px] pt-[10px] pb-[25px] absolute bottom-0 flex items-center gap-[10px]">
								<figure>
									<img width={'25px'} src="/images/google-logo.png" alt="" />
								</figure>
								<p className="leading-[20px] font-[300]">Review on Google</p>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="w-[100%] relative min-h-[427px] flex flex-col items-start justify-start border-[1px] border-[rgba(0,0,0,0.15)] shadow-lg h-auto">
							<div className="flex pt-[25px] px-[25px] items-center gap-[20px]">
								<figure>
									<img src="/images/reviewer-image-4.png" alt="" />
								</figure>
								<div>
									<p className="font-semibold leading-[20px]">DellVEER Sengar</p>
									<p className="font-[300] text-[15px] leading-[20px]">September 18 2023, 11:10AM</p>
								</div>
							</div>
							<div className="flex items-center px-[25px] pt-[25px] pb-[10px] gap-[5px]">
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
							</div>
							<p className="px-[25px] text-wrap break-words w-[100%] py-[10px] h-[215px] overflow-auto">
							Very good customer service, We are first taught about basics of inverter, battery type and capacity with calculation then the best fit model is created...Prices competitive, Availability immediate...
							</p>
							<div className="px-[25px] pt-[10px] pb-[25px] absolute bottom-0 flex items-center gap-[10px]">
								<figure>
									<img width={'25px'} src="/images/google-logo.png" alt="" />
								</figure>
								<p className="leading-[20px] font-[300]">Review on Google</p>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="w-[100%] relative min-h-[427px] flex flex-col items-start justify-start border-[1px] border-[rgba(0,0,0,0.15)] shadow-lg h-auto">
							<div className="flex pt-[25px] px-[25px] items-center gap-[20px]">
								<figure>
									<img src="/images/reviewer-image-2.png" alt="" />
								</figure>
								<div>
									<p className="font-semibold leading-[20px]">Jagmeet Singh</p>
									<p className="font-[300] text-[15px] leading-[20px]">February 6 2024, 11:10AM</p>
								</div>
							</div>
							<div className="flex items-center px-[25px] pt-[25px] pb-[10px] gap-[5px]">
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
							</div>
							<p className="px-[25px] text-wrap break-words w-[100%] py-[10px] h-[215px] overflow-auto">
							We had a requirement of an Inverter for our home and visited them.
							Gajendra ji suggested us the right Inverter and we are totally satisfied.
							The Luminous inverter is of the latest design and is working perfectly.
							</p>
							<div className="px-[25px]">
								{/* <figure>
									<img src="/images/reviewer-content-img.jpg" alt="" />
								</figure> */}
							</div>
							<div className="px-[25px] pt-[10px] pb-[25px] absolute bottom-0 flex items-center gap-[10px]">
								<figure>
									<img width={'25px'} src="/images/google-logo.png" alt="" />
								</figure>
								<p className="leading-[20px] font-[300]">Review on Google</p>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="w-[100%] min-h-[427px] relative flex flex-col items-start justify-start border-[1px] border-[rgba(0,0,0,0.15)] shadow-lg h-auto">
							<div className="flex pt-[25px] px-[25px] items-center gap-[20px]">
								<figure>
									<img src="/images/reviewer-image-5.png" alt="" />
								</figure>
								<div>
									<p className="font-semibold leading-[20px]">Tanay Goyanka</p>
									<p className="font-[300] text-[15px] leading-[20px]">June 2 2023, 11:10AM</p>
								</div>
							</div>
							<div className="flex items-center px-[25px] pt-[25px] pb-[10px] gap-[5px]">
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
							</div>
							<p className="px-[25px] text-wrap break-words w-[100%] py-[10px] h-[215px] overflow-auto">
							They are located almost 20 kms from my place, but I have never faced any problem when it comes to door-step sales or service. I first bought two inverter batteries from them in 2018 and they delivered the same to me in less than 2 hours. After a few months, one of my two-wheelers needed a new battery. I thought they won't deliver the same to me because it is way cheap when compared to inverter battery, but they again amazed with timely delivery. It has now been close to 5 years since I am associated with Gajendra Ji and every battery at my place sold and serviced by them
							</p>
							<div className="px-[25px]">
								{/* <figure>
									<img src="/images/reviewer-content-img.jpg" alt="" />
								</figure> */}
							</div>
							<div className="px-[25px] pt-[10px] absolute bottom-0 pb-[25px] flex items-center gap-[10px]">
								<figure>
									<img width={'25px'} src="/images/google-logo.png" alt="" />
								</figure>
								<p className="leading-[20px] font-[300]">Review on Google</p>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="w-[100%] min-h-[427px] relative flex flex-col items-start justify-start border-[1px] border-[rgba(0,0,0,0.15)] shadow-lg h-auto">
							<div className="flex pt-[25px] px-[25px] items-center gap-[20px]">
								<figure>
									<img src="/images/reviewer-6.png" alt="" />
								</figure>
								<div>
									<p className="font-semibold leading-[20px]">Ashta Vinayak</p>
									<p className="font-[300] text-[15px] leading-[20px]">April 6 2023, 10:14PM</p>
								</div>
							</div>
							<div className="flex items-center px-[25px] pt-[25px] pb-[10px] gap-[5px]">
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
							</div>
							<p className="px-[25px] text-wrap break-words w-[100%] py-[10px] h-[215px] overflow-auto">
							Good human being , Down to earth , Good way of talking , On time service . Overall good will recommend Indore Battery house if anybody is considering to buy product from this shop.
							</p>
							<div className="px-[25px]">
								{/* <figure>
									<img src="/images/reviewer-content-img.jpg" alt="" />
								</figure> */}
							</div>
							<div className="px-[25px] pt-[10px] absolute bottom-0 pb-[25px] flex items-center gap-[10px]">
								<figure>
									<img width={'25px'} src="/images/google-logo.png" alt="" />
								</figure>
								<p className="leading-[20px] font-[300]">Review on Google</p>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="w-[100%] min-h-[427px] relative flex flex-col items-start justify-start border-[1px] border-[rgba(0,0,0,0.15)] shadow-lg h-auto">
							<div className="flex pt-[25px] px-[25px] items-center gap-[20px]">
								<figure>
									<img src="/images/unnamed-k.png" alt="" />
								</figure>
								<div>
									<p className="font-semibold leading-[20px]">Karthik Marath</p>
									<p className="font-[300] text-[15px] leading-[20px]">April 6 2022, 03:20PM</p>
								</div>
							</div>
							<div className="flex items-center px-[25px] pt-[25px] pb-[10px] gap-[5px]">
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
								<i className="fa-solid fa-star text-orange-600"></i>
							</div>
							<p className="px-[25px] text-wrap break-words w-[100%] py-[10px] h-[215px] overflow-auto">
							Recently I've purchased inverter and battery for home usage, Mr.Gajendra and his team patiently understood my requirements and provided it at a reasonable price. They had even coordinated for a electrician for installation and job was perfectly completed, thank you.
							</p>
							<div className="px-[25px]">
								{/* <figure>
									<img src="/images/reviewer-content-img.jpg" alt="" />
								</figure> */}
							</div>
							<div className="px-[25px] pt-[10px] absolute bottom-0 pb-[25px] flex items-center gap-[10px]">
								<figure>
									<img width={'25px'} src="/images/google-logo.png" alt="" />
								</figure>
								<p className="leading-[20px] font-[300]">Review on Google</p>
							</div>
						</div>
					</SwiperSlide>

			</Swiper>
		</div>
    )
}

export default TestimonialSlider