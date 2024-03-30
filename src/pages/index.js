import Layout from '../container/Layout/Layout';
import LandingSwiper from '../components/Swipper/landing/LandingSwiper';

export default function Home() {
  return <Layout>
    {/* swiper */}
    <div className='w-full '>
      <LandingSwiper />
    </div>
  </Layout>;
}
