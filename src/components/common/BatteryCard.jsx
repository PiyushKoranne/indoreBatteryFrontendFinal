import React from 'react'
import { IoIosAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'

const BatteryCard = ({ item, idx }) => {
	return (
		<div style={{ boxShadow: "1px 1px 3px rgba(0,0,0,.15)" }} key={item?._id} className="border-[1px] border-solid border-[rgba(0,0,0,0.1)] bg-[#fff] m-[10px] battery-card-link h-fit">
			<div className={`battery-swiper-card 320:w-full 1024:w-[560px]  1368:w-[500px] h-fit relative flex flex-col items-center justify-start 320:px-[10px] 320:py-[25px] 375:py-[15px] `}>
			{/* {item?.postData?.isnew === 'true' && <div className='absolute right-0 top-[18px] px-[24px] py-[4px] text-white bg-gradient-to-b from-[#ff7637] to-[#f74525] w-fit text-[12px]'>NEW</div> } */}
				<div className="discount-badge 320:bg-green-700 320:top-[-15px] top-0">{`${Math.round(((parseInt(item?.postData?.mrp) - parseInt(item?.postData?.specialprice)) / parseInt(item?.postData?.mrp)) * 100)}% OFF`}</div>
				<div className='relative w-full product-name-wr 320:h-auto h-[80px] flex items-center overflow-hidden py-[15px] 320:py-0 pl-[50px] pr-[70px] 320:p-0'>
					
					<h4 className='font-[500] tracking-[1px] text-[#ff7637] 320:text-black 320:text-[16px] text-[16px] w-[100%] font-["Oswald"] uppercase'>
						<strong className='font-["Oswald"] text-[#ff7637]'>{item?.postData?.name?.split(" ")[0]}&nbsp;</strong>{item?.postData?.name?.split(" ")?.slice(1)?.join(" ")}
					</h4>
				</div>
				<div className='battery-swiper-card 320:w-full 1368:w-[500px] 320:h-auto h-[200px] flex 320:items-center 480:items-start justify-start relative overflow-hidden '>
					<figure className='375:w-[50%] 320:w-full flex flex-col items-center justify-center 320:h-auto h-[200px]'>
						<img src={`https://batterybackend.react.stagingwebsite.co.in/images/${item?.postData?.batteryimages}`} className='w-[75%] mx-auto my-0' alt="" />
					</figure>
					<div className="375:w-[50%] 320:w-full h-full 480:pt-[15px]">
					
						<p className="w-[100%] text-[#000000] 320:text-[14px] 980:text-[14px] leading-[24px] ">
							<span className="font-medium mr-[5px]">Warranty:</span> {item?.postData?.totalWarranty} Months</p>
						<p className="w-[auto] text-[#000000] 320:text-[14px] 980:text-[14px] leading-[24px] "><span className="font-medium mr-[5px]">Capacity:</span> {item?.postData?.capacity}AH</p>
						<div className=" flex items-center justify-between w-[100%] 320:text-[#000000] text-[#ff7637]">
							<p className='font-semibold font-sans relative 980:text-[14px] w-full leading-[24px]'>
								<span className='font-medium'>Price:</span>
								<span className='line-through font-sans ml-[10px]'> ₹{item?.postData?.mrp}</span>
								<span className="inline-block 320:text-[14px] text-[16px] text-green-700 rounded-[2px] font-semibold ml-[10px] font-sans">{`₹${item?.postData?.specialprice}`}</span>
								{/* <span className="inline-block bg-green-700 text-[11px] text-white px-[10px] rounded-[2px] font-semibold py-[0px] leading-[25px] absolute right-[10px]">{`${Math.round(((parseInt(item?.postData?.mrp) - parseInt(item?.postData?.specialprice)) / parseInt(item?.postData?.mrp)) * 100)}% OFF`}</span> */}
							</p>
						</div>
						{item?.postData?.isnew === 'true' && <figure>
							<img src="/images/new-product.png" width={50} alt="" />
						</figure> }
						<div className='flex items-center 320:hidden 560:flex gap-[20px]  mt-[12px]'>
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