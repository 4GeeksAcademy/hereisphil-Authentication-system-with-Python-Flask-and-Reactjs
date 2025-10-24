import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const { store, dispatch } = useGlobalReducer();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function sendSignupRequest(e) {
        e.preventDefault();

        try {
            const response = await fetch(`${store.API_BASE_URL}/api/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const body = await response.json();

            if (response.ok) {
                const token = body.token;
                dispatch({
                    type: "authenticate",
                    payload: token,
                });
                toast.success("Welcome!")
                navigate("/private")
            } else {
                toast.error(`Signup was not successful: ${body.message || JSON.stringify(body)}`);
            }
        } catch (error) {
            toast.error(`Network error: ${error.message}`);
        }
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-6 pt-5">
                    <form onSubmit={sendSignupRequest}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                            <div id="emailHelp" className="form-text">
                                We'll never share your email with anyone else.
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-success">
                            Signup
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};