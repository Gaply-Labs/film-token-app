import React, { useEffect, useState } from 'react';
import { Avatar, BreadcrumbItem, Breadcrumbs, Button, Image } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../../container/Layout/Layout';
import BurnModal from '../../../components/Modal/BurnModal';

import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import Loading from '../../../components/loading';
import { getReveelData } from '../../../redux/reveel.slice';

export default function RevealPage() {
  const [openModal, setOpenModal] = useState(false);
  const { loading, data: item } = useSelector((state) => state.reveel);
  const dispatch = useDispatch();
  const wallet = useAnchorWallet();
  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    async function fetchData() {
      dispatch(getReveelData(id));
    }
    fetchData();
  }, [dispatch, wallet, id]);

  // const addburn = () => {
  //   setBurn((c) => c + 1);
  // };
  // const downBurn = () => {
  //   setBurn((c) => (c == 0 ? (c = 0) : c - 1));
  // };

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
            <BreadcrumbItem>Reveal</BreadcrumbItem>
          </Breadcrumbs>
        </div>
        {loading ? (
          <Loading />
        ) : (
          item && (
            <div className="grid grid-cols-12 gap-x-4 gap-y-4 pt-10">
              <div className="col-span-12 lg:col-span-4  flex flex-col gap-y-6">
                <h1 className="text-white text-4xl font-bold">{item.name}</h1>
                <video preload='auto' muted autoPlay loop className="w-full h-96 object-cover  rounded-xl ">
                  <source src={`https://ipfs.io/ipfs/${item.image}`} />
                </video>
              </div>

              <div className="col-span-8 flex flex-col h-full gap-y-4">
                <div className="w-full max-w-2xl mx-auto flex flex-col justify-between h-full gap-y-4">
                  <div className="max-w-lg px-2 h-full flex flex-col justify-between pb-4">
                    <div className="pt-24 text-secondary">{item.name}</div>
                    <div className="flex flex-col gap-y-4">
                      <div className="w-full flex items-center justify-between">
                        <h4 className="text-white">{item.compiler}</h4>
                        <span className="text-gray/70 text-xs">
                          {new Date(item.date).toLocaleDateString('en', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-5">
                          <Avatar
                            size="lg"
                            color="secondary"
                            showFallback
                            fallback={<Icon icon={'tabler:user'} width={23} />}
                          />

                          <div className="flex flex-col ">
                            <span className="text-white text-sm">{item.creator}</span>
                            <span className="text-xs text-gray "> Writer</span>
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
                      <div className="pt-8 " />
                      <div className="flex flex-col gap-y-2 pt-4">
                        <h5 className="font-semibold text-white">Description</h5>
                        <div className="flex flex-col gap-y-4">
                          <p className="text-[#CBD5E1] text-sm text-justify">{item.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex  flex-col gap-y-4 flex-1 justify-end items-end">
                      {/* <Button
                        onClick={() => (!isConnected ? toast.error('first connect to wallet') : setOpenModal(true))}
                        color="secondary"
                        size="lg"
                        fullWidth
                      >
                        Redeem
                      </Button> */}
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
