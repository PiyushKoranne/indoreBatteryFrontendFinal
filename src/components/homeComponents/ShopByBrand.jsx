import React, { useState, useEffect } from "react";
import BatteryBrandsGrid from "../common/BatteryBrandGrid";
import axios from "axios";
import { batteryIndoreDataService } from "../../services/dataService";

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
		<section className="shop-by-manufactures font-[oswald] my-[5%]">
			<div className="center-wr">
				<h3 className="w-[100%] pb-[35px] text-center text-[34px] text-[#000] font-[800]" dangerouslySetInnerHTML={{ __html: pageData?.sectionContent[0]?.elementValue }}></h3>
				<BatteryBrandsGrid brands={brands?.slice(0, 12)} />
			</div>
		</section>
	)
}

export default ShopByBrand;

