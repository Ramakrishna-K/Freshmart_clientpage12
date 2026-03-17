


import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  if (!product) return null;

  return (
    <div
      onClick={() => {
        navigate(`/product/${product.category.toLowerCase()}/${product._id}`);
        scrollTo(0, 0);
      }}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 flex flex-col text-center cursor-pointer"
    >
      {/* IMAGE */}
      <div className="w-full aspect-square flex items-center justify-center">
        <img
          src={`http://localhost:5000/images/${product.image[0]}`}
          alt={product.name}
          className="max-h-24 sm:max-h-28 md:max-h-32 object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* CATEGORY */}
      <p className="text-gray-400 text-xs mt-1">{product.category}</p>

      {/* NAME */}
      <p className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2 mt-1">
        {product.name}
      </p>

      {/* RATING */}
      <div className="flex items-center justify-center gap-0.5 mt-1">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <img
              key={i}
              src={i < 4 ? assets.star_icon : assets.star_dull_icon}
              alt="rating"
              className="w-3"
            />
          ))}
        <span className="text-xs text-gray-500">(4)</span>
      </div>

      {/* PRICE + ADD BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 gap-2">

        {/* PRICE */}
        <p className="text-indigo-600 font-semibold text-xs sm:text-sm">
          ₹{product.offerPrice}
          <span className="ml-1 text-gray-400 text-xs line-through">
            ₹{product.price}
          </span>
        </p>

        {/* CART BUTTON */}
        <div onClick={(e) => e.stopPropagation()}>
          {!cartItems?.[product._id] ? (
            <button
              onClick={() => addToCart(product._id)}
              className="flex items-center justify-center gap-1
              bg-indigo-100 border border-indigo-300 text-indigo-600
              rounded font-medium
              w-full ,sm:w-[72px] ,md:w-[80px]
              ,h-[28px] ,sm:h-[32px] ,md:h-[36px]
              text-[11px] sm:text-sm
              hover:bg-indigo-200 transition"
            >
              <img
                src={assets.cart_icon}
                alt="cart"
                className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
              />
              <span>Add</span>
            </button>
          ) : (
            <div
              className="flex items-center justify-center gap-2
              bg-indigo-500/20 rounded text-indigo-700
              w-full ,sm:w-[72px] ,md:w-[80px]
              ,h-[28px] ,sm:h-[32px] ,md:h-[36px]"
            >
              <button onClick={() => removeFromCart(product._id)}>−</button>
              <span className="text-sm">{cartItems[product._id]}</span>
              <button onClick={() => addToCart(product._id)}>+</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductCard;