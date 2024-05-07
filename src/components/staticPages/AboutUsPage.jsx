import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import EnquirySection from "../common/EnquirySection";
import Footer from "../common/Footer";
import NeedAnyHelpStrip from "../homeComponents/NeedAnyHelpStrip";
import Testimonial from "../homeComponents/Testimonial";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import HeaderNew from "../common/HeaderNew";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import log from "../../utils/utilityFunctions";
import Meta from "../common/Meta";

function AboutUs() {

	const [pageData, setPageData] = useState([])
	const items = [
		{
			title: "Curate",
			content: "We curate be most wide and in demand variety of battery, inverters.",
			img: "about-curate.png"
		},
		{
			title: "Understand",
			content: "We understand the user requirements to delivery best battery solutions.",
			img: "about-understand.png"
		},
		{
			title: "Ensure",
			content: "We ensure that our products are 100% genuine and the best fit for the customer.",
			img: "about-ensure.png"
		},
		{
			title: "Connect",
			content: "We connect with our customers to assist them for various battery requirements.",
			img: "about-connect.png"
		},
		{
			title: "Verify",
			content: "We verify meeting the highest maintenance and safety standards.",
			img: "about-verify.png"
		},
		{
			title: "Classify",
			content: "We classify the vast variety of our products to provide ease of browsing to our customers.",
			img: "about-classify.png"
		},
	]

	const items2 = [
		{
			title: "Quality Assurance",
			content: "We curate be most wide and in demand variety of battery, inverters.",
			img: "about-list-1.png"
		},
		{
			title: "Wide Selection",
			content: "Our extensive selection includes batteries for various makes and models.",
			img: "about-list-2.png"
		},
		{
			title: "Competitive Pricing",
			content: "We strive to keep our prices competitive without compromising on quality.",
			img: "about-list-3.png"
		},
		{
			title: "Convenience",
			content: "Shopping for a new battery shouldn't be a hassle.",
			img: "about-list-4.png"
		},
		{
			title: "Experience",
			content: "We're here to ensure your experience with us is nothing short of excellent.",
			img: "about-list-5.png"
		},
	]


	function sleep(ms) {
		return new Promise(res => {
			setTimeout(() => {
				res();
			}, ms)
		})
	}


	async function getPageData() {
		await sleep(500);
		const response = await axios.get("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-page-content?pagename=about-us-page", {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
			}
		})
		log("this is data", response?.data?.pageData?.sections)
		setPageData(response?.data?.pageData?.sections)
	}

	useEffect(() => {
		getPageData();
	}, [])

	return (
		<>
			<Meta title="About Us | Indore Battery" />
			<HeaderNew />
			<section className="bg-[#f7f7f7] about-us-pg-wr pt-[40px] 320:pt-[40px] 768:pt-[40px]">
				<div className="center-wr">
					<div className="flex p-[8px] bg-[#f7f7f7] gap-[7px] items-center">
						<span className="text-[16px] font-[600] leading-[20px]" >
							<Link to={"/"} className="hover:text-[#ff7637]">Home Page</Link>
						</span>
						<span className="inline-block py-[1px] ">
							<img src="/images/bar.png" className="" alt="" />
						</span>
						<span className="text-[#FF7637] text-[16px] font-[600] leading-[20px]">About Us</span>
					</div>

					<div className="about-us-content-wr ">
						<div className="upper-content-wr flex flex-col items-stretch relative pb-[145px] 320:pb-[20px] 1200:pb-[150px]">
							<div className="w-[100%] pt-[30px] flex 320:flex-wrap-reverse 768:flex-wrap">
								<div className="1200:w-[50%] 320:w-full">
									{!pageData[1]?.sectionContent[0].elementValue ? (<Skeleton className="h-[30px] mb-[35px]" />) : (
										<div dangerouslySetInnerHTML={{ __html: pageData[1]?.sectionContent[0].elementValue }} className="exception 320:text-center 1200:text-left 320:mt-[20px]"></div>
									)
									}
									{!pageData[1]?.sectionContent[2].elementValue ? (<Skeleton count={8} />) : (
										<div className="about-top-para-wr font-['Sora'] text-[16px] font-[400] leading-[30px] 1200:pr-[50px] 1440:pr-[100px] 320:pb-[-20px] 768:pb-[20px] 1200:pb-[6%] pt-[15px] text-[#202020] 320:text-center 1200:text-left" dangerouslySetInnerHTML={{ __html: pageData[1]?.sectionContent[2].elementValue }}></div>
									)
									}
								</div>
								<figure className="1200:w-[50%] 320:w-full flex	">
									{!pageData[1]?.sectionContent[0].elementValue ? (<Skeleton className="h-[293px] w-[610px]" />) : (
										<img className="1200:ml-auto 320:mx-auto object-cover" src={`https://batterybackend.react.stagingwebsite.co.in/images/${pageData[1]?.sectionContent[1].elementAttrSrcImg}`} alt="Online Battery Store - Car & Inverter Batteries Online image" />
									)
									}
								</figure>
							</div>
							<div className="320:block 980:hidden bg-black p-[35px] flex-wrap  1200:absolute 1200:bottom-0 1200:translate-y-[50%] 320:relative ">
								<Swiper
									id={'about-us-swiper-320'}
									key={'about-us-swiper-320'}
									className=" 320:block 980:hidden 320:w-full 1200:w-[73%] pb-[35px]"
									spaceBetween={0}
									slidesPerView={1}
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
									{items?.map(item => (
										<SwiperSlide>
											<div className="320:w-full about-black-card flex flex-wrap items-stretch pb-[40px]">
												<div className="pr-[20px] 320:w-full 320:pr-[0px] 1200:w-[54px]">
													<figure className="w-[50px] h-[50px] 320:mx-auto flex items-center justify-center rounded-full bg-[#FF7637]">
														<img src={`/images/${item?.img}`} width={25} alt="" />
													</figure>
												</div>
												<div className="320:text-center 1200:text-left  320:mt-[20px] 1200:mt-[0px]  320:w-full ">
													<p className="text-slate-100 font-semibold font-['Sora'] text-[16px] leading-[20px] mb-[12px]  mx-auto 320:px-[20px]">{item?.title}</p>
													<p className="text-slate-100 text-[16px] font-['Sora'] font-[400] leading-[26px] 320:px-[20px] mx-auto ">{item?.content}</p>
												</div>
											</div>
										</SwiperSlide>
									))}
								</Swiper>
							</div>
							<div className="bg-black p-[35px] 320:hidden 980:flex flex-wrap  1200:absolute 1200:bottom-0 1200:translate-y-[50%] 320:relative ">
								{items?.map(item => (
									<div className="320:hidden 980:flex 1024:w-[33.33%] 320:w-full 768:w-1/2 about-black-card flex flex-wrap items-stretch 320:mb-[25px] 1200:mb-0 1024:mb-[25px] ">
										<div className="pr-[20px] 320:w-full 320:pr-[0px] 1200:w-[54px]">
											<figure className="w-[50px] h-[50px] 320:mx-auto flex items-center justify-center rounded-full bg-[#FF7637]">
												<img src={`/images/${item?.img}`} width={25} alt="" />
											</figure>
										</div>
										<div className="320:text-center 1200:text-left  320:mt-[20px] 1200:mt-[0px]  320:w-full 1200:w-[calc(100%-54px)]">
											<p className="text-slate-100 font-semibold font-['Sora'] text-[16px] leading-[20px] mb-[12px] 1200:px-[20px]">{item?.title}</p>
											<p className="text-slate-100 text-[16px] font-['Sora'] font-[400] leading-[26px] 850:px-[20px]">{item?.content}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="bg-white pb-[60px] 320:pb-[0px] 1200:pt-[200px] 320:pt-[0px] 320:mt-[50px] ">
				<div className="center-wr">
					<div className="">
						<h3 className="text-center"><strong>WHY</strong> US?</h3>
					</div>

					<div className="1024:pb-[50px] 320:pb-[25px] pt-[25px]">
						<p className="content-para text-center mx-[25px]">
							At Battery Indore, we're not just another ecommerce platform selling car batteries, truck batteries, and other vehicle power solutions. We're a team of dedicated professionals committed to providing the best products and services to our customers. Here's why you should choose us:
						</p>
					</div>

					<div className="flex items-stretch flex-wrap 320:pb-[25px]">
						<figure className="1200:w-[630px] 1200:h-[536px] 320:w-full 320:h-auto">
							<img src="/images/why-us-1-crop-1.jpg" className="object-cover w-[100%] h-[100%]" alt="" />
						</figure>
							<Swiper
								id={'why-us-swiper-320'}
								key={'why-us-swiper-320'}
								className=" 320:block 850:hidden 320:w-full 1200:w-[73%] py-[35px] car-brands-manu"
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
								{
									items2?.map(item => (
										<SwiperSlide>
											<div className="about-list-item flex 320:items-start 1200:items-stretch 320:flex-col 1200:flex-row 1200:flex-wrap 1200:pl-[20px] 320:w-full 1200:w-full 320:p-[0px] h-[110px] 320:h-auto 320:mb-[40px] 1200:mb-[35px] 1368:mb-[40px] 850:w-1/2 ">
												<div className="1200:pr-[20px] 320:pr-[0px] 320:w-full 1200:w-[54px] ">
													<figure className="w-[50px] h-[50px] 320:mx-auto 1200:mx-0 flex items-center justify-center rounded-full bg-[#FF7637]">
														<img src={`/images/${item.img}`} alt="" />
													</figure>
												</div>
												<div className="320:w-full 1200:w-[calc(100%-54px)] 320:text-center 1200:text-left 320:mt-[10px] 1200:mt-[0px] ">
													<p className="font-['Sora'] text-[16px] leading-[20px] font-[600] mb-[8px] 1200:px-[25px]">{item?.title}</p>
													<p className="text-[15px] font-['Sora'] font-[400] leading-[26px] pr-[60px] 320:px-[25px]">{item?.content}</p>
												</div>
											</div>
										</SwiperSlide>
									))
								}
							</Swiper>
						<div className="320:w-full 1200:w-[calc(100%-630px)] 320:hidden 850:flex 850:flex-wrap 850:justify-center 1200:px-[10px]  1368:pl-[57px] 1368:pr-[40px] 320:pt-[40px] 1200:pt-0 ">
							{
								items2?.map(item => (
									<div className="about-list-item flex 320:items-start 1200:items-stretch 320:flex-col 1200:flex-row 1200:flex-wrap 1200:pl-[20px] 320:w-full 1200:w-full 320:p-[0px] h-[110px] 320:h-auto 320:mb-[40px] 1200:mb-[35px] 1368:mb-[40px] 850:w-1/2 ">
										<div className="1200:pr-[20px] 320:pr-[0px] 320:w-full 1200:w-[54px] ">
											<figure className="w-[50px] h-[50px] 320:mx-auto 1200:mx-0 flex items-center justify-center rounded-full bg-[#FF7637]">
												<img src={`/images/${item.img}`} alt="" />
											</figure>
										</div>
										<div className="320:w-full 1200:w-[calc(100%-54px)] 320:text-center 1200:text-left 320:mt-[10px] 1200:mt-[0px] ">
											<p className="font-['Sora'] text-[16px] leading-[20px] font-[600] mb-[8px] 1200:px-[25px]">{item?.title}</p>
											<p className="text-[15px] font-['Sora'] font-[400] leading-[26px] pr-[60px] 320:px-[25px]">{item?.content}</p>
										</div>
									</div>
								))
							}
						</div>
					</div>
				</div>
			</section>

			<section>
				<div className="center-wr">
					<div className="1200:pt-[4%] 320:pt-[0px] pb-[5%]">
						<div>
							<h3 className="text-center font-[700] leading-[68px] text-[34px]"><strong>OUR</strong> PRODUCT RANGE</h3>
						</div>
						<div className="flex items-center justify-center mt-[30px] gap-[35px] flex-wrap">

							<div className="about-op-card-main 1200:w-[415px] 1200:h-[467px] 320:w-full 420:w-[375px] 768:w-[300px]  980:w-[350px]  320:h-[338px] 2xl:h-[398px] 3xl:h-[467px] overflow-hidden relative z-[0]">
								<div className="ab1 about-our-prdct-card absolute z-[1] bottom-[-100%] w-full h-full flex flex-col items-center justify-center overflow-hidden">
									<h3 className="font-['Oswald'] font-[700] text-white text-[24px] uppercase leading-[35.5px] 320:mb-[16px] ">Car battery</h3>
									<p className="content-para-white  text-center px-[30px] 320:leading-[20px] 320:text-[14px] 1200:text-[16px] 1200:leading-[26px] font-[400]">Keep your journey on the road with our top-notch car batteries. We recognize the specific needs of your vehicle, providing batteries that deliver reliable power, long-lasting durability, and consistent performance for your cars and trucks.</p>
								</div>
								<img src="/images/about-our-product-car.png" alt="" />
								<div className="ab2 absolute bottom-0 w-full px-[25px] py-[6px] font-['Oswald'] font-[700] text-white text-[24px] uppercase leading-[35.5px]" style={{ background: "linear-gradient(90deg, #FF7637 0%, rgba(255, 118, 55, 0.26) 100%)" }}>Car battery</div>
							</div>

							<div className="about-op-card-main 1200:w-[415px] 1200:h-[467px]  320:w-full 420:w-[375px] 768:w-[300px]  980:w-[350px] 320:h-[338px] 2xl:h-[398px] 3xl:h-[467px] overflow-hidden relative z-[0]">
								<div className="ab1 about-our-prdct-card absolute z-[1] bottom-[-100%] w-full h-full flex flex-col items-center justify-center overflow-hidden">
									<h3 className="font-['Oswald'] font-[700] text-white text-[24px] uppercase leading-[35.5px] 320:mb-[16px] ">Bike battery</h3>
									<p className="content-para-white  text-center px-[30px] 320:leading-[20px] 320:text-[14px] 1200:text-[16px] 1200:leading-[26px] font-[400]">Keep your ride running smoothly with our exceptional bike batteries. We understand the unique requirements of two-wheelers, offering batteries that deliver optimal power, durability, and consistent performance for your motorcycles and scooters.</p>
								</div>
								<img src="/images/about-our-product-bike.png" alt="" />
								<div className="ab2 absolute bottom-0 w-full px-[25px] py-[6px] font-['Oswald'] font-[700] text-white text-[24px] uppercase leading-[35.5px]" style={{ background: "linear-gradient(90deg, #FF7637 0%, rgba(255, 118, 55, 0.26) 100%)" }}>Bike battery</div>
							</div>

							<div className="about-op-card-main 1200:w-[415px] 1200:h-[467px]  320:w-full 420:w-[375px] 768:w-[300px]  980:w-[350px] 320:h-[338px] 2xl:h-[398px] 3xl:h-[467px] overflow-hidden relative z-[0]">
								<div className="ab1 about-our-prdct-card absolute z-[1] bottom-[-100%] w-full h-full flex flex-col items-center justify-center overflow-hidden">
									<h3 className="font-['Oswald'] font-[700] text-white text-[24px] uppercase leading-[35.5px] 320:mb-[16px] ">Inverter battery</h3>
									<p className="content-para-white text-center px-[30px] 320:leading-[20px] 320:text-[14px] 1200:text-[16px] 1200:leading-[26px] font-[400]">Power your home with our superior inverter batteries. We understand the crucial role of backup power, offering batteries that provide reliable energy, longevity, and consistent performance for your inverters. Count on us to keep your appliances running smoothly during power outages.</p>
								</div>
								<img src="/images/about-our-product-inverter.png" alt="" />
								<div className="ab2 absolute bottom-0 w-full px-[25px] py-[6px] font-['Oswald'] font-[700] text-white text-[24px] uppercase leading-[35.5px]" style={{ background: "linear-gradient(90deg, #FF7637 0%, rgba(255, 118, 55, 0.26) 100%)" }}>Inverter battery</div>
							</div>

						</div>
					</div>
				</div>
			</section>

			<section className="py-[50px] core-section-wr">
				<div className="center-wr">
					<div className="aboutus-core-container py-[5%]">
						{!pageData[1]?.sectionContent[0].elementValue ? (<Skeleton className="h-[293px] w-[100%]" />) : (
							<>
								<div className="aboutus-core-design-wr flex relative">
									<div className="absolute left-[3%] top-[280px]">
										<figure className="lower-left w-[270px] relative z-0" style={{ filter: "drop-shadow(8px 8px 6px rgba(0,0,0,0.2))" }}>
											<img src="/images/aboutUsComplexElems/lowerLeftVector.png" alt="core values" />
											<figcaption className="flex flex-col text-center absolute w-[83%] top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
												<span className="font-[600] text-[44px]">C</span>
												<span className="font-[300] text-[25px]">COMMIT TO OUR GOALS & FUTURE</span>
											</figcaption>
										</figure>
									</div>
									<div className="absolute  for-core-design left-[25%]">
										<figure className="top-left w-[270px] relative z-0" style={{ filter: "drop-shadow(8px 8px 6px rgba(0,0,0,0.2))" }}>

											<img src="/images/aboutUsComplexElems/topLeftVector.png" alt="core values" />
											<figcaption className="flex flex-col text-center absolute w-[83%] top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
												<span className="font-[600] text-[44px]">O</span>
												<span className="font-[300] text-[25px]">OLD-FASHIONED SERVICE DELIVERING</span>
											</figcaption>
										</figure>
									</div>
									<div className="absolute right-[22%]">
										<figure className="top-right w-[270px] relative z-0" style={{ filter: "drop-shadow(8px 8px 6px rgba(0,0,0,0.2))" }}>

											<img src="/images/aboutUsComplexElems/topRightVector.png" alt="core values" />
											<figcaption className="flex flex-col text-center absolute w-[83%] top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
												<span className="font-[600] text-[44px]">R</span>
												<span className="font-[300] text-[25px]">RESPECT OUR RELATIONSHIPS</span>
											</figcaption>
										</figure>
									</div>
									<div className="absolute top-[280px] right-[0]">
										<figure className="lower-right w-[270px] relative z-0" style={{ filter: "drop-shadow(8px 8px 6px rgba(0,0,0,0.2))" }}>

											<img src="/images/aboutUsComplexElems/lowerRightVector.png" alt="core values" />
											<figcaption className="flex flex-col text-center absolute w-[83%] top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
												<span className="font-[600] text-[44px]">E</span>
												<span className="font-[300] text-[25px]">ENGAGE BY DOING THE VERY BEST JOB</span>
											</figcaption>
										</figure>
									</div>
								</div>
								<div className="aboutus-core-content-wr pt-[25%] pb-[8%]">

									<div className="know-more-wr w-[45%] mx-[auto] text-center">
										<div className="exception core-heading" dangerouslySetInnerHTML={{ __html: pageData[2]?.sectionContent[0].elementValue }} >
										</div>
										<div className="pb-[11%]" dangerouslySetInnerHTML={{ __html: pageData[2]?.sectionContent[1].elementValue }}>

										</div>
									</div>
								</div>
							</>
						)
						}
					</div>
				</div>
			</section>



			<div>
				<NeedAnyHelpStrip />
				<Testimonial />
			</div>
			<EnquirySection />
			<Footer />
		</>
	)
}

export default AboutUs;
