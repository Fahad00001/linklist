"use client";

import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeroForm({ user }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if username is stored in localStorage and redirect
  useEffect(() => {
    if (
      "localStorage" in window &&
      window.localStorage.getItem("desiredUsername")
    ) {
      const username = window.localStorage.getItem("desiredUsername");
      window.localStorage.removeItem("desiredUsername");
      redirect("/account?desiredUsername=" + username);
    }
  }, []);

  // Function to check if username is available
  const checkUsernameAvailability = async (username) => {
    const response = await fetch(`/api/check-username?username=${username}`);
    const data = await response.json();
    setIsUsernameAvailable(data.isAvailable);
  };

  // Function to grab username input value
  const grabUsername = () => {
    return username.trim();
  };

  async function handleSubmit(ev) {
    ev.preventDefault();

    const enteredUsername = grabUsername();

    if (enteredUsername.length === 0) {
      setError("Please enter a username.");
      return;
    }

    if (!isUsernameAvailable) {
      setError(
        "This username is already taken. Please choose a different one."
      );
      return;
    }

    setError(""); // Clear error if username is valid
    if (user) {
      router.push("/account?desiredUsername=" + enteredUsername);
    } else {
      window.localStorage.setItem("desiredUsername", enteredUsername);
      await signIn("google");
    }
  }

  // Check username availability when the username changes
  useEffect(() => {
    if (username) {
      checkUsernameAvailability(username);
    }
  }, [username]);

  if (user) {
    // If the user is logged in, show a message or redirect them to the account page
    return (
      <div className="max-w-lg mx-auto bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="animate-pulse-in">
          <div className="flex flex-col items-center space-y-4">
            {/* Animated Checkmark */}
            <div className="animate-checkmark scale-75">
              <svg
                className="w-16 h-16 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 text-center leading-tight transform transition-all duration-200">
              Welcome back,{" "}
              <span className="animate-fade-in-delay text-indigo-600">
                {username}
              </span>
              ! ✨
            </h2>

            <p className="text-gray-600 text-center text-lg transition-all duration-300">
              Taking you to your
              <a
                href="/account"
                className="ml-1.5 text-blue-500 hover:text-blue-600 font-medium transition-colors duration-300
                        underline decoration-2 decoration-blue-200 hover:decoration-blue-300"
              >
                account dashboard
              </a>
            </p>

            {/* Animated Progress Bar */}
            <div className="w-full mt-6 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="animate-progress-bar h-full bg-gradient-to-r from-indigo-400 to-blue-400"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-6 relative transition-all duration-300 hover:shadow-lg"
    >
      {/* Header Section */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Claim Your Unique URL
        </h1>
        <p className="text-gray-500 text-sm">
          Create your personalized profile link
        </p>
      </div>

      {/* Input Container */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-gray-700">
          Your custom URL
        </label>

        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200">
          <span className="text-gray-500 font-medium">linklist.to/</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400 text-lg font-medium"
            placeholder="username"
            style={{ caretColor: "#2563eb" }}
          />
          {/* Validation Indicator */}
          {username.length > 0 && (
            <div
              className={`w-6 h-6 flex items-center justify-center rounded-full ${
                username.length > 2
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {username.length > 2 ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <span className="text-xs font-bold">!</span>
              )}
            </div>
          )}
        </div>

        {/* Helper Text */}
        <p className="text-sm text-gray-500">
          {username.length > 0 ? (
            <>
              {username.length > 2 ? (
                <span className="">Allowed</span>
              ) : (
                <span className="text-red-600">
                  Username must be at least 3 characters
                </span>
              )}
            </>
          ) : (
            "Letters, numbers, and underscores only"
          )}
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || username.length < 3}
        className={`w-full py-3.5 text-white font-medium rounded-lg transition-all duration-300 ${
          isSubmitting || username.length < 3
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 hover:shadow-md"
        }`}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <span className="h-2 w-2 bg-white rounded-full animate-bounce"></span>
            <span
              className="h-2 w-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></span>
            <span
              className="h-2 w-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></span>
          </div>
        ) : (
          "Claim Your URL"
        )}
      </button>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100 flex items-center gap-2 animate-fade-in">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </form>
  );
}
