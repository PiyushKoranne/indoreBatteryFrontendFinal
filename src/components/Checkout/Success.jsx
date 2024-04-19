import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Countdown from 'react-countdown';


const Success = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [orderDetails, setOrderDetails] = useState(null);
	const [orderId,setOrderId] = useState("")
	const [redirectCount, setRedirectCount] = useState(5);

	async function fetchOrderDetails(){
		try {
      const urlParams = new URLSearchParams(window.location.search);
      const orderId = urlParams.get("orderId");
			setOrderId(orderId)
			console.log("ud",orderId)
			if(!orderId) return
			const response = await axios.post("https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-completed-order", {
				orderId
			});
			console.log("Response",response)
			if(response.status === 200){
				setOrderDetails(response.data?.order)
			}
		} catch (error) {
			console.log(error)
		}
	}
	const formattedDate = new Intl.DateTimeFormat('en-US', {day: 'numeric', month: 'long', year: 'numeric'}).format(new Date(Date.now()));

	const renderer = ({ seconds, completed }) => {
		if (completed) {
			if(orderDetails){
				navigate(`/order/invoice?orderId=${orderDetails?.orderId}`);
			} else {
				navigate("/")
			}
		} else {
			return <span>{`${seconds} seconds`} </span>;
		}
	};

	useEffect(()=>{
		fetchOrderDetails();
	},[])
  return (
	<>
		<Header />
		<section className='pt-[100px] bg-[#fff] flex flex-col items-center justify-center'>
			<figure className='flex items-center justify-center relative'>
				<img src="/images/tick-circle-svgrepo-com.svg" width={150} alt="Tick" />
			</figure>
			<h1 className='text-[36px] '>Order Placed Successfully</h1>
			<p>{`Order was placed successfully on ${formattedDate}`}</p>
			<p>We will be sending you an email confirmation with payment and order details shortly.</p>
			<Link to={`/order/invoice?orderId=${orderDetails?.orderId}`}><button className='py-[15px] px-[40px] text-[16px] text-white font-[700] border-l-[8px] border-[#ff7637] mt-[15px] btn-special-spread-second bg-[#1B283A]'>View Invoice</button></Link>
			<span className='inline-block my-[10px] text-slate-600 text-underline font-medium text-[14px]'>You will be redirected in  <Countdown renderer={renderer}
    date={Date.now() + 3000}
  /></span>
		</section>
	</>
  )
}

export default Success