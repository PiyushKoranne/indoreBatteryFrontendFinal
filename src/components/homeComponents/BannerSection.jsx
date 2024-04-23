import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import axios from "axios";
import 'swiper/css';
import 'swiper/css/pagination';
import { useNavigate } from "react-router-dom";
import { batteryIndoreDataService } from "../../services/dataService";
import ConstantService from "../../services/constantsService";
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import CustomForm from "../test/FormikTest";
import log from "../../utils/utilityFunctions";
import { Select } from "antd";
import { PiCaretDownBold } from "react-icons/pi";

function Banner({ pageData }) {

	const [batteryType, setBatteryType] = useState('car');
	const [carBrands, setCarBrands] = useState([]);
	const [batteryBrands, setBatteryBrands] = useState([]);
	const [carModels, setCarModels] = useState([]);
	const [selectedCarBrand, setSelectedCarBrand] = useState("");
	const [selectedCarModel, setSelectedCarModel] = useState(null);
	const [selectedBatteryBrand, setSelectedBatteryBrand] = useState("Amaron");
	const [selectedState, setSelectedState] = useState('');
	const [selectedCity, setSelectedCity] = useState("");
	const [inverterFormQuery, setInverterFormQuery] = useState({ category: "Inverter Batteries", brand: "All Brands" });
	const navigate = useNavigate();
	const [warningMessage, setWarningMessage] = useState(null);
	const [carBrandErr, setCarBrandErr] = useState("");
	const [carModelErr, setCarModelErr] = useState("");
	const [capacityErr, setCapactityErr] = useState("");


	const indianStatesAndCities = ConstantService.indianStatesAndCities;

	const handleStateChange = (event) => {
		setSelectedState(event.target.value);
	};

	// Filter cities based on selected state
	const selectedCities = indianStatesAndCities.find(state => state.state === selectedState)?.cities || [];


	const handleBatteryChange = (type) => {
		setBatteryType(type);
	};

	async function fetchCarBrands() {
		log("fetching car brands...");
		const response = await batteryIndoreDataService.getAllCarBrands();
		setCarBrands(response?.data);
	}


	async function fetchBatteryBrands() {
		const response = await batteryIndoreDataService.getAllCarBatteryBrands();
		setBatteryBrands(response?.data?.data?.filter(item => Object.keys(item)?.length > 0));
	}

	async function findCarBattery(e) {
		e.preventDefault();
		if (batteryType === 'car') {
			if (selectedCarBrand === "") {
				setCarBrandErr("Please Select Car Manufacturer")
			} else if (selectedCarModel === null) {
				setCarBrandErr("")
				setCarModelErr("Please Select Car Model")
			} else {
				navigate(`/categories/car-batteries/filter/${encodeURIComponent(selectedCarBrand?.postData?.brandName)}/${encodeURIComponent(selectedCarModel?.value?.split('__')[0])}`, { state: { ...selectedCarModel, brand: selectedBatteryBrand, locationData: { state: selectedState, city: selectedCity } } })
			}
		} else if (batteryType === 'inverter') {
			if (!inverterFormQuery?.capacity) {
				setCapactityErr("Please Select capacity")
			} else {
				setCapactityErr("")
				navigate(`/categories/inverter-batteries/find/${inverterFormQuery.brand}`, { state: inverterFormQuery })
			}
		}
	}


	useEffect(() => {
		fetchCarBrands()
		fetchBatteryBrands()
	}, [carModels?.length, selectedCarBrand])


	return (
		<section style={{ margin: "0 auto" }} className="banner-wr bg-[#F7F7F7] mb-[20px]">

			<div className="flex flex-wrap">
				<Swiper className=" 320:w-full 1368:w-[73%] banner-swiper"
					spaceBetween={0}
					slidesPerView={1}
					autoHeight={true}
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
					{
						pageData ? pageData?.sectionContent?.filter(item => item?.elementAttrName === 'carouselImages')[0]?.elementItems?.map((item, index) => (
							<SwiperSlide>
								<div className="banner-slide-img-wr relative" >
									<div className="fixed w-screen z-[10] top-[200px]">
										{/* <span className="text-[#fff]  font-[800] w-[60%] mx-[auto] left-[-10%] relative  text-[38px] uppercase block font-['Oswald']">We offer a very wide selection of batteries for all types of vehicles.</span> */}
									</div>
									<figure className="1024:h-[560px]">
										<img className="w-[100%] object-cover h-full" src={`https://batterybackend.react.stagingwebsite.co.in/images/${item?.value}`} alt="banner slider image" />
									</figure>
								</div>
							</SwiperSlide>
						)) :
							<SwiperSlide>
								<div className="banner-slide-img-wr relative" >
									<div className="fixed w-screen z-[10] top-[200px]">
										{/* <span className="text-[#fff]  font-[800] w-[60%] mx-[auto] left-[-10%] relative  text-[38px] uppercase block font-['Oswald']">We offer a very wide selection of batteries for all types of vehicles.</span> */}
									</div>
									<img className="w-[100%]" src="/images/technician-checking-electrical-system-car.png" alt="banner slider image" />
								</div>
							</SwiperSlide>
					}
				</Swiper>

				<div className="320:w-full 1368:w-[27%]">
					<div className="320:mt-[0px] 1368:mt-[0%]">
						<div className=" text-[#000] p-[24px] 1200:w-[50%] 1368:w-full">
							<div className="mb-4">
								<h3 className="pb-[10px] pt-[10px] text-[22px] font-[800]">FIND YOUR BATTERY QUICKLY</h3>
								<div className="flex h-[40px]">
									<button className={`p-[7px] w-[45%] border-[1px] solid border-[rgba(0,0,0,0.2)] text-[14px] font-[600] mr-4 focus:outline-none ${batteryType === 'car' ? 'bg-[#ff7637] text-white form-btn-active' : 'bg-[transparent]'}`}
										onClick={() => handleBatteryChange('car')}
									>
										CAR BATTERY
									</button>
									<button className={`p-[5px] w-[56%] border-[1px] solid border-[rgba(0,0,0,0.2)] text-[14px] inverter-btry font-[600] focus:outline-none ${batteryType === 'inverter' ? 'bg-[#ff7637] text-white form-btn-active' : 'bg-[transparent]'}`}
										onClick={() => handleBatteryChange('inverter')}
									>
										INVERTER BATTERY
									</button>
								</div>
							</div>
							{batteryType === 'car' && (
								<div>
									<form onSubmit={findCarBattery}>
										<div className="mb-4">
											<label className="block text-sm font-semibold mb-2">Car Brand</label>
											<span className="text-[red] mt-[-5px] pb-[5px]" style={{ display: carBrandErr ? "block" : "none" }}>{carBrandErr}</span>
											<Select
												suffixIcon={<PiCaretDownBold className="text-[#000000] text-[16px] font-bold" />}
												variant="borderless"
												defaultValue=""
												className="w-full p-[4px]  border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent] batt-form-select"
												onChange={(val) => { setSelectedCarBrand(carBrands.find(item => item?.postData?.brandName === val)) }}
												options={[{ value: "", label: "Select a Model" }, ...carBrands?.map(item => ({ value: item?.postData?.brandName, label: item?.postData?.brandName }))]}
											/>
											{/* <select
												value={selectedCarBrand?.postData?.brandName}
												onChange={(e) => setSelectedCarBrand(carBrands.find(item => item?.postData?.brandName === e.target.value))}
												required
												className="w-full p-[10px] border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent]">

												<option value="Select Manufacturer">Select Manufacturer</option>
												{carBrands?.map((item, index) => (
													<option key={index} value={item?.postData?.brandName}>{item?.postData?.brandName}</option>
												))}
											</select> */}
										</div>
										<div className="mb-4">
											<label className="block text-sm font-semibold mb-2">  Car Model</label>
											<span className="text-[red] block mt-[-5px] pb-[5px]" style={{ display: carModelErr ? "block" : "none" }}>{carModelErr}</span>
											<Select
												suffixIcon={<PiCaretDownBold className="text-[#000000] text-[16px] font-bold" />}
												variant="borderless"
												defaultValue=""
												className="w-full p-[4px]  border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent] batt-form-select"
												onChange={(val) => { setSelectedCarModel(selectedCarBrand?.postData?.linkedEquipments.find(item => item.value?.split("__")[1] === e.target.value)) }}
												options={selectedCarBrand ? [...selectedCarBrand?.postData?.linkedEquipments?.map((item, index) => ({ value: item?.value?.split("__")[1], label: item?.value?.split("__")[0] }))] : [{ value: "", label: "Choose a Brand" }]}
											/>
										</div>
										<div className="mb-4">
											<label className="block text-sm font-semibold mb-2"> Battery Brand </label>
											<Select
												suffixIcon={<PiCaretDownBold className="text-[#000000] text-[16px] font-bold" />}
												variant="borderless"
												defaultValue=""
												className="w-full p-[4px]  border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent] batt-form-select"
												onChange={(val) => { setSelectedBatteryBrand(val) }}
												options={[{ value: "", label: "Battery Brand" }, ...batteryBrands?.map((item, index) => ({ value: item?.brandName, label: item?.brandName }))]}
											/>
										</div>
										<div className="flex justify-between gap-[20px] state-city-input-wr">

											<div className="mb-4 w-[50%]">
												<label className="block text-sm font-semibold mb-2">State </label>
												<Select
													suffixIcon={<PiCaretDownBold className="text-[#000000] text-[16px] font-bold" />}
													variant="borderless"
													defaultValue=""
													className="w-full p-[4px]  border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent] batt-form-select"
													onChange={(val) => { setSelectedState(val) }}
													options={[{ value: "", label: "Choose a State" }, ...indianStatesAndCities?.map((item, index) => ({ value: item?.state, label: item?.state }))]}
												/>
											</div>
											<div className="mb-4 w-[50%]">
												<label className="block text-sm font-semibold mb-2">  City </label>
												<Select
												  suffixIcon={<PiCaretDownBold className="text-[#000000] text-[16px] font-bold" />}
													variant="borderless"
													defaultValue=""
													className="w-full p-[4px]  border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent] batt-form-select"
													onChange={(val) => { setSelectedCity(val) }}
													options={[{ value: "", label: "Choose a City" }, ...selectedCities?.map((item, index) => ({ value: item, label: item }))]}
												/>
											</div>
										</div>
										<button
											type="submit"
											className="btn-special-spread 1368:p-[7px] 1440:p-[10px] 1749:p-[15px] w-[46%] 1440:text-[16px] 1749:text-[18px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]">
											Find Battery
										</button>
									</form>
								</div>
							)}

							{/* Inverter Battery Form */}
							{batteryType === 'inverter' && (
								<div>
									<form onSubmit={findCarBattery}>
										<div className="mb-4 inverter-btry-radio">
											<label className="block text-sm font-semibold mb-2">I am looking for</label>
											<div className="flex">
												<div className="mx-[5px]">
													<input checked type="radio" id="inverterBattery" onChange={(e) => { setInverterFormQuery(prev => ({ ...prev, category: e.target.value })) }} value={"Inverter Batteries"} name="inverterBatteryType" />
													<label htmlFor="inverterBattery" className="ml-2">Battery</label>
												</div>
												<div className="mx-[5px]">
													<input type="radio" id="inverterCombo" onChange={(e) => { setInverterFormQuery(prev => ({ ...prev, category: e.target.value })) }} value={"Inverter+Battery Combo"} name="inverterBatteryType" />
													<label htmlFor="inverterCombo" className="ml-2">Battery+inverter</label>
												</div>

											</div>
										</div>

										{/* Dropdowns for Inverter Battery */}

										<div className="mb-4">
											<label className="block text-sm font-semibold mb-2">  Capacity </label>
											<span className="text-[red] block mt-[-5px] pb-[5px]" style={{ display: capacityErr ? "block" : "none" }}>{capacityErr}</span>
											<Select
												suffixIcon={<PiCaretDownBold className="text-[#000000] text-[16px] font-bold" />}
												variant="borderless"
												defaultValue={0}
												className="w-full p-[4px]  border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent] batt-form-select"
												onChange={(val) => { setInverterFormQuery(prev => ({ ...prev, capacity: val })) }}
												options={[
													{ value: 0, label: "Select Capacity" }, 
													{ value: 80, label: "80" },
													{ value: 100, label: "100" },
													{ value: 115, label: "115" },
													{ value: 120, label: "120" },
													{ value: 135, label: "135" },
													{ value: 140, label: "140" },
													{ value: 145, label: "145" },
													{ value: 150, label: "150" },
													{ value: 155, label: "155" },
													{ value: 160, label: "160" },
													{ value: 165, label: "165" },
													{ value: 180, label: "180" },
													{ value: 200, label: "200" },
													{ value: 220, label: "220" },
													{ value: 230, label: "230" },
													{ value: 250, label: "250" },
													{ value: 260, label: "260" },
													
												]}
											/>
										</div>
										<div className="mb-4">
											<label className="block text-sm font-semibold mb-2">  Battery Brand </label>
											<Select
												suffixIcon={<PiCaretDownBold className="text-[#000000] text-[16px] font-bold" />}
												variant="borderless"
												defaultValue="All Brands"
												className="w-full p-[4px]  border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent] batt-form-select"
												onChange={(val) => { setInverterFormQuery(prev => ({ ...prev, brand: val })) }}
												options={[
													{ value: "All Brands", label: "All Brands" }, 
													{ value: "Livguard", label: "Livguard" },
													{ value: "Amaron", label: "Amaron" },
													{ value: "Exide", label: "Exide" },
													{ value: "PowerZONE", label: "PowerZONE" },
													{ value: "SF Sonic", label: "SF Sonic" },
												]}
											/>
										</div>
										<div className="flex justify-between gap-[20px]  inverter-btry-little">
											<div className="mb-4 w-[50%]">
												<label className="block text-sm font-semibold mb-2">State</label>
												<Select
													suffixIcon={<PiCaretDownBold className="text-[#000000] text-[16px] font-bold" />}
													variant="borderless"
													defaultValue=""
													className="w-full p-[4px]  border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent] batt-form-select"
													onChange={(val) => { setSelectedState(val) }}
													options={[{ value: "", label: "Choose a State" }, ...indianStatesAndCities?.map((item, index) => ({ value: item?.state, label: item?.state }))]}
												/>
											</div>
											<div className="mb-4 w-[50%]">
												<label className="block text-sm font-semibold mb-2">  City </label>
												<Select
													suffixIcon={<PiCaretDownBold className="text-[#000000] text-[16px] font-bold" />}
													variant="borderless"
													defaultValue=""
													className="w-full p-[4px]  border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent] batt-form-select"
													onChange={(val) => { setSelectedCity(val) }}
													options={[{ value: "", label: "Choose a City" }, ...selectedCities?.map((item, index) => ({ value: item, label: item }))]}
												/>
											</div>
										</div>
										<button
											className="btn-special-spread 1440:p-[10px] 1749:p-[15px] w-[46%] 1440:text-[16px] 1749:text-[18px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]
              ">
											Find Battery
										</button>
									</form>
								</div>
							)}
						</div>
					</div>

				</div>
			</div>

			{/* icon set */}

			<div className=" banner-after-elem-wr py-[40px] bg-[#000] text-[#fff]">
				<ul className="banner-after-elem-cont flex justify-center gap-[110px]">
					<li className="banner-after-elem">
						<figure className=" w-[140px] h-[58px] mb-[0px] ml-[auto] mr-[auto] mt-[0]">
							<img src="/images/freeShipping.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
						</figure>
						<figcaption className="font-semibold font-['Oswald'] text-[18px] text-center w-[140px]">FREE SHIPPING</figcaption>
					</li>
					<li className="banner-after-elem">
						<figure className=" w-[140px] h-[58px] mb-[0px] ml-[auto] mr-[auto] mt-[0]">
							<img src="/images/freeInstallation.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
						</figure>
						<figcaption className="font-semibold font-['Oswald'] text-[18px] text-center w-[140px]">FREE INSTALLATION</figcaption>
					</li>
					<li className="banner-after-elem">
						<figure className=" w-[140px] h-[58px] mb-[0px] ml-[auto] mr-[auto] mt-[0]">
							<img src="/images/bestPrices.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
						</figure>
						<figcaption className="font-semibold font-['Oswald'] text-[18px] text-center w-[140px]">BEST PRICES</figcaption>
					</li>
					<li className="banner-after-elem">
						<figure className=" w-[140px] h-[58px] mb-[0px] ml-[auto] mr-[auto] mt-[0]">
							<img src="/images/cod.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
						</figure>
						<figcaption className="font-semibold font-['Oswald'] text-[18px] text-center w-[140px]">CASH ON DELIVERY</figcaption>
					</li>
					<li>
						<figure className=" w-[140px] h-[58px] mb-[0px] ml-[auto] mr-[auto] mt-[0]">
							<img src="/images/payOnline.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
						</figure>
						<figcaption className="font-semibold font-['Oswald'] text-[18px] text-center w-[140px]">PAY BY ONLINE</figcaption>
					</li>
				</ul>
			</div>

		</section>
	)
}

export default Banner;