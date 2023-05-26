import { useEffect, useState } from "react";
import API from "../api/api";

const useIsUserAuthenticated = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		const checkIsAuthenticated = async () => {
			const response = await API.get("authentication/users/me");
			const status = response.status;

			if (status === 200) {
				setIsAuthenticated(true);
			}
		};

		checkIsAuthenticated();
	}, []);

	return isAuthenticated;
};

export default useIsUserAuthenticated;
