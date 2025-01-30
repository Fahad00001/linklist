// pages/contact.js

import Head from "next/head";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Contact us for any queries or feedback"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-500 to-teal-400 text-white py-20">
        <h1 className="text-4xl font-semibold mb-8">Get in Touch</h1>
        <p className="text-xl mb-12">
          We would love to hear from you. Fill out the form below to reach us!
        </p>

        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <form action="https://formspree.io/f/xanqqokl" method="POST">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-2 w-full p-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-2 w-full p-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                placeholder="youremail@example.com"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="mt-2 w-full p-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                placeholder="Enter your message here"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 mt-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
        <footer className="mt-8 w-1/2 mx-auto bg-gray-900 text-gray-300 p-6 rounded-lg text-center transition-all duration-500 ease-in-out hover:bg-gray-800 hover:scale-105">
  <p className="text-lg font-semibold animate-fadeIn">Get in Touch</p>
  <div className="mt-2 animate-fadeIn">
    <p>
      Email: {" "}
      <a
        href="mailto:fahadtec2002@gmail.com"
        className="text-blue-400 hover:underline"
      >
        fahadtec2002@gmail.com
      </a>
    </p>
    <p>
      Phone: {" "}
      <a
        href="tel:9650943783"
        className="text-blue-400 hover:underline"
      >
        9650943783
      </a>
    </p>
  </div>
  <div className="mt-4 animate-fadeIn">
    <p className="text-sm">Follow us on social media:</p>
    <div className="flex justify-center space-x-4 mt-2">
      <a
        href="https://github.com/Fahad00001"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:underline transition-transform transform hover:scale-110"
      >
        Github
      </a>
      <a
        href="https://www.linkedin.com/in/fahad-iqbal-8209a8248/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:underline transition-transform transform hover:scale-110"
      >
        LinkedIn
      </a>
      <a
        href="https://www.instagram.com/its_fahad_iqbal/?next=%2F"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:underline transition-transform transform hover:scale-110"
      >
        Instagram
      </a>
    </div>
  </div>
</footer>


      </div>
    </>
  );
}
