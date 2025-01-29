import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HeroForm from "@/components/forms/HeroForm";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 animate-gradient-move">
      <section className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white animate-fade-in">
          Your one link <br /> for everything
        </h1>
        <h2 className="text-gray-200 text-lg md:text-2xl mt-6 animate-fade-in delay-200">
          Share your links, social profiles, contact info, and more on one simple page.
        </h2>
        <div className="mt-10 w-full max-w-md mx-auto animate-slide-up delay-300">
          <HeroForm user={session?.user} />
        </div>
      </section>
           {/* Features Section */}
           <section className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {["Social Links", "Bio & Contact", "Media Gallery"].map((feature, index) => (
            <div 
              key={feature}
              className="p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:scale-105 transition-transform duration-300 shadow-xl animate-pulse"
            >
              <div className="w-12 h-12 mb-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <svg 
                  className="w-6 h-6 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M13 10V3L4 14h7v7l9-11h-7z" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature}</h3>
              <p className="text-gray-300">Manage all your {feature.toLowerCase()} in one place</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}