import React, { useEffect, useState } from "react";
import { batteryIndoreDataService } from "../../services/dataService";

function FreeToCallStrip() {

	const [contactDetails, setContactDetails] = useState(null);

	async function getContactDetails() {
		try {
			const response = await batteryIndoreDataService.getContactDetails();
			console.log("GETTING CONTACT DETAILS RESPONSE", response);
			setContactDetails(response?.data?.data);

		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getContactDetails();
	}, [])

	return (
		<section className="freeToCallStripWr 320:hidden 1200:block absolute w-full top-0 translate-y-[-50%] left-[50%] translate-x-[-50%]">
			<div className="center-wr">
				<div className="bg-[#ff7637] text-[#fff] flex justify-around pb-[50px] pt-[50px] free-to-call-strip-content">
					<div className="feel-free-strip flex items-center justify-center gap-[20px] w-[33.33%]">
						<figure><img src="/images/location.png" alt="feel free to call us" /></figure>
						<div>
							<span>Our Address</span>
							<h3 className="font-['Oswald] font-[600] text-white text-[18px] leading-[35px] uppercase w-[267px] mt-[5px] free-to-call-strip-links"><a target="_blank" href="https://maps.app.goo.gl/L1dzQkjN72dCWJTD9"> {contactDetails?.sectionContent?.filter(item => item?.elementAttrName === 'address')[0]?.elementValue}</a></h3>
						</div>

					</div>
					<div className="feel-free-strip flex items-center justify-center gap-[20px] w-[33.33%]">
						<figure ><img src="/images/Phone.png" alt="feel free to call us" /></figure>
						<div>
							<span>Call Us</span>
							<h3 className="font-['Oswald] font-[600] text-white text-[18px] leading-[35px] uppercase mt-[5px] free-to-call-strip-links"><a target="_blank" href={`tel:${contactDetails?.sectionContent?.filter(item => item?.elementAttrName === 'phone')[0]?.elementValue?.split(",")[1]?.split(" ")?.join("")}`}> {contactDetails?.sectionContent?.filter(item => item?.elementAttrName === 'phone')[0]?.elementValue?.split(",")[1]}</a></h3>
						</div>
					</div>
					<div className="feel-free-strip  flex items-center justify-center gap-[20px] w-[33.33%]">
						<figure ><img src="/images/email.png" alt="feel free to call us" /></figure>
						<div>
							<span>Mail Us</span>
							<h3 className="font-['Oswald] font-[600] text-white text-[18px] leading-[35px] uppercase mt-[5px] free-to-call-strip-links"><a href="mailto:batteryindore@gmail.com">{contactDetails?.sectionContent?.filter(item => item?.elementAttrName === 'email')[0]?.elementValue}</a></h3>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
export default FreeToCallStrip;