import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";
import { batteryIndoreDataService } from "../../services/dataService";
import { LoginContext } from "../../App";
import toast, { Toaster } from "react-hot-toast";
import { Modal } from "antd";

function TopMoneySavers({ pageData }) {
	const { loginStatus, setShowCartBadge } = useContext(LoginContext);
	const swiperRef = useRef(null);
	const [allBatteries, setAllBatteries] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [cartBattery, setCartBattery] = useState({ batteryData: {}, quantity: 1, exchange: true });

	const showModal = () => {
		setIsModalOpen(true);
	};
	
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const fetchAllBatteries = async () => {
		const response = await batteryIndoreDataService.getAllBatteries();
		setAllBatteries(response?.data?.data);
	}

	function handleAddToCart(item) {
		setCartBattery(prev => ({ ...prev, batteryData: item }));
		showModal();
	}

	async function addItemsToCart() {
		handleCancel();
		if (!loginStatus || !loginStatus?.isLoggedIn) {
			localStorage.setItem('cart', JSON.stringify({ batteryId: cartBattery?.batteryData?._id, quantity: cartBattery?.quantity, exchangeBattery: cartBattery.exchange }));
			navigate("/login");
			return;
		}
		const response = await batteryIndoreDataService.addToCart(cartBattery?.batteryData?._id, cartBattery?.quantity, cartBattery.exchange)
		if (response.status === 200) {
			toast.success("Item added to cart!");
			setShowCartBadge(prev => !prev);
		} else {
			toast.error("Oops! Failed to add item!")
		}
	}

	useEffect(() => {
		fetchAllBatteries()
		return () => {
		}
	}, [])

	return (
		<section className="shop-by-manufactures  320:mt-[35px] 560:mt-[60px] 1024:mt-[75px] 1200:mt-[100px]">
			<Toaster />
			<Modal footer={false} title={(<p className="font-['Oswald'] font-bold text-[18px] uppercase"><span className="text-[#ff7637] font-['Oswald']">{cartBattery?.batteryData?.batteryName ? cartBattery?.batteryData?.batteryName?.split(" ")[0] : ''}</span>&nbsp;{cartBattery?.batteryData?.batteryName ? cartBattery?.batteryData?.batteryName?.split(" ")?.slice(1)?.join(" ") : ''}</p>)} open={isModalOpen} onCancel={handleCancel}>
			<h5 className="font-['Oswald'] font-bold uppercase mb-[15px] text-[16px] mt-[15px]">Quantity</h5>
				<label htmlFor="inverterBattery" className="battery-price-picker flex justify-between px-[15px] 320:px-0 320:w-full 1368:w-fit 1368:px-[15px] ">
					<div className="flex items-center gap-[10px]">
						<input
							checked={cartBattery?.exchange} type="radio" id="inverterBattery" onChange={()=>{setCartBattery(prev=>({...prev, exchange:true}))}} name="category"
						/>
						<span className="text-[14px] inline-block">Exchange Old Battery - <span className="font-semibold text-orange-600"><i className="fa-solid fa-indian-rupee-sign mr-[5px]"></i>{cartBattery?.batteryData?.specialprice}</span></span>
					</div>
				</label>

				<label htmlFor="inverterCombo" className="battery-price-picker flex justify-between px-[15px] 320:px-0 320:w-full 1368:w-fit 1368:px-[15px]">
					<div className="flex items-center gap-[10px] mt-[10px]">
						<input
							checked={!cartBattery?.exchange} type="radio" id="inverterCombo" onChange={()=>{setCartBattery(prev=>({...prev, exchange:false}))}}  name="category"
						/>
						<span className="text-[14px] inline-block">Without Old Battery - <span className="font-semibold"><i className="fa-solid fa-indian-rupee-sign mr-[5px]"></i>{cartBattery?.batteryData?.pricewithoutoldbattery}</span> </span>
					</div>
				</label>

				<h5 className="font-['Oswald'] font-bold uppercase mb-[15px] text-[16px] mt-[15px]">Quantity</h5>
				<div className="flex items-stretch w-fit px-[0px]">
					<button className="text-white px-[14px] py-[6px] bg-[#202020]" onClick={()=>{setCartBattery(prev => ({...prev, quantity: prev.quantity > 0 ? prev.quantity - 1 : 0}))}}><i class="fa-solid fa-minus"></i></button>
					<input className="w-[50px] px-[10px] border-t-[1px] border-b-[1px] border-[rgba(0,0,0,0.4)]" type="text" value={cartBattery?.quantity} />
					<button className="text-white px-[14px] py-[6px] bg-[#ff7637]" onClick={()=>{setCartBattery(prev => ({...prev, quantity: parseInt(prev.batteryData.stock) > prev.quantity ? prev.quantity + 1 : 0}))}}><i class="fa-solid fa-plus"></i></button>
				</div>
				<div className="text-right">
				<button onClick={addItemsToCart} className=" py-[10px] px-[30px] 320:px-[30px] mt-[15px] text-[16px] font-[600] focus:outline-none bg-[#1B283A] text-white border-l-[8px] solid border-l-[#ff7637]">Add to Cart</button>
				</div>
			</Modal>
			<div className="center-wr">
				<h3 className="w-[100%] text-center text-[34px] text-[#202020] font-[800] mb-[40px]" dangerouslySetInnerHTML={{ __html: pageData?.sectionContent[0]?.elementValue }}></h3>
				<Swiper
					key={'money-saver-deals-swiper'}
					modules={[Navigation, Pagination, Scrollbar, A11y]}
					spaceBetween={20}
					slidesPerView={window.innerWidth > 1368 ? 4 : window.innerWidth > 1200 || window.innerWidth >= 980 ? 3 : window.innerWidth >= 650 ? 2 : 1}
					loop={true}
					centeredSlidesBounds={true}
					onSlideChange={() => { }}
					onSwiper={(swiper) => { swiperRef.current = swiper; }}
					style={{ position: "relative" }}
					autoplay={{
						delay: 2000,
						disableOnInteraction: false
					}}
				>
					{
						allBatteries?.map((item, idx) => (
							<SwiperSlide key={idx} className="mx-auto">
								<div className='battery-swiper-card 320:w-[275px] 420:w-[325px] 560:w-[420px] 320:mx-auto 650:w-full 1200:w-[310px] flex flex-col items-center justify-start p-[10px] pt-[25px] cursor-pointer relative'>
									<div className="discount-badge z-[1] top-[10px]" style={{ right: "0px", background: 'linear-gradient(to bottom left, #15803d,#047857, #166534)' }} >{`${Math.round(((parseInt(item?.mrp) - parseInt(item?.specialprice)) / parseInt(item?.mrp)) * 100)}% OFF`}</div>
									<figure className='transition-all w-[100%] 320:h-[220px] 1200:h-[270px] relative overflow-hidden border-2 border-b-0 1200:border-[rgba(0,0,0,0.1)] 320:border-[#ff7637] flex items-center justify-center'>
										{item?.isnew === 'true' && <div className="offers-and-discount-badge" ><p>NEW</p></div>}
										<img src={`https://batterybackend.react.stagingwebsite.co.in/images/${item.batteryImages}`} className='w-[75%] h-auto mx-auto my-0' alt="" />
									</figure>
									<figcaption className="transition-all uppercase bg-[#e5e5e5] 320:bg-[#ff7637] 1200:bg-[#e5e5e5] 320:text-white 1200:text-[#202020] p-[5px] text-center font-[300] w-[100%]">Car Battery</figcaption>
									<h3 className='mt-[15px] font-semibold text-[18px] w-[100%] mb-[3px] whitespace-nowrap text-ellipsis overflow-hidden uppercase'>
										<span>{item?.batteryName?.split(" ")[0]}</span>&nbsp;
										{item?.batteryName?.split(" ")?.slice(1)?.join(" ")}
									</h3>
									<p className="w-[100%] text-[#787878]">Warranty: 50 Months</p>
									<div className="py-[10px] border-t-2 border-[rgba(0,0,0,0.1)] mt-[10px] flex items-center justify-between w-[100%]">
										<p>Price</p>
										<p className="font-['Oswald'] font-[600]">₹ {item?.specialprice}</p>
									</div>
									<div className="swiper-card-buy-now 320:opacity-100 1200:opacity-0 320:transition-all 320:duration-300 w-[100%] flex items-center gap-[25px]">
										<div onClick={() => { handleAddToCart(item) }} className="w-[54px] h-[54px] rounded-full border-2 border-[rgba(0,0,0,0.1)] flex items-center justify-center">
											<img src="/images/shoppingcart.svg" width="24" height="24" alt="Shopping cart" />
										</div>
										<Link to={`/buy-battery/${item?.batterySlug}`} key={idx} className="battery-card-link w-[72%]">
											<button className="py-[10px] w-[100%]  pl-[20px] pr-[20px] text-[18px] font-[600] focus:outline-none bg-[#1B283A] text-white border-l-[8px] solid border-l-[#FF7637]">
												Buy Now
											</button>
										</Link>
									</div>
								</div>
							</SwiperSlide>
						))
					}
				</Swiper>
			</div>
		</section>
	)
}

export default TopMoneySavers;