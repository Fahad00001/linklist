import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white py-16 px-6">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-4">
          About <span className="text-yellow-300">LinkList </span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed">
          Our Lisklit is designed to help individuals and businesses create a simple, elegant
          way to share multiple links in one place. Whether you’re an influencer, entrepreneur, or
          creator, this tool empowers you to showcase your online presence effectively.
        </p>
      </div>

      {/* About Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {/* Section 1: What It Does */}
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">What It Does</h2>
          <p className="mb-4">
            This Lisklist provides users with a customizable landing page where they can:
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Add links to their social profiles, websites, or projects.
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Create a clean and visually appealing online presence.
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Share their page with followers, clients, or collaborators.
            </li>
          </ul>
        </div>

        {/* Section 2: Why Use It */}
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Why Use It?</h2>
          <p className="mb-4">
            This tool is perfect for anyone looking to simplify their online sharing process:
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="text-blue-500 mr-2">🌟</span> No need for coding skills or complex setups.
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 mr-2">🌟</span> Fully responsive and works beautifully on any device.
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 mr-2">🌟</span> Enhance your personal or business brand in minutes.
            </li>
          </ul>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="mt-10 text-center">
        <h3 className="text-xl font-medium mb-4">Start Using Lisklist</h3>
        <p className="mb-6">
          Build your own page, add your favorite links, and share it with your audience today!
        </p>
        <a
          href="/"
          className="py-3 px-8 bg-yellow-400 text-gray-800 text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}