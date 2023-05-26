import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import API from "../../api/api";
import { Movies } from "../../api/types";
import Navbar from "../Navigation";

const MovieDetail: React.FC = () => {
	const { movieId } = useParams();
	const [movie, setMovie] = useState<Movies | null>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				const response = await API.get(`/api/v2/movies/${movieId}`);
				setMovie(response.data);
				setLoading(false);
			} catch (error) {
				// Handle error
				setLoading(false);
			}
		};

		fetchMovie();
	}, [movieId]);

	if (loading) {
		return (
			<div className="flex items-center mt-8 bg-gradient-to-br from-gray-500 to-gray-900 p-8 rounded-lg">
				<Skeleton
					width={96}
					height={144}
					className="rounded-lg shadow-lg mb-4"
				/>
				<div className="ml-8">
					<Skeleton
						width={240}
						height={36}
						className="text-3xl font-bold mb-4 text-white"
					/>
					<Skeleton
						count={3}
						width={160}
						height={24}
						className="bg-gray-200 text-gray-700 rounded-full mb-2"
					/>
				</div>
			</div>
		);
	}

	return (
		<>
			<Navbar />
			<div className="flex items-center mt-8 bg-gradient-to-br from-gray-500 to-gray-900 p-8 rounded-lg">
				<img
					src={movie?.movie_image}
					alt={movie?.movie_title}
					className="w-96 rounded-lg shadow-lg mb-4"
				/>
				<div className="ml-8">
					<h2 className="text-3xl font-bold mb-4 text-white">
						{movie?.movie_title}
					</h2>
					<p className="text-gray-300 mb-4 text-center">{movie?.movie_plot}</p>
					<div className="flex flex-wrap gap-2 justify-center">
						<span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full">
							{movie?.movie_genre}
						</span>
						<span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full">
							{movie?.movie_score}% out of 100%
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default MovieDetail;
