import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { batteryIndoreDataService } from "../../services/dataService";
import log from "../../utils/utilityFunctions";


function NeedAnyHelpStrip() {
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
	}, [])
	return (
		<>
			<section className="help-section 320:py-[45px] 560:py-[60px] 1024:py-[75px] 1200:py-[100px] 320:mt-[35px] 560:mt-[60px] 1024:mt-[75px] 1200:mt-[0px] my-[70px] text-[#fff]">
				<div className="center-wr">
					<div className="flex flex-col items-center">
						<div>
							<h3 className="text-[38px] 1024:text-[30px] font-[700] text-white"> <span className="text-[#FF7637]">NEED</span> ANY HELP TO CHOOSE THE RIGHT <span className="text-[#FF7637]">PRODUCT </span>FOR YOU </h3>
						</div>
						<div className="w-[81%] pt-[60px]">
							<fieldset className=" text-center  border-[1px] border-[#ff7637]">
								<legend className="uppercase px-[10px] text-[30px]">Feel Free To Call</legend>
								<div className="flex justify-around py-[50px]">
									<div className="flex gap-[20px] items-center">
										<figure>
											<img src="/images/callPhone.png" alt="request a callback" />
										</figure>
										<div>
											<span className="block text-left text-[20px] font-['Oswald'] font-[400] leading-[30px]">Request a callback</span>
											<span className="block text-left font-[600] text-[20px] leading-[25px]"><a href={`tel:${contactDetails?.sectionContent?.filter(item => item?.elementAttrName === 'phone')[0]?.elementValue?.split(",")[0]?.split(" ")?.join("")}`}> {contactDetails?.sectionContent?.filter(item => item?.elementAttrName === 'phone')[0]?.elementValue?.split(",")[0]?.split(" ")?.join("")}</a>,&nbsp;
												<a href={`tel:${contactDetails?.sectionContent?.filter(item => item?.elementAttrName === 'phone')[0]?.elementValue?.split(",")[1]?.split(" ")?.join("")}`}> {contactDetails?.sectionContent?.filter(item => item?.elementAttrName === 'phone')[0]?.elementValue?.split(",")[1]?.split(" ")?.join("")}</a></span>
										</div>
									</div>
									<div className="flex gap-[20px] items-center">
										<figure>
											<img src="/images/callWhatsapp.png" alt="request a callback" />
										</figure>
										<div>
											<span className="block text-left text-[20px] font-['Oswald'] font-[400] leading-[30px]">SMS On Whatsapp Chat</span>
											<span className="block text-left font-[600] text-[20px] leading-[25px]"><a target="_blank" href={`https://wa.me/91${contactDetails?.sectionContent?.filter(item => item?.elementAttrName === 'phone')[0]?.elementValue?.split(",")[0]?.split(" ")?.join("")}`}> {contactDetails?.sectionContent?.filter(item => item?.elementAttrName === 'phone')[0]?.elementValue?.split(",")[0]?.split(" ")?.join("")}</a>,&nbsp;
												<a target="_blank" href={`https://wa.me/91${contactDetails?.sectionContent?.filter(item => item?.elementAttrName === 'phone')[0]?.elementValue?.split(",")[1]?.split(" ")?.join("")}`}> {contactDetails?.sectionContent?.filter(item => item?.elementAttrName === 'phone')[0]?.elementValue?.split(",")[1]?.split(" ")?.join("")}</a></span>
										</div>
									</div>
								</div>
							</fieldset>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default NeedAnyHelpStrip;