import { Link } from "react-router-dom";

export const Navbar = () => {

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
				</div>
			</div>
		</nav>
	);
};