import { useEffect } from 'react';
import Loader from '../Layouts/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { getproducts, getLatestProducts } from '../redux/actions/ProductAction';
import { setTabProducts } from '../redux/slices/productSlice';
import ProductCard from '../Layouts/ProductCard';
import ProductSlider from '../Layouts/ProductSlider';
import HomeSlider from '../Layouts/HeaderSliders/HomeSlider';
import CategorySlider from '../Layouts/HeaderSliders/CategorySlider';
import AdsSlider from '../Layouts/HeaderSliders/AdsSlider';
import Footer from '../Layouts/Footer';
import type { AppDispatch, RootState } from '../redux/store';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { FaShippingFast } from 'react-icons/fa';

const Index = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loader, products, tabProducts, latestProducts, nextCursor } = useSelector(
    (state: RootState) => state.productSlice
  );

  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch(getproducts());
    dispatch(getLatestProducts());
  }, [dispatch]);

  const handleTabChange = (_e: React.SyntheticEvent, newValue: number) => {
    const tabCategories = ['all', 'dresses', 'shoes'];
    setValue(newValue);
    if (tabCategories[newValue] === 'all') {
      dispatch(setTabProducts(products));
    } else {
      dispatch(setTabProducts(products.filter((p) => p.category === tabCategories[newValue])));
    }
  };

  const handleLoadMore = () => {
    if (nextCursor) {
      dispatch(getproducts({ cursor: nextCursor }));
    }
  };

  return (
    <>
      {/* Hero Slider */}
      <HomeSlider />

      {/* Category Slider */}
      <CategorySlider />

      <div className="bg-white min-h-screen">
        <section className="py-2">
          <div className="container">

            {/* Section 1 — Popular Products */}
            <section className="bg-white py-4 mt-4">
              <div className="container">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 lg:gap-0 mb-2">
                  <div>
                    <h2 className="text-[20px] font-[600]">Popular Products</h2>
                    <p className="text-[14px] font-[400]">
                      Do not miss the current offers until the end of March.
                    </p>
                  </div>
                  <div className="w-full lg:w-[60%]">
                    <Tabs value={value} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
                      <Tab label="All" />
                      <Tab label="Dresses" />
                      <Tab label="Shoes" />
                    </Tabs>
                  </div>
                </div>
                <ProductSlider items={5} products={tabProducts} />
              </div>

              {/* Free Shipping Banner */}
              <div className="w-full lg:w-[80%] my-4 m-auto p-4 border-2 border-[#ff5252] flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-0 text-center lg:text-left">
                <div className="flex items-center gap-4">
                  <FaShippingFast className="text-[36px] lg:text-[50px]" />
                  <span className="text-[16px] lg:text-[20px] font-[600] uppercase">Free Shipping</span>
                </div>
                <p className="font-[500]">Free Delivery on orders above Rs. 10,000</p>
                <p className="font-bold text-[18px] lg:text-[25px]">- Only Rs. 10,000*</p>
              </div>

              {/* Ads Slider */}
              <AdsSlider items={3} />
            </section>

            {/* Section 2 — Latest Products */}
            <section className="mt-6">
              <div className="container">
                <h2 className="text-[20px] font-[600] mb-2">Latest Products</h2>
                <ProductSlider items={5} products={latestProducts} />
              </div>
            </section>

            {/* Section 3 — Just For You */}
            <section className="my-6 container">
              <h2 className="text-[20px] font-[600] my-4">Just For You</h2>
              {loader ? (
                <Loader />
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
                  {products.map((product) => (
                    <ProductCard product={product} key={product._id} />
                  ))}
                </div>
              )}
            </section>

            {/* Section 4 — Load More */}
            <section className="flex justify-center container">
              {nextCursor && (
                <button
                  onClick={handleLoadMore}
                  className="border border-red-600 py-4 text-base font-normal my-8 px-20"
                >
                  LOAD MORE
                </button>
              )}
            </section>

            <Footer />
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;