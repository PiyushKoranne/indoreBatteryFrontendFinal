import React, { useState, useEffect } from "react";
import BatteryBrandsGrid from "../common/BatteryBrandGrid";
import axios from "axios";
import { batteryIndoreDataService } from "../../services/dataService";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import log from "../../utils/utilityFunctions";
import { Link } from "react-router-dom";

function ShopByBrand({ pageData }) {
	const [brands, setBrands] = useState([]);
	const backend_url = import.meta.env.VITE_BACKEND_URL

	async function getImages() {
		const response = await batteryIndoreDataService.getAllCarBatteryBrands();
		setBrands(response.data.data?.filter(item => Object.keys(item)?.length > 0));
	}

	useEffect(() => {
		getImages()
	}, []);


	return (
		<section className="shop-by-manufactures font-[oswald] 320:mt-[35px] 560:mt-[60px] 1024:mt-[75px] 1200:mt-[100px]">
			<div className="center-wr">
				<h3 className="w-[100%] text-center text-[34px] text-[#202020] font-[800] 320:mb-[45px]" dangerouslySetInnerHTML={{ __html: pageData?.sectionContent[0]?.elementValue }}></h3>
				<BatteryBrandsGrid brands={brands?.slice(0, 12)} />
			</div>
		</section>
	)
}

export default ShopByBrand;

