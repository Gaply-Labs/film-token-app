import Layout from '../container/Layout/Layout';
import LandingSwiper from '../components/Swipper/landing/LandingSwiper';
import RowsSwiper from '../components/Swipper/landing/RowsSwiper';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      {/* swiper */}
      <div className="w-full ">
        <LandingSwiper />
      </div>
      <section className="max-w-screen-2xl mx-auto  pb-20">
        <div className="flex flex-col gap-y-4 w-full">
          <h2 className="text-white text-3xl font-bold">Live Funding Films</h2>
          <Link href={'/'} className="text-secondary capitalize ">
            View All
          </Link>
          <RowsSwiper />
        </div>
      </section>
    </Layout>
  );
}
