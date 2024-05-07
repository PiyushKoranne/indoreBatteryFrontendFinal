import React, { useState, useEffect, useContext, useRef } from "react";
import Header from "./common/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true
import { useParams } from "react-router-dom";
import Footer from "./common/Footer";
import EnquirySection from "./common/EnquirySection";
import { LoginContext } from "../App";
import toast, { Toaster } from "react-hot-toast";
import { Modal } from "antd";
import { batteryIndoreDataService } from "../services/dataService";
import swal from "sweetalert";
import log from "../utils/utilityFunctions";
import HeaderNew from "./common/HeaderNew";
import { Formik } from "formik";
import Meta from "./common/Meta";


function BuyBattery() {

	/**
	 * STATES AND VARIABLES
	 */

	const ratingRef = useRef(null);	
	const navigate = useNavigate();
	const { loginStatus, setShowCartBadge } = useContext(LoginContext);
	const { batterySlug } = useParams();

	/** 
	 * Modal States
	 */
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [review, setReview] = useState({ reviewScore: 4 });
	const [postData, setPostData] = useState("");
	const [specialPrice, setSpecialPrice] = useState("");
	const [batteryId, setBatteryId] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [exchangeBattery, setExchangeBattery] = useState(true);
	const backend_url = import.meta.env.VITE_BACKEND_URL;
	const [showCallbackModal, setShowCallbackModal] = useState(false);
	const [showQuotationModal, setShowQuotationModal] = useState(false);
	// for call rating

	const [wishlist, setwishlist] = useState(null);
	const [wishTrigger, setWishTrigger] = useState(false);

	async function getWishlistItems() {
		try {
			const response = await batteryIndoreDataService.getWishlist();
			log("WISHLIST DATA::", response?.data?.wishList)
			if (response.status === 200) {
				setwishlist(response.data?.wishList);
			}
		} catch (error) {
			log(error)
		}
	}

	/**
	 * INTERACTION LOGIC
	 */
	const openQuotationModal = () => {
		setShowQuotationModal(true);
	};

	const closeQuotationModal = () => {
		setShowQuotationModal(false);
	};

	const openReviewModal = () => {
		setShowCallbackModal(true);
	};

	const closeReviewModal = () => {
		setShowCallbackModal(false);
	};


	const handleOk = () => {

	}

	const handleCancel = () => {
		log('Clicked cancel button');
		setOpen(false);
	}


	const handleIncrement = () => {
		if (quantity < 10) {
			setQuantity(prev => prev + 1);
		}
	};

	const handleDecrement = () => {
		if (quantity > 1) {
			setQuantity(prev => prev - 1);
		}
	};

	async function handleAddToWishlist() {
		try {
			if(wishlist?.filter(item => item?.productId === batteryId)?.length > 0){
				const response = await axios.post("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/remove-from-wishlist", {
					batteryId
				}, {
					headers:{
						"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
					}
				});
				if (response?.status === 200) {
					toast.success("Item removed!");
					setWishTrigger(prev => !prev);
				}
			} else {
				if (!batteryId) return;
				const response = await batteryIndoreDataService.addToWishlist(batteryId);
				if (response.status === 200) {
					toast.success("Item added to wishlist");
					setWishTrigger(prev => !prev);
				}
			}
		} catch (error) {
			log(error);
			if (error?.response.status === 400) {
				toast.error("Login to save to wishlist")
			}
		}
	}

	async function handleAddReview(e) {
		e.preventDefault();
		const response = await axios.post("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/add-review", {
			productId: batteryId,
			reviewerName: review?.reviewerName,
			reviewScore: review?.reviewScore,
			reviewContent: review?.reviewContent
		}, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
			}
		})
		if (response.status === 200) {
			swal({
				icon: "success",
				title: "Thanks you for your precious time",
				showConfirmButton: false,
				timer: 2000
			});
			setReview({ reviewScore: 4, reviewerName: "", reviewContent: "" })
		}
		log(response.status)
	}

	async function handleQuotationRequest(values) {
		const response = await axios.post(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/ask-battery-quotation`, {
			productId: batteryId,
			quantity: quantity,
			...values
		}, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
			}
		})
		if (response.status === 200) {
			setShowQuotationModal(false)
			swal({
				icon: "success",
				title: "Our team will reach to you as soon as possible",
				showConfirmButton: false,
				timer: 2000
			});
		}
	}

	async function handleCallbackRequest(values) {
		try {
			const response = await axios.post(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/request-callback`, values, {
				headers:{
					"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
				}
			})
			if (response.status === 200) {
				setShowCallbackModal(false)
				swal({
					icon: "success",
					title: "Our team will reach to you as soon as possible",
					showConfirmButton: false,
					timer: 2000
				});
			}
		} catch (error) {
			log(error);
			swal({
				icon: "error",
				title: "Oops! There seems to be some issue.",
				showConfirmButton: false,
				timer: 2000
			});
		}
	}

	/**
	 * RENDERING LOGIC
	 */

	async function getBatteryData() {
		const response = await batteryIndoreDataService.getBattery(batterySlug);
		setBatteryId(response?.data?.data?._id);
		setPostData(response?.data?.data?.postData);
	}


	useEffect(() => {
		getBatteryData();
	}, [])
	
	useEffect(()=>{
		getWishlistItems();
	},[wishTrigger])

	const scrollToRatingSection = () => {
		const ratingSection = ratingRef.current;
		if(!ratingSection) return;
		const yOffset = -100; // Adjust as needed
		const y = ratingSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
		window.scrollTo({ top: y, behavior: 'smooth' });
	};


	async function handleBuyNow() {
		if (!loginStatus || !loginStatus?.isLoggedIn) {
			localStorage.setItem('cart', JSON.stringify({ batteryId, quantity, exchangeBattery }));
			navigate("/login");
			return;
		}
		const response = await batteryIndoreDataService.addToCart(batteryId, quantity, exchangeBattery)
		log(response);
		if (response.status === 200) {
			navigate("/cart")
		}
	}

	async function handleAddToCart() {
		if (!loginStatus || !loginStatus?.isLoggedIn) {

			localStorage.setItem('cart', JSON.stringify({ batteryId, quantity, exchangeBattery }));
			navigate("/login");
			return;
		}
		const response = await batteryIndoreDataService.addToCart(batteryId, quantity, exchangeBattery)
		if (response.status === 200) {
			toast.success("Item added to cart!");
			setShowCartBadge(prev => !prev);
		} else {
			toast.error("Oops! Failed to add item!")
		}
	}

	return (
		<>
			<Meta title="Buy Battery | Indore Battery" />
			<HeaderNew />

			{/* MODALS */}
			<Modal
				title="Title"
				open={open}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>

			</Modal>

			<section className="buy-battery-section-top">
				<Toaster position="bottom-center" toastOptions={{
					// Define default options
					className: '',
					duration: 5000,
					style: {
						background: '#363636',
						color: '#fff',
					},

					// Default options for specific types
					success: {
						duration: 3000,
						theme: {
							primary: 'green',
							secondary: 'black',
						},
					},
				}} />
				<div className="center-wr pt-[40px] ">
					<div className="mt-[0%]">
						<div className="flex p-[8px] gap-[7px] items-center mb-[20px]">
							<span className="768:text-[16px] font-[600] 320:text-[14px] leading-[20px]" >
								<Link to={"/"} className="hover:text-[#ff7637]">Home Page</Link>
							</span>
							<span className="inline-block py-[1px] ">
								<img src="/images/bar.png" className="" alt="" />
							</span>
							<span className="text-[#FF7637] 768:text-[16px] font-[600] 320:text-[14px] leading-[20px]">{postData?.name}</span>
						</div>

						<div className="flex flex-wrap">
							<div className="850:w-[37%] 320:w-full">
								<figure className="w-[100%] border-[1px] solid border-[rgba(0,0,0,0.2) p-[40px] relative">
									{(parseInt(postData?.stock || '0') === 0 || !postData?.stock) && (
										<div className="absolute top-[-74px] left-[-9px]">
											<img src="/images/sold-out.png" width={200} alt="" />
										</div>
									)}
									<img src={`${backend_url}/images/${postData?.batteryimages}`} alt="battery image" />
								</figure>
								<div className="320:hidden 850:block">
									<div className="grid 1200:grid-cols-2 320:grid-cols-1  gap-[15px] pt-[15px]">
										<div onClick={openReviewModal} className="320:w-full  py-[8px] hover:bg-[#ff763720] cursor-pointer transition-all px-[15px] text-center border-[1px] solid border-[rgba(0,0,0,0.2)] flex items-center gap-[10px]">
											<figure className="bg-[#ff7637] 320:w-[25px] 320:h-[25px] w-[35px] h-[35px] flex items-center justify-center rounded-full"><i className="320:text-[16px] text-[18px] text-white bx bxs-phone-call"></i></figure>
											<span className="text-[14px]" >Request Callback</span>
										</div>
										<div onClick={openQuotationModal} className="320:w-full  py-[8px] hover:bg-[#ff763720] cursor-pointer transition-all px-[15px] text-center border-[1px] solid border-[rgba(0,0,0,0.2)] flex items-center gap-[10px]">
											<figure className="bg-[#ff7637] 320:w-[25px] 320:h-[25px] w-[35px] h-[35px] flex items-center justify-center rounded-full"><i className="320:text-[16px] text-[18px] text-white bx bxs-receipt"></i></figure>
											<span className="text-[14px]" >Ask For Quotation</span>
										</div>
										<div onClick={scrollToRatingSection} className="320:w-full  py-[8px] hover:bg-[#ff763720] cursor-pointer transition-all px-[15px] text-center border-[1px] solid border-[rgba(0,0,0,0.2)] flex items-center gap-[10px]">
											<figure className="bg-[#ff7637] 320:w-[25px] 320:h-[25px] w-[35px] h-[35px] flex items-center justify-center rounded-full"><i className="320:text-[16px] text-[18px] text-white bx bxs-star"></i></figure>
											<span className="text-[14px]" >Write a Review</span>
										</div>
										<div onClick={handleAddToWishlist} className="320:w-full  py-[8px] hover:bg-[#ff763720] cursor-pointer transition-all px-[15px] text-center border-[1px] solid border-[rgba(0,0,0,0.2)] flex items-center gap-[10px]">
											<figure className="bg-[#ff7637] 320:w-[25px] 320:h-[25px] w-[35px] h-[35px] flex items-center justify-center rounded-full"><i className="320:text-[16px] text-[18px] text-white bx bxs-heart"></i></figure>
											<span className="text-[14px]" >Add to Wishlist</span>
										</div>
									</div>
								</div>
							</div>

							<div className="850:w-[50%] 320:w-full mx-[2%] 1368:pr-[150px]">
								<div>
									<h3 className="text-[28px] font-[600] py-[15px] font-['Oswald'] uppercase"><span>{postData?.name?.split(" ")[0]}</span> {postData?.name?.split(" ")?.slice(1)?.join(" ")}</h3>
									<div className="font-[600] 320:text-[14px]"><span> Warranty:</span> <span>&nbsp; {postData?.warranty}</span></div>
									<div className="font-[600] my-[10px] 320:text-[14px]"><span> Capacity:&nbsp; <span>{postData?.capacity} AH </span></span></div>
									<div className="my-[10px]"><span className="font-[600] 320:text-[14px]">MRP:</span><span className="font-[600] line-through ml-[10px] font-sans"> ₹{postData?.mrp}</span><span className="inline-block bg-green-700 text-[13px] text-white px-[10px] rounded-[2px] font-semibold py-[3px] ml-[20px]">{`${Math.round(((parseInt(postData?.mrp) - parseInt(postData?.specialprice)) / parseInt(postData?.mrp)) * 100)}% OFF`}</span></div>
									<div className="my-[10px]"><span className="font-[600] 320:text-[14px]">Special Price:</span>&nbsp;<span className="font-[600] font-sans"> ₹{postData?.specialprice}</span></div>
									<div className="mt-[20px] flex items-stretch">
										<button className="bg-[#202020] px-[12px] py-[4px] text-[#fff]" onClick={handleDecrement}>-</button>
										<input className="w-[50px] text-center border-t-[1px] border-b-[1px] border-[rgba(0,0,0,0.4)]" min={1} max={parseInt(postData?.stock)} type="text" onChange={(e) => setQuantity(parseInt(e.target.value))} value={quantity} />
										<button className="bg-[#ff7637] px-[12px] py-[4px] text-[#fff]" onClick={handleIncrement}>+</button>
									</div>

									<div className="mt-[25px]">
										<div className="flex" style={{ display: !postData?.pricewitholdbattery ? "none" : "block" }}>
											<label onClick={() => { setExchangeBattery(true) }} htmlFor="with-old" className="battery-price-picker flex justify-between px-[15px] 320:px-0 320:w-full w-[50%]">
												<div className="flex items-center gap-[10px]">
													<input
														type="radio"
														id="with-old"
														name="specialPrice"
														checked={exchangeBattery}
													/>
													<span className="text-[14px]">With Old Battery <em className="text-[12px] font-[200]">(Same Ah)</em></span>
												</div>
												<span className="font-sans">₹{postData?.pricewitholdbattery}</span>
											</label>
										</div>

										<div className="flex  mt-[10px]" style={{ display: !postData?.pricewitholdbattery ? "none" : "block" }}>
											<label onClick={() => { setExchangeBattery(false) }} htmlFor="without-old" className="battery-price-picker flex justify-between px-[15px] 320:px-0 320:w-full w-[50%]">
												<div className="flex items-center gap-[10px]">
													<input
														type="radio"
														id="without-old"
														name="specialPrice"
														checked={!exchangeBattery}
													/>
													<span className="text-[14px]">Without Old Battery </span>
												</div>
												<span className="font-sans">₹{postData?.pricewithoutoldbattery}</span>
											</label>
										</div>

										{parseInt(postData?.stock) > 0 && (
											<div className="flex items-center  relative">
												<button onClick={handleBuyNow} className=" mx-[15px] p-[10px] 320:w-fit 320:mx-0 w-[30%] pl-[20px] pr-[20px] mt-[30px] 320:text-[14px]  text-[18px] font-[600] focus:outline-none bg-gradient-to-b from-[#ff7637] to-orange-600 text-white">Buy Now</button>
												<button onClick={handleAddToCart} className=" mx-[15px] p-[10px] 320:w-fit 320:mx-0 320:ml-[10px] w-[30%] pl-[20px] pr-[20px] mt-[30px] 320:text-[14px]  text-[18px] font-[600] focus:outline-none bg-[#000] text-white">Add to Cart</button>
												<button onClick={handleAddToWishlist} className={`absolute right-0 w-[40px] h-[40px] flex items-center justify-center rounded-full border-2  mx-[15px] 320:mx-0 320:ml-[10px] mt-[30px] ${wishlist?.filter(item => item?.productId === batteryId)?.length > 0 ? 'bg-rose-500 border-rose-600':'border-gray-700' }`}><i className={`text-[20px] fa-regular fa-heart ${wishlist?.filter(item => item?.productId === batteryId)?.length > 0 ? 'text-white':'' }`}></i></button>
											</div>)}

									</div>
									<div className=" 320:grid 850:hidden 480:grid-cols-2 320:grid-cols-1 gap-[15px] pt-[15px]">
										<div onClick={openReviewModal} className="320:w-full  py-[8px] hover:bg-[#ff763720] cursor-pointer transition-all px-[15px] text-center border-[1px] solid border-[rgba(0,0,0,0.2)] flex items-center gap-[10px]">
											<figure className="bg-[#ff7637] 320:w-[25px] 320:h-[25px] w-[35px] h-[35px] flex items-center justify-center rounded-full"><i className="320:text-[16px] text-[18px] text-white bx bxs-phone-call"></i></figure>
											<span className="text-[14px]" >Request Callback</span>
										</div>
										<div onClick={openQuotationModal} className="320:w-full  py-[8px] hover:bg-[#ff763720] cursor-pointer transition-all px-[15px] text-center border-[1px] solid border-[rgba(0,0,0,0.2)] flex items-center gap-[10px]">
											<figure className="bg-[#ff7637] 320:w-[25px] 320:h-[25px] w-[35px] h-[35px] flex items-center justify-center rounded-full"><i className="320:text-[16px] text-[18px] text-white bx bxs-receipt"></i></figure>
											<span className="text-[14px]" >Ask For Quotation</span>
										</div>
										<div onClick={scrollToRatingSection} className="320:w-full  py-[8px] hover:bg-[#ff763720] cursor-pointer transition-all px-[15px] text-center border-[1px] solid border-[rgba(0,0,0,0.2)] flex items-center gap-[10px]">
											<figure className="bg-[#ff7637] 320:w-[25px] 320:h-[25px] w-[35px] h-[35px] flex items-center justify-center rounded-full"><i className="320:text-[16px] text-[18px] text-white bx bxs-star"></i></figure>
											<span className="text-[14px]" >Write a Review</span>
										</div>
										<div onClick={handleAddToWishlist} className="320:w-full  py-[8px] hover:bg-[#ff763720] cursor-pointer transition-all px-[15px] text-center border-[1px] solid border-[rgba(0,0,0,0.2)] flex items-center gap-[10px]">
											<figure className="bg-[#ff7637] 320:w-[25px] 320:h-[25px] w-[35px] h-[35px] flex items-center justify-center rounded-full"><i className="320:text-[16px] text-[18px] text-white bx bxs-heart"></i></figure>
											<span className="text-[14px]" >Add to Wishlist</span>
										</div>
									</div>
									<div className="mt-[20px]">
										<h3 className=" w-[20%] 320:w-full  uppercase py-[8px] border-t-[1px] border-b-[1px] border-dashed whitespace-nowrap text-[20px] border-[#ff7637] text-[#202020] font-[500]">FULFILLED BY INDORE BATTERY</h3>
										<ul className="uppercase text-[12px] font-[400] py-[15px] leading-[20px]">
											<li>BRAND NEW & 100% GENUINE</li>
											<li>FREE DELIVERY & INSTALLATION</li>
											<li>CASH ON DELIVERY</li>
											<li>Pay by Credit card</li>
											<li>Pay in EMI</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* description */}
			<section className="my-[50px]" style={{ display: !postData?.description ? "none" : "block" }}>
				<div className="center-wr">
					<div>
						<h3 className="font-[600] text-[22px] uppercase">Description</h3>
					</div>
					<div className="buy-battery-description py-[15px] gap-[10px] flex flex-col text-[15px] font-['Sora'] 320:text-left" dangerouslySetInnerHTML={{ __html: postData?.description }}></div>
				</div>
			</section>	

			{/* features */}
			<section className="my-[50px]">
				<div className="center-wr">
					<div>
						<h3 className="font-[600] text-[22px] uppercase">Features</h3>
					</div>
					<div className="buy-battery-features-li py-[15px] 320:text-[14px] 1024:text-[16px]" dangerouslySetInnerHTML={{ __html: postData?.features }}></div>

				</div>
			</section>

			{/* recommended for */}
			<section className="my-[50px]">
				<div className="center-wr">
					<div><h3 className="font-[600] text-[22px] uppercase">RECOMMENDED FOR:</h3></div>
					<div className="buy-battery-recommend-for py-[15px] 320:text-[14px] 1024:text-[16px]" dangerouslySetInnerHTML={{ __html: postData?.recommendedfor }}></div>
				</div>
			</section>

			<section id="rating-section " ref={ratingRef} className="1200:pb-[200px] 320:pb-[50px]">
				<div className="center-wr">
					<div className=" border-solid border-[1px] border-[rgba(0,0,0,0.15)] bg-[#f7f7f7] ">
						<div className="320:hidden 980:block mx-[20px] p-[10px] py-[20px] border-b-[1px] border-b-solid border-b-[rgba(0,0,0,0.15)]">
							<h3 className="font-[Sora] text-[#FF7637] font-[500] text-[20px]">Review & Rating</h3>
						</div>
						<div className="flex flex-wrap">
							<div className=" 320:w-full 980:w-fit">
								<div className="p-[10px] 320:mt-[20px] 980:mt-0 320:py-[10px] 980:py-[20px] mx-[20px] border-b-[1px] border-b-solid border-b-[rgba(0,0,0,0.15)]">
									<h3 className=" 320:pb-0  font-[Sora] text-[#FF7637] font-[500] text-[20px]">Rating: </h3>
								</div>
								<div className="feedback-container 320:p-[20px] flex items-center justify-center flex-col 980:w-[400px] 980:h-[200px] 320:w-full 320:h-auto">

									<div className="text-center">
										{
											review?.reviewScore === 1 ? <i className="far fa-angry fa-3x text-red-600"></i> : review?.reviewScore === 2 ? <i className="far fa-frown fa-3x text-amber-500"></i> : review?.reviewScore === 3 ? <i className="far fa-meh fa-3x text-sky-500"></i> : review?.reviewScore === 4 ? <i className="far fa-smile fa-3x text-lime-500"></i> : review?.reviewScore === 5 ? <i className="far fa-laugh fa-3x text-green-500"></i> : <i className="far fa-meh fa-3x text-sky-500"></i>
										}
									</div>
									<div className="text-center mt-[10px]">
										<i onClick={() => { setReview(prev => ({ ...prev, reviewScore: 1 })) }} className='fas fa-star fa-2x' style={{ color: review?.reviewScore >= 1 ? 'gold' : '#959595' }} ></i>
										<i onClick={() => { setReview(prev => ({ ...prev, reviewScore: 2 })) }} className='fas fa-star fa-2x' style={{ color: review?.reviewScore >= 2 ? 'gold' : '#959595' }} ></i>
										<i onClick={() => { setReview(prev => ({ ...prev, reviewScore: 3 })) }} className='fas fa-star fa-2x' style={{ color: review?.reviewScore >= 3 ? 'gold' : '#959595' }} ></i>
										<i onClick={() => { setReview(prev => ({ ...prev, reviewScore: 4 })) }} className='fas fa-star fa-2x' style={{ color: review?.reviewScore >= 4 ? 'gold' : '#959595' }} ></i>
										<i onClick={() => { setReview(prev => ({ ...prev, reviewScore: 5 })) }} className='fas fa-star fa-2x' style={{ color: review?.reviewScore >= 5 ? 'gold' : '#959595' }} ></i>
									</div>
								</div>
							</div>
							<div className="320:px-[20px] 980:mx-[0px] 980:w-[calc(100%-400px)]">
								<div className="p-[10px] 320:py-[10px] 980:py-[20px] border-b-[1px] border-b-solid border-b-[rgba(0,0,0,0.15)]">
									<h3 className="font-[Sora] text-[#FF7637] font-[500] text-[20px]">Review: </h3>
								</div>
								<form onSubmit={handleAddReview}>
									<input type="hidden" value={4} />
									<input type="hidden" value={4} />
									<input
										required
										type="text"
										placeholder="Name"
										value={review?.reviewerName}
										onChange={(e) => setReview(prev => ({ ...prev, reviewerName: e.target.value }))}
										className="w-full text-[16px] w-[90%] p-2 text-xl my-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.15)]"
									/>
									<textarea value={review?.reviewContent} onChange={(e) => setReview(prev => ({ ...prev, reviewContent: e.target.value }))} className=" text-[16px] w-[90%] 320:w-full my-[10px]  p-2 text-xl border-solid border-[1px] border-[rgba(0,0,0,0.15)] resize-none" id="review_textarea" cols="30" rows="2" placeholder="Write a review"></textarea>
									<button type="submit" className="btn-special-spread  py-[10px] px-[30px] mb-[15px]  text-[15px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]">Publish</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>

			<EnquirySection />
			<Footer />

			{/* modals */}
			<Modal footer={false} title={<div>
				<h5 className="modal-title text-[17px]">Let Us Call You Back</h5>
				<span className="modal-title text-[15px] font-[200]">We will give you pure customer delight, Happy to help you.</span>
			</div>} open={showCallbackModal} onCancel={closeReviewModal}>
				<div className="modal-content 320:px-0 px-[15px] py-[20px] 320:pb-0">

					<div className="modal-body">
						<Formik
							initialValues={{ name: '', contactNum: '', city: '', enquiry: '' }}
							validate={(values) => {
								let errors = {};
								if (!values.name) errors.name = "Name is required";
								if (!values.contactNum) errors.contactNum = "Contact is required";
								if (!values.city) errors.city = "City is required";
								return errors;
							}}
							onSubmit={(values, { setSubmitting }) => {
								handleCallbackRequest(values);
								setSubmitting(false);
							}}
						>
							{({ values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit, setFieldValue, dirty, ...prop }) => (
								<form onSubmit={handleSubmit}>

									<div className="pt-[20px] relative w-[82%] mx-auto my-0">
										{touched.name && errors.name && <span className="font-normal text-red-600 text-[13px] absolute left-0 top-[2px]" >{errors.name}</span>}
										<span className="flex items-center justify-center">
											<input type="text"
												name="name"
												value={values.name} onChange={handleChange} onBlur={handleBlur}
												className={`py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] 320:w-[100%] w-[92%] ${errors.name ? 'border-red-600' : 'border-[rgba(0,0,0,0.2)]'}`}
												placeholder="Name" /></span>
									</div>
									<div className="pt-[20px] relative w-[82%] mx-auto my-0">
										{touched.contactNum && errors.contactNum && <span className="font-normal text-red-600 text-[13px] absolute left-0 top-[2px]" >{errors.contactNum}</span>}
										<span className="flex items-center justify-center">
											<input type="text"
												name="contactNum"
												value={values.contactNum} onBlur={handleBlur} onChange={(e) => { let num = e.target.value.replace(/\D/g, '')?.slice(0, 10); setFieldValue("contactNum", num) }}
												className={`py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] 320:w-[100%] w-[92%] ${errors.contactNum? 'border-red-600' : 'border-[rgba(0,0,0,0.2)]'}`}
												placeholder="Mobile Number" /></span>
									</div>
									<div className="pt-[20px] relative w-[82%] mx-auto my-0">
										{touched.city && errors.city && <span className="font-normal text-red-600 text-[13px] absolute left-0 top-[2px]" >{errors.city}</span>}
										<span className="flex items-center justify-center">
											<input type="text"
												name="city"
												value={values.city} onChange={handleChange} onBlur={handleBlur}
												className={`py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] 320:w-[100%] w-[92%] ${errors.city ? 'border-red-600' : 'border-[rgba(0,0,0,0.2)]'}`}
												placeholder="City" /></span>
									</div>
									<div className="pt-[20px] relative w-[82%] mx-auto my-0">
										<span className="flex items-center justify-center">
											<textarea
												name="enquiry"
												onBlur={handleBlur}
												value={values.enquiry} onChange={handleChange}
												type="text" rows="2" className={`py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] 320:w-[100%] w-[92%] ${errors.enquiry ? 'border-red-600' : 'border-[rgba(0,0,0,0.2)]'}`}
												placeholder="Enquiry"></textarea></span>
									</div>
									<div className="text-center">
										<button type="submit" className="btn-special-spread  py-[10px] px-[30px] my-[15px]  text-[15px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]">Send</button>
									</div>
								</form>
							)}
						</Formik>
					</div>
				</div>
			</Modal>

			<Modal footer={false} title={<h5 className="modal-title text-[17px]">Ask for Quotation</h5>} open={showQuotationModal} onCancel={closeQuotationModal}>
				<div className="modal-body">
					<div className="overflow-x-auto">
						<div className="320:block 980:hidden ">
							<div className="flex items-start mt-[8px] gap-[10px] py-[4px] bg-white border-r-[4px] border-r-[#ff7637] shadow-md border-2">
								<figure className="w-[50px]">
									<img src={`https://batterybackend.react.stagingwebsite.co.in/images/${postData?.batteryimages}`} alt="product image" />
								</figure>
								<div className="flex flex-col items-start  w-[calc(100%-50px)]">
									<p className="p-0 m-0 leading-[15px] mt-[2px] 320:text-[13px] font-['Oswald'] uppercase font-bold pr-[30px]  w-full relative">
										<span className="font-['Oswald'] text-[#ff7637]">{postData?.name?.split(" ")[0]}&nbsp;</span>{postData?.name?.split(" ")?.slice(1)?.join(" ")}
										<span className="inline-block absolute right-[10px] font-['Sora'] font-semibold text-[#ff7637] lowercase">x{quantity}</span>
									</p>
									<div className=" leading-[15px] mt-[12px] 320:text-[13px] relative w-full">Price: <i className='bx bx-rupee'></i>{`${postData?.specialprice}`}
									</div>
								</div>
							</div>
						</div>
						<table className="min-w-full bg-white 320:hidden 980:table">
							<thead>
								<tr>
									<th className="320:px-[10px]  border-b-2 border-gray-300 text-center text-xs font-bold uppercase">Image</th>
									<th className="320:px-[10px]  border-b-2 border-gray-300 text-center text-xs font-bold uppercase">Item</th>
									<th className="320:px-[10px]  border-b-2 border-gray-300 text-center text-xs font-bold uppercase">Quantity</th>
									<th className="320:px-[10px]  border-b-2 border-gray-300 text-center text-xs font-bold uppercase">Price</th>
								</tr>
							</thead>
							<tbody className="bg-gray-200">
								<tr>
									<td className=" whitespace-nowrap border-b border-gray-300 text-center">
										<figure className="1368:w-[100px] 980:w-[50px] 980:p-[4px] border-[1px] solid border-[rgba(0,0,0,0.2) p-[10px]">
											<img src={`${backend_url}/images/${postData?.batteryimages}`} alt="battery image" />
										</figure>
									</td>
									<td className=" whitespace-nowrap border-b border-gray-300 text-center">{postData?.name}</td>
									<td className=" whitespace-nowrap border-b border-gray-300 text-center">
										{quantity}</td>
									<td className=" whitespace-nowrap border-b border-gray-300 text-center">₹ {specialPrice}</td>
								</tr>
							</tbody>
						</table>
						<div>

						</div>
					</div>
					<Formik
						initialValues={{ name: '', email: '', mobileNum: '', companyName: '', city: '', query: '' }}
						validate={(values) => {
							let errors = {};
							if (!values.name) errors.name = "Name is required";
							if (!values.mobileNum) errors.mobileNum = "Contact is required";
							if (!values.city) errors.city = "City is required";
							if (!values.query) errors.query = "Message is required";
							if (!values.email) errors.email = "Email is required";
							else if (
								!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
							) {
								errors.email = 'Invalid email address';
							}
							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							handleQuotationRequest(values);
							setSubmitting(false);
						}}
					>
						{({ values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit, setFieldValue, dirty, ...prop }) => (
							<form onSubmit={handleSubmit}>

								<div className="flex flex-wrap justify-center">
									<div className="pt-[20px] w-[50%] 320:w-[82%] relative">
										{touched.name && errors.name && <span className="font-normal text-red-600 text-[13px] absolute left-0 top-[2px]" >{errors.name}</span>}
										<span className="flex items-center justify-center">
											<input type="text"
												name="name"
												value={values.name} onChange={handleChange} onBlur={handleBlur}
												className={`py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] 320:w-[100%] w-[92%] ${errors.name ? 'border-red-600':'border-[rgba(0,0,0,0.2)]'}`}
												placeholder="Name" /></span>
									</div>
									<div className="pt-[20px] w-[50%] 320:w-[82%] relative">
										{touched.mobileNum && errors.mobileNum && <span className="font-normal text-red-600 text-[13px] absolute left-0 top-[2px]" >{errors.mobileNum}</span>}
										<span className="flex items-center justify-center">  
											<input type="text" name="mobileNum"
												value={values.mobileNum} onBlur={handleBlur} onChange={(e) => { let num = e.target.value.replace(/\D/g, '')?.slice(0, 10); setFieldValue("mobileNum",num) }}
												className={`py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] 320:w-[100%] w-[92%] ${errors.mobileNum ? 'border-red-600':'border-[rgba(0,0,0,0.2)]'}`}
												placeholder="Mobile Number" /></span>
									</div>
								</div>
								<div className="flex flex-wrap justify-center">
									<div className="pt-[20px] w-[50%] 320:w-[82%] relative">
										{touched.email && errors.email && <span className="font-normal text-red-600 text-[13px] absolute left-0 top-[2px]" >{errors.email}</span>}
										<span className="flex items-center justify-center">  
											<input type="text" name="email"
												value={values.email} onChange={handleChange} onBlur={handleBlur}
												className={`py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] 320:w-[100%] w-[92%] ${errors.email ? 'border-red-600':'border-[rgba(0,0,0,0.2)]'}`}
												placeholder="Email ID" /></span>
									</div>
									<div className="pt-[20px] w-[50%] 320:w-[82%] relative">
										{touched.companyName && errors.companyName && <span className="font-normal text-red-600 text-[13px] absolute left-0 top-[2px]" >{errors.companyName}</span>}
										<span className="flex items-center justify-center">  
											<input type="text" name="companyName"
												value={values.companyName} onChange={handleChange} onBlur={handleBlur}
												className={`py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] 320:w-[100%] w-[92%] ${errors.companyName ? 'border-red-600':'border-[rgba(0,0,0,0.2)]'}`}
												placeholder="Company Name" /></span>
									</div>
								</div>

								<div className="flex flex-wrap justify-center">
									<div className="pt-[20px] w-[50%] 320:w-[82%] relative">
										{touched.city && errors.city && <span className="font-normal text-red-600 text-[13px] absolute left-0 top-[2px]" >{errors.city}</span>}
										<span className="flex items-center justify-center"> 
											<input type="text" name="city"
												value={values.city} onChange={handleChange} onBlur={handleBlur}
												className={`py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] 320:w-[100%] w-[92%] ${errors.city ? 'border-red-600':'border-[rgba(0,0,0,0.2)]'}`}
												placeholder="City" /></span>
									</div>
									<div className="pt-[20px] w-[50%] 320:w-[82%] relative">
									{touched.query && errors.query && <span className="font-normal text-red-600 text-[13px] absolute left-0 top-[2px]" >{errors.query}</span>}
										<span className="flex items-center justify-center">
											<input type="text" name="query"
												value={values.query} onChange={handleChange} onBlur={handleBlur}
												className={`py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] 320:w-[100%] w-[92%] ${errors.query ? 'border-red-600':'border-[rgba(0,0,0,0.2)]'}`}
												placeholder="Query" /></span>
									</div>
								</div>

								<div className="text-center">
									<button type="submit" className="btn-special-spread  py-[10px] px-[30px] 320:px-[30px] 320:w-fit my-[15px]  text-[15px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]">Send</button>
								</div>
							</form>
						)}
					</Formik>

				</div>

			</Modal>
		</>
	)
}
export default BuyBattery;