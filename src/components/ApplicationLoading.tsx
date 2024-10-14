export function LoadingAnimation() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
        </div>
        <p className="mt-4 text-lg font-semibold text-primary">Application in process...</p>
        <p className="mt-2 text-sm text-gray-600">Please wait while we process your information.</p>
      </div>
    )
  }