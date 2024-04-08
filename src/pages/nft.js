import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab } from '@nextui-org/react';
import { Icon } from '@iconify/react';

import toast from 'react-hot-toast';
import Layout from '../container/Layout/Layout';
import Dashboard from '../container/Layout/Dashboard';

import NFTCart from '../components/Nft/NFTCart';
import { addBrnToShop, getAllNFT, getStorage } from '../redux/burn.slice';
import CustomButton from '../components/common/CustomButton';
import BurnModal from '../components/Modal/BurnModal';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import Loading from '../components/loading';

export default function NFTPage() {
  const [openModal, setOpenModal] = useState({ open: false, id: '' });
  const dispatch = useDispatch();
  const { loading, shop, data, storage } = useSelector((state) => state.burn);
  const wallet = useAnchorWallet();

  const { publicKey: isConnected } = useWallet();

  useEffect(() => {
    async function fetchData() {
      await dispatch(getAllNFT({ wallet }));
    }
    dispatch(getStorage());
    fetchData();
  }, [dispatch, wallet]);

  return (
    <Layout>
      <div className="max-w-screen-2xl mx-auto px-4 w-full pt-10">
        <Dashboard isShowBurn>
          {loading ? (
            <Loading />
          ) : (
            <div className="col-span-12 lg:col-span-7 xl:col-span-9 rounded-lg  flex flex-col order-1 lg:order-2">
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
                    {data && data.length !== 0 ? (
                      <div className="grid grid-cols-2 md:grid-col-3 xl:grid-cols-4 gap-x-5 gap-y-5 ">
                        {data.map((item, index) => (
                          <NFTCart
                            as={Link}
                            href={`/burn/${item.id}`}
                            target="_parent"
                            onPress={(item) =>
                              isConnected ? dispatch(addBrnToShop(item)) : toast.error('first connect to wallet')
                            }
                            key={index}
                            item={item}
                            className={`bg-dark ${isConnected ? 'blur-none backdrop-blur-none opacity-100' : 'blur backdrop-blur-md opacity-80'} transition-all ease-in-out duration-500`}
                            shadow="sm"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="capitalize text-center w-full py-10 text-xl">You do not have any film token pirchases</div>
                    )}

                    <div className="w-full flex items-center justify-end">
                      {shop.length !== 0 && (
                        <CustomButton onClick={() => setOpenModal({ open: true, id: data[0].id })} size="md">
                          Redeem
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
                    {storage ? (
                      storage?.length !== 0 ? (
                        <div className="grid grid-cols-2 md:grid-col-3 xl:grid-cols-4 gap-x-5 gap-y-5">
                          {storage?.map((item, index) => (
                            <NFTCart
                              onPress={() => console.log('clciked 2')}
                              key={index}
                              item={item}
                              className="bg-dark"
                              shadow="sm"
                              showPrice
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="w-full flex items-center justify-center h-44">
                          <p className="text-white/60  text-white">You did not burn</p>
                        </div>
                      )
                    ) : (
                      <div className="w-full flex items-center justify-center h-44">
                        <p className="text-white/60  text-white">You did not burn</p>
                      </div>
                    )}
                  </div>
                </Tab>
              </Tabs>
            </div>
          )}
        </Dashboard>
      </div>
      <BurnModal
        id={openModal.id}
        storage={shop}
        open={openModal.open}
        onClose={() => setOpenModal({ open: false, id: '' })}
      />
    </Layout>
  );
}
