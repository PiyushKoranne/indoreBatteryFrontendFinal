import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import axios from "axios";
import 'swiper/css';
import { useNavigate } from "react-router-dom";
import { batteryIndoreDataService } from "../../services/dataService";
import ConstantService from "../../services/constantsService";
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import CustomForm from "../test/FormikTest";
import log from "../../utils/utilityFunctions";

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
		log("fetching car brands...")
		const response = await batteryIndoreDataService.getAllCarBrands();
		setCarBrands(response?.data)
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
					modules={[Autoplay]}
					pagination={{ clickable: true }}
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
									<figure className="1440:h-auto 1749:h-[690px]">
										<img className="w-[100%] object-contain object-center" src={`https://batterybackend.react.stagingwebsite.co.in/images/${item?.value}`} alt="banner slider image" />
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
					<div className="320:mt-[0px] 1368:mt-[14%]">
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
											<select
												value={selectedCarBrand?.postData?.brandName}
												onChange={(e) => setSelectedCarBrand(carBrands.find(item => item?.postData?.brandName === e.target.value))}
												required
												className="w-full p-[10px] border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent]">

												<option value="Select Manufacturer">Select Manufacturer</option>
												{carBrands?.map((item, index) => (
													<option key={index} value={item?.postData?.brandName}>{item?.postData?.brandName}</option>
												))}
											</select>
										</div>
										<div className="mb-4">
											<label className="block text-sm font-semibold mb-2">  Car Model</label>
											<span className="text-[red] block mt-[-5px] pb-[5px]" style={{ display: carModelErr ? "block" : "none" }}>{carModelErr}</span>
											<select
												onChange={(e) => setSelectedCarModel(selectedCarBrand?.postData?.linkedEquipments.find(item => item.value?.split("__")[1] === e.target.value))}
												required className="w-full p-[10px] border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent]">
												<option value="Select Manufacturer">Select Model</option>
												{selectedCarBrand && selectedCarBrand?.postData?.linkedEquipments?.map((item, index) => (
													<option key={index} value={item?.value?.split("__")[1]}>{item?.value?.split("__")[0]} </option>
												))}
											</select>
										</div>
										<div className="mb-4">
											<label className="block text-sm font-semibold mb-2"> Battery Brand </label>
											<select
												onChange={(e) => setSelectedBatteryBrand(e.target.value)}
												required className="w-full p-[10px] border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent]">
												<option value="">Choose a Brand</option>
												<option value="All Brands">All Brands</option>
												{batteryBrands?.map((item, index) => (
													<option key={index} value={item?.brandName}>{item?.brandName} </option>
												))}
											</select>
										</div>
										<div className="flex justify-between gap-[20px] state-city-input-wr">

											<div className="mb-4 w-[50%]">
												<label className="block text-sm font-semibold mb-2">State </label>
												<select

													onChange={handleStateChange}
													value={selectedState}
													className="w-full p-[10px] border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent]">
													<option value="">Select State</option>
													{indianStatesAndCities?.map((item, index) => (
														<option key={index} value={item?.state}>{item?.state}</option>
													))}
												</select>
											</div>
											<div className="mb-4 w-[50%]">
												<label className="block text-sm font-semibold mb-2">  City </label>
												<select
													onChange={(e) => setSelectedCity(e.target.value)}
													className="w-full p-[10px] border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent]">
													<option value="">Select City</option>
													{selectedCities.map((city, index) => (
														<option key={index} value={city}>{city}</option>
													))}
												</select>
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
										<div className="mb-4 text-[#4D4D4D] inverter-btry-radio">
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

										<div className="mb-4 text-[#4D4D4D]">
											<label className="block text-sm font-semibold mb-2">  Capacity </label>
											<span className="text-[red] block mt-[-5px] pb-[5px]" style={{ display: capacityErr ? "block" : "none" }}>{capacityErr}</span>
											<select required onChange={(e) => { setInverterFormQuery(prev => ({ ...prev, capacity: e.target.value })) }} className="w-full p-[10px] border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent]">
												<option value={0} >Select Capacity</option>
												<option value={80} >80 AH</option>
												<option value={100} >100 AH</option>
												<option value={115} >115 AH</option>
												<option value={120} >120 AH</option>
												<option value={135} >135 AH</option>
												<option value={140} >140 AH</option>
												<option value={145} >145 AH</option>
												<option value={150} >150 AH</option>
												<option value={155} >155 AH</option>
												<option value={160} >160 AH</option>
												<option value={165} >165 AH</option>
												<option value={180} >180 AH</option>
												<option value={200} >200 AH</option>
												<option value={220} >220 AH</option>
												<option value={230} >230 AH</option>
												<option value={250} >250 AH</option>
												<option value={260} >260 AH</option>
											</select>
										</div>
										<div className="mb-4">
											<label className="block text-sm font-semibold mb-2">  Battery Brand </label>
											<select required onChange={(e) => { setInverterFormQuery(prev => ({ ...prev, brand: e.target.value })) }} className="w-full p-[10px] border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent]">
												<option value="All Brands">All Brands</option>
												<option value={"Livguard"}>Livguard</option>
												<option value={"Amaron"}>Amaron</option>
												<option value={"Exide"}>Exide</option>
												<option value={"PowerZONE"}>PowerZONE</option>
												<option value={"SF"}>SF</option> Sonic
											</select>
										</div>
										<div className="flex justify-between gap-[20px]  inverter-btry-little">

											<div className="mb-4 w-[50%]">
												<label className="block text-sm font-semibold mb-2">State</label>
												<select

													onChange={handleStateChange}
													value={selectedState}
													className="w-full p-[10px] border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent]">
													<option value="">Select State</option>
													{indianStatesAndCities?.map((item, index) => (
														<option key={index} value={item?.state}>{item?.state}</option>
													))}
												</select>
											</div>
											<div className="mb-4 w-[50%]">
												<label className="block text-sm font-semibold mb-2">  City </label>
												<select
													onChange={(e) => setSelectedCity(e.target.value)}
													className="w-full p-[10px] border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent]">
													<option value="">Select City</option>
													{selectedCities.map((city, index) => (
														<option key={index} value={city}>{city}</option>
													))}
												</select>
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
						<figure className=" w-[140px] h-[58px] mb-[14px] ml-[auto] mr-[auto] mt-[0]">
							<img src="/images/freeShipping.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
						</figure>
						<figcaption className="font-semibold font-['Oswald'] text-[18px] text-center w-[140px]">FREE SHIPPING</figcaption>
					</li>
					<li className="banner-after-elem">
						<figure className=" w-[140px] h-[58px] mb-[14px] ml-[auto] mr-[auto] mt-[0]">
							<img src="/images/freeInstallation.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
						</figure>
						<figcaption className="font-semibold font-['Oswald'] text-[18px] text-center w-[140px]">FREE INSTALLATION</figcaption>
					</li>
					<li className="banner-after-elem">
						<figure className=" w-[140px] h-[58px] mb-[14px] ml-[auto] mr-[auto] mt-[0]">
							<img src="/images/bestPrices.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
						</figure>
						<figcaption className="font-semibold font-['Oswald'] text-[18px] text-center w-[140px]">BEST PRICES</figcaption>
					</li>
					<li className="banner-after-elem">
						<figure className=" w-[140px] h-[58px] mb-[14px] ml-[auto] mr-[auto] mt-[0]">
							<img src="/images/cod.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
						</figure>
						<figcaption className="font-semibold font-['Oswald'] text-[18px] text-center w-[140px]">CASH ON DELIVERY</figcaption>
					</li>
					<li>
						<figure className=" w-[140px] h-[58px] mb-[14px] ml-[auto] mr-[auto] mt-[0]">
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