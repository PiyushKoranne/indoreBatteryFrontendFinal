import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
import loginIcon from "../../assets/icons8-login-30.png"
import registerIcon from "../../assets/icons8-register-30.png"
import { LoginContext } from "../../App";
import { batteryIndoreDataService } from "../../services/dataService";
import log from "../../utils/utilityFunctions";


function Header({pageData}) {
	
	const navigate = useNavigate();
	const { loginStatus, setLoginStatus } = useContext(LoginContext);
	const backend_url = import.meta.env.VITE_BACKEND_URL;
	const [categories, setCategories] = useState(null);
	const [brandNames, setBrandNames] = useState([]);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isStickyMenuOpen, setIsStickyMenuOpen] = useState(false);
	const [contactDetails, setContactDetails] = useState(null);

	const toggleMenu = () => {
		console.log("TOggle menu",isMenuOpen)
	  setIsMenuOpen(!isMenuOpen);
		setIsStickyMenuOpen(false)
	};	const toggleStickyMenu = () => {
		console.log("Sticky menu",isStickyMenuOpen)
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
		<header id="common-header">
			<div className="upper-header bg-[#ff7637] p-[20px] pr-[90px] pl-[90px]">
				<div className=" flex justify-between items-center text-[14px]">
					<div className="upper-header-left-wr flex items-center gap-[20px]">
						<Link to="/" className="flex items-center gap-[20px]">
							<figure className="logo-img">
								<img src="/images/logo.png" alt="Indore Battery Logo Image" />
							</figure>
							<h1 className="text-[#fff] text-[24px] font-[800]">Indore Battery</h1>
						</Link>
					</div>

					<div className="upper-header-left-wr flex items-center gap-[20px]">
						<figure className="logo-img">
							<img src="/images/bolt.png" alt="Indore Battery Logo Image" />
						</figure>
						<figcaption className="text-[#fff] text-[18px] font-[400]"><span className="font-[600]"> FLash sale:</span> 60% off car batteries | use code "Batt60". <span className="font-[600]">Shop Now</span></figcaption>
					</div>

					<div className="upper-header-left-wr flex items-center gap-[20px]">
						<figure className="logo-img">
							<img src="/images/Phone.png" alt="Indore Battery Logo Image" />
						</figure>
						<h1 className="text-[#fff] text-[18px] font-[400]"> 
						<a target="_blank" href={`tel:${contactDetails?.sectionContent?.filter(item=>item?.elementAttrName === 'phone')[0]?.elementValue?.split(",")[0]?.split(" ")?.join("")}`}> {contactDetails?.sectionContent?.filter(item=>item?.elementAttrName === 'phone')[0]?.elementValue?.split(",")[0]?.split(" ")?.join("")}</a>,&nbsp;
						<a target="_blank" href={`tel:${contactDetails?.sectionContent?.filter(item=>item?.elementAttrName === 'phone')[0]?.elementValue?.split(",")[1]?.split(" ")?.join("")}`}> {contactDetails?.sectionContent?.filter(item=>item?.elementAttrName === 'phone')[0]?.elementValue?.split(",")[1]?.split(" ")?.join("")}</a></h1>
					</div>
				</div>
			</div>

			<div className="nav-header bg-[transparent] header-section absolute w-[90%] mt-[0] mb-[0] mr-[auto] ml-[auto] left-[0] right-[0] z-[100]">
				<div className="flex items-center justify-center lower-header-wr">
					<div className="cursor-pointer categories dropdown brands-nav">
						<div>
							<Link to="/categories" className="category-header pt-[18px] pb-[19px] focus:outline-none pl-[40px] pr-[180px] bg-[#fff] font-[500] text-[19px] relative" name="Categories" id="myAccount">
								Categories
							</Link>
						</div>

						<div className="relative">
							<ul className="brands-submenu categories bg-[#fff] top-[19px] w-[100%] text-[#000] absolute font-[400] text-[14px] px-[20px] py-[20px]">
								{categories?.map((item, index) => (
									<Link key={index} to={`/categories${item?.postData?.categorySlug || '/car-batteries'}`} className="brand-link"> <li className="py-[10px]">{item?.postData?.categoryName}</li></Link>
								))}
							</ul>
						</div>

					</div>
					<div>

						{/* BURGER MENU */}
					<div className="burger-menu">
    						  <button className="burger-menu-toggle" onClick={toggleMenu}>
    						    ☰
    						  </button>
    						  {isMenuOpen && (
    						    <div className="burger-menu-items">
    						      <ul>
    						        <li className="py-[5%]"><Link to="/offers">Special Offers</Link></li>
    						        <li className="py-[5%]"><Link to="/about-us">About Us</Link></li>
    						        {/* <li className="py-[5%]"><Link to="/under-construction">Exchange Battery</Link></li> */}
												<li className="py-[5%]"><Link to="/offers">Special Offers</Link></li>
    						        <li className="py-[5%]"><Link to="/warranty-registeration">Warranty Registeration</Link></li>
    						        <li className="py-[5%]"><Link to="/faq">FAQ</Link></li>
    						        <li className="py-[5%]"><Link to="/contact-us">Contact Us</Link></li>
												{/* 
												 */}
    						        <li><ul>
													 {
											(loginStatus && loginStatus?.isLoggedIn) ? (
												<>
													<Link to="/cart"> <li className="py-[10px] flex gap-[15px] hover:text-[#FF6C22] transition"><i className="fa-solid fa-cart-shopping text-[18px]"></i> <span>Cart</span></li></Link>
													<Link to="/wishlist"> <li className="py-[10px] flex gap-[15px] hover:text-[#B80000] transition"><i className="fa-regular fa-heart text-[18px]"></i> <span>Whislist</span></li></Link>
													<Link to="/orders/current"> <li className="py-[10px] flex gap-[15px] hover:text-[#FF6C22] transition"><i className="fa-solid fa-boxes-stacked text-[18px]"></i> <span>Orders</span></li></Link>
													<li onClick={handleLogout} className="py-[10px] flex gap-[15px] hover:text-[#40A2E3] transition"><i className="fa-solid fa-right-from-bracket text-[18px]"></i> <span className="whitespace-nowrap">Sign Out</span></li>
												</>
											) : (
												<>
													<Link to="/login"> <li className="py-[10px] flex gap-[15px]"><figure className="w-[20px]"><img src={`${loginIcon}`} alt="auth icons" /></figure> <span>login</span></li></Link>
													<Link to="/register"> <li className="py-[10px] flex gap-[15px]"><figure className="w-[20px]"><img src={`${registerIcon}`} alt="auth icons" /></figure> <span>register</span></li></Link>
												</>
											)
										}</ul>
										</li>
    						        {/* Add more menu items as needed */}
    						      </ul>
    						    </div>
    						  )}
    				</div>

								{/* NORMAL LOWER HEADER MENU */}
						<ul className="flex lower-header-cont justify-center bg-[#EEEEEE]">
							<li className="p-[20px] px-[25px] mr-[10px] ml-[10px] text-[#000] font-[600] cursor-pointer"><Link to="/offers" className="brand-link"><span className="hover">Special Offers</span></Link></li>
							<li className="p-[20px] px-[25px] mr-[10px] ml-[10px] text-[#000] font-[600] cursor-pointer"><Link to="/about-us" className="brand-link"><span className="hover">About Us</span></Link></li>
							<li className="p-[20px] px-[25px] mr-[10px] ml-[10px] text-[#000] font-[600] brands-nav cursor-pointer">
								<div><span> Brands</span></div>
								<div className="relative">
									<ul className="brands-submenu bg-[#ff7637] top-[19px] w-[260px] text-[#fff] absolute font-[400] text-[14px] px-[20px] py-[20px]">
										{brandNames?.map((item, index) => (
											<Link key={index} to={`/categories/show-batteries/${item.brandName}`} className="brand-link brandName for-header-hover"> <li className="py-[10px]">{item?.brandName}</li></Link>
										))}
									</ul>
								</div>
							</li>
							{/* <li className="p-[20px] px-[25px] mr-[10px] ml-[10px] text-[#000] font-[600] cursor-pointer"><Link to="/under-construction" className="brand-link"><span className="hover">Exchange Battery</span></Link></li> */}
							<li className="p-[20px] px-[25px] mr-[10px] ml-[10px] text-[#000] font-[600] cursor-pointer"><Link to="/warranty-registeration" className="brand-link"><span className="hover">Warranty Registeration</span></Link></li>
							<li className="p-[20px] px-[25px] mr-[10px] ml-[10px] text-[#000] font-[600] cursor-pointer"><Link to="/faq" className="brand-link"><span className="hover">FAQ</span></Link></li>
							<li className="p-[20px] px-[25px] mr-[10px] ml-[10px] text-[#000] font-[600] cursor-pointer"><Link to="/contact-us" className="brand-link"><span className="hover">Contact</span></Link></li>
							<li className="p-[20px] px-[25px] mr-[10px] ml-[10px] text-[#000] font-[600] accounts-nav">
								<span className=" flex gap-[10px]">
									<figure><img src="/images/User.png" alt="my account" /></figure> {loginStatus && loginStatus?.isLoggedIn ? loginStatus?.userName : 'My Account'}</span>
								<div className="relative shadow-lg bg-[#fff] w-full ">
									<ul className="login-wr-dropdown accounts-submenu shadow-md rounded-[15px] bg-[#fff] top-[37px] border-[1px] border-[rgba(0,0,0,0.15)] w-full font-500 absolute font-[400] text-[14px] px-[20px] py-[10px]">
										{
											(loginStatus && loginStatus?.isLoggedIn) ? (
												<>
													<Link to="/cart"> <li className="py-[10px] flex gap-[15px] hover:text-[#FF6C22] transition"><i className="fa-solid fa-cart-shopping text-[18px]"></i> <span>Cart</span></li></Link>
													<Link to="/wishlist"> <li className="py-[10px] flex gap-[15px] hover:text-[#B80000] transition"><i className="fa-regular fa-heart text-[18px]"></i> <span>Whislist</span></li></Link>
													<Link to="/orders/current"> <li className="py-[10px] flex gap-[15px] hover:text-[#FF6C22] transition"><i className="fa-solid fa-boxes-stacked text-[18px]"></i> <span>Orders</span></li></Link>
													<li onClick={handleLogout} className="py-[10px] flex gap-[15px] hover:text-[#40A2E3] transition"><i className="fa-solid fa-right-from-bracket text-[18px]"></i> <span className="whitespace-nowrap">Sign Out</span></li>
												</>
											) : (
												<>
													<Link to="/login"> <li className="py-[10px] flex gap-[15px]"><figure className="w-[20px]"><img src={`${loginIcon}`} alt="auth icons" /></figure> <span>login</span></li></Link>
													<Link to="/register"> <li className="py-[10px] flex gap-[15px]"><figure className="w-[20px]"><img src={`${registerIcon}`} alt="auth icons" /></figure> <span>register</span></li></Link>
												</>
											)
										}
									</ul>
								</div>
							</li>
						</ul>
					
					</div>
				</div>
			</div>

			<div className="nav-header bg-[#EEEEEE] hidden header-sticky-section absolute w-[90%] mt-[0] mb-[0] mr-[auto] ml-[auto] left-[0] right-[0] z-[100]">
				<div className="flex items-center mx-[auto]">
					<div onClick={()=>navigate("/")} className="sticky-header-logo-wr flex items-center justify-center w-[100px] p-[10px] cursor-pointer">
						<img src="/images/logo.svg" alt="" />
					</div>
					<div className="cursor-pointer categories dropdown brands-nav">

						<div>
							<Link to="/categories" className="category-header pt-[18px] pb-[18px] focus:outline-none pl-[40px] pr-[180px] bg-[#fff] font-[500] text-[19px] relative" name="Categories" id="myAccount">
								Categories
							</Link>
						</div>

						<div className="relative">
							<ul className="brands-submenu categories shadow-lg bg-[#fff] top-[19px] w-[100%] text-[#000] absolute font-[400] text-[14px] px-[20px] py-[20px]">
								{categories?.map((item, index) => (
									<Link key={index} to={`/categories${item?.postData?.categorySlug || '/car-batteries'}`} className=" brand-link"> <li className="py-[10px]">{item?.postData?.categoryName}</li></Link>
								))}
							</ul>
						</div>

					</div>
					<div>
					<div className="burger-menu">
    						 
    				
    						  				<div className="burger-menu">
													<button className="burger-menu-toggle" onClick={toggleStickyMenu}>
														☰
													</button>
													{isStickyMenuOpen && (
														<div className="burger-menu-items one">
															<ul>
																<li className="py-[5%]"><Link to="/offers">Special Offers</Link></li>
																<li className="py-[5%]"><Link to="/about-us">About Us</Link></li>
																{/* <li className="py-[5%]"><Link to="/under-construction">Exchange Battery</Link></li> */}
																<li className="py-[5%]"><Link to="/offers">Special Offers</Link></li>
																<li className="py-[5%]"><Link to="/warranty-registeration">Warranty Registeration</Link></li>
																<li className="py-[5%]"><Link to="/faq">FAQ</Link></li>
																<li className="py-[5%]"><Link to="/contact-us">Contact Us</Link></li>
																<li><ul>
																	 {
															(loginStatus && loginStatus?.isLoggedIn) ? (
																<>
																	<Link to="/cart"> <li className="py-[10px] flex gap-[15px] hover:text-[#FF6C22] transition"><i className="fa-solid fa-cart-shopping text-[18px]"></i> <span>Cart</span></li></Link>
																	<Link to="/wishlist"> <li className="py-[10px] flex gap-[15px] hover:text-[#B80000] transition"><i className="fa-regular fa-heart text-[18px]"></i> <span>Whislist</span></li></Link>
																	<Link to="/orders/current"> <li className="py-[10px] flex gap-[15px] hover:text-[#FF6C22] transition"><i className="fa-solid fa-boxes-stacked text-[18px]"></i> <span>Orders</span></li></Link>
																	<li onClick={handleLogout} className="py-[10px] flex gap-[15px] hover:text-[#40A2E3] transition"><i className="fa-solid fa-right-from-bracket text-[18px]"></i> <span className="whitespace-nowrap">Sign Out</span></li>
																</>
															) : (
																<>
																	<Link to="/login"> <li className="py-[10px] flex gap-[15px]"><figure className="w-[20px]"><img src={`${loginIcon}`} alt="auth icons" /></figure> <span>login</span></li></Link>
																	<Link to="/register"> <li className="py-[10px] flex gap-[15px]"><figure className="w-[20px]"><img src={`${registerIcon}`} alt="auth icons" /></figure> <span>register</span></li></Link>
																</>
															)
														}</ul>
														</li>
				
				
																
																{/* Add more menu items as needed */}
															</ul>
														</div>
													)}
										</div>
    						
    				</div>
						<ul className="flex lower-header-cont">
							<li className="p-[20px] px-[25px] mr-[10px] ml-[10px] text-[#000] font-[600] cursor-pointer "><Link to="/offers" className="brand-link"><span className="hover"> Special Offers</span></Link></li>
							<li className="p-[20px] px-[25px] mr-[10px] ml-[10px] text-[#000] font-[600] cursor-pointer "><Link to="/about-us" className="brand-link"><span className="hover">About Us</span></Link></li>
							<li className="p-[20px] px-[25px] mr-[10px] ml-[10px] text-[#000] font-[600] brands-nav cursor-pointer">
								<div><span> Brands</span></div>
								<div className="relative">
									<ul className="brands-submenu bg-[#ff7637] top-[19px] w-[260px] text-[#fff] absolute font-[400] text-[14px] px-[20px] py-[20px]">
										{brandNames?.map((item, index) => (
											<Link key={index} to={`/categories/show-batteries/${item.brandName}`} className="brand-link brandName for-header-hover"> <li className="py-[10px]">{item?.brandName}</li></Link>
										))}
									</ul>
								</div>
							</li>
							{/* <li className="p-[20px] px-[25px] mr-[10px] ml-[10px] text-[#000] font-[600] cursor-pointer"><Link to="/under-construction" className="brand-link"><span className="hover">Exchange Battery</span></Link></li> */}
							<li className="p-[20px] px-[25px] mr-[10px] ml-[10px] text-[#000] font-[600] cursor-pointer"><Link to="/warranty-registeration" className="brand-link"><span className="hover">Warranty Registeration</span></Link></li>
							<li className="p-[20px] px-[25px] mr-[10px] ml-[10px] text-[#000] font-[600] cursor-pointer"><Link to="/faq" className="brand-link"><span className="hover">FAQ</span></Link></li>
							<li className="p-[20px] px-[25px] mr-[10px] ml-[10px] text-[#000] font-[600] cursor-pointer"><Link to="/contact-us" className="brand-link"><span className="hover">Contact</span></Link></li>
							<li className="p-[20px] px-[25px] mr-[10px] ml-[10px] text-[#000] font-[600] accounts-nav">
								<span className=" flex gap-[10px]">
									<figure><img src="/images/User.png" alt="my account" /></figure> {loginStatus && loginStatus?.isLoggedIn ? loginStatus?.userName : 'My Account'}</span>
								<div className="relative">
									<ul className="login-wr-dropdown accounts-submenu shadow-md rounded-[15px] bg-[#fff] top-[45px] border-[1px] border-[rgba(0,0,0,0.15)] font-500 absolute font-[400] text-[14px] px-[20px] py-[10px]">
										{
											(loginStatus && loginStatus?.isLoggedIn) ? (
												<>
													<Link to="/cart"> <li className="py-[10px] flex gap-[15px] hover:text-[#FF6C22] transition"><i className="fa-solid fa-cart-shopping text-[18px]"></i> <span>Cart</span></li></Link>
													<Link to="/wishlist"> <li className="py-[10px] flex gap-[15px] hover:text-[#B80000] transition"><i className="fa-regular fa-heart text-[18px]"></i> <span>Whislist</span></li></Link>
													<Link to="/orders/current"> <li className="py-[10px] flex gap-[15px] hover:text-[#FF6C22] transition"><i className="fa-solid fa-boxes-stacked text-[18px]"></i> <span>Orders</span></li></Link>
													<li onClick={handleLogout} className="py-[10px] flex gap-[15px] hover:text-[#40A2E3] transition"><i className="fa-solid fa-right-from-bracket text-[18px]"></i> <span className="whitespace-nowrap">Sign Out</span></li>
													</>
											) : (
												<>
													<Link to="/login"> <li className="py-[10px] flex gap-[15px]"><figure className="w-[20px]"><img src={`${loginIcon}`} alt="auth icons" /></figure> <span>login</span></li></Link>
													<Link to="/register"> <li className="py-[10px] flex gap-[15px]"><figure className="w-[20px]"><img src={`${registerIcon}`} alt="auth icons" /></figure> <span>register</span></li></Link>
												</>
											)
										}
									</ul>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>

		</header>
	)
}
export default Header;