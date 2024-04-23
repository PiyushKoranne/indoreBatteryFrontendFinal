import React from "react";
import Header from "../common/Header";
import EnquirySection from "../common/EnquirySection";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import HeaderNew from "../common/HeaderNew";

function PrivacyPolicy(){
        const contentArray = [
                {
                title:"INTRODUCTION:",
                description:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
                },{
                    title:"What is Lorem Ipsum?:",
                    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
                },{
                    title:"Where does it come from?",
                    description:"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."
                },{
                  title:"Where can I get some?",
                  description:"long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
                },{
                  title:"Why do we use it?",
                  description:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
                }
]

    return(
        <>
        <HeaderNew />
        <section className="privacy-policy-pg-wr bg-[#F7F7F7] py-[5%] pb-[10%]">
            <div className="center-wr">
                 <div className="flex p-[8px] bg-[#F5F5F5] gap-[7px]">
			<span><Link to={"/"} className="hover:text-[#ff7637]">Home</Link></span> &gt; <span className="text-[#FF7637] font-[600]">Privacy Policy</span>
		</div>

                 <div className="privacy-policy-content-wr">
                                  {/* PRIVACY POLICY HEADING */}
                          <h1 className="text-[#FF7637] font-[800] py-[45px] text-[34px]">PRIVACY POLICY</h1>

                                  {/* MAIN CONTENT */}
                                  {contentArray?.length === "0" ? (
                                          <>
                                          	<div className="mb-[15px] mt-[20px]">
                                                        <span className="mb-[30px] block">
							<Skeleton  count={2}/>
                                                        </span>
                                                        <span className="mb-[30px] block">
							<Skeleton  count={3}/>
                                                        </span>
						</div>

						<div className="mb-[15px]">
							<span className="mb-[30px] block">
							<Skeleton  count={2}/>
                                                        </span>
                                                        <span className="mb-[30px] block">
							<Skeleton  count={3}/>
                                                        </span>
						</div>

						<div className="mb-[15px]">
							<span className="mb-[30px] block">
							<Skeleton  count={2}/>
                                                        </span>
                                                        <span className="mb-[30px] block">
							<Skeleton  count={3}/>
                                                        </span>
						</div>
                                          </>
                                  ) : (
                                        contentArray?.map((item,index)=>(
                                                <div key={index}>
                                                     <h3>{item?.title}</h3>
                                                     <p>{item?.description}</p>
                                                </div>
                                        ))
                                             
                                  )}
                  </div>
             </div>

        </section>
			<EnquirySection/>
			<Footer/>
        </>
    )
}

export default PrivacyPolicy;
