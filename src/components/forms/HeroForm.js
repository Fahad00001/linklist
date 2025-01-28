"use client";

import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeroForm({ user }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);

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
      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-xl space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          You are already logged in! Redirecting to your account...
        </h2>
        {/* Optionally, you can redirect or show a message */}
        <p className="text-center mt-4">
          Redirecting to your{" "}
          <a href="/account" className="text-blue-500 hover:text-blue-600">
            account page
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Create Your Custom Username
      </h2>
      <div className="flex items-center gap-4 border border-gray-300 rounded-lg p-3 transition-all duration-300 ease-in-out focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
        <span className="text-lg text-gray-600">linklist.to/</span>
        <input
          type="text"
          className="flex-1 border-none outline-none text-lg text-gray-800 placeholder-gray-400 transition-all focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Join for Free
      </button>
      {error && (
        <p className="text-red-500 text-sm text-center mt-3">{error}</p>
      )}
    </form>
  );
}
