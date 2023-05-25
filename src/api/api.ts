import axios from "axios";

const accessToken = localStorage.getItem("Token");

const API = axios.create({
	baseURL: "http://127.0.0.1:8000/",
	headers: {
		"Content-Type": "application/json",
		Authorization: accessToken ? `Bearer ${accessToken}` : null,
	},
});

API.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		if (typeof error.response === "undefined") {
			console.log("Network or Server Error");

			return Promise.reject(error);
		}
		if (error.response.status === 401) {
			return error.response;
		}

		return Promise.reject(error);
	},
);

export default API;
