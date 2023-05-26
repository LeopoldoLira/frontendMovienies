import { Link } from "react-router-dom";
import useIsUserAuthenticated from "../hooks/useIsUserAuthenticated";
import DropdownMenu from "./userMenu";

const Navbar = () => {
	const isAuthenticated = useIsUserAuthenticated();

	return (
		<nav className="bg-gray-900 text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex-shrink-0">
						<Link to="/">
							<span className="text-xl font-bold">Movienies.</span>
						</Link>
					</div>
					<div className="hidden sm:block">
						<div className="ml-4 flex space-x-4">
							<Link
								to="/"
								className="px-3 py-2 rounded-md text-sm font-medium hover:text-gray-300"
							>
								Home
							</Link>
						</div>
					</div>
					<div className="hidden sm:block z-50">
						{isAuthenticated ? (
							<DropdownMenu />
						) : (
							<Link
								to="/login"
								className="px-4 py-2 rounded-md text-sm font-medium bg-gray-700 hover:bg-gray-800"
							>
								Log in
							</Link>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
