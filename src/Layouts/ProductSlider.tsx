import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';
import ProductCard from './ProductCard';
import type { Product } from '../redux/slices/productSlice';

interface ProductSliderProps {
  items: number;
  products: Product[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ items, products }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="py-4">
      <Swiper
        slidesPerView={items}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
