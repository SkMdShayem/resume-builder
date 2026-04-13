import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-xl font-bold text-blue-600 hover:text-blue-700"
          >
            <span className="text-2xl">📄</span>
            ResumeBuilder
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <button
              onClick={() => navigate("/")}
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/templates")}
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Templates
            </button>
            {user && (
              <button
                onClick={() => navigate("/dashboard")}
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Dashboard
              </button>
            )}
          </nav>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            {!user ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-blue-600 hover:text-blue-700 font-semibold transition"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/templates")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                >
                  Get Started
                </button>
              </>
            ) : (
              <div className="text-gray-900 font-semibold">
                {user.name}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
