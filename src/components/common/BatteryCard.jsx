import React from 'react'
import { Link } from 'react-router-dom'

const BatteryCard = ({ item, idx }) => {
	return (
		<div style={{ boxShadow: "1px 1px 3px rgba(0,0,0,.15)" }} key={item?._id} className="border-[1px] border-solid border-[rgba(0,0,0,0.1)] bg-[#fff] m-[10px] battery-card-link h-fit">
			<div className={`battery-swiper-card w-[500px] h-fit relative flex flex-col items-center justify-start`}>

				<div className="discount-badge">{item?.postData?.discount === "" ? "25" : item?.postData?.discount}% OFF</div>
				<div className='relative w-full product-name-wr h-[80px] flex items-center overflow-hidden py-[15px] pl-[50px] pr-[70px]'>
					{item?.postData?.isnew === 'true' && <div className="offers-and-discount-badge" ><p>NEW</p></div>}
					<h3 className='font-[500] tracking-[1px] text-[#ff7637] text-[16px] w-[100%] font-["Oswald"] uppercase'>
						{item?.postData?.name}
					</h3>
				</div>
				<div className='battery-swiper-card w-[500px] h-[200px] flex items-start justify-start relative overflow-hidden '>
					<figure className='w-[50%] flex flex-col items-center justify-center h-[200px]'>
						<img src={`https://batterybackend.react.stagingwebsite.co.in/images/${item?.postData?.batteryimages}`} className='w-[75%] mx-auto my-0' alt="" />
					</figure>
					<div className="w-[50%] h-full">
						<p className="w-[100%] text-[#000000] text-[14px] leading-[24px]">
							<span className="font-medium mr-[5px]">Warranty:</span> {item?.postData?.totalWarranty} Months</p>
						<p className="w-[auto] text-[#000000] text-[14px] leading-[24px]"><span className="font-medium mr-[5px]">Capacity:</span> {item?.postData?.capacity}AH</p>
						<div className=" flex items-center justify-between w-[100%] text-[#FF7637]">
							<p className='font-semibold font-sans'><span className='font-medium'>Price:</span><span className='line-through font-sans ml-[10px]'> ₹{item?.postData?.mrp}</span><span className="inline-block text-[16px] text-green-700 rounded-[2px] font-semibold ml-[10px] font-sans">{`₹${item?.postData?.specialprice}`}</span></p>
						</div>
						<div>
							<Link className="text-[#fff] px-[30px] py-[10px] mt-[12px] w-[fit-content] view-details-btn block" to={`/buy-battery/${item?.postData?.batterySlug}`} >View Details</Link>
						</div>
						<div className='w-full'>

						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BatteryCard