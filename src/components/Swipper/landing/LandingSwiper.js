import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Button } from '@nextui-org/react';
import CustomButton from '../../common/CustomButton';
export default function LandingSwiper() {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper h-96"
      >
        {[1, 2, 3].map((item, index) => (
          <SwiperSlide className="relative h-[800px]" key={index}>
            <div
              className={`w-full h-[650px]  bg-[url('/images/landing/Rectangle1.png')] bg-center bg-cover bg-no-repeat relative`}
            />

            <div className=" w-full h-full relative  z-20 px-4 bg-transparent p-2 text-black flex justify-between flex-col max-w-screen-2xl mx-auto -mt-44">
              <div className="flex-1" />
              <div className="flex items-center gap-x-16  relative z-30 ">
                <div className="flex items-end gap-x-8">
                  <div className="flex items-center gap-x-8">
                    <Image
                      src={'/images/landing/image1.png'}
                      unoptimized
                      alt="film"
                      width={179}
                      height={237}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-y-4">
                    <h1 className="text-2xl font-bold text-white tracking-wider capitalize">Pajaros de Verano</h1>
                    <div className="flex items-center gap-x-4">
                      <span className="text-white">Luca Morelli</span>
                      <span className="text-white">2021</span>
                      <span className="text-white">105m</span>
                    </div>
                    <div className="flex items-center gap-x-4">
                      <CustomButton size="md">
                        <Icon icon={'solar:play-linear'} width={20} className="text-white" />
                        <span>Preview</span>
                      </CustomButton>
                      <Button variant="bordered" color="secondary" className="text-white">
                        More Info
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="max-w-lg pt-6">
                  <p className="text-white text-justify">
                    Nulla leo morbi proin nisl scelerisque etiam ullamcorper massa suspendisse mauris aliquam suscipit
                    integer eget mauris, nisl porttitor fermentum, venenatis.
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute w-full h-48 z-10 bottom-[77px] bg-gradient-to-b from-[#0F172A00] from-0% via-[#0F172AE5]  via-90% to-[#0F172A] to-100%" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
