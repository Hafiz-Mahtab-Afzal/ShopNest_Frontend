import { useState, useEffect, type ChangeEvent } from 'react';
import axios from 'axios';
import { errortoast, successtoast } from '../toastify/toastify';
import apis from '../config/apis';

interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phonenumber?: string;
  profilepicture?: string;
  role?: string;
  isblocked?: boolean;
  address?: string;   

}

interface AuthData {
  User: User;
  success?: string;
}

interface ProfileUpdateResponse {
  error?: string;
  success?: string;
  user: User;
}

interface GetProfileResponse {
  user: User;
}

const Myaccount = () => {
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const updateLocalStorageName = (first_name: string, last_name: string) => {
    const authData = localStorage.getItem('auth');
    if (authData) {
      const parsed: AuthData = JSON.parse(authData);
      parsed.User.first_name = first_name;
      parsed.User.last_name = last_name;
      localStorage.setItem('auth', JSON.stringify(parsed));
    }
  };

  const fetchProfile = async () => {
    const authData = localStorage.getItem('auth');
    if (!authData) return;
    const parsed: AuthData = JSON.parse(authData);
    if (!parsed.User?._id) return;

    try {
      const { data } = await axios.get<GetProfileResponse>(
        `${apis.auth}/getprofile/${parsed.User._id}`,
        { withCredentials: true }
      );

      if (data.user) {
        setUser(data.user);
        setFirstName(data.user.first_name || '');
        setLastName(data.user.last_name || '');
        setPhone(data.user.phonenumber || '');
        setAddress(data.user.address || '');  // ✅ YEH ADD KARO
        if (data.user.profilepicture) {
          setImagePreview(data.user.profilepicture.replace(/"/g, '').trim());
        }
        updateLocalStorageName(data.user.first_name, data.user.last_name);
      }
    } catch {
      if (parsed.User) {
        setUser(parsed.User);
        setFirstName(parsed.User.first_name || '');
        setLastName(parsed.User.last_name || '');
        setPhone(parsed.User.phonenumber || '');
        setAddress(parsed.User.address || '');
        if (parsed.User.profilepicture) {
          setImagePreview(parsed.User.profilepicture.replace(/"/g, '').trim());
        }
      }
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

const handleUpdateProfile = async () => {
  if (!user?._id) {
    return errortoast("User ID missing. Please login again.");
  }

  setLoading(true);
  try {
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', user.email || '');
    formData.append('phone', phone);
    formData.append('address', address);
    if (image) {
      formData.append('images', image);
    }
    
    // API Call
    const { data } = await axios.put<ProfileUpdateResponse>(
      `${apis.auth}/updateprofile/${user._id}`,
      formData,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    );

    if (data.error) {
      errortoast(data.error);
      return;
    }

    if (data.success) {
      successtoast(data.success);
      setImage(null);

      // ✅ YAHAN UPDATE KAREIN: 
      // Agar server response mein nayi image URL bhej raha hai to usey save karein
      if (data.user?.profilepicture) {
        localStorage.setItem('profilePic', data.user.profilepicture);
      }
      
      // Refresh profile data
      await fetchProfile();
    }
  } catch (err: any) {
    errortoast(err.response?.data?.error || "An unexpected error occurred.");
  } finally {
    setLoading(false);
  }
};

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col lg:flex-row gap-5 p-3 sm:p-5 bg-gray-100 min-h-screen">

      {/* LEFT SIDEBAR */}
      <div className="w-full lg:w-[260px] bg-white p-5 border rounded-xl shadow-sm">
        <div className="text-center">

          {/* ✅ Image — hover par change option */}
          <div className="relative w-32 h-32 mx-auto group cursor-pointer mb-3">
            <img
              src={imagePreview || "https://i.pravatar.cc/150?img=3"}
              alt="user"
              className="w-32 h-32 rounded-full mx-auto object-cover border-2 border-sky-200 shadow-sm"
            />
            <label
              htmlFor="profileImageInput"
              className="absolute inset-0 bg-black/40 text-white text-xs font-medium flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              Choose Image
            </label>
            <input
              id="profileImageInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  setImage(file);
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
            />
          </div>

          {image && (
            <p className="text-[10px] text-green-500 mb-1 truncate px-2">{image.name}</p>
          )}
          
          <h3 className="mt-2 font-semibold text-gray-800">
            {user ? `${user.first_name} ${user.last_name}` : ''}
          </h3>
          <p className="text-sm text-gray-400">{user?.email || ''}</p>
        </div>

        <ul className="mt-6 space-y-2">
          <li className="text-sky-500 font-medium cursor-pointer border-l-2 border-sky-500 pl-3 py-1">
            My Profile
          </li>
          <li className="cursor-pointer hover:text-sky-500 pl-3 py-1 text-gray-600 text-sm">
            Address
          </li>
          <li className="cursor-pointer hover:text-sky-500 pl-3 py-1 text-gray-600 text-sm">
            My List
          </li>
          <li className="cursor-pointer hover:text-sky-500 pl-3 py-1 text-gray-600 text-sm">
            My Orders
          </li>
          <li className="cursor-pointer hover:text-red-500 pl-3 py-1 text-gray-600 text-sm">
            Logout
          </li>
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 bg-white p-4 lg:p-6 border rounded-xl shadow-sm">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">My Profile</h2>
          <span className="text-sky-500 text-sm cursor-pointer hover:text-sky-600 font-medium">
            CHANGE PASSWORD
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-600 font-medium">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
              className="border border-gray-200 p-2.5 rounded-lg outline-none focus:border-sky-400 text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-600 font-medium">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
              className="border border-gray-200 p-2.5 rounded-lg outline-none focus:border-sky-400 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-600 font-medium">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className="border border-gray-100 p-2.5 rounded-lg outline-none bg-gray-50 text-gray-400 text-sm cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-600 font-medium">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
              placeholder="+92 300 1234567"
              className="border border-gray-200 p-2.5 rounded-lg outline-none focus:border-sky-400 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-600 font-medium">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="border border-gray-200 p-2.5 rounded-lg outline-none focus:border-sky-400 text-sm"
            />
          </div>
        </div>

        <button
          onClick={handleUpdateProfile}
          disabled={loading}
          className="bg-sky-500 text-white px-6 py-2.5 rounded-lg hover:bg-sky-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium text-sm"
        >
          {loading ? 'UPDATING...' : 'UPDATE PROFILE'}
        </button>
      </div>
    </div>
  );
};

export default Myaccount;