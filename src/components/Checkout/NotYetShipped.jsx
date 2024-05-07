import { Empty } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import log from '../../utils/utilityFunctions'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'


const NotYetShipped = () => {
	const navigate = useNavigate();
	const [ordersHistory,setOrdersHistory] = useState([])

	async function GetOrderHistory(){
		const response = await axios.get("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-orders-history", {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
			}
		})
		log(response?.data)
		setOrdersHistory(response?.data)
	}

	async function buyBatchAgain(orderId) {
		function sleep(ms) {
			return new Promise((res) => {
				setTimeout(() => {
					res()
				}, ms)
			})
		}
		async function handleBuyAgain() {
			try {
				const toastId = toast.loading("Placing order again")
				await sleep(800);
				const response = await axios.post("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/buy-batch-again", {
					orderId: orderId
				}, {
					headers:{
						"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
					}
				})

				if (response.status === 200) {
					toast.dismiss(toastId)
					toast.success("Order Placed again sucessfully")
					navigate("/cart")
				} else {
					toast.error("Error placing the order please try again later!!")

				}
			} catch (error) {
				console.log(error);
			}
		}
		handleBuyAgain()
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
		<Toaster />
		{ordersHistory.length  > 0 ? (
			
			ordersHistory.slice()
			.reverse()
			.filter((batch) => batch.deliveryStatus !== "Delivered")
			.map((batch) => (
				<div key={batch?.orderId} className='320:p-[10px] 1368:p-[25px] pt-[10px] flex flex-col border-b-[1px] border-[rgba(0,0,0,0.1)]'>
					<h4 className='text-slate-600 font-["Sora"] text-[18px] 320:text-[16px]'>Placed {`${months[new Date(batch?.createdAt).getMonth()]} ${new Date(batch?.createdAt).getDate()}, ${new Date(batch?.createdAt).getFullYear()}`}</h4>
					<div className='flex items-stretch mt-[10px] 1200:h-[190px] 320:h-auto'>
						<figure className='border-2 border-[rgba(0,0,0,0.1)] w-[15%] 320:hidden 650:flex p-[15px] flex items-center justify-center flex-wrap h-[100%]'>
							{
								batch.orderItems.map(item => (
									<img src={`https://batterybackend.react.stagingwebsite.co.in/images/${item.productImage}`} width={batch.orderItems?.length > 1 ? '60px' : '100%'} alt={item.productName} />
								))
							}
						</figure>
						<div className='650:w-[85%] 320:w-full 650:pl-[20px] 320:p-0 flex flex-col items-start justify-between'>
							<div>
								<h4 className='text-slate-600 font-["Sora"] 320:text-[14px] 320:leading-[35px] text-[18px] leading-[44px]'>Order Placed on: {`${months[new Date(batch?.createdAt).getMonth()]} ${new Date(batch?.createdAt).getDate()}, ${new Date(batch?.createdAt).getFullYear()}`}</h4>
								<p className='font-medium text-[13px] font-sans text-[#999999] mb-[10px] 320:leading-[20px] leading-[10px]'>Ordered Items: {batch?.orderItems.length} </p>
								<p className='font-medium text-[13px] font-sans text-[#999999] mb-[10px] 320:leading-[20px] leading-[10px]'>Shipping Address: {batch?.shippingAddress?.addressLineOne}, {batch?.shippingAddress?.addressLineTwo}, {batch?.shippingAddress?.city},{batch?.shippingAddress?.state} ({batch?.shippingAddress?.pinCode})</p>
								<p className='font-medium text-[13px] font-sans text-[#999999] mb-[10px] 320:leading-[20px] leading-[10px]'>Billing Address: {batch?.billingAddress?.addressLineOne}, {batch?.billingAddress?.addressLineTwo}, {batch?.billingAddress?.city}, {batch?.billingAddress?.state} ({batch?.billingAddress?.pinCode})</p>
								<p className='font-[600]  text-[13px] font-sans text-[rgba(0,0,0,0.5)] mb-[10px] 320:leading-[20px] leading-[10px]'>Order Total: Rs {batch?.orderTotal}</p>
							</div>
							<div className='flex items-center flex-wrap gap-[10px] mt-[15px] relative'>
								<button onClick={() => buyBatchAgain(batch.orderId)} className='320:w-full 650:w-fit rounded-[4px] bg-green-600 text-white font-normal text-[12px] py-[8px] px-[12px]'><i className="fa-solid fa-arrows-rotate"></i> Buy It Again</button>
								<button onClick={() => navigate(`/orders/current/ordered-items?orderId=${batch?.orderId}`)} className='320:w-[100%] 650:w-fit rounded-[6px] bg-white shadow-md border-[1px] border-[rgba(0,0,0,0.2)] font-normal text-[12px] py-[6px] px-[12px]'>View your item</button>
								<button onClick={() => navigate(`/order/invoice?orderId=${batch?.orderId}`)} className='320:w-[100%] 650:hidden rounded-[6px] bg-white shadow-md border-[1px] border-[rgba(0,0,0,0.2)] font-normal text-[12px] py-[6px] px-[12px]'>View Invoice</button>
								{/* <button className='my-[7px] hover:bg-red-400 hover:text-[#fff] px-[5px] py-[6px] rounded-[8px] cursor-pointer'>Cancel Order</button> */}
								<div className='show-invoice 320:hidden 650:block'>
									<button className='rounded-[6px] bg-white shadow-md border-[1px] border-[rgba(0,0,0,0.2)] font-normal text-[12px] py-[6px] px-[12px] '><i className="fa-solid fa-ellipsis"></i></button>
									<div className=' invoice-abs-btn absolute bg-[#fff] border-[1px] border-[rgba(0,0,0,0.15)] rounded-[8px] px-[5px] py-[5px] right-[-31%] text-[15px] top-[35px]'>
										<ul>
											<li onClick={() => navigate(`/order/invoice?orderId=${batch?.orderId}`)} className='cursor-pointer my-[7px] hover:bg-red-400 hover:text-[#fff] px-[5px] py-[6px] rounded-[8px]'>View Invoice</li>
											{/* <li className='my-[7px] hover:bg-red-400 hover:text-[#fff] px-[5px] py-[6px] rounded-[8px] cursor-pointer'>Cancel Order</li> */}
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