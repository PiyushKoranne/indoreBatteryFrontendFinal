import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { displayRazorpay } from "../../../helpers/placeOrder";
import { Link } from "react-router-dom";
import { batteryIndoreDataService } from "../../services/dataService";

function TopMoneySavers({ pageData }) {
	const swiperRef = useRef(null);
	const [allBatteries, setAllBatteries] = useState([]);

	const fetchAllBatteries = async () => {
		const response = await batteryIndoreDataService.getAllBatteries();
		setAllBatteries(response?.data?.data);
	}

	useEffect(() => {
		fetchAllBatteries()
		return () => {
		}
	}, [])

	return (
		<section className="shop-by-manufactures">
			<div className="center-wr">
				<h3 className="w-[100%] text-center text-[34px] text-[#000] font-[800] mb-[40px]" dangerouslySetInnerHTML={{ __html: pageData?.sectionContent[0]?.elementValue }}></h3>
				<Swiper
					modules={[Navigation, Pagination, Scrollbar, A11y]}
					spaceBetween={20}
					slidesPerView={window.innerWidth > 1024 ? 4 : window.innerWidth > 768 ? 	3 : window.innerWidth > 650 ? 2 : 1}
					loop={true}
					onSlideChange={() => { }}
					onSwiper={(swiper) => { swiperRef.current = swiper; }}
					style={{ position: "relative" }}
					autoplay={{
						delay: 2000,
						disableOnInteraction: false
					}}
			
				>
					{
						allBatteries?.map((item, idx) => (
							<SwiperSlide key={idx}>
								<Link to={`/buy-battery/${item?.batterySlug}`} key={idx} className="battery-card-link">
									<div className='battery-swiper-card w-[310px] flex flex-col items-center justify-start p-[10px] cursor-pointer relative'>
										<div className="discount-badge z-[1]" style={{right:"0px"}} >{item.discount === "" ? "25" : item.discount}% OFF</div>
										<figure className='transition-all w-[100%] h-[270px] relative overflow-hidden border-2 border-b-0 border-[rgba(0,0,0,0.1)] flex items-center justify-center'>
											{item?.isnew === 'true' && <div className="offers-and-discount-badge" ><p>NEW</p></div>}
											<img src={`https://batterybackend.react.stagingwebsite.co.in/images/${item.batteryImages}`} className='w-[75%] h-auto mx-auto my-0' alt="" />
										</figure>
										<figcaption className="transition-all uppercase bg-[#e5e5e5] p-[5px] text-center font-[300] w-[100%]">Car Battery</figcaption>
										<h3 className='mt-[15px] font-semibold text-[18px] w-[100%] mb-[15px] whitespace-nowrap text-ellipsis overflow-hidden'>
											{item?.batteryName}
										</h3>
										<p className="w-[100%] text-[#787878]">Warranty: 50 Months</p>
										<div className="py-[10px] border-t-2 border-[rgba(0,0,0,0.1)] mt-[10px] flex items-center justify-between w-[100%]">
											<p>Price</p>
											<p className="font-['Oswald'] font-[600]">₹ {item?.price}</p>
										</div>
										<div className="swiper-card-buy-now w-[100%] flex items-center gap-[25px]">
											<div className="w-[54px] h-[54px] rounded-full border-2 border-[rgba(0,0,0,0.1)] flex items-center justify-center">
												<img src="/images/shoppingcart.svg" width="24" height="24" alt="Shopping cart" />
											</div>
											<button className="py-[10px] w-[72%]  pl-[20px] pr-[20px] text-[18px] font-[600] focus:outline-none bg-[#1B283A] text-white border-l-[8px] solid border-l-[#FF7637]">
												Buy Now
											</button>
										</div>
									</div>
								</Link>
							</SwiperSlide>
						))
					}
				</Swiper>
			</div>
		</section>
	)
}

export default TopMoneySavers;