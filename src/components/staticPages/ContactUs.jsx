import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import EnquirySection from "../common/EnquirySection";
import Footer from "../common/Footer";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import swal from "sweetalert";
import { ColorRing } from "react-loader-spinner";
import { batteryIndoreDataService } from "../../services/dataService";
import HeaderNew from "../common/HeaderNew";


function ContactUsPage() {

	const [contactusContent, setContactUsContent] = useState([]);
	const [contactDetails, setContactDetails] = useState(null);

	const navigate = useNavigate();

	async function getContactDetails() {
		try {
			const response = await batteryIndoreDataService.getContactDetails();
			setContactDetails(response?.data?.data);

		} catch (error) {
			console.log(error);
		}
	}

	const navigateToMap = () => {
		window.open('https://maps.app.goo.gl/StHNbjqYqArVsq4Y8', '_blank');
	}

	const openPhoneNumber = () => {
		window.location.href = 'tel:8839124524';
	}

	const openEmail = () => {
		window.location.href = 'mailto:batteryindore@gmail.com';
	}

	const handleCaptchaChange = (value) => {
		console.log("Captcha value:", value);
	};


	async function getPageData() {
		const response = await axios.get("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-page-content?pagename=contact-us");
		console.log("this is data", response?.data?.pageData?.sections[1]?.sectionContent[1]?.elementValue);
		setContactUsContent(response?.data?.pageData?.sections[1]?.sectionContent[1]?.elementValue);
	}

	useEffect(() => {
		getContactDetails();
		getPageData();
	}, [])

	return (
		<>
			<HeaderNew />
			<section className="contact-us-wr bg-[#f7f7f7] pt-[40px] pb-[10%]">
				<div className="center-wr">
					<div className="flex p-[8px] bg-[#f7f7f7] gap-[7px]">
						<span><Link to={"/"} className="hover:text-[#ff7637]">Home</Link></span> &gt; <span className="text-[#FF7637] font-[600]">Contact Us</span>
					</div>
					<div className=" pt-[3%]">
						<h3 className="w-fit"><strong>CONTACT</strong> US</h3>
					</div>

					<div className="pt-[2%] pb-[4%] contact-us-paras" dangerouslySetInnerHTML={{ __html: contactusContent }}></div>

					<div className="flex gap-[30px] contact-us-form-details-wr">



						<div className="w-[38%] mx-[auto] bg-[#f0f0f0] px-[40px] py-[30px] h-[fit-content] warranty-registeration-form-wr">
							<Formik
								initialValues={{ name: '', phone: '', email: '', message: '' }}
								validate={(values) => {
									let errors = {};
									if (!values.name) errors.name = "Name is required";
									if (!values.email) errors.email = "Email is required";
									else if (
										!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
									) {
										errors.email = 'Invalid email address';
									}
									if (!values.phone) errors.phone = "Phone is required";
									if (!values.message) errors.message = "Please write a message";
									return errors;
								}}
								onSubmit={(values, { setSubmitting, resetForm }) => {
									setTimeout(()=>{
										swal({
											icon: "success",
											title: "Our team will reach to you as soon as possible",
											showConfirmButton: false,
											timer: 2000
										});
										setSubmitting(false);
										resetForm(true)
									}, 500)
								}}
							>
								{({ values, errors, handleBlur, handleChange, handleReset, setFieldValue, touched, handleSubmit, isSubmitting }) => (
									<form onSubmit={handleSubmit}>
										<h3 className="text-[26px] pb-[25px]">SEND MESSAGE US AT</h3>
										<div className="mb-5 relative">
										{ touched.name && errors.name && <span className="font-medium text-red-600 text-[14px] absolute right-0 top-[-18px]" >{errors.name}</span>}
											<input value={values.name} name="name" onChange={handleChange} onBlur={handleBlur} className={`w-full rounded-[0] p-[10px]  focus:outline-none bg-[#fff] ${ (touched.name && errors.name) ? 'border border-red-600' : 'border border-[rgba(0,0,0,0.06)]'}`} placeholder="Name" />
										</div>
										<div className="mb-5 relative">
										{ touched.phone && errors.phone && <span className="font-medium text-red-600 text-[14px] absolute right-0 top-[-18px]" >{errors.phone}</span>}
											<input value={values.phone} name="phone" onChange={handleChange} onBlur={handleBlur} className={`w-full rounded-[0] p-[10px]  focus:outline-none bg-[#fff] ${ (touched.phone && errors.phone) ? 'border border-red-600' : 'border border-[rgba(0,0,0,0.06)]'}`} placeholder="Phone" />
										</div>
										<div className="mb-5 relative">
										{ touched.email && errors.email && <span className="font-medium text-red-600 text-[14px] absolute right-0 top-[-18px]" >{errors.email}</span>}
											<input value={values.email} name="email" onChange={handleChange} onBlur={handleBlur} className={`w-full rounded-[0] p-[10px]  focus:outline-none bg-[#fff] ${ (touched.email && errors.email) ? 'border border-red-600' : 'border border-[rgba(0,0,0,0.06)]'}`} placeholder="Email" />
										</div>
										<div className="mb-5 relative">
										{ touched.message && errors.message && <span className="font-medium text-red-600 text-[14px] absolute right-0 top-[-18px]" >{errors.message}</span>}
											<textarea value={values.message} name="message" onChange={handleChange} onBlur={handleBlur} rows="4" className={`w-full rounded-[0] p-[10px]  resize-none focus:outline-none bg-[#fff]  ${ (touched.message && errors.message) ? 'border border-red-600' : 'border border-[rgba(0,0,0,0.06)]'}`} placeholder="Message" />
										</div>

										<div className="mb-4 recaptcha-cont">
											<ReCAPTCHA
												sitekey="6Ld5r6spAAAAAB3g1Z9-ak4_rwRJo7vczQdIHLP6"
												onChange={handleCaptchaChange}
											/>
										</div>
										<button
											type="submit"
											className="btn-special-spread py-[10px] px-[15px] w-[46%] text-[18px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]">
											<span className="leading-[50px]">{ isSubmitting ? <ColorRing
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
								)}
							</Formik>

						</div>

						<div className="w-[50%] px-[5%]">
							<div className="py-[5%]">
								<h3 className="text-[26px]">QUICK CONTACT</h3>
								<p className="leading-[30px] py-[10px] text-[16px]">We strive to provide you excellent and satisfactory customer service and will reach out to you shortly.</p>
							</div>

							<div onClick={navigateToMap} className="for-contact-res shadow-md bg-[#fff] py-[25px] px-[20px] flex gap-[25px] items-center border-[1px] border-[#ff763733] transition cursor-pointer hover:bg-[#faf6f5]">
								<figure className="w-[60px]">
									<img src="/images/contactLocationIcon.png" alt="Our Address" />
								</figure>
								<div >
									<h3 className="text-[20px] font-[300] pb-[15px]">Our Address</h3>
									<h4 className="text-[18px] font-[500] uppercase">{contactDetails?.sectionContent?.filter(item=>item?.elementAttrName === 'address')[0]?.elementValue}</h4>
								</div>
							</div>


							<div onClick={openPhoneNumber} className="for-contact-res shadow-md bg-[#fff] my-[19px] py-[25px] px-[20px] flex gap-[25px] items-center border-[1px] border-[#ff763733] transition cursor-pointer hover:bg-[#faf6f5]">
								<figure className="w-[60px] contact-us-phone-icon">
									<img src="/images/contactPhoneIcon.png" alt="Our Address" />
								</figure>
								<div >
									<h3 className="text-[20px] font-[300] pb-[15px]">Call Us</h3>
									<h4 className="text-[18px] font-[500] uppercase">{contactDetails?.sectionContent?.filter(item=>item?.elementAttrName === 'phone')[0]?.elementValue?.split(",")[1]?.split(" ")?.join("")}</h4>
								</div>
							</div>

							<div onClick={openEmail} className="for-contact-res shadow-md bg-[#fff] py-[25px] px-[20px] flex gap-[25px] items-center border-[1px] border-[#ff763733] transition cursor-pointer hover:bg-[#faf6f5]">
								<figure className="w-[60px] contact-us-mail-icon">
									<img src="/images/contactMailIcon.png" alt="Our Address" />
								</figure>
								<div >
									<h3 className="text-[20px] font-[300] pb-[15px]">Mail Us</h3>
									<h4 className="text-[18px] font-[500] uppercase">{contactDetails?.sectionContent?.filter(item=>item?.elementAttrName === 'email')[0]?.elementValue}</h4>
								</div>
							</div>
						</div>

					</div>

					{/* MAP CONTENT */}
					<div className="p-[15px] my-[30px] mt-[50px] shadow-lg bg-[#fff]">
						<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.9255100973037!2d75.90198137596663!3d22.76814552577363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39631d4c094c2201%3A0xd1fbd63510274e2e!2s22%2C%20Gulab%20Bagh%2C%20Bapu%20Gandhi%20Nagar%2C%20Scheme%20No%20114%2C%20Indore%2C%20Madhya%20Pradesh%20452010!5e0!3m2!1sen!2sin!4v1709215036896!5m2!1sen!2sin" style={{ width: "100%" }} height="450"  ></iframe>
					</div>
				</div>

			</section>
			<EnquirySection />
			<Footer />
		</>
	)
}

export default ContactUsPage;
