import React from 'react';
import Layout from '../container/Layout/Layout';

import { useRouter } from 'next/router';
import NFTCart from '../components/Nft/NFTCart';
import { NFTitems } from '../utils/setting';

export default function NFtPage() {
  const router = useRouter();
  return (
    <Layout>
      <div className="pt-10 max-w-screen-2xl w-full mx-auto px-4">
        <h1 className="text-4xl font-bold text-white">NFT Marketpalce</h1>
        {/* <div className="pt-16 w-full rounded-md bg-[#475569] py-4 px-5 flex flex-col gap-y-4">
            <div className='relative w-full max-w-sm rounded-md bg-main px-12 py-1 text-slate-700 flex items-center '>
                <span>search</span>
                <div className='absolute left-2'>
                    <Icon icon={"tabler:search"} width={24}  />
                </div>
            </div>
        </div> */}
        <div className="w-full pt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-6">
          {[...NFTitems, ...NFTitems, ...NFTitems, ...NFTitems].map((item, index) => (
            <NFTCart
              key={index}
              item={item}
              showPrice
              onPress={() =>
                setTimeout(() => {
                  router.replace('/burn');
                }, 500)
              }
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
