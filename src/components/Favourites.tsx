import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import API from "../api/api";
import { Favourites } from "../api/types";

const UserFavorites: React.FC = () => {
	const [favourites, setFavourites] = useState<Favourites[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchFavorites = async () => {
			try {
				const response = await API.get("/api/v2/movies/favourites");
				setFavourites(response.data);
				setLoading(false);
			} catch (error) {
				// Handle error
				setLoading(false);
			}
		};

		fetchFavorites();
	}, []);

	const handleRemoveFavorite = async (movieId: number) => {
		try {
			await API.delete(`/api/v2/movies/favourites/${movieId}`);
			setFavourites((prevFavorites) =>
				prevFavorites.filter((favorite) => favorite.id !== movieId),
			);
			toast.success("Favourite Successfully removed.");
		} catch (error) {
			// Handle error
			toast.error("Unable to remove Favourite, Internal Server Error.");
		}
	};

	if (loading) {
		return <div className="flex justify-center min-h-screen">Loading...</div>;
	}

	return (
		<div className="flex flex-col min-h-screen">
			<div className="flex-grow p-8">
				{favourites.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
						{favourites.map((favourite) => (
							<div key={favourite.movie_id} className="relative">
								<Link to={`/movies/${favourite.movie_id}`}>
									<img
										src={"/no-preview.png"}
										alt={favourite.movie_title}
										className="object-cover w-full h-full rounded-md transition-all duration-300 filter brightness-100 hover:brightness-50"
									/>
								</Link>
								<div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-75 p-4 rounded-b-md">
									<h3 className="text-xl font-semibold mb-2 text-white">
										{favourite.movie_title}
									</h3>
								</div>
								<div className="flex justify-center p-3">
									<button
										type="button"
										className="bg-red-500 text-center hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
										onClick={() => handleRemoveFavorite(favourite.id)}
									>
										Remove
									</button>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="flex justify-center min-h-screen">
						<p className="text-white text-center text-lg mt-4">
							No favourite movies yet.
						</p>
					</div>
				)}
			</div>
			<Toaster position="bottom-right" />
		</div>
	);
};

export default UserFavorites;
