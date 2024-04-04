import Link from 'next/link';
import Layout from '../container/Layout/Layout';
import LandingSwiper from '../components/Swipper/landing/LandingSwiper';
import RowsSwiper from '../components/Swipper/landing/RowsSwiper';
import RowsSwiperWithCart from '../components/Swipper/landing/RowsSwiperWithCart';

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
