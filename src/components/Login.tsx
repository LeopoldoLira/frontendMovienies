import { AxiosResponse } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import { Token } from "../api/types";

import Navbar from "./Navigation";

const LoginForm: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleFormSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			const response: AxiosResponse<Token> = await API.post(
				"authentication/jwt/create",
				{
					email,
					password,
				},
			);

			const { access } = response.data;

			// Store the JWT token in local storage
			localStorage.setItem("accesstoken", access);

			// Optionally, you can perform additional actions after successful authentication

			if (response.status === 200) {
				navigate("/");
			} else {
				toast.error("Login Failed, please try again");
			}

			// Redirect or update state to reflect successful authentication
		} catch (error) {
			// Handle error
		}
	};

	return (
		<>
			<Navbar />
			<div className="min-h-screen flex items-center justify-center bg-gray-900">
				<div className="max-w-md w-full bg-gray-800 p-6 rounded-lg">
					<h2 className="text-2xl font-semibold text-white mb-6">Login</h2>
					<form onSubmit={handleFormSubmit}>
						<div className="mb-4">
							<label className="block text-white">Email:</label>
							<input
								type="email"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								className="mt-1 px-3 py-2 block w-full rounded-md bg-gray-700 text-white"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-white">Password:</label>
							<input
								type="password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								className="mt-1 px-3 py-2 block w-full rounded-md bg-gray-700 text-white"
							/>
						</div>
						<button
							type="submit"
							className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
						>
							Login
						</button>
						<div className="text-center">
							<p className="text-white">
								Don't have an account yet? Create one{" "}
								<Link to="/signup" className="text-blue-500 hover:underline">
									here
								</Link>
								.
							</p>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default LoginForm;
