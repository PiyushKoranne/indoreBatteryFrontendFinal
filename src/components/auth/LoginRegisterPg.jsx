import React, { useState, useContext, useEffect } from "react";
import Header from "../common/Header";
import EnquirySection from "../common/EnquirySection";
import Footer from "../common/Footer";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../App";
import axios from "axios";
import { Formik } from "formik";
const PRINT_LOGS = import.meta.env.PRINT_LOGS === 'error';
import { indianStatesAndCities } from "../../services/constantsService";
import toast, { Toaster } from "react-hot-toast";
import HeaderNew from "../common/HeaderNew";
import { batteryIndoreDataService } from "../../services/dataService";
import { Select } from "antd";
import { PiCaretDownBold } from "react-icons/pi";
import Meta from "../common/Meta";
import log from "../../utils/utilityFunctions";


function CmnPg() {
	const states = indianStatesAndCities?.map(item => item.state);
	const { loginStatus, setLoginStatus } = useContext(LoginContext);
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [contactDetails, setContactDetails] = useState(null);

	async function getContactDetails() {
		try {
			const response = await batteryIndoreDataService.getContactDetails();
			log("GETTING CONTACT DETAILS RESPONSE", response);
			setContactDetails(response?.data?.data);

		} catch (error) {
			log(error);
		}
	}

	useEffect(() => {
		getContactDetails();
	}, []);

	async function registerUser(values) {
		try {
			const response = await axios.post(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/auth/user-register`, {
				email: values.email,
				firstName: values.firstName,
				lastName: values.lastName,
				password: values.password,
				confirmPassword: values.confirmPassword,
				phone: values.phone,
				addressLineOne: values.addressLineOne,
				addressLineTwo: values.addressLineTwo,
				state: values.state,
				country: values.country,
				pinCode: values.pinCode,
				city: values.city
			});
			PRINT_LOGS && log(response.status);
			if (response.status === 200) {
				toast.success("User Registered Successfully!");
				setTimeout(() => {
					navigate("/login")
				}, 1000)
			}
		} catch (error) {
			log(error);
			toast.error(error?.response?.data?.message);
		}
	}

	return (
		<>
		<Meta title="Register | Indore Battery"  />
			<HeaderNew />
			<Toaster />
			<section className="bg-[#f7f7f7] 1200:pb-[200px]">
				<div className="center-wr">
					<div className="flex flex-row-reverse 768:items-center 768:justify-center 320:items-start 320:justify-start 768:pt-[50px]">
						<div className="w-[100%]  320:p-0 p-[30px] 1200:py-[100px] login-pattern-bg relative  z-[0] ">

							<div className="320:border-none 320:w-full 480:w-3/4 768:w-[80%] 1024:w-[90%] 1200:w-[80%] 320:p-[10px] 650:w-[80%] z-[1] mx-auto 320:bg-[#f7f7f7] 1200:bg-white  320:shadow-none bg-white 1200:border-2 1200:shadow-2xl 320:px-[10px] 320:py-[50px] 1200:px-[30px] 320:my-0 1200:my-[15px] flex items-start justify-start flex-col py-[50px]">
								<div className="">
									<h3 className="text-[20px] font-[500] leading-[33px] font-['Sora'] 320:font-['Oswald']">Create your account</h3>
									<p className="320:text-[14px] 320:leading-[20px] mt-[10px]">Ahoy! Welcome aboard. Register to start create your account.</p>
								</div>
								<div className={`p-[9px] mt-[15px] rounded-[6px] w-[83%] text-red-600 flex items-center gap-[10px] `}>
								</div>
								<div className="w-[100%] for-login-err">
									<div>
										<Formik
											initialValues={{
												email: '',
												firstName: '',
												lastName: '',
												password: '',
												confirmPassword: '',
												phone: '',
												addressLineOne: '',
												addressLineTwo: '',
												state: '',
												country: '',
												pinCode: '',
												city: '',
											}}
											validate={values => {
												// setError("")
												log('validation ran', values.pinCode, typeof values?.pinCode)
												const errors = {};
												if (!values.email) {
													errors.email = 'Email is required';
												} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
													errors.email = 'Please enter a valid email address';
												}
												if (!values.firstName) errors.firstName = 'Firstname is required'
												if (!values.lastName) errors.lastName = 'Lastname is required'
												if (!values.phone) errors.phone = 'Phone is required'
												if (!values.password || !values.confirmPassword) {
													errors.password = 'Password is required';
													errors.confirmPassword = 'Password is required';
												}
												if (values.password !== values.confirmPassword) {
													errors.password = 'Passwords do not match';
													errors.confirmPassword = 'Passwords do not match';
												}
												if (!values.addressLineOne) errors.addressLineOne = 'Address is required';
												if (!values.addressLineTwo) errors.addressLineTwo = 'Address is required';
												if (!values.state) errors.state = 'State is required';
												if (!values.country) errors.country = 'Country is required';
												if (!values.pinCode) errors.pinCode = 'Pin code is required';
												if (!Number.isInteger(parseInt(values?.pinCode))) errors.pinCode = 'Pin code is invalid';
												if (!values.city) errors.city = 'City is required';

												return errors;
											}}
											onSubmit={(values, { setSubmitting }) => {
												setTimeout(() => {
													registerUser(values);
													setSubmitting(false);
												}, 400);
											}}
										>
											{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, ...prop }) => {
												return (
													<form onSubmit={handleSubmit}>
														<div className="w-full flex justify-between flex-wrap">
															<div className="my-[10px] relative 320:w-full 1200:w-[48%] w-[48%] flex ">
																{touched.firstName && errors.firstName && <div className="absolute top-[-20px] text-[13px] text-red-600 font-medium">{errors.firstName && '* ' + errors.firstName}</div>}
																
																<input type="text" className={`py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] 320:w-full 1200:w-[90%] ${errors.firstName ? 'border-red-600':'border-[rgba(0,0,0,0.2)]'}`}
																	value={values.firstName} onChange={handleChange} onBlur={handleBlur}
																	name="firstName" placeholder="First Name" />
															</div>
															<div className="my-[10px] relative 320:w-full 1200:w-[48%] w-[48%] flex ">
																{touched.lastName && errors.lastName && <div className="absolute top-[-20px] text-[13px] text-red-600 font-medium">{errors.lastName && '* ' + errors.lastName}</div>}
																
																<input type="text" className={`py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] 320:w-full 1200:w-[90%] ${errors.lastName ? 'border-red-600':'border-[rgba(0,0,0,0.2)]'}`} value={values.lastName} onChange={handleChange} onBlur={handleBlur} name="lastName" placeholder="Last Name" />
															</div>
														</div>
														<div className="w-full flex justify-between flex-wrap">
															<div className="my-[10px] relative 320:w-full 1200:w-[48%] w-[48%] flex  ">
																{touched.email && errors.email && <div className="absolute top-[-20px] text-[13px] text-red-600 font-medium">{errors.email && '* ' + errors.email}</div>}
																
																<input type="text" className={`py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] 320:w-full 1200:w-[90%] ${errors.email ? 'border-red-600':'border-[rgba(0,0,0,0.2)]' } `}
																	value={values.email} onChange={handleChange} onBlur={handleBlur}
																	name="email" placeholder="Email" />
															</div>
															<div className="my-[10px] relative 320:w-full 1200:w-[48%] w-[48%] flex  ">
																{touched.phone && errors.phone && <div className="absolute top-[-20px] text-[13px] text-red-600 font-medium">{errors.phone && '* ' + errors.phone}</div>}
																
																<input type="text" className={`py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] 320:w-full 1200:w-[90%] ${errors.phone ? 'border-red-600':'border-[rgba(0,0,0,0.2)]' }`} value={values.phone} onChange={(e) => { let num = e.target.value.replace(/\D/g, '')?.slice(0, 10); prop.setFieldValue("phone", num) }} onBlur={handleBlur} name="phone" placeholder="Phone" />

															</div>
														</div>
														<div className="w-full flex justify-between flex-wrap">
															<div className="my-[10px] relative 320:w-full 1200:w-[48%] w-[48%] flex  ">
																{touched.addressLineOne && errors.addressLineOne && <div className="absolute top-[-20px] text-[13px] text-red-600 font-medium">{errors.addressLineOne && '* ' + errors.addressLineOne}</div>}
																
																<input type="text" className={`py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] 320:w-full 1200:w-[90%] ${errors.addressLineOne ? 'border-red-600':'border-[rgba(0,0,0,0.2)]' } `}
																	value={values.addressLineOne} onChange={handleChange} onBlur={handleBlur}
																	name="addressLineOne" placeholder="Address Line One" />
															</div>
															<div className="my-[10px] relative 320:w-full 1200:w-[48%] w-[48%] flex  ">
																{touched.addressLineTwo && errors.addressLineTwo && <div className="absolute top-[-20px] text-[13px] text-red-600 font-medium">{errors.addressLineTwo && '* ' + errors.addressLineTwo}</div>}
																
																<input type="text" className={`py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] 320:w-full 1200:w-[90%] ${errors.addressLineTwo ? 'border-red-600':'border-[rgba(0,0,0,0.2)]' }`} value={values.addressLineTwo} onChange={handleChange} onBlur={handleBlur} name="addressLineTwo" placeholder="Address Line Two" />
															</div>
														</div>
														<div className="w-full flex justify-between flex-wrap">
															<div className="my-[10px] relative 320:w-full 1200:w-[48%] w-[48%] flex  ">
																{touched.state && errors.state && <div className="absolute top-[-20px] text-[13px] text-red-600 font-medium">{errors.state && '* ' + errors.state}</div>}
																<Select
																	suffixIcon={<PiCaretDownBold className="text-[#202020] text-[16px] font-bold" />}
																	variant="borderless"
																	defaultValue=""
																	className={`320:w-full 1200:w-[90%] p-[4px]  border rounded-md focus:outline-none  bg-[transparent] batt-form-select ${errors.city ? 'border-red-600' : 'border-[rgba(0,0,0,0.2)]'}`}
																	onChange={(val) => { prop.setFieldValue("state", val) }}
																	name="state"
																	onBlur={handleBlur}
																	options={[{ value: "", label: "Choose a State" }, ...indianStatesAndCities?.map((item, index) => ({ value: item?.state, label: item?.state }))]}
																/>
															</div>
															<div className="my-[10px] relative 320:w-full 1200:w-[48%] w-[48%] flex  ">
																{touched.city && errors.city && <div className="absolute top-[-20px] text-[13px] text-red-600 font-medium">{errors.city && '* ' + errors.city}</div>}

																<Select
																	suffixIcon={<PiCaretDownBold className="text-[#202020] text-[16px] font-bold" />}
																	variant="borderless"
																	defaultValue=""
																	className={`320:w-full 1200:w-[90%] p-[4px]  border rounded-md focus:outline-none  bg-[transparent] batt-form-select ${errors.city ? 'border-red-600' : 'border-[rgba(0,0,0,0.2)]'}`}
																	onChange={(val) => { prop.setFieldValue("city", val) }}
																	name="city"
																	onBlur={handleBlur}
																	options={ values.state ? [{ value: "", label: "Choose a City" }, ...indianStatesAndCities?.find(obj=>obj.state === values.state)?.cities?.map((item, index) => ({ value: item, label: item }))]:[{ value: "", label: "Choose a City" }]}
																/>
															</div>
														</div>
														<div className="w-full flex justify-between flex-wrap">
															<div className="my-[10px] relative 320:w-full 1200:w-[48%] w-[48%] flex  ">
																{touched.pinCode && errors.pinCode && <div className="absolute top-[-20px] text-[13px] text-red-600 font-medium">{errors.pinCode && '* ' + errors.pinCode}</div>}
																
																<input type="text" className={`py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] 320:w-full 1200:w-[90%] ${errors.pinCode ?  'border-red-600':'border-[rgba(0,0,0,0.2)]' }`}
																	value={values.pinCode} onChange={handleChange} onBlur={handleBlur}
																	name="pinCode" placeholder="Pin Code" />
															</div>
															<div className="my-[10px] relative 320:w-full 1200:w-[48%] w-[48%] flex  ">
																{touched.country && errors.country && <div className="absolute top-[-20px] text-[13px] text-red-600 font-medium">{errors.country && '* ' + errors.country}</div>}
																
																<input type="text" className={`py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] 320:w-full 1200:w-[90%] ${errors.country ? 'border-red-600':'border-[rgba(0,0,0,0.2)]' }`} value={values.country} onChange={handleChange} onBlur={handleBlur} name="country" placeholder="Country" />
															</div>
														</div>

														<div className="w-full flex justify-between flex-wrap">

															<div className="my-[10px] relative 320:w-full 1200:w-[48%] w-[48%] flex ">
																{touched.password && errors.password && <div className="absolute top-[-20px] text-[13px] text-red-600 font-medium">{errors.password && '* ' + errors.password}</div>}
																
																<input type={showPassword ? "text" : "password"} className={`py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] 320:w-full 1200:w-[90%] ${errors.password ? 'border-red-600':'border-[rgba(0,0,0,0.2)]'}`}
																	value={values.password} onChange={handleChange} onBlur={handleBlur}
																	name="password" placeholder="Password" />

																<span className="block absolute 1200:right-[45px] 320:right-[10px] 320:bottom-[5px] 1200:bottom-[8px] ">{showPassword ? <i onClick={() => { setShowPassword(prev => !prev) }} class="fa-regular fa-eye-slash text-[rgba(0,0,0,0.4)]"></i> : <i onClick={() => { setShowPassword(prev => !prev) }} class="fa-regular fa-eye text-[rgba(0,0,0,0.4)]"></i>}</span>
															</div>

															<div className="my-[10px] relative 320:w-full 1200:w-[48%] w-[48%] flex">
																{touched.confirmPassword && errors.confirmPassword && <div className="absolute top-[-20px] text-[13px] text-red-600 font-medium">{errors.confirmPassword && '* ' + errors.confirmPassword}</div>}
																
																<input type={showConfirmPassword ? "text" : "password"} className={`py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] 320:w-full 1200:w-[90%] ${errors.confirmPassword ? 'border-red-600':'border-[rgba(0,0,0,0.2)]' }`} value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} name="confirmPassword" placeholder="Confirm Password" />
																<span className="block absolute 1200:right-[45px] 320:right-[10px] 320:bottom-[5px] 1200:bottom-[8px] ">{showConfirmPassword ? <i onClick={() => { setShowConfirmPassword(prev => !prev) }} class="fa-regular fa-eye-slash text-[rgba(0,0,0,0.4)]"></i> : <i onClick={() => { setShowConfirmPassword(prev => !prev) }} class="fa-regular fa-eye text-[rgba(0,0,0,0.4)]"></i>}</span>
															</div>

														</div>

														<div className="text-[13px] text-[rgba(0,0,0,0.75)] flex items-start gap-[5px] mt-[15px]">
															All the above data is mandatory and will be used for delivery and data analytics purpose.</div>
														<div className="text-[13px] text-[rgba(0,0,0,0.75)] mt-[10px]">
															For more information please refer to our 
															<span className=""><Link className="font-[600] text-[#ff7637]" to="/privacy-policy"> Privacy policy</Link></span> or <span><Link className="font-[600] text-[#ff7637]" to="/faq">FAQ</Link></span>.
														</div>
														<button className="btn-special-spread  py-[10px] px-[30px] my-[15px] text-[15px] font-[600] focus:outline-none bg-[#1B283A] text-white border-l-[8px] solid border-l-[#ff7637]">Register</button>
													</form>
												)
											}}
										</Formik>
									</div>
									
									<p className="320:text-[14px] 320:leading-[20px] mt-[4px]">Already a user? <Link to="/login" className="text-[#ff7637]">Log in.</Link></p>
								</div>
							</div>
						</div>
						<div className="w-[40%] my-[15px] login-img-wr">
							<div className="flex items-center p-[10px] my-0 relative">
								<Link to={"/"}>
									<figure>
										<img src="/images/logo.svg" className="w-[40px]" alt="" />
									</figure>
								</Link>
								<Link to={"/"}>
									<h3 className="mb-[5px] ml-[10px] text-[34px] leading-[38px]">Indore Battery</h3>
								</Link>
							</div>
							<div className="mt-[25px]">
								<h3 className="font-['Sora'] w-[250px] text-[28px]">Welcome to The Indore Battery User Area</h3>
								<p className="w-[70%] my-[25px]">For any queries or profile related assistance just call us</p>
								<h3 className="text-[28px] tracking-[1.25px] border-b-[4px] border-b-[#ff7637] w-fit"><a className="font-['Oswald']" href={`tel:${contactDetails?.sectionContent?.filter(item => item?.elementAttrName === 'phone')[0]?.elementValue?.split(",")[1]?.split(" ")?.join("")}`}>{contactDetails?.sectionContent?.filter(item => item?.elementAttrName === 'phone')[0]?.elementValue?.split(",")[1]?.split(" ")?.join("")}</a></h3>
								<h3 className="text-[28px] tracking-[1.25px] border-b-[4px] border-b-[#ff7637] w-fit"><a className="font-['Oswald']" href={`tel:${contactDetails?.sectionContent?.filter(item => item?.elementAttrName === 'phone')[0]?.elementValue?.split(",")[0]?.split(" ")?.join("")}`}>{contactDetails?.sectionContent?.filter(item => item?.elementAttrName === 'phone')[0]?.elementValue?.split(",")[0]?.split(" ")?.join("")}</a></h3>
								<ul className="flex gap-[20px] mt-[25px] social-icons-list items-center justify-center 980:justify-start">
									<a target="_blank" href={contactDetails?.sectionContent?.filter(item => item?.elementAttrName === 'twitter')[0]?.elementValue}><li className="relative footer-social-icon flex items-center justify-center w-[45px] h-[45px] rounded-full hover:text-white transition-all duration-300 shadow-md"><i className="fa-brands fa-twitter"></i></li></a>
									<a target="_blank" href={contactDetails?.sectionContent?.filter(item => item?.elementAttrName === 'instagram')[0]?.elementValue}>
										<li className="relative footer-social-icon flex items-center justify-center w-[45px] h-[45px] rounded-full hover:text-white transition-all duration-300 shadow-md"><i className="fa-brands fa-instagram"></i></li></a>
									<a target="_blank" href={contactDetails?.sectionContent?.filter(item => item?.elementAttrName === 'facebook')[0]?.elementValue}>
										<li className="relative footer-social-icon flex items-center justify-center w-[45px] h-[45px] rounded-full hover:text-white transition-all duration-300 shadow-md"><i className="fa-brands fa-facebook-f"></i></li></a>
								</ul>
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

export default CmnPg;