import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/api";
import { Comment, Movies } from "../../api/types";
import useIsUserAuthenticated from "../../hooks/useIsUserAuthenticated";
import ReviewDialog from "../Rate";

import useIsUserStaff from "../../hooks/useIsUserStaff";

const MovieDetail: React.FC = () => {
	const { movieId } = useParams();
	const [movie, setMovie] = useState<Movies | null>();
	const [loading, setLoading] = useState<boolean>(true);
	const [comment, setComments] = useState<Comment[]>();
	const isAuthenticated = useIsUserAuthenticated();
	const navigate = useNavigate();

	const isStaff = useIsUserStaff();

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				const response = await API.get(`/api/v2/movies/${movieId}`);
				setMovie(response.data);
			} catch (error) {
				// Handle error
				setLoading(true);
			} finally {
				setLoading(false);
			}
		};

		const fetchComment = async () => {
			try {
				const response: AxiosResponse<Comment[]> = await API.get(
					`/api/v2/movies/reviews/${movieId}`,
				);
				const comments = response.data;
				setComments(comments);
			} catch {
				//handle error
			}
		};

		fetchMovie();
		fetchComment();
	}, [movieId, comment]);

	const handleAddFavorite = async () => {
		try {
			if (movie) {
				await API.post("/api/v2/movies/favourites/add", { movie_id: movieId });
				// Add logic to update favorite state or show toast message
				toast.success("Movie added to favourites");
				navigate("/movies/favourites");
			}
		} catch (error) {
			// Handle error
		}
	};

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
			<div className="grid grid-cols-1 gap-8 gap-y-[10rem] items-center mt-8 p-8 rounded-lg">
				<div className="flex items-center gap-5">
					<img
						src={movie?.movie_image}
						alt={movie?.movie_title}
						className="w-96 rounded-lg shadow-lg mr-8"
					/>
					<div className="flex flex-coSl items-center md:items-start text-center md:text-left">
						<h2 className="text-3xl font-bold mb-4 text-white">
							{movie?.movie_title}
						</h2>
						<p className="text-gray-300 mb-4 text-center">
							{movie?.movie_plot}
						</p>
						<div className="flex flex-wrap gap-2 justify-center">
							<span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full">
								{movie?.movie_genre}
							</span>
							<span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full">
								{movie?.movie_score}% out of 100%
							</span>
						</div>
						{isAuthenticated ? (
							<button
								type="button"
								onClick={handleAddFavorite}
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
							>
								Add to Favourites ❤️
							</button>
						) : null}
						{isAuthenticated ? <ReviewDialog /> : null}

						{isStaff ? (
							<div className="flex justify-left flex-col w-2/12">
								<button
									type="button"
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
								>
									Delete Movie
								</button>
								<button
									type="button"
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
								>
									Update Movie
								</button>
							</div>
						) : null}
					</div>
				</div>
				<div className="max-w-2xl">
					<h3 className="text-xl md:text-2xl text-white font-bold mb-4">
						Comments
					</h3>
					{comment && comment.length > 0 ? (
						<ul className="bg-gray-900 rounded-lg p-4">
							{comment.map((comment: Comment) => (
								<li key={comment.pk} className="text-gray-300 mb-2">
									<span className="font-bold">{comment.movie_rated_owner}</span>
									: {comment.movie_comment}
								</li>
							))}
						</ul>
					) : (
						<p className="text-gray-300">No comments yet.</p>
					)}
				</div>
			</div>
		</>
	);
};

export default MovieDetail;
