import FormControlLabel from '@mui/material/FormControlLabel';
import { LiaShippingFastSolid, LiaGiftSolid } from "react-icons/lia";
import { IoChatboxOutline } from "react-icons/io5";
import { PiKeyReturnLight } from "react-icons/pi";
import Checkbox from '@mui/material/Checkbox';
import { BiSupport } from "react-icons/bi";
import { BsWallet2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-gradient-to-b from-sky-50 to-white mt-8">

        {/* ✅ Top Features Bar */}
        <div className="w-full bg-white border-y border-sky-100 py-6 px-4 sm:px-8 md:px-14 lg:px-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">

            <div className="flex flex-col items-center justify-center group py-2">
              <div className="w-[58px] h-[58px] sm:w-[64px] sm:h-[64px] rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center mb-2 group-hover:bg-sky-100 group-hover:border-sky-300 transition-all duration-300 shadow-sm">
                <LiaShippingFastSolid className="text-[30px] sm:text-[34px] text-sky-500 group-hover:-translate-y-1 transition-transform duration-300" />
              </div>
              <h3 className="text-[12px] sm:text-[13px] font-[700] text-gray-800 text-center">Free Shipping</h3>
              <p className="text-[10px] sm:text-[11px] text-gray-400 text-center mt-0.5">For all Orders Over $100</p>
            </div>

            <div className="flex flex-col items-center justify-center group py-2">
              <div className="w-[58px] h-[58px] sm:w-[64px] sm:h-[64px] rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center mb-2 group-hover:bg-sky-100 group-hover:border-sky-300 transition-all duration-300 shadow-sm">
                <PiKeyReturnLight className="text-[30px] sm:text-[34px] text-sky-500 group-hover:-translate-y-1 transition-transform duration-300" />
              </div>
              <h3 className="text-[12px] sm:text-[13px] font-[700] text-gray-800 text-center">30 Days Returns</h3>
              <p className="text-[10px] sm:text-[11px] text-gray-400 text-center mt-0.5">For an Exchange Product</p>
            </div>

            <div className="flex flex-col items-center justify-center group py-2">
              <div className="w-[58px] h-[58px] sm:w-[64px] sm:h-[64px] rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center mb-2 group-hover:bg-sky-100 group-hover:border-sky-300 transition-all duration-300 shadow-sm">
                <BsWallet2 className="text-[28px] sm:text-[32px] text-sky-500 group-hover:-translate-y-1 transition-transform duration-300" />
              </div>
              <h3 className="text-[12px] sm:text-[13px] font-[700] text-gray-800 text-center">Secure Payment</h3>
              <p className="text-[10px] sm:text-[11px] text-gray-400 text-center mt-0.5">100% Safe & Protected</p>
            </div>

            <div className="flex flex-col items-center justify-center group py-2">
              <div className="w-[58px] h-[58px] sm:w-[64px] sm:h-[64px] rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center mb-2 group-hover:bg-sky-100 group-hover:border-sky-300 transition-all duration-300 shadow-sm">
                <LiaGiftSolid className="text-[30px] sm:text-[34px] text-sky-500 group-hover:-translate-y-1 transition-transform duration-300" />
              </div>
              <h3 className="text-[12px] sm:text-[13px] font-[700] text-gray-800 text-center">Gift Wrapping</h3>
              <p className="text-[10px] sm:text-[11px] text-gray-400 text-center mt-0.5">Special Packaging Available</p>
            </div>

            <div className="flex flex-col items-center justify-center group py-2 col-span-2 sm:col-span-1">
              <div className="w-[58px] h-[58px] sm:w-[64px] sm:h-[64px] rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center mb-2 group-hover:bg-sky-100 group-hover:border-sky-300 transition-all duration-300 shadow-sm">
                <BiSupport className="text-[30px] sm:text-[34px] text-sky-500 group-hover:-translate-y-1 transition-transform duration-300" />
              </div>
              <h3 className="text-[12px] sm:text-[13px] font-[700] text-gray-800 text-center">24/7 Support</h3>
              <p className="text-[10px] sm:text-[11px] text-gray-400 text-center mt-0.5">Dedicated Customer Care</p>
            </div>

          </div>
        </div>

        {/* ✅ Main Footer Content */}
        <div className="w-full px-4 sm:px-8 md:px-14 lg:px-20 py-10">

          {/* ✅ Mobile: 1 col | sm: 2 col | lg: 4 col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

            {/* Part 1 — Brand + Contact
                Mobile: full width (1 col)
                sm: full width (2 col span)
                lg: 1 col normal */}
            <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-1">

              <h2 className="text-[28px] font-[900] tracking-tight leading-tight">
                <span className="text-sky-500">Shop</span>
                <span className="text-gray-800">Nest</span>
              </h2>

              <p className="text-[12px] text-gray-400 leading-relaxed">
                ShopNest — Mega Super Store<br />
                507-Union Trade Center France
              </p>

              <Link to="mailto:sales@shopnest.com" className="text-[12px] text-sky-500 hover:text-sky-600 transition-colors">
                Sales@shopnest.com
              </Link>

              <span className="text-[17px] font-[600] text-sky-500">(+92 3206474543)</span>

              {/* ✅ Mobile par row, desktop par column */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 lg:flex-col lg:items-start gap-3">
                <div className="flex items-center gap-3 bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 w-fit">
                  <IoChatboxOutline className="text-[32px] text-sky-500 shrink-0" />
                  <div>
                    <p className="text-[13px] font-[600] text-gray-700">Online Chat</p>
                    <hr className="border-sky-200 my-1" />
                    <p className="text-[11px] text-gray-400">Get Expert Help</p>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-3">
                  {[
                    { icon: <FaFacebookF />, href: '#' },
                    { icon: <FaInstagram />, href: '#' },
                    { icon: <FaTwitter />, href: '#' },
                    { icon: <FaYoutube />, href: '#' },
                  ].map((s, i) => (
                    <a key={i} href={s.href}
                      className="w-8 h-8 rounded-full bg-sky-100 hover:bg-sky-500 text-sky-500 hover:text-white flex items-center justify-center text-[13px] transition-all duration-300">
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Part 2 — Products
                Mobile: col 1
                sm: col 1 (left)
                lg: col 2 */}
            <div className="sm:col-span-1 lg:col-span-1">
              <h2 className="text-[13px] font-[800] text-gray-800 uppercase tracking-widest mb-1">Products</h2>
              <div className="w-8 h-[2.5px] bg-sky-500 rounded mb-4" />
              <ul className="flex flex-col gap-[10px]">
                {['Prices Drops', 'New Products', 'Best Sales', 'Contact Us', 'Sitemap', 'Stores'].map((item) => (
                  <li key={item}>
                    <Link to="/" className="text-[13px] text-gray-500 hover:text-sky-500 hover:pl-1 transition-all duration-200">
                      → {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Part 3 — Our Company
                Mobile: col 1
                sm: col 2 (right)
                lg: col 3 */}
            <div className="sm:col-span-1 lg:col-span-1">
              <h2 className="text-[13px] font-[800] text-gray-800 uppercase tracking-widest mb-1">Our Company</h2>
              <div className="w-8 h-[2.5px] bg-sky-500 rounded mb-4" />
              <ul className="flex flex-col gap-[10px]">
                {['Delivery', 'Legal Notice', 'Terms & Conditions', 'About Us', 'Secure Payment', 'Login'].map((item, i) => (
                  <li key={item}>
                    <Link to={i === 5 ? '/login' : '/'} className="text-[13px] text-gray-500 hover:text-sky-500 hover:pl-1 transition-all duration-200">
                      → {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Part 4 — Newsletter
                Mobile: full width
                sm: full width (2 col span)
                lg: 1 col normal */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h2 className="text-[13px] font-[800] text-gray-800 uppercase tracking-widest mb-1">Newsletter</h2>
              <div className="w-8 h-[2.5px] bg-sky-500 rounded mb-4" />
              <p className="text-[12px] text-gray-400 leading-relaxed mb-4">
                Subscribe to our latest newsletter to get news about special discounts.
              </p>
              <form>
                <input
                  type="email"
                  className="w-full h-[44px] border border-sky-200 outline-none pl-4 pr-4 text-sm rounded-lg bg-white focus:border-sky-400 transition-colors duration-200 placeholder:text-gray-300"
                  placeholder="Enter your email address"
                />
              </form>
              <Button className="!mt-3 !w-full !bg-sky-500 hover:!bg-sky-600 !text-white !rounded-lg !h-[42px] !text-[13px] !font-[700] !normal-case !tracking-wide !transition-all !duration-300">
                Subscribe Now
              </Button>
              <FormControlLabel
                className="!w-full !mt-2"
                control={
                  <Checkbox
                    defaultChecked
                    size="small"
                    sx={{ color: '#0ea5e9', '&.Mui-checked': { color: '#0ea5e9' } }}
                  />
                }
                label={
                  <span className="text-[11px] text-gray-400">
                    I agree to the terms and conditions and the privacy policy
                  </span>
                }
              />
            </div>

          </div>
        </div>

        <div className="w-full border-t border-sky-100" />

        {/* ✅ Bottom Bar */}
        <div className="w-full bg-white py-4 px-4 sm:px-8 md:px-14 lg:px-20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[12px] text-gray-400 text-center sm:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="text-sky-500 font-[700]">ShopNest</span>
              {" "}— All Rights Reserved
            </p>
            <p className="text-[12px] text-gray-400 text-center sm:text-right">
              Designed & Developed by{" "}
              <span className="font-[600] text-gray-600">Hafiz Mahtab Afzal</span>
            </p>
          </div>
        </div>

      </footer>
    </>
  );
};

export default Footer;