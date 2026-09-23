import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../redux/store';
import Loader from '../Layouts/Loader';
import ProductCard from '../Layouts/ProductCard';
import { getproducts } from '../redux/actions/ProductAction';
import type { Product } from '../redux/slices/productSlice';

const Category = () => {
  const { name } = useParams<{ name: string }>(); // /category/shoes -> name = "shoes"
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';

  const dispatch = useDispatch<AppDispatch>();
  const { products, loader } = useSelector((state: RootState) => state.productSlice);

  useEffect(() => {
    dispatch(getproducts({ category: name, sort }));
  }, [name, sort, dispatch]);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ sort: e.target.value });
  };

  const displayName = name ? name.charAt(0).toUpperCase() + name.slice(1) : '';

  return (
    <div className="bg-white min-h-screen">
      <div className="container py-4">
        {/* Breadcrumb */}
        <p className="text-[13px] text-gray-500 mb-4">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-medium capitalize">{displayName}</span>
        </p>

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-[20px] font-[600] capitalize">{displayName}</h2>
            {!loader && (
              <p className="text-[14px] font-[400] text-gray-500">
                {products.length} product{products.length !== 1 ? 's' : ''} found
              </p>
            )}
          </div>

          <select
            onChange={handleSort}
            value={sort}
            className="border border-gray-300 px-4 py-2 rounded text-sm focus:outline-none"
          >
            <option value="">Default</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="title">A to Z</option>
            <option value="-title">Z to A</option>
          </select>
        </div>

        {/* Products — same grid as homepage */}
        {loader ? (
          <Loader />
        ) : products.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-5xl mb-4">🛍️</p>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">No products found</h3>
            <p className="text-gray-400 text-sm mb-5">
              We don't have any products in <span className="font-medium capitalize">{displayName}</span> right now.
            </p>
            <Link to="/" className="inline-block bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition">
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
            {products.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
