import { Ripples } from "@uiball/loaders";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/api";
import { Movies } from "../../api/types";

const MovieContainer: React.FC = () => {
	const fallbackMovieImage = "/no-preview.png";

	const [movies, setMovies] = useState<Movies[]>([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const response = await API.get("/api/v2/movies");
				setMovies(response.data);
				setLoading(false);
			} catch (error) {
				// Handle error
			}
		};

		fetchMovies();
	}, []);
	if (loading) {
		return (
			<div className="flex items-center justify-center p-8 h-screen">
				<Ripples size={150} speed={5} color="white" />;
			</div>
		);
	}

	// Function to handle image loading errors and set fallback image
	const handleImageError = (
		event: React.SyntheticEvent<HTMLImageElement, Event>,
	) => {
		event.currentTarget.src = fallbackMovieImage;
	};

	return (
		<>
			<div className="flex justify-center p-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
					{movies.map((movie) => (
						<div key={movie.pk} className="relative">
							<Link to={`movies/${movie.pk}`}>
								<img
									src={movie.movie_image || fallbackMovieImage}
									alt={movie.movie_title}
									className="object-cover w-full h-full rounded-md transition-all duration-300 filter brightness-100 hover:brightness-50"
									onError={handleImageError}
								/>
							</Link>
							<div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-75 p-4 rounded-b-md">
								<h3 className="text-xl font-semibold mb-2 text-white">
									{movie.movie_title}
								</h3>
								<p className="text-gray-300">{movie.movie_released_date}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default MovieContainer;
