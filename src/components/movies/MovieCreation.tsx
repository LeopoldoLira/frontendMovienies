import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import Footer from "../Footer";
import Navbar from "../Navigation";

const CreateMovie: React.FC = () => {
	const [title, setTitle] = useState("");
	const [released, setReleased] = useState("");
	const [genre, setGenre] = useState("");
	const [plot, setPlot] = useState("");
	const [image, setImage] = useState<File | null>(null);

	const navigate = useNavigate();

	const handleCreateMovie = async () => {
		try {
			const formData = new FormData();
			formData.append("movie_title", title);
			formData.append("movie_released_date", released);
			formData.append("movie_genre", genre);
			formData.append("movie_plot", plot);
			if (image) {
				formData.append("movie_image", image);
			}

			const response = await API.put("/api/v2/movies/create", formData);

			// Handle success
			if (response.status === 200) {
				toast.success("Movie successfully created");
				navigate("/");
			}
		} catch (error) {
			// Handle error
			toast.error("Unable to add movie.");
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setImage(e.target.files[0]);
		}
	};

	return (
		<>
			<Navbar />

			<div className="container mx-auto px-4 py-8 shadow-lg  flex justify-center">
				<form className="w-2/5">
					<h2 className="text-2xl font-bold mb-4">Create a Movie</h2>
					<div className="flex flex-col gap-4">
						<label htmlFor="title" className="text-lg text-white">
							Title:
						</label>
						<input
							type="text"
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="border border-gray-300 rounded-lg px-3 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>

						<label htmlFor="released" className="text-lg text-white">
							Released:
						</label>
						<input
							type="text"
							id="released"
							value={released}
							onChange={(e) => setReleased(e.target.value)}
							className="border border-gray-300 rounded-lg px-3 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>

						<label htmlFor="genre" className="text-lg text-white">
							Genre:
						</label>
						<input
							type="text"
							id="genre"
							value={genre}
							onChange={(e) => setGenre(e.target.value)}
							className="border border-gray-300 rounded-lg px-3 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>

						<label htmlFor="plot" className="text-lg text-white">
							Plot:
						</label>
						<textarea
							id="plot"
							value={plot}
							onChange={(e) => setPlot(e.target.value)}
							className="border border-gray-300 rounded-lg px-3 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>

						<label htmlFor="image" className="text-lg text-white">
							Image:
						</label>
						<input
							type="file"
							id="image"
							accept="image/*"
							onChange={handleImageChange}
							className="border border-gray-300 rounded-lg px-3 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
						/>

						<button
							type="submit"
							onClick={handleCreateMovie}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Create Movie
						</button>
					</div>
				</form>
			</div>
			<Footer />
		</>
	);
};

export default CreateMovie;
