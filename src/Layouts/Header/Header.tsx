import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';
import { FaRegUser, FaHeart, FaTrash } from 'react-icons/fa';
import { BsCart3 } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { useState } from 'react';

import { FiShoppingBag, FiHeart, FiMapPin } from 'react-icons/fi';
import { IoGitCompare } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { clearWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { clearCart, removeItemComplete } from '../../redux/slices/cartSlice';
import { discountPriceCalc } from '../../functions/helper';
import { MdDashboard } from 'react-icons/md';

const Header = () => {
  const [open, setOpen] = useState(false);

  const auth = localStorage.getItem('auth');
  const user = auth ? JSON.parse(auth).User : null;

  // LocalStorage se direct profile picture nikal rahe hain
  const userProfilePic = localStorage.getItem('profilePic');

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cartSlice.items);
  const cartTotalQuantity = useSelector((state: RootState) => state.cartSlice.totalQuantity);
  const wishlistItems = useSelector((state: RootState) => state.wishlistSlice.items);
  const handleRemoveFromWishlist = (id: string) => dispatch(removeFromWishlist(id));
  const handleRemoveFromCart = (id: string) => dispatch(removeItemComplete(id));
  const [showWishlistDropdown, setShowWishlistDropdown] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const destroyCart = () => dispatch(clearCart());
  const destroyWishlist = () => dispatch(clearWishlist());

  const cartTotal = cartItems.reduce((total, item) => {
    const price = discountPriceCalc(item.onSale, item.discount, item.price);
    return total + price * item.quantity;
  }, 0);

  const logout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('profilePic'); // Logout par image bhi clear kar dein
    location.href = '/login';
  };
  return (
    <header className="bg-white">
      <div className="top-strip py-3 lg:py-6 ">
        <div className="mx-3 lg:mx-6">
          <div className="flex flex-col lg:flex-row gap-1 lg:gap-0 pb-4 items-center justify-between text-sm lg:text-base text-center lg:text-left ">
            <div className="col1 w-full lg:w-[50%] pl-0 lg:pl-4 font-[500]">
              <p> 🚚 Free Delivery on orders above Rs. 2000 | Cash on Delivery Available</p>
            </div>

            <div className="translate-x-0 lg:translate-x-20">
              <p>Secure Payment | Easy Returns</p>
            </div>

            <div className="col2 w-full lg:w-[16%]">
              <ul>
                <li className="list-none">
                  <Link to="/help-center" className="text-12px transition  hover:text-primary">
                    Help Center
                  </Link>
                  <Link
                    to="/order-tracking"
                    className="text-12px transition hover:text-primary pl-4"
                  >
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="py-4 border-y border-sky-200">
            <div className="flex flex-wrap lg:flex-nowrap items-center pl-0 lg:pl-4 justify-between gap-3 lg:gap-6">
              <Link to="/" className="flex items-center gap-2 shrink-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <div>
                  <span className="text-lg lg:text-xl font-bold text-sky-600">Shop</span>
                  <span className="text-lg lg:text-xl font-bold text-cyan-500">Nest</span>
                </div>
              </Link>

              <div className="order-last lg:order-none w-full lg:w-auto flex-none lg:flex-1 max-w-xl">
                <Searchbar />
              </div>

              <div className="flex items-center ml-auto lg:ml-0 pr-0 lg:pr-12 gap-2 sm:gap-3">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setOpen(!open)}
                      className="w-[44px] h-[44px] min-w-[35px] rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-gray-200"
                    >
                      {userProfilePic ? (
                        <img
                          src={userProfilePic}
                          alt="profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaRegUser className="text-black text-xl" />
                      )}
                    </button>

                    {open && (
                      <div className="absolute right-0 top-12 w-52 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                        <Link
                          to="/myaccount"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition"
                        >
                          <FaRegUser className="text-[16px]" /> My Account
                        </Link>

                        {user?.role === 'admin' && (
                          <Link
                            to="/dashboard"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition"
                          >
                            <MdDashboard className="text-[16px]" />
                            Dashboard
                          </Link>
                        )}

                        <Link
                          to=""
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition"
                        >
                          <FiMapPin className="text-[16px]" /> Address
                        </Link>

                        <Link
                          to="/orders"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition"
                        >
                          <FiShoppingBag className="text-[16px]" /> Orders
                        </Link>

                        <Link
                          to="/mylist"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition"
                        >
                          <FiHeart className="text-[16px]" /> My List
                        </Link>

                        <hr className="border-gray-300" />

                        <button
                          onClick={logout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                        >
                          <FiLogOut className="text-[16px]" /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Link to="/Login" className="hover:text-sky-600 transition text-sm sm:text-[18px] pr-1">
                      Login
                    </Link>
                    |
                    <Link to="/SignUp" className="hover:text-sky-600 transition text-sm sm:text-[18px] pl-1">
                      Register
                    </Link>
                  </div>
                )}

                <button className="hidden sm:block text-[26px] text-black cursor-pointer hover:text-sky-600 transition">
                  <IoGitCompare />
                </button>

                <div className="relative">
                  <button
                    onClick={() => {
                      setShowWishlistDropdown(!showWishlistDropdown);
                    }}
                    className="relative w-10 h-10 flex items-center justify-center bg-sky-50 hover:bg-sky-100 rounded-xl border border-sky-200 transition"
                  >
                    <FaHeart className="text-sky-500 text-[18px]" />
                    {wishlistItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                        {wishlistItems.length}
                      </span>
                    )}
                  </button>
                  {showWishlistDropdown && (
                    <div className="absolute right-0 top-13 w-72 max-w-[80vw] bg-white border border-sky-100 rounded-2xl shadow-2xl z-[99999]">
                      <div className="p-3 bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-semibold rounded-t-2xl text-sm">
                        Wishlist ({wishlistItems.length})
                      </div>
                      {wishlistItems.length === 0 ? (
                        <div className="p-6 text-center text-gray-400 text-sm">
                          Your wishlist is empty
                        </div>
                      ) : (
                        <div className="divide-y max-h-64 overflow-y-auto">
                          {wishlistItems.map((item) => (
                            <div
                              key={item._id}
                              className="p-3 flex items-center gap-3 hover:bg-sky-50"
                            >
                              <img
                                src={item.images[0]}
                                className="w-10 h-10 object-cover rounded-lg"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{item.title}</p>
                                <p className="text-xs text-sky-600 font-semibold">
                                  Rs. {item.price}
                                </p>
                              </div>
                              <button
                                onClick={() => handleRemoveFromWishlist(item._id)}
                                className="text-red-400 hover:text-red-600"
                              >
                                <FaTrash className="text-xs" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="p-3 flex gap-2">
                        {cartTotal > 0 && (
                          <button
                            onClick={destroyWishlist}
                            className="flex-1 py-2 rounded-xl border border-sky-200 text-sky-600 text-sm font-medium hover:bg-sky-50 transition"
                          >
                            Clear
                          </button>
                        )}
                        <Link to="/mylist" className="flex-1">
                          <button className="w-full py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold transition">
                            View Wishlist
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => {
                      setShowCartDropdown(!showCartDropdown);
                      setShowWishlistDropdown(false);
                    }}
                    className="relative w-10 h-10 flex items-center justify-center bg-sky-50 hover:bg-sky-100 rounded-xl border border-sky-200 transition"
                  >
                    <BsCart3 className="text-sky-500 text-[18px]" />
                    {cartTotalQuantity > 0 && (
                      <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                        {cartTotalQuantity}
                      </span>
                    )}
                  </button>
                  {showCartDropdown && (
                    <div className="absolute right-0 top-13 w-80 max-w-[80vw] bg-white border border-sky-100 rounded-2xl shadow-2xl z-[99999]">
                      <div className="p-3 bg-gradient-to-r from-sky-500 to-cyan-400 text-white rounded-t-2xl flex justify-between items-center text-sm font-semibold">
                        <span>Cart ({cartTotalQuantity})</span>
                        <span>Rs. {cartTotal.toFixed(0)}</span>
                      </div>
                      {cartItems.length === 0 ? (
                        <div className="p-6 text-center text-gray-400 text-sm">
                          Your cart is empty
                        </div>
                      ) : (
                        <div className="divide-y max-h-64 overflow-y-auto">
                          {cartItems.map((item) => {
                            const dp = discountPriceCalc(item.onSale, item.discount, item.price);
                            return (
                              <div
                                key={item._id}
                                className="p-3 flex items-center gap-3 hover:bg-sky-50"
                              >
                                <img
                                  src={item.images[0]}
                                  className="w-11 h-11 object-cover rounded-lg"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{item.title}</p>
                                  <p className="text-xs">
                                    <span className="text-sky-600 font-bold">Rs. {dp}</span> ×{' '}
                                    {item.quantity}
                                  </p>
                                </div>
                                <button
                                  onClick={() => handleRemoveFromCart(item._id)}
                                  className="text-red-400 hover:text-red-600"
                                >
                                  <FaTrash className="text-xs" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <div className="p-3 flex gap-2">
                        {cartTotal > 0 && (
                          <button
                            onClick={destroyCart}
                            className="flex-1 py-2 rounded-xl border border-sky-200 text-sky-600 text-sm font-medium hover:bg-sky-50 transition"
                          >
                            Clear
                          </button>
                        )}
                        <Link to="/cart" className="flex-1">
                          <button className="w-full py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold transition">
                            View Cart
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
