'use client';

export default function Explore() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Travela</h1>
          <div className="flex gap-4">
            <a href="/dashboard" className="hover:text-primary">Dashboard</a>
            <a href="/explore" className="hover:text-primary">Explore</a>
            <a href="/profile" className="hover:text-primary">Profile</a>
            <button className="text-red-500 hover:text-red-700">Logout</button>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6">Explore Trips</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Trip cards will be dynamically loaded here */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
            Loading trips...
          </div>
        </div>
      </main>
    </div>
  );
}
