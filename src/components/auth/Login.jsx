import React, { useState, useContext, useRef } from "react";
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
	const {state} = useLocation();
	const { loginStatus, setLoginStatus } = useContext(LoginContext);
	const navigate = useNavigate();
	const emailRef = useRef(null);
	const [loginPassword, setLoginPassword] = useState("")
	const [error, setError] = useState("")
	const [verified, setVerified] = useState(true)
	const [otpSent, setOtpSent] = useState(false)
	const [otp, setOtp] = useState("")

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
				setLoginStatus(response?.data?.userData);
				setVerified(true);

				// handle redirecting to cart if item was added.
				let cartData = localStorage.getItem('cart');
				if (cartData) {
					var parsedCartData = JSON.parse(cartData);

					await batteryIndoreDataService.addToCart(parsedCartData.batteryId,
						parsedCartData['quantity'],
						parsedCartData.exchangeBattery)
					localStorage.removeItem('cart');
					navigate("/cart")
				} else {
					navigate("/");
				}
			}
		} catch (error) {
			if (error?.response.status === 400 || error?.response.status === 401) {
				setError("Email and/or password incorrect")
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
			<Header />
			<section className="bg-[#fff] pt-[7%]">
				<div className="center-wr">
					<div className="bg-[#fff] flex items-center justify-center">
						<div className="w-[40%] my-[15px] flex items-start justify-start flex-col p-[30px] pt-[100px] login-form-wr">
							<div className="pt-[20px]">
								<h3 className="text-[20px] font-[500] leading-[33px] font-['Poppins']">Login to your account</h3>
								<span>We are happy to see you return! Please log in to continue.</span>
							</div>
							<div className={`p-[9px] mt-[15px] rounded-[6px] w-[83%] text-rose-500 flex items-center gap-[10px] `}>
								{error && <i className="bx bx-error-circle text-[28px]"></i>}
								{error}
							</div>
							<div className="w-[83%] for-login-err">
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
											if(!values.password) errors.password = 'Password is required';
											else if(values.password < 8) errors.password = 'Password must be atleast 8 characters long'
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
											console.log("FORMIK PROPS::", errors);
											return (
												<form className="w-full" onSubmit={handleSubmit}>
													<div className="pb-[10px] pt-[20px] relative">
														{((errors.email && props.dirty) || (errors.email)) && (
															<div className="text-red-500 font-medium absolute top-0 text-[14px] " >{errors.email}</div>
														)}
														<span className={`flex`}>
															<i className='bg-[#ff7637] text-[20px] bx bxs-envelope text-[#fff] w-[10%] flex items-center justify-center' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} ></i>
															<input type="text" className="py-[10px] text-[13px] focus:outline-none px-[10px] w-[90%] border-[1px] border-[rgba(0,0,0,0.25)]"
																name="email" placeholder="Email"
																value={values.email} onChange={handleChange} />
														</span>
													</div>
													<div className="py-[10px]">
														<span className="flex"> <i className="bg-[#ff7637] text-[20px] bx bx-key text-[#fff] w-[10%] flex items-center justify-center " style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} ></i>
															<input type="password"
																value={values.password} onChange={handleChange}
																className="py-[10px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[90%]" name="password" placeholder="Password" />
														</span>

													</div>

													<button type="submit" className="btn-special-spread leading-[45px] px-[40px] my-[15px]  text-[15px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]">{isSubmitting ? <ColorRing
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
											console.log("Verify Email FORMIK:: ", props);
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
																autoSubmit={true}        // Auto-submit form on full OTP entry
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

								<div>
									<Link to={'/forgot-password'} state={{email:emailRef.current}} className="text-[13px]">Forgot Password?</Link>
								</div>
								<div>
									<button onClick={()=>{navigate("/register")}} className=" transition-all hover:bg-[#f7faff] rounded-[5px] relative border-[1px] border-[rgba(0,0,0,0.15)] py-[10px] w-full text-[14px] font-normal relative">
										<span className="flex items-center absolute top-[50%] translate-y-[-50%] left-[10px]"><i className="bx bxs-user text-[20px] text-[#ff7637]"></i></span>
										Register User
									</button>	
								</div>
							</div>
						</div>
						<div className="w-[60%] my-[15px] login-img-wr">
							<img src="/images/9.png" alt="" />
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