import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import EnquirySection from "../common/EnquirySection";
import Footer from "../common/Footer";
import { DatePicker } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;
import log from "../../utils/utilityFunctions";
import toast, { Toaster } from "react-hot-toast";
import HeaderNew from "../common/HeaderNew";
import Meta from "../common/Meta";


function Confirm() {
	const navigate = useNavigate();
	const [order, setOrder] = useState(null);
	const [confirmationDetails, setConfirmationDetails] = useState(null);
	const [expressDelivery, setExpressDelivery] = useState(false);
	const [showIndicator, setShowIndicator] = useState(false)

	async function fetchOrder() {
		try {
			log("fetching order");
			const response = await axios.get("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-current-order", {
				headers:{
					"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
				}
			});
			if (response.status === 200) {
				setOrder(response.data?.order);
			}
		} catch (error) {
			log(error);
		}
	}

	useEffect(() => {
		fetchOrder()
	}, [])

	function loadScript(src) {
		return new Promise((resolve) => {
			const script = document.createElement("script");
			script.src = src;
			script.onload = () => {
				resolve(true)
			}
			script.onerror = () => {
				resolve(false)
			}
			document.body.appendChild(script);
		})
	}

	async function displayRazorpay() {
		log("calling display razorpay function")
		const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
		if (!res) {
			alert("Razorpay failed to load");
			return;
		}

		const result = await axios.post("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/create-razorpay-order", {
			orderId: order?.orderId,
			notes: "Testing Razorpay"
		}, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
			}
		});

		if (!result) {
			alert("Razorpay: Server error.");
			return;
		}

		const { amount, id: order_id, currency } = result.data?.razorpayOrder;

		const options = {
			key: result.data.key_id,
			amount: amount.toString(),
			currency: currency,
			name: "Indore Battery",
			description: "Purchase Transaction",
			order_id: order_id,
			handler: async function (response) {
				if (response.razorpay_payment_id) {
					const rzpResponse = await axios.post("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/verify-payment", {
						response, orderId: order?.orderId
					}, {
						headers:{
							"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
						}
					});

					if (rzpResponse.status === 200) {
						navigate(`/success?orderId=${order?.orderId}`);
					}
				}
			},
			prefill: {
				name: order ? `${order?.buyerInformation?.firstName} ${order?.buyerInformation?.lastName}` : '',
				email: order?.buyerInformation?.email,
				contact: order?.buyerInformation?.phone,
				address: `${order?.shippingAddress?.addressLineOne} ${order?.shippingAddress?.addressLineTwo} ${order?.shippingAddress?.city}(${order?.shippingAddress?.pinCode}) ${order?.shippingAddress?.state} - ${order?.shippingAddress?.country}`
			},
			notes: {
				address: "",
			},
			theme: {
				color: "#ff7637",
			},
		};

		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
		paymentObject.on("payment.failed", function (response) {
			log("Payment Failed", response)
		})
	}

	const onChange = (value, dateString) => {
		log('Selected Time: ', value);
		log('Formatted Selected Time: ', dateString);
	};

	const onOk = (value) => {
		log('onOk: ', value);
		setConfirmationDetails(prev => ({ ...prev, preferedDateAndTime: value }))
	};

	async function handleExpressDelivery(e) {
		try {
			const response = await axios.post("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/delivery-express", {
				express: e.target.checked
			}, {
				headers:{
					"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
				}
			});
			log(response);
			if (response?.status === 200) {
				setExpressDelivery(e.target.checked);
				setConfirmationDetails(prev => ({ ...prev, expressDelivery: e.target.checked }));
			}
		} catch (error) {
			log(error);
		}
	}

	async function placeOrder() {
		try {
			const response = await axios.post("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/place-order", {
				orderId: order?.orderId,
				confirmationDetails
			}, {
				headers:{
					"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
				}
			});
			if (response?.status === 200) {
				if (response?.data?.order?.paymentMethod === 'Online') {
					setShowIndicator(false);
					displayRazorpay();
				} else if (response.data?.order?.paymentMethod === "Cash on Delivery") {
					setShowIndicator(false);
					navigate(`/success?orderId=${order?.orderId}`);
				} else {
					toast.error("Please choose payment method");
					setShowIndicator(true);
				}
			}
		} catch (error) {
			log(error);
		}
	}


	return (
		<>
		<Meta title="Confirm Order | Indore Battery" />
			<HeaderNew />
			<section className="pt-[4%] 1200:pb-[200px] bg-[#F7F7F7]">
				<div className="center-wr">
					<div className="flex flex-wrap-reverse">
						<div className="1024:w-[50%] 320:w-full ">
							<div className="320:block 1200:hidden">
								{order?.orderItems?.map(cartItem => (
									<div className="flex items-start mt-[8px] gap-[10px] 320:pl-[10px]  py-[4px] bg-white border-r-[4px] border-r-[#ff7637] shadow-[1px_1px_3px_rgba(0,0,0,0.15)]">
										<figure className="w-[50px]">
											<img src={`https://batterybackend.react.stagingwebsite.co.in/images/${cartItem?.productImage}`} alt="product image" />
										</figure>
										<div className="flex flex-col items-start  w-[calc(100%-50px)]">
											<p className="p-0 m-0 leading-[15px] mt-[2px] 320:text-[13px] font-['Oswald'] uppercase font-bold pr-[30px]  w-full relative">
												<span className="font-['Oswald'] text-[#ff7637]">{cartItem?.productName?.split(" ")[0]}&nbsp;</span>{cartItem?.productName?.split(" ")?.slice(1)?.join(" ")}
												<span className="inline-block absolute right-[10px] font-['Sora'] font-semibold text-[#ff7637] lowercase">x{cartItem?.productQuantity}</span>
											</p>
											<div className=" leading-[15px] mt-[12px] 320:text-[13px] relative w-full">SubTotal: <i className='bx bx-rupee'></i>{`${cartItem?.productPrice * cartItem?.productQuantity}`}
											</div>
										</div>
									</div>
								))}
							</div>
							<table style={{ boxShadow: "1px 1px 3px rgba(0,0,0,.15)" }} className="bg-[#fff] w-[100%] my-[0] mx-[auto] 320:hidden 1200:table">
								<tr>
									<th className="py-[10px] border-solid border-b-[#ddd] border-b-[2px] uppercase font-[600] text-[13px] text-left pl-[12%]">Product</th>
									<th className="py-[10px] border-solid border-b-[#ddd] border-b-[2px] uppercase font-[600] text-[13px]">Price</th>
									<th className="py-[10px] border-solid border-b-[#ddd] border-b-[2px] uppercase font-[600] text-[13px]">Quantity</th>
									<th className="py-[10px] border-solid border-b-[#ddd] border-b-[2px] uppercase font-[600] text-[13px]">Subtotal</th>
								</tr>
								{
									order?.orderItems?.map(item => (
										<tr className="border-b-2 border-[rgba(0,0,0,0.1)]">
											<td className="flex items-center ">
												<figure className="w-[64px] p-[10px]"><img src={`https://batterybackend.react.stagingwebsite.co.in/images/${item?.productImage}`} alt="product image" /></figure>
												<span className="font-sans text-[14px] font-[500]">{item?.productName}</span>
											</td>
											<td className="text-center font-sans text-[14px] font-[500]"><i className="bx bx-rupee"></i>{item?.productPrice}</td>
											<td className="text-center w-[100px]">
												<span className="font-sans text-[14px] font-[500]">{item?.productQuantity}</span>
											</td>
											<td className="text-center font-sans text-[14px] font-[500]"><i className="bx bx-rupee"></i>{item?.productPrice * item?.productQuantity}</td>
										</tr>
									))
								}
							</table>
							<div className="bg-[#fff] w-[100%] my-[0] mx-[auto]">
								<h3 style={{ boxShadow: "1px 1px 3px rgba(0,0,0,.15)" }} className="text-[18px] text-right border-solid border-t-[1px] border-t-[rgba(0,0,0,0.1)] font-[600] px-[18px] py-[10px] font-sans flex items-center justify-between">
									<span className="text-[#202020] text-[16px]">Sub-Total </span><span className="text-[#202020] text-[14px]">₹ {order?.subTotal}</span>
								</h3>
								{
									order?.coupon && (
										<h3 style={{ boxShadow: "1px 1px 3px rgba(0,0,0,.15)" }} className="text-[18px] text-right border-solid border-t-[1px] border-t-[rgba(0,0,0,0.1)] font-[600] px-[18px] py-[10px] font-sans flex items-center justify-between">
											<span className="text-[#202020] text-[16px]">Total Discount </span>
											<span className="text-red-600 text-[14px]">- ₹ {order?.subTotal * (order.coupon?.couponDiscount / 100) >= order?.coupon?.maximumAllowedDiscount ? order?.coupon?.maximumAllowedDiscount : order?.subTotal * (order.coupon?.couponDiscount / 100) }</span>
										</h3>
									)
								}
								{
									expressDelivery && (
										<h3 style={{ boxShadow: "1px 1px 3px rgba(0,0,0,.15)" }} className="text-[18px] text-right border-solid border-t-[1px] border-t-[rgba(0,0,0,0.1)] font-[600] px-[18px] py-[10px] font-sans flex items-center justify-between">
											<span className="flex items-center gap-[10px]"><img src="/images/indorebattery-express-delivery.png" alt="" />
												<span className="text-[#202020] text-[16px]">Express Delivery</span></span><span className="text-[14px]">+ ₹ {order.quantity * 200}</span>
										</h3>
									)
								}
								<h3 style={{ boxShadow: "1px 1px 3px rgba(0,0,0,.15)" }} className="final-bill-amount  text-[18px] text-right bg-[#ff763720] font-[600] text-white px-[18px] py-[10px] font-sans  flex items-center justify-between">
									<span className="text-[#202020] text-[16px]">Order Total </span><span className="text-[#ff7637]">₹ {expressDelivery ? order.quantity * 200 + order?.orderTotal : order?.orderTotal}</span>
								</h3>
							</div>
							<div className="320:px-[10px] 320:pb-[25px]">
								<form>
									<div className="mt-[25px]">
										<label className="text-[16px] 320:text-[14px] font-[500] uppercase block ">Preferred Date and Time of Installation</label>
										<DatePicker showTime onChange={onChange} className="my-[15px] py-[10px] 320:px-[10px] px-[30px]" onOk={onOk} />
									</div>
									<div>
										<label className="text-[16px] 320:text-[14px] font-[500] uppercase">GST-Bill Form. (Please fill if you require a GST bill)</label>
										<div className="flex gap-[20px] justify-between 320:gap-0 320:justify-start 320:flex-wrap">
											<input onChange={(e) => { setConfirmationDetails(prev => ({ ...prev, gstBill: { ...prev.gstBill, gstNumber: e.target.value } })) }} className="my-[15px] 320:my-[10px] border-[1px] w-[100%] border-solid border-[rgba(0,0,0,0.2)] py-[10px] text-[15px] px-[20px]" placeholder="GST No." type="text" />
											<input onChange={(e) => { setConfirmationDetails(prev => ({ ...prev, gstBill: { ...prev.gstBill, billingName: e.target.value } })) }} className="my-[15px] 320:my-[10px] border-[1px] w-[100%] border-solid border-[rgba(0,0,0,0.2)] py-[10px] text-[15px] px-[20px]" placeholder="Billing Name" type="text" />
										</div>
										<div>
											<textarea onChange={(e) => { setConfirmationDetails(prev => ({ ...prev, gstBill: { ...prev.gstBill, message: e.target.value } })) }} placeholder="Message" className="my-[10px] border-[1px] w-[100%] border-solid border-[rgba(0,0,0,0.2)] py-[10px] text-[15px] px-[20px]" name="message" id="message" cols="30" rows="3"></textarea>
											<textarea onChange={(e) => { setConfirmationDetails(prev => ({ ...prev, gstBill: { ...prev.gstBill, notes: e.target.value } })) }} placeholder="Additional Notes..." className="my-[10px] border-[1px] w-[100%] border-solid border-[rgba(0,0,0,0.2)] py-[10px] text-[15px] px-[20px]" name="additionalNotes" id="additionalNotes" cols="30" rows="1"></textarea>
										</div>
									</div>

									<Link to={"/cart"}><button type="button" className="bg-[#e6e6e6] border-l-[7px] border-[#ff7637] text-center 320:w-fit w-[20%] px-[15px] py-[10px] mr-[10px]">Back</button></Link>
									<button type="button" onClick={placeOrder} className="border-l-[7px] bg-[#202020] border-[#FF7637] text-[#fff]  text-center 320:w-fit w-[20%] px-[15px] py-[10px]">Place Order</button>
								</form>
							</div>
						</div>

						<div className="1024:w-[50%] 320:w-full">
							<div>
								<div style={{ boxShadow: "1px 1px 3px rgba(0,0,0,.15)" }} className="text-left 320:w-full 1024:w-[90%] my-[0] mx-[auto] border-[1px] border-solid border-[rgba(0,0,0,0.1)] py-[15px] px-[30px] 320:p-[10px] 320:pb-[25px] pb-[25px] bg-[#fff]">
									<h3 className="font-[500] font-['Oswald'] uppercase border-b-[2px] pb-[5px] border-[#484848] text-[16px] text-[#ff7637]">Billing/Shipping Detail</h3>
									<table className="billing-table">
										<tr>
											<td>First Name</td>
											<td>{order?.buyerInformation?.firstName}</td>
										</tr>
										<tr>
											<td>Last Name</td>
											<td>{order?.buyerInformation?.lastName}</td>
										</tr>
										<tr>
											<td>Email</td>
											<td>{order?.buyerInformation?.email}</td>
										</tr>
										<tr>
											<td>Phone</td>
											<td>{order?.buyerInformation?.phone}</td>
										</tr>
										<tr>
											<td>Address</td>
											<td>{order?.shippingAddress?.addressLineOne + " " + order?.shippingAddress?.addressLineTwo}</td>
										</tr>
										<tr>
											<td>State</td>
											<td>{order?.shippingAddress?.state}</td>
										</tr>
										<tr>
											<td>City</td>
											<td>{order?.shippingAddress?.city}</td>
										</tr>
										<tr>
											<td>Pin Code - Country</td>
											<td>{`${order?.shippingAddress?.pinCode} - ${order?.shippingAddress?.country}`}</td>
										</tr>

									</table>
								</div>
							</div>
							<div className="1024:w-[90%] 320:w-full my-[10px] bg-[#fff] px-[30px] 320:px-[20px] py-[15px] flex flex-col mx-[auto] shadow-[1px_1px_3px_rgba(0,0,0,0.15)]">
								<h4 className="font-[500] font-['Oswald'] uppercase text-[#202020] pb-[5px] text-[16px] flex items-center gap-[10px]">
									<img src="/images/indorebattery-express-delivery.png" alt="Express Delivery" />
									Express Delivery
								</h4>
								<label htmlFor="express-delivery-checkbox" className="mt-[10px]">
									<input id="express-delivery-checkbox" onChange={handleExpressDelivery} className="relative express-delivery-checkbox" type="Checkbox" />
									<span className="px-[5px] 320:text-[14px]">
										Express Delivery (Express Delivery Price  <span className="font-[600]"> ₹200 </span>per item)
									</span>
								</label>
							</div>
							<div>
								<div style={{ boxShadow: "1px 1px 3px rgba(0,0,0,.15)" }} className="relative text-left 320:w-full 1024:w-[90%] my-[10px] mx-[auto] border-[1px] border-solid border-[rgba(0,0,0,0.1)] py-[15px] 320:px-[20px] px-[30px] bg-[#fff]">
									<h4 className="font-[500] font-['Oswald'] uppercase pb-[5px] text-[16px] flex items-center gap-[10px]">
										<img src="/images/indorebattery-payment-icon.png" alt="Express Delivery" />
										<span style={{ color: !showIndicator ? "#000" : "red" , fontFamily:'inherit' }}>Payment Method</span><i style={{ visibility: !showIndicator ? "hidden" : "visible" }} className="text-red-400 fa-solid fa-arrow-left absolute indicator-arrow2"></i>
									</h4>
									<div className="flex flex-col mt-[15px]">
										<label htmlFor="debit-card" className="battery-price-picker flex justify-start">
											<div className="flex items-center gap-[10px]">
												<input onChange={(e) => { setConfirmationDetails(prev => ({ ...prev, paymentMethod: e.target.value })) }} value={"Online"} type="radio" id="debit-card" name="delivery-type" />
												<span className="text-[14px] font-[500]">Online</span>
											</div>
										</label>
										<label htmlFor="cash-on-deliv" className="battery-price-picker flex justify-start mt-[10px]">
											<div className="flex items-center gap-[10px]">
												<input id="cash-on-deliv" onChange={(e) => { setConfirmationDetails(prev => ({ ...prev, paymentMethod: e.target.value })) }} value={"Cash on Delivery"} type="radio" name="delivery-type" />
												<span className="text-[14px] font-[500]">Cash on Delivery</span>
											</div>
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Toaster />
			<EnquirySection />
			<Footer />
		</>
	)
}
export default Confirm