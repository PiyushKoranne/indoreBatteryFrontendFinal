import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import EnquirySection from "../common/EnquirySection";
function Checkout(){
    return(
        <>
        <Header/>
        <section className="pt-[9%] pb-[4%] bg-[#F7F7F7]">  
            <div className="center-wr">
                <div className="flex">
                    
                <div className="w-[50%]">
                    <div className="flex flex-row justify-between">
                        <h3 className="text-[#236DDC] font-[400] text-[24px]">BILLING/SHIPPING DETAIL</h3> 
                        <button className="text-[#fff] bg-[#236DDC] px-[15px] mr-[68px] py-[10px]">ADD NEW ADDRESS</button>
                    </div>
                    <div className="my-[15px]">
                    <div style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)"}} className="text-left w-[90%] my-[15px] border-[1px] border-solid border-[rgba(0,0,0,0.1)] py-[15px] px-[30px] bg-[#fff]">
                        <ul>
                            <li>Hrashikesh Pandey</li>
                            <li>dsfsdfsdf,</li>
                            <li>Delhi,Delhi</li>
                            <li>110003 - India</li>
                            <li>
                                <span className="font-[600]">Email:</span>
                                <span>hrashikeshapandey@gmail.com</span>
                            </li>
                            <li>
                                <span  className="font-[600]">Phone:</span>
                                <span>96154545</span>
                            </li>
                        </ul>
                        </div>
                    <div style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)"}} className="text-left w-[90%] my-[15px] border-[1px] border-solid border-[rgba(0,0,0,0.1)] py-[15px] px-[30px] bg-[#fff]">
                        <ul>
                            <li>Hrashikesh Pandey</li>
                            <li>dsfsdfsdf,</li>
                            <li>Delhi,Delhi</li>
                            <li>110003 - India</li>
                            <li>
                                <span className="font-[600]">Email:</span>
                                <span>hrashikeshapandey@gmail.com</span>
                            </li>
                            <li>
                                <span  className="font-[600]">Phone:</span>
                                <span>96154545</span>
                            </li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div className="w-[50%]">
                    <div className="py-[5px]">
                        <span  className="align-middle py-[6.8px] px-[14px] inline-block bg-[#EEEEEE] border-[1px] border-solid border-[rgba(0,0,0,0.2)] border-r-[0]" style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)",borderTopLeftRadius:"3px",borderBottomLeftRadius:"3px"}} ><i className='bx bxs-user text-[#555555]' ></i></span>
                        <input className="w-[90%] align-middle focus:outline-none   border-[1px] border-solid border-[rgba(0,0,0,0.2)] py-[9px] px-[10px] text-[13px] font-[400] text-[#555]" style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)"}} type="text" value="Hrashikesh"/>
                    </div>
                    <div className="py-[5px]">
                        <span  className="align-middle py-[6.8px] px-[14px] inline-block bg-[#EEEEEE] border-[1px] border-solid border-[rgba(0,0,0,0.2)] border-r-[0]" style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)",borderTopLeftRadius:"3px",borderBottomLeftRadius:"3px"}} ><i className='bx bxs-user text-[#555555]' ></i></span>
                        <input className="w-[90%] align-middle focus:outline-none   border-[1px] border-solid border-[rgba(0,0,0,0.2)] py-[9px] px-[10px] text-[13px] font-[400] text-[#555]" style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)"}} type="text" value="Pandey"/>
                    </div>
                    <div className="py-[5px]">
                        <span  className="align-middle py-[6.8px] px-[14px] inline-block bg-[#EEEEEE] border-[1px] border-solid border-[rgba(0,0,0,0.2)] border-r-[0]" style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)",borderTopLeftRadius:"3px",borderBottomLeftRadius:"3px"}} ><i className='bx bxs-envelope text-[#555555]' ></i></span>
                        <input className="w-[90%] align-middle focus:outline-none   border-[1px] border-solid border-[rgba(0,0,0,0.2)] py-[9px] px-[10px] text-[13px] font-[400] text-[#555]" style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)"}} type="text" value="hrashikeshapandey@gmail.com"/>
                    </div>
                    <div className="py-[5px]">
                        <span  className="align-middle py-[6.8px] px-[14px] inline-block bg-[#EEEEEE] border-[1px] border-solid border-[rgba(0,0,0,0.2)] border-r-[0]" style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)",borderTopLeftRadius:"3px",borderBottomLeftRadius:"3px"}} ><i className='bx bxs-phone text-[#555555]' ></i></span>
                        <input className="w-[90%] align-middle focus:outline-none   border-[1px] border-solid border-[rgba(0,0,0,0.2)] py-[9px] px-[10px] text-[13px] font-[400] text-[#555]" style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)"}} type="text" value="9617308534"/>
                    </div>
                    <div className="py-[5px]">
                        <span  className="align-middle py-[6.8px] px-[14px] inline-block bg-[#EEEEEE] border-[1px] border-solid border-[rgba(0,0,0,0.2)] border-r-[0]" style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)",borderTopLeftRadius:"3px",borderBottomLeftRadius:"3px"}} ><i className='bx bxs-map text-[#555555]' ></i></span>
                        <input className="w-[90%] align-middle focus:outline-none   border-[1px] border-solid border-[rgba(0,0,0,0.2)] py-[9px] px-[10px] text-[13px] font-[400] text-[#555]" style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)"}} type="text" value="2121211212"/>
                    </div>
                    <div className="py-[5px]">
                        <span  className="align-middle py-[6.8px] px-[14px] inline-block bg-[#EEEEEE] border-[1px] border-solid border-[rgba(0,0,0,0.2)] border-r-[0]" style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)",borderTopLeftRadius:"3px",borderBottomLeftRadius:"3px"}} ><i className='bx bxs-map text-[#555555]' ></i></span>
                        <input className="w-[90%] align-middle focus:outline-none   border-[1px] border-solid border-[rgba(0,0,0,0.2)] py-[9px] px-[10px] text-[13px] font-[400] text-[#555]" style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)"}} type="text" value="221dfs"/>
                    </div>
                    <div className="py-[5px]">
                        <span  className="align-middle py-[6.8px] px-[14px] inline-block bg-[#EEEEEE] border-[1px] border-solid border-[rgba(0,0,0,0.2)] border-r-[0]" style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)",borderTopLeftRadius:"3px",borderBottomLeftRadius:"3px"}} ><i className='bx bxs-map text-[#555555]' ></i></span>
                        <input className="w-[90%] align-middle focus:outline-none   border-[1px] border-solid border-[rgba(0,0,0,0.2)] py-[9px] px-[10px] text-[13px] font-[400] text-[#555]" style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)"}} type="text" value="Maharashtra"/>
                    </div>
                    <div className="py-[5px]">
                        <span  className="align-middle py-[6.8px] px-[14px] inline-block bg-[#EEEEEE] border-[1px] border-solid border-[rgba(0,0,0,0.2)] border-r-[0]" style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)",borderTopLeftRadius:"3px",borderBottomLeftRadius:"3px"}} ><i className='bx bxs-map-alt text-[#555555]' ></i></span>
                        <input className="w-[90%] align-middle focus:outline-none   border-[1px] border-solid border-[rgba(0,0,0,0.2)] py-[9px] px-[10px] text-[13px] font-[400] text-[#555]" style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)"}} type="text" value="Mumbai"/>
                    </div>
                    <div className="py-[5px]">
                        <span  className="align-middle py-[6.8px] px-[14px] inline-block bg-[#EEEEEE] border-[1px] border-solid border-[rgba(0,0,0,0.2)] border-r-[0]" style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)",borderTopLeftRadius:"3px",borderBottomLeftRadius:"3px"}} ><i className='bx bxs-map-alt text-[#555555]' ></i></span>
                        <input className="w-[90%] align-middle focus:outline-none   border-[1px] border-solid border-[rgba(0,0,0,0.2)] py-[9px] px-[10px] text-[13px] font-[400] text-[#555]" style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)"}} type="text" value="110003"/>
                    </div>
                    <div className="py-[5px]">
                        <span  className="align-middle py-[6.8px] px-[14px] inline-block bg-[#EEEEEE] border-[1px] border-solid border-[rgba(0,0,0,0.2)] border-r-[0]" style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)",borderTopLeftRadius:"3px",borderBottomLeftRadius:"3px"}} ><i className='bx bxs-map-alt text-[#555555]' ></i></span>
                        <input className="w-[90%] align-middle focus:outline-none   border-[1px] border-solid border-[rgba(0,0,0,0.2)] py-[9px] px-[10px] text-[13px] font-[400] text-[#555]" style={{boxShadow:"1px 1px 3px rgba(0,0,0,.15)"}} type="text" value="India"/>
                    </div>
                    <button
					className="btn-special-spread  py-[10px] px-[15px] mt-[15px]  text-[16px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]
					">
					CHECKOUT
					</button>
                </div>
            </div>
            </div>
        </section>
        <EnquirySection/>
        <Footer/>
        </>
    )
}
 
export default Checkout;