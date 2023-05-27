import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import API from "../api/api";

const ReviewDialog: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const { movieId } = useParams();

	const openDialog = () => {
		setIsOpen(true);
	};

	const closeDialog = () => {
		setIsOpen(false);
	};

	const handleRatingChange = (value: number) => {
		setRating(value);
	};

	const handleCommentChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		setComment(event.target.value);
	};

	const handleSubmit = async () => {
		if (rating === 0 || comment === "") {
			// Handle validation error
			toast.error("Error, try again later.");
			return;
		}

		// Process the rating and comment
		// ...

		const response = await API.put("/api/v2/movies/reviews/create", {
			movie_rated: movieId,
			movie_stars: rating,
			movie_comment: comment,
		});

		const status = response.status;
		if (status === 200) {
			toast.success("Thanks For reviewing the movie.");
		}

		// Reset the form
		setRating(0);
		setComment("");

		// Close the dialog
		closeDialog();
	};

	return (
		<>
			<button
				type="button"
				onClick={openDialog}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				Rate the Movie!
			</button>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed z-10 inset-0 overflow-y-auto"
					onClose={closeDialog}
					static
					open={isOpen}
				>
					<div className="flex items-center justify-center min-h-screen">
						<div className="bg-white rounded-lg p-8">
							<Dialog.Title className="text-2xl font-bold mb-4">
								Leave the Movie a Review
							</Dialog.Title>

							<div className="mb-4">
								<label htmlFor="rating" className="block mb-1">
									How many stars will you give?
								</label>
								<div className="flex items-center">
									{[1, 2, 3, 4, 5].map((value) => (
										<button
											key={value}
											type="button"
											onClick={() => handleRatingChange(value)}
											className={`mr-1 ${
												rating >= value ? "text-yellow-400" : "text-gray-400"
											}`}
										>
											⭐
										</button>
									))}
								</div>
							</div>

							<div className="mb-4">
								<label htmlFor="comment" className="block mb-1">
									Leave a Comment
								</label>
								<textarea
									id="comment"
									value={comment}
									onChange={handleCommentChange}
									className="w-full p-2 border border-gray-300 rounded"
								/>
							</div>

							<div className="flex justify-end">
								<button
									type="button"
									onClick={closeDialog}
									className="mr-2 px-4 py-2 border rounded"
								>
									Cancel
								</button>
								<button
									type="button"
									onClick={handleSubmit}
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								>
									Submit
								</button>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default ReviewDialog;
