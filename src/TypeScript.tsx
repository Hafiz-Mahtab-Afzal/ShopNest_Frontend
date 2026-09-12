import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './Css/Style.css';
import { ToastContainer } from 'react-toastify';

// Auth screens
import Login from './Screens/auth/Login';
import SignUp from './Screens/auth/Signup';
import CheckEmail from './Screens/auth/CheckEmail';
import Activateaccount from './Screens/auth/Activateaccount';
import ForgotPassword from './Screens/auth/Forgerpassword';
import OTP from './Screens/auth/OTP';
import Success from './Screens/auth/Success';
import Resetpassword from './Screens/auth/Resetpassword';

// Public screens
import Index from './Screens/Index';
import Singlepage from './Screens/Singlepage';
import SearchResults from './Screens/SearchResults';
import Category from './Screens/Category';

// Payment
import Checkout from './Screens/payment/Checkout';
import PaymentSuccess from './Screens/payment/PaymentSuccess';

// Layouts
import MainLayout from './MainLayout';
import Myaccount from './Layouts/Myaccount';
import Orders from './Layouts/Orders';
import Mylist from './Layouts/Mylist';

// Cart
import Cart from './Screens/Cart';

// Dashboard
import Dashboard from './Screens/dashboard/Dashboard';
import Dashboarddesign from './Screens/dashboard/DashboardDesign';
import Profile from './Screens/dashboard/Profile';
import ProductList from './Screens/dashboard/ProductList';
import Users from './Screens/dashboard/Users';
import AddProduct from './Screens/dashboard/Addproduct';
import Editproduct from './Screens/dashboard/Editproduct';
import AddCategory from './Screens/dashboard/AddCategory';
import BlockedUsers from './Screens/dashboard/BlockedUsers';
import Card from './Screens/dashboard/Card';


// Route Guards
import ProtectedRoute from '../route/ProtectedRoute';
import PublicRoute from '../route/PublicRoute';
import Reviews from './Screens/Reviews';
import AllOrders from './Screens/dashboard/AllOrders';
// import Reviews from './Screens/Reviews';
// import Reviews from './Screens/Reviews';


const TypeScript = () => {
  return (
    <div>
      <Router>
        <ToastContainer />
        <Routes>

          {/* Public Pages */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/product/:id" element={<Singlepage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/category/:name" element={<Category />} />
            <Route path='/card' element={<Card />} />

            {/* Private Pages */}
            <Route element={<ProtectedRoute />}>
              <Route path="/myaccount" element={<Myaccount />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/mylist" element={<Mylist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="reviews" element={<Reviews />}/>
            </Route>
          </Route>
          
          {/* Authentication */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/CheckEmail" element={<CheckEmail />} />
            <Route path="/forgetpassword" element={<ForgotPassword />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/resetpassword/:token" element={<Resetpassword />} />
            <Route path="/success" element={<Success />} />
          </Route>

          <Route path="/:token" element={<Activateaccount />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
          </Route>
 
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Dashboarddesign />} />
              <Route path="profile" element={<Profile />} />
              <Route path="product-list" element={<ProductList />} />
              <Route path="users" element={<Users />} />
              <Route path="blocked-users" element={<BlockedUsers />} />
              <Route path="addproduct" element={<AddProduct />} />
              <Route path="editproduct/:id" element={<Editproduct />} />
              <Route path="addcategory" element={<AddCategory />} />
              <Route path="allorders" element={<AllOrders />} />
            </Route>
          </Route>

        </Routes>
      </Router>
    </div>
  );
};

export default TypeScript;