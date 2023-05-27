import { useEffect, useState } from "react";
import API from "../api/api";
import { UserInfo } from "../api/types";

const useIsUserStaff = () => {
	const [isStaff, setIsStaff] = useState<boolean>(false);

	useEffect(() => {
		const checkIsStaff = async () => {
			const response = await API.get("authentication/users/me");
			const staff: UserInfo = response.data;

			if (staff.is_staff === true) {
				setIsStaff(true);
			}
		};

		checkIsStaff();
	}, []);

	return isStaff;
};

export default useIsUserStaff;
