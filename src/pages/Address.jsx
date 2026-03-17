

import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Address = () => {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const { axios, user, navigate } = useContext(AppContext);

  // Handle form input change
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.post("/api/address/add", { address });

      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Redirect if user not logged in
  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, [user, navigate]);

  return (
    <div className="mt-6 md:mt-12 flex flex-col md:flex-row gap-4 md:gap-6 p-3 sm:p-4 md:p-6 bg-gray-100 rounded-lg shadow-md">

      {/* LEFT SIDE (FORM) */}
      <div className="flex-1 bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow">

        <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">
          Address Details
        </h2>

        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
        >

          {[
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            { label: "Email", name: "email", type: "email", colSpan: 2 },
            { label: "Street", name: "street", type: "text", colSpan: 2 },
            { label: "City", name: "city", type: "text" },
            { label: "State", name: "state", type: "text" },
            { label: "Zip Code", name: "zipCode", type: "number" },
            { label: "Country", name: "country", type: "text" },
            { label: "Phone", name: "phone", type: "number", colSpan: 2 },
          ].map((field) => (
            <div
              key={field.name}
              className={field.colSpan === 2 ? "md:col-span-2" : ""}
            >
              <label className="block text-sm md:text-base text-gray-600">
                {field.label}
              </label>

              <input
                type={field.type}
                name={field.name}
                value={address[field.name]}
                onChange={handleChange}
                className="w-full p-2 border rounded-md text-sm md:text-base focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md text-sm md:text-base transition"
            >
              Save Address
            </button>
          </div>

        </form>
      </div>

      {/* RIGHT SIDE (IMAGE) */}
      <div className="flex-1 flex items-center justify-center mt-4 md:mt-0">

        <img
          src={assets.add_address_iamge}
          alt="Address Illustration"
          className="w-40 sm:w-52 md:w-full max-w-xs rounded-lg shadow-md"
        />

      </div>

    </div>
  );
};

export default Address;