import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
import loginIcon from "../../assets/icons8-login-30.png"
import registerIcon from "../../assets/icons8-register-30.png"
import { LoginContext } from "../../App";
import { batteryIndoreDataService } from "../../services/dataService";
import log from "../../utils/utilityFunctions";
import { PiBuildings, PiCaretDownBold } from "react-icons/pi";
import { Drawer, Dropdown, Menu, Space } from "antd";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { TbShoppingCartBolt } from "react-icons/tb";
import { CgUser } from "react-icons/cg";
import Marquee from "react-fast-marquee";
import { IoMenu } from "react-icons/io5";
import { RiShoppingCart2Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { BiSolidOffer, BiSupport } from "react-icons/bi";
import { LuFileClock } from "react-icons/lu";
import { FaQuestion } from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";

function HeaderNew() {
	const [open, setOpen] = useState(false);
	const [couponData, setCouponData] = useState(null);

	async function fetchCoupons() {
		const response = await axios.get("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-coupons")
		setCouponData(response?.data)
	}

	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};
	const navigate = useNavigate();
	const { loginStatus, setLoginStatus } = useContext(LoginContext);
	const backend_url = import.meta.env.VITE_BACKEND_URL;
	const [categories, setCategories] = useState(null);
	const [brandNames, setBrandNames] = useState([]);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isStickyMenuOpen, setIsStickyMenuOpen] = useState(false);
	const [contactDetails, setContactDetails] = useState(null);

	const toggleMenu = () => {
		console.log("Toggle menu", isMenuOpen)
		setIsMenuOpen(!isMenuOpen);
		setIsStickyMenuOpen(false)
	}; const toggleStickyMenu = () => {
		console.log("Sticky menu", isStickyMenuOpen)
		setIsStickyMenuOpen(!isStickyMenuOpen);
		setIsMenuOpen(false)
	};

	async function getAllBatteryBrands() {
		const response = await axios.get(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-all-battery-brands`);
		setBrandNames(response?.data?.data);
	}

	async function handleLogout() {
		try {
			log("handling logout")
			const response = await axios.get(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/auth/user-logout`);
			if (response.status === 200) {
				if (response.data?.success) {
					setLoginStatus(null);
					navigate("/");
				}
			}
		} catch (error) {
			log(error);
		}
	}

	async function fetchAllCategories() {
		try {
			const response = await batteryIndoreDataService.getAllCategories();
			if (response.status === 200) {
				log("ALL CATEGORY RESPONSE::", response);
				setCategories(response?.data?.categories);
			}
		} catch (error) {
			log(error);
			setCategories(null);
		}
	}

	async function getContactDetails() {
		try {
			const response = await batteryIndoreDataService.getContactDetails();
			console.log("GETTING CONTACT DETAILS RESPONSE", response);
			setContactDetails(response?.data?.data);

		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getAllBatteryBrands();
		fetchAllCategories();
		getContactDetails();
		fetchCoupons();
	}, [])

	useEffect(() => {
		window.addEventListener('scroll', isSticky);
		return () => {
			window.removeEventListener('scroll', isSticky);
		};
	});
	const isSticky = (e) => {
		const header = document.querySelector('.header-sticky-section');
		const scrollTop = window.scrollY;
		scrollTop >= 150 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
	};

	return (
		<>
			<div className="320:hidden 1024:block">
				<div className="new-header header-sticky-section">
					<div className="flex items-center p-[10px] 320:w-[90%] max-w-[1919px] 2048:w-[80%] mx-auto my-0 relative">
						<Link to={"/"}>
							<figure>
								<img src="/images/logo.svg" className="w-[40px]" alt="" />
							</figure>
						</Link>
						<Link to={"/"}>
							<h3 className="mb-[5px] ml-[10px] text-[22px]">Indore Battery</h3>
						</Link>
						<div className="flex items-center px-[30px] gap-[15px]">
							<Dropdown
								menu={{
									items: [{
										key: 1, label: (
											<div className="w-[560px] flex flex-wrap bg-white hover:bg-white">
												{
													categories?.map((item, index) => (

														<Link key={index} to={`/categories${item?.postData?.categorySlug || '/car-batteries'}`} className="w-1/2">
															<li className="py-[10px] flex items-center gap-[6px] text-black hover:bg-slate-50 font-semibold"><AiOutlineThunderbolt /> {item?.postData?.categoryName}</li>
														</Link>
													))
												}
											</div>
										)
									}]
								}}
							>
								<a onClick={(e) => e.preventDefault()}>
									<Space className="cursor-pointer">
										<p className="font-semibold text-[14px]">Categories</p>
										<PiCaretDownBold className="text-[#ff7637]" />
									</Space>
								</a>
							</Dropdown>
							<Dropdown
								menu={{
									items: [{
										key: 1, label: (
											<div className="w-[560px] flex flex-wrap bg-white hover:bg-white">
												{
													brandNames?.map((item, index) => (
														<Link key={index} to={`/categories/show-batteries/${item.brandName}`} className="w-1/2"> <li className="py-[10px] flex items-center gap-[6px] text-black hover:bg-slate-50 font-semibold">{item?.brandName}</li></Link>
													))
												}
											</div>
										)
									}]
								}}
							>
								<a onClick={(e) => e.preventDefault()}>
									<Space className="cursor-pointer">
										<p className="font-semibold text-[14px]">Brands</p>
										<PiCaretDownBold className="text-[#ff7637]" />
									</Space>
								</a>
							</Dropdown>
						</div>
						<div className="flex items-center absolute right-0">
							<div className="w-[50px] h-[50px] flex items-center justify-center ">
								{loginStatus && loginStatus?.isLoggedIn ? (
									<Dropdown
										menu={{
											items: [{
												key: 1,
												label: (
													<Link to="/cart"> <li className="py-[10px] flex gap-[15px] hover:text-[#FF6C22] transition"><i className="fa-solid fa-cart-shopping text-[18px]"></i> <span>Cart</span></li></Link>
												)
											}, {
												key: 2,
												label: (
													<Link to="/wishlist"> <li className="py-[10px] flex gap-[15px] hover:text-[#B80000] transition"><i className="fa-regular fa-heart text-[18px]"></i> <span>Whislist</span></li></Link>
												)
											}, {
												key: 3,
												label: (
													<Link to="/orders/current"> <li className="py-[10px] flex gap-[15px] hover:text-[#FF6C22] transition"><i className="fa-solid fa-boxes-stacked text-[18px]"></i> <span>Orders</span></li></Link>
												)
											}, {
												key: 4,
												label: (
													<li onClick={handleLogout} className="py-[10px] flex gap-[15px] hover:text-[#40A2E3] transition"><i className="fa-solid fa-right-from-bracket text-[18px]"></i> <span className="whitespace-nowrap">Sign Out</span></li>
												)
											}
											]
										}}
									>
										<a onClick={(e) => e.preventDefault()}>
											<Space>
												<CgUser className="text-[22px]" />
											</Space>
										</a>
									</Dropdown>
								) : (
									<Link to="/login"><CgUser className="text-[22px]" /></Link>
								)}

							</div>
							<div className="w-[50px] h-[50px] flex items-center justify-center ">
								{
									loginStatus && loginStatus?.isLoggedIn ? (
										<Link to="/cart"><TbShoppingCartBolt className="text-[24px]" /></Link>
									) : (
										<Link to="/login"><TbShoppingCartBolt className="text-[24px]" /></Link>
									)
								}

							</div>
						</div>
					</div>
					<div className="border-[1px] border-slate-100"></div>
					<div className="flex items-center justify-start gap-[25px] 320:w-[90%] max-w-[1919px] 2048:w-[80%] mx-auto my-0">
						<Link className="text-[14px] font-semibold text-slate-600 relative px-[5px] py-[8px] hover:text-[#ff7637] transition-all" to="/offers">Special Offers</Link>
						<Link className="text-[14px] font-semibold text-slate-600 relative px-[5px] py-[8px] hover:text-[#ff7637] transition-all" to="/about-us">About Us</Link>
						<Link className="text-[14px] font-semibold text-slate-600 relative px-[5px] py-[8px] hover:text-[#ff7637] transition-all" to="/warranty-registeration">Warranty Registration</Link>
						<Link className="text-[14px] font-semibold text-slate-600 relative px-[5px] py-[8px] hover:text-[#ff7637] transition-all" to="/faq">FAQ</Link>
						<Link className="text-[14px] font-semibold text-slate-600 relative px-[5px] py-[8px] hover:text-[#ff7637] transition-all" to="/contact-us">Contact Us</Link>

					</div>

				</div>
				<div className="border-[1px] border-slate-100"></div>
				<Marquee autoFill pauseOnHover  >
					{
						couponData ? couponData?.map(coupon => (
							<div className="p-[6px] text-[13px] font-medium text-[#fff] bg-orange-600 px-[15px] flex items-center">
								<p className="marqee-para leading text-[13px] p-0 m-0 leading-[20px] mr-[15px]" dangerouslySetInnerHTML={{ __html: coupon?.couponDescription }}></p>
							</div>

						)) :
							<div className="p-[6px] text-[13px] font-medium text-[#fff] bg-orange-600 px-[15px]">
								Flash sale! Get upto <strong className="text-black">60% OFF</strong> on the purchase of amaron batteries. Hurry! Offer valid only for a limited period of time.
							</div>
					}

				</Marquee>
			</div>
			<div className="320:block 1024:hidden">
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
								<h3 className="text-[13px] ml-[10px] mb-[0px]">Indore Battery</h3>
							</Link>
							<div onClick={onClose} className="hover:bg-slate-100 transition-all w-fit px-[10px] py-[4px] border-[1px] border-[rgba(0,0,0,0.2)] text-gray-600 absolute right-[10px] flex items-center">
								<span className="text-[12px] text-black font-semibold mr-[5px]">Close</span>
								<RxCross2 className="text-[12px]" />
							</div>
						</div>
					}
					onClose={onClose} open={open} placement="left">
					<div className="">
						<Menu
							mode="inline"
							style={{
								width: '100%',
							}}
							defaultSelectedKeys={['1']}
							items={
								[{
									key: "1",
									icon: null,
									children: null,
									label: <Link className="flex items-center gap-[10px] text-[14px] font-normal text-slate-600 relative px-[5px] py-[8px] hover:text-[#ff7637] transition-all" to="/offers">
										<BiSolidOffer className="text-[22px] " />
										<p>Special Offers</p>
									</Link>
								},
								{
									key: "2",
									icon: null,
									children: categories?.map((item, index) => ({key: item?.postData?.categorySlug, icon: null, children:null, label:<Link key={index} to={`/categories${item?.postData?.categorySlug || '/car-batteries'}`} className="w-1/2">
									<li className="py-[4px] flex items-center gap-[2px] text-black hover:bg-slate-50 font-semibold"><AiOutlineThunderbolt /> {item?.postData?.categoryName}</li>
								</Link>}
									)),
									label: <Link className="flex items-center gap-[10px] text-[14px] font-normal text-slate-600 relative px-[5px] py-[8px] hover:text-[#ff7637] transition-all" >
										<MdOutlineCategory className="text-[22px] " />
										<p>Categories</p>
									</Link>
								},
								{
									key: "2.1",
									icon: null,
									children: brandNames?.map((item, index) => ({
											key:item?.brandName,
											icon:null,
											children:null,
											label:<Link key={index} to={`/categories/show-batteries/${item.brandName}`} className="w-1/2"> <li className="py-[4px] flex items-center gap-[2px] text-black hover:bg-slate-50 font-semibold">{item?.brandName}</li></Link>
										}))
									,
									label: <Link className="flex items-center gap-[10px] text-[14px] font-normal text-slate-600 relative px-[5px] py-[8px] hover:text-[#ff7637] transition-all" >
										<MdOutlineCategory className="text-[22px] " />
										<p>Brands</p>
									</Link>
								},
								{
									key: "3",
									icon: null,
									children: null,
									label: <Link className="flex items-center gap-[10px] text-[14px] font-normal text-slate-600 relative px-[5px] py-[8px] hover:text-[#ff7637] transition-all" to="/about-us"><PiBuildings className="text-[22px] " /> <p>About Us</p></Link>
								},
								{
									key: "4",
									icon: null,
									children: null,
									label: <Link className="flex items-center gap-[10px] text-[14px] font-normal text-slate-600 relative px-[5px] py-[8px] hover:text-[#ff7637] transition-all" to="/warranty-registeration"><LuFileClock className="text-[22px] " /> <p>Warranty Registration</p></Link>
								},
								{
									key: "5",
									icon: null,
									children: null,
									label: <Link className="flex items-center gap-[10px] text-[14px] font-normal text-slate-600 relative px-[5px] py-[8px] hover:text-[#ff7637] transition-all" to="/faq"><FaQuestion className="text-[22px] " /> <p>FAQ</p></Link>

								},
								{
									key: "6",
									icon: null,
									children: null,
									label: <Link className="flex items-center gap-[10px] text-[14px] font-normal text-slate-600 relative px-[5px] py-[8px] hover:text-[#ff7637] transition-all" to="/contact-us"><BiSupport className="text-[22px] " /><p>Contact Us</p></Link>
								}]
							}
						/>
					</div>
				</Drawer>
				<div className="flex items-center justify-center relative px-[10px] py-[20px]">
					<button className="absolute left-[10px]" onClick={showDrawer}>
						<IoMenu className="text-[24px]" />
					</button>
					<Link to={"/"}>
						<figure className="flex items-center">
							<img src="/images/logo.svg" className="w-[30px]" alt="" />
							<h3 className="ml-[10px]">Indore Battery</h3>
						</figure>
					</Link>
					{
						loginStatus && loginStatus?.isLoggedIn ? (
							<Link to={"/cart"} className="absolute right-[10px]">
								<button >
									<RiShoppingCart2Line className="text-[22px]" />
								</button>
							</Link>
						) : (
							<Link to="/login" className="absolute right-[10px]">
								<button >
									<RiShoppingCart2Line className="text-[22px]" />
								</button>
							</Link>)
					}
				</div>
				<div className="overflow-hidden">
					<Marquee>
						<div className="p-[6px] text-[13px] font-medium text-[#fff] bg-orange-600 px-[15px]">
							Flash sale! Get upto <strong className="text-black">60% OFF</strong> on the purchase of amaron batteries. Hurry! Offer valid only for a limited period of time.
						</div>
						<div className="p-[6px] text-[13px] font-medium text-[#fff] bg-orange-600 px-[15px]">
							Get upto <strong className="text-black">20% OFF</strong> on the purchase of luminous inverters. Hurry! Offer valid only for a limited period of time.
						</div>
						<div className="p-[6px] text-[13px] font-medium text-[#fff] bg-orange-600 px-[15px]">
							Get upto <strong className="text-black">15% OFF</strong> on the purchase of exide batteries. Hurry! Offer valid only for a limited period of time.
						</div>
					</Marquee>
				</div>
			</div>
		</>
	)
}

export default HeaderNew