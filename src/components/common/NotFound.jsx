import React from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import EnquirySection from './EnquirySection';
import Footer from './Footer';
import HeaderNew from './HeaderNew';
import Meta from './Meta';

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<>
		<Meta title="Not Found | Indore Battery"  />
		<HeaderNew />
			<section className='not-found-page-container bg-[#f7f7f5] pt-[65px] pb-[10.1%]'>
				<div className='center-wr'>
					<div className=' flex flex-col items-center justify-start'>
					<figure className='w-[75%] pt-[100px]'>
						<img src="/images/404.jpg"  alt="not found" />
					</figure>
					<p className='1200:w-[500px] 320:text-center 320:w-[90%]'>We looked everywhere for this page.
Are you sure the website URL is correct?
Get in touch with the site owner.</p>
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