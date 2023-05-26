import axios from "axios";

const API = axios.create({
	baseURL: "http://127.0.0.1:8000/",
});

API.interceptors.request.use((config) => {
	const accessToken = localStorage.getItem("accesstoken");
	config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
	return config;
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
