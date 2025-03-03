import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Slider: React.FC = () => {
  const slides = [
    { id: 1, image: 'https://hirsagol.com/wp-content/uploads/2019/03/red-rose.jpg', alt: 'Slide 1' },
    { id: 2, image: 'https://hirsagol.com/wp-content/uploads/2019/03/red-rose.jpg', alt: 'Slide 2' },
    { id: 3, image: 'https://hirsagol.com/wp-content/uploads/2019/03/red-rose.jpg', alt: 'Slide 3' },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop
      className="my-8"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <img src={slide.image} alt={slide.alt} className="w-full h-auto rounded-lg" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;