import { useEffect } from "react";
import toast from "react-hot-toast";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Navigate, useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();

    const { store, dispatch } = useGlobalReducer();
    useEffect(() => {
        if (store.token == undefined) {
            navigate("/login");
        }
    }, [store.token]);

    async function getPrivateContent() {
        const url = `${store.API_BASE_URL}/api/private-content`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${store.token}`
            }
        });

        if (response.status == 401) {
            navigate("/login")
        }

        const body = await response.json();
        const content = body.content;
        dispatch({
            type: "set_private_content",
            payload: content
        })
    };

    useEffect(() => {
        // small confetti effect using DOM (no external libs)
        const colors = ["#ff6b6b", "#ffd93d", "#6bcB77", "#4d96ff", "#b86bff"];
        const container = document.getElementById("confetti-container");
        if (!container) return;
        const pieces = 40;
        for (let i = 0; i < pieces; i++) {
            const el = document.createElement("div");
            el.className = "confetti";
            el.style.left = `${Math.random() * 100}%`;
            el.style.background = colors[Math.floor(Math.random() * colors.length)];
            el.style.transform = `rotate(${Math.random() * 360}deg)`;
            el.style.animationDelay = `${Math.random() * 2}s`;
            container.appendChild(el);
        }

        // clean up on unmount
        return () => {
            if (container) container.innerHTML = "";
        };
    }, []);

    return (
        <main className="container py-5">
            <div className="row align-items-center">
                <div className="col-md-6 text-center text-md-start">
                    <h1 className="display-4 fw-bold mb-3">Welcome to Your Playground!</h1>
                    <p className="lead text-muted mb-4">
                        A colorful, lightweight welcome page to celebrate your <strong>private area</strong>.
                        No forms, no nav — just fun vibes and smooth micro-interactions.
                    </p>
                    <button
                        type="button"
                        className="btn btn-danger my-3"
                        onClick={() => getPrivateContent()}>
                        Private Content  ⚠️
                    </button>
                    {store.private_content != undefined && (
                        <div className="row">
                            <h2>Congratulations, you seem to be who you claim to be...</h2>
                            <p>This is the private content:</p>
                            <img src={store.private_content} />
                        </div>
                    )}

                    <div className="d-flex gap-2 flex-wrap">
                        <button type="button" onClick={() => toast.success("You clicked me!")} className="btn pill d-inline-flex align-items-center justify-content-center bg-primary text-white px-3 py-2 rounded-pill shadow-sm">
                            Explore ideas
                        </button>
                        <button type="button" onClick={() => toast.success("You clicked me!")} className="btn pill d-inline-flex align-items-center justify-content-center bg-success text-white px-3 py-2 rounded-pill shadow-sm">
                            Build things
                        </button>
                        <button type="button" onClick={() => toast.success("You clicked me!")} className="btn pill d-inline-flex align-items-center justify-content-center bg-warning text-dark px-3 py-2 rounded-pill shadow-sm">
                            Learn fast
                        </button>
                    </div>

                    <div className="mt-4">
                        <div className="card border-0 shadow-sm" style={{ maxWidth: 420 }}>
                            <div className="card-body d-flex gap-3 align-items-center">
                                <div className="avatar bg-gradient rounded-circle d-flex align-items-center justify-content-center" style={{ width: 64, height: 64 }}>
                                    <span style={{ fontSize: 22, color: "white" }}>⚡</span>
                                </div>
                                <div>
                                    <div className="fw-semibold">Energy Boost</div>
                                    <small className="text-muted">Micro-moments that spark creativity</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mt-5 mt-md-0">
                    <div className="position-relative d-flex align-items-center justify-content-center" style={{ height: 320 }}>
                        <div className="illustration bg-light rounded-4 shadow-lg d-flex align-items-center justify-content-center" style={{ width: 320, height: 320 }}>
                            <div className="bubble-group position-relative">
                                <div className="bubble bubble-lg bg-primary"></div>
                                <div className="bubble bubble-md bg-success"></div>
                                <div className="bubble bubble-sm bg-warning"></div>
                                <div className="center-emoji">✨</div>
                            </div>
                        </div>

                        <div id="confetti-container" aria-hidden="true" className="position-absolute w-100 h-100 top-0 start-0"></div>
                    </div>
                    <p className="text-center text-muted small mt-3">A playful scene generated with simple DOM + CSS animations.</p>
                </div>
            </div>

            {/* Inline component styles (scoped) */}
            <style>{`
                .avatar.bg-gradient { background: linear-gradient(135deg,#ff6b6b,#b86bff); }
                .pill { transition: transform .18s ease, box-shadow .18s ease; }
                .pill:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,.08); }

                .illustration { overflow: hidden; }
                .bubble-group { width: 200px; height: 200px; position: relative; }
                .bubble { position: absolute; border-radius: 999px; box-shadow: 0 8px 20px rgba(13, 38, 59, 0.08); }
                .bubble-lg { width: 120px; height: 120px; top: 20px; left: 30px; transform: translateZ(0); animation: bob 6s ease-in-out infinite; }
                .bubble-md { width: 70px; height: 70px; bottom: 24px; right: 28px; animation: bob 5s ease-in-out infinite reverse; }
                .bubble-sm { width: 36px; height: 36px; top: 10px; right: 10px; animation: bob 4s ease-in-out infinite; }
                .center-emoji { position: absolute; inset: 0; display:flex; align-items:center; justify-content:center; font-size:48px; filter: drop-shadow(0 6px 18px rgba(0,0,0,0.08)); }

                @keyframes bob {
                    0% { transform: translateY(0) }
                    50% { transform: translateY(-12px) }
                    100% { transform: translateY(0) }
                }

                /* simple confetti pieces */
                #confetti-container { pointer-events: none; }
                .confetti {
                    position: absolute;
                    top: -10%;
                    width: 10px;
                    height: 18px;
                    opacity: 0.95;
                    border-radius: 2px;
                    transform-origin: center;
                    animation: fall 3s linear forwards;
                }
                @keyframes fall {
                    0% { transform: translateY(-5vh) rotate(0deg); opacity: 1 }
                    100% { transform: translateY(110vh) rotate(720deg); opacity: 0 }
                }
            `}</style>
        </main>
    );
};