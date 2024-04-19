import Header from "../common/Header";
import EnquirySection from "../common/EnquirySection";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function TrackOrder() {

	const [orderId, setOrderId] = useState("")
	const [productId, setProductId] = useState("")
	const [orderDetails, setOrderDetails] = useState({})
	const [productDetails, setProdcutDetails] = useState({})
	const [trackerState, setTrackerState] = useState({
		orderPackaged: true,
		orderShipped: false,
		orderOutForDelivery: false,
		orderDelivered: false,
	});

	const [tabber, setTabber] = useState(0);

	console.log('@@@@@@@@@@@@@@@@@@', productDetails);

	async function getDetails() {
		const urlParams = new URLSearchParams(window.location.search);
		const orderId = urlParams.get("orderId");
		const productId = urlParams.get("productId");
		setOrderId(orderId)
		setProductId(productId)

		const response = await axios.post("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/track-package", {
			orderId: orderId,
		})
		if (response?.data?.orderItems) {
			const foundOrderItem = response.data.orderItems.find(item => item.productId === productId);
			setProdcutDetails(foundOrderItem);
			console.log("Found Order Item:", response?.data?.deliveryStatus);
		}
		setOrderDetails(response?.data)
		if (response?.data?.deliveryStatus === "Pending") {
			setTrackerState(prev => ({ ...prev, orderPackaged: true }))
		} else if (response?.data?.deliveryStatus === "Dispatching") {
			setTrackerState(prev => ({ ...prev, orderPackaged: true }))
		} else if (response?.data?.deliveryStatus === "Shipping") {
			setTrackerState(prev => ({ ...prev, orderPackaged: true, orderShipped: true, }))
		} else if (response?.data?.deliveryStatus === "Out_For_Delivery") {
			setTrackerState(prev => ({ ...prev, orderPackaged: true, orderShipped: true, orderOutForDelivery: true }))
		} if (response?.data?.deliveryStatus === "Delivered") {
			setTrackerState(prev => ({ ...prev, orderPackaged: true, orderShipped: true, orderOutForDelivery: true, orderDelivered: true }))
		}
	}

	const months = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];


	useEffect(() => {
		getDetails()
	}, [orderId])

	return (
		<>
			<Header />
			<section className="order-details-w bg-[#F7F7F7] py-[5%] pb-[10%]">
				<div className="max-w-[628px] mx-[auto]">
					<div className="flex justify-between flex-col gap-[25px] border-[1px] border-[rgba(0,0,0,0.15)] p-[15px] rounded-[8px] bg-[#fff]">
						<div className="flex justify-between items-center">
							<figure className=" p-[10px] bg-[#fff] border-[1px] border-[rgba(0,0,0,0.15)] w-[100px]">
								<img src={`https://batterybackend.react.stagingwebsite.co.in/images/${productDetails?.productImage}`} alt="Prouct Image" />
							</figure>

							<span className={`h-[fit-content] font-['poppins'] text-[#fff] rounded-[30px] px-[25px] py-[10px] ${trackerState.orderDelivered ? 'bg-green-400' : 'bg-[#000000]'}`}>{trackerState.orderDelivered ? 'Completed' : 'In Progress'}</span>

						</div>
						<div>
							<h3 className="pb-[15px] font-[600] text-[24px] font-['Poppins']">Order <span className="block text-[16px] text-[#000]"># {orderDetails?.orderId}</span></h3>

							<div className="flex justify-between">
								<div className=" flex flex-col pb-[25px]">
									<span className="text-[14px] font-[500] text-[#999999]">Item</span>
									<span className="text-[14px] font-[500]">{productDetails?.productName}</span>
								</div>
								<div className=" flex flex-col">
									<span className="text-[14px] font-[500] text-[#999999]">Courier</span>
									<span className="text-[14px] font-[500]">UPS, R. Gosling</span>
								</div>
							</div>

							<div className="flex justify-between pb-[25px]">

								<div className=" flex flex-col">
									<span className="text-[14px] font-[500] text-[#999999]">Order Date</span>
									<span className="text-[14px] font-[500]">{`${months[new Date(orderDetails?.createdAt).getMonth()]} ${new Date(orderDetails?.createdAt).getDate()}, ${new Date(orderDetails?.createdAt).getFullYear()}`}</span>
								</div>
								<div className=" flex flex-col w-[30%] text-right">
									<span className="text-[14px] font-[500] text-[#999999]">Delivery Address</span>
									<span className="text-[14px] font-[500] text-ellipsis whitespace-nowrap overflow-hidden">
										{orderDetails?.shippingAddress?.addressLineOne}
										{orderDetails?.shippingAddress?.addressLineTwo}
									</span>
								</div>
							</div>

							<div>
								<div>
									<ul className="border-b-[1px] border-[rgba(0,0,0,0.15)] mb-[25px]">
										<li onClick={() => { setTabber(0) }} className={`cursor-pointer inline-block text-[14px] leading-[45px] mx-[15px] ${tabber === 0 && 'text-[#ff7637] border-b-[1px] border-[#ff7637]'}`}>Tracking</li>
										<li onClick={() => { setTabber(1) }} className={`cursor-pointer inline-block text-[14px] leading-[45px] mx-[15px] ${tabber === 1 && 'text-[#ff7637] border-b-[1px] border-[#ff7637]'}`}>Item Details</li>
										<li onClick={() => { setTabber(2) }} className={`cursor-pointer inline-block text-[14px] leading-[45px] mx-[15px] ${tabber === 2 && 'text-[#ff7637] border-b-[1px] border-[#ff7637]'}`}>Receiver</li>
									</ul>
								</div>	

								<div className="">
									{tabber === 0 ? <div className="order-tracker">
										<div className="text-[13px] order-track-list-wr ">
											<span className="flex items-start ">
												<div className={`w-[50px] flex flex-col h-[132px] items-center justify-start order-track-list-icon-side ${trackerState.orderPackaged && 'done'}`}>
													<div className="pb-[10px]  bg-white">
														<span className={`flex items-center justify-center  border-[1px] border-[rgba(0,0,0,0.15)] rounded-full p-[5px] ${trackerState.orderPackaged ? 'bg-lime-100' : 'bg-slate-100'}`}>
															{trackerState.orderPackaged ? <i className="text-[18px] text-lime-500 fa-solid fa-check"></i> : <i className="text-[18px] fa-regular fa-clock"></i>}
														</span>
													</div>
												</div>
												<span className="flex flex-col w-[calc(100%-50px)] text-[14px] font-[200]">
													<span className="font-[500] text-[15px] pb-[10px] order-status-before flex justify-between items-center w-full">
														<span>
															Order Packaging
														</span>
														<span className="text-[#ff7637] font-[500] text-[14px]">See Details</span>
													</span>
													<span className="font-[400] text-[12px] text-[#999999]">
														13/02/2024 5:23pm
													</span>

													<span className="pt-[10px] text-[12px]">
														<span className="block font-[400] text-[#999999]">
															We maintain a high standard of packaging to ensure our products reach you safely and in optimal condition.
														</span>
														<span className="block font-[500] text-[#484848] mt-[5px] pb-[20px]">
															Estimated Delivery Date: 10/04/2024
														</span>
													</span>
												</span>
											</span>
										</div>

										<div className="text-[13px] order-track-list-wr ">
											<span className="flex items-start ">
												<div className={`w-[50px] flex flex-col h-[132px] items-center justify-start order-track-list-icon-side ${trackerState.orderShipped && 'done'}`}>
													<div className="pb-[10px]  bg-white">
														<span className={`flex items-center justify-center  border-[1px] border-[rgba(0,0,0,0.15)] rounded-full p-[5px] ${trackerState.orderShipped ? 'bg-lime-100' : 'bg-slate-100'}`}>
															{trackerState.orderShipped ? <i className="text-[18px] text-lime-500 fa-solid fa-check"></i> : <i className="text-[18px] fa-regular fa-clock"></i>}
														</span>
													</div>
												</div>
												<span className="flex flex-col text-[14px] font-[200] w-[calc(100%-50px)]">
													<span className="font-[500] text-[15px] pb-[10px] order-status-before flex justify-between items-center w-full">
														<span>
															Order Shipped
														</span>
														<span className="text-[#ff7637] font-[500] text-[14px]">See Details</span>


													</span>
													<span className="font-[400] text-[12px] text-[#999999]">
														13/02/2024 5:23pm
													</span>

													<span className="pt-[10px] text-[12px]">
														<span className="block font-[400] text-[#999999]">
															{trackerState.orderShipped ? 'Order has been shipped.' : 'Your shipping details will be sent to you via email once the order has been shipped'}
														</span>
														<span className="block font-[500] text-[#484848] mt-[5px] pb-[20px]">
															Estimated Delivery Date: 10/04/2024
														</span>
													</span>
												</span>
											</span>
										</div>

										<div className="text-[13px] order-track-list-wr ">
											<span className="flex items-start ">
												<div className={`w-[50px] flex flex-col h-[132px] items-center justify-start order-track-list-icon-side ${trackerState.orderOutForDelivery && 'done'}`}>
													<div className="pb-[10px]  bg-white">
														<span className={`flex items-center justify-center  border-[1px] border-[rgba(0,0,0,0.15)] rounded-full p-[5px] ${trackerState.orderOutForDelivery ? 'bg-lime-100' : 'bg-slate-100'}`}>
															{trackerState.orderOutForDelivery ? <i className="text-[18px] text-lime-500 fa-solid fa-check"></i> : <i className="text-[18px] fa-regular fa-clock"></i>}
														</span>
													</div>
												</div>
												<span className="flex flex-col text-[14px] font-[200] w-[calc(100%-50px)]">
													<span className="font-[500] text-[15px] pb-[10px] order-status-before flex justify-between items-center w-full">
														<span>
															Out For Delivery
														</span>
														<span className="text-[#ff7637] font-[500] text-[14px]">See Details</span>


													</span>
													<span className="font-[400] text-[12px] text-[#999999]">
														13/02/2024 5:23pm
													</span>

													<span className="pt-[10px] text-[12px]">
														<span className="block font-[400] text-[#999999]">
															{trackerState.orderOutForDelivery ? 'Order is out for delivery. Our delivery partner will contact you shortly.' : 'Order is currently being shipped. Order status will be updated once it is out for delivery.'}
														</span>
														<span className="block font-[500] text-[#484848] mt-[5px] pb-[20px]">
															Estimated Delivery Date: 10/04/2024
														</span>
													</span>
												</span>
											</span>
										</div>

										<div className="text-[13px] order-track-list-wr ">
											<span className="flex items-start ">
												<div className={`w-[50px] flex flex-col h-[132px] items-center justify-start order-track-list-icon-side last ${trackerState.orderDelivered && 'done'}`}>
													<div className="pb-[10px]  bg-white">
														<span className={`flex items-center justify-center  border-[1px] border-[rgba(0,0,0,0.15)] rounded-full p-[5px] ${trackerState.orderDelivered ? 'bg-lime-100' : 'bg-slate-100'}`}>
															{trackerState.orderDelivered ? <i className="text-[18px] text-lime-500 fa-solid fa-check"></i> : <i className="text-[18px] fa-regular fa-clock"></i>}
														</span>
													</div>
												</div>
												<span className="flex flex-col text-[14px] font-[200] w-[calc(100%-50px)]">
													<span className="font-[500] text-[15px] pb-[10px] order-status-before flex justify-between items-center w-full">
														<span>
															Order Delivered
														</span>
														<span className="text-[#ff7637] font-[500] text-[14px]">See Details</span>


													</span>
													<span className="font-[400] text-[12px] text-[#999999]">
														13/02/2024 5:23pm
													</span>

													<span className="pt-[10px] text-[12px]">
														<span className="block font-[400] text-[#999999]">
															{trackerState?.orderDelivered ? 'Your order will has been delivered.' : 'Your order is in transit, you can check the order status above.'}
														</span>
														<span className="block font-[500] text-[#484848] mt-[5px] pb-[20px]">
															Delivered on: 10/04/2024
														</span>
													</span>
												</span>
											</span>
										</div>
									</div> : tabber === 1 ?
										<div>
											<table cellPadding={0} cellSpacing={0} className="order-detail-table w-full">
												<thead className='border-b-[2px] border-[#d8d8d8] bg-slate-100'>
													<tr>
														<th>
															<div className='flex items-center justify-start p-[10px]'>
																<h3 className='text-[14px] font-semibold font-sans' >Field</h3>
															</div>
														</th>
														<th>
															<div className='flex items-center justify-start p-[10px]'>
																<h3 className='text-[14px] font-semibold font-sans' >Value</h3>
															</div>
														</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>Product Image</td>
														<td>{productDetails?.productImage}</td>
													</tr>
													<tr>
														<td>Product Id</td>
														<td>{productDetails?.productId}</td>
													</tr>
													<tr>
														<td>Product Name</td>
														<td>{productDetails?.productName}</td>
													</tr>
													<tr>
														<td>Price</td>
														<td>{productDetails?.productPrice}</td>
													</tr>
													<tr>
														<td>Quantity</td>
														<td>{productDetails?.productQuantity}</td>
													</tr>
												</tbody>
											</table>
										</div>
										:
										<div>
											<table cellPadding={0} cellSpacing={0} className="order-detail-table w-full">
												<thead className='border-b-[2px] border-[#d8d8d8] bg-slate-100'>
													<tr>
														<th>
															<div className='flex items-center justify-start p-[10px]'>
																<h3 className='text-[14px] font-semibold font-sans' >Field</h3>
															</div>
														</th>
														<th>
															<div className='flex items-center justify-start p-[10px]'>
																<h3 className='text-[14px] font-semibold font-sans' >Value</h3>
															</div>
														</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>Billing Address</td>
														<td>{orderDetails?.billingAddress?.addressLineOne}, {orderDetails?.billingAddress?.addressLineTwo}, {orderDetails?.billingAddress?.city}  {orderDetails?.billingAddress?.pinCode}, ({orderDetails?.billingAddress?.state}) {orderDetails?.billingAddress?.country}  </td>
													</tr>
													<tr>
														<td>Shipping Address</td>
														<td>{orderDetails?.shippingAddress?.addressLineOne}, {orderDetails?.shippingAddress?.addressLineTwo}, {orderDetails?.shippingAddress?.city}  {orderDetails?.shippingAddress?.pinCode}, ({orderDetails?.shippingAddress?.state}) {orderDetails?.shippingAddress?.country}</td>
													</tr>
													<tr>
														<td>Buyer Information</td>
														<td className='border-[#d8d8d8] border-l-[1px]'>
															<table>
																<tr>
																	<td className='border-[rgba(0,0,0,0.25)] border-b-[1px] text-[#ff7637]'>Buyer Information:</td>
																</tr>
																<tr>
																	<td>
																		<table width={'100%'}>
																			<tr>
																				<td>Name</td>
																				<td>{orderDetails?.buyerInformation?.firstName} {orderDetails?.buyerInformation?.lastName}</td>
																			</tr>
																			<tr>
																				<td>email</td>
																				<td>{orderDetails?.buyerInformation?.email}</td>
																			</tr>
																			<tr>
																				<td>Contact No.</td>
																				<td>{orderDetails?.buyerInformation?.phone}</td>
																			</tr>
																		</table>
																	</td>
																</tr>
															</table>
														</td>
													</tr>

												</tbody>
											</table>
										</div>
									}

								</div>
							</div>
						</div>
					</div>
					<div>

					</div>
				</div>
			</section>
			<EnquirySection />
			<Footer />
		</>
	)
}

export default TrackOrder;