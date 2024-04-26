import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import log from "../../utils/utilityFunctions";
const PRINT_LOGS = import.meta.env.PRINT_LOGS === 'true'


const  CarBrandsGrid = ({ brands }) => {
	const navigate = useNavigate();
	const backend_url = import.meta.env.VITE_BACKEND_URL;

	return (
		<div className='320:hidden 980:block'>
			<div className="car-brand-grid-container 320:hidden 980:flex flex-wrap justify-center 320:gap-[30px] 1200:gap-0 320:py-[25px]">
				{brands.slice(0, 18).map((brand, index) => (
					<div onClick={() => { navigate(`/categories/car-batteries/models/${encodeURIComponent(brand?.postData?.brandName)}`, { state: brand?.postData }) }} key={index} className="1200:w-[220px] 1200:h-[220px] 320:w-[40%] 560:w-[33%] 768:w-[20%] 320:h-auto flex justify-center items-center transition-all 320:border-none 375:py-[20px] hover:bg-[#ff76370a] cursor-pointer">
						<img src={`${backend_url}/images/${brand?.postData?.brandLogo}`} className='max-w-[55%] 320:p-[5px] 560:p-[10px]' alt={brand.brandName} />
					</div>
				))}
			</div>
		</div>
	);
};

export default CarBrandsGrid;
