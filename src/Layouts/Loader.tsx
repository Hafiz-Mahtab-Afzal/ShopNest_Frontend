const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-white">
      <div className="flex flex-col items-center gap-6">

        {/* Animated Rings */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Outer ring */}
          <div className="absolute w-24 h-24 rounded-full border-4 border-sky-100 animate-ping opacity-30"></div>
          {/* Middle ring */}
          <div className="absolute w-20 h-20 rounded-full border-4 border-sky-200 border-t-sky-500 animate-spin"></div>
          {/* Inner ring */}
          <div className="absolute w-14 h-14 rounded-full border-4 border-cyan-100 border-b-cyan-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
          {/* Center dot */}
          <div className="w-4 h-4 rounded-full bg-sky-500 animate-pulse"></div>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-1">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-2xl font-bold text-sky-600">Shop</span>
          <span className="text-2xl font-bold text-cyan-500">Nest</span>
        </div>

        {/* Dots Animation */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Text */}
        <p className="text-sm text-gray-400 tracking-widest uppercase animate-pulse">
          Please wait...
        </p>

      </div>
    </div>
  )
}

export default Loader