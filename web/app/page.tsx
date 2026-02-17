import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      <main className="flex flex-col items-center justify-center flex-1 px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Mind Maps
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          Visualize your ideas with our intuitive, fast, and beautiful mind mapping tool.
          Organize your thoughts, plan projects, and brainstorm effectively.
        </p>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-8 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-3 text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-lg font-medium"
          >
            Go to Dashboard
          </Link>
        </div>
      </main>
      <footer className="p-6 text-center text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Mind Maps. All rights reserved.
      </footer>
    </div>
  );
}
