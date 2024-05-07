import React, { useState, useEffect } from "react";
import Header from "./common/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true
import { useParams } from "react-router-dom";
import Footer from "./common/Footer";
import EnquirySection from "./homeComponents/EnquirySection";
import swal from "sweetalert";
import log from "../src/utils/utilityFunctions";



function BuyBattery() {
    const { 'battery-name': batteryName } = useParams();
    const navigate = useNavigate()
    const [postData, setPostData] = useState("")
    const [specialPrice, setSpecialPrice] = useState("")
    const [batteryId, setBatteryId] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [ratingNum,setRatingNum] = useState(0)
    const [showCallbackModal, setShowCallbackModal] = useState(false);
    const [showQuotationModal, setShowQuotationModal] = useState(false);
    const [exchangeBattery, setExchangeBattery] = useState(true)
    // for call rating
    const [reviewerName, setReviewerName] = useState("")
    const [reviewContent, setReviewContent] = useState("")
    // for call back request
    const [name,setName] = useState("")
    const [contactNum,setContactNum] = useState("")
    const [enquiry,setEnquiry] = useState("")
    const [city,setCity] = useState("")
    // for quotation request
    const [companyName,setCompanyName] = useState("")
    const [query,setquery] = useState("")
    const [email,setEmail] = useState("")

    const backend_url = import.meta.env.VITE_BACKEND_URL

    const openReviewModal = () => {
        setShowCallbackModal(true);
    };

    const closeReviewModal = () => {
        setShowCallbackModal(false);
    };
    const openQuotationModal = () => {
        setShowQuotationModal(true);
    };

    const closeQuotationModal = () => {
        setShowQuotationModal(false);
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setValue(quantity - 1);
        }
    };
    const scrollToRatingSection = () => {
        const ratingSection = document.getElementById('rating-section');
        const yOffset = -100; // Adjust as needed
        const y = ratingSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    };


    const handleSpecialPriceChange = (event) => {
        setSpecialPrice(event.target.value);
    };

    async function getBatteryData() {
        const response = await axios.get(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/get-battery/${batteryName}`, {
					headers:{
						"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
					}
				})
        setBatteryId(response?.data?.data?._id)
        setPostData(response?.data?.data?.postData)
        setSpecialPrice(response?.data?.data?.postData?.pricewitholdbattery)
    }

    useEffect(() => {
        getBatteryData()
    }, [])

    async function handleAddReview(e) {
        e.preventDefault();
        const response = await axios.post(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/add-review`, {
            productId: batteryId,
			reviewScore: ratingNum,
			reviewerName: reviewerName,
			reviewContent: reviewContent
        }, {
					headers:{
						"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
					}
				})
        if(response.status === 200){
            swal({
                icon: "success",
                title: "Thank you for your precious time",
                timer: 2000
              });
            setRatingNum(0)
            setReviewerName("")
            setReviewContent("")
        }

    }


    async function handleCallbackRequest(e) {
        e.preventDefault();
        const response = await axios.post(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/request-callback`, {
            name:name,
			contactNum: contactNum,
			city: city,
			enquiry: enquiry
        }, {
					headers:{
						"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
					}
				})
        if(response.status === 200){
            setShowCallbackModal(false)
            swal({
                icon: "success",
                title: "Our team will reach to you as soon as possible",
                showConfirmButton: false,
                timer: 2000
              });
            setName("")
            setContactNum("")
            setCity("")
            setEnquiry("")
        }
    }


    async function handleQuotationRequest(e) {
        e.preventDefault();
        const response = await axios.post(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/ask-battery-quotation`, {
            productId:batteryId,
            quantity:quantity,
            name:name,
			mobileNum: contactNum,
            email:email,
            companyName:companyName,
			city: city,
            query:query
        }, {
					headers:{
						"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
					}
				})
        if(response.status === 200){
            setShowQuotationModal(false)
            swal({
                icon: "success",
                title: "Our team will reach to you as soon as possible",
                showConfirmButton: false,
                timer: 2000
              });
            setName("")
            setContactNum("")
            setCity("")
            setEnquiry("")
        }
    }



    async function handleBuyNow() {

        const response = await axios.post(`https://batterybackend.react.stagingwebsite.co.in/api/v1/manage/add-to-cart`, {
            batteryId: batteryId,
            quantity: quantity,
            exchangeOldBattery: exchangeBattery
        }, {
					headers:{
						"Authorization":`Bearer ${localStorage.getItem("ibjwtoken")}`
					}
				})
        log(response)
        if (response.status === 200) {
            navigate("/cart")
        } else if (response.status === 200) {
            navigate("/login")
        }
    }

    const starsEl = document.querySelectorAll(".fa-star");
    const emojisEl = document.querySelectorAll(".far");
    const colorsArray = ["red", "orange", "lightblue", "lightgreen", "green"];

    useEffect(() => {
        updateRating(-1);
    }, [updateRating])

    starsEl.forEach((starEl, index) => {
        starEl.addEventListener("click", () => {
            updateRating(index);
            setRatingNum(index+1)
        });
    });

    function updateRating(index) {
        starsEl.forEach((starEl, idx) => {
            if (idx < index + 1) {
                starEl.classList.add("active");
            } else {
                starEl.classList.remove("active");
            }
        });

        emojisEl.forEach((emojiEl) => {
            emojiEl.style.transform = `translateX(-${index * 50}px)`;
            emojiEl.style.color = colorsArray[index];
        });
    }



    return (
        <>
            <Header />
            <section>
                <div className="center-wr">
                    <div className="mt-[5%]">
                        <div className="flex p-[8px] bg-[#F5F5F5] gap-[7px] mt-[81px] mb-[30px]">
                            <span><Link to="/">Home:</Link> </span> <span className="text-[#3BBA11] font-[600]">{batteryName}</span>
                        </div>

                        <div className="flex">
                            <div className="w-[37%]">
                                <figure className="w-[100%] border-[1px] solid border-[rgba(0,0,0,0.2) p-[40px]">
                                    <img src={`${backend_url}/images/${postData?.batteryimages}`} alt="battery image" />
                                </figure>

                                <div>
                                    <div className="flex gap-[15px] pt-[15px]">
                                        <div  onClick={openReviewModal} className="flex w-[225px] cursor-pointer items-center p-[10px] text-center border-[1px] solid border-[rgba(0,0,0,0.2)]">
                                            <figure className="px-[10px]"><i className='bg-[#ff7637] p-[8px] rounded-[50%] text-[#fff] bx bxs-phone'></i></figure>
                                            <span>Request Callback</span>
                                        </div>
                                        <div onClick={openQuotationModal} className="flex w-[225px] cursor-pointer items-center p-[10px] text-center border-[1px] solid border-[rgba(0,0,0,0.2)]">
                                            <figure className="px-[10px]"><i className='bg-[#ff7637] p-[8px] rounded-[50%] text-[#fff] bx bx-notepad' ></i></figure>
                                            <span>Ask For Quotation</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-[15px] pt-[15px]">
                                        <div  onClick={scrollToRatingSection} className="flex w-[225px] cursor-pointer items-center p-[10px] text-center border-[1px] solid border-[rgba(0,0,0,0.2)]">
                                            <figure className="px-[10px]"><i className='bg-[#ff7637] p-[8px] rounded-[50%] text-[#fff] bx bxs-pencil' ></i></figure>
                                            <span>Write a Review</span>
                                        </div>
                                        <div className="flex w-[225px] cursor-pointer items-center p-[10px] text-center border-[1px] solid border-[rgba(0,0,0,0.2)]">
                                            <figure className="px-[10px]"><i className='bg-[#ff7637] p-[8px] rounded-[50%] text-[#fff] bx bx-heart'></i></figure>
                                            <span>Add to Wishlist</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-[50%] mx-[2%]">
                                <div>
                                    <h3 className="text-[28px] font-[600] py-[15px]">{batteryName}</h3>
                                    <div className="font-[600] py-[8px]"><span> Warranty:</span> <span> {postData?.warranty}</span></div>
                                    <div className="font-[600] py-[8px]"><span> Capacity: <span>{postData?.capacity}Ah</span></span></div>
                                    <div><span className="font-[200]">MRP:</span><span className="font-[600]"> {postData?.mrp}</span></div>
                                    <div><span className="font-[200]">Special Price:</span><span className="font-[600]"> {specialPrice}</span></div>
                                    <div className="mt-[10px]">
                                        <button className="bg-[#ff7637] px-[10px] py-[6px] text-[#fff]" onClick={handleDecrement}>-</button>
                                        <input className="w-[50px] py-[5px] text-center border-[1px] border-solid border-[#0000004d]" type="number" onChange={(e) => setQuantity(e.target.value)} value={quantity} />
                                        <button className="bg-[#ff7637] px-[10px] py-[6px] text-[#fff]" onClick={handleIncrement}>+</button>
                                    </div>


                                    <div>
                                        <span className="font-[200] inline-block pt-[20px]">Capacity: 35AH</span>
                                        <div className="flex">
                                            <input
                                                type="radio"
                                                name="specialPrice"
                                                checked={specialPrice === `${postData?.pricewitholdbattery}`}
                                                onChange={() => { setExchangeBattery(true),handleSpecialPriceChange}}
                                            />
                                            <label htmlFor="specialPrice" className="flex justify-between px-[15px] w-[50%]">
                                                <span>With Old Battery <em className="text-[12px] font-[200]">(Same Ah)</em></span>
                                                <span>{postData?.pricewitholdbattery}</span>
                                            </label>
                                        </div>

                                        <div className="flex">
                                            <input
                                                type="radio"
                                                name="specialPrice"
                                                checked={specialPrice === `${postData?.pricewitholdbattery}`}
                                                onChange={() => { setExchangeBattery(false),handleSpecialPriceChange}}
                                            />
                                            <label htmlFor="specialPrice" className="flex justify-between px-[15px] w-[50%]">
                                                <span>Without Old Battery </span>
                                                <span>{postData?.pricewithoutoldbattery}</span>
                                            </label>
                                        </div>

                                        <button onClick={handleBuyNow} className=" mx-[15px] p-[10px] w-[30%] pl-[20px] pr-[20px] mt-[30px] text-[18px] font-[600] focus:outline-none bg-[#236DDC] text-white">Buy Now</button>
                                        <button className=" mx-[15px] p-[10px] w-[30%] pl-[20px] pr-[20px] mt-[30px] text-[18px] font-[600] focus:outline-none bg-[#000] text-white">Add to Cart</button>

                                    </div>
                                    <div className="mt-[20px]">
                                        <h3 className=" w-[20%]  uppercase py-[8px] border-t-[1px] border-b-[1px] border-dashed whitespace-nowrap text-[20px] font-[400] border-[#3BBA11] text-[#3BBA11]">View All Offers</h3>
                                        <ul className="uppercase text-[12px] font-[400] py-[15px] leading-[20px]">
                                            <li>BRAND NEW & 100% GENUINE</li>
                                            <li>FREE DELIVERY & INSTALLATION</li>
                                            <li>CASH ON DELIVERY</li>
                                            <li>Pay by Credit card</li>
                                            <li>Pay in EMI</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* description */}
            <section className="my-[50px]">
                <div className="center-wr">
                    <div>
                        <h3 className="font-[600] text-[22px]">{batteryName} Description</h3>
                    </div>
                    <div className="buy-battery-description" dangerouslySetInnerHTML={{ __html: postData?.description }}></div>
                </div>
            </section>

            {/* features */}
            <section className="my-[50px]">
                <div className="center-wr">
                    <div>
                        <h3 className="font-[600] text-[22px]">Features</h3>
                    </div>
                    <div className="buy-battery-features-li pt-[5px]" dangerouslySetInnerHTML={{ __html: postData?.features }}></div>

                </div>
            </section>

            {/* recommended for */}
            <section className="my-[50px]">
                <div className="center-wr">
                    <div><h3 className="font-[400] text-[22px] underline">RECOMMENDED FOR:</h3></div>
                    <div className="buy-battery-recommend-for py-[15px]" dangerouslySetInnerHTML={{ __html: postData?.recommendedfor }}></div>
                </div>
            </section>
            <section id="rating-section">
                <div className="center-wr">
                    <div className=" border-solid border-[1px] border-[rgba(0,0,0,0.15)] bg-[#f7f7f7] ">
                        <div className="mx-[20px] p-[10px] py-[20px] border-b-[1px] border-b-solid border-b-[rgba(0,0,0,0.15)]">
                            <h3 className="font-[poppins] text-[#FF7637] font-[500] text-[20px]">Review & Rating</h3>
                        </div>
                        <div className="flex">

                        <div>
                        <div className="p-[10px] py-[20px] mx-[20px]">
                            <h3 className="border-b-[1px] pb-[20px] border-b-solid border-b-[rgba(0,0,0,0.15)] font-[poppins] text-[#FF7637] font-[500] text-[20px]">Rating: </h3>
                        </div>
                        <div className="feedback-container">
                      
                            <div className="emoji-container">
                                <i className="far fa-angry fa-3x"></i>
                                <i className="far fa-frown fa-3x"></i>
                                <i className="far fa-meh fa-3x"></i>
                                <i className="far fa-smile fa-3x"></i>
                                <i className="far fa-laugh fa-3x"></i>
                            </div>
                            <div className="rating-container">
                                <i className="fas fa-star fa-2x active"></i>
                                <i className="fas fa-star fa-2x"></i>
                                <i className="fas fa-star fa-2x"></i>
                                <i className="fas fa-star fa-2x"></i>
                                <i className="fas fa-star fa-2x"></i>
                            </div>
                        </div>
                        </div>


                        <div className="mx-[20px]">
                        <div className="p-[10px] py-[20px] border-b-[1px] border-b-solid border-b-[rgba(0,0,0,0.15)]">
                            <h3 className="font-[poppins] text-[#FF7637] font-[500] text-[20px]">Review: </h3>
                        </div>
                            <form onSubmit={handleAddReview}>
                                <input type="hidden" value={ratingNum} />
                                <input type="hidden" value={batteryId} />
                                <input
								required
								type="text"
                                placeholder="Name"
                                value={reviewerName}
                                onChange={(e)=>setReviewerName(e.target.value)}
								className="border text-[16px] w-[90%] p-2 text-xl my-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.15)]"
							/>
                                 <input
								required
								type="text"
                                placeholder="Write a review"
                                onChange={(e) => setReviewContent(e.target.value)}
                                value={reviewContent}
								className="border text-[16px] w-[90%] p-2 text-xl my-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.15)]"
							/>         <button type="submit" className="btn-special-spread  py-[10px] px-[30px] my-[15px]  text-[15px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]">Publish....</button>
                           
                   
                            </form>
                        </div>

                        </div>

                    </div>

                </div>
            </section>

            <EnquirySection />
            <Footer />

            {/* modals */}
            {/* call back Request modal */}
            {showCallbackModal &&
                <div className="modal fixed w-[100%] h-[100%] bg-[rgba(0,0,0,0.5)] top-[0] z-[100] " tabIndex="-1" role="dialog">
                    <div style={{boxShadow:"0 5px 15px rgba(0,0,0,.5)"}} className="modal-dialog bg-[#fff] w-[59%] absolute top-[18%] left-[0] right-[0] mx-[auto] my-[0]" role="document">
                        <div className="modal-content px-[15px] py-[20px]">
                            <div className="modal-header flex justify-between">
                                <div>
                                <h5 className="modal-title text-[17px]">Let Us Call You Back</h5>
                                <span className="modal-title text-[15px] font-[200]">We will give you pure customer delight, Happy to help you.</span>
                                </div>
                                <button type="button" className="close h-[20px] w-[20px] text-[30px] text-[#00000054] mt-[-7px]" onClick={closeReviewModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <form onSubmit={handleCallbackRequest}>
                                
                                <div className="py-[10px]">
                                <span>  <i className='bg-[#ff7637] bx bxs-user text-[#fff] p-[10px] align-middle py-[10.9px]' style={{borderBottomLeftRadius:"5px", borderTopLeftRadius:"5px"}} ></i>
                                     <input type="text"
                                     value={name} onChange={(e)=>setName(e.target.value)}
                                      className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[92%]"
                                       placeholder="Name"/></span>
                                </div>
                                <div className="py-[10px]">
                                <span>  <i className='bg-[#ff7637] bx bx-mobile text-[#fff] p-[10px] align-middle py-[10.9px]' style={{borderBottomLeftRadius:"5px", borderTopLeftRadius:"5px"}} ></i>
                                     <input type="text"
                                     value={contactNum} onChange={(e)=>setContactNum(e.target.value)}
                                      className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[92%]"
                                       placeholder="Mobile Number"/></span>
                                </div>
                                <div className="py-[10px]">
                                <span>  <i className='bg-[#ff7637] bx bxs-map-pin text-[#fff] p-[10px] align-middle py-[10.9px]' style={{borderBottomLeftRadius:"5px", borderTopLeftRadius:"5px"}} ></i>
                                     <input type="text"
                                     value={city} onChange={(e)=>setCity(e.target.value)}
                                      className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[92%]"
                                       placeholder="City"/></span>
                                </div>
                                <div className="py-[10px]">
                                <span>  <i className='bg-[#ff7637] bx bxs-envelope text-[#fff] p-[10px] align-middle resize-none py-[20px]' style={{borderBottomLeftRadius:"5px", borderTopLeftRadius:"5px"}} ></i>
                                     <textarea 
                                     value={enquiry} onChange={(e)=>setEnquiry(e.target.value)}
                                     type="text" rows="2" className="align-middle py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[92%]"
                                       placeholder="Enquiry"></textarea></span>
                                </div>
                            <button type="submit" className="btn-special-spread  py-[10px] px-[30px] my-[15px]  text-[15px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]">Send</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            } 


{showQuotationModal &&
                <div className="modal fixed w-[100%] h-[100%] bg-[rgba(0,0,0,0.5)] top-[0] z-[100] " tabIndex="-1" role="dialog">
                    <div style={{boxShadow:"0 5px 15px rgba(0,0,0,.5)"}} className="modal-dialog bg-[#fff] w-[59%] absolute top-[18%] left-[0] right-[0] mx-[auto] my-[0]" role="document">
                        <div className="modal-content px-[15px] py-[20px]">
                            <div className="modal-header flex justify-between">
                                <div>
                                <h5 className="modal-title text-[17px]">Ask to Quotation</h5>
                                </div>
                                <button type="button" className="close h-[20px] w-[20px] text-[30px] text-[#00000054] mt-[-7px]" onClick={closeQuotationModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold uppercase tracking-wider">Image</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold uppercase tracking-wider">Item</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold uppercase tracking-wider">Quantity</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold uppercase tracking-wider">Price Per Qty</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                                        <figure className="w-[100px] border-[1px] solid border-[rgba(0,0,0,0.2) p-[10px]">
                                            <img src={`${backend_url}/images/${postData?.batteryimages}`} alt="battery image" />
                                        </figure>
                                            </td>
                                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">{batteryName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">    
                                        <input type="text"
                                     value={quantity} onChange={(e)=>setQuantity(e.target.value)}
                                      className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[100px]"
                                       placeholder="Quantity"/></td>
                                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">₹ {specialPrice}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                            <form onSubmit={handleQuotationRequest}>
                                
                                <div className="flex">
                                <div className="py-[10px] w-[50%]">
                                <span>  <i className='bg-[#ff7637] bx bxs-user text-[#fff] p-[10px] align-middle py-[10.9px]' style={{borderBottomLeftRadius:"5px", borderTopLeftRadius:"5px"}} ></i>
                                     <input type="text"
                                     value={name} onChange={(e)=>setName(e.target.value)}
                                      className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[92%]"
                                       placeholder="Name"/></span>
                                </div>
                                <div className="py-[10px] w-[50%]">
                                <span>  <i className='bg-[#ff7637] bx bx-mobile text-[#fff] p-[10px] align-middle py-[10.9px]' style={{borderBottomLeftRadius:"5px", borderTopLeftRadius:"5px"}} ></i>
                                     <input type="text"
                                     value={contactNum} onChange={(e)=>setContactNum(e.target.value)}
                                      className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[92%]"
                                       placeholder="Mobile Number"/></span>
                                </div>
                                </div>
                                <div className="flex">
                                <div className="py-[10px] w-[50%]">
                                <span>  <i className='bg-[#ff7637] bx bxs-envelope text-[#fff] p-[10px] align-middle py-[10.9px]' style={{borderBottomLeftRadius:"5px", borderTopLeftRadius:"5px"}} ></i>
                                     <input type="text"
                                     value={email} onChange={(e)=>setEmail(e.target.value)}
                                      className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[92%]"
                                       placeholder="Email ID"/></span>
                                </div>
                                <div className="py-[10px] w-[50%]">
                                <span>  <i className='bg-[#ff7637] bx bxs-business text-[#fff] p-[10px] align-middle py-[10.9px]' style={{borderBottomLeftRadius:"5px", borderTopLeftRadius:"5px"}} ></i>
                                     <input type="text"
                                     value={companyName} onChange={(e)=>setCompanyName(e.target.value)}
                                      className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[92%]"
                                       placeholder="Company Name"/></span>
                                </div>
                                </div>

                                <div className="flex">
                                <div className="py-[10px] w-[50%]">
                                <span>  <i className='bg-[#ff7637] bx bxs-map-pin text-[#fff] p-[10px] align-middle py-[10.9px]' style={{borderBottomLeftRadius:"5px", borderTopLeftRadius:"5px"}} ></i>
                                     <input type="text"
                                     value={city} onChange={(e)=>setCity(e.target.value)}
                                      className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[92%]"
                                       placeholder="City"/></span>
                                </div>
                                <div className="py-[10px] w-[50%]">
                                <span>  <i className='bg-[#ff7637] bx bxs-envelope text-[#fff] p-[10px] align-middle py-[10.9px]' style={{borderBottomLeftRadius:"5px", borderTopLeftRadius:"5px"}} ></i>
                                     <input type="text"
                                     value={query} onChange={(e)=>setquery(e.target.value)}
                                      className="py-[8px] text-[13px] focus:outline-none px-[10px] border-solid border-[1px] border-[rgba(0,0,0,0.2)] w-[92%]"
                                       placeholder="Query"/></span>
                                </div>
                                </div>
                            
                            <button type="submit" className="btn-special-spread  py-[10px] px-[30px] my-[15px]  text-[15px] font-[600] focus:outline-none bg-[#ff7637] text-white border-l-[8px] solid border-l-[#000]">Send Quotation</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
             }
        </>
    )
}
export default BuyBattery;