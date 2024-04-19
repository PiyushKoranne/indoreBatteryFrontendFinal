import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const PRINT_LOGS = import.meta.env.PRINT_LOGS === 'true'


const CarBrandsGrid = ({ brands }) => {
	const navigate = useNavigate();
	const backend_url = import.meta.env.VITE_BACKEND_URL;

	return (
		<div className=''>
			<div className="car-brand-grid-container flex flex-wrap  justify-center ">
				{brands.slice(0, 18).map((brand, index) => (
					<div onClick={() => { navigate(`/categories/car-batteries/models/${encodeURIComponent(brand?.postData?.brandName)}`, { state: brand?.postData }) }} key={index} className="w-[220px] h-[220px] flex justify-center items-center transition-all hover:bg-[#ff76370a] cursor-pointer">
						<img src={`${backend_url}/images/${brand?.postData?.brandLogo}`} className='max-w-[55%]' alt={brand.brandName} />
					</div>
				))}
			</div>
		</div>
	);
};

export default CarBrandsGrid;
