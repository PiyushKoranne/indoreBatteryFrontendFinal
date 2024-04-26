import React, { useState, useEffect } from "react";
import CarBrandsGrid from "../common/CarBrandGrid";
import axios from "axios";
import { batteryIndoreDataService } from "../../services/dataService";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import log from "../../utils/utilityFunctions";

function ShopByManufacturer({ pageData }) {
	const [brands, setBrands] = useState([]);
	const navigate = useNavigate();
	const backend_url = import.meta.env.VITE_BACKEND_URL;
	async function getImages() {
		const response = await batteryIndoreDataService.getAllCarBrands();
		setBrands(response.data.reverse())
	}

	useEffect(() => {
		getImages()
	}, []);

	return (
		<section className="shop-by-manufactures font-[oswald] my-[5%]">
			<div className="center-wr">
				<h3 className="w-[100%] pb-[35px] text-center text-[34px] text-[#000] font-[800]" dangerouslySetInnerHTML={{ __html: pageData?.sectionContent[0]?.elementValue }}></h3>
				<div className="320:block 980:hidden car-brands-manu ">
					<Swiper
						key={'car-brands-swiper-320'}
						id={'car-brands-swiper-320'}
						className="my-swiper-1 h-fit"
						spaceBetween={0}
						slidesPerView={window.innerWidth >= 560 ? 2 : 1}
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
						{brands.slice(0, 6).map((brand, index) => (
							<SwiperSlide key={brand?.postData?.brandName}>
								<div onClick={() => { navigate(`/categories/car-batteries/models/${encodeURIComponent(brand?.postData?.brandName)}`, { state: brand?.postData }) }} key={index} className="w-full h-[200px] flex justify-center items-center transition-all 320:border-none 375:py-[20px] hover:bg-[#ff76370a] cursor-pointer">
									<img src={`${backend_url}/images/${brand?.postData?.brandLogo}`} className='max-w-[55%] ' alt={brand.brandName} />
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<CarBrandsGrid brands={brands} />
				<div className="btn-cont flex justify-center mt-[45px] 980:mt-[0px] 1368:mt-[45px]">
					<Link to={"/categories/car-batteries"} className="w-[15%] 320:w-fit">
						<button
							className="btn-special-spread-second p-[10px]  w-[100%] py-[15px] px-[40px] mt-[30px] text-[18px] font-[600] focus:outline-none bg-[#1B283A] text-white border-l-[8px] solid border-l-[#FF7637]
              ">
							{pageData?.sectionContent[1]?.elementValue}
						</button>
					</Link>
				</div>
			</div>
		</section>
	)
}

export default ShopByManufacturer;

