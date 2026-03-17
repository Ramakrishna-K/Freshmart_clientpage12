


import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const SingleProduct = () => {
  const { products, navigate, addToCart } = useAppContext();
  const { id } = useParams();

  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const product = products.find((p) => p._id === id);

  useEffect(() => {
    if (product && products.length > 0) {
      const related = products.filter(
        (p) => p.category === product.category && p._id !== product._id
      );
      setRelatedProducts(related.slice(0, 5));
    }
  }, [products, product]);

  useEffect(() => {
    if (product?.image?.length > 0) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="mt-16 px-4">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-600 mb-4">
        <Link to="/">Home</Link> /{" "}
        <Link to="/products">Products</Link> /{" "}
        <Link to={`/products/${product.category.toLowerCase()}`}>
          {product.category}
        </Link>{" "}
        / <span className="text-indigo-500">{product.name}</span>
      </p>

      {/* Product Section */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-16">

        {/* Images */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-2">
            {product.image.map((img, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(img)}
                className="border w-16 sm:w-20 cursor-pointer rounded overflow-hidden"
              >
                <img
                  src={`http://localhost:5000/images/${img}`}
                  alt="thumbnail"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="border rounded overflow-hidden max-w-xs sm:max-w-sm">
            <img
              src={`http://localhost:5000/images/${thumbnail}`}
              alt="product"
              className="w-full object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 text-sm">
          <h1 className="text-2xl sm:text-3xl font-medium">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="star"
                  className="w-3.5 sm:w-4"
                />
              ))}
            <p className="ml-2">(4)</p>
          </div>

          {/* Price */}
          <div className="mt-6">
            <p className="text-gray-400 line-through">
              MRP: ₹{product.price}
            </p>
            <p className="text-xl sm:text-2xl font-medium">
              ₹{product.offerPrice}
            </p>
            <span className="text-gray-400 text-xs">
              (inclusive of all taxes)
            </span>
          </div>

          {/* Description */}
          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500 text-sm">
            {product.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 font-medium transition"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
                scrollTo(0, 0);
              }}
              className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20 text-center">
        <p className="text-2xl font-medium">Related Products</p>
        <div className="w-20 h-0.5 bg-indigo-500 mx-auto mt-2"></div>

        <div className="my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {relatedProducts
            .filter((p) => p.inStock)
            .map((p, index) => (
              <ProductCard key={index} product={p} />
            ))}
        </div>

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="w-full sm:w-1/2 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition"
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;