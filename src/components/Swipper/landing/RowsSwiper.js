// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import FilmCoverOne from '../../../../public/images/landing/image 2.png';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import { Progress } from '@nextui-org/react';

export default function RowsSwiper() {
  return (
    <>
      <Swiper navigation={true} slidesPerView={4} spaceBetween={10} modules={[Navigation]} className="mySwiper">
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <SwiperSlide key={item} className="relative">
            <Image src={FilmCoverOne} alt="" unoptimized className='w-full h-full object-cover' />
            <div className="absolute left-0  bottom-2 w-full">
              <div className="py-2 px-5 max-w-fit rounded-r-lg shadow bg-orange-400 text-center flex flex-col gap-y-1">
                <h3 className="font-bold text-white text-lg">23 434 $ (23%)</h3>
                <Progress size="sm" color="white" aria-label="Loading..." value={25} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
