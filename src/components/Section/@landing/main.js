import Link from 'next/link';
import LandingSwiper from '../../Swipper/landing/LandingSwiper';
import RowsSwiper from '../../Swipper/landing/RowsSwiper';
import RowsSwiperWithCart from '../../Swipper/landing/RowsSwiperWithCart';
import Layout from '../../../container/Layout/Layout';


export default function Home() {
  return (
    <Layout>
      {/* swiper */}
      <div className="w-full hidden lg:block">
        <LandingSwiper />
      </div>
      <section className="w-full max-w-screen-3xl mx-auto pb-20">
        <div className="flex flex-col gap-y-4 w-full max-w-screen-2xl mx-auto">
          <h2 className="text-white text-3xl font-bold">Live Funding Films</h2>
          <Link href={'/'} className="text-secondary capitalize ">
            View All
          </Link>
        </div>
        <RowsSwiper />
      </section>
      <section className="w-full max-w-screen-3xl mx-auto pb-20">
        <div className="flex flex-col gap-y-4 w-full max-w-screen-2xl mx-auto">
          <h2 className="text-white text-3xl font-bold">Featured films</h2>
          <Link href={'/'} className="text-secondary capitalize ">
            View All
          </Link>
        </div>
        <RowsSwiperWithCart />
      </section>
    </Layout>
  );
}
