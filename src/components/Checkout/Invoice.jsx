import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';

function Invoice() {

	const [orderId, setOrderId] = useState("")
	const [orderDetails, setOrderDetails] = useState("")

	async function getDetails() {
		const urlParams = new URLSearchParams(window.location.search);
		const orderId = urlParams.get("orderId");
		setOrderId(orderId)

		const response = await axios.post("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/track-package", {
			orderId: orderId,
		})
		setOrderDetails(response?.data)
		console.log("THIS IS THE RESPONSE DATA :)", response?.data)
	}

	const months = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];

	function giveReview() {
		window.open("https://www.google.com/search?hl=en-IN&gl=in&q=Indore+Battery,Luminous%7CMicrotek%7CAmaron%7CExide%7CAmaron+Quanta+Inverter/UPS/car+battery+wholesale+store,+Eastern+Ring+Rd,+Opposite+Audi+Showroom,+Near+Metro+Wholesale,+Dewas+Naka,+Gulab+Bagh+Colony,+Indore,+Madhya+Pradesh+452010&ludocid=15140537826907581541&lsig=AB86z5X2hF7ZzTYUd_tZxfXCjG_l#lrd=0x39631d4965bcb815:0xd21dfeef8130ec65,3", "_blank")
	}

	useEffect(() => {
		getDetails()
	}, [])

	return (
		<>
			<Header />
			<section className="bg-[#ffffff] pt-[100px] pb-[4%]">
				<div className="center-wr">
					<div className='flex items-center rounded-[8px] border-[1px] border-[rgba(0,0,0,0.15)] h-[200px]'>
						<div className='w-[27%] bg-[#FFF8F5] p-[25px] h-full'>
							<p>
								<span className='block font-semibold text-[14px] uppercase text-[#999999]'>Order Id</span>
								<span className='block font-semibold text-[14px]'>{orderDetails?.orderId}</span>
							</p>
							<p className='mt-[15px]'>
								<span className='block font-semibold text-[14px] uppercase text-[#999999]'>Email</span>
								<span className='block font-semibold text-[14px]'>{orderDetails?.buyerInformation?.email}</span>
							</p>
						</div>
						<div className='w-[27%] bg-[#FFF8F5] p-[25px] h-full'>
							<p>
								<span className='block font-semibold text-[14px] uppercase text-[#999999]'>Document Number</span>
								<span className='block font-semibold text-[14px]'>123123546</span>
							</p>
							<p className='mt-[15px]'>
								<span className='block font-semibold text-[14px] uppercase text-[#999999]'>invoice date</span>
								<span className='block font-semibold text-[14px]'>{`${months[new Date(orderDetails?.createdAt).getMonth()]} ${new Date(orderDetails?.createdAt).getDate()}, ${new Date(orderDetails?.createdAt).getFullYear()}`}</span>
							</p>
						</div>
						<div className='w-[27%] bg-[#FFF8F5] p-[25px] h-full'>
							<p>
								<span className='block font-semibold text-[14px] uppercase text-[#999999]'>Bill To</span>
								<span className='block font-semibold text-[14px]'>{orderDetails?.buyerInformation?.firstName} {orderDetails?.buyerInformation?.lastName}</span>
							</p>
						</div>
						<div className='w-[19%] p-[25px] h-full flex items-center justify-center' >
							<QRCodeSVG
								value={"https://reactjs.org/"}
								size={148}
								bgColor={"#ffffff"}
								fgColor={"#000000"}
								level={"L"}
								includeMargin={false}
								imageSettings={{
									src: "/images/logo.svg",
									x: undefined,
									y: undefined,
									height: 44,
									width: 44,
									excavate: true,
								}}
							/>
						</div>
					</div>

					<div className='mt-[30px] rounded-[8px] border-[1px] border-[rgba(0,0,0,0.15)]'>
						<table className="order-detail-table border-[1px] border-[rgba(0,0,0,0.25)]" cellSpacing="0" cellPadding="0" width="100%">
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
									<td>Order Id</td>
									<td>{orderDetails?.orderId}</td>
								</tr>
								<tr>
									<td>Order Total</td>
									<td>₹ {orderDetails?.orderTotal}</td>
								</tr>
								<tr>
									<td>Sub Total</td>
									<td>₹ {orderDetails?.subTotal}</td>
								</tr>
								<tr>
									<td>Placed At</td>
									<td>{`${months[new Date(orderDetails?.createdAt).getMonth()]} ${new Date(orderDetails?.createdAt).getDate()}, ${new Date(orderDetails?.createdAt).getFullYear()}`}</td>
								</tr>
								<tr>
									<td>Billing Address</td>
									<td>{orderDetails?.billingAddress?.addressLineOne}, {orderDetails?.billingAddress?.addressLineTwo}, {orderDetails?.billingAddress?.city}  {orderDetails?.billingAddress?.pinCode}, ({orderDetails?.billingAddress?.state}) {orderDetails?.billingAddress?.country}  </td>
								</tr>
								<tr>
									<td>Shipping Address</td>
									<td>{orderDetails?.shippingAddress?.addressLineOne}, {orderDetails?.shippingAddress?.addressLineTwo}, {orderDetails?.shippingAddress?.city}  {orderDetails?.shippingAddress?.pinCode}, ({orderDetails?.shippingAddress?.state}) {orderDetails?.shippingAddress?.country}</td>
								</tr>
								<tr>
									<td>Order Quantity</td>
									<td>{orderDetails?.quantity}</td>
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
								<tr style={{ display: orderDetails?.expressDelivery === "undefined" ? "none" : "table-row" }}>
									<td>Express Delivery</td>
									<td>{orderDetails?.expressDelivery}</td>
								</tr>
								<tr>
									<td>Status</td>
									<td style={{ color: orderDetails?.deliveryStatus === "Delivered" ? 'green' : 'red' }}>{orderDetails?.deliveryStatus}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className='flex items-center gap-[15px] mt-[25px] mb-[10px]'>
						<h3 className='text-[18px] font-[500] font-sans' >Payment Details</h3>
					</div>
					<table className="order-detail-table border-[1px] border-[rgba(0,0,0,0.25)]" cellSpacing="0" cellPadding="0" width="100%">
						<thead className='border-b-[2px] border-[#d8d8d8] bg-white'>
							<tr className='bg-slate-100'>
								<th>
									<div className='flex items-center justify-start p-[10px]'>
										<h3 className='text-[14px] font-semibold font-sans'>Field</h3>
									</div>
								</th>
								<th>
									<div className='flex items-center justify-start p-[10px]'>
										<h3 className='text-[14px] font-semibold font-sans'>Value</h3>
									</div>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Payment Method</td>
								<td>{orderDetails?.paymentMethod}</td>
							</tr>
							<tr style={{ display: orderDetails?.paymentMethod === 'Cash on Delivery' ? 'none' : 'table-row' }}>
								<td>Razorpay Order Id</td>
								<td>{orderDetails?.razorpayOrderId}</td>
							</tr>
							<tr style={{ display: orderDetails?.paymentMethod === 'Cash on Delivery' ? 'none' : 'table-row' }}>
								<td>Razorpay Order Receipt</td>
								<td>{orderDetails?.razorpayOrderReceipt}</td>
							</tr>
							<tr style={{ display: orderDetails?.paymentMethod === 'Cash on Delivery' ? 'none' : 'table-row' }}>
								<td>Razorpay Payment Id</td>
								<td>{orderDetails?.razorpayPaymentId}</td>
							</tr>
						</tbody>
						<tbody>

						</tbody>
					</table>
					<div className='flex items-center gap-[15px] mt-[25px] mb-[10px]'>
						<h3 className='text-[18px] font-[500] font-sans'>Delivery Details</h3>
					</div>
					<table className="order-detail-table border-[1px] border-[rgba(0,0,0,0.25)]" cellSpacing="0" cellPadding="0" width="100%">
						<thead className='border-b-[2px] border-[#d8d8d8] bg-white'>
							<tr>
								<th className='bg-slate-100'>
									<div className='flex items-center justify-start p-[10px]'>
										<h3 className='text-[14px] font-semibold font-sans'>Field</h3>
									</div>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='border-t-[1px] border-[rgba(0,0,0,0.25)] border-b-[1px] text-[#ff7637]'>Billing Address:</td>
							</tr>
							<tr>
								<td>
									<table width={'100%'}>
										<tr>
											<td>Address Line One</td>
											<td>{orderDetails?.billingAddress?.addressLineOne}</td>
										</tr>
										<tr>
											<td>Address Line Two</td>
											<td>{orderDetails?.billingAddress?.addressLineTwo}</td>
										</tr>
										<tr>
											<td>City</td>
											<td>{orderDetails?.billingAddress?.city}</td>
										</tr>
										<tr>
											<td>Pincode</td>
											<td>{orderDetails?.billingAddress?.pinCode}</td>
										</tr>
										<tr>
											<td>State</td>
											<td>{orderDetails?.billingAddress?.state}</td>
										</tr>
										<tr>
											<td>Country</td>
											<td>{orderDetails?.billingAddress?.country}</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td className='border-t-[1px] border-[rgba(0,0,0,0.25)] border-b-[1px] text-[#ff7637]'>Shipping Address:</td>
							</tr>
							<tr>
								<td>
									<table width={'100%'}>
										<tr>
											<td>Address Line One</td>
											<td>{orderDetails?.shippingAddress?.addressLineOne}</td>
										</tr>
										<tr>
											<td>Address Line Two</td>
											<td>{orderDetails?.shippingAddress?.addressLineTwo}</td>
										</tr>
										<tr>
											<td>City</td>
											<td>{orderDetails?.shippingAddress?.city}</td>
										</tr>
										<tr>
											<td>Pincode</td>
											<td>{orderDetails?.shippingAddress?.pinCode}</td>
										</tr>
										<tr>
											<td>State</td>
											<td>{orderDetails?.shippingAddress?.state}</td>
										</tr>
										<tr>
											<td>Country</td>
											<td>{orderDetails?.shippingAddress?.country}</td>
										</tr>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<div className='p-[25px] px-[0]' >
						<div onClick={giveReview} className=' cursor-pointer rounded-[8px] margin-[10px]	px-[15px] py-[8px] border-[1px] border-amber-300 bg-yellow-50  flex items-center relative font-semibold text-gray-600 '>
							<img src="/images/testimonial-star.png" alt="rating" width={20} className='mr-[15px]' />
							Please rate your experience with us on Google
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	)
}

export default Invoice