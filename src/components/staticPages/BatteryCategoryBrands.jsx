import React, { useEffect, useState } from 'react'
import Header from '../common/Header';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ConstantService from '../../services/constantsService';
import { batteryIndoreDataService } from '../../services/dataService';
import log from '../../utils/utilityFunctions';
import Footer from '../common/Footer';
import EnquirySection from '../common/EnquirySection';
import HeaderNew from '../common/HeaderNew';

const BatteryCategoryBrands = () => {
	const { batteryCategory } = useParams();
	const [carBrandName, setCarBrandName] = useState("")
	const [carBrandLogo, setCarBrandLogo] = useState("")
	const [vehicleBrands, setVehicleBrands] = useState([])
	const [batteryType, setBatteryType] = useState('car');
	const [carBrands, setCarBrands] = useState([])
	const [batteryBrands, setBatteryBrands] = useState([])
	const [carModels, setCarModels] = useState()
	const [selectedCarBrand, setSelectedCarBrand] = useState("")
	const [selectedCarModel, setSelectedCarModel] = useState("")
	const [selectedBatteryBrand, setSelectedBatteryBrand] = useState("")
	const [selectedState, setSelectedState] = useState('');
	const [selectedCity, setSelectedCity] = useState("");
	const [inverterFormQuery, setInverterFormQuery] = useState({ category: "Inverter Batteries", brand: "All Brands" });
	const navigate = useNavigate()
	const [carBrandErr, setCarBrandErr] = useState("")
	const [carModelErr, setCarModelErr] = useState("")
	const [capacityErr, setCapactityErr] = useState("")


	const indianStatesAndCities = ConstantService.indianStatesAndCities;

	const handleStateChange = (event) => {
		setSelectedState(event.target.value);
	};

	const selectedCities = indianStatesAndCities.find(state => state.state === selectedState)?.cities || [];

	const handleBatteryChange = (type) => {
		setBatteryType(type);
	};

	async function fetchCarBrands() {
		const response = await batteryIndoreDataService.getAllCarBrands();
		setCarBrands(response?.data)

	}
	
	async function fetchBatteryBrands() {
		const response = await batteryIndoreDataService.getAllCarBatteryBrands();
		setBatteryBrands(response?.data?.data?.filter(item => Object.keys(item)?.length > 0))
	}

	async function findCarBattery(e) {
		e.preventDefault();
		if (batteryType === 'car') {
			if (selectedCarBrand === "") {
				setCarBrandErr("Please Select Car Manufacturer")
			} else if (selectedCarModel === "") {
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

	log(batteryCategory)
	async function getVehicleTypeBrands() {
		try {
			const response = await axios.get(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/battery-type/${batteryCategory}`);
			if (response.status === 200) {
				log('GETTING BRANDS', response);
				setVehicleBrands(response.data?.products);
			}
		} catch (error) {
			log(error)
		}
	}


	function handleNavigation(brand) {
		try {
			if (batteryCategory === 'inverter-batteries') {
				navigate(`/categories/${batteryCategory}/${encodeURIComponent(brand?.postData?.brandName)}`)
			}
			else if (batteryCategory === 'inverter-plus-home-ups-batteries') {
				navigate(`/categories/${batteryCategory}/${encodeURIComponent(brand?.postData?.brandName)}`)
			}
			else if (batteryCategory === 'heavy-engine-batteries') {
				navigate(`/categories/${batteryCategory}/${encodeURIComponent(brand?.postData?.brandName)}`)
			}
			else if (batteryCategory === 'vrla-smf-batteries') {
				navigate(`/categories/${batteryCategory}/${encodeURIComponent(brand?.postData?.brandName)}`)
			}
			else if (batteryCategory === 'inverter-plus-battery-combo') {
				navigate(`/categories/${batteryCategory}/${encodeURIComponent(brand?.postData?.brandName)}`)
			}
			else {
				navigate(`/categories/${batteryCategory}/models/${encodeURIComponent(brand?.postData?.brandName)}`, { state: brand?.postData })
			}
		} catch (error) {
			log(error);
		}
	}


	useEffect(() => {
		getVehicleTypeBrands()
	}, [batteryCategory])

	return (
		<>
			<HeaderNew />
			<section className="category-brand-pg bg-[#F7F7F7] py-[40px] pb-[10%]">
				<div className="center-wr">
					<div className="flex p-[8px] bg-[#F5F5F5] gap-[7px]">
						<span><Link className='hover:text-[#ff7637]' to="/" >Home</Link></span> &gt; <span className="text-[#FF7637] font-[600]"> {batteryCategory?.split("-")?.map(item => item.substring(0, 1)?.toLocaleUpperCase() + item.slice(1))?.join(" ")}</span> <span className="text-[#3BBA11] font-[600]">{carBrandName}</span>
					</div>
					<div className="flex battery-pg-cont">
						{/* sideform */}
						<div style={{ boxShadow: "1px 1px 3px rgba(0,0,0,.2)" }} className="category-side-form-wr w-[27%] h-[600px] bg-[#fff] px-[20px] sticky mt-[20px] top-[10px]">
							<div className=" container mx-auto mt-[5%] w-[100%] ">
								<div className=" text-[#000] p-[10px] ">
									<div className="mb-4">
										<h3 className="pb-[10px] pt-[10px] text-[22px] font-[800]">FIND YOUR BATTERY QUICKLY</h3>
										<div className="flex h-[40px]">
											<button
												className={`p-[7px] w-[45%] border-[1px] solid border-[rgba(0,0,0,0.2)] text-[14px] font-[600] mr-4  focus:outline-none ${batteryType === 'car' ? 'bg-[#ff7637] text-white form-btn-active' : 'bg-[transparent]'
													}`}
												onClick={() => handleBatteryChange('car')}
											>
												CAR BATTERY
											</button>
											<button
												className={`p-[5px] w-[56%] border-[1px] solid border-[rgba(0,0,0,0.2)] text-[14px] font-[600] focus:outline-none ${batteryType === 'inverter' ? 'bg-[#ff7637] text-white form-btn-active' : 'bg-[transparent]'
													}`}
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
													<label className="block text-sm font-semibold mb-2">  Car Brand </label>
													<span className="text-[red] mt-[-5px] pb-[5px]" style={{ display: carBrandErr ? "block" : "none" }}>{carBrandErr}</span>
													<select
														value={selectedCarBrand?.postData?.brandName}
														onChange={(e) => setSelectedCarBrand(carBrands?.find(item => item?.postData?.brandName === e.target.value))}
														required
														className="w-full  rounded-[0] p-[10px] border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent]"
													>
														<option value="Select Manufacturer">Select Manufacturer</option>
														{carBrands?.map((item, index) => (
															<option key={index} value={item?.postData?.brandName}>{item?.postData?.brandName}</option>
														))}
													</select>
												</div>
												<div className="mb-4">
													<label className="block text-sm font-semibold mb-2">Car Model</label>
													<span className="text-[red] block mt-[-5px] pb-[5px]" style={{ display: carModelErr ? "block" : "none" }}>{carModelErr}</span>
													<select
														onChange={(e) => setSelectedCarModel(selectedCarBrand?.postData?.linkedEquipments.find(item => item.value?.split("__")[1] === e.target.value))}
														required
														className="w-full  rounded-[0] p-[10px] border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent]"
													>
														<option value="Select Manufacturer">Select Model</option>
														{selectedCarBrand && selectedCarBrand?.postData?.linkedEquipments?.map((item, index) => (
															<option key={index} value={item?.value?.split("__")[1]}>{item?.value?.split("__")[0]}</option>
														))}
													</select>
												</div>
												<div className="mb-4">
													<label className="block text-sm font-semibold mb-2">Battery Brand</label>
													<select
														onChange={(e) => setSelectedBatteryBrand(e.target.value)}
														value={selectedBatteryBrand}
														className="w-full  rounded-[0] p-[10px] border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent]">
														<option value="">Select Battery Brand</option>
														<option value="All Brands">All Brands</option>
														{batteryBrands?.map((item, index) => (
															<option key={index} value={item?.brandName}>{item?.brandName} </option>
														))}
													</select>
												</div>
												<div className="flex justify-between gap-[20px]">
													<div className="mb-4 w-[50%]">
														<label className="block text-sm font-semibold mb-2">State</label>
														<select
															onChange={handleStateChange}
															value={selectedState}
															className="w-full  rounded-[0] p-[10px] border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent]"
														>
															<option value="">Select State</option>
															{indianStatesAndCities?.map((item, index) => (
																<option key={index} value={item?.state}>{item?.state}</option>
															))}
														</select>
													</div>
													<div className="mb-4 w-[50%]">
														<label className="block text-sm font-semibold mb-2">City </label>
														<select
															onChange={(e) => setSelectedCity(e.target.value)}
															className="w-full  rounded-[0] p-[10px] border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent]">
															<option value="">Select City</option>
															{selectedCities.map((city, index) => (
																<option key={index} value={city}>{city}</option>
															))}
														</select>
													</div>
												</div>
												<button className="btn-special-spread p-[15px] w-[50%] text-[14px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]">
													Find Battery
												</button>
											</form>
										</div>
									)}

									{/* Inverter Battery Form */}
									{batteryType === 'inverter' && (
										<div>
											<form onSubmit={findCarBattery}>
												<div className="mb-4 text-[#4D4D4D]">
													<label className="block text-sm font-semibold mb-2">I am looking for</label>
													<div className="flex radioBtn-wr">
														<div className="mx-[5px] ">
															<input checked type="radio" id="inverterBattery" onChange={(e) => { setInverterFormQuery(prev => ({ ...prev, category: e.target.value })) }} value={"Inverter Batteries"} name="inverterBatteryType" />
															<label htmlFor="inverterBattery" className="ml-2">Battery</label>
														</div>
														<div className="mx-[5px] ">
															<input type="radio" id="inverterCombo" onChange={(e) => { setInverterFormQuery(prev => ({ ...prev, category: e.target.value })) }} value={"Inverter+Battery Combo"} name="inverterBatteryType" />
															<label htmlFor="inverterCombo" className="ml-2">Battery+inverter</label>
														</div>

													</div>
												</div>

												{/* Dropdowns for Inverter Battery */}

												<div className="mb-4 text-[#4D4D4D]">
													<label className="block text-sm font-semibold mb-2">  Capacity </label>
													<span className="text-[red] block mt-[-5px] pb-[5px]" style={{ display: capacityErr ? "block" : "none" }}>{capacityErr}</span>
													<select required onChange={(e) => { setInverterFormQuery(prev => ({ ...prev, capacity: e.target.value })) }} className="w-full  rounded-[0] p-[10px] border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent]">
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
													<select required onChange={(e) => { setInverterFormQuery(prev => ({ ...prev, brand: e.target.value })) }} className="w-full  rounded-[0] p-[10px] border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent]">
														<option value="All Brands">All Brands</option>
														<option value={"Amaron"}>Amaron</option>
														<option value={"Exide"}>Exide</option>
														<option value={"Luminous"}>Luminous</option>
														<option value={"PowerZONE"}>PowerZONE</option>
														<option value={"SF"}>SF Sonic</option> 
														<option value={"Okaya"}>Okaya</option>
													</select>
												</div>
												<div className="flex justify-between gap-[20px]">

													<div className="mb-4 w-[50%]">
														<label className="block text-sm font-semibold mb-2">State</label>
														<select

															onChange={handleStateChange}
															value={selectedState}
															className="w-full  rounded-[0] p-[10px] border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent]">
															<option value="">Select State</option>
															{indianStatesAndCities?.map((item, index) => (
																<option key={index} value={item?.state}>{item?.state}</option>
															))}
														</select>
													</div>
													<div className="mb-4 w-[50%]">
														<label className="block text-sm font-semibold mb-2">City</label>
														<select
															onChange={(e) => setSelectedCity(e.target.value)}
															className="w-full  rounded-[0] p-[10px] border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent]">
															<option value="">Select City</option>
															{selectedCities.map((city, index) => (
																<option key={index} value={city}>{city}</option>
															))}
														</select>
													</div>
												</div>
												<button
													className="btn-special-spread p-[15px] w-[46%] text-[14px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]"
												>
													Find Battery
												</button>
											</form>
										</div>
									)}
								</div>
							</div>
						</div>
						<div className="w-[69%] brands-card-category-wr">
							<div className="w-[100%] mx-[30px]">
								<div style={{ borderRadius: "0 60px 60px 0" }} className="bg-[#fff] flex items-center justify-between py-[15px] mb-[20px] border-[#FF7637] border-[1px]">
									<div className='text-center w-[86%] category-name-strip'>
										<h3 className='text-[22px] uppercase'>{batteryCategory?.split("-")?.map(item => item.substring(0, 1)?.toLocaleUpperCase() + item.slice(1))?.join(" ")}</h3>
										<h4 className='text-[15px] font-[200] font-[Sora]'>Indore Battery offering {batteryCategory?.split("-")?.map(item => item.substring(0, 1)?.toLocaleUpperCase() + item.slice(1))?.join(" ")}  at Best Price</h4>
									</div>
									<figure className='px-[15px] py-[10px] rounded-[50%] border-[1px] border-[rgba(0,0,0,0.15)] mr-[11px] h-[89px] category-logo-cont'>
										<img src="/images/bikeCategoryLogo.png" alt="bike category logo" />
									</figure>
								</div>
								<div>
									<ul className="my-[10px] flex items-center flex-wrap gap-[25px]">
										{vehicleBrands?.map((brand, index) => (
											<li onClick={() => { handleNavigation(brand) }} key={index} className="brand-cards-wr bg-[#fff] hover:shadow-lg flex flex-col transition-all cursor-pointer w-[200px] h-[170px] flex items-center justify-center border-[1px] border-solid border-[rgba(0,0,0,0.1)] relative">
												<figure>
													<img src={`https://batterybackend.react.stagingwebsite.co.in/images/${brand?.postData?.brandLogo}`} className='w-[95px] p-[10px]' alt="" />
												</figure>
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

export default BatteryCategoryBrands;