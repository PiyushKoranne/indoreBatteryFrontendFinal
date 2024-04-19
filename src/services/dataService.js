import axios from "axios";
axios.defaults.withCredentials = true;
const backend_url = "https://batterybackend.react.stagingwebsite.co.in"

class DataService {
	constructor(){
		// constructor implementation pending
	}

	loginCheck() {
		const response = axios.get(`${backend_url}/api/v1/manage/auth/login-check`);
		return response;
	}

	getLandingPageContent() {
		return axios.get(`${backend_url}/api/v1/manage/get-page-content?pagename=Landing`);
	}

	getContactDetails() {
		return axios.get(`${backend_url}/api/v1/manage/get-contact-details`)
	}

	getInverterSlugs() {
		return axios.post(`${backend_url}/api/v1/manage/get-inverter-slugs`);
	}

	getAllBatteryBrands() {
		return axios.get(`${backend_url}/api/v1/manage/get-all-battery-brands`);
	}
	getAllCarBatteryBrands() {
		return axios.get(`${backend_url}/api/v1/manage/get-all-car-battery-brands`);
	}

	handleUserLogout() {
		return axios.get(`${backend_url}/api/v1/manage/auth/user-logout`);
	}
	sendPasswordResetOTP(email) {
		return axios.post(`${backend_url}/api/v1/manage/auth/initiate-password-reset`, {
			email
		});
	}
	resetPassword(values) {
		return axios.post(`${backend_url}/api/v1/manage/auth/password-reset`, {...values});
	}
	getAllCarBrands() {
		return axios.get(`${backend_url}/api/v1/manage/get-all-car-brands`);
	}
	getAllTwoWheelerBrands() {
		return axios.get(`${backend_url}/api/v1/manage/battery-type/two-wheeler-batteries`);
	}
	getAllInverterBrands() {
		return axios.get(`${backend_url}/api/v1/manage/battery-type/inverter-batteries`);
	}

	makeCallbackRequest(data) {
		return axios.post(`${backend_url}/api/v1/manage/request-callback`, {
			...data
		})
	}

	getFormValidationData( data ) { 
		return axios.post(`${backend_url}/api/v1/manage/validate-form-data`)
	}

	getCarsByBrand(selectedCarBrand) {
		return axios.post(`/api/v1/manage/get-cars`, {
			brandName: selectedCarBrand
		});
	}

	getAllBatteries() {
		return axios.get(`${backend_url}/api/v1/manage/get-all-batteries`);
	}

	getBattery(postName) {
		return axios.get(`${backend_url}/api/v1/manage/get-battery/${encodeURIComponent(postName)}`);
	}

	getBatteriesByBrand(brandName) {
		return axios.get(`${backend_url}/api/v1/manage/get-batteries-by-brand/${brandName}`);
	}

	getInverters(brandName) {
		return axios.get(`${backend_url}/api/v1/manage/get-inverter-batteries/${brandName}`);
	}

	getInvertersAndHomeUps(brandName) {
		return axios.get(`${backend_url}/api/v1/manage/get-inverter-and-home-ups/${brandName}`)
	}

	getHeavyEngineBatteries(brandName) {
		return axios.get(`${backend_url}/api/v1/manage/get-heavy-engine-batteries/${brandName}`)
	}

	getVrlaSmfBatteries(brandName) {
		return axios.get(`${backend_url}/api/v1/manage/get-vrla-smf-batteries/${brandName}`);
	}

	getInverterBatteryCombos(brandName) {
		return axios.get(`${backend_url}/api/v1/manage/get-inverter-battery-combos/${brandName}`);
	}
	
	findInverters(state) {
		return axios.post(`${backend_url}/api/v1/manage/find-inverters`, {state});
	}

	findBattery(state) {
		return axios.post(`${backend_url}/api/v1/manage/find-battery`,state)
	}

	findBatteriesByEquipment(state){
		return axios.post(`${backend_url}/api/v1/manage/find-batteries-by-equipment`, state)
	}

	getWishlist() {
		return axios.get(`${backend_url}/api/v1/manage/get-wishlist`);
	}

	addToWishlist(batteryId) {
		return axios.post(`${backend_url}/api/v1/manage/add-to-wishlist`,{
			batteryId
		});
	}

	removeFromWishlist(batteryId){
		return axios.post(`${backend_url}/api/v1/manage/remove-from-wishlist`,{
			batteryId
		});
	}

	getAllCategories() {
		return axios.get(`${backend_url}/api/v1/manage/get-all-battery-categories`)
	}

	addToCart(batteryId, quantity, exchangeBattery) {
		return axios.post(`${backend_url}/api/v1/manage/add-to-cart`, {
			batteryId: batteryId,
			quantity: quantity,
			exchangeOldBattery: exchangeBattery
		})
	}
	findInverterBatteries(state) {
		
		return axios.post(`${backend_url}/api/v1/manage/filter-inverter-batteies`, {
			...state
		})
	}

	getAllWarranties() {
		return axios.get(`${backend_url}/api/v1/manage/get-all-warranties`);
	}

	registerWarranty(data) {
		return axios.post(`${backend_url}/api/v1/manage/register-warranty`, {
			data,
		})
	}
}


export const batteryIndoreDataService = new DataService();
