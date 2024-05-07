import React, { useEffect, useState } from "react";
import Header from "./common/Header";
import Banner from "./homeComponents/BannerSection";
import ShopByManufacturer from "./homeComponents/ShopByManufacturer";
import ShopByBrand from "./homeComponents/ShopByBrand";
import TopMoneySavers from "./homeComponents/TopMoneySavers";
import WhyChooseUs from "./homeComponents/WhyChooseUs";
import EnquirySection from "./common/EnquirySection";
import Footer from "./common/Footer";
import Testimonial from "./homeComponents/Testimonial";
import KnowMore from "./homeComponents/KnowMore";
import { batteryIndoreDataService } from "../services/dataService";
import NeedAnyHelpStrip from "./homeComponents/NeedAnyHelpStrip";
import Loader from "./Loader";
import HeaderNew from "./common/HeaderNew";
import Meta from "./common/Meta";

function Home() {

	const [pageData, setPageData] = useState(undefined);
	const [showLoader, setShowLoader] = useState(true);

	function loadScript(src) {
		return new Promise((resolve, reject) => {
			const scriptElem = document.createElement('script');
			scriptElem.src = src;
			scriptElem.onload = () => { resolve(true) }
			scriptElem.onerror = () => { reject(false) }
			document.body.appendChild(scriptElem);
		})
	}

	async function handleScript() {
		await loadScript("https://grwapi.net/widget.min.js");
	}

	useEffect(() => {
		handleScript();
	})

	async function getDynamicData() {
		const response = await batteryIndoreDataService.getLandingPageContent();
		setPageData(response.data.pageData)
	}

	// useEffect(() => {
	// 	window.scrollTo(0, 0);
	// })

	function sleep(ms) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve()
			}, ms)
		})
	}
	async function callSleep() {
		document.body.style.overflow = "hidden"
		await sleep(2000);
		document.getElementById("Loader").style.opacity = 0
		await sleep(400);
		document.body.style.overflow = "auto"
		setShowLoader(false);
	}

	useEffect(() => {
		getDynamicData();
		callSleep()
	}, [])



	// let mailTransporter = nodemailer.createTransport({
	// 	host: 'smtp.gmail.com',
	// 	port: 587,
	// 	secure: false, // true for 465, false for other ports
	// 	auth: {
	// 		user: `${process.env.SMTP_MAIL}`, // generated user
	// 		pass: `${process.env.SMTP_MAIL_PSWD}`  // generated password
	// 	}
	// });



	return (
		<>
			{showLoader && <Loader />}
			<Meta title="Indore Battery" />
			<HeaderNew pageData={pageData?.sections?.filter(section => section.sectionName === "Contact Details Section")[0]} />
			<Banner pageData={pageData?.sections?.filter(section => section.sectionName === "Hero Section")[0]} />
			<KnowMore pageData={pageData?.sections?.filter(section => section.sectionName === "Know More Section")[0]} />
			<ShopByManufacturer pageData={pageData?.sections?.filter(section => section.sectionName === "Shop by Manufacturers")[0]} />
			<TopMoneySavers pageData={pageData?.sections?.filter(section => section.sectionName === "Best Sellers Section")[0]} />
			<ShopByBrand pageData={pageData?.sections?.filter(section => section.sectionName === "Battery Brands Section")[0]} />
			<WhyChooseUs pageData={pageData?.sections?.filter(section => section.sectionName === "Why Choose Us Section")[0]} />
			<NeedAnyHelpStrip pageData={pageData?.sections.filter(section => section.sectionName === "Need Help Section")[0]} />
			<Testimonial pageData={pageData} />
			<EnquirySection />
			<div className="review-widget_net fixed bottom-[2%] left-[2%] z-[2]" data-uuid="9b8bbfec-2a2d-47b5-8c6a-5330fc490c3e" data-template="10" data-lang="en" data-theme="light"></div>
			<Footer />
		</>
	)
}

export default Home;