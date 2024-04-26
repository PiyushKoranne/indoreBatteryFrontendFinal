import React from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import EnquirySection from './EnquirySection';
import Footer from './Footer';
import HeaderNew from './HeaderNew';

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<>
		<HeaderNew />
			<section className='not-found-page-container bg-[#f7f7f5] pt-[65px] border-2 border-green-400 pb-[10.1%]'>
				<div className='center-wr'>
					<div className=' flex flex-col items-center justify-start'>
					<figure className='w-[75%] pt-[100px]'>
						<img src="/images/404.jpg"  alt="not found" />
					</figure>
					<button onClick={() => {navigate("/")}} className="btn-special-spread-second mt-[25px] py-[10px] px-[30px] text-[18px] font-[800] text-white border-l-[8px] border-[#ff7637] bg-[#000000]"> Back Home </button>
					</div>
				</div>
			</section>
			<EnquirySection/>
			<Footer/>
		</>
	)
}

export default NotFound