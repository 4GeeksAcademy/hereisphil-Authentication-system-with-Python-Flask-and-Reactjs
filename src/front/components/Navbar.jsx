import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();
	async function sendLogoutRequest(e) {
		e.preventDefault();

		try {
			const response = await fetch(`${store.API_BASE_URL}/api/logout`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: "Logout request received.",
				}),
			});

			const body = await response.json();

			if (response.ok) {
				dispatch({
					type: "logout",
				});
				toast.success("See you next time!");
				navigate("/");
			} else {
				toast.error(
					`Logout was not successful: ${body.message || JSON.stringify(body)}`
				);
			}
		} catch (error) {
			toast.error(`Network error: ${error.message}`);
		}
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">JWT Auth</span>
				</Link>
				<div className="ml-auto d-flex gap-4">
					<Link to="/signup" className="btn btn-success">
						Signup
					</Link>
					<Link to="/login" className="btn btn-primary">
						Login
					</Link>
					<button type="submit" onClick={(e) => sendLogoutRequest(e)}>Logout</button>
				</div>
			</div>
		</nav>
	);
};