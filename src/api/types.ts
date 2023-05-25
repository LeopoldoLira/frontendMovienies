export interface UserInfo {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	is_staff: boolean;
}

export interface Token {
	refresh: string;
	access: string;
}
