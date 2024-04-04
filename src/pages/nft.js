import React from 'react';
import Layout from '../container/Layout/Layout';
import { Avatar, Card, CardBody, CardFooter } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import NFTToken from '../../public/images/nft/image 1.png';
import NFTToken2 from '../../public/images/nft/image 2.png';
import NFTToken3 from '../../public/images/nft/image 3.png';
import NFTToken4 from '../../public/images/nft/image 4.png';

import Image from 'next/image';
import { useRouter } from 'next/router';

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
          {[...items, ...items, ...items, ...items].map((item, index) => (
            <Card className='bg-[#192335]' key={index} shadow="sm" isPressable onPress={() => setTimeout(() => {
                router.push("/burn")
            } , 500)}>
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={'test'}
                  className="w-full object-cover h-[257px]"
                  src={item.image}
                />
              </CardBody>
              <CardFooter className="flex flex-col w-full items-start px-6 gap-y-4">
                <b>Cookie Black</b>
                <p className="text-gray/70 text-sm">Fortune Cookie NFT's</p>
                <span className="flex items-center gap-x-4">
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" isBordered color="warning" />
                  <span className="py-2 px-4 rounded-full border border-gray/70 text-white">1 FTM</span>
                </span>
                <span className="flex items-center w-full justify-between gap-x-4">
                  <p className="text-secondary">Place a bid</p>
                  <span className="flex tiem-center gap-x-1 text-gray/70">
                    <span>12</span>
                    <Icon icon={'tabler:heart'} width={23} />
                  </span>
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

const items = [{ image: NFTToken }, { image: NFTToken2 }, { image: NFTToken3 }, { image: NFTToken4 }];
