import React, { useEffect, useState } from "react";
import Header from "./common/Header";
import EnquirySection from "./common/EnquirySection";
import Footer from "./common/Footer";
import { batteryIndoreDataService } from "../services/dataService";
import { Link } from "react-router-dom";
import log from "../utils/utilityFunctions";


function Categories(){

	const [categories, setCategories] = useState(null);

	async function fetchAllCategories() {
		try {
			const response = await batteryIndoreDataService.getAllCategories();
			if(response.status === 200){
				log("ALL CATEGORY RESPONSE::", response);
				setCategories(response?.data?.categories)
			}
		} catch (error) {
			log(error);
			setCategories(null);
		}
	}


	useEffect(()=>{
		fetchAllCategories();
	},[])

    return(
        <>
        <Header/>
        <section className="all-category-pg-wr bg-[#F7F7F7] py-[5%]">
			<div className="center-wr">
				<div className="flex p-[8px] bg-[#F5F5F5] gap-[7px]">
					<span><Link to={"/"} className="hover:text-[#ff7637]">Home</Link></span> &gt; <span className="text-[#ff7637] font-[600]">All Categories</span>
				</div>
				<div className="py-[50px] flex-wrap flex gap-[10px]">
					{
						categories && categories?.map(item => (
							<Link to={`/categories${item?.postData?.categorySlug || '/categories/car-batteries'}`}>
								<div className="bg-[#fff] hover:bg-[#f7f7f7] cursor-pointer w-[300px] h-[210px] border-solid border-[1.5px] border-[rgba(0,0,0,0.1)] flex flex-col items-center justify-center gap-[15px] relative">
									<figure>
										<img src="/images/battery_icon.png" alt="Battery category icons" />
									</figure>
									<figcaption className="font-[500] text-[#404040] text-[16px] w-[200px] mt-[10px] text-center">
										{item?.postData?.categoryName}
									</figcaption>
								</div>
							</Link>	
						))
					}
				</div>
			</div>
        </section>
        <EnquirySection/>
        <Footer/>
        </>
    )
}

export default Categories;