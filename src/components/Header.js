import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-xl font-bold text-blue-600 transition hover:text-blue-700"
          >
            ResumeBuilder
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-gray-600 transition hover:text-gray-900"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/templates")}
              className="text-gray-600 transition hover:text-gray-900"
            >
              Templates
            </button>
            {user ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="text-gray-600 transition hover:text-gray-900"
              >
                Dashboard
              </button>
            ) : null}
          </nav>

          <div className="flex gap-3">
            {!user ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/templates")}
                  className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                >
                  Get Started
                </button>
              </>
            ) : (
              <div className="font-semibold text-gray-900">{user.name}</div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
