import React, { useState, useContext, useRef, useEffect } from "react";
import Header from "../common/Header";
import EnquirySection from "../common/EnquirySection";
import Footer from "../common/Footer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LoginContext } from "../../App";
import axios from "axios";
// import OtpInput from 'react-otp-input';
import OtpInput from 'formik-otp-input';
import { batteryIndoreDataService } from "../../services/dataService";
axios.defaults.withCredentials = true;
import log from "../../utils/utilityFunctions";
import { GoogleLogin } from "@react-oauth/google";
import { Formik } from "formik";
import { ColorRing } from "react-loader-spinner";
import HeaderNew from "../common/HeaderNew";
import toast, { Toaster } from "react-hot-toast";
import Meta from "../common/Meta";


// CSS Styles, adjust according to your needs
const formStyle = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '20px',
};

const fieldStyle = {
	margin: '10px 0',
};

const errorTextStyle = {
	marginTop: '15px',
	fontSize: '14px',
	color: '#ff6b6b',
	marginBottom: '10px',
};

const submitButtonStyle = {
	padding: '10px 20px',
	backgroundColor: '#4caf50',
	color: 'white',
	border: 'none',
	borderRadius: '5px',
	cursor: 'pointer',
	marginTop: '20px',
};


function Login() {
	const { state } = useLocation();
	const { loginStatus, setLoginStatus } = useContext(LoginContext);
	const navigate = useNavigate();
	const emailRef = useRef(null);
	const [loginPassword, setLoginPassword] = useState("")
	const [error, setError] = useState("")
	const [verified, setVerified] = useState(true)
	const [otpSent, setOtpSent] = useState(false)
	const [otp, setOtp] = useState("");
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


	async function handleUserLogin(values) {
		try {
			log('handle submit called')
			const response = await axios.post(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/auth/user-login`, {
				email: values.email,
				password: values.password
			}, {
				withCredentials: true
			}
			)

			if (response?.status === 200) {
				localStorage.setItem("ibjwtoken", response?.data?.userData?.access_token);
				setLoginStatus(response?.data?.userData);
				setVerified(true);


				// handle redirecting to cart if item was added.
				let cartData = localStorage.getItem('cart');
				toast.success("Logged In");
				if (cartData) {
					var parsedCartData = JSON.parse(cartData);

					await batteryIndoreDataService.addToCart(parsedCartData.batteryId,
						parsedCartData['quantity'],
						parsedCartData.exchangeBattery)
					localStorage.removeItem('cart');
					setTimeout(() => {
						navigate("/cart")
					}, 1000)
				} else {
					setTimeout(() => {
						navigate("/");
					}, 1000)
				}
			}
		} catch (error) {
			if (error?.response.status === 400 || error?.response.status === 401) {
				setError("Email and/or password incorrect");
			}
			if (error.message == "Request failed with status code 403") {
				setError("Please verify your email first");
				setVerified(false);
				emailRef.current = values.email;
			}
		}
	}

	async function sendOtp(values) {
		// e.preventDefault()
		const response = await axios.post(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/auth/send-verification-email`, {
			email: values.email
		}, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
			}
		})
		if (response.status === 200) {
			setOtpSent(true)
		}
	}

	async function verifyEmail(values) {
		try {
			const response = await axios.post(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/auth/user-email-verify`, {
				email: values.email,
				otp: values.otp
			}, {
				headers:{
					"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
				}
			})
			if (response.status === 200) {
				setVerified(true);
				setError("");
			}
		} catch (error) {
			log(error)
			if (error.message == "Request failed with status code 400") {
				setError("Incorrect Otp")
			}
		}
	}

	return (
		<>
			<Meta title="Login | Indore Battery"  />
			<HeaderNew />
			<Toaster />
			<section className="bg-[#f7f7f7] 1200:pb-[200px]">
				<div className="center-wr">
					<div className="flex flex-row-reverse 768:items-center 768:justify-center 320:items-start 320:justify-start 768:pt-[50px]">
						<div className="w-[100%]  320:p-0 p-[30px] 1200:py-[100px] login-pattern-bg relative  z-[0] ">
							
						<div className=" 320:w-full 480:w-3/4 768:w-[80%] 1024:w-1/2 320:p-[10px] 650:w-[50%] z-[1] mx-auto 320:bg-[#f7f7f7] 1200:bg-white  320:border-none 320:shadow-none bg-white 1200:border-2 1200:shadow-2xl 320:px-[10px] 320:py-[50px] 1200:px-[30px] 320:my-0 1200:my-[15px] flex items-start justify-start flex-col py-[50px]">
							<div className="">
								<h3 className="text-[20px] font-[500] leading-[33px] font-['Sora'] 320:font-['Oswald']">Login to your account</h3>
								<p className="320:text-[14px] 320:leading-[20px] mt-[10px]">We are happy to see you return! Please log in to continue.</p>
							</div>
							<div className={`p-[9px] mt-[15px] rounded-[6px] w-[83%] text-red-600 flex items-center gap-[10px] `}>
								{error && <i className="bx bx-error-circle text-[28px]"></i>}
								{error}
							</div>
							<div className="w-[100%] for-login-err">
								{verified ? (
									<Formik
										key="login-formik"
										initialValues={{ email: emailRef.current, password: '' }}
										validate={values => {
											setError("")
											const errors = {};
											if (!values.email) {
												errors.email = '*Email is required';
											} else if (
												!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
											) {
												errors.email = 'Please enter a valid email address';
											}
											if (!values.password) errors.password = 'Password is required';
											else if (values.password < 8) errors.password = 'Password must be atleast 8 characters long'
											return errors;
										}}
										onSubmit={(values, { setSubmitting }) => {
											setTimeout(() => {
												handleUserLogin(values);
												setSubmitting(false);
											}, 400);
										}}
									>
										{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, ...props }) => {
											log("FORMIK PROPS::", errors);
											return (
												<form className="w-full" onSubmit={handleSubmit}>
													<div className="pb-[10px] pt-[20px] 320:pt-0 relative">
														{((errors.email && props.dirty) || (errors.email)) && (
															<div className="text-red-600 font-medium absolute top-[-20px] text-[14px] " >{errors.email}</div>
														)}
														<span className={`flex`}>
															
															<input type="text" className={`py-[10px] text-[13px] focus:outline-none px-[10px] w-[90%] border-[1px] ${errors.email ? 'border-red-600':'border-[rgba(0,0,0,0.2)]'}`}
																name="email" placeholder="Email"
																value={values.email} onChange={handleChange} />
														</span>
													</div>
													<div className="py-[10px]">
														<span className="flex"> 
															<input type="password"
																value={values.password} onChange={handleChange}
																className={`py-[10px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] w-[90%] ${errors.password ? 'border-red-600':'border-[rgba(0,0,0,0.2)]'}`} name="password" placeholder="Password" />
														</span>

													</div>

													
													<button type="submit" className="btn-special-spread leading-[45px] px-[40px] my-[15px]  text-[15px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000] flex items-center justify-center">{isSubmitting ? <ColorRing
														visible={true}
														height="45"
														width="45"
														ariaLabel="color-ring-loading"
														wrapperStyle={{}}
														wrapperclassName="color-ring-wrapper"
														colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
													/> : 'Login'}</button>
												</form>
											)
										}}
									</Formik>
								) : !otpSent ? (
									<Formik
										key="verify-email"
										initialValues={{ email: emailRef.current }}
										validate={values => {
											const errors = {};
											if (!values.email) {
												errors.email = 'Email is required';
											} else if (
												!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
											) {
												errors.email = 'Please enter a valid email address';
											}
											return errors;
										}}
										onSubmit={(values, { setSubmitting }) => {
											setTimeout(() => {
												sendOtp(values);
												setSubmitting(false);
											}, 400);
										}}
									>
										{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, ...props }) => {
											log("Verify Email FORMIK:: ", props);
											return (
												<form onSubmit={handleSubmit}>
													<div className="py-[10px]">
														<span className="flex">  <i className='bg-[#ff7637] bx bxs-envelope text-[#fff] p-[10px] align-middle py-[10.9px]' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} ></i>
															<input type="text" className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[92%]"
																name="email" placeholder="Email"
																value={values.email} onChange={handleChange} /></span>
													</div>

													<button type="submit" className="btn-special-spread  leading-[45px] px-[30px] my-[15px]  text-[15px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]">{isSubmitting ? <ColorRing
														visible={true}
														height="45"
														width="45"
														ariaLabel="color-ring-loading"
														wrapperStyle={{}}
														wrapperclassName="color-ring-wrapper"
														colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
													/> : 'Send Otp'}</button>
												</form>
											)
										}}
									</Formik>
								) : (
									<Formik
										key='verify-otp'
										initialValues={{ email: emailRef.current, otp: '' }}
										validate={values => {
											const errors = {};
											if (!values.email) {
												errors.email = 'Email is required';
											} else if (
												!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
											) {
												errors.email = 'Please enter a valid email address';
											}
											return errors;
										}}
										onSubmit={(values, { setSubmitting }) => {
											setTimeout(() => {
												verifyEmail(values);
												setSubmitting(false);
											}, 400);
										}}
									>
										{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, ...props }) => {
											return (
												<form onSubmit={handleSubmit}>
													<div className="py-[10px]">
														<span className="flex"><i className='bg-[#ff7637] bx bxs-envelope text-[#fff] p-[10px] align-middle py-[10.9px]' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} ></i>
															<input type="text" className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1	px] border-[rgba(0,0,0,0.15)] w-[92%]"
																name="email" placeholder="Email"
																value={values.email} readOnly /></span>

													</div>
													<div className="py-[10px]">
														<span className="flex">
															<i className='bg-[#ff7637] bx bx-key text-[#fff] p-[10px] align-middle py-[10.9px]' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }}></i>
															{errors.otp && touched.otp && (
																<div style={errorTextStyle}>{errors.otp}</div>
															)}
															<OtpInput
																length={5}
																value={values.otp}
																inputType={"numeric"}    // Options: numeric, alphabetic, alphanumeric
																autoFocus={true}         // Auto-focus first digit
																autoSubmit={false}        // Auto-submit form on full OTP entry
																onBlur={handleBlur}
																onChange={handleChange}
																onFullFill={handleSubmit}
																setFieldError={props.setFieldError}
																setFieldTouched={props.setFieldTouched}
																highlightColor={'#4caf50'} // optional
															/>

														</span>

													</div>
													<button type="submit" className="btn-special-spread  leading-[45px] px-[30px] my-[15px]  text-[15px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]">{isSubmitting ? <ColorRing
														visible={true}
														height="45"
														width="45"
														ariaLabel="color-ring-loading"
														wrapperStyle={{}}
														wrapperclassName="color-ring-wrapper"
														colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
													/> : 'Verify'}</button>
												</form>
											)
										}}
									</Formik>

								)

								}

								<div className="mb-[15px] under">
									<Link to={'/forgot-password'} state={{ email: emailRef.current }} className="text-[13px]">Forgot Password?</Link>
								</div>
								<div>
									<button onClick={() => { navigate("/register") }} className=" transition-all hover:bg-[#f7faff] rounded-[5px] relative border-[1px] border-[rgba(0,0,0,0.15)] py-[10px] w-full text-[14px] font-normal relative">
										<span className="flex items-center absolute top-[50%] translate-y-[-50%] left-[10px]"><i className="bx bxs-user text-[20px] text-[#ff7637]"></i></span>
										Register User
									</button>
								</div>
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

export default Login;