import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

function WhyChooseUs({ pageData }) {

	const backend_url = import.meta.env.VITE_BACKEND_URL
	const [chooseUsListData, setChooseUsListData] = useState([])

	async function getDynamicData() {
		setChooseUsListData(pageData?.sectionContent[2].elementItems)
	}
	useEffect(() => {
		getDynamicData()
	}, [pageData])


	return (
		<section className="shop-by-manufactures 320:hidden 1024:block 320:py-[35px] 650:py-[0px] 320:mt-[35px] 560:mt-[60px] 1024:mt-[75px] 1200:mt-[100px]  ">
			<div className="center-wr">
				{
					pageData?.sectionContent[3]?.elementValue === "" ?
					<Skeleton className="h-[30px] mb-[30px]"/> 
					: <h3 className="w-[100%] text-[34px] pb-[25px] text-[#202020] font-[800] uppercase 320:text-center 480:text-left" dangerouslySetInnerHTML={{ __html: pageData?.sectionContent[3]?.elementValue }}></h3>

				}
				<div className="flex for-alignment">
					<div className="w-[50%] why-p-cont">
						<div>
							{pageData?.sectionContent[0]?.elementValue === "" ?
							<Skeleton count={8}/>
							 :
							<p className="mt-[3%] 320:text-center 480:text-left" dangerouslySetInnerHTML={{ __html: pageData?.sectionContent[0]?.elementValue }}></p>
						}
						</div>
						<div>
							<ul>
								{chooseUsListData?.length > 0 ? (
									chooseUsListData?.map((item) => (
										<li className="why-choose-us-list pl-[80px] mt-[5%] mb-[5%]" key={item.id} dangerouslySetInnerHTML={{ __html: item.value }} >

										</li>
									))
								) : 
								<>
								<div className="my-[30px]">
									<Skeleton  count={3}/>
								</div>

								<div className="my-[30px]">
									<Skeleton  count={3}/>
								</div>

								<div className="my-[30px]">
									<Skeleton  count={3}/>
								</div>
									
								</>
								}
							</ul>
						</div>
					</div> 
					<div className="relative 320:hidden 480:block">
						<figure className=" relative bottom-[60px] left-[30px] w-full why-img-cont">{
							pageData?.sectionContent[1]?.elementAttrSrcImg === "" ? 
							<Skeleton className="h-[500px] w-[633px] mt-[64px]" /> :
							<>
							<img className="why-choose-us-img max-w-[1320px] w-full h-auto" src={`${backend_url}/images/${pageData?.sectionContent[1]?.elementAttrSrcImg}`} alt="Why Choose Us" />
							</>
						}
						</figure>
					</div>
				</div>
			</div>
		</section>
	)
}

export default WhyChooseUs;