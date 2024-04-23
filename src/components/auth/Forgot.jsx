import React, { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { batteryIndoreDataService } from '../../services/dataService';
import OtpInput from 'formik-otp-input';
import { ColorRing } from 'react-loader-spinner';

const Forgot = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const emailRef = useRef(null);
	const [showResetForm, setShowResetForm] = useState(false);

	async function sendPasswordResetOTP(values) {
		try {
			const response = await batteryIndoreDataService.sendPasswordResetOTP(values.email);
			if (response.status === 200) {
				setShowResetForm(true);
				emailRef.current = values.email;
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function resetPassword(values) {
		try {
			const response = await batteryIndoreDataService.resetPassword(values);
			if (response.status === 200) {
				navigate("/login", { state: { message: 'Your password has been reset successfully.' } })
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<section className="bg-[#f7f7f5] h-screen">
				<div className="center-wr h-full">
					<div className='flex items-center justify-center h-full'>
						<div className='bg-white border-[1px] border-[rgba(0,0,0,0.25)] rounded-[6px] flex flex-col items-start p-[25px] w-[450px]'>
								<Link to="/">
							<div className='flex items-center'>
								<figure>
									<img src="/images/logo.svg" alt="" />
								</figure>
								<div className='ml-[15px]'>
									<h3>Indore Battery</h3>
								</div>
							</div>
								</Link>
							<h3 className='font-["Sora"] font-medium text-[16px] mt-[45px]'>Forgot Password</h3>
							{
								showResetForm ? (
									<Formik
										key={'reset-password-form'}
										initialValues={{
											email: emailRef.current ? emailRef.current : '',
											password: '',
											confirmPassword: '',
											otp: '',
										}}
										validate={(values) => {
											let errors = {};
											if (!values.email) {
												errors.email = 'Email is required';
											} else if (
												!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
											) {
												errors.email = 'Please enter a valid email address';
											}
											if (!values.password || !values.confirmPassword) {
												errors.password = 'Password is required';
												errors.confirmPassword = 'Password is required';
											}
											if (values.password !== values.confirmPassword) {
												errors.password = 'Passwords do not match'
												errors.confirmPassword = 'Passwords do not match'
											}
											if (!values.otp) {
												errors.otp = 'OTP is required';
											}

											return errors;
										}}
										onSubmit={(values, { setSubmitting }) => {
											setTimeout(() => {
												resetPassword(values);
												setSubmitting(false);
											}, 400);
										}}
									>
										{({ values, isSubmitting, handleBlur, handleChange, handleSubmit, errors, touched, dirty, ...props }) => {
											return (
												<form className='w-full' onSubmit={handleSubmit}>
													<div className='relative pt-[25px] pb-[35px] mt-[15px]'>
														<span className='absolute top-0 text-[14px] font-medium font-sans'>Email</span>
														<input type="text" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className='border-[1px] border-[rgba(0,0,0,0.25)] w-full p-[6px] rounded-[6px]' />
														{((errors.email && touched.email)) && <span className='absolute bottom-[10px] right-0 text-red-500 text-[14px] font-medium font-["Sora"]'>{errors.email}</span>}
													</div>
													<div className='relative pt-[25px] pb-[35px] mt-[15px]'>
														<span className='absolute top-0 text-[14px] font-medium font-sans'>Password</span>
														<input type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} className='border-[1px] border-[rgba(0,0,0,0.25)] w-full p-[6px] rounded-[6px]' />
														{((errors.password && touched.password)) && <span className='absolute bottom-[10px] right-0 text-red-500 text-[14px] font-medium font-["Sora"]'>{errors.password}</span>}
													</div>
													<div className='relative pt-[25px] pb-[35px] mt-[15px]'>
														<span className='absolute top-0 text-[14px] font-medium font-sans'>Confirm Password</span>
														<input type="password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} className='border-[1px] border-[rgba(0,0,0,0.25)] w-full p-[6px] rounded-[6px]' />
														{((errors.confirmPassword && touched.confirmPassword)) && <span className='absolute bottom-[10px] right-0 text-red-500 text-[14px] font-medium font-["Sora"]'>{errors.confirmPassword}</span>}
													</div>

													<div className='relative pt-[25px] pb-[35px] mt-[15px]'>
														<span className='absolute top-0 text-[14px] font-medium font-sans'>OTP</span>
														<OtpInput
															length={5}
															value={values.otp}
															inputType={"alphanumeric"}
															autoFocus={true}
															autoSubmit={true}
															onBlur={handleBlur}
															onChange={handleChange}
															// onFullFill={handleSubmit}
															setFieldError={props.setFieldError}
															setFieldTouched={props.setFieldTouched}
															highlightColor={'#4caf50'}
														/>
														{((errors.otp && touched.otp)) && <span className='absolute bottom-[10px] right-0 text-red-500 text-[14px] font-medium font-["Sora"]'>{errors.otp}</span>}
													</div>

													<button className='w-full text-white font-medium bg-[#ff7637] rounded-[6px] shadow-md flex items-center justify-center'>{isSubmitting ? <ColorRing
														visible={true}
														height="49"
														width="49"
														ariaLabel="color-ring-loading"
														wrapperStyle={{}}
														wrapperclassName="color-ring-wrapper"
														colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
													/> : <span className='leading-[50px]'>Reset Password</span>}</button>
													<p className='text-[13px] text-[#787878] leading-[20px] mt-[15px]'>An OTP will be sent to your registered email, upon verification of the OTP, you will be able to reset your login password</p>
													<p className='text-[13px] font-[600] text-[#787878] leading-[20px] my-[10px] text-center'>OR</p>
													<button onClick={()=>navigate("/login")} className='w-full py-[6px] text-[#ff7637] font-medium  rounded-[6px]'>Login With Password</button>
												</form>
											)
										}}
									</Formik>
								) : (
									<Formik
										key={'verify-email-form'}
										initialValues={{
											email: state?.email ? state?.email : ''
										}}
										validate={(values) => {
											let errors = {};
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
												sendPasswordResetOTP(values);
												setSubmitting(false);
											}, 400);
										}}
									>
										{({ values, handleBlur, handleChange, handleSubmit, errors, touched, dirty }) => {
											return (
												<form className='w-full' onSubmit={handleSubmit}>
													<div className='relative pt-[25px] pb-[35px] mt-[15px]'>
														<span className='absolute top-0 text-[14px] font-medium font-sans'>Email</span>
														<input type="text" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className='border-[1px] border-[rgba(0,0,0,0.25)] w-full p-[6px] rounded-[6px]' />
														{(errors.email || (errors.email && dirty)) && <span className='absolute bottom-[10px] right-0 text-red-500 text-[14px] font-medium font-["Sora"]'>{errors.email}</span>}
													</div>
													<button className='w-full py-[6px] text-white font-medium bg-[#ff7637] rounded-[6px] shadow-md'>Send OTP</button>
													<p className='text-[13px] text-[#787878] leading-[20px] mt-[15px]'>An OTP will be sent to your registered email, upon verification of the OTP, you will be able to reset your login password</p>
													<p className='text-[13px] font-[600] text-[#787878] leading-[20px] my-[10px] text-center'>OR</p>
													<button onClick={()=>navigate("/login")} className='w-full py-[6px] text-[#ff7637] font-medium  rounded-[6px]'>Login With Password</button>
												</form>
											)
										}}
									</Formik>
								)
							}
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Forgot