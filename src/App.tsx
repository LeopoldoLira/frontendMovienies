import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Movies from "./components/movies";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Movies />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
