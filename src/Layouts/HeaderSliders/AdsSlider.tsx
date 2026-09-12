


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import banner1 from '../../img/banner1.avif';
import banner2 from '../../img/banner2.avif';
import banner3 from '../../img/banner3.avif';
import 'swiper/css/navigation';
import 'swiper/css';
import Bannerbox from '../bannerbox/Bannerbox';

interface AdsSliderProps {
  items: number;
}

const AdsSlider: React.FC<AdsSliderProps> = (props) => {
  return (
    <div className='py-5 w-full container'>
      <Swiper
        slidesPerView={props.items}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Bannerbox img={banner1} />
        </SwiperSlide>

        <SwiperSlide>
          <Bannerbox img={banner2} />
        </SwiperSlide>

        <SwiperSlide>
          <Bannerbox img={banner3} />
        </SwiperSlide>

        <SwiperSlide>
          <Bannerbox img={banner1} />
        </SwiperSlide>

        <SwiperSlide>
          <Bannerbox img={banner2} />
        </SwiperSlide>

        <SwiperSlide>
          <Bannerbox img={banner3} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AdsSlider;