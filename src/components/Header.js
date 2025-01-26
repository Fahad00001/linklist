"use client";

import { useEffect, useState } from "react";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import LogoutButton from "@/components/buttons/LogoutButton";

export default function Header() {
  const [session, setSession] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const response = await fetch("/api/auth/session");
      const data = await response.json();
      setSession(data?.user || null);
    };
    fetchSession();
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-gray-800">
            <FontAwesomeIcon icon={faLink} className="text-blue-500 text-xl" />
            <span className="font-semibold text-lg">LinkList</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/about" className="text-gray-700 hover:text-blue-500 transition">
            About
          </Link>
          <Link href="/pricing" className="text-gray-700 hover:text-blue-500 transition">
            Pricing
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-500 transition">
            Contact
          </Link>
          {!!session ? (
            <>
              <Link href="/account" className="text-gray-700 hover:text-blue-500 transition">
                Hello, {session.name}
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-700 hover:text-blue-500 transition">
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Create Account
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t">
          <nav className="flex flex-col items-center gap-4 py-4 text-sm font-medium">
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-500 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-blue-500 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-blue-500 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {!!session ? (
              <>
                <Link
                  href="/account"
                  className="text-gray-700 hover:text-blue-500 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Hello, {session.name}
                </Link>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-500 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/login"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Account
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
