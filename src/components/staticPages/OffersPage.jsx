import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import EnquirySection from "../common/EnquirySection";
import Footer from "../common/Footer";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { Link } from "react-router-dom";
const backend_url = import.meta.env.VITE_BACKEND_URL
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { FaTag } from "react-icons/fa6";
import HeaderNew from "../common/HeaderNew";
import Meta from "../common/Meta";
import log from "../../utils/utilityFunctions";

function OffersPage() {

	const [couponData, setCouponData] = useState()
	const [sectionHeader, setSectionHeader] = useState([])
	const [offerList, setOfferList] = useState([])
	const [openCopuonModal, setOpenCouponModal] = useState(false)
	const [couponDescription, setCouponDescription] = useState("")
	const [couponCode, setCouponCode] = useState("")

	async function getPageData() {
		const response = await axios.get("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-page-content?pagename=special-offers", {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
			}
		})
		log("this is data", response?.data?.pageData?.sections[1]?.sectionContent[2]?.elementItems)
		setSectionHeader(response?.data?.pageData?.sections[1]?.sectionContent)
		setOfferList(response?.data?.pageData?.sections[1]?.sectionContent[2]?.elementItems)

	}

	async function fetchCoupons() {
		const response = await axios.get("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-coupons", {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
			}
		})
		setCouponData(response?.data)
	}

	function openModal(coupon) {
		log("this is coupon data >>>>>>>>	", coupon)
		setOpenCouponModal(true)
		setCouponCode(coupon?.couponCode)
		setCouponDescription(coupon?.couponDescription)
	}
	function closeModal() {
		setOpenCouponModal(false)
		setCouponCode("")
		setCouponDescription("")
	}
	const handleCopyCoupon = (couponCode) => {
		var copyText = document.createElement("textarea");
		copyText.value = couponCode;
		document.body.appendChild(copyText);
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		document.execCommand("copy");
		// Remove the temporary textarea
		document.body.removeChild(copyText);

		// Alert the copied text
		toast.success('Coupon code copied sucessfully 🎉')
		setTimeout(() => {
			closeModal()
		}, 500)
	};

	useEffect(() => {
		fetchCoupons()
		getPageData()
	}, [])


	return (
		<>
			<Meta title="Special Offers | Indore Battery" />
			<HeaderNew />
			<section className="offers-page-wr bg-[#F7F7F7] py-[40px] pb-[7%]">
				<div className="center-wr">
					<div className="flex p-[8px] bg-[#F5F5F5] gap-[7px] items-center">
						<span className="text-[16px] font-[600] leading-[20px]" >
							<Link to={"/"} className="hover:text-[#ff7637]">Home Page</Link>
						</span> 
						<span className="inline-block py-[1px] ">
							<img src="/images/bar.png" className="" alt="" />
						</span>
						<span className="text-[#FF7637] text-[16px] font-[600] leading-[20px]">Offers</span>
					</div>

					<div className="offers-page-content-wr">

						<div className="pb-[5%]">

							<div className="mb-[50px] mt-[25px]">
								{sectionHeader?.length < 0 ? (
									<Skeleton className="mb-[20px] h-[49px] w-[460px]" />
								) : (
									<h3 className="font-[800] font-['Oswald'] uppercase text-[34px] pb-[15px]" dangerouslySetInnerHTML={{ __html: sectionHeader[0]?.elementValue }} >
									</h3>
								)}

								{sectionHeader?.length < 0 ? (
									<Skeleton count={3} className="" />
								) : (
									<p>{sectionHeader[1]?.elementValue}</p>
								)}

							</div>

							<div className="offers-cards-wr ">

								{couponData?.length === 0 ? (<>
									<div style={{ backgroundColor: "transparent !important" }} className="flex gap-[25px] ">
										<Skeleton className="mb-[20px] h-[220px] w-[430px]" />
										<Skeleton className="mb-[20px] h-[220px] w-[430px]" />
										<Skeleton className="mb-[20px] h-[220px] w-[430px]" />

									</div>
								</>) : (

									couponData?.map(coupon => (
										<div className="980:w-[35%] 1200:w-[30%] 320:w-full 480:w-[80%] 650:w-[60%] 768:w-[45%]">
											<figure className="h-[250px] overflow-hidden">
												<img src={`${backend_url}/images/${coupon?.couponImage}`} className="object-cover w-full h-full" alt="Indore battery offer image" />
											</figure>
											<div className="bg-white offer-card-new px-[24px] py-[20px]">
												<p className="content-para" dangerouslySetInnerHTML={{__html: coupon?.couponDescription}}></p>
												<button onClick={() => openModal(coupon)} className="text-[#fa560b] font-['Sora'] font-[400] text-[16px] leading-[30px] mt-[5px]">Reveal</button>
											</div>
										</div>
									))
								)
								}
							</div>
						</div>
					</div>
					<Toaster className="z-[1001]" />
				</div>
			</section>
			<EnquirySection />
			<Footer />

			<div style={{ visibility: !openCopuonModal ? "hidden" : "visible", opacity: !openCopuonModal ? "0" : "1", transition: "all 0.2s" }} className="fixed z-[1000] top-[0] h-[100vh] bg-[rgba(0,0,0,0.6)] w-[100%]">
			
				<div className="w-[450px] rounded-[15px] mx-[auto] translate-y-[20%] offer-expanded-view">
					<div className="border-[1px] border-[rgba(0,0,0,0.15)] bg-[#fff]" style={{ borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px", borderTopRightRadius: "5px", borderTopLeftRadius: "5px" }}>
					<i onClick={closeModal} className="fa-solid fa-circle-xmark text-red-600 bg-[#fff] text-[25px] shadow-lg absolute right-[5%] top-[3%] z-[100] rounded-[50%] cursor-pointer" style={{ boxShadow: "1px 2px 5px rgba(0,0,0,0.5)" }}></i>
						<div style={{ transition: "all 0.4s ease"}} className="p-[20px] border-l-[#ff7637] border-l-[5px] mt-[15px] font-[Sora] bg-[#fff]">
							<h3 className="font-[Sora] font-[400]">Hi</h3>
							<span className="text-[rgba(0,0,0,0.5)]">You've unlocked an exclusive reward.</span>
						</div>

						<div className="my-[0px] py-[15px] mx-[30px] text-center border-y-[1px] for-mt border-dashed border-[rgba(0,0,0,0.35)] flex flex-col items-center justify-center" style={{ transition: "all 0.4s ease"}}>
							<span className="text-[16px] font-[Sora]">Coupon Code : <span className="uppercase font-[600]"> {couponCode}</span> <i onClick={() => handleCopyCoupon(`${couponCode}`)} className="fa-regular fa-copy text-[#ff7637] cursor-pointer"></i></span>
						</div>
						<div className="my-[0px] py-[15px] mx-[30px]  flex items-end flex-col" style={{ transition: "all 0.4s ease"}}>
							
							<span className="text-[14px] font-[Sora] text-[#ff7637]">Terms & Conditions</span>
						</div>
					</div>
					<div className="bg-[#fff] p-[20px] pb-[0] border-[1px] border-[rgba(0,0,0,0.15)] border-t-[1px]  border-t-[#ff7637]" style={{ borderTopStyle: "dashed", borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px", borderTopRightRadius: "5px", borderTopLeftRadius: "5px", transition: "all 0.4s ease", height: !openCopuonModal ? "0px" : "155px" }}>
						<img src="https://i.ibb.co/c8CQvBq/barcode.png" alt="Paypal Barcode" className="paypal__barcode" />
						<p className="py-[10px] text-center"><Link to="/"> Powered by Indore Battery</Link></p>
					</div>
				</div>
			</div>
		</>
	)
}

export default OffersPage;
	