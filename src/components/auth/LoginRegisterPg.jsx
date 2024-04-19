import React, { useState, useContext } from "react";
import Header from "../common/Header";
import EnquirySection from "../common/EnquirySection";
import Footer from "../common/Footer";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../App";
import axios from "axios";
import { Formik } from "formik";
const PRINT_LOGS = import.meta.env.PRINT_LOGS === 'error';
import { indianStatesAndCities } from "../../services/constantsService";


function CmnPg() {
	const states = indianStatesAndCities?.map(item => item.state);
	const { loginStatus, setLoginStatus } = useContext(LoginContext);
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [addressLineOne, setAddressLineOne] = useState("");
	const [addressLineTwo, setAddressLineTwo] = useState("");
	const [state, setState] = useState("");
	const [country, setCountry] = useState("");
	const [pinCode, setPinCode] = useState("");
	const [city, setCity] = useState("");
	const backend_url = import.meta.env.VITE_BACKEND_URL;
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	async function registerUser(values) {
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
		PRINT_LOGS && console.log(response.status);
		if (response.status === 200) {
			navigate("/login")
		}
	}

	const [loginEmail, setLoginEmail] = useState("")
	const [loginPassword, setLoginPassword] = useState("")

	async function handleUserLogin() {
		const response = await axios.post(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/auth/user-login`, {
			email: loginEmail,
			password: loginPassword
		}, {
			withCredentials: true
		}
		)
		PRINT_LOGS && console.log("login data", response)
		if (response.status === 200) {
			setLoginStatus(response?.data?.userData);
			navigate("/");
		}
	}


	return (
		<>
			<section className="bg-[#ffffff] h-screen">
				<div className="bg-[#ffffff] flex mb-[50px]">
					<div className="w-[30%] h-screen py-[20px] px-[30px] pl-[90px] bg-[#ff7637] flex items-center justify-center flex-col relative">
						<Link to={"/"}><img className="cursor-pointer relative left-[-100px]" src="/images/logoCollection.png" alt="" /></Link>
						<span className="text-[#fff] w-[70%] z-[100]">We are committed to providing high-quality batteries for all your needs</span>

						<div style={{boxShadow:'rgba(0, 0, 0, 0.21) 9px 10px 16px 1px'}} className="absolute right-0 translate-x-[50%] top-[4%] rounded-[8px] w-[300px] bg-[#fff] rounded-8px text-[16px] font-[500] text-[#FF7637] py-[15px] px-[10px] flex align-center">
							<span><i className='mx-[10px] p-[10px]  rounded-[50%] text-[33px] bx bxs-message-rounded-dots '></i></span>
							<span className="flex flex-col">
								<span className="font-[500] text-[#1B283A]">Old Fashioned Service</span>
								<span className="text-[12px] text-[#FF7637]">Delivering our values</span>
							</span>
						</div>

						<div style={{boxShadow:'rgba(0, 0, 0, 0.21) 9px 10px 16px 1px'}} className="absolute right-0 translate-x-[50%] bottom-[4%] rounded-[8px] w-[300px] bg-[#fff] rounded-8px text-[16px] font-[500] text-[#FF7637] py-[15px] px-[10px] flex align-center">
							<span><i className='mx-[10px] rounded-[50%] p-[10px] text-[33px] bx bxs-message-rounded-dots '></i></span>
							<span className="flex flex-col">
								<span className="font-[500] text-[#1B283A]">Authentic Products</span>
								<span className="text-[12px] text-[#FF7637]">We boast 100% authenticity of our products</span>
							</span>
						</div>
						
					</div>
					
					<div className="w-[70%] flex items-center justify-center py-[20px] px-[30px] pl-[90px] my-[15px]">
						<div className="w-[50%]">
							<div className="py-[20px]">
								<h3 className="text-[20px] font-[500] leading-[33px]">Not a user yet?</h3>
								<span>Create an account! It's quick, free and gives you access to special features.</span>
							</div>
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
										console.log('validation ran', values.pinCode, typeof values?.pinCode)
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
										if(!Number.isInteger(parseInt(values?.pinCode))) errors.pinCode = 'Pin code is invalid';
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
									{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, ...props }) => {
										console.log("FORMIK REGISTER ERRORS::", errors);
										console.log("FORMIK REGISTER PROPS::", touched);
										return (
											<form onSubmit={handleSubmit}>
												<div className="w-full flex justify-between">
													<div className="pb-[5px] pt-[25px] relative w-[48%] flex">
														{touched.firstName && errors.firstName && <div className="absolute top-[5px] text-[14px] text-red-500 font-medium">{errors.firstName && '* ' + errors.firstName}</div>}
														<span className="flex items-center justify-center w-[15%] text-center grow bg-[#ff7637]" style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }}><i className='bx bxs-user text-[#fff]' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} ></i></span>
														<input type="text" className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[85%]"
															value={values.firstName} onChange={handleChange} onBlur={handleBlur}
															name="firstName" placeholder="First Name" />
													</div>
													<div className="pb-[5px] pt-[25px] relative w-[48%] flex">
														{touched.lastName && errors.lastName && <div className="absolute top-[5px] text-[14px] text-red-500 font-medium">{errors.lastName && '* ' + errors.lastName}</div>}
														<span className="flex items-center justify-center w-[15%] text-center grow bg-[#ff7637]" style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }}>
															<i className='bx bxs-user text-[#fff] ' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }}  ></i></span>
														<input type="text" className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[85%]" value={values.lastName} onChange={handleChange} onBlur={handleBlur} name="lastName" placeholder="lastName" />

													</div>
												</div>
												<div className="w-full flex justify-between">
													<div className="pb-[5px] pt-[25px] relative w-[48%] flex">
														{touched.email && errors.email && <div className="absolute top-[5px] text-[14px] text-red-500 font-medium">{errors.email && '* ' + errors.email}</div>}
														<span className="flex items-center justify-center w-[15%] text-center grow bg-[#ff7637]" style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }}><i className='bx bxs-envelope text-[#fff] ' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} ></i></span>
														<input type="text" className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[85%]"
															value={values.email} onChange={handleChange} onBlur={handleBlur}
															name="email" placeholder="Email" />
													</div>
													<div className="pb-[5px] pt-[25px] relative w-[48%] flex">
														{touched.phone && errors.phone && <div className="absolute top-[5px] text-[14px] text-red-500 font-medium">{errors.phone && '* ' + errors.phone}</div>}
														<span className="flex items-center justify-center w-[15%] text-center grow bg-[#ff7637]" style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }}>
															<i className='bx bxs-phone text-[#fff] ' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }}  ></i></span>
														<input type="text" className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[85%]" value={values.phone} onChange={handleChange} onBlur={handleBlur} name="phone" placeholder="Phone" />

													</div>
												</div>
												<div className="w-full flex justify-between">
													<div className="pb-[5px] pt-[25px] relative w-[48%] flex">
														{touched.addressLineOne && errors.addressLineOne && <div className="absolute top-[5px] text-[14px] text-red-500 font-medium">{errors.addressLineOne && '* ' + errors.addressLineOne}</div>}
														<span className="flex items-center justify-center w-[15%] text-center grow bg-[#ff7637]" style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }}><i className='bx bxs-edit-location text-[#fff] ' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} ></i></span>
														<input type="text" className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[85%]"
															value={values.addressLineOne} onChange={handleChange} onBlur={handleBlur}
															name="addressLineOne" placeholder="Address Line One" />
													</div>
													<div className="pb-[5px] pt-[25px] relative w-[48%] flex">
														{touched.addressLineTwo && errors.addressLineTwo && <div className="absolute top-[5px] text-[14px] text-red-500 font-medium">{errors.addressLineTwo && '* ' + errors.addressLineTwo}</div>}
														<span className="flex items-center justify-center w-[15%] text-center grow bg-[#ff7637]" style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }}>
															<i className='bx bxs-edit-location text-[#fff] ' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }}  ></i></span>
														<input type="text" className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[85%]" value={values.addressLineTwo} onChange={handleChange} onBlur={handleBlur} name="addressLineTwo" placeholder="Address Line Two" />
													</div>
												</div>
												<div className="w-full flex justify-between">
													<div className="pb-[5px] pt-[25px] relative w-[48%] flex">
														{touched.state && errors.state && <div className="absolute top-[5px] text-[14px] text-red-500 font-medium">{errors.state && '* ' + errors.state}</div>}
														<span className="flex items-center justify-center w-[15%] text-center grow bg-[#ff7637]" style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }}><i className='bx bxs-map-pin text-[#fff] ' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} ></i></span>
														{/* <input type="text" className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[85%]"
															value={values.state} onChange={handleChange} onBlur={handleBlur}
															name="state" placeholder="State" /> */}
															<select name="state" className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[85%]" value={values.state} onChange={handleChange} onBlur={handleBlur} id="">
																<option value="">Choose a state</option>
																{states?.map(item => (
																	<option value={item}>{item}</option>
																))}
															</select>
													</div>
													<div className="pb-[5px] pt-[25px] relative w-[48%] flex">
														{touched.city && errors.city && <div className="absolute top-[5px] text-[14px] text-red-500 font-medium">{errors.city && '* ' + errors.city}</div>}
														<span className="flex items-center justify-center w-[15%] text-center grow bg-[#ff7637]" style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }}>
															<i className='bx bxs-map-pin text-[#fff] ' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }}  ></i></span>
														
														<select name="city" className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[85%]" value={values.city} onChange={handleChange} onBlur={handleBlur} id="">
																<option value="">Choose a city</option>
																{values.state && indianStatesAndCities?.filter(item => item?.state === values.state)[0]?.cities?.map(item => (
																	<option value={item}>{item}</option>
																))}
															</select>
													</div>
												</div>
												<div className="w-full flex justify-between">
													<div className="pb-[5px] pt-[25px] relative w-[48%] flex">
														{touched.pinCode && errors.pinCode && <div className="absolute top-[5px] text-[14px] text-red-500 font-medium">{errors.pinCode && '* ' + errors.pinCode}</div>}
														<span className="flex items-center justify-center w-[15%] text-center grow bg-[#ff7637]" style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }}><i className='bx bxs-map-pin text-[#fff] ' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} ></i></span>
														<input type="text" className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[85%]"
															value={values.pinCode} onChange={handleChange} onBlur={handleBlur}
															name="pinCode" placeholder="Pin Code" />
													</div>
													<div className="pb-[5px] pt-[25px] relative w-[48%] flex">
														{touched.country && errors.country && <div className="absolute top-[5px] text-[14px] text-red-500 font-medium">{errors.country && '* ' + errors.country}</div>}
														<span className="flex items-center justify-center w-[15%] text-center grow bg-[#ff7637]" style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }}>
															<i className='bx bxs-map-pin text-[#fff] ' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }}  ></i></span>
														<input type="text" className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[85%]" value={values.country} onChange={handleChange} onBlur={handleBlur} name="country" placeholder="Country" />
													</div>
												</div>

												<div className="w-full flex justify-between">
													<div className="pb-[5px] pt-[25px] relative w-[48%] flex">
														{touched.password && errors.password && <div className="absolute top-[5px] text-[14px] text-red-500 font-medium">{errors.password && '* ' + errors.password}</div>}
														<span className="flex items-center justify-center w-[15%] text-center grow bg-[#ff7637]" style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }}><i className='bx bxs-lock-alt text-[#fff] ' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} ></i></span>
														<input type={showPassword ? "text" : "password"} className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[85%]"
															value={values.password} onChange={handleChange} onBlur={handleBlur}
															name="password" placeholder="Password" />
														<span className="block absolute right-[10px] bottom-[10px] ">{showPassword ? <i onClick={() => { setShowPassword(prev => !prev) }} class="fa-regular fa-eye-slash text-[rgba(0,0,0,0.4)]"></i> : <i onClick={() => { setShowPassword(prev => !prev) }} class="fa-regular fa-eye text-[rgba(0,0,0,0.4)]"></i>}</span>
													</div>
													<div className="pb-[5px] pt-[25px] relative w-[48%] flex">
														{touched.confirmPassword && errors.confirmPassword && <div className="absolute top-[5px] text-[14px] text-red-500 font-medium">{errors.confirmPassword && '* ' + errors.confirmPassword}</div>}
														<span className="flex items-center justify-center w-[15%] text-center grow bg-[#ff7637]" style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }}>
															<i className='bx bxs-lock-alt text-[#fff] ' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }}  ></i></span>
														<input type={showConfirmPassword ? "text" : "password"} className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[85%]" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} name="confirmPassword" placeholder="Confirm Password" />
														<span className="block absolute right-[10px] bottom-[10px] ">{showConfirmPassword ? <i onClick={() => { setShowConfirmPassword(prev => !prev) }} class="fa-regular fa-eye-slash text-[rgba(0,0,0,0.4)]"></i> : <i onClick={() => { setShowConfirmPassword(prev => !prev) }} class="fa-regular fa-eye text-[rgba(0,0,0,0.4)]"></i>}</span>
													</div>
												</div>

												<div className="text-[13px] flex items-start gap-[5px] mt-[15px]"><i className="bx bxs-star text-[rgba(255,18,55,0.8)] align-middle mt-[2px]"></i>All the above data is mandatory and will be used for delivery and data analytics purpose.</div>
												<div className="text-[13px] flex items-start gap-[5px] mt-[10px]"><i className="bx bxs-star text-[rgba(255,18,55,0.8)] align-middle mt-[2px]"></i>For more information please refer to our <Link className="font-[600] text-[#ff7637]" to="/privacy-policy"> Privacy policy</Link> or <Link className="font-[600] text-[#ff7637]" to="/faq">FAQ</Link>.</div>
												<button className="btn-special-spread  py-[10px] px-[30px] my-[15px] text-[15px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]">Submit</button>
											</form>
										)
									}}
								</Formik>
								<p className="text-[16px] font-[400] font-sans">
									Already a User?&nbsp;
									<Link to="/login" className="text-[#ff7637] font-sans">Login</Link>
								</p>

							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default CmnPg;