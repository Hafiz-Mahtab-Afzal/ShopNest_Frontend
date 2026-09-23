

const Profile = () => {

  const auth = localStorage.getItem('auth')
  const User = auth ? JSON.parse(auth).User as {
    first_name: string
    last_name: string
    email: string
    role: string
  } : null

  return (
    <div className="min-h-screen bg-gradient-to-br mt from-sky-50 to-white">

      {/* Header */}
      <h1 className='text-2xl md:text-3xl lg:text-4xl text-center font-bold bg-white border-sky-500 border-b-2 text-sky-600 py-5'>
        Profile
      </h1>

      <div className="max-w-3xl mx-auto mt-2 px-4">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Top Banner */}
          <div className="bg-gradient-to-r from-sky-500 to-cyan-400 h-32 relative">
            <div className="absolute -bottom-12 left-8">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                <span className="text-4xl font-bold text-sky-500">
                  {User?.first_name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="pt-16 px-4 lg:px-8 pb-8">

            {/* Name + Role */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {User?.first_name} {User?.last_name}
                </h2>
                <span className="inline-block mt-1 bg-sky-100 text-sky-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {User?.role}
                </span>
              </div>
              <button className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-5 py-2 rounded-xl transition">
                Edit Profile
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-6" />

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="bg-sky-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Email</p>
                <p className="text-sm font-medium text-gray-700 break-all lg:break-normal">{User?.email}</p>
              </div>

              <div className="bg-sky-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Full Name</p>
                <p className="text-sm font-medium text-gray-700">{User?.first_name} {User?.last_name}</p>
              </div>

              <div className="bg-sky-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Role</p>
                <p className="text-sm font-medium text-gray-700">{User?.role}</p>
              </div>

              <div className="bg-sky-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Location</p>
                <p className="text-sm font-medium text-gray-700">Lahore, Pakistan</p>
              </div>

            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-6" />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
              <div className="bg-sky-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-sky-600">0</p>
                <p className="text-xs text-gray-400 mt-1">Orders</p>
              </div>
              <div className="bg-sky-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-sky-600">0</p>
                <p className="text-xs text-gray-400 mt-1">Wishlist</p>
              </div>
              <div className="bg-sky-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-sky-600">0</p>
                <p className="text-xs text-gray-400 mt-1">Reviews</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile