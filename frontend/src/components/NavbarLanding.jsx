import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

export default function NavbarLanding() {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, lecturer, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;

  const breadcrumbs = (() => {
    // We treat the logo as "Home" so crumbs start after that.
    if (pathname === "/") {
      return [];
    }
    if (pathname === "/home") {
      return [{ label: "Branches" }];
    }

    if (pathname === "/login") {
      return [{ label: "Login" }];
    }

    if (pathname === "/register") {
      return [{ label: "Register" }];
    }

    if (pathname === "/reset-password") {
      return [{ label: "Reset Password" }];
    }

    if (pathname === "/verify-otp") {
      return [{ label: "Verify OTP" }];
    }

    if (pathname === "/new-password") {
      return [{ label: "Set New Password" }];
    }

    if (pathname.startsWith("/branch/")) {
      const code = pathname.split("/")[2];
      return [
        { label: "Branches", to: "/home" },
        { label: code?.toUpperCase() || "Branch" },
      ];
    }

    if (pathname.startsWith("/resources/")) {
      const [, , branch, section] = pathname.split("/");
      const sectionLabelMap = {
        notes: "Notes",
        assignments: "Assignments",
        qpapers: "Question Papers",
        mpapers: "Model Papers",
        circulars: "Circulars",
        syllabus: "Syllabus",
      };

      return [
        { label: "Branch", to: `/branch/${branch}` },
        { label: sectionLabelMap[section] || "Resources" },
      ];
    }

    // Fallback: just show current path as last crumb
    return [{ label: pathname.replace("/", "") || "Page" }];
  })();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className="
        fixed top-0 left-0 w-full z-50
        bg-white/90 dark:bg-gray-900/90 backdrop-blur-md 
        border-b border-gray-200 dark:border-gray-700 shadow-sm
      "
    >
      <div
        className="
          mx-auto flex w-full max-w-7xl items-center justify-between gap-4
          px-5 md:px-10 py-4 md:py-5
        "
      >
        {/* LOGO + BREADCRUMBS */}
        <div className="flex items-center gap-3 flex-1">
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white tracking-tight hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            KIT MATRIX
          </Link>

          <ol className="flex flex-wrap items-center gap-1 text-sm md:text-base text-gray-600 dark:text-gray-300">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-1">
                  <span className="text-gray-400">/</span>
                  {crumb.to && !isLast ? (
                    <Link
                      to={crumb.to}
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "font-semibold" : ""}>{crumb.label}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {/* AUTH BUTTONS + THEME TOGGLE */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-600 dark:text-gray-300 hidden md:inline">
                {lecturer?.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
            >
              Login
            </Link>
          )}

          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            className="
              p-2.5 rounded-lg
              bg-gray-100 dark:bg-gray-800
              hover:bg-gray-200 dark:hover:bg-gray-700
              text-gray-700 dark:text-gray-300
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              // Sun icon for light mode
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              // Moon icon for dark mode
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
