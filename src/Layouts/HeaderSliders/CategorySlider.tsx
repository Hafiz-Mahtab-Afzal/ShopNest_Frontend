import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import shoes from '../../img/shoes.png';
import watch from '../../img/watch.png';
import handbag from '../../img/handbag.png';
import jacket from '../../img/jacket.png';
import ring from '../../img/ring.png';
import tshirt from '../../img/tshirt.png';
import glasses from '../../img/glasses.png';
import tablet from '../../img/1.avif';
import dresses from '../../img/dresses.png';
import beauty from '../../img/Beauty.png';
import Electronics from '../../img/Electronics.png';
import 'swiper/css/navigation';
import 'swiper/css';

// category name exactly wahi hona chahiye jo DB mein hai
const categories = [
  { name: 'Dresses',     slug: 'dresses',     img: dresses },
  { name: 'Shoes',       slug: 'shoes',        img: shoes },
  { name: 'Beauty',      slug: 'beauty',       img: beauty },
  { name: 'Rings',       slug: 'rings',        img: ring },
  { name: 'Watches',     slug: 'watches',      img: watch },
  { name: 'T-Shirts',    slug: 't-shirts',     img: tshirt },
  { name: 'Jackets',     slug: 'jackets',      img: jacket },
  { name: 'Handbags',    slug: 'handbags',     img: handbag },
  { name: 'Sunglasses',  slug: 'sunglasses',   img: glasses },
  { name: 'Electronics', slug: 'electronics',  img: Electronics },
  { name: 'Tablets',     slug: 'tablets',      img: tablet },
];

const CategorySlider = () => {
  return (
    <div className="container pt-4 sm:pt-8 pb-4">
      <Swiper
        slidesPerView={7}
        breakpoints={{
          // mobile par 2 categories, laptop (1024+) par pehle jaisa
          0: { slidesPerView: 2, spaceBetween: 12 },
          640: { slidesPerView: 3, spaceBetween: 16 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 7, spaceBetween: 30 },
        }}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.slug}>
            <Link to={`/category/${cat.slug}`}>
              <div className="item rounded-md p-3 sm:p-4 bg-white hover:shadow-md transition-shadow duration-200">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="h-28 sm:h-36 hover:scale-110 transition-transform duration-500 mx-auto"
                />
                <h3 className="text-[16px] p-2 text-center font-[500]">{cat.name}</h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySlider;