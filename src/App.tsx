import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import UserFavorites from "./components/Favourites";
import Login from "./components/Login";
import SignUpForm from "./components/SignUp";
import Movies from "./components/movies";
import MovieDetail from "./components/movies/MovieDetail";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Movies />} />
				<Route path="/login" element={<Login />} />
				<Route path="/movies/:movieId" element={<MovieDetail />} />
				<Route path="/signup" element={<SignUpForm />} />
				<Route path="/movies/favourites" element={<UserFavorites />} />
			</Routes>
			<Toaster position="bottom-right" />
		</BrowserRouter>
	);
}

export default App;
