import React,{useState,useEffect} from "react";
import Header from "./common/Header";
import axios from "axios";
import { Link,useParams } from "react-router-dom";
import Footer from "./common/Footer";
import EnquirySection from "./homeComponents/EnquirySection";
import log from "../src/utils/utilityFunctions";

function Brands(){

	const [allBatteries, setAllBatteries] = useState([]);
	const {'brand-name':brandName} = useParams()
	log(brandName)
	const brandArr = [
		{name:"Pro"},
		{name:"Flo"},
		{name:"Fresh"},
		{name:"Black"},
		{name:"Pro"},
		{name:"Flo"},
		{name:"Fresh"},
	]

	const capacityArr = [
		{name:"35AH"},
		{name:"675AH"},
		{name:"145AH"},
		{name:"1400AH"},
		{name:"880AH"},
		{name:"100AH"},
		{name:"150AH"},
	]
	const typeArr = [
		{name:"Flat Plate Battery"},
		{name:"Tubular Battery"},
		{name:"Short Tubular"}
	]

	const warrantyArr = [
		{name:"48 Months (36 Months Full Replacement + 12 Months Pro Rata)"},
		{name:"24 Months (18 Months Full Replacement + 6 Months Pro Rata)"},
		{name:"36 Months (24 Months Full Replacement + 12 Months Pro Rata)"},
		{name:"54 Months (36 Months Full Replacement + 18 Months Pro Rata)"}
	]

	const brandArray = brandArr.map(item => 
		<label className="mt-[10px] block flex items-start" name={`${item.name}`}>
		<input className="border-[#7a7a7a] mt-[2px]" type="checkbox" />
		<span className="px-[10px] text-[13px]">{item.name}</span>
	</label>
	);

	const capacityArray = capacityArr.map(item => 
		<label className="block mt-[10px] flex items-start" name={`${item.name}`}>
		<input className="border-[#7a7a7a] mt-[2px]" type="checkbox" />
		<span className="px-[10px] text-[13px]">{item.name}</span>
	</label>
	);
	const warrantyArray = warrantyArr.map(item => 
		<label className="block mt-[10px] flex items-start" name={`${item.name}`}>
			<input className="border-[#7a7a7a] mt-[2px]" type="checkbox" />
			<span className="px-[10px] text-[13px]">{item.name}</span>
		</label>
	);

	const typeArray = typeArr.map(item => 
		<label className="block mt-[10px] flex items-start" name={`${item.name}`}>
			<input className="border-[#7a7a7a] mt-[2px]" type="checkbox" />
			<span className="px-[10px] text-[13px]">{item.name}</span>
		</label>
	);

    
	const fetchBatteriesByBrand = async () => {
		const response = await axios.get(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-batteries-by-brand/${brandName}`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
			}
		});
		setAllBatteries(response?.data?.data);
		log(response?.data?.data[3]?.postData)
	}

    useEffect(()=>{
		fetchBatteriesByBrand()
	},[])
	const renderBatteryCards = () => {
		const itemsPerRow = 2;
	  
		if (!Array?.isArray(allBatteries) || allBatteries?.length === 0) {
			// Render a message when it's not an array or is empty
			return (
			<>
			<div className="flex items-center justify-center w-[100%] mt-[10%]">
			<img src="https://vectorified.com/images/no-data-icon-10.png" />
			</div>
			</>
			)
		  }
	  
		return allBatteries?.map((item, idx) => (
		  <Link to={`/buy-battery/${item?.postData?.name}`} style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)"}} key={idx} className="border-[1px] border-solid border-[rgba(0,0,0,0.1)] bg-[#fff] m-[10px] battery-card-link">
			<div key={idx} className={`battery-swiper-card w-[310px] flex flex-col items-center justify-start  cursor-pointer ${idx % itemsPerRow === itemsPerRow - 1 ? 'clear-right' : ''}`}>
			  <div className='battery-swiper-card w-[310px] flex flex-col items-center justify-start  cursor-pointer'>
				<figure className='w-[100%] py-[30px] relative overflow-hidden '>
				  {item?.postData?.isnew === 'New' && <div className="offers-and-discount-badge" ><p>NEW</p></div>}
				  <div className="discount-badge">{item?.postData?.discount === "" ? "25" :item?.postData?.discount  }% OFF</div>
				  <img src={`https://batterybackend.react.stagingwebsite.co.in/images/${item?.postData?.batteryimages}`} className='w-[75%] h-auto mx-auto my-0' alt="" />
				</figure>
				<figcaption className="uppercase bg-[#e5e5e5] p-[5px] text-center font-[300] w-[100%]">Car Battery</figcaption>
				<div className="px-[10px]">
				<h3 className='mt-[15px] font-semibold text-[18px] w-[100%] mb-[15px] whitespace-nowrap text-ellipsis overflow-hidden'>
				  {item?.postData?.name}
				</h3>
				<p className="w-[100%] text-[#787878]">Warranty: 50 Months</p>
				<div className="py-[10px] border-t-2 border-[rgba(0,0,0,0.1)] mt-[10px] flex items-center justify-between w-[100%]">
				  <p>Price</p>
				  <p className="font-['Oswald'] font-[600]">₹ {item?.postData?.mrp}</p>
				</div>
				</div>
			
			  </div>
			</div>
		  </Link>
		));

	};


    return(
        <>
        <Header/>
        <section className="bg-[#F7F7F7] pb-[5%]">
            <div className="center-wr">
            <div className="flex p-[8px] bg-[#F5F5F5] gap-[7px] pt-[81px] mb-[30px]">
                    <span>Home: </span> <span className="text-[#3BBA11] font-[600]">{brandName}</span>
                    </div>

            <div className="flex">
                {/* sidebar */}
                <div className="brand-sidebar w-[20%] bg-[#fff] px-[20px] mx-[20px] h-[910px] py-[15px] pb-[30px] sticky top-[10px]" style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)",overflowY:"auto"}} >
					<div className="border-b-[1px] border-solid border-b-[rgba(0,0,0,0.1)] pb-[20px]">
						<div>
							<h3 className="text-[#3BBA11] text-[18px] font-[600] py-[15px]">Brands</h3>
						</div>
						<div className="text-[#7a7a7a]">
							{brandArray}
						</div>
					</div>
					<div className="border-b-[1px] border-solid border-b-[rgba(0,0,0,0.1)] pb-[20px]">
						<div>
							<h3 className="text-[#3BBA11] text-[18px] font-[600] py-[15px]">Capacity</h3>
						</div>
						<div className="text-[#7a7a7a]">
							{capacityArray}
						</div>
					</div>
					<div className="border-b-[1px] border-solid border-b-[rgba(0,0,0,0.1)] pb-[20px]">
						<div>
							<h3 className="text-[#3BBA11] text-[18px] font-[600] py-[15px]">Type</h3>
						</div>
						<div className="text-[#7a7a7a]">
							{typeArray}
						</div>
					</div>
					<div>
						<div>
							<h3 className="text-[#3BBA11] text-[18px] font-[600] py-[15px]">Warranty</h3>
						</div>
						<div className="text-[#7a7a7a]">
							{warrantyArray}
						</div>
					</div>
                </div>
                {/* content */}
                <div className="w-[100%] flex flex-wrap">
				{renderBatteryCards()}
				{renderBatteryCards()}
					</div>
            </div>

            </div>

        </section>

		<EnquirySection/>
		<Footer/>
        </>
    )
}
export default Brands;