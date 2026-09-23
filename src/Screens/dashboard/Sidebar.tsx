import { TbTruckDelivery, TbUserFilled } from "react-icons/tb"
import { TiHomeOutline } from "react-icons/ti"
import { MdAddBox } from "react-icons/md"
import { LuMenu } from "react-icons/lu"
import { ImUsers } from "react-icons/im"
import { useState, useEffect } from "react"
import { IoIosArrowDown } from "react-icons/io"
import { MdProductionQuantityLimits } from "react-icons/md"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { BsBoxSeam, BsPersonSlash } from "react-icons/bs"

const Sidebar = () => {

  const navigate = useNavigate()

  const [openall, setOpenall] = useState(false)
  const [openUsers, setOpenUsers] = useState(false)  // ✅ Users dropdown state
  const [open, setopen] = useState(false)

  const location = useLocation()
  const isActive = (path: string) => location.pathname === path

  useEffect(() => {
    if (
      location.pathname.startsWith("/dashboard/product") ||
      location.pathname === "/dashboard/addproduct" ||
      location.pathname === "/dashboard/addcategory"
    ) {
      setOpenall(true)
    }
    // ✅ Users wale routes par bhi dropdown khula rahe
    if (
      location.pathname === "/dashboard/users" ||
      location.pathname === "/dashboard/blocked-users"
    ) {
      setOpenUsers(true)
    }
  }, [location.pathname])

  const isProductsActive =
    location.pathname.startsWith("/dashboard/product") ||
    location.pathname === "/dashboard/addproduct" ||
    location.pathname === "/dashboard/addcategory"

  // ✅ Users button active — kisi bhi subcategory par ho tab bhi
  const isUsersActive =
    location.pathname === "/dashboard/users" ||
    location.pathname === "/dashboard/blocked-users"

  const logout = () => {
    navigate("/login")
  }

  return (
    <>
    <div>
      <button
        className="fixed pt-4 pl-4 z-50 text-3xl lg:hidden"
        onClick={() => setopen(!open)}
      >
        <LuMenu />
      </button>

      <div className={`h-full min-h-screen overflow-y-auto lg:overflow-visible p-4 pt-6 bg-gradient-to-b from-sky-50 via-white to-sky-50 border-r border-sky-100 shadow-xl transform transition-transform duration-300
        lg:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        fixed lg:static z-40
      `}>

        {/* Logo */}
        <div className="flex items-center gap-3 mt-8 lg:mt-0 mb-10 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center shadow-md shadow-sky-200">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div>
            <span className="text-xl font-extrabold text-sky-600">Shop</span>
            <span className="text-xl font-extrabold text-cyan-500">Nest</span>
          </div>
        </div>

        {/* ✅ Mobile par koi bhi link dabate hi drawer band ho jaye */}
        <nav className="flex flex-col gap-2 text-[15px] font-medium" onClick={(e) => { if ((e.target as HTMLElement).closest('a')) setopen(false) }}>

          {/* Dashboard */}
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 rounded-lg px-4 py-[10px] transition-all duration-200 ${
              isActive("/dashboard")
                ? "bg-sky-500 text-white shadow-sm shadow-sky-200"
                : "text-slate-600 hover:bg-sky-50 hover:text-sky-600"
            }`}
          >
            <TiHomeOutline className="text-[20px]" /> Dashboard
          </Link>

          {/* Profile */}
          <Link
            to="/dashboard/profile"
            className={`flex items-center gap-3 rounded-lg px-4 py-[10px] transition-all duration-200 ${
              isActive("/dashboard/profile")
                ? "bg-sky-500 text-white shadow-sm shadow-sky-200"
                : "text-slate-600 hover:bg-sky-50 hover:text-sky-600"
            }`}
          >
            <TbUserFilled className="text-[18px]" /> Profile
          </Link>

          {/* Orders */}
          <Link
            to="/dashboard/allorders"
            className={`flex items-center gap-3 rounded-lg px-4 py-[10px] transition-all duration-200 ${
              isActive("/dashboard/allorders")
                ? "bg-sky-500 text-white shadow-sm shadow-sky-200"
                : "text-slate-600 hover:bg-sky-50 hover:text-sky-600"
            }`}
          >
            <TbTruckDelivery className="text-[18px]" /> All Orders
          </Link>

          {/* Products Dropdown */}
          <button
            className={`flex items-center justify-between w-full rounded-lg px-4 py-[10px] transition-all duration-200 ${
              isProductsActive
                ? "bg-sky-500 text-white shadow-sm shadow-sky-200"
                : "text-slate-600 hover:bg-sky-50 hover:text-sky-600"
            }`}
            onClick={() => setOpenall(!openall)}
          >
            <span className="flex items-center gap-3">
              <MdProductionQuantityLimits className="text-[20px]" /> Products
            </span>
            <IoIosArrowDown
              className={`text-[14px] transition-transform duration-200 ${openall ? "rotate-180" : ""}`}
            />
          </button>

          {openall && (
            <div className="flex flex-col gap-1 pl-8">
              <Link
                to="/dashboard/addproduct"
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-[14px] transition-all duration-200 ${
                  isActive("/dashboard/addproduct")
                    ? "bg-sky-500 text-white shadow-sm shadow-sky-200"
                    : "text-slate-500 hover:text-sky-600 hover:bg-sky-50"
                }`}
              >
                <MdAddBox className="text-[18px]" /> Add Product
              </Link>

              <Link
                to="/dashboard/product-list"
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-[14px] transition-all duration-200 ${
                  isActive("/dashboard/product-list")
                    ? "bg-sky-500 text-white shadow-sm shadow-sky-200"
                    : "text-slate-500 hover:text-sky-600 hover:bg-sky-50"
                }`}
              >
                <BsBoxSeam className="text-[18px]" /> All Products
              </Link>

              <Link
                to="/dashboard/addcategory"
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-[14px] transition-all duration-200 ${
                  isActive("/dashboard/addcategory")
                    ? "bg-sky-500 text-white shadow-sm shadow-sky-200"
                    : "text-slate-500 hover:text-sky-600 hover:bg-sky-50"
                }`}
              >
                <MdAddBox className="text-[18px]" /> Add Category
              </Link>
            </div>
          )}

          {/* ✅ Users Dropdown — sirf admin ke liye */}
          
            <>
              <button
                className={`flex items-center justify-between w-full rounded-lg px-4 py-[10px] transition-all duration-200 ${
                  isUsersActive
                    ? "bg-sky-500 text-white shadow-sm shadow-sky-200"
                    : "text-slate-600 hover:bg-sky-50 hover:text-sky-600"
                }`}
                onClick={() => setOpenUsers(!openUsers)}
              >
                <span className="flex items-center gap-3">
                  <ImUsers className="text-[18px]" /> Users
                </span>
                <IoIosArrowDown
                  className={`text-[14px] transition-transform duration-200 ${openUsers ? "rotate-180" : ""}`}
                />
              </button>

              {openUsers && (
                <div className="flex flex-col gap-1 pl-8">
                  <Link
                    to="/dashboard/users"
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-[14px] transition-all duration-200 ${
                      isActive("/dashboard/users")
                        ? "bg-sky-500 text-white shadow-sm shadow-sky-200"
                        : "text-slate-500 hover:text-sky-600 hover:bg-sky-50"
                    }`}
                  >
                    <ImUsers className="text-[18px]" /> All Users
                  </Link>

                  <Link
                    to="/dashboard/blocked-users"
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-[14px] transition-all duration-200 ${
                      isActive("/dashboard/blocked-users")
                        ? "bg-sky-500 text-white shadow-sm shadow-sky-200"
                        : "text-slate-500 hover:text-sky-600 hover:bg-sky-50"
                    }`}
                  >
                    <BsPersonSlash className="text-[18px]" /> Blocked Users
                  </Link>
                </div>
              )}
            </>
          

        </nav>

        {/* Logout */}
        <div className="mt-8 pt-4 border-t border-sky-100">
          <button
            onClick={logout}
            className="w-full text-center bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg px-4 py-[10px] transition-all duration-200 shadow-sm shadow-sky-200"
          >
            Logout
          </button>
        </div>

      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setopen(false)}
        />
      )}
    </div>
    </>
  )
}

export default Sidebar