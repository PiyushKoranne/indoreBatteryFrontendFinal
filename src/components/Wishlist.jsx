import React, { useEffect, useState } from 'react'
import Header from './common/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { batteryIndoreDataService } from '../services/dataService';
import { Empty } from 'antd';
import { ColorRing } from 'react-loader-spinner';
import HeaderNew from './common/HeaderNew';
import EnquirySection from './common/EnquirySection';
import Footer from './common/Footer';
import Meta from './common/Meta';
import log from '../utils/utilityFunctions';

const Wishlist = () => {

	const navigate = useNavigate();
	const [wishlist, setwishlist] = useState(null);

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
	async function handleAddToCart(battery) {
		await batteryIndoreDataService.addToCart(battery?.productId, battery?.productQuantity, battery?.productPrice)
		await axios.post("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/remove-from-wishlist", {
			batteryId: battery?.productId
		}, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
			}
		})
		navigate("/cart")
	}

	async function removeBatteryFromWishlist(productId) {
		const response = await axios.post("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/remove-from-wishlist", {
			batteryId: productId
		}, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
			}
		})
		if (response.status === 200) {
			swal({
				icon: "success",
				title: "item removed successfully",
				timer: 2000
			});
		}
		getWishlistItems();

	} async function removeAllBatteryFromWishlist() {
		const response = await axios.get("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/remove-all-from-wishlist", {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
			}
		})
		if (response.status === 200) {
			swal({
				icon: "success",
				title: "items removed successfully",
				timer: 20000000
			});
		}
		getWishlistItems();
	}

	useEffect(() => {
		getWishlistItems();
	}, [])

	return (
		<>
			<Meta title="Wishlist | Indore Battery" />
			<HeaderNew />
			<section className='wishlist-pg-wr pt-[100px] 1200:pb-[200px]'>
				<div className='max-w-[80%] mx-[auto] mb-[30px]'>
					<h4 className='font-[Sora] font-[600] text-[#202020]'>My Wishlist <span className='text-[rgba(0,0,0,0.5)]'> ({wishlist?.length} items)</span></h4>
					<button onClick={removeAllBatteryFromWishlist} className=' border-none outline-none bg-[#0766AD] wishlist-btn text-white rounded-[8px] font-bold text-[12px] py-[8px] px-[30px] my-[10px]'>Remove All</button>
					<button onClick={() => { navigate(`/categories/show-batteries/Amaron`) }} className='mx-[10px] border-none wishlist-btn outline-none bg-[#40A2E3]   rounded-[8px] text-white font-bold text-[12px] py-[8px] px-[30px] my-[10px]'>Explore More</button>
				</div>
				<div className='flex flex-col items-center justify-start'>
					<div className='w-[80%] mt-[25px]'>


						{wishlist === null ? (
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
							wishlist?.length > 0 ? (
								wishlist && wishlist?.map(item => (
									<div key={item?.productId} className='wishlist-td-wr py-[20px] items-start flex border-y-[1px] border-[rgba(0,0,0,0.25)] relative gap-[25px]'>

										<div onClick={() => removeBatteryFromWishlist(`${item?.productId}`)} className='border-[1px] border-[rgba(0,0,0,0.25)] absolute text-[rgba(0,0,0,0.5)] hover:text-[#D04848] hover:border-[#D04848] transition cursor-pointer h-[30px] w-[30px] flex items-center justify-center rounded-[50%] top-[9%] right-[2%]'><i className="fa-solid fa-trash"></i></div>

										<figure className='w-[86px] h-[50px]   '>
											<img src={`https://batterybackend.react.stagingwebsite.co.in/images/${item?.productImage}`} alt="Product image" />
										</figure>
										<div className='w-[100%]'>
											<div className='flex flex-col'>
												<span className='font-[600] text-[14px] text-[#65B741]'>In Stock</span>
												<span>{item?.productName}</span>
												<div className='flex gap-[10px] items-center'>
													<span className='font-[600] text-[14px] text-[rgba(0,0,0,0.5)]'>net Qty. {item?.productQuantity}</span>
													<figure className='assured-logo w-[10%] bg-[#fff] flex items-center rounded-[15px] p-[10px]'>
														<img className='w-[25px] p-[5px] rounded-full border-[2px] bg-[#fff] border-[#ff7637] mr-[-4px]' src="/logo.svg" alt="Indore Battery Logo" />
														<figcaption style={{ borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }} className='text-[12px] bg-[#ff7637] px-[10px] text-[#fff] font-[600]'>Assured</figcaption>
													</figure>

												</div>
											</div>
											<div className='flex justify-between wishlist-btn-mrp-wr'>
												<div className='text-[20px] font-[600]'>
													<span> ₹ {item?.productPrice}</span>
													<span style={{ textDecoration: "line-through" }} className='font-[600] text-[15px] text-[rgba(0,0,0,0.4)] pl-[10px]'>₹ 35,000 </span>
													<span className='font-[600] text-[15px] text-[#65B741] pl-[10px]'>40% Off </span>

												</div>
												<button onClick={() => handleAddToCart(item)} className='border-none outline-none bg-[#ff7637] text-white font-bold text-[16px] py-[10px] px-[30px]'>Add To Cart</button>

											</div>
										</div>
									</div>
								))


							) : (
								<div className="flex flex-col items-center justify-center w-[100%]">
									<img src="/images/no-data.svg" className=" w-[40%]" alt="no data" />
									<p>No items are in you wishlist yet. Start adding <i className='fa-solid fa-heart text-red-600'></i></p>
								</div>
							)
						)}

					</div>
				</div>

			</section>
			<EnquirySection />
			<Footer />
		</>
	)
}

export default Wishlist;