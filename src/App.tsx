import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import UserFavorites from "./components/Favourites";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Navbar from "./components/Navigation";
import SignUpForm from "./components/SignUp";
import Movies from "./components/movies";
import CreateMovie from "./components/movies/MovieCreation";
import MovieDetail from "./components/movies/MovieDetail";

function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Movies />} />
					<Route path="/login" element={<Login />} />
					<Route path="/movies/:movieId" element={<MovieDetail />} />
					<Route path="/signup" element={<SignUpForm />} />
					<Route path="/movies/favourites" element={<UserFavorites />} />
					<Route path="/movies/create" element={<CreateMovie />} />
				</Routes>
				<Footer />
				<Toaster position="bottom-right" />
			</BrowserRouter>
		</>
	);
}

export default App;
