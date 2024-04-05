import { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useAccount } from 'wagmi';
import toast from 'react-hot-toast';
import Layout from '../container/Layout/Layout';
import Dashboard from '../container/Layout/Dashboard';
import { NFTitems } from '../utils/setting';
import NFTCart from '../components/Nft/NFTCart';
import { addBrnToShop, addBurnQuantity, minBurnQuantity } from '../redux/burn.slice';
import CustomButton from '../components/common/CustomButton';
import BurnModal from '../components/Modal/BurnModal';

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { isConnected } = useAccount();
  const { shop, data } = useSelector((state) => state.burn);
  return (
    <Layout>
      <div className="max-w-screen-2xl mx-auto px-4 w-full pt-10">
        <Dashboard>
          <div className="col-span-12 lg:col-span-7 xl:col-span-9 rounded-lg  flex flex-col">
            <Tabs
              color="secondary"
              variant="underlined"
              classNames={{
                base: 'w-full flex items-center justify-end',
                tabList: 'gap-6  relative rounded-none p-0 border-b border-divider',
                cursor: 'w-full bg-secondary',
                tab: 'max-w-fit px-0 h-12 flex items-center justify-end',
                tabContent: 'group-data-[selected=true]:text-secondary',
              }}
            >
              <Tab
                key={'personal'}
                title={
                  <div className="flex items-center space-x-2">
                    <Icon icon={'tabler:list'} width={24} />
                    <span>Personal NFT</span>
                  </div>
                }
              >
                <div className="w-full bg-black py-4 px-4 rounded-lg shadow-md flex flex-col gap-y-8 ">
                  <h2 className="text-2xl font-bold text-white">NFT List</h2>
                  <div className="grid grid-cols-2 md:grid-col-3 xl:grid-cols-4 gap-x-5 gap-y-5 ">
                    {data.map((item, index) => (
                      <NFTCart
                        as={Link}
                        href="/burn"
                        onPress={(item) =>
                          isConnected ? dispatch(addBrnToShop(item)) : toast.error('first connect to wallet')
                        }
                        key={index}
                        item={item}
                        className="bg-dark"
                        shadow="sm"
                        addBurnQ={(id) => dispatch(addBurnQuantity(id))}
                        minBurnQ={(id) => dispatch(minBurnQuantity(id))}
                      />
                    ))}
                  </div>
                  <div className="w-full flex items-center justify-end">
                    {shop.length !== 0 && (
                      <CustomButton onClick={() => setOpenModal(true)} size="md">
                        Burn
                      </CustomButton>
                    )}
                  </div>
                </div>
              </Tab>
              <Tab
                key={'burn'}
                title={
                  <div className="flex items-center gap-x-2">
                    <Icon icon={'tabler:brand-firebase'} width={24} />
                    <span>Burn NFT</span>
                  </div>
                }
              >
                <div className="w-full py-4 px-4 bg-black rounded-lg shadow-md flex flex-col gap-y-8">
                  <h2 className="text-2xl font-bold text-white">Burn List</h2>
                  <div className="grid grid-cols-2 md:grid-col-3 xl:grid-cols-4 gap-x-5 gap-y-5">
                    {NFTitems.map((item, index) => (
                      <NFTCart
                        as={Link}
                        href="/burn"
                        onPress={() => console.log('clciked 2')}
                        key={index}
                        item={item}
                        className="bg-dark"
                        shadow="sm"
                      />
                    ))}
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </Dashboard>
      </div>
      <BurnModal open={openModal} onClose={() => setOpenModal(false)} />
    </Layout>
  );
}
