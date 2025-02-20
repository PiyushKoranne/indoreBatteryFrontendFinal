import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import EnquirySection from "../common/EnquirySection";
import Footer from "../common/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useInView } from 'react-intersection-observer';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { Collapse, Select } from 'antd';
import parse from 'html-react-parser';
import { IoCaretForward } from "react-icons/io5";
import { MdKeyboardArrowUp } from "react-icons/md";
import { Formik } from "formik";
import { ColorRing } from "react-loader-spinner";
import HeaderNew from "../common/HeaderNew";
import Meta from "../common/Meta";
import log from "../../utils/utilityFunctions";


function FaqPage() {
	const [qna, setQna] = useState([]);
	const [footerLine, setFooterLine] = useState("");
	const [tabber, setTabber] = useState("general");
	const navigate = useNavigate();
	const { ref, inView, entry } = useInView({
		threshold: 0,
	});

	const [interacted, setInteracted] = useState(false);

	async function getPageData() {
		await sleep(500);
		const response = await axios.get("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-page-content?pagename=Faq", {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
			}
		});
		log("this is data", response?.data?.pageData?.sections[2]?.sectionContent[0]?.elementValue)
		let nodeArray = [];
		response?.data?.pageData?.sections[1]?.sectionContent[0]?.elementItems.forEach((item, index) => {
			const htmlString = item?.value;
			const parsedHTML = parse(htmlString);
			const h3Text = parsedHTML.filter(node => node.type === 'h3')[0]?.props.children;
			const content = parsedHTML.filter(node => node.type === 'p')[0]?.props.children;
			nodeArray.push({
				key: index,
				label: h3Text,
				children: <p>{content}</p>
			})
		})
		setQna(nodeArray);
		setFooterLine(response?.data?.pageData?.sections[2]?.sectionContent[0]?.elementValue);
	}

	function sleep(ms) {
		return new Promise(res => {
			setTimeout(() => {
				res();
			}, ms)
		})
	}

	async function handleCallbackRequest(values) {
		// e.preventDefault();
		const response = await axios.post(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/request-callback`, {
			name: values.name,
			contactNum: values.contactNum,
			city: values.city,
			enquiry: values.enquiry
		}, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
			}
		})
		if (response.status === 200) {
			swal({
				icon: "success",
				title: "Our team will reach to you as soon as possible",
				showConfirmButton: false,
				timer: 2000
			});
		}
	}

	useEffect(() => {
		getPageData()
	}, [])
	return (
		<>
			<Meta title="FAQ | Indore Battery" />
			<HeaderNew />
			<section className="bg-[#f7f7f7] 320:pt-[40px] 320:pb-[50px] pb-[7%] faq-pg-wr">
				<div className="center-wr">
					<div className="flex p-[8px] bg-[#F5F5F5] gap-[7px] items-center">
						<span className="text-[16px] font-[600] leading-[20px]" >
							<Link to={"/"} className="hover:text-[#ff7637]">Home Page</Link>
						</span>
						<span className="inline-block py-[1px] ">
							<img src="/images/bar.png" className="" alt="" />
						</span>
						<span className="text-[#FF7637] text-[16px] font-[600] leading-[20px]">Faq</span>
					</div>

					<div className="980:py-[50px]">
						<h3 className="text-center"><strong>FREQUENTLY</strong> ASKED QUESTIONS</h3>
						<p className="text-center leading-[25px] text-[14px] w-[60%] mx-auto my-0 mt-[15px]">We have compiled a list of the queries that we get asked most often. We try our best to reach out to our customers as soon as possible, in the meantime you are likely to find answers to your queries here.</p>

						<div className="flex items-center 320:flex-col 1024:flex-row 320:gap-[20px] mt-[60px] justify-between">
							<h3 className="text-[21px] font-[700] leading-[31px] uppercase">Have any questions?</h3>
							<div className="rounded-[6px] pl-[10px] py-[10px] border-[1px] border-[#ff7637] pr-[50px] relative w-[70%] bg-white">
								<input type="text" className="bg-white outline-none border-none w-full" placeholder="Type your questions here." />
								<button><i class="fa-solid fa-magnifying-glass text-[#ff7637] absolute right-[20px] top-[15px]"></i></button>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="1200:mb-[100px] 320:mb-[50px]">
				<div className="center-wr">
					<div className="mx-auto my-[50px] flex flex-wrap items-center justify-evenly w-fit">
						{/* border-[#ff7637] text-[#ff7637] */}
						<span onClick={() => { setTabber("general") }} className={`cursor-pointer inline-block font-semibold py-[15px] 320:py-[7px] 320:w-[50%] 650:w-fit 320:text-center 320:px-[25px] px-[50px] border-[1px] border-[rgba(0,0,0,0.08)] ${tabber === 'general' ? 'bg-[#ff7637] text-[#ffffff]' : 'bg-transparent'}`}>General</span>
						<span onClick={() => { setTabber("batteries") }} className={`cursor-pointer inline-block font-semibold py-[15px] 320:py-[7px] 320:w-[50%] 650:w-fit 320:text-center 320:px-[25px] px-[50px] border-[1px] border-[rgba(0,0,0,0.08)] ${tabber === 'batteries' ? 'bg-[#ff7637] text-[#ffffff]' : 'bg-transparent'}`}>Batteries</span>
						<span onClick={() => { setTabber("services") }} className={`cursor-pointer inline-block font-semibold py-[15px] 320:py-[7px] 320:w-[50%] 650:w-fit 320:text-center 320:px-[25px] px-[50px] border-[1px] border-[rgba(0,0,0,0.08)] ${tabber === 'services' ? 'bg-[#ff7637] text-[#ffffff]' : 'bg-transparent'}`}>Service</span>
						<span onClick={() => { setTabber("payments") }} className={`cursor-pointer inline-block font-semibold py-[15px] 320:py-[7px] 320:w-[50%] 650:w-fit 320:text-center 320:px-[25px] px-[50px] border-[1px] border-[rgba(0,0,0,0.08)] ${tabber === 'payments' ? 'bg-[#ff7637] text-[#ffffff]' : 'bg-transparent'}`}>Payments</span>
					</div>

					<div className="w-[60%] 320:w-full mx-auto my-[35px] faq-collapse">
						{qna?.length > 0 ? (
							<Collapse
								accordion={true}
								expandIconPosition="end"
								bordered={false}
								items={tabber === "general" ? qna?.slice(0, 4) : tabber === "batteries" ? qna.slice(4, 8) : tabber === "services" ? qna.slice(8, 12) : qna.slice(12, 15)}
								defaultActiveKey={['1', '5', '9', '13']}
								expandIcon={({ isActive }) => <div className="w-[42px] h-[42px] flex items-center justify-center bg-[#f1f1f1]"><img src="/images/faq-arrow.png" style={{ transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)' }} /></div>}
							/>
						) : (
							<>
								<div className="mt-[30px]">
									<Skeleton count={1} className="mb-[30px] h-[50px]" />
									<Skeleton count={3} />
								</div>
								<div className="mt-[30px]">
									<Skeleton count={1} className="mb-[30px] h-[50px]" />
									<Skeleton count={3} />
								</div>
								<div className="mt-[30px]">
									<Skeleton count={1} className="mb-[30px] h-[50px]" />
									<Skeleton count={3} />
								</div>
							</>
						)}
					</div>
				</div>
			</section>

			<section className=" relative overflow-hidden z-0 1200:pb-[100px]">
				<figure className="absolute z-[-2] w-full h-full ">
					<img src="/images/faq-bottom-bg.png" className="w-full h-full object-cover" alt="" />
				</figure>
				<div className="absolute bg-[rgba(0,0,0,0.92)] left-0 right-0 top-0 bottom-0 z-[-1]"></div>
				<div className="center-wr z-[3]">
					<div className="pt-[80px] pb-[200px] 320:pb-[80px]">
						<h3 className="font-['Oswald'] font-[700] leading-[68px] text-[34px] text-white text-center mb-[20px]"><strong>DIDN'T</strong> FIND AN ANSWER?</h3>
						<p className="content-para-white text-center">If you cannot find an answer to your question in our FAQ, you can always contact us and we will react out to you shortly.</p>
						<div className="mt-[60px]">
							<Formik
								initialValues={{ name: '', contactNum: '', city: '', enquiry: '' }}
								validate={(values) => {
									let errors = {};
									if (!values.name) errors.name = "* Name is required";
									if (!values.contactNum) errors.contactNum = "* Contact is required";
									if (!values.city) errors.city = "* City is required";
									if (!values.enquiry) errors.enquiry = "* Please provide your enquiry question";
									return errors;
								}}
								onSubmit={(values, { setSubmitting }) => {
									log(values);
									handleCallbackRequest(values);
									setSubmitting(false);

								}}
							>
								{({ values, errors, handleBlur, handleChange, handleSubmit, touched, isSubmitting }) => (
									<form onSubmit={handleSubmit} className="w-[100%] flex items-center justify-center flex-wrap mx-auto gap-[22px]">
										<div className="relative 320:w-[97.4%] 650:w-[31.33%] bg-[rgba(255,255,255,0.1)] border-[1px] border-[rgba(255,255,255,0.5)]">
											{(touched.name && errors.name) && <span className="text-red-500 absolute top-[0px] translate-y-[-100%] left-[5px] font-medium text-[14px]">{errors.name}</span>}
											<input placeholder="Full Name" className="faq-black-form w-full p-[10px] bg-transparent text-[rgba(255,255,255,0.5)] outline-none" type="text" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
										</div>
										<div className="relative 320:w-[97.4%] 650:w-[31.33%] bg-[rgba(255,255,255,0.1)] border-[1px] border-[rgba(255,255,255,0.5)]">
											{(touched.contactNum && errors.contactNum) && <span className="text-red-500 absolute top-[0px] translate-y-[-100%] left-[5px] font-medium text-[14px]">{errors.contactNum}</span>}
											<input placeholder="Mobile" className="faq-black-form w-full p-[10px] bg-transparent text-[rgba(255,255,255,0.5)] outline-none" type="text" name="contactNum" value={values.contactNum} onChange={handleChange} onBlur={handleBlur} />
										</div>
										<div className="relative 320:w-[97.4%] 650:w-[31.33%] bg-[rgba(255,255,255,0.1)] border-[1px] border-[rgba(255,255,255,0.5)]">
											{(touched.city && errors.city) && <span className="text-red-500 absolute top-[0px] translate-y-[-100%] left-[5px] font-medium text-[14px]">{errors.city}</span>}
											<input placeholder="City" className="faq-black-form w-full p-[10px] bg-transparent text-[rgba(255,255,255,0.5)] outline-none" type="text" name="city" value={values.city} onChange={handleChange} onBlur={handleBlur} />
										</div>
										<div className="relative 320:w-[97.4%] 980:w-[97.4%] 650:w-[75%] bg-[rgba(255,255,255,0.1)] border-[1px] border-[rgba(255,255,255,0.5)]">
											{(touched.enquiry && errors.enquiry) && <span className="text-red-500 absolute top-[0px] translate-y-[-100%] left-[5px] font-medium text-[14px]">{errors.enquiry}</span>}
											<textarea placeholder="Enquiry" className="faq-black-form resize-none w-full p-[10px] bg-transparent outline-none" rows={8} type="text" name="enquiry" value={values.enquiry} onChange={handleChange} onBlur={handleBlur} >{values.enquiry}</textarea>
										</div>
										<div className="py-[10px] w-full text-center">
											<button className=" faq-btn hover:bg-orange-600 transition-all bg-[#ff7637] leading-[50px] px-[40px] text-white text-[18px] border-l-[8px] border-[#ffffff] font-[600]">
												{isSubmitting ? <ColorRing
													visible={true}
													height="50"
													width="50"
													ariaLabel="color-ring-loading"
													wrapperStyle={{}}
													wrapperclassName="color-ring-wrapper"
													colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
												/> : <>Send <span className="faq-plane"><i className="fa-regular fa-paper-plane text-white ml-[10px] "></i></span></>}
											</button>
										</div>
									</form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</section>

			<div className={`faq-inquiry-poppin ${(inView && !interacted) ? 'show-poppin' : ''}`}>
				<figure className="relative">
					<img src="/images/faq-boy.png" alt="" />
					<img id="happy-face-img" src="/images/head-very-happy.png" className="absolute top-0 left-0 hidden" alt="" />
				</figure>
			</div>
			<div className={` poppin-content bg-white shadow-lg flex flex-col p-[25px] rounded-[10px] ${(inView && !interacted) ? 'poppin-content-show' : ''}`}>
				Hey there! If you have any more queries reach out to us.
				<div className="flex items-center gap-[20px] mt-[10px]">
					<button onMouseEnter={() => { document.getElementById('happy-face-img').classList.remove('hidden') }} onMouseLeave={() => { document.getElementById('happy-face-img').classList.add('hidden') }} onClick={() => { navigate('/contact-us') }} className="font-medium text-[14px] text-[#ff7637]">Sure!</button>
					<button onClick={() => { setInteracted(true) }} className="font-medium text-[14px] text-[#484848]">No thanks</button>
				</div>
			</div>

			<EnquirySection />
			<Footer />
		</>
	)
}

export default FaqPage;
