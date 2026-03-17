

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    cartCount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");

      if (data.success) {
        setUser(null);
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      
      <Link to="/">
        <h2 className="text-2xl font-bold text-primary">FreshMart</h2>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link to="/">Home</Link>
        <Link to="/products">All Products</Link>

        {/* Search */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
        </div>

        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img src={assets.cart_icon} alt="cart" className="w-5" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 ,w-[18px] ,h-[18px] rounded-full">
            {cartCount()}
          </button>
        </div>

        {/* User */}
        {user ? (
          <div className="relative group">
            <img src={assets.profile_icon} alt="" className="w-10" />

            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2 w-32 rounded-md z-40 text-sm">
              <li
                onClick={() => navigate("/my-orders")}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                My Orders
              </li>

              <li
                className="cursor-pointer p-2 hover:bg-gray-100"
                onClick={logout}
              >
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
            className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="flex items-center gap-6 md:hidden">

        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <img src={assets.cart_icon} alt="" className="w-5" />

          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 ,w-[18px] ,h-[18px] rounded-full">
            {cartCount()}
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <img src={assets.menu_icon} alt="menu" className="w-6" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute ,top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-3 px-5 text-sm md:hidden`}
      >
        <Link onClick={() => setOpen(false)} to="/">
          Home
        </Link>

        <Link onClick={() => setOpen(false)} to="/products">
          Products
        </Link>

        {user ? (
          <>
            <button
              onClick={() => {
                setOpen(false);
                navigate("/my-orders");
              }}
            >
              My Orders
            </button>

            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
            className="px-6 py-2 bg-indigo-500 text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

