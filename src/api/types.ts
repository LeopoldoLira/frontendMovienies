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

export interface Movies {
	pk: number;
	movie_title: string;
	movie_owner: number;
	movie_released_date: number;
	movie_genre: string;
	movie_plot: string;
	movie_image: string;
	movie_score: string;
	created_date: Date;
	updated_date: Date;
}
