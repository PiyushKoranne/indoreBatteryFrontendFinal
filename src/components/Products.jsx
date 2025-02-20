import React, { useState, useEffect, useContext } from "react";
import Header from "./common/Header";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "./common/Footer";
import EnquirySection from "./common/EnquirySection";
import toast, { Toaster } from "react-hot-toast";
import { batteryIndoreDataService } from "../services/dataService";
import { LoginContext } from "../App";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import { ColorRing } from "react-loader-spinner";
import log from "../utils/utilityFunctions";
import BatteryCard from "./common/BatteryCard";
import HeaderNew from "./common/HeaderNew";
import { Drawer } from "antd";
import { RxCross2 } from "react-icons/rx";
import { FaFilter } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { MdFilterList } from "react-icons/md";
import Meta from "./common/Meta";

const initialFilter = {
	brand: [],
	subbrand: [],
	capacity: [],
	batteryType: [],
	warranty: [],
	priceRange: { low: 1000, high: 75000 }
}

function Products() {

	// states and constants 
	const { loginStatus } = useContext(LoginContext);
	const navigate = useNavigate();
	const { state, pathname } = useLocation();
	const [wishlist, setWishlist] = useState([]);
	const [wishlistTrigger, setWishlistTrigger] = useState(false);
	const [allBatteries, setAllBatteries] = useState([]);
	const [filteredBatteries, setFilteredBatteries] = useState([]);
	const [loading, setLoading] = useState(true)
	const [noData, setNoData] = useState(true)
	const [brandModelName, setBrandModelName] = useState("")
	const [filteredPage, setFilteredPage] = useState(false)
	const [openFilterSidebar, setOpenFilterSidebar] = useState(false)
	const [open, setOpen] = useState(false);

	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};


	const [filters, setFilters] = useState(initialFilter)

	function fetchUrlData() {
		let url;
		url = window.location.href
		if (url.includes("filter")) {
			setFilteredPage(true)
			const parts = url.split("/")
			const lastPart = parts.pop();
			const decodedString = decodeURIComponent(lastPart);
			log("OUR URL", decodedString)
			setBrandModelName(decodedString)
		}
	}

	useEffect(() => {
		fetchUrlData()
	}, [])

	const { brandName, batteryCategory } = useParams();
	const typeArr = [
		{ name: "Flat Plate Battery" },
		{ name: "Tubular Battery" },
		{ name: "Short Tubular" }
	]

	const PRINT_LOGS = true;

	const warrantyArr = [
		{ name: "48 Months (36 Months Full Replacement + 12 Months Pro Rata)" },
		{ name: "24 Months (18 Months Full Replacement + 6 Months Pro Rata)" },
		{ name: "36 Months (24 Months Full Replacement + 12 Months Pro Rata)" },
		{ name: "54 Months (36 Months Full Replacement + 18 Months Pro Rata)" },
	]

	const warrantyArray = warrantyArr.map(item =>
		<label className="mt-[10px] flex items-start" >
			<input className="border-[#7a7a7a] mt-[2px]" name={`${item.name}`} type="checkbox" />
			<span className="px-[10px] text-[15px]">{item.name}</span>
		</label>
	);

	const typeArray = typeArr.map(item =>
		<label className="mt-[10px] flex items-start" >
			<input className="border-[#7a7a7a] mt-[2px]" name={`${item.name}`} type="checkbox" />
			<span className="px-[10px] text-[15px]">{item.name}</span>
		</label>
	);


	// Interaction Functions and Logic

	async function handleAddToWishlist(event, batteryId) {
		try {
			log("adding to wishlist");
			if (!batteryId) return;
			const response = await batteryIndoreDataService.addToWishlist(batteryId)
			if (response.status === 200) {
				event.target.classList.toggle("animate");
				event.target.classList.toggle("active");
				toast.success("Added to wishlist");
				setWishlistTrigger(prev => !prev);
			}
		} catch (error) {
			log("Error: While adding item to wishlist.", error);
		}
	}

	async function handleRemoveFromWishlist(e, productId) {
		try {
			const response = await batteryIndoreDataService.removeFromWishlist(productId);
			if (response.status === 200) {
				setWishlistTrigger(prev => !prev);
			}
		} catch (error) {
			log("Error: While removing item from wishlist.", error);
		}
	}

	function handleBrandFiltering(e) {
		try {
			const { value, checked } = e.target;
			if (checked) {
				setFilters(prev => ({ ...prev, brand: [...prev.brand, value] }))
			} else {
				setFilters(prev => ({ ...prev, brand: prev.brand.filter(item => item !== value) }))
			}
		} catch (error) {
			log("Error: While filtering by brand.", error);
		}
	}

	function handleSubBrandFiltering(e) {
		try {
			const { value, checked } = e.target;
			if (checked) {
				setFilters(prev => ({ ...prev, subbrand: [...prev.subbrand, value] }))
			} else {
				setFilters(prev => ({ ...prev, subbrand: prev.subbrand.filter(item => item !== value) }))
			}
		} catch (error) {
			log("Error: While filtering by sub-brands.", error);
		}
	}

	function handleCapacityFiltering(e) {
		try {
			const { value, checked } = e.target;
			if (checked) {
				setFilters(prev => ({ ...prev, capacity: [...prev.capacity, value] }));
			} else {
				setFilters(prev => ({ ...prev, capacity: prev.capacity.filter(item => item !== value) }));
			}
		} catch (error) {
			log("Error: While filtering by capacity.", error);
		}
	}

	function handleWarrantyFiltering(e) {
		try {
			const { value, checked } = e.target;
			if (checked) {
				setFilters(prev => ({ ...prev, warranty: [...prev.warranty, value] }))
			} else {
				setFilters(prev => ({ ...prev, warranty: prev.warranty.filter(item => item !== value) }))
			}
		} catch (error) {
			log("Error: While filtering by warranty.", error);
		}
	}

	// Render Logic

	useEffect(() => {
		fetchBatteriesByBrand();
		if (brandName === 'filter' || batteryCategory === 'inverter-batteries' || batteryCategory === 'inverter-plus-battery-combo') {
			setFilters(prev => ({ ...initialFilter, brand: [state?.brand?.toLowerCase() || 'all brands'] }))
		} else {
			setFilters(prev => ({ ...initialFilter, brand: [brandName?.toLowerCase()] }))
		}
	}, [brandName, pathname, batteryCategory])

	
	useEffect(() => {
		filterBatteries()
	}, [filters?.brand, filters?.capacity, filters?.subbrand, filters.priceRange.low, filters.priceRange.high, filters.warranty, filteredBatteries?.length, allBatteries?.length]);

	useEffect(() => {
		loginStatus?.isLoggedIn && fetchWishList();
	}, [wishlistTrigger])

	function filterBatteries() {
		try {
			let finalFilteredOutput = []
			if ((filters.brand?.length > 0 && !filters.brand?.includes("all brands"))) {
				let temp = [];
				filters.brand.forEach(item => {
					temp = [...temp, ...allBatteries.filter(batteryItem => batteryItem?.postData?.brand?.toLowerCase() === item)];
				})
				finalFilteredOutput = temp;
			} else {
				finalFilteredOutput = allBatteries;
			}
			if (filters.subbrand?.length > 0) {
				let temp = [];
				filters.subbrand.forEach(item => {
					temp = [...temp, ...finalFilteredOutput.filter(batteryItem => batteryItem?.postData?.subbrand?.toLowerCase() === item)];
				})
				finalFilteredOutput = temp;
			}
			if (filters.capacity?.length > 0) {
				let temp = [];
				function sleep(ms) {
					return new Promise((res, rej) => {
						setTimeout(() => {
							log("Capacity Exists");
							res();
						}, ms)
					})
				}
				sleep(200);
				filters.capacity.forEach(item => {
					temp = [...temp, ...finalFilteredOutput.filter(batteryItem => batteryItem?.postData?.capacity === item)]
				})
				finalFilteredOutput = temp;
			}
			if (filters.warranty?.length > 0) {
				let temp = [];
				filters.warranty?.forEach(item => {
					temp = [...temp, ...finalFilteredOutput.filter(batteryItem => (batteryItem?.postData?.totalWarranty === item?.split('__')[0] && batteryItem?.postData?.fullReplacementWarranty === item?.split('__')[1] && batteryItem?.postData?.proRataWarranty === item?.split('__')[2]))]
				});
				finalFilteredOutput = temp;
			}
			if (filters.priceRange?.low && filters.priceRange?.high) {
				let temp = [];
				temp = finalFilteredOutput.filter(batteryItem => (parseInt(batteryItem?.postData.mrp) >= filters.priceRange.low && parseInt(batteryItem?.postData.mrp) <= filters.priceRange.high));
				finalFilteredOutput = temp;
			}
			log("Before setting filtered result to state", finalFilteredOutput);
			setFilteredBatteries(finalFilteredOutput);
		} catch (error) {
			log("Error: While filtering batteries.", error);
		}
	}

	async function fetchBatteriesByBrand() {
		if (batteryCategory === 'show-batteries' && brandName && pathname.includes("/show-batteries")) {
			// need to show all batteries of this brand
			const response = await batteryIndoreDataService.getBatteriesByBrand(brandName);
			log("Getting Data herre", response);
			setAllBatteries(response?.data?.data);
			setFilteredBatteries(response?.data?.data);
		} else if (batteryCategory === 'inverter-batteries' && brandName !== 'find') {
			const response = await batteryIndoreDataService.getInverters(brandName);
			setAllBatteries(response?.data?.products);
			setFilteredBatteries(response?.data?.products);
		} else if (batteryCategory === 'inverter-batteries' && brandName === 'find') {
			const response = await batteryIndoreDataService.findInverters(state);
			setAllBatteries(response?.data?.products);
			setFilteredBatteries(response?.data?.products);
		} else if (batteryCategory === 'inverter-plus-home-ups-batteries') {
			const response = await batteryIndoreDataService.getInvertersAndHomeUps(brandName);
			setAllBatteries(response?.data?.products);
			setFilteredBatteries(response?.data?.products);
		} else if (batteryCategory === 'heavy-engine-batteries') {
			const response = await batteryIndoreDataService.getHeavyEngineBatteries(brandName);
			setAllBatteries(response?.data?.products);
			setFilteredBatteries(response?.data?.products);
		} else if (batteryCategory === 'vrla-smf-batteries') {
			const response = await batteryIndoreDataService.getVrlaSmfBatteries(brandName);
			setAllBatteries(response?.data?.products);
			setFilteredBatteries(response?.data?.products);
		} else if (batteryCategory === 'inverter-plus-battery-combo' && brandName === 'find') {
			const response = await batteryIndoreDataService.findInverterAndBatteryCombos(state);
			log("##### GETTING INVERTER+BATTERY COMBOS #####\n\n", response);
			setAllBatteries(response?.data?.products);
			setFilteredBatteries(response?.data?.products);
		} else if (batteryCategory === 'inverter-plus-battery-combo' ) {
			const response = await batteryIndoreDataService.getInverterBatteryCombos(brandName);
			setAllBatteries(response?.data?.products);
			setFilteredBatteries(response?.data?.products);
		}
		else if (brandName === "filter") {
			const response = await batteryIndoreDataService.findBatteriesByEquipment(state);
			setAllBatteries(response?.data?.products);
			setFilteredBatteries(response?.data?.products);
		} setLoading(false)
	}


	async function fetchWishList() {
		try {
			const response = await batteryIndoreDataService.getWishlist();
			if (response.status === 200) {
				setWishlist(response.data.wishList)
			}
		} catch (error) {
			log("Error: While fetching wishlist data.", error)
		}
	}

	const renderBatteryCards = () => {
		const itemsPerRow = 2;
		log("FILTERED BATTERIES::", filteredBatteries)
		if (!Array?.isArray(filteredBatteries) || filteredBatteries?.length === 0) {
			return (
				<>
					<div className="flex flex-col items-center justify-center w-[100%]">
						<img src="/images/no-data.svg" className=" w-[60%]" alt="no data" />
						<p>We can't seem to find what you are looking for.</p>
					</div>
				</>
			)
		}

		return filteredBatteries?.map((item, idx) => (
			<BatteryCard item={item} idx={idx} />
		));
	};

	function toggleFilterMenu() {
		setOpenFilterSidebar(prevState => !prevState);
	}


	return (
		<>
			<Meta title={batteryCategory === 'show-batteries' ? brandName : batteryCategory?.split("-")?.map(item => item.substring(0, 1)?.toLocaleUpperCase() + item.slice(1))?.join(" ")} />
			<HeaderNew />
			<Toaster position="bottom-center" toastOptions={{
				className: '',
				duration: 5000,
				style: {
					background: '#363636',
					color: '#fff',
				},
				success: {
					duration: 3000,
					theme: {
						primary: 'green',
						secondary: 'black',
					},
				},
			}} />
			<section className="products-page-wr bg-[#F5f5f5] pt-[65px] pb-[65px] 1200:pb-[200px]">
				<div className="center-wr">
					<div className="flex mb-[30px] justify-between">
						<div className="flex bg-[#F5F5F5] items-center gap-[7px]">
							<span className="leading-[20px] font-[600] 320:text-[14px] 1200:text-[16px]">
								<Link to={"/"} className="hover:text-[#ff7637]">Home</Link>
							</span>
							<span className="inline-block py-[1px] ">
								<img src="/images/bar.png" className="" alt="" />
							</span>
							{
								batteryCategory === 'show-batteries' ? <span className="text-[#ff7637] leading-[20px] font-[600] 320:text-[14px] 1200:text-[16px]">{brandName}</span> : <span className="text-[#ff7637] leading-[20px] font-[600] 320:text-[14px] 1200:text-[16px]">
									{batteryCategory?.split("-")?.map(item => item.substring(0, 1)?.toLocaleUpperCase() + item.slice(1))?.join(" ")}
								</span>
							}
						</div>
						<button onClick={showDrawer} className="320:flex 980:hidden ml-[10px] rounded-[10px] bg-white px-[20px] py-[8px] flex items-center w-fit border-[1px] border-[rgba(0,0,0,0.2)] shadow-md 320:text-[14px] ">Filter&nbsp;
							<MdFilterList size={22} className="ml-[10px] text-[#202020]" />
						</button>
					</div>

					<div className="flex">
						{/* SIDEBAR DRAWER */}
						<div className="320:block ">
							<Drawer
								closeIcon={false}
								title={
									<div className="flex items-center relative">
										<Link to="/">
											<figure>
												<img src="/images/logo.svg" className="w-[30px]" alt="" />
											</figure>
										</Link>
										<Link to="/">
											<h3 className="text-[22px] ml-[10px] mb-[0px]">Indore Battery</h3>
										</Link>
										<div onClick={onClose} className="hover:bg-slate-100 transition-all w-fit px-[10px] py-[4px] border-[1px] border-[rgba(0,0,0,0.2)] text-gray-600 absolute right-[10px] flex items-center">
											<span className="text-[12px] text-[#202020] font-semibold mr-[5px]">Close</span>
											<RxCross2 className="text-[12px]" />
										</div>
									</div>
								}
								onClose={onClose} open={open} placement="right">
								<div className=" w-[100%] bg-[#fff] px-[20px] h-[910px] py-[15px] pb-[30px]" style={{ boxShadow: "1px 1px 3px rgba(0,0,0,.15)" }} >
									<div className="border-b-[1px] border-solid border-b-[rgba(0,0,0,0.1)] pb-[20px]">
										<div className="py-[15px] text-center"><button onClick={() => { setFilters(initialFilter) }} className="border-2 border-[#ff7637] px-[20px] py-[5px] text-[#ff7637]">Clear Filters</button></div>
										<div>
											<h4 className="text-[#ff7637] text-[14px] font-[600] py-[15px] font-['Oswald'] uppercase">Price</h4>
										</div>
										<div className="text-[#7a7a7a]">
											<p className="text-[15px] font-semibold font-sans mb-[10px]">₹{filters.priceRange.low} - ₹{filters.priceRange.high}</p>
											<Slider
												step={100}
												range
												min={1000}
												max={75000}
												onChange={(val) => { setFilters(prev => ({ ...prev, priceRange: { low: val[0], high: val[1] } })) }}
												allowCross={false}
												defaultValue={[1000, 75000]}
												styles={{
													track: {
														backgroundColor: '#ff7637',
														height: '10px'
													},
													handle: {
														border: "5px solid #e45c1d",
														boxShadow: "2px 2px 24px 0px rgba(0,0,0,0.4)",
														backgroundColor: "#e45c1d",
														top: '6px',
														opacity: '1',
														width: '18px',
														height: '18px',
														borderRadius: '1px'
													},
													rail: {
														height: '10px'
													}
												}}
											/>
										</div>
									</div>
									<div className="border-b-[1px] border-solid border-b-[rgba(0,0,0,0.1)] pb-[20px]">
										<div>
											<h4 className="text-[#ff7637] text-[14px] font-[600] py-[15px] font-['Oswald'] uppercase">Brands</h4>
										</div>
										<div className="text-[#7a7a7a]">
											<label className="mt-[10px] flex items-start" name={`AllBrands`}>
												<input className="border-[#7a7a7a] mt-[2px]" checked={filters?.brand.includes('all brands')} onChange={handleBrandFiltering} value={'all brands'} type="checkbox" />
												<span className="px-[10px] text-[15px]">All Brands</span>
											</label>
											{
												Array.from(new Set(allBatteries?.map(item => item?.postData?.brand)?.map(item => item?.toLowerCase()))).map(item => (
													<label key={item} className="mt-[10px] flex items-start" name={`${item}`}>
														<input className="border-[#7a7a7a] mt-[2px]" checked={filters?.brand.includes(item)} onChange={handleBrandFiltering} value={item} type="checkbox" />
														<span className="px-[10px] text-[15px]" >
															{item?.substring(0, 1).toUpperCase() + item?.slice(1)}</span>
													</label>
												))
											}
										</div>
									</div>
									{allBatteries?.length > 0 && <div className="border-b-[1px] border-solid border-b-[rgba(0,0,0,0.1)] pb-[20px]">
										<div>
											<h4 className="text-[#ff7637] text-[14px] font-[600] py-[15px] font-['Oswald'] uppercase">Sub-Brands</h4>
										</div>
										<div className="text-[#7a7a7a]">
											{
												Array.from(new Set(allBatteries?.map(item => item?.postData?.subbrand && item?.postData?.subbrand?.toLowerCase()))).map(item => item && (
													<label key={item} className="mt-[10px] flex items-start" name={`${item}`}>
														<input className="border-[#7a7a7a] mt-[2px]" checked={filters?.subbrand.includes(item)} onChange={handleSubBrandFiltering} value={item} type="checkbox" />
														<span className="px-[10px] text-[15px]">
															{item?.substring(0, 1).toUpperCase() + item.slice(1)}
														</span>
													</label>
												))
											}
										</div>
									</div>}
									{allBatteries?.length > 0 &&
										<div className="border-b-[1px] border-solid border-b-[rgba(0,0,0,0.1)] pb-[20px]">
											<div>
												<h4 className="text-[#ff7637] text-[14px] font-[600] py-[15px] font-['Oswald'] uppercase">Capacity</h4>
											</div>
											<div className="text-[#7a7a7a]">
												{
													Array.from(new Set(allBatteries?.map(item => (item?.postData?.capacity)))).map(item => (
														<label key={item} className="mt-[10px] flex items-start">
															<input className="border-[#7a7a7a] mt-[2px]" value={item} checked={filters.capacity.includes(item)} onChange={handleCapacityFiltering} type="checkbox" />
															<span className="px-[10px] text-[15px]">{`${item} AH`}</span>
														</label>
													))
												}
											</div>
										</div>
									}
									<div className="border-b-[1px] border-solid border-b-[rgba(0,0,0,0.1)] pb-[20px]">
										<div>
											<h4 className="text-[#ff7637] text-[14px] font-[600] py-[15px] font-['Oswald'] uppercase">Type</h4>
										</div>
										<div className="text-[#7a7a7a]">
											{typeArray}
										</div>
									</div>
									<div>
										<div>
											<h4 className="text-[#ff7637] text-[14px] font-[600] py-[15px] font-['Oswald'] uppercase">Warranty</h4>
										</div>
										<div className="text-[#7a7a7a]">
											{allBatteries?.length > 0 ?
												Array.from(new Set(allBatteries?.map(item => ({ totalWarranty: item?.postData?.totalWarranty, fullReplacementWarranty: item?.postData?.fullReplacementWarranty, proRataWarranty: item?.postData?.proRataWarranty }))))?.map((item, idx) => (
													<label key={idx} className="mt-[10px] flex items-start">
														<input className="border-[#7a7a7a] mt-[2px]" value={`${item?.totalWarranty}__${item?.fullReplacementWarranty}__${item?.proRataWarranty}`} checked={filters.warranty.includes(`${item?.totalWarranty}__${item?.fullReplacementWarranty}__${item?.proRataWarranty}`)} onChange={handleWarrantyFiltering} type="checkbox" />
														<span className="px-[10px] text-[15px]">{`${item?.totalWarranty} Months ( ${item?.fullReplacementWarranty} Months Full Replacement + ${item?.proRataWarranty} Months Pro Rata)`}</span>
													</label>
												))
												:
												warrantyArr.map((item, idx) => (
													<label key={idx} className="mt-[10px] flex items-start">
														<input className="border-[#7a7a7a] mt-[2px]" type="checkbox" />
														<span className="px-[10px] text-[15px]">{item.name}</span>
													</label>
												))
											}
										</div>
									</div>
								</div>
							</Drawer>
						</div>

						{/* sidebar */}
						<div className="320:hidden 980:block responsive brand-sidebar w-[20%] bg-[#fff] px-[20px] mx-[20px] h-[910px] py-[15px] pb-[30px] sticky top-[100px]" style={{ boxShadow: "1px 1px 3px rgba(0,0,0,.15)", overflowY: "auto" }} >
							<div className="border-b-[1px] border-solid border-b-[rgba(0,0,0,0.1)] pb-[20px]">
								<div className="py-[15px] text-center"><button onClick={() => { setFilters(initialFilter) }} className="border-2 border-[#ff7637] px-[20px] py-[5px] text-[#ff7637]">Clear Filters</button></div>
								<div>
									<h3 className="text-[#ff7637] text-[14px] font-[600] py-[15px] font-['Oswald'] uppercase">Price</h3>
								</div>
								<div className="text-[#7a7a7a]">
									<p className="text-[15px] font-semibold font-sans mb-[10px]">₹{filters.priceRange.low} - ₹{filters.priceRange.high}</p>
									<Slider
										step={100}
										range
										min={1000}
										max={75000}
										onChange={(val) => { setFilters(prev => ({ ...prev, priceRange: { low: val[0], high: val[1] } })) }}
										allowCross={false}
										defaultValue={[1000, 75000]}
										styles={{
											track: {
												backgroundColor: '#ff7637',
												height: '10px'
											},
											handle: {
												border: "5px solid #e45c1d",
												boxShadow: "2px 2px 24px 0px rgba(0,0,0,0.4)",
												backgroundColor: "#e45c1d",
												top: '6px',
												opacity: '1',
												width: '18px',
												height: '18px',
												borderRadius: '1px'
											},
											rail: {
												height: '10px'
											}
										}}
									/>
								</div>
							</div>
							<div className="border-b-[1px] border-solid border-b-[rgba(0,0,0,0.1)] pb-[20px]">
								<div>
									<h3 className="text-[#ff7637] text-[14px] font-[600] py-[15px] font-['Oswald'] uppercase">Brands</h3>
								</div>
								<div className="text-[#7a7a7a]">
									<label className="mt-[10px] flex items-start" name={`AllBrands`}>
										<input className="border-[#7a7a7a] mt-[2px]" checked={filters?.brand.includes('all brands')} onChange={handleBrandFiltering} value={'all brands'} type="checkbox" />
										<span className="px-[10px] text-[15px]">All Brands</span>
									</label>
									{
										Array.from(new Set(allBatteries?.map(item => item?.postData?.brand)?.map(item => item?.toLowerCase()))).map(item => (
											<label key={item} className="mt-[10px] flex items-start" name={`${item}`}>
												<input className="border-[#7a7a7a] mt-[2px]" checked={filters?.brand.includes(item)} onChange={handleBrandFiltering} value={item} type="checkbox" />
												<span className="px-[10px] text-[15px]" >
													{item?.substring(0, 1).toUpperCase() + item?.slice(1)}</span>
											</label>
										))
									}
								</div>
							</div>
							{allBatteries?.length > 0 && <div className="border-b-[1px] border-solid border-b-[rgba(0,0,0,0.1)] pb-[20px]">
								<div>
									<h3 className="text-[#ff7637] text-[14px] font-[600] py-[15px] font-['Oswald'] uppercase">Sub-Brands</h3>
								</div>
								<div className="text-[#7a7a7a]">
									{
										Array.from(new Set(allBatteries?.map(item => item?.postData?.subbrand && item?.postData?.subbrand?.toLowerCase()))).map(item => item && (
											<label key={item} className="mt-[10px] flex items-start" name={`${item}`}>
												<input className="border-[#7a7a7a] mt-[2px]" checked={filters?.subbrand.includes(item)} onChange={handleSubBrandFiltering} value={item} type="checkbox" />
												<span className="px-[10px] text-[15px]">
													{item?.substring(0, 1).toUpperCase() + item.slice(1)}
												</span>
											</label>
										))
									}
								</div>
							</div>}
							{allBatteries?.length > 0 &&
								<div className="border-b-[1px] border-solid border-b-[rgba(0,0,0,0.1)] pb-[20px]">
									<div>
										<h3 className="text-[#ff7637] text-[14px] font-[600] py-[15px] font-['Oswald'] uppercase">Capacity</h3>
									</div>
									<div className="text-[#7a7a7a]">
										{
											Array.from(new Set(allBatteries?.map(item => (item?.postData?.capacity)))).map(item => (
												<label key={item} className="mt-[10px] flex items-start">
													<input className="border-[#7a7a7a] mt-[2px]" value={item} checked={filters.capacity.includes(item)} onChange={handleCapacityFiltering} type="checkbox" />
													<span className="px-[10px] text-[15px]">{`${item} AH`}</span>
												</label>
											))
										}
									</div>
								</div>
							}
							<div className="border-b-[1px] border-solid border-b-[rgba(0,0,0,0.1)] pb-[20px]">
								<div>
									<h3 className="text-[#ff7637] text-[14px] font-[600] py-[15px] font-['Oswald'] uppercase">Type</h3>
								</div>
								<div className="text-[#7a7a7a]">
									{typeArray}
								</div>
							</div>
							<div>
								<div>
									<h3 className="text-[#ff7637] text-[14px] font-[600] py-[15px] font-['Oswald'] uppercase">Warranty</h3>
								</div>
								<div className="text-[#7a7a7a]">
									{allBatteries?.length > 0 ?
										Array.from(new Set(allBatteries?.map(item => ({ totalWarranty: item?.postData?.totalWarranty, fullReplacementWarranty: item?.postData?.fullReplacementWarranty, proRataWarranty: item?.postData?.proRataWarranty }))))?.map((item, idx) => (
											<label key={idx} className="mt-[10px] flex items-start">
												<input className="border-[#7a7a7a] mt-[2px]" value={`${item?.totalWarranty}__${item?.fullReplacementWarranty}__${item?.proRataWarranty}`} checked={filters.warranty.includes(`${item?.totalWarranty}__${item?.fullReplacementWarranty}__${item?.proRataWarranty}`)} onChange={handleWarrantyFiltering} type="checkbox" />
												<span className="px-[10px] text-[15px]">{`${item?.totalWarranty} Months ( ${item?.fullReplacementWarranty} Months Full Replacement + ${item?.proRataWarranty} Months Pro Rata)`}</span>
											</label>
										))
										:
										warrantyArr.map((item, idx) => (
											<label key={idx} className="mt-[10px] flex items-start">
												<input className="border-[#7a7a7a] mt-[2px]" type="checkbox" />
												<span className="px-[10px] text-[15px]">{item.name}</span>
											</label>
										))
									}
								</div>
							</div>
						</div>
						{/* content */}

						<div className="flex flex-col w-[100%] products-card-wr ">
							
							{(filteredPage) ? (
								<>
									{/* top card */}
									<div style={{ borderRadius: "0 60px 60px 0", display: state?.gettingPassedData?.brandLogo === undefined ? "none" : "flex" }} className="320:bg-transparent 320:border-none 980:border-solid 320:flex-col-reverse 980:flex-row 980:bg-[#fff] flex items-center justify-between py-[15px] mb-[20px] border-[#FF7637] border-[1px]">
										<div className='text-center w-[86%]'>
											<h4 className='320:text-[16px] 980:text-[22px] uppercase'>{brandModelName} {batteryCategory?.split("-")?.map(item => item.substring(0, 1)?.toLocaleUpperCase() + item.slice(1))?.join(" ")}</h4>
										</div>
										<figure className=' rounded-[50%] border-[1px] border-[rgba(0,0,0,0.15)] mr-[11px] h-[89px] w-[89px] flex items-center justify-center'>
											<img src={`https://batterybackend.react.stagingwebsite.co.in/images/${state?.gettingPassedData?.brandLogo}`} className='w-[82%]' alt="bike category logo" />
										</figure>
									</div>
								</>
							) : (
								<></>
							)}

							{/* battery Cards */}
							<div className="w-[100%] flex flex-wrap 320:gap-[25px] 1200:gap-[10px]">
								{!loading ?
									renderBatteryCards() :
									(<>
										<div className="w-[100%] flex flex-col justify-center items-center">
											<ColorRing
												visible={true}
												height="80"
												width="80"
												ariaLabel="color-ring-loading"
												wrapperStyle={{}}
												wrapperclassName="color-ring-wrapper"
												colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
											/>
											<span  >Please wait while we are getting all set</span>
										</div>
									</>)}

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
export default Products;
