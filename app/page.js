export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-primary">Travela</h1>
        <p className="text-xl text-gray-600 mb-8">
          Share Your Travel Experiences with the World
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/login"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </a>
          <a
            href="/register"
            className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-green-600 transition"
          >
            Register
          </a>
        </div>
      </div>
    </main>
  )
}
