import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-5xl font-bold tracking-tight text-black transition-transform duration-300 hover:scale-105">
        404
      </h1>

      <p className="text-sm text-gray-600 transition-colors duration-300 hover:text-gray-800">
        Page not found.
      </p>

      <Link
        href="/"
        className="rounded-md bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-gray-800"
      >
        Go home
      </Link>
    </main>
  );
}
