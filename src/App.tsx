import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Movies from "./components/movies";
import MovieDetail from "./components/movies/MovieDetail";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Movies />} />
				<Route path="/login" element={<Login />} />
				<Route path="/movies/:movieId" element={<MovieDetail />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
