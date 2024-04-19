import React from "react";
import Header from "./Header";
import EnquirySection from "./EnquirySection";
import Footer from "./Footer";
import { Link } from "react-router-dom";
function OrderDetailsPage(){
    return(
        <>
        <Header/>
        <section className="order-details-w bg-[#F7F7F7] py-[5%] pb-[10%]">
        <div className="max-w-[628px] mx-[auto]">


            <div className="flex justify-between flex-col gap-[25px] border-[1px] border-[rgba(0,0,0,0.15)] p-[15px] rounded-[8px] bg-[#fff]">
                <div className="flex justify-between">
                <figure className=" p-[20px] bg-[#fff] border-[1px] border-[rgba(0,0,0,0.15)] w-[210px]">
                    <img src="https://batterybackend.react.stagingwebsite.co.in/images/2024_1_3_3_Amaron-FLO-42B20R.jpg" alt="Prouct Image" />
                </figure>

                <span  className="h-[fit-content] font-['poppins'] bg-[#000] text-[#fff] rounded-[30px] px-[25px] py-[10px]">In progress</span>

                </div>
                <div>
                <h3 className="pb-[15px] font-[600] text-[24px]">Order #59317</h3>

                    <div className="flex justify-between">
                    <div className=" flex flex-col pb-[25px]">
                        <span className="text-[14px] font-[200]">Item</span>
                        <span className="text-[14px] font-[400]">Amaron Flo 42b20r</span>
                    </div>
                    <div className=" flex flex-col">
                        <span className="text-[14px] font-[200]">Courier</span>
                        <span className="text-[14px] font-[400]">UPS,R. Gosling</span>
                    </div>
                </div>

                <div className="flex justify-between pb-[25px]">
                        
                        <div className=" flex flex-col">
                            <span className="text-[14px] font-[200]">Order Date</span>
                            <span className="text-[14px] font-[400]">10/02/2024</span>
                        </div>
                        <div className=" flex flex-col w-[30%] text-right">
                            <span className="text-[14px] font-[200]">Delivery Address</span>
                            <span className="text-[14px] font-[400] text-ellipsis whitespace-nowrap overflow-hidden">69 C Bhaktavar Ram Nagar, Near Tilak Nagar, Indore M.P</span>
                        </div>
                </div>

                <div>
                    <div>
                        <ul className="border-b-[1px] border-[rgba(0,0,0,0.15)] mb-[25px]">
                            <li className="inline-block text-[14px] leading-[45px] mx-[15px] text-[#ff7637] border-b-[1px] border-[#ff7637]">Order History</li>
                            <li className="inline-block text-[14px] leading-[45px] mx-[15px] ">Item Details</li>
                            <li className="inline-block text-[14px] leading-[45px] mx-[15px] ">Courier</li>
                            <li className="inline-block text-[14px] leading-[45px] mx-[15px] ">Receiver</li>
                        </ul>
                    </div>
                    <div>

                    <div className="my-[20px] text-[13px] pl-[30px] order-track-list-wr">
                            <span className="flex justify-between ">

                            <span className="flex flex-col text-[14px] font-[200] ">

                                <span className="font-[500] text-[15px] pb-[10px] order-status-before">
                                <i className='fa-solid fa-box-open  text-[#FAA300] absolute text-[14px] h-[26px] w-[26px] bg-[#fff] left-[-17.5%] rounded-[50%] border-[1px] p-[2px] pl-[3px] pt-[5px] border-[#FAA300] top-[-3px]'></i>

                                    <span>
                              Product Packaging
                                    </span>

                                </span>
                                <span>
                                    13/02/2024 5:23pm
                                </span>

                            <span className="pt-[10px] text-[12px]">
                                <span className="block">
                                    Courier Service: UPS, R.Gosling
                                </span>
                                <span className="block">
                                    Estimated Delivery Date: 10/04/2024
                                </span>
                            </span>


                            </span>

                            <span className="text-[#ff7637] font-[500] text-[14px]">See Details</span>
                        </span>
                    </div>

                      <div className="my-[20px] text-[13px] pl-[30px] order-track-list-wr">
                            <span className="flex justify-between ">

                            <span className="flex flex-col text-[14px] font-[200] ">

                                <span className="font-[500] text-[15px] pb-[10px] order-status-before">
                                <i className='fa-solid fa-truck-ramp-box  text-[#40A2E3] absolute text-[14px] h-[26px] w-[26px] bg-[#fff] left-[-17.5%] rounded-[50%] border-[1px] p-[2px] pl-[3px] pt-[5px] border-[#40A2E3] top-[-3px]'></i>

                                <span>
                                Product Shipped
                                </span>
                                </span>
                                <span>
                                    13/02/2024 5:23pm
                                </span>

                            <span className="pt-[10px] text-[12px]">
                                <span className="block">
                                    Courier Service: UPS, R.Gosling
                                </span>
                                <span className="block">
                                    Estimated Delivery Date: 10/04/2024
                                </span>
                            </span>


                            </span>

                            <span className="text-[#ff7637] font-[500] text-[14px]">See Details</span>
                        </span>
                    </div>

                    
                    <div className="my-[20px] text-[13px] pl-[30px] order-track-list-wr">
                            <span className="flex justify-between ">

                            <span className="flex flex-col text-[14px] font-[200] ">

                                <span className="font-[500] text-[15px] pb-[10px] order-status-before dispatched">
                                <i className="fa-solid fa-truck-fast text-[rgba(0,0,0,0.45)] absolute text-[14px] h-[26px] w-[26px] bg-[#fff]  left-[-26%] top-[-2px] rounded-[50%] border-[1px] p-[4px] border-[rgba(0,0,0,0.45)]"></i>

                                    <span>
                                 Order Dispatched
                                    </span>
                                </span>
                                <span>
                                    13/02/2024 5:23pm
                                </span>

                            </span>

                        </span>
                    </div>

                    <div className="my-[20px] text-[13px] pl-[30px]">
                            <span className="flex justify-between ">

                            <span className="flex flex-col text-[14px] font-[200] ">

                                <span className="font-[500] text-[15px] pb-[10px] order-status-before delivered">
                                <i className='bx bxs-check-circle text-[rgba(0,0,0,0.45)] absolute text-[24px] left-[-28%] top-[-2px]'></i> 
                                <span>
                                 Order Delivered
                                </span>
                                </span>
                                <span>
                                 13/02/2024 5:23pm
                                </span>

                            </span>

                        </span>
                    </div>


                    </div>
                </div>

                </div>

               



            </div>
            <div>

            </div>
        </div>
        </section>
        <EnquirySection/>
        <Footer/>
        </>
    )
}

export default OrderDetailsPage;