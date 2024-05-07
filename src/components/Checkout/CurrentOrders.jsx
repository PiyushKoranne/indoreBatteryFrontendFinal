import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Meta from '../common/Meta'

const CurrentOrders = () => {
	const [ordersHistory, setOrdersHistory] = useState([])
	const navigate = useNavigate()
	const [lastOrder, setLastOrder] = useState("")

	async function GetOrderHistory() {
		const response = await axios.get("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-orders-history", {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
			}
		})
		setOrdersHistory(response?.data)
	}
	function giveReview() {
		window.open("https://www.google.com/search?hl=en-IN&gl=in&q=Indore+Battery,Luminous%7CMicrotek%7CAmaron%7CExide%7CAmaron+Quanta+Inverter/UPS/car+battery+wholesale+store,+Eastern+Ring+Rd,+Opposite+Audi+Showroom,+Near+Metro+Wholesale,+Dewas+Naka,+Gulab+Bagh+Colony,+Indore,+Madhya+Pradesh+452010&ludocid=15140537826907581541&lsig=AB86z5X2hF7ZzTYUd_tZxfXCjG_l#lrd=0x39631d4965bcb815:0xd21dfeef8130ec65,3", "_blank")
	}


	const months = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];



	async function GetLatestOrder() {
		const response = await axios.get("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-latest-order", {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
			}
		})
		setLastOrder(response?.data)
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


	useEffect(() => {
		GetLatestOrder()
		GetOrderHistory()
	}, [])
	return (
		<div className='border-[1px] border-[rgba(0,0,0,0.1)] rounded-[8px] flex flex-col'>
			<Meta title="Current Orders | Indore Battery"  />
			<div className='rounded-[8px] bg-[#f5f5f5] flex items-center flex-wrap'>
				<div className='flex flex-col items-start 1200:w-[20%] 320:w-full 320:p-[5px] 320:px-[10px] 1200:p-[25px]'>
					<p className='font-semibold text-[14px] text-[#999999]'>Last Order placed</p>
					<h4 className='text-slate-600 font-["Sora"] text-[18px] '>{lastOrder?.createdAt ? `${months[new Date(lastOrder?.createdAt).getMonth()]} ${new Date(lastOrder?.createdAt).getDate()}, ${new Date(lastOrder?.createdAt).getFullYear()}` : `No order placed yet`}</h4>
				</div>
				<div className='flex flex-col items-start 1200:w-[15%] 320:w-full 320:p-[5px] 320:px-[10px] 1200:p-[25px]'>
					<p className='font-semibold text-[14px] text-[#999999]'>Last Order Total</p>
					<h4 className='text-slate-600 font-["Sora"] text-[18px] '><i className="fa-solid fa-indian-rupee-sign"></i>{lastOrder?.orderTotal ? lastOrder?.orderTotal : '0.00'}</h4>
				</div>
				<div className='flex flex-col items-start 1200:w-[20%] 320:w-full 320:p-[5px] 320:px-[10px] 1200:p-[25px]'>
					<p className='font-semibold text-[14px] text-[#999999]'>Ship To</p>
					<h4 className='text-slate-600 font-["Sora"] text-[18px] '>{lastOrder?.buyerInformation ? lastOrder?.buyerInformation?.firstName + " " + lastOrder?.buyerInformation?.lastName : '--'}</h4>
				</div>
				<div className='flex flex-col 1200:items-end 320:items-start 1200:w-[45%] 320:w-full  320:p-[10px] 1200:p-[25px]'>
					<h4 className='text-slate-600 font-["Sora"] 1200:text-[16px] 320:text-[14px]'>{lastOrder?.orderId ? `Order  # ${lastOrder?.orderId}` : `No orders`}</h4>
					{lastOrder?.createdAt && <div className='flex items-center gap-[10px]'>
						<button onClick={() => navigate(`/orders/current/ordered-items?orderId=${lastOrder?.orderId}`)} className='rounded-[6px] bg-white shadow-md border-[1px] border-[rgba(0,0,0,0.2)] font-normal text-[12px] py-[6px] px-[12px]'>View order details</button>
						<button onClick={() => navigate(`/order/invoice?orderId=${lastOrder?.orderId}`)} className='rounded-[6px] bg-white shadow-md border-[1px] border-[rgba(0,0,0,0.2)] font-normal text-[12px] py-[6px] px-[12px]'>View Invoice</button>
					</div>}
				</div>
			</div>
			<div className='1200:p-[25px] 320:p-[10px] '>
				<div onClick={giveReview} className='320:text-[14px] 1200:text-[16px] cursor-pointer rounded-[8px] margin-[10px]	320:px-[10px] 320:pr-[15px] 1200:px-[15px] py-[8px] border-[1px] border-amber-300 bg-yellow-50 flex items-center relative font-semibold text-gray-600 '>
					<img src="/images/testimonial-star.png" alt="rating" width={20} className='mr-[15px]' />
					Please rate your experience with us on Google
					<span className='absolute right-[12px] text-[24px] text-gray-600'>&times;</span>
				</div>
			</div>

			{ordersHistory.slice().reverse().map((batch, index) => (
				<div key={batch?.orderId} className='320:p-[10px] 1368:p-[25px] pt-[10px] flex flex-col border-b-[1px] border-[rgba(0,0,0,0.1)]'>
					<h4 className='text-slate-600 font-["Sora"] text-[18px] 320:text-[16px]'>Placed {`${months[new Date(batch?.createdAt).getMonth()]} ${new Date(batch?.createdAt).getDate()}, ${new Date(batch?.createdAt).getFullYear()}`}</h4>
					<div className='flex items-stretch mt-[10px] 1200:min-h-[190px] 320:h-auto'>
						<figure className='border-2 border-[rgba(0,0,0,0.1)] w-[15%] 320:hidden 650:flex p-[15px] flex items-center justify-center flex-wrap h-[100%]'>
							{/* {
								batch.orderItems.map(item => (
									<img src={`https://batterybackend.react.stagingwebsite.co.in/images/${item.productImage}`} width={batch.orderItems?.length > 1 ? '60px' : '100%'} alt={item.productName} />
								))
							} */}
							<img src={`https://batterybackend.react.stagingwebsite.co.in/images/indoreBatteryLogo.svg`} width={batch.orderItems?.length > 1 ? '60px' : '100%'} alt={item.productName} />
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
									<div className=' invoice-abs-btn absolute bg-[#fff] border-[1px] border-[rgba(0,0,0,0.15)] rounded-[8px] px-[5px] py-[5px] right-[-31%] text-[14px] top-[35px]'>
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
			))}







			<Toaster />
		</div>
	)
}

export default CurrentOrders