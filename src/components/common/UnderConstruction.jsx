import React, { useEffect } from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'

const UnderConstruction = () => {

	return (
		<>
			<Header />
			<section className='under-construction-container pt-[100px] flex flex-col items-center justify-center font-["Sora"] tracking-[2px] text-[#484848]'>
				<h1 className='uppercase text-[48px] font-bold'>Great Things are being built</h1>
				<img src="/images/under_construction.png" alt="under construction" />
				<p className='text-[18px] italic font-[400] font-sans'>Our website is under construction, but we are working hard to launch very soon...</p>
				<p className='text-[18px] italic font-[400] font-sans'>In the meantime feel free to visit the <Link className='text-[#ff7637]' to='/show-batteries/Amaron'>Products Page</Link> and browse the wide selection of batteries we provide</p>
				<div className='mt-[25px] w-full'>
					<div className='center-wr flex items-center justify-center'>
						<input type="text" className='py-[12px] rounded-[4px] w-[30%] pr-[40px] pl-[10px] text-[18px] border-[1px] mr-[10px] border-[#000000]' placeholder='Enter a valid email address' />
						<button className='btn-special-spread-second p-[14px]  w-[15%] pl-[20px] pr-[20px] text-[18px] font-[600] focus:outline-none bg-[#1B283A] text-white border-l-[8px] solid border-l-[#FF7637]
              '>Notify Me</button>
					</div>
				</div>
				<p className='text-[18px]  font-[600] text-[#959595] my-[25px]'>Sign up now to get early notification of our launch date!</p>
			</section>
		</>
	)
}

export default UnderConstruction