import React, {createContext, useEffect, useState} from "react";
import ReactGA from "react-ga4";
import {BrowserRouter as Router , Routes ,Route, Navigate} from 'react-router-dom'
import Home from "./components/Home";
import BuyBattery from "./components/BuyBattery";
import Login from "./components/auth/Login";
import Cart from "./components/Checkout/Cart";
import Checkout from "./components/Checkout/Checkout";
import Confirm from "./components/Checkout/Confirm";
import axios from "axios";
import Success from "./components/Checkout/Success";
import CmnPg from "./components/auth/LoginRegisterPg"; 
import UnderConstruction from "./components/common/UnderConstruction";
import Wishlist from "./components/Wishlist";
import { batteryIndoreDataService } from "./services/dataService";
import Categories from "./components/Categories";
import ScrollToTop from "./components/common/Autoscroll";
import BatteryCategoryBrands from "./components/staticPages/BatteryCategoryBrands";
import CategoryModels from "./components/common/CategoryModels";
import FormikTest from "./components/test/FormikTest";
import Products from "./components/Products";
import log from "./utils/utilityFunctions";
import PrivacyPolicy from "./components/staticPages/PrivacyPolicy";
import OffersPage from "./components/staticPages/OffersPage";
import FaqPage from "./components/staticPages/Faq";
import AboutUs from "./components/staticPages/AboutUsPage";
import Warrantyregisteration from "./components/staticPages/Warrantyregisteration";
import ContactUsPage from "./components/staticPages/ContactUs";
import {GoogleOAuthProvider} from '@react-oauth/google'
import OrderDetailsPage from "./components/common/OrderDetailsPage";
import CurrentOrders from "./components/Checkout/CurrentOrders";
import NotYetShipped from "./components/Checkout/NotYetShipped";
import CancelledOrders from "./components/Checkout/CancelledOrders";
import OrderHistory from "./components/Checkout/OrderHistory";
import OrdersBatch from "./components/Checkout/OrdersBatch";
import TrackOrder from "./components/Checkout/TrackOrder";
import Invoice from "./components/Checkout/Invoice";
import NotFound from "./components/common/NotFound";
import Forgot from "./components/auth/Forgot";
import ScrollToTopButton from "./components/common/ScrolltoTopBtn";


export const LoginContext = createContext(null);
ReactGA.initialize("G-T1BELDPMQH");

function App(){
	const [loginStatus, setLoginStatus] = useState(null);
	const [showCartBadge, setShowCartBadge] = useState(false);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-T1BELDPMQH');

	async function autoLogin() {
		try {
			log("AUTO LOGGING FUNCTION CALLED");
			const response = await batteryIndoreDataService.loginCheck();
			if(response.status === 200){
				if(response.data?.success){
					setLoginStatus(response.data?.userData)
				} 
			}
		} catch (error) {
			log(error);
		}
	}
	async function awaiter() {
		await autoLogin();
	}

	useEffect(()=>{
	awaiter()
	},[])

  return(
	<>
	  <LoginContext.Provider value={{loginStatus, setLoginStatus, showCartBadge, setShowCartBadge}}>
		<GoogleOAuthProvider clientId="477883532415-refshp5bua8ecnrjmqd4ocgfvnmb6v0e.apps.googleusercontent.com">
		<Router>
			<ScrollToTop/>

		<Routes>
			{/* {/ STATIC ROUTES /} */}
			<Route path="/" element={<Home />} />
			<Route path="/categories" element={<Categories />} />
			<Route path="/wishlist" element={<Wishlist />} />
			<Route path="/under-construction" element={<UnderConstruction />} />
			<Route path="/privacy-policy" element={<PrivacyPolicy />} />
			<Route path="/offers" element={<OffersPage />} />
			<Route path="/faq" element={<FaqPage />} />
			<Route path="/about-us" element={<AboutUs />} />
			<Route path="/warranty-registeration" element={<Warrantyregisteration />} />
			<Route path="/contact-us" element={<ContactUsPage />} />


			{/* {/ NEW ROUTES  /} */}
			
			<Route path="/buy-battery/:batterySlug" element={<BuyBattery />} />
			<Route path="/categories" element={<Categories />} />
			<Route path="/categories/:batteryCategory/models/:brandName" element={<CategoryModels />} />
			<Route path="/categories/:batteryCategory" element={<BatteryCategoryBrands />} />
			<Route path="/categories/:batteryCategory/:brandName/*" element={<Products />} />


			{/* {/ CHECKOUT FLOW /} */}


			<Route path="/cart" element={<Cart />} />
			<Route path="/confirm" element={<Confirm /> } />
			<Route path="/success" element={<Success /> } />

			<Route path="/track-package" element={<TrackOrder /> } />
			<Route path="/order-details" element={<OrderDetailsPage /> } />
			<Route path="/orders" element={<OrderHistory /> } >
				<Route path="current/ordered-items" element={<OrdersBatch /> } />
				<Route path="current" element={<CurrentOrders /> } />
				<Route path="not-yet-shipped" element={<NotYetShipped /> } />
				<Route path="cancelled" element={<CancelledOrders /> } />
			</Route>
			<Route path="/order/invoice" element={<Invoice /> } />

			{/* {/ AUTH ROUTES /} */}

			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<CmnPg />} />
			<Route path="/forgot-password" element={<Forgot />} />
			<Route path="*" element={<NotFound />} />
			
		</Routes>
		</Router>
	</GoogleOAuthProvider>
	</LoginContext.Provider>
	<ScrollToTopButton />
	</>
  )
}

export default App;