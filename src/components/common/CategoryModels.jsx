import React, { useEffect, useState } from 'react'
import Header from './Header';
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { batteryIndoreDataService } from '../../services/dataService';
import ConstantService from '../../services/constantsService';
import Footer from './Footer';
import EnquirySection from './EnquirySection';
import HeaderNew from './HeaderNew';
import { Formik } from 'formik';
import { PiCaretDownBold } from 'react-icons/pi';
import { Select } from 'antd';
import Meta from './Meta';
import log from '../../utils/utilityFunctions';

const CategoryModels = () => {
	const { state } = useLocation();
	const navigate = useNavigate();
	const { brandName, batteryCategory } = useParams();
	const [batteryType, setBatteryType] = useState('car');
	const [carBrands, setCarBrands] = useState([]);
	const [batteryBrands, setBatteryBrands] = useState([])
	const [carBrandName, setCarBrandName] = useState("")
	const [carBrandLogo, setCarBrandLogo] = useState("")
	const [carModels, setCarModels] = useState([])
	const [selectedCarBrand, setSelectedCarBrand] = useState("")
	const [selectedCarModel, setSelectedCarModel] = useState("")
	const [selectedBatteryBrand, setSelectedBatteryBrand] = useState("")
	const [selectedState, setSelectedState] = useState('');
	const [selectedCity, setSelectedCity] = useState("");
	const [inverterFormQuery, setInverterFormQuery] = useState({ category: "Inverter Batteries", brand: "All Brands" });
	const [carBrandErr, setCarBrandErr] = useState("")
	const [carModelErr, setCarModelErr] = useState("")
	const [capacityErr, setCapactityErr] = useState("")
	const [gettingPassedData, setGettingPassedData] = useState("")
	const indianStatesAndCities = ConstantService.indianStatesAndCities

	const handleBatteryChange = (type) => {
		setBatteryType(type);
	};


	const handleStateChange = (event) => {
		setSelectedState(event.target.value);
	};

	// Filter cities based on selected state
	const selectedCities = indianStatesAndCities.find(state => state.state === selectedState)?.cities || [];

	async function fetchCarBrands() {
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
		setGettingPassedData(state)
	}, [carModels?.length, selectedCarBrand])

	return (
		<>
			<Meta title={state.brandName + " " + batteryCategory?.split("-")?.map(item => item.substring(0, 1)?.toLocaleUpperCase() + item.slice(1))?.join(" ")} />
			<HeaderNew />
			<section className="category-brand-pg bg-[#F7F7F7] pt-[65px] pb-[65px] 1200:pb-[200px]">
				<div className="center-wr">
					<div className="flex mb-[35px] gap-[7px] items-center">
						<span className='leading-[20px] font-[600] 320:text-[14px] 1200:text-[16px]'><Link to={"/"} className='hover:text-[#ff7637]'>Home</Link></span>
						<span className="inline-block py-[1px] ">
							<img src="/images/bar.png" className="" alt="" />
						</span>
						<span onClick={() => { navigate(`/categories/${batteryCategory}`) }} className='hover:text-[#ff7637] cursor-pointer leading-[20px] font-[600] 320:text-[14px] 1200:text-[16px]'>
							{batteryCategory?.split("-")?.map(item => item.substring(0, 1)?.toLocaleUpperCase() + item.slice(1))?.join(" ")}
						</span>
						<span className="inline-block py-[1px] ">
							<img src="/images/bar.png" className="" alt="" />
						</span>
						<span className="text-[#ff7637] font-[600] leading-[20px] 320:text-[14px] 1200:text-[16px]">{state.brandName}</span>
					</div>
					<div className="flex battery-pg-cont flex-wrap-reverse">
						{/* sideform */}
						<div className="320:w-full 1200:w-[31%] ">
							<div className="320:mt-[0px] 1200:mt-[0%] bg-white">
								<div className=" text-[#202020] p-[24px] 1200:w-full 768:mx-auto 768:w-[75%] 980:w-[60%]">
									<div className="mb-4">
										<h3 className="pb-[10px] pt-[10px] text-[22px] font-[800]">FIND YOUR BATTERY QUICKLY</h3>
										<div className="flex h-[40px]">
											<button className={`p-[7px] w-[45%] border-[1px] solid border-[rgba(0,0,0,0.2)] 650:text-[14px] 1200:text-[16px] 320:text-[12px] font-[600] mr-4 focus:outline-none ${batteryType === 'car' ? 'bg-[#ff7637] text-white form-btn-active' : 'bg-[transparent]'}`}
												onClick={() => handleBatteryChange('car')}
											>
												Car Battery
											</button>
											<button className={`p-[5px] w-[56%] border-[1px] solid border-[rgba(0,0,0,0.2)] 650:text-[14px] 1200:text-[16px] 320:text-[12px] font-[600] focus:outline-none ${batteryType === 'inverter' ? 'bg-[#ff7637] text-white form-btn-active' : 'bg-[transparent]'}`}
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
													const errors = {};
													if (!values.carBrand) errors.carBrand = 'Please choose a car brand';
													if (!values.carModel) errors.carModel = 'Please choose a car model';
													if (!values.batteryBrand) errors.batteryBrand = 'Please choose a battery brand';
													return errors;
												}}
												onSubmit={(values, { setSubmitting, resetForm }) => {
													findCarBattery(values);
													setSubmitting(false);
													resetForm(true)
												}}
											>
												{({ values, errors, touched, dirty, handleChange, handleBlur, handleReset, setFieldValue, handleSubmit }) => (
													<form onSubmit={handleSubmit}>
														<div className="mb-4 relative">
															<label className="block text-sm font-semibold mb-2 320:mb-[12px] relative">{'Car Brand'}</label>
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
															<label className="block text-sm font-semibold mb-2 320:mb-[12px]">  Car Model</label>
															{touched.carModel && errors.carModel && <span className="font-medium text-red-600 text-[14px] absolute right-0 top-[0px] 320:left-0 320:top-[15px] 320:text-[12px]" >{errors.carModel}</span>}
															<Select
																suffixIcon={<PiCaretDownBold className="text-[#202020] text-[16px] font-bold" />}
																variant="borderless"
																onBlur={handleBlur}
																name="carModel"
																defaultValue=""
																placeholder="Choose a Model"
																value={values.carModel}
																className="w-full p-[4px]  border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent] batt-form-select"
																onChange={(val) => { setFieldValue("carModel", val) }}
																options={(values.carBrand && carBrands?.filter(item => item?.postData?.brandName === values.carBrand)[0]?.postData?.linkedEquipments) ? [...carBrands?.filter(item => item?.postData?.brandName === values.carBrand)[0]?.postData?.linkedEquipments?.map((item, index) => ({ value: item?.value?.split("__")[1], label: item?.value?.split("__")[0] }))] : [{ value: "", label: "Choose a Brand" }]}
															/>
														</div>
														<div className="mb-4 relative">
															<label className="block text-sm font-semibold mb-2 320:mb-[12px]"> Battery Brand </label>
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
																<label className="block text-sm font-semibold mb-2 320:mb-[12px]">State</label>
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
																<label className="block text-sm font-semibold mb-2 320:mb-[12px]">City</label>
																<Select
																	suffixIcon={<PiCaretDownBold className="text-[#202020] text-[16px] font-bold" />}
																	variant="borderless"
																	defaultValue=""
																	className="w-full p-[4px]  border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent] batt-form-select"
																	onChange={(val) => { setFieldValue("city", val) }}
																	onBlur={handleBlur}
																	name="city"
																	options={[{ value: "", label: "Choose a City" }, ...selectedCities?.map((item, index) => ({ value: item, label: item }))]}
																/>
															</div>
														</div>
														<button
															type="submit"
															className="btn-special-spread 320:p-[8px] 320:mt-[10px] 1200:p-[7px] 1440:p-[10px] 1749:p-[10px] w-[46%] 1440:text-[16px] 1749:text-[16px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]">
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
													resetForm(true)
												}}
											>
												{({ values, dirty, touched, handleBlur, handleChange, handleReset, handleSubmit, errors, setFieldError, setFieldValue }) => (

													<form onSubmit={handleSubmit}>
														<div className="mb-4 inverter-btry-radio">
															<label className="block text-sm font-semibold mb-2">I am looking for</label>
															<div className="flex">

																<label htmlFor="inverterBattery" className="battery-price-picker flex justify-between px-[15px] 320:px-0 320:w-full 1368:w-fit 1368:px-[15px]">
																	<div className="flex items-center gap-[10px]">
																		<input
																			checked={values.category === "Inverter Batteries"} type="radio" id="inverterBattery" onChange={handleChange} onBlur={handleBlur} value={"Inverter Batteries"} name="category"
																		/>
																		<span className="text-[14px]">Inverter </span>
																	</div>
																</label>

																<label htmlFor="inverterCombo" className="battery-price-picker flex justify-between px-[15px] 320:px-0 320:w-full 1368:w-fit 1368:px-[15px]">
																	<div className="flex items-center gap-[10px]">
																		<input
																			checked={values.category === "Inverter+Battery Combo"} type="radio" id="inverterCombo" onChange={handleChange} onBlur={handleBlur} value={"Inverter+Battery Combo"} name="category"
																		/>
																		<span className="text-[14px]">Battery+Inverter </span>
																	</div>
																</label>

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
																	options={[{ value: "", label: "Choose a City" }, ...selectedCities?.map((item, index) => ({ value: item, label: item }))]}
																/>
															</div>
														</div>
														<button
															className="btn-special-spread 320:p-[8px] 320:mt-[10px] 1440:p-[10px] 1749:p-[10px] w-[46%] 1440:text-[16px] 1749:text-[16px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]">
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


						<div className="320:w-full 1200:w-[69%] brands-card-category-wr">
							<div className="w-[100%] mx-[30px]">

								<div style={{ borderRadius: "0 60px 60px 0" }} className="1200:bg-[#fff] 320:bg-transparent 320:border-none 1200:border-solid flex items-center justify-between py-[15px] mb-[20px] 1200:border-[#FF7637] 1200:border-[1px]">
									<div className='text-center w-[86%] category-name-strip 320:mx-auto'>
										<h3 className='text-[24px] font-[700] leading-[35.5px] uppercase 320:text-center'>{state.brandName + " " + batteryCategory?.split("-")?.map(item => item.substring(0, 1)?.toLocaleUpperCase() + item.slice(1))?.join(" ")}</h3>
										<h4 className='320:text-[14px] 1200:text-[16px] font-[200] 1200:leading-[30px] text-[#202020] font-[Sora] 320:leading-[20px] 320:font-normal 320:mt-[10px] 320:text-center'>Indore Battery offering {batteryCategory?.split("-")?.map(item => item.substring(0, 1)?.toLocaleUpperCase() + item.slice(1))?.join(" ")}  at Best Price</h4>
									</div>
									<figure className='flex items-center justify-center w-[89px] rounded-[50%] border-[1px] border-[rgba(0,0,0,0.15)] mr-[11px] h-[89px] category-logo-cont'>
										<img src={`${import.meta.env.VITE_BACKEND_URL}/images/${state?.brandLogo}`} className='w-[82%]' alt="bike category logo" />
									</figure>
								</div>

								<div>
									<ul className="my-[10px] flex flex-wrap items-start 320:justify-center 1200:justify-start">
										{state?.linkedEquipments?.map((item, index) => (
											<li onClick={() => { navigate(`/categories/${batteryCategory}/filter/${encodeURIComponent(state.brandName)}/${encodeURIComponent(item?.value?.split('__')[0])}`, { state: { ...item, brand: "All Brands", gettingPassedData } }) }} key={item?.id} className="my-[8px] bg-[#fff] mx-[5px] 320:py-[7px] 1200:py-[12px] font-[600] px-[10px] pl-[20px]  border-[1px] border-l-[8px] border-[rgba(0,0,0,0.15)] 1200:border-l-[rgba(0,0,0,0.09)] 320:border-l-[#ff7637] hover:border-[#FF7637] transition-all cursor-pointer 650:w-[45%] 320:w-full car-model-name-card" >
												<span className='320:text-[14px] 1200:text-[16px] text-[#202020]'>{item?.value?.split("__")[0]}</span>
											</li>
										))}
									</ul>

								</div>
							</div>
						</div>


					</div>
				</div>
			</section>

			<EnquirySection />
			<Footer />
		</>
	)
}

export default CategoryModels