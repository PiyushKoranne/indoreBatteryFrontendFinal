import React from "react";
import { Link } from "react-router-dom";
function Footer() {
	return (
		<footer className="border-[1px] solid border-[rgba(0,0,0,0.1)] pt-[15px]">
			<div className="center-wr">
				<div className="flex items-center flex-col">
					<h4 className="text-center py-[15px] font-sans font-[500] flex items-center flex-col">
						<div className="flex gap-[5px] flex-wrap">
						<span className="320:text-[12px] 1200:text-[14px] 320:w-full 320:text-center leading-[20px]">Copyright {new Date().getFullYear()}.</span>
						<span className="320:text-[12px] 1200:text-[14px] 320:w-full 320:text-center leading-[20px]">All Rights Reserved By <Link to="/"> Indore Battery</Link></span>
						</div>
						<span className="cursive 320:text-[16px] text-[19px] text-[#989898] 320:tracking-wide 320:mt-[15px]">Crafted with <i className="fa-solid fa-heart text-red-300 text-[13px]"></i> By <Link to="https://conativeitsolutions.com" className="320:text-[14px] 320:font-[500]"> &nbsp;Conative IT Solutions</Link></span>
					</h4>
				</div>
			</div>
		</footer>
	)
}

export default Footer;