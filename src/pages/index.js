
import Layout from '../container/Layout/Layout';
import Dashboard from '../container/Layout/Dashboard';


export default function Home() {
  return (
    <Layout>
      <div className="max-w-screen-2xl mx-auto px-4 w-full pt-10">
        <Dashboard>
          <div className="col-span-12 lg:col-span-7 xl:col-span-9 rounded-lg bg-[#192335] shadow-md " />
        </Dashboard>
      </div>
    </Layout>
  );
}
