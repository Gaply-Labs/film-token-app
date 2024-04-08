import React from 'react';
import { Image } from '@nextui-org/react';
import MintComponents from '../components/Mint/MintComponents';
import Layout from '../container/Layout/Layout';
import Dashboard from '../container/Layout/Dashboard';

export default function HomePage() {
  return (
    <Layout>
      <div className="max-w-screen-2xl  mx-auto w-full py-16">
        <Dashboard>
          <div className="col-span-12 min-h-[60vh] lg:col-span-7 xl:col-span-9 rounded-lg  flex flex-col order-1 lg:order-2 px-2">
            <div className="w-full  bg-black rounded-md shadow px-4 py-4 min-h-80 flex-col">
              <h1 className="text-4xl tracking-wide font-bold text-white">Buy an Access Pass</h1>
              <div className="pb-4 w-full flex flex-col items-center justify-center gap-y-4 px-4 max-w-sm mx-auto  py-10">
                <Image src="/images/mint/mint-1.png" radius="sm" className='' alt="mint" width={'100%'} />
                <MintComponents />
              </div>
            </div>
          </div>
        </Dashboard>
      </div>
    </Layout>
  );
}
