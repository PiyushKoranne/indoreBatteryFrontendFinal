import axios from "axios";
axios.defaults.withCredentials = true;
const backend_url = "https://batterybackend.react.stagingwebsite.co.in"

class DataService {
	constructor(){
		// constructor implementation pending
		// 
		// 
		// 
		// 
		// 
		// 
		// 
		// 
		// 
	}

	loginCheck() {
		const response = axios.get(`${backend_url}/api/v1/manage/auth/login-check`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
		return response;
	}

	getLandingPageContent() {
		return axios.get(`${backend_url}/api/v1/manage/get-page-content?pagename=Landing`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}

	getContactDetails() {
		return axios.get(`${backend_url}/api/v1/manage/get-contact-details`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		})
	}

	getInverterSlugs() {
		return axios.post(`${backend_url}/api/v1/manage/get-inverter-slugs`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}

	getAllBatteryBrands() {
		return axios.get(`${backend_url}/api/v1/manage/get-all-battery-brands`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}
	getAllCarBatteryBrands() {
		return axios.get(`${backend_url}/api/v1/manage/get-all-car-battery-brands`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}

	handleUserLogout() {
		return axios.get(`${backend_url}/api/v1/manage/auth/user-logout`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}
	sendPasswordResetOTP(email) {
		return axios.post(`${backend_url}/api/v1/manage/auth/initiate-password-reset`, {
			email
		}, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}
	resetPassword(values) {
		return axios.post(`${backend_url}/api/v1/manage/auth/password-reset`, {...values}, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}
	getAllCarBrands() {
		return axios.get(`${backend_url}/api/v1/manage/get-all-car-brands`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}
	getAllTwoWheelerBrands() {
		return axios.get(`${backend_url}/api/v1/manage/battery-type/two-wheeler-batteries`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}
	getAllInverterBrands() {
		return axios.get(`${backend_url}/api/v1/manage/battery-type/inverter-batteries`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}

	makeCallbackRequest(data) {
		return axios.post(`${backend_url}/api/v1/manage/request-callback`, {
			...data
		}, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		})
	}

	getFormValidationData( data ) { 
		return axios.post(`${backend_url}/api/v1/manage/validate-form-data`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		})
	}

	getCarsByBrand(selectedCarBrand) {
		return axios.post(`${backend_url}/api/v1/manage/get-cars`, {
			brandName: selectedCarBrand
		}, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}

	getAllBatteries() {
		return axios.get(`${backend_url}/api/v1/manage/get-all-batteries`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}

	getBattery(postName) {
		return axios.get(`${backend_url}/api/v1/manage/get-battery/${encodeURIComponent(postName)}`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}

	getBatteryById(postId) {
		return axios.get(`${backend_url}/api/v1/manage/get-battery-by-id/${encodeURIComponent(postId)}`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}

	getBatteriesByBrand(brandName) {
		return axios.get(`${backend_url}/api/v1/manage/get-batteries-by-brand/${brandName}`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}

	getInverters(brandName) {
		return axios.get(`${backend_url}/api/v1/manage/get-inverter-batteries/${brandName}`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}

	getInvertersAndHomeUps(brandName) {
		return axios.get(`${backend_url}/api/v1/manage/get-inverter-and-home-ups/${brandName}`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		})
	}

	getHeavyEngineBatteries(brandName) {
		return axios.get(`${backend_url}/api/v1/manage/get-heavy-engine-batteries/${brandName}`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		})
	}

	getVrlaSmfBatteries(brandName) {
		return axios.get(`${backend_url}/api/v1/manage/get-vrla-smf-batteries/${brandName}`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}

	getInverterBatteryCombos(brandName) {
		return axios.get(`${backend_url}/api/v1/manage/get-inverter-battery-combos/${brandName}`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}
	
	findInverters(state) {
		return axios.post(`${backend_url}/api/v1/manage/find-inverters`, {state}, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}
	
	findInverterAndBatteryCombos(state) {
		return axios.post(`${backend_url}/api/v1/manage/find-inverter-battery-combos`, {state}, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}

	findBattery(state) {
		return axios.post(`${backend_url}/api/v1/manage/find-battery`,state, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		})
	}

	findBatteriesByEquipment(state){
		return axios.post(`${backend_url}/api/v1/manage/find-batteries-by-equipment`, state, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		})
	}

	getWishlist() {
		return axios.get(`${backend_url}/api/v1/manage/get-wishlist`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}

	addToWishlist(batteryId) {
		return axios.post(`${backend_url}/api/v1/manage/add-to-wishlist`,{
			batteryId
		}, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}

	removeFromWishlist(batteryId){
		return axios.post(`${backend_url}/api/v1/manage/remove-from-wishlist`,{
			batteryId
		}, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}

	getAllCategories() {
		return axios.get(`${backend_url}/api/v1/manage/get-all-battery-categories`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		})
	}

	addToCart(batteryId, quantity, exchangeBattery) {
		return axios.post(`${backend_url}/api/v1/manage/add-to-cart`, {
			batteryId: batteryId,
			quantity: quantity,
			exchangeOldBattery: exchangeBattery
		}, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		})
	}
	findInverterBatteries(state) {
		
		return axios.post(`${backend_url}/api/v1/manage/filter-inverter-batteies`, {
			...state
		}, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		})
	}

	getAllWarranties() {
		return axios.get(`${backend_url}/api/v1/manage/get-all-warranties`, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		});
	}

	registerWarranty(data) {
		return axios.post(`${backend_url}/api/v1/manage/register-warranty`, {
			data,
		}, {
			headers:{
				"Authorization":`Bearer ${localStorage.getItem('ibjwtoken')}`
			}
		})
	}
}


export const batteryIndoreDataService = new DataService();
