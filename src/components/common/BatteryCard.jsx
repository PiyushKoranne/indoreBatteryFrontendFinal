import React from 'react'
import { IoIosAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'

const BatteryCard = ({ item, idx }) => {
	return (
		<div style={{ boxShadow: "1px 1px 3px rgba(0,0,0,.15)" }} key={item?._id} className="border-[1px] border-solid border-[rgba(0,0,0,0.1)] bg-[#fff] m-[10px] battery-card-link h-fit">
			<div className={`battery-swiper-card 320:w-full 768:w-[560px]  1368:w-[500px] h-fit relative flex flex-col items-center justify-start 320:px-[10px] 320:py-[25px] 375:py-[15px] `}>
			
				<div style={{background : item?.postData?.isnew === 'true' ?  'linear-gradient(to bottom left, #38bdf8, #0ea5e9, #0284c7, #0369a1)' : 'linear-gradient(to bottom left, #15803d,#047857, #166534)'}} className={`${ item?.postData?.isnew === 'true' ? 'new-badge' : 'discount-badge'} 320:top-[-15px] top-0`}>{ item?.postData?.isnew === 'true' ? 'NEW' :`${Math.round(((parseInt(item?.postData?.mrp) - parseInt(item?.postData?.specialprice)) / parseInt(item?.postData?.mrp)) * 100)}% OFF`}</div>
				<div className='relative w-full product-name-wr 320:h-auto h-[80px] flex items-center overflow-hidden py-[15px] 320:py-0 pl-[50px] pr-[70px] 320:p-0'>
					
					<h4 className='font-[500] tracking-[1px] text-[#ff7637] 320:text-[#202020] 320:text-[16px] text-[16px] w-[100%] font-["Oswald"] uppercase'>
						<strong className='font-["Oswald"] text-[#ff7637]'>{item?.postData?.name?.split(" ")[0]}&nbsp;</strong>{item?.postData?.name?.split(" ")?.slice(1)?.join(" ")}
					</h4>
				</div>
				<div className='battery-swiper-card 320:w-full 1368:w-[500px] 320:h-auto h-[200px] flex 320:items-center 480:items-start justify-start relative overflow-hidden '>
					<figure className='375:w-[45%] 320:w-full flex flex-col items-center justify-center 320:h-auto h-[200px]'>
						<img src={`https://batterybackend.react.stagingwebsite.co.in/images/${item?.postData?.batteryimages}`} className='w-[70%] mx-auto my-0' alt="" />
					</figure>
					<div className="375:w-[55%] 320:w-full h-full 480:pt-[15px]">
					
						<p className="w-[100%] text-[#202020] 320:text-[14px] 980:text-[14px] leading-[24px] ">
							<span className="font-medium mr-[5px]">Warranty:</span> {item?.postData?.totalWarranty} Months</p>
						<p className="w-[auto] text-[#202020] 320:text-[14px] 980:text-[14px] leading-[24px] "><span className="font-medium mr-[5px]">Capacity:</span> {item?.postData?.capacity}AH</p>
						<div className=" flex items-center justify-between w-[100%] 320:text-[#202020] text-[#ff7637]">
							<p className='font-semibold font-sans relative 980:text-[14px] w-full leading-[24px]'>
								<span className='font-medium'>Price:</span>
								<span className='line-through font-sans ml-[10px]'> ₹{item?.postData?.mrp}</span>
								<span className="inline-block 320:text-[14px] text-[16px] text-green-700 rounded-[2px] font-semibold ml-[10px] font-sans">{`₹${item?.postData?.specialprice}`}</span>
							</p>
						</div>
						<div className='flex items-center 320:hidden 560:flex gap-[10px]  mt-[12px]'>
							<Link className="text-[#fff] 560:px-[25px] px-[30px] py-[10px] w-[fit-content] view-details-btn 320:text-[13px] block" to={`/buy-battery/${item?.postData?.batterySlug}`} >View Details</Link>
							<Link to={`/buy-battery/${item?.postData?.batterySlug}`}><button className="text-[#fff] block bg-[#1b283c] px-[30px] py-[10px] w-[fit-content] 320:text-[13px] ">Cart</button></Link>
						</div>
					</div>
				</div>
				<div className='320:flex 560:hidden items-center gap-[20px]  mt-[12px]'>
							<Link className="text-[#fff] px-[30px] py-[10px] w-[fit-content] view-details-btn 320:text-[13px] block" to={`/buy-battery/${item?.postData?.batterySlug}`} >View Details</Link>
							<Link to={`/buy-battery/${item?.postData?.batterySlug}`}><button className="text-[#fff] block bg-[#1b283c] px-[30px] py-[10px] w-[fit-content] 320:text-[13px] ">Cart</button></Link>
						</div>
			</div>
		</div>
	)
}

export default BatteryCard