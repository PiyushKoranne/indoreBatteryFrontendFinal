import React, { useState, useEffect } from "react";
import { batteryIndoreDataService } from "../../services/dataService";
import { Link, useNavigate } from "react-router-dom";
import log from "../../utils/utilityFunctions";
import { Formik } from "formik";
import swal from "sweetalert";
import { ColorRing } from "react-loader-spinner";
import {Select} from "antd"
import ConstantService, { batteryIndoreConstantService } from "../../services/constantsService";
import FreeToCallStrip from "./FreeToCallStrip";

function EnquirySection({ pageData }) {
	log('enquiry section rendering');
	const navigate = useNavigate();
	const [carBrands, setCarBrands] = useState([]);
	const [bikeBrands, setBikeBrands] = useState([]);
	const [inverterBrands, setInverterBrands] = useState([]);
	const [contactDetails, setContactDetails] = useState(null);

	const statesAndCities = ConstantService.indianStatesAndCities;
	const states = ConstantService.indianStatesAndCities?.map(item => item.state);

	async function getCarBrands() {
		const response = await batteryIndoreDataService.getAllCarBrands();
		setCarBrands(response?.data);
		log(response?.data);
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

	async function getBikeBrands() {
		const response = await batteryIndoreDataService.getAllTwoWheelerBrands();
		setBikeBrands(response?.data?.products);
	}

	async function getInverterBrands() {
		const response = await batteryIndoreDataService.getAllInverterBrands();
		setInverterBrands(response.data?.products);
	}

	async function handleSubmitEnquiry(values) {
		const response = await batteryIndoreDataService.makeCallbackRequest(values);
		if(response.status === 200) {
			swal({
				icon: "success",
				title: "Our team will reach to you as soon as possible",
				showConfirmButton: false,
				timer: 2000
			});
		}
	}

	useEffect(() => {
		getCarBrands();
		getBikeBrands();
		getInverterBrands();
		getContactDetails();
	}, []);

	return (
		<>
			<section className="enquiry-section-bg relative pt-[100px] 320:pt-[50px] 1200:mt-[150px] 1200:pt-[180px]">
				<div className="center-wr">
						<FreeToCallStrip />
					<div className="flex relative 1200:pt-[50px] 320:pt-[20px] 320:flex-wrap 320:justify-between ">
						<figure className="flex items-center absolute top-[80px] 320:top-[-50px] 1200:top-[0px] 1200:translate-y-[-50%]">
							<img src="/images/logo.svg" className="320:w-[35px] 1200:w-[50px]" alt="" />
							<h3 className="font-[700] leading-[68px] text-[24px] 320:text-[16px] 1200:text-[24px] uppercase inline-block ml-[20px] ">Indore Battery</h3>
						</figure>
						
						<div className="flex battery-types-list-wr 320:w-full 980:w-fit w-[59%] gap-[100px] 320:gap-[0px] flex-wrap justify-between">
							<div className="320:w-full 375:w-fit 1200:w-[240px] "> 
								<span className="mb-[15px] inline-block mt-[30px] text-[16px] font-[700] uppercase font-['Oswald']">CAR BATTERY</span>
								<ul className="w-[200px] 320:w-full 320:text-[14px] 1368:text-[16px]">
									{carBrands?.map((item, index) => (
										<li key={index}><Link to={`/categories/car-batteries/models/${encodeURIComponent(item?.postData?.brandName)}`} state={item?.postData} >{item?.postData?.brandName}</Link></li>
									))
									}
								</ul>
							</div>
							<div className="320:hidden 650:block  ">
								<div className="1440:w-[240px]">
									<span className="mb-[15px] inline-block mt-[30px] text-[16px] font-[700] uppercase font-['Oswald']">Bike Battery</span>
									<ul className="w-[200px] 320:text-[14px] 1368:text-[16px]">
										{bikeBrands?.map((brand, index) => (
											<li className="cursor-pointer transition-all capitalize" key={index}>
												<Link to={`/categories/two-wheeler-batteries/models/${encodeURIComponent(brand?.postData?.brandName)}`} state={brand?.postData} >{brand?.postData?.brandName}</Link>
											</li>
										))
										}
									</ul>
								</div>
								<div>
									<span className="mb-[15px] inline-block mt-[30px] text-[16px] font-[700] uppercase font-['Oswald']">Inverter Battery</span>
									<ul className="320:text-[14px] 1368:text-[16px]">
										{/* <li>Choose a brand</li> */}
										{inverterBrands?.map((brand, index) => (
											<li className="cursor-pointer transition-all capitalize" key={index}><Link to={`/categories/inverter-batteries/${encodeURIComponent(brand?.postData?.brandName)}`} state={brand?.postData} >{brand?.postData?.brandName}</Link></li>
										))
										}
									</ul>
								</div>
							</div>
							<div className="320:w-full 375:w-fit 1400:w-[240px]  1200:w-[240px]">
								<div>
									<span className="mb-[15px] inline-block mt-[30px] text-[16px] font-[700] uppercase font-['Oswald']">Company Info</span>
									<ul className="320:text-[14px] 1368:text-[16px]">
										<li><Link to="/about-us">About Us</Link></li>
										<li><Link to="/contact-us">Contact Us</Link></li>
										<li><Link to="/offers">Special Offers</Link></li>
										<li><Link to="/warranty-registeration">Warranty Registration</Link></li>
									</ul>
								</div>
								<div>
									<span className="mb-[15px] inline-block mt-[30px] text-[16px] font-[700] uppercase font-['Oswald']">Company Policy</span>
									<ul className="320:text-[14px] 1368:text-[16px]">
										<li>Terms & Conditions</li>
										<li><Link to="/privacy-policy">Privacy Policy</Link></li>
										<li><Link to="/faq"> FAQs</Link></li>
										<li>Delivery Policy</li>
										<li>How to buy</li>
										<li><Link to="/warranty-registeration">Warranty</Link></li>
									</ul>

								</div>
							</div>
						</div>

						<div className="320:w-full flex flex-wrap 980:w-[375px]  px-[10px] 1368:w-[40%]">
							{/* right data */}
							<div className="320:w-full 768:w-[50%] 980:w-[375px] 1200:w-[420px] mt-[20px] 320:ml-0 ml-[30%]">
								<h3 className="font-[600] text-[24px]">GET AN ENQUIRY</h3>
								<Formik
									enableReinitialize
									initialValues={{name:'', city:'', state:'', contactNum:'', enquiry:''}}
									validate={(values) => {
										let errors = {};
										if(!values.name) errors.name = "* Name is required";
										else if(values.name.length < 3) errors.name = "* Name is be atleast three characters";
										if(!values.city) errors.city = "* City is required";
										if(!values.state) errors.state = "* State is required";
										if(!values.contactNum) errors.contactNum = "* Phone is required";
										if(!values.enquiry) errors.enquiry = "* Please write an enquiry";

										return errors;
									}}
									onSubmit={(values, {setSubmitting,resetForm}) => {
										setTimeout(()=>{
											handleSubmitEnquiry(values);
											setSubmitting(false);
											resetForm(true);
										},400)
									}}
								>
									{
										({values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting}) => (
											<form id="footer-enquiry-form" onSubmit={handleSubmit} className="flex flex-col">

												<div className="relative pt-[20px] mt-[10px]">
													{ touched.name && errors.name && <span className="font-medium text-red-500 text-[14px] absolute left-0 top-[2px]" >{errors.name}</span>}
													<input name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} className={`w-full  solid p-[10px] focus:outline-none border-[1px] ${(touched.name && errors.name) ? 'border-red-500':' border-[rgba(0,0,0,0.2)]' }`} type="text" placeholder="Name" />
												</div>

												<div className="relative pt-[20px]">
													{ touched.contactNum && errors.contactNum && <span className="font-medium text-red-500 text-[14px] absolute left-0 top-[2px]" >{errors.contactNum}</span>}
													<input maxLength={10} name="contactNum" value={values.contactNum} onChange={handleChange} onBlur={handleBlur} className={`w-full solid p-[10px] focus:outline-none border-[1px] ${ (touched.contactNum && errors.contactNum) ? 'border-red-500':'border-[rgba(0,0,0,0.2)]'}`} type="text" placeholder="Phone" />
												</div>

												<div className="relative pt-[20px]">
													{ touched.state && errors.state && <span className="font-medium text-red-500 text-[14px] absolute left-0 top-[2px]" >{errors.state}</span>}
													<Select 
														variant="borderless"
														className={`w-full bg-white h-[45px] solid focus:outline-none border-[1px] ${ (touched.state && errors.state) ? 'border-red-500' : 'border-[rgba(0,0,0,0.2)]'}`}
														defaultValue={""}
														onChange={(val) => { setFieldValue('state', val)}}
														options={[ {value:'', label:"Choose a state"}, ...states.map(item => ({value: item, label: item}))]}
													/>
												</div>
												<div className="relative pt-[20px]">
													{ touched.city && errors.city && <span className="font-medium text-red-500 text-[14px] absolute left-0 top-[2px]" >{errors.city}</span>}
													<Select 
														variant="borderless"
														className={`w-full bg-white h-[45px] solid focus:outline-none border-[1px] ${ (touched.state && errors.state) ? 'border-red-500' : 'border-[rgba(0,0,0,0.2)]'}`}
														defaultValue={""}
														onChange={(val) => { setFieldValue('city', val)}}
														options={
															values?.state ? 
															[ {value:'', label:'Choose a city'}, ...statesAndCities.filter(item => item.state === values.state)[0]?.cities.map(item => ({value:item, label:item}))]
															:
															[{value:'', label:'Choose a city'}]
														}
													/>
												</div>

												<div className="relative pt-[20px]">
													{ touched.enquiry && errors.enquiry && <span className="font-medium text-red-500 text-[14px] absolute left-0 top-[2px]" >{errors.enquiry}</span>}
													<textarea name="enquiry" value={values.enquiry} onChange={handleChange} onBlur={handleBlur} className={`w-full solid p-[10px] focus:outline-none border-[1px] ${ (touched.enquiry && errors.enquiry) ? 'border-red-500' : 'border-[rgba(0,0,0,0.2)]'}`} style={{ resize: "none" }} cols="30" rows="5" placeholder="Message"></textarea>
												</div>

												<button className="btn-special-spread 1368:w-1/2 1749:w-[50%] pl-[20px] pr-[20px] mt-[30px] 1368:text-[18px] 320:text-[14px] 980:text-[16px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#1B283A] 320:py-[6px]">
													<span className="320:leading-[25px] 1749:leading-[50px]">{ isSubmitting ? <ColorRing
														visible={true}
														height="50"
														width="50"
														ariaLabel="color-ring-loading"
														wrapperStyle={{}}
														wrapperClass="color-ring-wrapper mx-auto my-0"
														colors={['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']}
													/> : 'Submit'}</span>
												</button>
											</form>
										)
									}
								</Formik>
							</div>

							<div className="w-[90%] 768:w-[50%] 980:w-[200px]  320:w-full mt-[20px] 1368:mt-[50px] 320:ml-0 ml-[30%] 320:p-[20px] 768:pt-[0px] 768:mb-[15px] 980:px-[0px]">
								<span className="inline-block 320:text-[16px] 980:text-[16px] font-[700] uppercase font-['Oswald'] text-center 980:text-left w-full 980: mb-[25px]">Social Media</span>
								<ul className="flex gap-[20px] social-icons-list items-center justify-center 980:justify-start">
									<li className="relative  flex items-center justify-center w-[45px] h-[45px] rounded-full"><a href={contactDetails?.sectionContent?.filter(item=>item?.elementAttrName === 'twitter')[0]?.elementValue}><i className="fa-brands fa-twitter"></i></a></li>
									<li className="relative  flex items-center justify-center w-[45px] h-[45px] rounded-full"><a href={contactDetails?.sectionContent?.filter(item=>item?.elementAttrName === 'instagram')[0]?.elementValue}><i className="fa-brands fa-instagram"></i></a></li>
									<li className="relative  flex items-center justify-center w-[45px] h-[45px] rounded-full"><a href={contactDetails?.sectionContent?.filter(item=>item?.elementAttrName === 'facebook')[0]?.elementValue}><i className="fa-brands fa-facebook-f"></i></a></li>
								</ul>
							</div>
						</div>
					</div>

					<div className=" footer-banner-after-elem-wr py-[40px] mt-[15px] 320:hidden 850:block">
						<ul className="banner-after-elem-cont flex items-center">
							<li className="footer-banner-after-elem w-[20%]">
								<figure className=" w-[140px] h-[58px] mb-[0px] ml-[auto] mr-[auto] mt-[0]">
									<img src="/images/freeShippingFtr.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
								</figure>
								<figcaption className="font-semibold font-['Oswald'] 850:text-[16px] 1200:text-[18px] text-center w-[140px] mx-auto">FREE SHIPPING</figcaption>
							</li>
							<li className="footer-banner-after-elem w-[20%]">
								<figure className=" w-[140px] h-[58px] mb-[0px] ml-[auto] mr-[auto] mt-[0]">
									<img src="/images/freeInstallationFtr.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
								</figure>
								<figcaption className="font-semibold font-['Oswald'] 850:text-[16px] 1200:text-[18px] text-center w-[140px] mx-auto">FREE INSTALLATION</figcaption>
							</li>
							<li className="footer-banner-after-elem w-[20%]">
								<figure className=" w-[140px] h-[58px] mb-[0px] ml-[auto] mr-[auto] mt-[0]">
									<img src="/images/bestPricesFtr.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
								</figure>
								<figcaption className="font-semibold font-['Oswald'] 850:text-[16px] 1200:text-[18px] text-center w-[140px] mx-auto">BEST PRICES</figcaption>
							</li>
							<li className="footer-banner-after-elem w-[20%]">
								<figure className=" w-[140px] h-[58px] mb-[0px] ml-[auto] mr-[auto] mt-[0]">
									<img src="/images/codFtr.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
								</figure>
								<figcaption className="font-semibold font-['Oswald'] 850:text-[16px] 1200:text-[18px] text-center w-[140px] mx-auto">CASH ON DELIVERY</figcaption>
							</li>
							<li className="footer-banner-after-elem w-[20%]">
								<figure className=" w-[140px] h-[58px] mb-[0px] ml-[auto] mr-[auto] mt-[0]">
									<img src="/images/codFtr2.png" className="ml-[auto] mr-[auto]" alt="indore battery feature image" />
								</figure>
								<figcaption className="font-semibold font-['Oswald'] 850:text-[16px] 1200:text-[18px] text-center w-[140px] mx-auto">PAY BY ONLINE</figcaption>
							</li>
						</ul>
					</div>
				</div>
			</section>
		</>
	)
}
export default EnquirySection;