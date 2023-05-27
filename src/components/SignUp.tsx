import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import Footer from "./Footer";
import Navbar from "./Navigation";

const SignUpForm: React.FC = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [first_name, setFirst_name] = useState("");
	const [last_name, setLast_name] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission logic here

		try {
			const formData = new FormData();
			formData.append("email", email);
			formData.append("username", username);
			formData.append("password", password);
			formData.append("first_name", first_name);
			formData.append("last_name", last_name);

			const response = await API.post("authentication/users/", formData);

			if (response.status === 201) {
				navigate("/login");
			} else {
				toast.error("Unable to create user, please try again");
			}
		} catch {
			// toast.error("Unable to create user, please try again");
		}
	};

	return (
		<>
			<Navbar />
			<div className="flex justify-center items-center min-h-screen bg-gray-100">
				<div className="w-full max-w-md">
					<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="email"
							>
								Email
							</label>
							<input
								className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="email"
								type="email"
								name="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="username"
							>
								Username
							</label>
							<input
								className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="username"
								type="text"
								name="username"
								placeholder="Choose a username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</div>
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="password"
							>
								Password
							</label>
							<input
								className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="password"
								type="password"
								name="password"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="first_name"
							>
								First Name
							</label>
							<input
								className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="first_name"
								type="text"
								name="first_name"
								placeholder="Enter your first name"
								value={first_name}
								onChange={(e) => setFirst_name(e.target.value)}
								required
							/>
						</div>
						<div className="mb-6">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="last_name"
							>
								Last Name
							</label>
							<input
								className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="last_name"
								type="text"
								name="last_name"
								placeholder="Enter your last name"
								value={last_name}
								onChange={(e) => setLast_name(e.target.value)}
								required
							/>
						</div>
						<div className="flex items-center justify-center">
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								type="submit"
								onClick={handleSubmit}
							>
								Sign Up
							</button>
						</div>
						<div className="text-center p-5">
							<p className="text-grey-600">
								Aready have an account yet? Log in{" "}
								<Link to="/login" className="text-blue-500 hover:underline">
									here
								</Link>
								.
							</p>
						</div>
					</form>
				</div>
			</div>
			<Footer />
			<Toaster position="top-center" reverseOrder={false} />
		</>
	);
};

export default SignUpForm;
