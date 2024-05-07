import React, { useState,useEffect } from "react";
import Header from "../common/Header";
import EnquirySection from "../homeComponents/EnquirySection";
import Footer from "../common/Footer";
import axios from "axios";
import { Link,useSearchParams } from "react-router-dom";
import log from "../src/utils/utilityFunctions";


function CarBatteries(){

    const [batteryType, setBatteryType] = useState('car');
    let [searchParams, setSearchParams] = useSearchParams();
    const [carBrandName,setCarBrandName] = useState("")
    const [carBrandLogo,setCarBrandLogo] = useState("")
    const [carBatteriesList,setCarBatteriesList] = useState([])
    const [haveData,setHaveData] = useState(false)

    const handleBatteryChange = (type) => {
      setBatteryType(type);
    };
    useEffect(()=>{
      setCarBrandName(searchParams.get('brandName'))
      setCarBrandLogo(searchParams.get('brandLogo'))
    },[])

    async function getBatteriesByCarName(){
      const response = await axios.post(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-batteries-by-car-brand`, {
        carBrand: carBrandName
      }, {
				headers:{
					"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
				}
			});
      log(response)
      if(response.status === 200){
        setCarBatteriesList(response.data)
        setHaveData(true)
      }else if(response.status === 400){
        setHaveData(false)
      }
    }
    log(carBatteriesList,"<<<<<<<<<")

    useEffect(()=>{
      getBatteriesByCarName()
    },[carBrandName])

    
    // <a  key={index} href={`/show-batteries/${item.brandName}`}> <li className="py-[10px]">{item?.brandName}</li></a>
    
    return(
        <>
        <Header/>
        <section className="bg-[#F7F7F7] py-[5%]">
        <div className="center-wr">

      
      {!haveData ? (
      		<section className='under-construction-container pt-[100px] flex flex-col items-center justify-center font-["Sora"] tracking-[2px] text-[#484848]'>
      			<h1 className='uppercase text-[48px] font-bold'>Great Things are being built</h1>
      			<img src="/images/under_construction.png" alt="under construction" />
      			<p className='text-[18px] italic font-[400] font-sans'>Our website is under construction, and we are working hard to launch very soon...</p>
      			<p className='text-[18px] italic font-[400] font-sans'>In the meantime feel free to visit the <Link className='text-[#ff7637]' to='/show-batteries/Amaron'>Products Page</Link> and browse the wide selection of batteries we provide</p>
      			<div className='mt-[25px]'>
      				<input type="text" className='py-[12px] rounded-[4px] pr-[40px] pl-[10px] text-[18px] border-[1px] mr-[10px] border-[#000000]' placeholder='Enter a valid email address' />
      				<button className='rounded-full bg-[#000000] hover:bg-[#ff7637] outline-none border-none text-white uppercase py-[15px] px-[40px] text-[18px]  border-[#ff7637] border-l-[8px] font-[800]'>Notify Me</button>
      			</div>
      			<p className='text-[18px]  font-[600] text-[#959595] my-[25px]'>Sign up now to get early notification of our launch date!</p>
      		</section>

      ) : (
        <></>
      )}

           

        </div>

        </section>
        <EnquirySection/>
        <Footer/>
        </>
    )
}

export default CarBatteries;