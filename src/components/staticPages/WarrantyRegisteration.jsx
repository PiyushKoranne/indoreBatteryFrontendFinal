import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import EnquirySection from "../common/EnquirySection";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { batteryIndoreDataService } from "../../services/dataService";
import { DatePicker } from "antd";
import { Formik } from "formik";
import { ColorRing } from "react-loader-spinner";
import swal from "sweetalert";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

function WarrantyRegisteration() {
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
		const response = await axios.get(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-all-battery-brands`);
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
		const response = await axios.get("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-page-content?pagename=warranty-registeration")
		console.log("this is data", response?.data?.pageData?.sections[1]?.sectionContent)
		setPageData(response?.data?.pageData?.sections[1]?.sectionContent)
	}

	async function getAllWarranties() {
		try {
			const response = await batteryIndoreDataService.getAllWarranties();
			if (response?.status === 200) {
				setWarrantyData(response?.data?.data);
			}
		} catch (error) {
			console.log("Error: While getting warranties data.", error);
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
			console.log(error);
		}
	}

	useEffect(() => {
		getPageData();
		getAllBatteryBrands();
		getAllWarranties();
	}, [])

	return (
		<>
			<Header />
			<section className="warranty-registeration-pg-wr bg-[#f7f7f7] relative">
				<figure className="absolute left-[15px] bottom-[15px]">
					<img src="/images/warranty-reg-bg-subtle.png" alt="" />
				</figure>
				<div className="center-wr">
					<div className="flex p-[8px] gap-[7px] mt-[75px]">
						<span><Link to={"/"} className="hover:text-[#ff7637]">Home</Link></span> &gt; <span className="text-[#FF7637] font-[600]">Warranty Registeraton</span>
					</div>
					<div className="flex pt-[30px]">
						<div className="w-[50%] pt-[60px]">
							<div className="warranty-heading-cont">
								<h3 className="font-['Oswald'] font-[700] leading-[68px] text-[34px]"><strong>WARRANTY</strong> REGISTERATION</h3>
							</div>
							<p className="content-para">
								At Indore Battery, our commitment to your satisfaction extends beyond the purchase – it's about ensuring that you experience reliable and lasting power solutions. We value your trust in us, and to solidify this bond, we offer a seamless warranty registration process for all our products.
							</p>
						</div>
						<div className="w-[50%]">
							<figure className="flex justify-center relative">
								<img src="/images/warranty-reg-banner.png" className="w-[526px] h-[385px] relative bottom-[-75px]" alt="" />
							</figure>
						</div>
					</div>
				</div>
			</section>

			<section>
				<div className="center-wr">
					<div className="pt-[110px] pb-[90px]">
						<h3 className="font-['Sora] text-[21px] font-[700] leading-[31px] uppercase mb-[50px]">Why register your warranty with indore battery?</h3>

						{/* ENTRY */}
						<div className="flex items-stretch my-[50px]">
							<figure className="px-[20px]">
								<img src="/images/warranty-reg-icon-setting.png" className="w-[60px] h-[40px]" alt="" />
							</figure>
							<div>
								<h4 className="font-[600] text-[16px] leading-[20px] font-['Sora'] mb-[15px]">Swift Assistance</h4>
								<p className="font-[400] text-[16px] leading--[30px]">In the rare event that you encounter any issues with your Indore Battery product, a registered warranty allows us to expedite our assistance. Quick identification of your purchase through the registration process ensures prompt and efficient resolution of any concerns you may have.</p>
							</div>
						</div>

						{/* ENTRY */}
						<div className="flex items-stretch my-[50px]">
							<figure className="px-[20px]">
								<img src="/images/warranty-reg-icon-offer.png" className="w-[60px] h-[40px]" alt="" />
							</figure>
							<div>
								<h4 className="font-[600] text-[16px] leading-[20px] font-['Sora'] mb-[15px]">Exclusive Offers</h4>
								<p className="font-[400] text-[16px] leading--[30px]">Registered customers at Indore Battery are often eligible for exclusive offers, promotions, and product updates. By keeping your warranty information up to date, you unlock the potential for special deals and discounts tailored to enhance your experience.</p>
							</div>
						</div>

						<h3 className="font-['Sora] text-[21px] font-[700] leading-[31px] uppercase mb-[50px]">How to register your warranty?</h3>

						{/* ENTRY */}
						<div className="flex items-stretch my-[50px]">
							<figure className="px-[20px]">
								<img src="/images/warranty-reg-icon-visit.png" className="w-[28px]" alt="" />
							</figure>
							<div>
								<h4 className="font-[600] text-[16px] leading-[20px] font-['Sora'] mb-[15px]">Visit our Website</h4>
								<p className="font-[400] text-[16px] leading--[30px]">Head to our official website and navigate to the "Warranty Registration" section.</p>
							</div>
						</div>

						{/* ENTRY */}
						<div className="flex items-stretch my-[50px]">
							<figure className="px-[20px]">
								<img src="/images/warranty-reg-icon-details.png" className="w-[40px]" alt="" />
							</figure>
							<div>
								<h4 className="font-[600] text-[16px] leading-[20px] font-['Sora'] mb-[15px]">Enter Details</h4>
								<p className="font-[400] text-[16px] leading--[30px]">Provide the necessary details, including your purchase date, product serial number, and personal information. This information is crucial for us to validate and process your warranty efficiently.</p>
							</div>
						</div>

						{/* ENTRY */}
						<div className="flex items-stretch my-[50px]">
							<figure className="px-[20px]">
								<img src="/images/warranty-reg-icon-confirm.png" className="w-[40px]" alt="" />
							</figure>
							<div>
								<h4 className="font-[600] text-[16px] leading-[20px] font-['Sora'] mb-[15px]">Confirm Registration</h4>
								<p className="font-[400] text-[16px] leading--[30px]">Once you've entered the required information, simply confirm your warranty registration. You'll receive a confirmation email, and your product is now officially registered under our warranty program.</p>
							</div>
						</div>

					</div>
				</div>
			</section>

			<section className="bg-[rgba(0,0,0,0.8)] relative z-1 overflow-hidden">
				<figure className="z-[-1] absolute">
					<img src="/images/warranty-reg-bottom-banner.png" alt="" />
				</figure>
				<div className="center-wr">
					<div className="py-[50px] warranty-reg-commitment-banner">

						<h3 className="font-['Oswald'] font-[700] leading-[68px] text-[34px] uppercase text-center text-white"><strong>Our</strong> Warranty commitment</h3>

						<p className="content-para-white text-center my-[15px] px-[70px]">At Indore Battery, we stand by the quality of our products. Our warranty program reflects our confidence in the durability and performance of our batteries, be it for your car, bike, or inverter. We strive to make the warranty registration process simple and accessible, ensuring that you experience the full benefits of our commitment to customer satisfaction.</p>

						<p className="content-para-white text-center my-[15px] mt-[30px] px-[100px]">Thank you for choosing Indore Battery. Your trust is our driving force, and we look forward to providing you with uninterrupted power solutions backed by our reliable warranty coverage.</p>

					</div>
				</div>
			</section>

			<section>
				<div className="center-wr">
					<div className="flex gap-[30px] warranty-registeration-content-cont py-[100px] pb-[260px]">
						<div className="w-[50%]">
							<figure className="w-[60%] ml-[180px] ">
								<img src="/images/superHeroImg.png" alt="warranty registeration vector image" />
							</figure>
						</div>
						<div></div>

						<div className="w-[38%] mx-[auto] bg-[#f0f0f0] px-[40px] py-[30px] h-[fit-content] warranty-registeration-form-wr">
							<Formik
								initialValues={{ customerName: '', brand: '', batteryNumber: '', purchaseDate: '', warranty: '' }}
								validate={(values) => {
									const errors = {};
									if (!values.customerName) errors.customerName = "* Name is required";
									if (!values.brand) errors.brand = "* Brand is required";
									if (!values.batteryNumber) errors.batteryNumber = "* Battery Number is required";
									if (!values.purchaseDate) errors.purchaseDate = "* Purchase date is required";
									if (!values.warranty) errors.warranty = "* Warranty type is required";

									return errors;

								}}
								onSubmit={(values, { setSubmitting }) => {
									setTimeout(() => {
										console.log(values);
										handleWarrantyResitration(values);
										setSubmitting(false);
									}, 400)
								}}
							>
								{({ isSubmitting, values, touched, handleChange, handleBlur, handleSubmit, setFieldValue, dirty, errors }) => (
									<form onSubmit={handleSubmit}>
										<h3 className="text-[26px] pb-[25px]">SEND US A MESSAGE</h3>

										<div className="pt-[20px] relative">
											{touched.customerName && errors.customerName && <span className="absolute left-0 top-[4px] text-rose-500 text-[13px] font-medium">{errors.customerName}</span>}
											<input name="customerName" value={values.customerName} onChange={handleChange} onBlur={handleBlur} className="w-full  rounded-[0] p-[10px]  focus:outline-none  bg-[#fff]" placeholder="Customer Name" />
										</div>

										<div className="pt-[20px] relative">
											{touched.brand && errors.brand && <span className="absolute  left-0 top-[4px] text-rose-500 text-[13px] font-medium">{errors.brand}</span>}
											<select
												name="brand"
												value={values.brand}
												onChange={handleChange}
												onBlur={handleBlur}
												className="w-full  rounded-[0] p-[10px]  focus:outline-none  bg-[#fff]">
												<option value="">Brand</option>
												{
													brandNames?.map(item => (
														<option value={item.brandName}>{item.brandName}</option>
													))
												}
											</select>
										</div>

										<div className="pt-[20px] relative">
											{touched.batteryNumber && errors.batteryNumber && <span className="absolute left-0 top-[4px] text-rose-500 text-[13px] font-medium">{errors.batteryNumber}</span>}
											<input value={values.batteryNumber} onChange={handleChange} onBlur={handleBlur} name="batteryNumber" className="w-full  rounded-[0] p-[10px]  focus:outline-none  bg-[#fff]" placeholder="Battery Number" />
										</div>

										<div className="warranty-date-picker pt-[20px] relative">
											{touched.purchaseDate && errors.purchaseDate && <span className="absolute left-0 top-[4px] text-rose-500 text-[13px] font-medium">{errors.purchaseDate}</span>}
											<DatePicker name="purchaseDate" onBlur={handleBlur} onChange={(date, dateString) => { setFieldValue('purchaseDate', date.toString()) }} className="w-full p-[10px] bg-white" variant="borderless" />
										</div>

										<div className="pt-[20px] relative">
											{touched.warranty && errors.warranty && <span className="absolute left-0 top-[4px] text-rose-500 text-[13px] font-medium">{errors.warranty}</span>}
											<select
												name="warranty"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.warranty}
												className="w-full rounded-[0] p-[10px] focus:outline-none bg-[#fff]">
												<option value="">Warranty By Month </option>
												{
													warrantyData?.map(item => item?.postData?.totalWarranty && (
														<option value={item?.postData?.totalWarranty}>{`${item.postData?.totalWarranty} Months (FR:${item?.postData?.fullReplacementWarranty} PR:${item.postData?.proRataWarranty})`} </option>
													))
												}
											</select>
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

export default WarrantyRegisteration;
