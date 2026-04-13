import { useDispatch } from "react-redux";
import { login } from "../app/authSlice";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Login = () => {
  const dispatch = useDispatch();
  const username = useRef(null);
  const Navigate = useNavigate();

  const handleLogin = () => {
    dispatch(login({ name: username.current.value }));
    Navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex items-center justify-center p-4 mt-20">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <input
            type="text"
              ref={username}
            placeholder="Username"
            className="mb-4 h-10 w-full border border-gray-300 rounded px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button className="h-10 w-full bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleLogin}>
                Login
            </button>
        </div>
      </div>
    </div>
  );
};

export default Login;