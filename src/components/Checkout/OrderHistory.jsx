import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Footer from '../common/Footer';
import axios from 'axios';
import HeaderNew from '../common/HeaderNew';


const OrderHistory = () => {

	const {pathname} = useLocation();
	const [tabber, setTabber] = useState(pathname);
	const [ordersHistoyCount,setOrdersHistoryCount] = useState([])

	async function GetOrderHistoy(){
		const response = await axios.get("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-orders-history")
		console.log("THIS IS RESPONSE::",response?.data);
		setOrdersHistoryCount(response?.data?.length);
	}

	useEffect(()=>{
		GetOrderHistoy()
	},[])

	 
	useEffect(()=>{
		setTabber(pathname)
	},[pathname])

	return (
		<>
			<HeaderNew />
			<section className='order-details-w bg-[#fff] py-[5%]'>
				<div className='center-wr'>
					<h4 className='font-["Sora"] flex items-center gap-[15px]' >Your Orders 
					<span className='inline-block p-[10px] rounded-full font-semibold bg-[#e5e5e5] flex w-fit items-center justify-center leading-[5px] '>{ordersHistoyCount}</span>
					</h4>
					<div className='my-[25px]'>
						<div className='w-fit bg-[#eeeeee] p-[5px] rounded-[8px]'>
							<Link to={"./current"} ><button className={`py-[6px] px-[30px] rounded-[8px] ${tabber ? tabber.includes("current") ? "bg-white shadow-md": "":""}`}>All Orders</button></Link>
							<Link to={"./not-yet-shipped"} ><button className={`py-[6px] px-[30px] rounded-[8px] ${tabber ? tabber.includes("not-yet-shipped") ? "bg-white shadow-md": "":""}`}>Processing</button></Link>
							<Link to={"./cancelled"} ><button className={`py-[6px] px-[30px] rounded-[8px] ${tabber ? tabber.includes("cancelled") ? "bg-white shadow-md": "":""}`}>Cancelled Orders</button></Link>
						</div>
					</div>
					<Outlet />
				</div>
			</section>
			<Footer/>
		</>
	)
}
// success

export default OrderHistory