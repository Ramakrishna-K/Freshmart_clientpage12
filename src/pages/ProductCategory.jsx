

import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category
  );

  return (
    <div className="mt-16 px-4">
      {searchCategory && (
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-6">
          {searchCategory.text.toUpperCase()}
        </h1>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-40">
          <h1 className="text-lg md:text-xl font-medium">
            No products found
          </h1>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;