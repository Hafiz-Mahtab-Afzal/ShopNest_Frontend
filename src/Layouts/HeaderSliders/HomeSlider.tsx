import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';

const slides = [
  'https://img.lazcdn.com/us/domino/5e30413d-415c-4490-aba2-b9c7f621a25c_PK-1976-688.jpg_2200x2200q80.jpg_.avif',
  'https://img.lazcdn.com/us/domino/c68420df-6cfe-40a7-aa9a-0451a1ae956a_PK-1976-688.jpg_2200x2200q80.jpg_.avif',
  'https://img.lazcdn.com/us/domino/0d378724-62b9-41b2-97c8-fa5f882ecd92_PK-1976-688.jpg_2200x2200q80.jpg_.avif',
  'https://img.lazcdn.com/us/domino/6f32dbab-8f3c-4fc1-a707-50dfaa372d2d_PK-1976-688.jpg_2200x2200q80.jpg_.avif',
  'https://img.lazcdn.com/us/domino/6cd12443-88f0-437e-aeab-771aba83bdb1_PK-1976-688.jpg_2200x2200q80.jpg_.avif',
];

const HomeSlider = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        navigation={true}
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        className="sliderHome mySwiper mt-4"
      >
        {slides.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="px-2 sm:px-6 lg:px-10">
              <img className="h-32 sm:h-56 md:h-64 lg:h-96 w-full object-fill rounded-lg" src={src} alt={`slide-${i}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
