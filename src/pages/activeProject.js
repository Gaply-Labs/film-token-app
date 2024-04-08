import React from 'react';
import { Button, Image } from '@nextui-org/react';

import Layout from '../container/Layout/Layout';
import Dashboard from '../container/Layout/Dashboard';
import { useRouter } from 'next/router';

export default function HomePage() {
    const router = useRouter();
  return (
    <Layout>
      <div className="max-w-screen-2xl  mx-auto w-full py-16">
        <Dashboard>
          <div className="col-span-12 min-h-[60vh] lg:col-span-7 xl:col-span-9 rounded-lg  flex flex-col order-1 lg:order-2 px-2">
            <div className="w-full  bg-black rounded-md shadow px-4 py-4 min-h-80 flex-col">
              <h1 className="text-4xl tracking-wide font-bold text-white">Active Projects</h1>
              <div className="flex flex-col gap-y-12 w-full items-center justify-center">
                <div className="px-4 py-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-8">
                  {nfts.map((item) => (
                    <div className="flex flex-col gap-y-4 h-full justify-between" key={item.image}>
                      <Image src={item.image} radius="sm" className="max-h-[330px]" alt="mint" width={'100%'} />
                      <Button radius='sm' onClick={() => router.push(item.mint)} disable={item.disable} color={item.disable ? "default" : "secondary"}>Buy</Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Dashboard>
      </div>
    </Layout>
  );
}

const nfts = [
  { image: '/images/mint/mint-1.png', mint: '/', disable: false },
  { image: '/images/mint/mint-2.png', mint: '', disable: true },
  { image: '/images/mint/mint-3.png', mint: '', disable: true },
  { image: '/images/mint/mint-4.png', mint: '', disable: true },
];
