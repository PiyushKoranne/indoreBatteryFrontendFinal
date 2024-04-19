import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "../common/Header";
import EnquirySection from "../common/EnquirySection";
import Footer from "../common/Footer";
import { Link, useNavigate } from "react-router-dom";
import log from "../../utils/utilityFunctions";
import toast, { Toaster } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

function Cart() {
	const navigate = useNavigate();
	const drawerRef = useRef(null);
	const [cart, setCart] = useState(undefined);
	const [discount, setDiscount] = useState(undefined);
	const [coupon, setCoupon] = useState(undefined);
	const [couponCode, setCouponCode] = useState(undefined);
	const [couponMessage, setCouponMessage] = useState('');
	const [newAddress, setNewAddress] = useState({});
	const [deliveryAddresses, setDeliveryAddresses] = useState([]);
	const [chosenAddress, setChosenAddress] = useState(undefined);
	const [showIndicator, setShowIndicator] = useState(false);


	async function fetchCartItems() {
		try {
			const response = await axios.get("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/show-cart");
			log('FETCH CART ITEM RESPONSE', response);
			if (Array.isArray(response.data?.cart)) {
				setCart(response?.data?.cart)
			}
			if (Array.isArray(response.data?.deliveryAddresses)) {
				setDeliveryAddresses(response.data?.deliveryAddresses);
			}
			if (response.data?.chosenDeliveryAddress) {
				setChosenAddress(response.data?.chosenDeliveryAddress)
			}
			if (response.data?.coupon) {
				setCoupon(response.data?.coupon);
				setDiscount(response.data?.coupon?.couponDiscount);
			}
		} catch (error) {
			log(error);
		}
	}

	async function initiateOrderPlacement() {
		try {
			log("initiating order");
			if (!chosenAddress || !cart) {
				toast.error("Please choose delivery address")
				setShowIndicator(true)
				return
			} else {
				setShowIndicator(false)
			}
			const response = await axios.post("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/initiate-order", {
				chosenAddress,
				cart,
				coupon,
			})
			log(response);
			if (response.status === 200) {
				navigate("/confirm");
			}
		} catch (error) {
			log(error)
		}
	}

	async function handleApplyCoupon() {
		try {
			console.log("Applying coupon")
			const response = await axios.post("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/apply-coupon", {
				couponCode
			});
			console.log(response);
			if (response.status === 200) {
				let conditions = response?.data?.coupon?.conditions;
				let flag = false;
				if (conditions) {
					console.log("conditins exists, in if block", conditions);
					if (conditions.brand?.length > 0) {
						for (let cartItem of cart) {
							if (cartItem.productBrand && conditions.brand.indexOf(cartItem.productBrand) !== -1) {
								continue;
							} else {
								flag = true;
								setCouponMessage(`This coupon is not applicable for ${cartItem.productBrand} brand.`)
							}
						}
					}
					if (conditions.numberOfProducts > cart?.map(item => item.productQuantity)?.reduce((acc, curr) => acc+ curr, 0)) {
						flag = true;
						setCouponMessage(`Minimum ${conditions.numberOfProducts} products must be added to avail this coupon.`)
					}
					if (conditions.products?.length > 0) {
						for (let cartItem of cart) {
							if (conditions.products.indexOf(cartItem.productId) !== -1) {
								continue;
							} else {
								flag = true;
								setCouponMessage('This coupon is not applicable for the products in your cart');
							}
						}
					}

					if (!flag) {
						console.log("I am here applying the coupon");
						let totalOrderValue = cart?.map(item => (item?.productPrice * item.productQuantity)).reduce((acc, currVal) => acc + currVal, 0);
						let totalDiscount = totalOrderValue * (1 - response?.data?.coupon?.couponDiscount / 100);
						console.log(totalDiscount, response?.data?.coupon?.maximumAllowedDiscount)
						setDiscount(totalDiscount >= response?.data?.coupon?.maximumAllowedDiscount ? response?.data?.coupon?.maximumAllowedDiscount : totalDiscount);
					}
				} else {
					console.log('no conditions exist, inside else block')
					let totalOrderValue = cart?.map(item => (item?.productPrice * item.productQuantity)).reduce((acc, currVal) => acc + currVal, 0);
					let totalDiscount = totalOrderValue * (1 - response?.data?.coupon?.couponDiscount / 100);
					setDiscount(totalDiscount >= response?.data?.coupon?.maximumAllowedDiscount ? response?.data?.coupon?.maximumAllowedDiscount : totalDiscount);
				}
			}
		} catch (error) {
			log(error);

		}
	}
	function handleRemoveCoupon() {
		try {
			log("removing coupon")
			setDiscount(undefined);
			setCoupon(undefined)
		} catch (error) {
			log(error)
		}
	}

	function handleOpenDrawer() {
		const container = document.querySelector(".addr-drawer-drop");
		container.style.opacity = 1;
		container.style.height = '500px';
		container.style.visibility = "visible";
	}
	function handleCloseDrawer() {
		const container = document.querySelector(".addr-drawer-drop");
		container.style.opacity = 0;
		container.style.height = '0px';
		container.style.visibility = "hidden";
	}

	async function handleRemoveCartItem(cartItem) {
		const response = await axios.post("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/remove-cart-item", { cartItem });
		if (response?.status === 200) {
			fetchCartItems();
		}
	}

	async function handleAddDeliveryAddress() {
		log("handling address details add");
		log(newAddress);
		if (Object.keys(newAddress)?.length > 0) {
			const response = await axios.post("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/update-delivery-information", { ...newAddress });
			if (response.status === 200) {
				fetchCartItems();
				handleCloseDrawer();
			}
		}
	}

	useEffect(() => {
		fetchCartItems()
	}, [])

	log("DELIVERY ADDRESS", deliveryAddresses);

	return (
		<>
			<Header />
			{
				cart === undefined ? (
					<div className="py-[10%] flex justify-center">
						<ColorRing
							visible={true}
							height="80"
							width="80"
							ariaLabel="color-ring-loading"
							wrapperStyle={{}}
							wrapperclassName="color-ring-wrapper"
							colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
						/>
					</div>
				) : (

					cart?.length > 0 ? (
						<section className="pt-[100px] bg-[#F7F7F7]">
							<div className="center-wr">
								<div>
									<table style={{ boxShadow: "1px 1px 3px rgba(0,0,0,.15)" }} className="bg-[#fff] w-[90%] my-[0] mx-[auto]">
										<tr>
											<th className="py-[10px] border-solid border-b-[#ddd] border-b-[2px] text-left pl-[12%]">Product</th>
											<th className="py-[10px] border-solid border-b-[#ddd] border-b-[2px]">Price</th>
											<th className="py-[10px] border-solid border-b-[#ddd] border-b-[2px]">Quantity</th>
											<th className="py-[10px] border-solid border-b-[#ddd] border-b-[2px]">Subtotal</th>
											<th></th>
										</tr>
										<tbody>
											{
												cart?.map(cartItem => (
													<tr>
														<td className="flex items-center ">
															<figure className="w-[100px] p-[18px]"><img src={`https://batterybackend.react.stagingwebsite.co.in/images/${cartItem?.productImage}`} alt="product image" /></figure>
															<span>{cartItem?.productName}</span>
														</td>
														<td className="text-center font-['Arial'] text-[16px] font-[500] "><i className='bx bx-rupee'></i>{`${cartItem?.productPrice}`}</td>
														<td className="text-center w-[100px]">
															<input className="w-[65%] py-[5px] m-[10px] text-center border-[1px] border-solid border-[#0000004d]" disabled type="text" value={cartItem?.productQuantity} />
														</td>
														<td className="text-center font-['Arial'] font-[500] text-[16px] tracking-[1px]"><i className='bx bx-rupee'></i>{`${cartItem?.productPrice * cartItem?.productQuantity}`}</td>
														<td>
															<button onClick={() => { handleRemoveCartItem(cartItem) }} ><i className='bx bx-trash-alt'></i></button>
														</td>
													</tr>
												))
											}
										</tbody>
									</table>
								</div>
								<div className="w-[90%] mx-auto my-[15px] p-[30px] bg-white shadow-[1px_1px_3px_rgba(0,0,0,0.15)] relative">
									<div className="flex items-center justify-between">
										<h3 className="text-[18px] font-[600] font-['Poppins']" style={{ color: !showIndicator ? "#000" : "red" }}>Choose an address</h3> <i style={{ visibility: !showIndicator ? "hidden" : "visible" }} className="text-red-400 fa-solid fa-arrow-left absolute indicator-arrow"></i>
										<button className="p-[10px] font-semibold text-orange-500 text-[14px] border-2 border-orange-500" onClick={handleOpenDrawer}>Add new address</button>
									</div>
									<div className="p-[10px] flex items-center gap-[25px] flex-wrap">
										{
											deliveryAddresses?.map(item => (
												<label onClick={() => { setChosenAddress(item) }} htmlFor={`${item?.addressName?.toLowerCase() + 'addr-type'}`} className="cursor-pointer addr-label flex flex-col border-2 items-start justify-start relative rounded-[8px] pt-[12px] pb-[25px] px-[15px] w-[255px] h-[120px]">
													<input id={`${item?.addressName?.toLowerCase() + 'addr-type'}`} className="addr-input absolute top-[15px] right-[15px]" type="radio" name="delivery" checked={item?._id === chosenAddress?._id ? true : false} value={item?._id} aria-labelledby="delivery-0-name" aria-describedby="delivery-0-shipping delivery-0-price" />
													<div className="flex flex-col gap-[10px]">
														<span id="delivery-0-name" className="flex items-center gap-[5px]"><i className={`text-[20px] ${item?.addressType === "Home" ? "bx bxs-home-smile" : item?.addressType === "Work" ? "bx bxs-briefcase-alt-2" : "bx bxs-buildings"}`} ></i>{item?.addressName}</span>
														<small id="delivery-0-shipping" className="item-shipping w-[220px]">{item?.addressLineOne + " " + item?.addressLineTwo}</small>
													</div>
												</label>
											))
										}
									</div>
									<div ref={drawerRef} className="relative addr-drawer-drop ">
										<span className="absolute top-[10px] right-[10px] text-[28px] cursor-pointer" onClick={handleCloseDrawer}>&times;</span>
										<h4 className="font-['Poppins'] my-[15px]">Add a new address</h4>
										<div className="flex items-center gap-[25px] w-[100%] pb-[10px]">
											<label htmlFor="home-addr-type" className="w-[150px] addr-label flex flex-col	border-2 items-start justify-start relative rounded-[8px] pt-[12px] pb-[12px] px-[15px]">
												<input id="home-addr-type" onChange={(e) => { setNewAddress(prev => ({ ...prev, addressType: e.target.value })) }} className="addr-input absolute top-[15px] right-[15px]" type="radio" name="addressType" value="Home" aria-labelledby="delivery-0-name" aria-describedby="delivery-0-shipping delivery-0-price" />
												<div className="flex flex-col gap-[10px]">
													<span id="delivery-0-name" className="flex items-center gap-[5px]"><i className='bx bxs-home-smile text-[20px]' ></i>Home</span>
												</div>
											</label>
											<label htmlFor="work-addr-type" className="w-[150px] addr-label flex flex-col	border-2 items-start justify-start relative rounded-[8px] pt-[12px] pb-[12px] px-[15px]">
												<input id="work-addr-type" onChange={(e) => { setNewAddress(prev => ({ ...prev, addressType: e.target.value })) }} className="addr-input absolute top-[15px] right-[15px]" type="radio" name="addressType" value="Work" aria-labelledby="delivery-0-name" aria-describedby="delivery-0-shipping delivery-0-price" />
												<div className="flex flex-col gap-[10px]">
													<span id="delivery-0-name" className="flex items-center gap-[5px]"><i className='bx bxs-briefcase-alt-2' ></i>Work</span>
												</div>
											</label>
											<label htmlFor="other-addr-type" className="w-[150px] addr-label flex flex-col	border-2 items-start justify-start relative rounded-[8px] pt-[12px] pb-[12px] px-[15px]">
												<input id="other-addr-type" onChange={(e) => { setNewAddress(prev => ({ ...prev, addressType: e.target.value })) }} className="addr-input absolute top-[15px] right-[15px]" type="radio" name="addressType" value="Other" aria-labelledby="delivery-0-name" aria-describedby="delivery-0-shipping delivery-0-price" />
												<div className="flex flex-col gap-[10px]">
													<span id="delivery-0-name" className="flex items-center gap-[5px]"><i className='bx bxs-buildings' ></i>Other</span>
												</div>
											</label>
										</div>
										<label htmlFor="" className="text-[13px] font-semibold mt-[25px] block">Address Name</label>
										<div className="flex items-center border-b-[1px] border-slate-900  w-fit">
											<i className='bx bxs-pencil text-[#000] px-[10px]' ></i>
											<input onChange={(e) => { setNewAddress(prev => ({ ...prev, addressName: e.target.value.slice(0, 50) })) }} type="text" className="py-[7px] pr-[10px] rounded-[5px] outline-none" placeholder="Name" />
										</div>
										<h5 className="font-semibold text-[13px] my-[25px]">Details:</h5>
										<div className="flex items-center flex-wrap gap-[25px]">
											<div className="flex items-center border-2 rounded-[5px] w-fit">
												<i className='bx bxs-user text-[#000] px-[10px]' ></i>
												<input onChange={(e) => { setNewAddress(prev => ({ ...prev, firstName: e.target.value })) }} type="text" className="py-[7px] pr-[10px] rounded-[5px] outline-none" placeholder="First name" />
											</div>
											<div className="flex items-center border-2 rounded-[5px] w-fit">
												<i className='bx bxs-user text-[#000] px-[10px]' ></i>
												<input onChange={(e) => { setNewAddress(prev => ({ ...prev, lastName: e.target.value })) }} type="text" className="py-[7px] pr-[10px] rounded-[5px] outline-none" placeholder="Last name" />
											</div>
											<div className="flex items-center border-2 rounded-[5px] w-fit">
												<i className='bx bxs-envelope text-[#000] px-[10px]'></i>
												<input onChange={(e) => { setNewAddress(prev => ({ ...prev, email: e.target.value })) }} type="email" className="py-[7px] pr-[10px] rounded-[5px] outline-none" placeholder="Email" />
											</div>
											<div className="flex items-center border-2 rounded-[5px] w-fit">
												<i className='bx bxs-phone text-[#000] px-[10px]' ></i>
												<input onChange={(e) => { setNewAddress(prev => ({ ...prev, phone: e.target.value })) }} type="text" className="py-[7px] pr-[10px] rounded-[5px] outline-none" placeholder="Phone" />
											</div>
											<div className="flex items-center border-2 rounded-[5px] w-fit">
												<i className='bx bxs-location-plus text-[#000] px-[10px]' ></i>
												<input onChange={(e) => { setNewAddress(prev => ({ ...prev, addressLineOne: e.target.value })) }} type="text" className="py-[7px] pr-[10px] rounded-[5px] outline-none" placeholder="Address Line One" />
											</div>
											<div className="flex items-center border-2 rounded-[5px] w-fit">
												<i className='bx bxs-location-plus text-[#000] px-[10px]' ></i>
												<input onChange={(e) => { setNewAddress(prev => ({ ...prev, addressLineTwo: e.target.value })) }} type="text" className="py-[7px] pr-[10px] rounded-[5px] outline-none" placeholder="Address Line Two" />
											</div>
											<div className="flex items-center border-2 rounded-[5px] w-fit">
												<i className='bx bxs-location-plus text-[#000] px-[10px]' ></i>
												<input onChange={(e) => { setNewAddress(prev => ({ ...prev, state: e.target.value })) }} type="text" className="py-[7px] pr-[10px] rounded-[5px] outline-none" placeholder="Choose Your State" />
											</div>
											<div className="flex items-center border-2 rounded-[5px] w-fit">
												<i className='bx bxs-location-plus text-[#000] px-[10px]' ></i>
												<input onChange={(e) => { setNewAddress(prev => ({ ...prev, city: e.target.value })) }} type="text" className="py-[7px] pr-[10px] rounded-[5px] outline-none" placeholder="Choose Your City" />
											</div>
											<div className="flex items-center border-2 rounded-[5px] w-fit">
												<i className='bx bxs-location-plus text-[#000] px-[10px]' ></i>
												<input onChange={(e) => { setNewAddress(prev => ({ ...prev, pinCode: e.target.value })) }} type="text" className="py-[7px] pr-[10px] rounded-[5px] outline-none" placeholder="Pincode" />
											</div>
											<div className="flex items-center border-2 rounded-[5px] w-fit">
												<i className='bx bxs-location-plus text-[#000] px-[10px]' ></i>
												<input onChange={(e) => { setNewAddress(prev => ({ ...prev, country: e.target.value })) }} type="text" className="py-[7px] pr-[10px] rounded-[5px] outline-none" placeholder="Country" />
											</div>
										</div>
										<button onClick={handleAddDeliveryAddress} className="px-[20px] py-[8px] bg-[#ff7637] text-white font-semibold mt-[25px] rounded-[5px]"><i className='bx bxs-paper-plane text-[#fff] pr-[10px]'></i>Add</button>
									</div>
								</div>
								<div className="py-[15px] flex justify-between w-[90%] my-[0] mx-[auto]">
									<div style={{ boxShadow: "1px 1px 3px rgba(0,0,0,.15)" }} className="w-[40%] py-[15px] h-[100%]  pb-[20px] px-[30px] bg-[#fff]">
										<div className="py-[7px]">
											<h3 className="text-[18px] font-[600] font-['Poppins']">Apply Coupon</h3>
										</div>
										{couponMessage && <div className="rounded-[8px] p-[15px] bg-rose-100 text-rose-500">{couponMessage}</div>}
										<div className="py-[7px] flex items-center justify-between">
											<input onChange={(e) => { setCouponCode(e.target.value) }} value={couponCode || ""} className="text-[14px] w-[71%] px-[10px] py-[10px] border-[1px] border-solid border-[#0000004d]" type="text" placeholder="Enter Coupon Code" />
											<button className="text-[14px] bg-[#EEEEEE] w-[27%] py-[10px]  px-[7px] border-[1px] border-solid border-[#0000004d]" onClick={handleApplyCoupon}>Apply</button>
										</div>
										{
											coupon && (
												<div className="bg-emerald-100 rounded-[6px] p-[10px] mt-[15px]">
													<h6 className="text-emerald-500 font-bold tracking-[2px] leading-[20px] flex items-center mb-[10px] gap-[5px]"><i className='bx bxs-award text-[22px] leading-[20px]'></i> {coupon?.couponCode}</h6>
													<p className="text-[13px] leading-[18px] my-[5px] text-emerald-700 px-[30px]">Coupon Applied:{coupon?.couponDescription}</p>
													<div className="text-end"><button onClick={handleRemoveCoupon} className="text-rose-600 font-semibold">Remove</button></div>
												</div>
											)
										}
									</div>
									<div style={{ boxShadow: "1px 1px 3px rgba(0,0,0,.15)" }} className="text-left w-[38%] border-[1px] border-solid border-[rgba(0,0,0,0.1)] py-[15px] px-[30px] bg-[#fff]">
										<table style={{ width: "100%" }}>
											<tr>
												<td colSpan={2} className="font-['Trebuchet MS'] text-[14px] p-[2px] uppercase font-semibold">Items</td>
											</tr>
											<tr>
												<td colSpan={2} style={{ padding: '4px 0px' }}>
													<table style={{ width: "100%" }}>
														{
															cart?.map(cartItem => (
																<tr>
																	<td className="w-[70%] text-[13px] font-[400] text-[#707070] font-sans pl-[10px] ">{cartItem?.productName}</td>
																	<td className="w-[30%] text-[13px] font-[400] text-[#707070] font-sans text-end " >{cartItem.productPrice} &times; {cartItem?.productQuantity}</td>
																</tr>
															))
														}
														<tr></tr>
													</table>
												</td>
											</tr>
											<tr style={{ borderTop: "1px solid rgba(0,0,0,0.4)", borderBottom: "1px solid rgba(0,0,0,0.4)" }}>
												<td className="w-[30%] font-['Trebuchet MS'] text-[13px] p-[2px] pt-[4px]  font-semibold">Sub Total</td>
												<td className="w-[70%] font-sans font-semibold text-[14px] text-end"><i className='bx bx-rupee'></i> {cart?.map(item => (item?.productPrice * item.productQuantity)).reduce((acc, currVal) => acc + currVal, 0)} </td>
											</tr>
											<tr>
												<td className="w-[30%] font-['Trebuchet MS'] text-[13px] font-semibold p-[2px]">Discount (%)</td>
												<td className="w-[70%] font-sans font-semibold text-[14px] text-end">0 %</td>
											</tr>
											<tr>
												<td className="w-[30%] font-['Trebuchet MS'] text-[13px] font-semibold p-[2px]">Taxes and Misc</td>
												<td className="w-[70%] font-sans font-semibold text-[14px] text-end"><i className='bx bx-rupee'></i>0.00</td>
											</tr>
											{discount && (<tr>
												<td className="w-[30%] font-['Trebuchet MS'] text-[13px] font-semibold p-[2px]">Coupon Applied</td>
												<td className="w-[70%] font-sans font-semibold text-[14px] text-end text-rose-600"><i className='bx bx-rupee'></i> -{discount}</td>
											</tr>)}
											<tr style={{ borderTop: "1px solid rgba(0,0,0,0.4)" }}>
												<td className="w-[30%] font-['Arial'] text-[14px] font-semibold p-[5px] font-semibold">Order Total</td>
												<td className="w-[70%] font-sans font-semibold text-[16px] text-end text-emerald-600"><i className='bx bx-rupee'></i> {discount ? cart?.map(item => (item?.productPrice * item.productQuantity)).reduce((acc, currVal) => acc + currVal, 0) - discount : cart?.map(item => (item?.productPrice * item.productQuantity)).reduce((acc, currVal) => acc + currVal, 0)}</td>
											</tr>
										</table>
										<div className="my-[15px]">
											<button className="bg-[#0D4EF2] text-[#fff] text-center w-[100%] px-[15px] py-[10px]" onClick={initiateOrderPlacement}>Checkout</button>
										</div>
									</div>
								</div>
							</div>
						</section>
					) : (
						<section className="flex flex-col items-center justify-center pt-[235px] ">
							<img src="/images/icons8-cart-100.png" alt="empty cart" />
							<h1 className="text-[48px] font-semibold">Your Cart Is Currently Empty!</h1>
							<p>Before you proceed to checkout you must add some products to your cart. </p>
							<p>We offer a wide range of batteries to choose from. <Link to={"/"} className="text-orange-500">Shop Here</Link></p>
						</section>
					)
				)
			}
			<EnquirySection />
			<Footer />

			<Toaster />
		</>
	)
}
export default Cart;