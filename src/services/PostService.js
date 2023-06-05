import axios from 'axios';
const baseUrl = 'http://localhost:9091/e-auction/api/v1';
let config = {
	headers: {
	  'Content-Type': 'application/json',
	  'Access-Control-Allow-Origin': '*'
	  }
	}
//const loginId=localStorage.getItem('loginId');
class PostService {

	postTweet(product) {
		let loginId = localStorage.getItem('loginId');
		return axios.post(baseUrl + '/seller/add-product', product, config);
	}
	saveLike(username, id) {
		return axios.put(baseUrl + '/' + username + '/like/' + id);
	}
	getAllTweet() {
		return axios.get(baseUrl + '/seller/all');
	}
	showBids(id) {
		return axios.get(`${baseUrl}/seller/show-bids/${id}`)
	}
	getReplyTweet(productId) {
		return axios.get(`${baseUrl}/seller/show-bids/${productId}?productId=${productId}`);
	}
	saveReplyTweet(reply) {
		console.log("place-bid",reply);
		return axios.post(`${baseUrl}/buyer/place-bid`, reply);
	}
	updateBidAmount(id, email, newBidAmount) {
		return axios.put(`${baseUrl}/buyer/update-bid/${id}/${email}/${newBidAmount}`)
	}
	
	
	deleteProduct(id) {
		return axios.delete(baseUrl + '/seller' + '/delete/' + id);
	}
}
export default new PostService