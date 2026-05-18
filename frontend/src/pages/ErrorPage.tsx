export const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        
        {/* Icon */}
        <div className="text-6xl mb-4 animate-bounce">
          🚧
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Page Under Development
        </h1>

        {/* Message */}
        <p className="text-gray-500 mb-6">
          Our developers are currently working on this page. 🛠️  
          Please check back later!
        </p>

        {/* Extra Info */}
        <div className="bg-blue-50 text-blue-600 px-4 py-3 rounded-lg text-sm mb-6">
          ⚡ This feature will be available soon.
        </div>

        {/* Button */}
        <button
          onClick={() => window.history.back()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200"
        >
          🔙 Go Back
        </button>

      </div>
    </div>
  );
};