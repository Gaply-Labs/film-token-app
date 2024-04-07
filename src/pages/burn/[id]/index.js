import React, { useEffect, useState } from 'react';
import { Avatar, BreadcrumbItem, Breadcrumbs, Button, Image } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import Layout from '../../../container/Layout/Layout';
import BurnModal from '../../../components/Modal/BurnModal';
import { addNFTQuantity, getAllNFTByID, minNFTQuantity } from '../../../redux/burn.slice';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import Loading from '../../../components/loading';

export default function BurnPage() {
  const [openModal, setOpenModal] = useState(false);
  const [burn, setBurn] = useState(0);
  const { loading, item } = useSelector((state) => state.burn);
  const dispatch = useDispatch();
  const wallet = useAnchorWallet();
  const { publicKey: isConnected } = useWallet();
  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    async function fetchData() {
      await dispatch(getAllNFTByID({ wallet, id }));
    }
    fetchData();
  }, [dispatch, wallet, id]);

  const addburn = () => {
    setBurn((c) => c + 1);
  };
  const downBurn = () => {
    setBurn((c) => (c == 0 ? (c = 0) : c - 1));
  };

  return (
    <Layout>
      <div className="max-w-screen-2xl w-full mx-auto px-4">
        <div className="w-full flex items-start justify-start pt-8">
          <Breadcrumbs
            separator="/"
            itemClasses={{
              separator: 'px-2',
            }}
          >
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem>‌Burn</BreadcrumbItem>
          </Breadcrumbs>
        </div>
        {loading ? (
          <Loading />
        ) : (
          item && (
            <div className="grid grid-cols-12 gap-x-4 gap-y-4 pt-10">
              <div className="col-span-12 lg:col-span-4  flex flex-col gap-y-6">
                <h1 className="text-white text-4xl font-bold">{item.title}</h1>
                <Image radius="lg" width={'100%'} src={item.image} className="h-[600px] object-cover" alt="nft" />
              </div>

              <div className="col-span-8 flex flex-col h-full gap-y-4">
                <div className="w-full max-w-2xl mx-auto flex flex-col justify-between h-full gap-y-4">
                  <div className="max-w-lg px-2 h-full flex flex-col justify-between pb-4">
                    <div className="pt-16 text-secondary">People 23</div>
                    <div className="flex flex-col gap-y-4">
                      <div className="w-full flex items-center justify-between">
                        <h4 className="text-white">Creator</h4>
                        <span className="text-gray/70 text-xs">
                          {new Date().toLocaleDateString('en', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-5">
                          <Avatar size="lg" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                          <div className="flex flex-col ">
                            <span className="text-white text-sm">Todd Phillips</span>
                            <span className="text-xs text-gray ">Director, Writer</span>
                          </div>
                        </div>
                        <Button
                          color="default"
                          variant="bordered"
                          className="text-gray"
                          radius="full"
                          endContent={<Icon icon={'tabler:heart'} width={24} />}
                        >
                          123
                        </Button>
                      </div>
                      <div className="pt-8 ">
                        <Button
                          color="secondary"
                          size="lg"
                          className="text-white text-xl"
                          radius="full"
                          variant="bordered"
                        >
                          {item.price}
                        </Button>
                      </div>
                      <div className="flex flex-col gap-y-2 pt-4">
                        <h5 className="font-semibold text-white">Description</h5>
                        <p className="text-[#CBD5E1] text-sm text-justify">
                          Best known for hus cerebral, often nonlinear, storytelling, acclaimed writer-director
                          Christopher Nolan was born on July 30, 1970, in Lindon, England.{' '}
                        </p>
                      </div>
                    </div>
                    <div className="flex  flex-col gap-y-4 flex-1 justify-end items-end">
                      <div className="flex items-center gap-x-4 w-full">
                        <Button
                          onClick={addburn}
                          color="secondary"
                          className="w-full max-w-[60px] h-full py-2 px-2 flex items-center justify-center rounded-md "
                        >
                          <Icon icon={'ic:round-plus'} width={24} />
                        </Button>
                        <div className="flex-1 py-2 px-2 flex items-center justify-center border border-secondary rounded-md">
                          {burn}
                        </div>
                        <Button
                          onClick={downBurn}
                          color="secondary"
                          className="w-full max-w-[60px] h-full py-2 px-2 rounded-md flex items-center justify-center "
                        >
                          <Icon icon={'mdi-light:minus'} width={24} />
                        </Button>
                      </div>
                      <Button
                        onClick={() =>
                          !isConnected
                            ? toast.error('first connect to wallet')
                            : burn === 0
                              ? toast.error('The minimum selection limit is 1 for burn')
                              : setOpenModal(true)
                        }
                        color="secondary"
                        size="lg"
                        fullWidth
                      >
                        Burn
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <BurnModal id={id} storage={[item]} open={openModal} onClose={() => setOpenModal(false)} />
    </Layout>
  );
}
