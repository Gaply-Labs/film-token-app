import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import AuthLogin from '../../../../public/images/auth/LOG IN (1).png';
import AuthLogin2 from '../../../../public/images/auth/image 2png.png';
import AuthLogin3 from '../../../../public/images/auth/image 3.png';

export default function AuthSwiper() {
  return (
    <div className='w-full'>
      <Swiper className="mySwiper">
        <SwiperSlide className='w-full flex items-center justify-center'>
          <Image src={AuthLogin} unoptimized fill className="rounded-xl shadow-lg" alt="login" />
        </SwiperSlide>
        <SwiperSlide className='w-full flex items-center justify-center'>
          <Image src={AuthLogin2} unoptimized  className="rounded-xl shadow-lg" alt="login" />
        </SwiperSlide>
        <SwiperSlide className='w-full flex items-center justify-center'>
          <Image src={AuthLogin3} unoptimized fill className="rounded-xl shadow-lg w-full h-full object-cover" alt="login" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
