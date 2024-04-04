import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Navigation } from 'swiper/modules';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { Icon } from '@iconify/react';

export default function RowsSwiperWithCart() {
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
        slidesPerView={6}
        spaceBetween={5}
        modules={[Navigation]}
        className="mySwiper select-none"
      >
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <SwiperSlide key={item} className="relative select-none z-10">
            <Card className="bg-[#192335] " shadow="sm" isPressable onPress={() => console.log('item pressed')}>
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  width="100%"
                  alt={'this is test'}
                  className="w-full object-cover rounded-t-lg "
                  src={'/images/landing/image 3.png'}
                />
              </CardBody>
              <CardFooter className="flex flex-col gap-y-2 items-start">
                <b>The skin in which I live</b>
                <p className="text-[#F8FAFC] pt-6">Marian Lucas</p>
                <p className="text-gray">2021, 105m</p>
              </CardFooter>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        ref={navigationNextRef}
        className="relative hidden lg:flex cursor-pointer  items-center justify-center h-[260px]"
      >
        <div className="absolute h-full z-20 w-[200px] bg-gradient-to-r from-[#0F172A00] right-0 to-50% from-100%  to-[#0F172A]" />
        <div className="border relative z-30 border-white w-8 h-16 rounded flex items-center justify-center text-white">
          <Icon icon={'solar:alt-arrow-right-linear'} width={24} />
        </div>
      </div>
    </div>
  );
}
