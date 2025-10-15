import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
                                     //Landing page
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-5 border-b">
        <h1 className="text-2xl font-bold text-blue-600">Online Learning Platform</h1>
        <div className="flex items-center gap-4">
          <Link href="/workspace/explore">
            <Button variant="ghost">Explore Courses</Button>
          </Link>
          <Link href="/workspace">
            <Button>Dashboard</Button>
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between flex-grow px-8 md:px-16 py-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-xl">
          <h2 className="text-5xl font-extrabold mb-6 leading-tight text-gray-900">
            Learn Smarter with <span className="text-indigo-600">AI-Powered Courses</span>
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Build skills in programming, AI, data science, and more — personalized just for you.
          </p>
          <div className="flex gap-4">
            <Link href="/sign-up">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/workspace/explore">
              <Button size="lg" variant="outline">Browse Courses</Button>
            </Link>
          </div>
        </div>

        <div className="relative w-full md:w-[500px] h-[350px] mt-10 md:mt-0">
          <Image
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
            alt="Learning illustration"
            fill
            className="object-cover rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white px-8 md:px-16">
        <h3 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-semibold mb-3 text-indigo-600">AI Course Generation</h4>
            <p className="text-gray-600">
              Instantly generate personalized course structures and chapters using advanced AI.
            </p>
          </div>

          <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-semibold mb-3 text-indigo-600">Interactive Learning</h4>
            <p className="text-gray-600">
              Hands-on exercises, quizzes, and project-based modules for effective learning.
            </p>
          </div>

          <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-semibold mb-3 text-indigo-600">Track Your Progress</h4>
            <p className="text-gray-600">
              Monitor completed chapters, test performance, and AI-driven recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center border-t text-gray-500 text-sm">
        © {new Date().getFullYear()} Online Learning Platform — All rights reserved.
      </footer>
    </main>
  );
}
