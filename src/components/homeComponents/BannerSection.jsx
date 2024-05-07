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

	async function findCarBattery(values) {
		if (batteryType === 'car') {
			log(carBrands);
			const carModelData = carBrands?.filter(item => item?.postData?.brandName === values.carBrand)[0]?.postData?.linkedEquipments.find(item => item.value?.split("__")[1] === values.carModel)

			navigate(`/categories/car-batteries/filter/${encodeURIComponent(values.carBrand)}/${encodeURIComponent(carModelData?.value?.split('__')[0])}`, { state: { ...carModelData, brand: values.batteryBrand, locationData: { state: values.state, city: values.city } } });

		} else if (batteryType === 'inverter') {
			if (values.category === "Inverter+Battery Combo") {
				navigate(`/categories/inverter-plus-battery-combo/find/${values.batteryBrand}`, { state: { category: values.category, capacity: values.capacity?.toString(), brand: values.batteryBrand } });
			} else {
				log("INVERTER FORM", values);
				navigate(`/categories/inverter-batteries/find/${values.batteryBrand}`, { state: { category: values.category, capacity: values.capacity?.toString(), brand: values.batteryBrand } });
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
				<Swiper
					key={'banner-home-hero'}
					id={'banner-home-hero'}
					className=" 320:w-full 1440:w-[73%] 1200:w-[68%] banner-swiper"
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
							<SwiperSlide key={item?.value}>
								<div className="banner-slide-img-wr relative" >
									<div className="fixed w-screen z-[10] top-[200px]">
										{/* <span className="text-[#fff]  font-[800] w-[60%] mx-[auto] left-[-10%] relative  text-[38px] uppercase block font-['Oswald']">We offer a very wide selection of batteries for all types of vehicles.</span> */}
									</div>
									<figure className="1024:h-[570px] 1440:h-[580px]">
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

				<div className="320:w-full 1440:w-[27%] 1200:1200:w-[32%]">
					<div className="320:mt-[0px] 1200:mt-[0%]">
						<div className=" text-[#202020] p-[24px] 1200:w-[50%] 1200:w-full 768:mx-auto 768:w-[75%] 980:w-[60%]">
							<div className="mb-4">
								<h3 className="pb-[10px] pt-[10px] 320:text-[22px] 1368:text-[24px] font-[700] leading-[35.5px] ">FIND YOUR BATTERY QUICKLY</h3>
								<div className="flex h-[40px]">
									<button className={`p-[7px] w-[45%] border-[1px] solid border-[rgba(0,0,0,0.2)] text-[14px] 320:text-[12px] 1024:text-[14px] 1200:text-[12px] 1368:text-[14px] 1679:text-[16px] font-[600] mr-4 focus:outline-none ${batteryType === 'car' ? 'bg-[#ff7637] text-white form-btn-active' : 'bg-[transparent]'}`}
										onClick={() => handleBatteryChange('car')}
									>
										Car Battery
									</button>
									<button className={`p-[5px] w-[56%] border-[1px] solid border-[rgba(0,0,0,0.2)] text-[14px] 320:text-[12px] 1024:text-[14px] 1200:text-[12px] 1368:text-[14px] 1679:text-[16px] font-[600] focus:outline-none ${batteryType === 'inverter' ? 'bg-[#ff7637] text-white form-btn-active' : 'bg-[transparent]'}`}
										onClick={() => handleBatteryChange('inverter')}
									>
										Inverter Battery
									</button>
								</div>
							</div>
							{batteryType === 'car' && (
								<div>
									<Formik
										initialValues={{ carBrand: "", carModel: "", batteryBrand: "", state: "", city: "" }}
										validate={(values) => {
											log(values);
											const errors = {};
											if (!values.carBrand) errors.carBrand = 'Please choose a car brand';
											if (!values.carModel) errors.carModel = 'Please choose a car model';
											if (!values.batteryBrand) errors.batteryBrand = 'Please choose a battery brand';
											return errors;
										}}
										onSubmit={(values, { setSubmitting, resetForm }) => {
											findCarBattery(values);
											setSubmitting(false);
											resetForm(true);
										}}
									>
										{({ values, errors, touched, dirty, handleChange, handleBlur, handleReset, setFieldValue, handleSubmit }) => (
											<form onSubmit={handleSubmit}>
												<div className="mb-4 relative">
													<label className="block text-[14px] font-semibold mb-2 320:mb-[12px] relative">Car Brand</label>
													{touched.carBrand && errors.carBrand && <span className="font-medium text-red-600 text-[14px] absolute right-0 top-[0px] 320:left-0 320:top-[15px] 320:text-[12px]" >{errors.carBrand}</span>}
													<Select
														suffixIcon={<PiCaretDownBold className="text-[#202020] text-[16px] font-bold" />}
														variant="borderless"
														onBlur={handleBlur}
														name="carBrand"
														defaultValue=""
														className="w-full p-[4px]  border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent] batt-form-select"
														onChange={(val) => { setFieldValue("carBrand", val); setFieldValue("carModel", null); }}
														options={[{ value: "", label: "Select a Model" }, ...carBrands?.map(item => ({ value: item?.postData?.brandName, label: item?.postData?.brandName }))]}
													/>
												</div>
												<div className="mb-4 relative">
													<label className="block text-[14px] font-semibold mb-2 320:mb-[12px]">  Car Model</label>
													{touched.carModel && errors.carModel && <span className="font-medium text-red-600 text-[14px] absolute right-0 top-[0px] 320:left-0 320:top-[15px] 320:text-[12px]" >{errors.carModel}</span>}
													<Select
														suffixIcon={<PiCaretDownBold className="text-[#202020] text-[16px] font-bold" />}
														variant="borderless"
														onBlur={handleBlur}
														name="carModel"
														defaultValue=""
														placeholder="Choose a Model"
														className="w-full p-[4px]  border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent] batt-form-select"
														onChange={(val) => { setFieldValue("carModel", val) }}
														value={values.carModel}
														options={(values.carBrand && carBrands?.filter(item => item?.postData?.brandName === values.carBrand)[0]?.postData?.linkedEquipments) ? [...carBrands?.filter(item => item?.postData?.brandName === values.carBrand)[0]?.postData?.linkedEquipments?.map((item, index) => ({ value: item?.value?.split("__")[1], label: item?.value?.split("__")[0] }))] : [{ value: "", label: "Choose a Brand" }]}
													/>
												</div>
												<div className="mb-4 relative">
													<label className="block text-[14px] font-semibold mb-2 320:mb-[12px]"> Battery Brand </label>
													{touched.batteryBrand && errors.batteryBrand && <span className="font-medium text-red-600 text-[14px] absolute right-0 top-[0px] 320:left-0 320:top-[15px] 320:text-[12px]" >{errors.batteryBrand}</span>}
													<Select
														suffixIcon={<PiCaretDownBold className="text-[#202020] text-[16px] font-bold" />}
														variant="borderless"
														onBlur={handleBlur}
														name="batteryBrand"
														defaultValue=""
														className="w-full p-[4px]  border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent] batt-form-select"
														onChange={(val) => { setFieldValue("batteryBrand", val) }}
														options={[{ value: "", label: "Battery Brand" }, { value: "All Brands", label: "All Brands" }, ...batteryBrands?.map((item, index) => ({ value: item?.brandName, label: item?.brandName }))]}
													/>
												</div>
												<div className="flex 320:flex-wrap 320:justify-start 560:justify-between gap-[20px] 320:gap-0 ">

													<div className="mb-4 w-[50%] 320:w-full 560:w-[45%]">
														<label className="block text-[14px] font-semibold mb-2 320:mb-[12px]">State </label>
														<Select
															suffixIcon={<PiCaretDownBold className="text-[#202020] text-[16px] font-bold" />}
															variant="borderless"
															defaultValue=""
															className="w-full p-[4px]  border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent] batt-form-select"
															onChange={(val) => { setFieldValue("state", val) }}
															options={[{ value: "", label: "Choose a State" }, ...indianStatesAndCities?.map((item, index) => ({ value: item?.state, label: item?.state }))]}
															onBlur={handleBlur}
															name="state"
														/>
													</div>
													<div className="mb-4 w-[50%] 320:w-full 560:w-[45%]">
														<label className="block text-[14px] font-semibold mb-2 320:mb-[12px]">  City </label>
														<Select
															suffixIcon={<PiCaretDownBold className="text-[#202020] text-[16px] font-bold" />}
															variant="borderless"
															defaultValue=""
															className="w-full p-[4px]  border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent] batt-form-select"
															onChange={(val) => { setFieldValue("city", val) }}
															onBlur={handleBlur}
															name="city"
															options={ values.state ? [{ value: "", label: "Choose a City" }, ...indianStatesAndCities?.find(obj=>obj.state === values.state)?.cities?.map((item, index) => ({ value: item, label: item }))]:[{ value: "", label: "Choose a City" }]}
														/>
													</div>
												</div>
												<button
													type="submit"
													className="btn-special-spread 320:p-[8px] 320:mt-[10px] 1440:p-[10px] 1749:p-[12px] w-[46%] 1440:text-[16px] 1749:text-[18px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]">
													Find Battery
												</button>
											</form>
										)}
									</Formik>
								</div>
							)}

							{/* Inverter Battery Form */}
							{batteryType === 'inverter' && (
								<div>
									<Formik
										initialValues={{ category: "Inverter Batteries", capacity: 0, batteryBrand: "", state: "", city: "" }}
										validate={(values) => {
											const errors = {};
											if (values.capacity === 0) errors.capacity = 'Please choose a capacity';
											if (!values.batteryBrand) errors.batteryBrand = 'Please choose a battery brand';
											return errors;
										}}
										onSubmit={(values, { setSubmitting, resetForm }) => {
											findCarBattery(values);
											setSubmitting(false);
											resetForm(true);
										}}
									>
										{({ values, dirty, touched, handleBlur, handleChange, handleReset, handleSubmit, errors, setFieldError, setFieldValue }) => (

											<form onSubmit={handleSubmit}>
												<div className="mb-4 inverter-btry-radio">
													<label className="block text-sm font-semibold mb-2">I am looking for</label>
													<div className="flex">

														{/* <div className="mx-[5px]">
															<input checked={values.category === "Inverter Batteries"} type="radio" id="inverterBattery" onChange={handleChange} onBlur={handleBlur} value={"Inverter Batteries"} name="category" />
															<label htmlFor="inverterBattery" className="ml-2">Battery</label>
														</div> */}
														<label htmlFor="inverterBattery" className="battery-price-picker flex justify-between px-[15px] 320:px-0 320:w-full 1368:w-fit 1368:px-[15px]">
															<div className="flex items-center gap-[10px]">
																<input
																	checked={values.category === "Inverter Batteries"} type="radio" id="inverterBattery" onChange={handleChange} onBlur={handleBlur} value={"Inverter Batteries"} name="category"
																/>
																<span className="text-[14px] inline-block">Inverter </span>
															</div>
														</label>
														<label htmlFor="inverterCombo" className="battery-price-picker flex justify-between px-[15px] 320:px-0 320:w-full 1368:w-fit 1368:px-[15px]">
															<div className="flex items-center gap-[10px]">
																<input
																	checked={values.category === "Inverter+Battery Combo"} type="radio" id="inverterCombo" onChange={handleChange} onBlur={handleBlur} value={"Inverter+Battery Combo"} name="category"
																/>
																<span className="text-[14px] inline-block">Battery+Inverter </span>
															</div>
														</label>

														{/* <div className="mx-[5px]">
															<input checked={values.category === "Inverter+Battery Combo"} type="radio" id="inverterCombo" onChange={handleChange} onBlur={handleBlur} value={"Inverter+Battery Combo"} name="category" />
															<label htmlFor="inverterCombo" className="ml-2">Battery+inverter</label>
														</div> */}

													</div>
												</div>

												{/* Dropdowns for Inverter Battery */}

												<div className="mb-4 relative">
													<label className="block text-sm font-semibold mb-2 320:mb-[12px]">  Capacity </label>
													{touched.capacity && errors.capacity && <span className="font-medium text-red-600 text-[14px] absolute right-0 top-[0px] 320:left-0 320:top-[15px] 320:text-[12px] " >{errors.capacity}</span>}
													<Select
														suffixIcon={<PiCaretDownBold className="text-[#202020] text-[16px] font-bold" />}
														variant="borderless"
														defaultValue={0}
														className="w-full p-[4px]  border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent] batt-form-select"
														onChange={(val) => { setFieldValue("capacity", val) }}
														name="capacity"
														onBlur={handleBlur}
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
												<div className="mb-4 relative">
													<label className="block text-sm font-semibold mb-2 320:mb-[12px]">  Battery Brand </label>
													{touched.batteryBrand && errors.batteryBrand && <span className="font-medium text-red-600 text-[14px] absolute right-0 top-[0px] 320:left-0 320:top-[15px] 320:text-[12px] " >{errors.batteryBrand}</span>}
													<Select
														suffixIcon={<PiCaretDownBold className="text-[#202020] text-[16px] font-bold" />}
														variant="borderless"
														defaultValue=""
														className="w-full p-[4px]  border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent] batt-form-select"
														onChange={(val) => { setFieldValue("batteryBrand", val) }}
														name="batteryBrand"
														onBlur={handleBlur}
														options={[
															{ value: "", label: "Choose Brand" },
															{ value: "All Brands", label: "All Brands" },
															{ value: "Livguard", label: "Livguard" },
															{ value: "Luminous", label: "Luminous" },
															{ value: "Exide", label: "Exide" },
															{ value: "PowerZONE", label: "PowerZONE" },
															{ value: "SF Sonic", label: "SF Sonic" },
														]}
													/>
												</div>
												<div className="flex 320:flex-wrap 320:justify-start 320:gap-0 560:justify-between gap-[20px]  inverter-btry-little">
													<div className="mb-4 560:w-[45%] 320:w-full">
														<label className="block text-sm font-semibold mb-2">State</label>
														<Select
															suffixIcon={<PiCaretDownBold className="text-[#202020] text-[16px] font-bold" />}
															variant="borderless"
															defaultValue=""
															className="w-full p-[4px]  border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent] batt-form-select"
															onChange={(val) => { setFieldValue("state", val) }}
															name="state"
															onBlur={handleBlur}
															options={[{ value: "", label: "Choose a State" }, ...indianStatesAndCities?.map((item, index) => ({ value: item?.state, label: item?.state }))]}
														/>
													</div>
													<div className="mb-4 560:w-[45%] 320:w-full">
														<label className="block text-sm font-semibold mb-2">  City </label>
														<Select
															suffixIcon={<PiCaretDownBold className="text-[#202020] text-[16px] font-bold" />}
															variant="borderless"
															defaultValue=""
															className="w-full p-[4px]  border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent] batt-form-select"
															onChange={(val) => { setFieldValue("city", val) }}
															name="city"
															onBlur={handleBlur}
															options={ values.state ? [{ value: "", label: "Choose a City" }, ...indianStatesAndCities?.find(obj=>obj.state === values.state)?.cities?.map((item, index) => ({ value: item, label: item }))]:[{ value: "", label: "Choose a City" }]}
														/>
													</div>
												</div>
												<button
													className="btn-special-spread 320:p-[8px] 320:mt-[10px] 1440:p-[10px] 1749:p-[12px] w-[46%] 1440:text-[16px] 1749:text-[18px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]
              ">
													Find Battery
												</button>
											</form>
										)}
									</Formik>
								</div>
							)}
						</div>
					</div>

				</div>
			</div>

			{/* icon set */}

			<div className=" banner-after-elem-wr 320:pb-[0px] 980:pb-[40px] 320:py-[40px] bg-[#000] text-[#fff]">
				<Swiper
					key={'banner-black-swiper-320'}
					id={'banner-black-swiper-320'}
					className=" 320:block 980:hidden 320:w-full 1200:w-[73%] banner-swiper"
					spaceBetween={0}
					slidesPerView={window.innerWidth >= 560 ? 2 : 1}
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
					<SwiperSlide>
						<li className="banner-after-elem 320:w-full 560:w-full pb-[40px]">
							<figure className=" w-[140px] h-[58px] ">
								<img src="/images/freeShipping.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
							</figure>
							<figcaption className="font-semibold font-['Oswald'] text-[18px] text-center w-[140px] 320:mt-[10px] ">FREE SHIPPING</figcaption>
						</li>
					</SwiperSlide>
					<SwiperSlide>
						<li className="banner-after-elem 320:w-full 560:w-full pb-[40px]">
							<figure className=" w-[140px] h-[58px] mb-[0px] ml-[auto] mr-[auto] mt-[0]">
								<img src="/images/freeInstallation.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
							</figure>
							<figcaption className="font-semibold font-['Oswald'] text-[18px] text-center w-[140px] 320:mt-[10px]">FREE INSTALLATION</figcaption>
						</li>
					</SwiperSlide>
					<SwiperSlide>
						<li className="banner-after-elem 320:w-full 560:w-full pb-[40px]">
							<figure className=" w-[140px] h-[58px] mb-[0px] ml-[auto] mr-[auto] mt-[0]">
								<img src="/images/bestPrices.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
							</figure>
							<figcaption className="font-semibold font-['Oswald'] text-[18px] text-center w-[140px] 320:mt-[10px]">BEST PRICES</figcaption>
						</li>
					</SwiperSlide>
					<SwiperSlide>
						<li className="banner-after-elem 320:w-full 560:w-full pb-[40px]">
							<figure className=" w-[140px] h-[58px] mb-[0px] ml-[auto] mr-[auto] mt-[0]">
								<img src="/images/cod.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
							</figure>
							<figcaption className="font-semibold font-['Oswald'] text-[18px] text-center w-[140px] 320:mt-[10px]">CASH ON DELIVERY</figcaption>
						</li>
					</SwiperSlide>
					<SwiperSlide>
						<li className="320:w-full 560:w-full pb-[40px]">
							<figure className=" w-[140px] h-[58px] mb-[0px] ml-[auto] mr-[auto] mt-[0]">
								<img src="/images/payOnline.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
							</figure>
							<figcaption className="font-semibold font-['Oswald'] text-[18px] text-center w-[140px] 320:mx-auto 320:mt-[10px] 320:text-[18px] 560:text-[18px]">PAY BY ONLINE</figcaption>
						</li>
					</SwiperSlide>
				</Swiper>
				<ul className=" banner-after-elem-cont 320:hidden 980:flex 320:flex-wrap justify-center 1368:gap-[110px] 1200:gap-[0px] 320:gap-[50px] 1024:gap-0">
					<li className="banner-after-elem before-white 320:w-full 560:w-[40%] 768:w-[25%] 1024:w-[20%] 1368:border-none 1024:border-r-[1px] 1024:border-r-[rgba(255,255,255,0.21)] 1368:w-fit ">
						<figure className=" w-[140px] h-[58px] ">
							<img src="/images/freeShipping.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
						</figure>
						<figcaption className="font-semibold font-['Oswald'] text-[18px] text-center w-[140px] 320:mt-[10px] ">FREE SHIPPING</figcaption>
					</li>
					<li className="banner-after-elem before-white 320:w-full 560:w-[40%] 768:w-[25%] 1024:w-[20%] 1368:border-none 1024:border-r-[1px] 1024:border-r-[rgba(255,255,255,0.21)] 1368:w-fit">
						<figure className=" w-[140px] h-[58px] mb-[0px] ml-[auto] mr-[auto] mt-[0]">
							<img src="/images/freeInstallation.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
						</figure>
						<figcaption className="font-semibold font-['Oswald'] text-[18px] text-center w-[140px] 320:mt-[10px]">FREE INSTALLATION</figcaption>
					</li>
					<li className="banner-after-elem before-white 320:w-full 560:w-[40%] 768:w-[25%] 1024:w-[20%] 1368:border-none 1024:border-r-[1px] 1024:border-r-[rgba(255,255,255,0.21)] 1368:w-fit">
						<figure className=" w-[140px] h-[58px] mb-[0px] ml-[auto] mr-[auto] mt-[0]">
							<img src="/images/bestPrices.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
						</figure>
						<figcaption className="font-semibold font-['Oswald'] text-[18px] text-center w-[140px] 320:mt-[10px]">BEST PRICES</figcaption>
					</li>
					<li className="banner-after-elem before-white 320:w-full 560:w-[40%] 768:w-[25%] 1024:w-[20%] 1368:border-none 1024:border-r-[1px] 1024:border-r-[rgba(255,255,255,0.21)] 1368:w-fit">
						<figure className=" w-[140px] h-[58px] mb-[0px] ml-[auto] mr-[auto] mt-[0]">
							<img src="/images/cod.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
						</figure>
						<figcaption className="font-semibold font-['Oswald'] text-[18px] text-center w-[140px] 320:mt-[10px]">CASH ON DELIVERY</figcaption>
					</li>
					<li className="320:w-full 560:w-[40%] 768:w-[25%] 1024:w-[20%] 1368:w-fit">
						<figure className=" w-[140px] h-[58px] mb-[0px] ml-[auto] mr-[auto] mt-[0]">
							<img src="/images/payOnline.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
						</figure>
						<figcaption className="font-semibold font-['Oswald'] text-[18px] text-center w-[140px] 320:mx-auto 320:mt-[10px] 320:text-[18px] 560:text-[18px]">PAY BY ONLINE</figcaption>
					</li>
				</ul>
			</div>

		</section>
	)
}

export default Banner;