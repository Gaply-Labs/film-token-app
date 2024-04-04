import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import FilmCoverOne from '../../../../public/images/landing/image 2.png';
import 'swiper/css';
import 'swiper/css/pagination';

import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import { Progress } from '@nextui-org/react';
import { Icon } from '@iconify/react';

export default function RowsSwiper() {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  return (
    <div className="relative max-w-screen-3xl mx-auto  flex items-center justify-center gap-x-2">
      <div className="relative hidden lg:flex  cursor-pointer h-full" ref={navigationPrevRef}>
        <div className="border border-white w-8 h-16 rounded flex items-center justify-center text-white">
          <Icon icon={'solar:alt-arrow-left-linear'} width={24} />
        </div>
      </div>

      <Swiper
        navigation={
          (true,
          {
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          })
        }
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }}
        slidesPerView={4}
        spaceBetween={10}
        modules={[Navigation]}
        className="mySwiper select-none"
      >
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <SwiperSlide key={item} className="relative select-none z-10">
            <Image src={FilmCoverOne} alt="" unoptimized className="w-full h-full object-cover" />
            <div className="absolute hidden lg:block left-0  bottom-2 w-full">
              <div className="py-2 px-5 max-w-fit rounded-r-lg shadow bg-orange-400 text-center flex flex-col gap-y-1">
                <h3 className="font-bold text-white text-lg">23 434 $ (23%)</h3>
                <Progress size="sm" color="white" aria-label="Loading..." value={25} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div ref={navigationNextRef} className="relative hidden lg:flex cursor-pointer  items-center justify-center h-[260px]">
        <div className="absolute h-full z-20 w-[200px] bg-gradient-to-r from-[#0F172A00] right-0 to-50% from-100%  to-[#0F172A]" />
        <div className="border relative z-30 border-white w-8 h-16 rounded flex items-center justify-center text-white">
          <Icon icon={'solar:alt-arrow-right-linear'} width={24} />
        </div>
      </div>
    </div>
  );
}
