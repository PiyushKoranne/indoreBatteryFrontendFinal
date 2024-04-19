import React, { useState, useEffect } from "react";
import CarBrandsGrid from "../common/CarBrandGrid";
import axios from "axios";
import { batteryIndoreDataService } from "../../services/dataService";
import { Link, useNavigate } from "react-router-dom";

function ShopByManufacturer({ pageData }) {
	const [brands, setBrands] = useState([]);
	const navigate = useNavigate();
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
				<CarBrandsGrid brands={brands} />
				<div className="btn-cont flex justify-center mt-[45px]">
					<Link to={"/categories/car-batteries"} className="w-[15%]">
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

