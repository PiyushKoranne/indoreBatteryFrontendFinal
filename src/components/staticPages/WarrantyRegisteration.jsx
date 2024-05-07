import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import EnquirySection from "../common/EnquirySection";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { batteryIndoreDataService } from "../../services/dataService";
import { DatePicker, Select } from "antd";
import { Formik } from "formik";
import { ColorRing } from "react-loader-spinner";
import swal from "sweetalert";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { PiCaretDownBold } from "react-icons/pi";
import HeaderNew from "../common/HeaderNew";
import Meta from "../common/Meta";
import log from "../../utils/utilityFunctions";

function Warrantyregisteration() {
	const backend_url = import.meta.env.VITE_BACKEND_URL;
	const warrantyArr = [
		{ name: "24 Months" },
		{ name: "36 Months" },
		{ name: "48 Months" },
		{ name: "54 Months" },
	]
	const [warrantyData, setWarrantyData] = useState([]);
	const [pageData, setPageData] = useState([])
	const [brandNames, setBrandNames] = useState([]);

	async function getAllBatteryBrands() {
		const response = await axios.get(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-all-battery-brands`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
			}
		});
		setBrandNames(response?.data?.data);
	}

	function sleep(ms) {
		return new Promise(res => {
			setTimeout(() => {
				res();
			}, ms)
		})
	}

	async function getPageData() {
		await sleep(500);
		const response = await axios.get("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-page-content?pagename=warranty-registeration", {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
			}
		});
		log("this is data", response?.data?.pageData?.sections[1]?.sectionContent)
		setPageData(response?.data?.pageData?.sections[1]?.sectionContent)
	}

	async function getAllWarranties() {
		try {
			const response = await batteryIndoreDataService.getAllWarranties();
			if (response?.status === 200) {
				setWarrantyData(response?.data?.data);
			}
		} catch (error) {
			log("Error: While getting warranties data.", error);
		}
	}

	async function handleWarrantyResitration(values) {
		try {
			const response = await batteryIndoreDataService.registerWarranty(values);
			if (response.status === 200) {
				swal({
					icon: "success",
					title: "Your warranty is valid and has been registered.",
					timer: 2000
				});
			}
		} catch (error) {
			log(error);
		}
	}

	useEffect(() => {
		getPageData();
		getAllBatteryBrands();
		getAllWarranties();
	}, []);
	
	return (
		<>
			<Meta title="Warranty Registration | Indore Battery" />
			<HeaderNew />
			<section className="warranty-registeration-pg-wr bg-[#f7f7f7] relative py-[40px]">
				<figure className="absolute left-[15px] bottom-[15px]">
					<img src="/images/warranty-reg-bg-subtle.png" alt="" />
				</figure>
				<div className="center-wr">
					<div className="flex p-[8px] bg-[#F5F5F5] gap-[7px] items-center">
						<span className="320:text-[14px] 980:text-[16px] font-[600] leading-[20px]" >
							<Link to={"/"} className="hover:text-[#ff7637]">Home Page</Link>
						</span>
						<span className="inline-block py-[1px] ">
							<img src="/images/bar.png" className="" alt="" />
						</span>
						<span className="text-[#FF7637] 320:text-[14px] 980:text-[16px] font-[600] leading-[20px]">Warranty Registration</span>
					</div>
					<div className="flex flex-wrap 320:pt-0 pt-[30px]">
						<div className="1024:w-[50%] 320:w-full 1200:pt-[60px] 320:pt-[25px]">
							<div className="warranty-heading-cont">
								<h3 className="font-['Oswald'] font-[700] leading-[68px] text-[34px] 320:text-center 1024:text-left"><strong>WARRANTY</strong> REGISTRATION</h3>
							</div>
							<p className="content-para 320:text-center 1024:text-left">
								At Indore Battery, our commitment to your satisfaction extends beyond the purchase – it's about ensuring that you experience reliable and lasting power solutions. We value your trust in us, and to solidify this bond, we offer a seamless warranty registration process for all our products.
							</p>
						</div>
						<div className="1024:w-[50%] 320:w-full">
							<figure className="flex justify-center relative">
								<img src="/images/warranty-reg-banner.png" className="1368:w-[526px] 1024:w-[450px]  1024:h-auto 1368:h-[385px] 320:w-full 560:w-[80%] 768:w-[70%] 980:w-[60%] 320:h-auto relative 320:bottom-[-40px]  1024:bottom-0 1200:bottom-[-75px]" alt="" />
							</figure>
						</div>
					</div>
				</div>
			</section>

			<section>
				<div className="center-wr">
					<div className="1200:pt-[110px] 320:pt-[50px] 1200:pb-[90px]">
						<h3 className="font-['Sora] text-[21px] font-[700] leading-[31px] uppercase mb-[50px] 320:text-center 1024:text-left">Why register your warranty with indore battery?</h3>

						{/* ENTRY */}
						<div className="flex 320:flex-wrap 1024:flex-nowrap items-stretch 320:justify-center 1024:justify-start 1200:my-[50px] 320:my-[25px]">
							<figure className="1024:px-[20px] 320:px-0">
								<img src="/images/warranty-reg-icon-setting.png" className="1024:w-[60px] 1024:h-auto h-[40px] 320:w-[35px] 320:h-auto" alt="" />
							</figure>
							<div className="320:mt-[15px] 1024:mt-0">
								<h4 className="font-[600] text-[16px] leading-[20px] font-['Sora']  mb-[15px] 320:text-center 1024:text-left">Swift Assistance</h4>
								<p className="font-[400] text-[16px] leading-[30px] 320:text-center 1024:text-left">In the rare event that you encounter any issues with your Indore Battery product, a registered warranty allows us to expedite our assistance. Quick identification of your purchase through the registration process ensures prompt and efficient resolution of any concerns you may have.</p>
							</div>
						</div>

						{/* ENTRY */}
						<div className="flex 320:flex-wrap 1024:flex-nowrap items-stretch 320:justify-center 1024:justify-start 1200:my-[50px] 320:my-[45px]">
							<figure className="1024:px-[20px] 320:px-0">
								<img src="/images/warranty-reg-icon-offer.png" className="1024:w-[60px] 1024:h-auto h-[40px] 320:w-[35px] 320:h-auto" alt="" />
							</figure>
							<div className="320:mt-[15px] 1024:mt-0">
								<h4 className="font-[600] text-[16px] leading-[20px] font-['Sora'] 320:text-center mb-[15px] 1024:text-left">Exclusive Offers</h4>
								<p className="font-[400] text-[16px] leading-[30px] 320:text-center 1024:text-left">Registered customers at Indore Battery are often eligible for exclusive offers, promotions, and product updates. By keeping your warranty information up to date, you unlock the potential for special deals and discounts tailored to enhance your experience.</p>
							</div>
						</div>

						<h3 className="font-['Sora] text-[21px] font-[700] leading-[31px] uppercase mb-[50px] 320:text-center 1024:text-left">How to register your warranty?</h3>

						{/* ENTRY */}
						<div className="flex 320:flex-wrap 320:flex-col 1024:flex-row 1024:flex-nowrap 320:items-center 1024:items-stretch 320:justify-center 1024:justify-start 1200:my-[50px] 320:my-[25px]">
							<figure className="1024:px-[20px] 320:px-0">
								<img src="/images/warranty-reg-icon-visit.png" className="1200:w-[28px] 1024:w-[20px] 320:w-[35px] 320:h-auto" alt="" />
							</figure>
							<div className="320:mt-[15px] 1024:mt-0">
								<h4 className="font-[600] text-[16px] leading-[20px] font-['Sora'] 320:text-center mb-[15px] 1024:text-left">Visit Our Website</h4>
								<p className="font-[400] text-[16px] leading-[30px] 320:text-center 1024:text-left">Head to our official website and navigate to the "Warranty registration" section.</p>
							</div>
						</div>

						{/* ENTRY */}
						<div className="flex 320:flex-wrap 320:flex-col 1024:flex-row 1024:flex-nowrap 320:items-center 1024:items-stretch 320:justify-center 1024:justify-start 1200:my-[50px] 320:my-[25px]">
							<figure className="1024:px-[20px] 320:px-0">
								<img src="/images/warranty-reg-icon-details.png" className="1024:w-[40px] 320:w-[35px] 320:h-auto" alt="" />
							</figure>
							<div className="320:mt-[15px] 1024:mt-0">
								<h4 className="font-[600] text-[16px] leading-[20px] font-['Sora'] 320:text-center mb-[15px] 1024:text-left">Enter Details</h4>
								<p className="font-[400] text-[16px] leading-[30px] 320:text-center 1024:text-left">Provide the necessary details, including your purchase date, product serial number, and personal information. This information is crucial for us to validate and process your warranty efficiently.</p>
							</div>
						</div>

						{/* ENTRY */}
						<div className="flex 320:flex-wrap 320:flex-col 1024:flex-row 1024:flex-nowrap 320:items-center 1024:items-stretch 320:justify-center 1024:justify-start 1200:my-[50px] 320:my-[25px]">
							<figure className="1024:px-[20px] 320:px-0">
								<img src="/images/warranty-reg-icon-confirm.png" className="1024:w-[40px] 320:w-[35px] 320:h-auto" alt="" />
							</figure>
							<div className="320:mt-[15px] 1024:mt-0">
								<h4 className="font-[600] text-[16px] leading-[20px] font-['Sora'] 320:text-center mb-[15px] 1024:text-left">Confirm Registration</h4>
								<p className="font-[400] text-[16px] leading-[30px] 320:text-center 1024:text-left">Once you've entered the required information, simply confirm your warranty registration. You'll receive a confirmation email, and your product is now officially registered under our warranty program.</p>
							</div>
						</div>

					</div>
				</div>
			</section>

			<section className="relative z-[0] overflow-hidden">
				<figure className="z-[-2] absolute 320:h-full w-full">
					<img src="/images/warranty-reg-bottom-banner.png" className="320:object-cover 320:h-full w-full object-center" alt="" />
				</figure>
				<div className="absolute bg-[rgba(0,0,0,0.8)] left-0 right-0 top-0 bottom-0 z-[-1]"></div>
				<div className="center-wr">
					<div className="py-[50px] warranty-reg-commitment-banner">

						<h3 className="font-['Oswald'] font-[700] leading-[68px] text-[34px] uppercase text-center text-white"><strong>Our</strong> Warranty commitment</h3>

						<p className="content-para-white text-center my-[15px] 1200:px-[70px] 320:px-0">At Indore Battery, we stand by the quality of our products. Our warranty program reflects our confidence in the durability and performance of our batteries, be it for your car, bike, or inverter. We strive to make the warranty registration process simple and accessible, ensuring that you experience the full benefits of our commitment to customer satisfaction.</p>

						<p className="content-para-white text-center my-[15px] mt-[30px] 1200:px-[100px] 320:px-0">Thank you for choosing Indore Battery. Your trust is our driving force, and we look forward to providing you with uninterrupted power solutions backed by our reliable warranty coverage.</p>

					</div>
				</div>
			</section>

			<section className="1200:pb-[100px]" >
				<div className="center-wr">
					<div className="flex flex-wrap gap-[30px] warranty-registeration-content-cont 1024:py-[100px] 320:pt-[0px] pb-[260px] 320:pb-[25px]">
						<div className="1024:w-[50%] 320:w-full">
							<figure className="w-[60%] 320:hidden 1024:block 1024:ml-[150px] ml-[180px] 320:ml-0 ">
								<img src="/images/superHeroImg.png" alt="warranty registration vector image" />
							</figure>
						</div>
						<div></div>

						<div className="1024:w-[38%] 320:w-full 650:w-[80%] 768:w-[70%] mx-[auto] bg-[#f0f0f0] px-[40px] 320:px-[10px] 375:px-[20px] 560:px-[40px] 1024:px-[20px] py-[30px] h-[fit-content] warranty-registeration-form-wr">
							<Formik
								initialValues={{ customerName: '', brand: '', batteryNumber: '', purchaseDate: '', warranty: '' }}
								validate={(values) => {
									const errors = {};
									if (!values.customerName) errors.customerName = "Name is required";
									if (!values.brand) errors.brand = "Brand is required";
									if (!values.batteryNumber) errors.batteryNumber = "Battery Number is required";
									if (!values.purchaseDate) errors.purchaseDate = "Purchase date is required";
									if (!values.warranty) errors.warranty = "Warranty type is required";
									return errors;
								}}
								onSubmit={(values, { setSubmitting }) => {
									setTimeout(() => {
										log(values);
										handleWarrantyResitration(values);
										setSubmitting(false);
									}, 400)
								}}
							>
								{({ isSubmitting, values, touched, handleChange, handleBlur, handleSubmit, setFieldValue, dirty, errors }) => (
									<form onSubmit={handleSubmit}>
										<h3 className="text-[26px] pb-[25px] 320:pb-[0px]">SEND US A MESSAGE</h3>

										<div className="pt-[20px] relative">
											{touched.customerName && errors.customerName && <span className="absolute left-0 top-[4px] text-red-600 text-[13px] font-medium">{errors.customerName}</span>}
											<input name="customerName" value={values.customerName} onChange={handleChange} onBlur={handleBlur} className={`w-full  rounded-[0] p-[10px]  focus:outline-none border-[1px] bg-[#fff] ${(touched.customerName && errors.customerName) ? 'border-red-600':'border-transparent'}`} placeholder="Customer Name" />
										</div>

										<div className="pt-[20px] relative">
											{touched.brand && errors.brand && <span className="absolute  left-0 top-[4px] text-red-600 text-[13px] font-medium">{errors.brand}</span>}
											<Select
												suffixIcon={<PiCaretDownBold className="text-[#202020] text-[16px] font-bold" />}
												variant="borderless"
												name="brand"
												defaultValue=""
												className={`w-full py-[6px]  bg-white rounded-none focus:outline-none  bg-[transparent] batt-form-select border-[1px] ${(touched.brand && errors.brand) ? 'border-red-600':'border-transparent'}`}
												onChange={(val) => { setFieldValue("brand", val) }}
												onBlur={handleBlur}
												options={[{ value: "", label: "Brand" }, ...brandNames?.map((item, index) => ({ value: item?.brandName, label: item?.brandName }))]}
											/>
										</div>

										<div className="pt-[20px] relative">
											{touched.batteryNumber && errors.batteryNumber && <span className="absolute left-0 top-[4px] text-red-600 text-[13px] font-medium">{errors.batteryNumber}</span>}
											<input value={values.batteryNumber} onChange={handleChange} onBlur={handleBlur} name="batteryNumber" className={`w-full  rounded-[0] p-[10px]  focus:outline-none bg-[#fff] border-[1px] ${(touched.batteryNumber && errors.batteryNumber) ?  'border-red-600':'border-transparent'}`} placeholder="Battery Number" />
										</div>

										<div className="warranty-date-picker pt-[20px] relative">
											{touched.purchaseDate && errors.purchaseDate && <span className="absolute left-0 top-[4px] text-red-600 text-[13px] font-medium">{errors.purchaseDate}</span>}
											<DatePicker name="purchaseDate" onBlur={handleBlur} onChange={(date, dateString) => { setFieldValue('purchaseDate', date.toString()) }} className={`warranty-reg-date-pick w-full p-[10px] bg-white border-[1px] ${(touched.purchaseDate && errors.purchaseDate) ? 'error':'border-transparent'}`} variant="borderless" />
										</div>

										<div className="pt-[20px] relative">
											{touched.warranty && errors.warranty && <span className="absolute left-0 top-[4px] text-red-600 text-[13px] font-medium">{errors.warranty}</span>}
											<Select
												suffixIcon={<PiCaretDownBold className="text-[#202020] text-[16px] font-bold" />}
												variant="borderless"
												name="warranty"
												defaultValue=""
												className={`w-full py-[6px] rounded-none bg-white  focus:outline-none  bg-[transparent] batt-form-select border-[1px] ${(touched.warranty && errors.warranty) ? 'border-red-600':'border-transparent'}`}
												onChange={(val) => { setFieldValue("warranty", val) }}
												onBlur={handleBlur}
												options={[{ value: "", label: "Warranty" }, ...warrantyData?.map((item, index) => ({ value: item?.postData?.totalWarranty, label: `${item.postData?.totalWarranty} Months (FR:${item?.postData?.fullReplacementWarranty} PR:${item.postData?.proRataWarranty})` }))]}
											/>
										</div>

										<button
											type="submit"
											className="btn-special-spread mt-[30px] px-[15px] w-[46%] text-[18px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]">
											{
												isSubmitting ? (
													<ColorRing
														visible={true}
														height="50"
														width="50"
														ariaLabel="color-ring-loading"
														wrapperStyle={{}}
														wrapperClass="color-ring-wrapper mx-auto my-0"
														colors={['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']}
													/>
												) : (
													<span className="leading-[50px]">Submit</span>
												)
											}
										</button>
									</form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</section>
			<EnquirySection />
			<Footer />
		</>
	)
}

export default Warrantyregisteration;
