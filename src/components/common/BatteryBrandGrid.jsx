import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import log from "../../utils/utilityFunctions";


const BatteryBrandsGrid = ({ brands }) => {
	const backend_url = import.meta.env.VITE_BACKEND_URL
	const rows = [];
	for (let i = 0; i < brands.length; i += 6) {
		rows.push(brands.slice(i, i + 6));
	}

	return (
		<div className='car-brand-grid-wr py-[20px] car-brands-manu'>
			<Swiper 
				key={"battery-brands-swiper-320"}
				id={"battery-brands-swiper-320"}
				className=" 320:block 980:hidden 320:w-full 1200:w-[73%] banner-swiper"
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
					<SwiperSlide key={brand.brandName}>
						<Link key={index} className=" w-full pt-[10px] brand-item battery flex hover:bg-[#ff76370a] justify-center items-center" to={`/categories/show-batteries/${brand?.brandName}`}>
							<div className='max-w-[126px] flex items-center justify-center'>
								<img src={`${backend_url}/images/${brand?.brandLogo}`} alt={brand.brandName} />
							</div>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>

			<div className='320:hidden 980:block'>
			{rows.map((row, rowIndex) => (
				<div key={rowIndex} className="brand-row flex justify-center ">
					{row.map((brand, index) => (
						<Link key={index} className=" 320:w-[220px] 320:h-[120px]  1200:w-[346px] 1200:h-[200px]  brand-item battery flex hover:bg-[#ff76370a] justify-center items-center" to={`/categories/show-batteries/${brand?.brandName}`}>
							<div className='max-w-[126px] 320:w-[50%] flex items-center justify-center'>
								<img src={`${backend_url}/images/${brand?.brandLogo}`} alt={brand.brandName} />
							</div>
						</Link>
					))}
				</div>
			))}
			</div>
		</div>
	);
};

export default BatteryBrandsGrid;
