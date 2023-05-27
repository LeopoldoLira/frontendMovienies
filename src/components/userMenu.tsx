import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import useIsUserStaff from "../hooks/useIsUserStaff";

const DropdownMenu = () => {
	const navigate = useNavigate();

	const userName = localStorage.getItem("name");
	const isStaff = useIsUserStaff();
	const logout = () => {
		localStorage.removeItem("accesstoken");
		localStorage.removeItem("name");
		navigate("/login");
	};
	return (
		<Menu>
			{({ open }) => (
				<>
					<Menu.Button className="bg-gray-800 px-4 py-2 rounded-md text-white focus:outline-none">
						{userName} ⬇️
					</Menu.Button>
					<Transition
						show={open}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items
							static
							className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
						>
							<div className="py-1">
								<Menu.Item>
									{({ active }) => (
										<button
											type="button"
											onClick={() => logout()}
											className={`${
												active ? "bg-gray-100 text-center" : ""
											} block px-4 py-2 text-sm text-gray-700`}
										>
											Logout ❌
										</button>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<Link
											to="/movies/favourites"
											className={`${
												active ? "bg-gray-100" : ""
											} block px-4 py-2 text-sm text-gray-700`}
										>
											My Favourites ❤️
										</Link>
									)}
								</Menu.Item>
								{isStaff ? (
									<Menu.Item>
										{({ active }) => (
											<Link
												to="/movies/create"
												className={`${
													active ? "bg-gray-100" : ""
												} block px-4 py-2 text-sm text-gray-700`}
											>
												Create a Movie 🍿
											</Link>
										)}
									</Menu.Item>
								) : null}
							</div>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
};

export default DropdownMenu;
