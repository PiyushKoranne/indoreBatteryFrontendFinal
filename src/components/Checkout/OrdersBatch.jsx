import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const OrdersBatch = () => {
	const [orderedItems,setOrderedItems] = useState([])
    const [orderId, setOrderId] = useState("")
    const [orderLabel, setOrderLabel] = useState("")
	const navigate = useNavigate()
    
    async function fetchOrderId() {
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get("orderId");
        setOrderId(orderId)
        console.log(orderId,".......");
    }

	async function GetOrderedItems(){
		const response = await axios.post("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-ordered-items",{
            orderId:orderId
        })
        setOrderLabel(response?.data)
		setOrderedItems(response?.data?.orderItems)
	}
	
	const buyBatteryAgain = async(productId, quantity, productPrice)=>{
	
		const response = await axios.post(`/api/v1/manage/add-to-cart`, {
            batteryId: productId,
            quantity: quantity,
            exchangeOldBattery: productPrice
        })
        console.log(response)
        if (response.status === 200) {
            navigate("/cart")
        } else if (response.status === 200) {
            navigate("/login")
        }
	}

 

    const months = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];



	useEffect(()=>{
		GetOrderedItems()
        fetchOrderId()
	},[orderId])
	return (
        <>
		<div className='border-[1px] border-[rgba(0,0,0,0.1)] rounded-[8px] flex flex-col'>
						<div className='rounded-[8px] bg-[#f5f5f5] flex items-center'>
							<div className='flex flex-col items-start w-[20%] p-[25px]'>
								<p className='font-semibold text-[14px] text-[#999999]'>Order placed</p>
								<h4 className='text-slate-600 font-["Poppins"] text-[18px] '>{`${months[new Date(orderLabel?.createdAt).getMonth()]} ${new Date(orderLabel?.createdAt).getDate()}, ${new Date(orderLabel?.createdAt).getFullYear()}`}</h4>
							</div>
							<div className='flex flex-col items-start w-[15%] p-[25px]'>
								<p className='font-semibold text-[14px] text-[#999999]'>Total</p>
								<h4 className='text-slate-600 font-["Poppins"] text-[18px] '><i className="fa-solid fa-indian-rupee-sign"></i>{orderLabel?.orderTotal}</h4>
				 			</div>
							<div className='flex flex-col items-start w-[20%] p-[25px]'>
								<p className='font-semibold text-[14px] text-[#999999]'>Ship To</p>
								<h4 className='text-slate-600 font-["Poppins"] text-[18px] '>{orderLabel?.buyerInformation?.firstName} {orderLabel?.buyerInformation?.lastName}</h4>
							</div>
							<div className='flex flex-col items-end w-[45%] p-[25px]'>
								<h4 className='text-slate-600 font-["Poppins"] text-[16px] '>Order &nbsp; # &nbsp;{orderLabel?.orderId}</h4>
								<div className='flex items-center gap-[10px]'>
										<button className='rounded-[6px] bg-white shadow-md border-[1px] border-[rgba(0,0,0,0.2)] font-normal text-[12px] py-[6px] px-[12px]'>Buy the package again</button>
										<button onClick={()=>navigate(`/order/invoice?orderId=${orderLabel?.orderId}`)} className='rounded-[6px] bg-white shadow-md border-[1px] border-[rgba(0,0,0,0.2)] font-normal text-[12px] py-[6px] px-[12px]'>View invoice</button>
								</div>
							</div>
						</div>
						<div className='p-[25px]'>
							<div className='rounded-[8px] margin-[10px]	px-[15px] py-[8px] border-[1px] border-amber-300 bg-yellow-50 flex items-center relative font-semibold text-gray-600 '>
								<img src="/images/testimonial-star.png" alt="rating" width={20} className='mr-[15px]' />
								Please rate your experience with us
								<span className='absolute right-[15px] text-[24px] text-gray-600'>&times;</span>
							</div>
						</div>


		
							{/* START Order Entry Card */}
                        {orderedItems?.map((product)=>(
                            	<div key={product?.productId} className='p-[25px] pt-[10px] flex flex-col border-b-[1px] border-[rgba(0,0,0,0.1)]'>
								<h4 className='text-slate-600 font-["Poppins"] text-[18px]'>Delivered June 5</h4>
								<div className='flex items-start mt-[10px] h-[190px]'>
									<figure className='border-2 border-[rgba(0,0,0,0.1)] w-[15%] p-[15px] flex items-center justify-center'>
										<img src={`https://batterybackend.react.stagingwebsite.co.in/images/${product?.productImage}`} alt="product" />
									</figure>
									<div className='w-[85%] pl-[20px] flex flex-col items-start justify-between'>
										<div>
											<h4 className='text-slate-600 font-["Poppins"] text-[18px] leading-[44px]'>{product?.productName}</h4>
											<p className='font-[600] text-[13px] font-sans text-[rgba(0,0,0,0.5)] mb-[10px] leading-[10px]'>MRP: Rs {product?.productPrice}</p>
											<p className='font-[600] text-[13px] font-sans text-[rgba(0,0,0,0.5)] mb-[10px] leading-[10px]'>Quantity {product?.productQuantity}</p>
											<p className='font-medium text-[13px] font-sans text-[#999999] mb-[10px] leading-[10px]'>Return or Replace Items: Not Eligible</p>
										</div>
										<div className='flex items-center gap-[10px] mt-[25px]'>
										<form onSubmit={(e) => {
											    e.preventDefault();
											    const productId = e.target[0].value; 
											    const quantity = e.target[1].value; 
											    const productPrice = e.target[2].value;
											    buyBatteryAgain(productId, quantity, productPrice); 
											}}>
											    <input type="hidden" value={product?.productId} />
											    <input type="hidden" value={product?.productQuantity} />
											    <input type="hidden" value={product?.productPrice} />
											    <button className='rounded-[6px] bg-slate-600 text-white font-normal text-[12px] py-[6px] px-[12px]'><i className="fa-solid fa-arrows-rotate"></i> Buy It Again</button>
											</form>
											<button className='rounded-[6px] bg-white shadow-md border-[1px] border-[rgba(0,0,0,0.2)] font-normal text-[12px] py-[6px] px-[12px]'>Product Details</button>
											<button onClick={()=>navigate(`/track-package?orderId=${orderLabel?.orderId}&productId=${product?.productId}`)} className='rounded-[6px] bg-white shadow-md border-[1px] border-[rgba(0,0,0,0.2)] font-normal text-[12px] py-[6px] px-[12px]'>Track Package</button>
											<button className='rounded-[6px] bg-white shadow-md border-[1px] border-[rgba(0,0,0,0.2)] font-normal text-[12px] py-[6px] px-[12px]'><i className="fa-solid fa-ellipsis"></i></button>
											
										</div>
									</div>
								</div>
							</div>
					
                        ))}
							
						{/* END Order Entry Card */}

					</div>
        </>

	)
}

export default OrdersBatch