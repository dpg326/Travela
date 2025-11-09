export default function TripCard({ trip }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      <div className="h-48 bg-gray-200">
        {/* Trip image will go here */}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{trip?.title || 'Trip Title'}</h3>
        <p className="text-gray-600 mb-2">{trip?.destination || 'Destination'}</p>
        <p className="text-gray-500 text-sm line-clamp-2">
          {trip?.description || 'Trip description...'}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {trip?.start_date || 'Date'}
          </span>
          <button className="text-primary hover:text-blue-600">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}
