import Layout from '../container/Layout/Layout';
import Dashboard from '../container/Layout/Dashboard';
import { NFTitems } from '../utils/setting';
import NFTCart from '../components/Nft/NFTCart';

export default function Home() {
  return (
    <Layout>
      <div className="max-w-screen-2xl mx-auto px-4 w-full pt-10">
        <Dashboard>
          <div className="col-span-12 lg:col-span-7 xl:col-span-9 rounded-lg bg-[#192335] shadow-md  py-4 px-4">
            <div className="grid grid-cols-2 md:grid-col-3 xl:grid-cols-4 gap-x-5 gap-y-5">
              {[...NFTitems, ...NFTitems, ...NFTitems].map((item, index) => (
                <NFTCart key={index} item={item} />
              ))}
            </div>
          </div>
        </Dashboard>
      </div>
    </Layout>
  );
}
