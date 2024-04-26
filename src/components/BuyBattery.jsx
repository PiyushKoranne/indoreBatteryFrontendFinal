import React, { useState, useEffect, useContext } from "react";
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


function BuyBattery() {

	/**
	 * STATES AND VARIABLES
	 */

	const navigate = useNavigate();
	const { loginStatus } = useContext(LoginContext);
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
	const [reviewerName, setReviewerName] = useState("")
	const [reviewContent, setReviewContent] = useState("")
	// for call back request
	const [name, setName] = useState("")
	const [contactNum, setContactNum] = useState("")
	const [enquiry, setEnquiry] = useState("")
	const [city, setCity] = useState("")
	// for quotation request
	const [companyName, setCompanyName] = useState("")
	const [query, setquery] = useState("")
	const [email, setEmail] = useState("")

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
			if (!batteryId) return;
			const response = await batteryIndoreDataService.addToWishlist(batteryId);
			if (response.status === 200) {
				toast.success("Item added to wishlist");
			}
		} catch (error) {
			log(error);
			if(error?.response.status === 400){
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

	async function handleQuotationRequest(e) {
		e.preventDefault();
		const response = await axios.post(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/ask-battery-quotation`, {
			productId: batteryId,
			quantity: quantity,
			name: name,
			mobileNum: contactNum,
			email: email,
			companyName: companyName,
			city: city,
			query: query
		})
		if (response.status === 200) {
			setShowQuotationModal(false)
			swal({
				icon: "success",
				title: "Our team will reach to you as soon as possible",
				showConfirmButton: false,
				timer: 2000
			});
			setName("")
			setContactNum("")
			setCity("")
			setEnquiry("")
		}
	}

	async function handleCallbackRequest(e) {
		e.preventDefault();
		const response = await axios.post(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/request-callback`, {
			name: name,
			contactNum: contactNum,
			city: city,
			enquiry: enquiry
		})
		if (response.status === 200) {
			setShowCallbackModal(false)
			swal({
				icon: "success",
				title: "Our team will reach to you as soon as possible",
				showConfirmButton: false,
				timer: 2000
			});
			setName("")
			setContactNum("")
			setCity("")
			setEnquiry("")
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

	const scrollToRatingSection = () => {
		const ratingSection = document.getElementById('rating-section');
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
			toast.success("Item added to cart!")
		} else {
			toast.error("Oops! Failed to add item!")
		}
	}

	return (
		<>
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

			<section>
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
				<div className="center-wr">
					<div className="mt-[0%]">
						<div className="flex p-[8px] bg-[#ffffff] gap-[7px] 320:mt-[41px] 320:mb-[15px] mb-[30px] 320:text-[14px]">
							<span><Link to="/" className="hover:text-[#ff7637]">Home</Link> &gt; </span> <span className="text-[#ff7637] font-[600] text-ellipsis overflow-ellipsis w-[200px] whitespace-nowrap inline-block overflow-hidden">{postData?.name}</span>
						</div>

						<div className="flex flex-wrap">
							<div className="850:w-[37%] 320:w-full">
								<figure className="w-[100%] border-[1px] solid border-[rgba(0,0,0,0.2) p-[40px] relative">
									{parseInt(postData?.stock) === 0 && (
										<div className="absolute top-[-74px] left-[-9px]">
											<img src="/images/sold-out.png" width={200} alt="" />
										</div>
									)}
									<img src={`${backend_url}/images/${postData?.batteryimages}`} alt="battery image" />
								</figure>
								<div className="320:hidden 850:block">
									<div className="flex flex-wrap gap-[15px] pt-[15px]">
										<div onClick={openReviewModal} className="320:w-full 1200:w-[46.5%] py-[8px] hover:bg-[#ff763720] cursor-pointer transition-all px-[15px] text-center border-[1px] solid border-[rgba(0,0,0,0.2)] flex items-center gap-[10px]">
											<figure className="bg-[#ff7637] 320:w-[25px] 320:h-[25px] w-[35px] h-[35px] flex items-center justify-center rounded-full"><i className="320:text-[16px] text-[18px] text-white bx bxs-phone-call"></i></figure>
											<span className="text-[14px]" >Request Callback</span>
										</div>
										<div onClick={openQuotationModal} className="320:w-full 1200:w-[46.5%] py-[8px] hover:bg-[#ff763720] cursor-pointer transition-all px-[15px] text-center border-[1px] solid border-[rgba(0,0,0,0.2)] flex items-center gap-[10px]">
											<figure className="bg-[#ff7637] 320:w-[25px] 320:h-[25px] w-[35px] h-[35px] flex items-center justify-center rounded-full"><i className="320:text-[16px] text-[18px] text-white bx bxs-receipt"></i></figure>
											<span className="text-[14px]" >Ask For Quotation</span>
										</div>
									</div>
									<div className="flex flex-wrap gap-[15px] pt-[15px]">
										<div onClick={scrollToRatingSection} className="320:w-full 1200:w-[46.5%] py-[8px] hover:bg-[#ff763720] cursor-pointer transition-all px-[15px] text-center border-[1px] solid border-[rgba(0,0,0,0.2)] flex items-center gap-[10px]">
											<figure className="bg-[#ff7637] 320:w-[25px] 320:h-[25px] w-[35px] h-[35px] flex items-center justify-center rounded-full"><i className="320:text-[16px] text-[18px] text-white bx bxs-star"></i></figure>
											<span className="text-[14px]" >Write a Review</span>
										</div>
										<div onClick={handleAddToWishlist} className="320:w-full 1200:w-[46.5%] py-[8px] hover:bg-[#ff763720] cursor-pointer transition-all px-[15px] text-center border-[1px] solid border-[rgba(0,0,0,0.2)] flex items-center gap-[10px]">
											<figure className="bg-[#ff7637] 320:w-[25px] 320:h-[25px] w-[35px] h-[35px] flex items-center justify-center rounded-full"><i className="320:text-[16px] text-[18px] text-white bx bxs-heart"></i></figure>
											<span className="text-[14px]" >Add to Wishlist</span>
										</div>
									</div>
								</div>
							</div>

							<div className="850:w-[50%] 320:w-full mx-[2%]">
								<div>
									<h3 className="text-[28px] font-[600] py-[15px] font-['Oswald'] uppercase"><span>{postData?.name?.split(" ")[0]}</span> {postData?.name?.split(" ")?.slice(1)?.join(" ")}</h3>
									<div className="font-[600] 320:text-[14px]"><span> Warranty:</span> <span>&nbsp; {postData?.warranty}</span></div>
									<div className="font-[600] my-[10px] 320:text-[14px]"><span> Capacity:&nbsp; <span>{postData?.capacity} AH </span></span></div>
									<div className="my-[10px]"><span className="font-[600] 320:text-[14px]">MRP:</span><span className="font-[600] line-through ml-[10px] font-sans"> ₹{postData?.mrp}</span><span className="inline-block bg-green-700 text-[13px] text-white px-[10px] rounded-[2px] font-semibold py-[3px] ml-[20px]">{`${Math.round(((parseInt(postData?.mrp) - parseInt(postData?.specialprice)) / parseInt(postData?.mrp)) * 100)}% OFF`}</span></div>
									<div className="my-[10px]"><span className="font-[600] 320:text-[14px]">Special Price:</span>&nbsp;<span className="font-[600] font-sans"> ₹{postData?.specialprice}</span></div>
									<div className="mt-[20px]">
										<button className="bg-[#ff7637] px-[10px] py-[6px] text-[#fff]" onClick={handleDecrement}>-</button>
										<input className="w-[50px] py-[5px] text-center border-[1px] border-solid border-[#0000004d]" min={1} max={10} type="number" onChange={(e) => setQuantity(e.target.value)} value={quantity} />
										<button className="bg-[#ff7637] px-[10px] py-[6px] text-[#fff]" onClick={handleIncrement}>+</button>
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

										{parseInt('10') > 0 && (
											<div className="flex items-center  relative">
												<button onClick={handleBuyNow} className=" mx-[15px] p-[10px] 320:w-fit 320:mx-0 w-[30%] pl-[20px] pr-[20px] mt-[30px] 320:text-[14px]  text-[18px] font-[600] focus:outline-none bg-[#236DDC] text-white">Buy Now</button>
												<button onClick={handleAddToCart} className=" mx-[15px] p-[10px] 320:w-fit 320:mx-0 320:ml-[10px] w-[30%] pl-[20px] pr-[20px] mt-[30px] 320:text-[14px]  text-[18px] font-[600] focus:outline-none bg-[#000] text-white">Add to Cart</button>
												<button onClick={handleAddToWishlist} className="absolute right-0 w-[40px] h-[40px] flex items-center justify-center rounded-full border-2 border-gray-700 mx-[15px] 320:mx-0 320:ml-[10px] mt-[30px]"><i className="text-[20px] fa-regular fa-heart"></i></button>
											</div>)}

									</div>
									<div className="mt-[20px]">
										<h3 className=" w-[20%] 320:w-full  uppercase py-[8px] border-t-[1px] border-b-[1px] border-dashed whitespace-nowrap text-[20px] font-[400] border-[#3BBA11] text-[#3BBA11]">View All Offers</h3>
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
					<div className="buy-battery-features-li py-[15px] 320:text-[15px]" dangerouslySetInnerHTML={{ __html: postData?.features }}></div>

				</div>
			</section>

			{/* recommended for */}
			<section className="my-[50px]">
				<div className="center-wr">
					<div><h3 className="font-[600] text-[22px] uppercase">RECOMMENDED FOR:</h3></div>
					<div className="buy-battery-recommend-for py-[15px] 320:text-[15px]" dangerouslySetInnerHTML={{ __html: postData?.recommendedfor }}></div>
				</div>
			</section>

			<section id="rating-section">
				<div className="center-wr">
					<div className=" border-solid border-[1px] border-[rgba(0,0,0,0.15)] bg-[#f7f7f7] ">
						<div className="mx-[20px] p-[10px] py-[20px] border-b-[1px] border-b-solid border-b-[rgba(0,0,0,0.15)]">
							<h3 className="font-[Sora] text-[#FF7637] font-[500] text-[20px]">Review & Rating</h3>
						</div>
						<div className="flex flex-wrap">
							<div className=" 320:w-full 980:w-fit">
								<div className="p-[10px] py-[20px] mx-[20px]">
									<h3 className="border-b-[1px] pb-[20px] border-b-solid border-b-[rgba(0,0,0,0.15)] font-[Sora] text-[#FF7637] font-[500] text-[20px]">Rating: </h3>
								</div>
								<div className="feedback-container 980:w-[400px] 980:h-[200px] 320:w-full 320:h-auto">

									<div className="text-center">
										{
											review?.reviewScore === 1 ? <i className="far fa-angry fa-3x text-red-500"></i> : review?.reviewScore === 2 ? <i className="far fa-frown fa-3x text-amber-500"></i> : review?.reviewScore === 3 ? <i className="far fa-meh fa-3x text-sky-500"></i> : review?.reviewScore === 4 ? <i className="far fa-smile fa-3x text-lime-500"></i> : review?.reviewScore === 5 ? <i className="far fa-laugh fa-3x text-emerald-500"></i> : <i className="far fa-meh fa-3x text-sky-500"></i>
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
							<div className="mx-[20px] 980:mx-[0px] 980:w-[calc(100%-400px)]">
								<div className="p-[10px] py-[20px] border-b-[1px] border-b-solid border-b-[rgba(0,0,0,0.15)]">
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
									<button type="submit" className="btn-special-spread  py-[10px] px-[30px] my-[15px]  text-[15px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]">Publish</button>
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
						<form onSubmit={handleCallbackRequest}>

							<div className="py-[10px]">
								<span>  <i className='bg-[#ff7637] bx bxs-user text-[#fff] p-[10px] align-middle py-[10.9px]' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} ></i>
									<input type="text"
										value={name} onChange={(e) => setName(e.target.value)}
										className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] 320:w-[82%]  320:w-[82%] w-[92%]"
										placeholder="Name" /></span>
							</div>
							<div className="py-[10px]">
								<span>  <i className='bg-[#ff7637] bx bx-mobile text-[#fff] p-[10px] align-middle py-[10.9px]' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} ></i>
									<input type="text"
										value={contactNum} onChange={(e) => setContactNum(e.target.value)}
										className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] 320:w-[82%] w-[92%]"
										placeholder="Mobile Number" /></span>
							</div>
							<div className="py-[10px]">
								<span>  <i className='bg-[#ff7637] bx bxs-map-pin text-[#fff] p-[10px] align-middle py-[10.9px]' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} ></i>
									<input type="text"
										value={city} onChange={(e) => setCity(e.target.value)}
										className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] 320:w-[82%] w-[92%]"
										placeholder="City" /></span>
							</div>
							<div className="py-[10px]">
								<span>  <i className='bg-[#ff7637] 320:hidden bx bxs-envelope text-[#fff] p-[10px] align-middle resize-none py-[20px]' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} ></i>
									<textarea
										value={enquiry} onChange={(e) => setEnquiry(e.target.value)}
										type="text" rows="2" className="align-middle py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] 320:w-[100%] w-[92%]"
										placeholder="Enquiry"></textarea></span>
							</div>
							<button type="submit" className="btn-special-spread  py-[10px] px-[30px] my-[15px]  text-[15px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]">Send</button>
						</form>

					</div>
				</div>
			</Modal>

			<Modal footer={false} title={<h5 className="modal-title text-[17px]">Ask for Quotation</h5>} open={showQuotationModal} onCancel={closeQuotationModal}>
				<div className="modal-body">
					<div className="overflow-x-auto">
						<table className="min-w-full bg-white 320:hidden">
							<thead>
								<tr>
									<th className="320:px-[10px] px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold uppercase tracking-wider">Image</th>
									<th className="320:px-[10px] px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold uppercase tracking-wider">Item</th>
									<th className="320:px-[10px] px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold uppercase tracking-wider">Quantity</th>
									<th className="320:px-[10px] px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold uppercase tracking-wider">Price Per Qty</th>
								</tr>
							</thead>
							<tbody className="bg-gray-200">
								<tr>
									<td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
										<figure className="w-[100px] border-[1px] solid border-[rgba(0,0,0,0.2) p-[10px]">
											<img src={`${backend_url}/images/${postData?.batteryimages}`} alt="battery image" />
										</figure>
									</td>
									<td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{postData?.name}</td>
									<td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
										<input type="text"
											value={quantity} onChange={(e) => setQuantity(e.target.value)}
											className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[100px]"
											placeholder="Quantity" /></td>
									<td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">₹ {specialPrice}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<form onSubmit={handleQuotationRequest}>

						<div className="flex flex-wrap">
							<div className="py-[10px] w-[50%] 320:w-full">
								<span>  <i className='bg-[#ff7637] bx bxs-user text-[#fff] p-[10px] align-middle py-[10.9px]' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} ></i>
									<input type="text"
										value={name} onChange={(e) => setName(e.target.value)}
										className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] 320:w-[82%] w-[92%]"
										placeholder="Name" /></span>
							</div>
							<div className="py-[10px] w-[50%] 320:w-full">
								<span>  <i className='bg-[#ff7637] bx bx-mobile text-[#fff] p-[10px] align-middle py-[10.9px]' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} ></i>
									<input type="text"
										value={contactNum} onChange={(e) => setContactNum(e.target.value)}
										className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] 320:w-[82%] w-[92%]"
										placeholder="Mobile Number" /></span>
							</div>
						</div>
						<div className="flex flex-wrap">
							<div className="py-[10px] w-[50%] 320:w-full">
								<span>  <i className='bg-[#ff7637] bx bxs-envelope text-[#fff] p-[10px] align-middle py-[10.9px]' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} ></i>
									<input type="text"
										value={email} onChange={(e) => setEmail(e.target.value)}
										className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] 320:w-[82%] w-[92%]"
										placeholder="Email ID" /></span>
							</div>
							<div className="py-[10px] w-[50%] 320:w-full">
								<span>  <i className='bg-[#ff7637] bx bxs-business text-[#fff] p-[10px] align-middle py-[10.9px]' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} ></i>
									<input type="text"
										value={companyName} onChange={(e) => setCompanyName(e.target.value)}
										className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] 320:w-[82%] w-[92%]"
										placeholder="Company Name" /></span>
							</div>
						</div>

						<div className="flex flex-wrap">
							<div className="py-[10px] w-[50%] 320:w-full">
								<span>  <i className='bg-[#ff7637] bx bxs-map-pin text-[#fff] p-[10px] align-middle py-[10.9px]' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} ></i>
									<input type="text"
										value={city} onChange={(e) => setCity(e.target.value)}
										className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] 320:w-[82%] w-[92%]"
										placeholder="City" /></span>
							</div>
							<div className="py-[10px] w-[50%] 320:w-full">
								<span>  <i className='bg-[#ff7637] bx bxs-envelope text-[#fff] p-[10px] align-middle py-[10.9px]' style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }} ></i>
									<input type="text"
										value={query} onChange={(e) => setquery(e.target.value)}
										className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] 320:w-[82%] w-[92%]"
										placeholder="Query" /></span>
							</div>
						</div>

						<button type="submit" className="btn-special-spread  py-[10px] px-[30px] 320:px-[10px] 320:w-full my-[15px]  text-[15px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]">Send</button>
					</form>
				</div>

			</Modal>
		</>
	)
}
export default BuyBattery;