import { Empty } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const NotYetShipped = () => {
	const [ordersHistory,setOrdersHistory] = useState([])

	async function GetOrderHistory(){
		const response = await axios.get("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-orders-history")
		console.log(response?.data)
		setOrdersHistory(response?.data)
	}
	const months = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	
	useEffect(()=>{
		GetOrderHistory()
	},[])

	return (

	<div className='border-[1px] border-[rgba(0,0,0,0.1)] rounded-[8px] flex flex-col'>

		{ordersHistory.length  > 0 ? (
			
			ordersHistory.slice()
			.reverse()
			.filter((batch) => batch.deliveryStatus !== "Delivered")
			.map((batch) => (
				<div key={batch?.orderId} className='p-[25px] pt-[10px] flex flex-col border-b-[1px] border-[rgba(0,0,0,0.1)]'>
					<div className='flex items-start mt-[10px] h-[190px]'>
						<figure className='border-2 border-[rgba(0,0,0,0.1)] w-[15%] p-[15px] flex items-center justify-center bg-[#ff763733] h-[100%]'>
							<img src="https://indorebattery.react.stagingwebsite.co.in/logo.svg" alt="product" />
						</figure>
						<div className='w-[85%] pl-[20px] flex flex-col items-start justify-between'>
							<div>
								<h4 className='text-slate-600 font-["Poppins"] text-[18px] leading-[44px]'>Order Placed on: {`${months[new Date(batch?.createdAt).getMonth()]} ${new Date(batch?.createdAt).getDate()}, ${new Date(batch?.createdAt).getFullYear()}`}</h4>
								<p className='font-medium text-[13px] font-sans text-[#999999] mb-[10px] leading-[10px]'>Ordered Items: {batch?.orderItems.length} </p>
								<p className='font-medium text-[13px] font-sans text-[#999999] mb-[10px] leading-[10px]'>Shipping Address: {batch?.shippingAddress?.addressLineOne}, {batch?.shippingAddress?.addressLineTwo}, {batch?.shippingAddress?.city},{batch?.shippingAddress?.state} ({batch?.shippingAddress?.pinCode})</p>
								<p className='font-medium text-[13px] font-sans text-[#999999] mb-[10px] leading-[10px]'>Billing Address: {batch?.billingAddress?.addressLineOne}, {batch?.billingAddress?.addressLineTwo}, {batch?.billingAddress?.city}, {batch?.billingAddress?.state} ({batch?.billingAddress?.pinCode})</p>
								<p className='font-[600]  text-[13px] font-sans text-[rgba(0,0,0,0.5)] mb-[10px] leading-[10px]'>Order Total: Rs {batch?.orderTotal}</p>
							</div>
							<div className='flex items-center gap-[10px] mt-[15px] relative'>
								<button onClick={()=>buyBatchAgain(batch.orderId)} className='rounded-[4px] bg-green-600 text-white font-normal text-[12px] py-[8px] px-[12px]'><i className="fa-solid fa-arrows-rotate"></i> Track Package</button>
								<button onClick={()=>navigate(`/orders/current/ordered-items?orderId=${batch?.orderId}`)} className='rounded-[6px] bg-white shadow-md border-[1px] border-[rgba(0,0,0,0.2)] font-normal text-[12px] py-[6px] px-[12px]'>View your item</button>
								<div className='show-invoice '>
								<button  className='rounded-[6px] bg-white shadow-md border-[1px] border-[rgba(0,0,0,0.2)] font-normal text-[12px] py-[6px] px-[12px] '><i className="fa-solid fa-ellipsis"></i></button>
								<div className='invoice-abs-btn absolute bg-[#fff] border-[1px] border-[rgba(0,0,0,0.15)] rounded-[8px] px-[5px] py-[5px] right-[-31%] text-[15px] top-[35px]'>
									<ul>
										<li onClick={()=>navigate(`/order/invoice?orderId=${batch?.orderId}`)} className='cursor-pointer my-[7px] hover:bg-red-400 hover:text-[#fff] px-[5px] py-[6px] rounded-[8px]'>View Invoice</li>
										<li className='my-[7px] hover:bg-red-400 hover:text-[#fff] px-[5px] py-[6px] rounded-[8px] cursor-pointer'>Cancel Order</li>
									</ul>
								</div>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			))
		) : (
			<Empty />
		)
	}
		<div>
		</div>

</div>

	)
}

export default NotYetShipped 