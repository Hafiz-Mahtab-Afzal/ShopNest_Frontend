import axios from 'axios';
import apis from './apis';

// Login wala token 15 minute baad expire ho jata hai.
// Ye interceptor har axios call ka jawab check karta hai:
// agar 401 aaya to pehle /refresh se naya token leta hai, phir wahi request dobara bhejta hai.
// User ko 7 din tak dobara login nahi karna parega.
// Note: yahan se login page par redirect nahi karte, warna logged-out user signup/otp page bhi nahi khol sakta.
// Login par bhejna ProtectedRoute aur Checkout khud karte hain.

axios.interceptors.response.use(
  // Sab theek hai to jawab waise hi aage bhej do
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const isUnauthorized = error.response?.status === 401;
    const alreadyRetried = originalRequest?._retry;
    const isRefreshCall = originalRequest?.url?.includes('/refresh');

    // Sirf 401 par, aik hi dafa, aur khud refresh wali call par nahi (warna loop ban jaye ga)
    if (isUnauthorized && !alreadyRetried && !isRefreshCall) {
      originalRequest._retry = true;

      try {
        // Naya token cookie mein aa jaye ga
        await axios.post(`${apis.auth}/refresh`, {}, { withCredentials: true });

        // Ab wahi request dobara bhejo
        return axios(originalRequest);
      } catch {
        // Refresh token bhi expire ho gaya (7 din) ya user login hi nahi - purani info hata do
        localStorage.removeItem('auth');
        localStorage.removeItem('profilePic');
      }
    }

    return Promise.reject(error);
  }
);
