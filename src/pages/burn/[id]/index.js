import React, { useEffect, useState } from 'react';
import { Avatar, BreadcrumbItem, Breadcrumbs, Button, Image } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../../container/Layout/Layout';
import BurnModal from '../../../components/Modal/BurnModal';
import { getAllNFTByID } from '../../../redux/burn.slice';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import Loading from '../../../components/loading';
import RevealButtonCmp from '../../../components/reveal/revealHandler';
import { getRevelInit } from '../../../redux/Reveal.slice';

export default function BurnPage() {
  const [openModal, setOpenModal] = useState(false);
  const { loading, item } = useSelector((state) => state.burn);
  const dispatch = useDispatch();
  const wallet = useAnchorWallet();
  const { query } = useRouter();
  const { id } = query;
  console.log(item);
  useEffect(() => {
    async function fetchData() {
      await dispatch(getAllNFTByID({ wallet, id }));
      await dispatch(getRevelInit({ wallet }));
    }
    fetchData();
  }, [dispatch, wallet, id]);

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
            <BreadcrumbItem>Redeem</BreadcrumbItem>
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
                    <div className="pt-24 text-secondary">The Fortune Cookie</div>
                    <div className="flex flex-col gap-y-4">
                      <div className="w-full flex items-center justify-between">
                        <h4 className="text-white">Romantic Comedy</h4>
                        <span className="text-gray/70 text-xs">
                          {new Date().toLocaleDateString('en', { year: 'numeric', month: '2-digit', day: '2-digit' })}
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
                            <span className="text-white text-sm">Asif Bashir</span>
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
                          <p className="text-[#CBD5E1] text-sm text-justify">
                            A man and a woman lose their mojo after a chance encounter with a Fortune Cookie.
                          </p>
                          <p className="text-[#CBD5E1] text-sm text-justify">
                            Steve is a self-obsessed consultant on assignment in South East Asia. His lack of respect
                            for his peers and women coupled with a distinct lack of culture had never been a barrier for
                            success.
                          </p>
                          <p className="text-[#CBD5E1] text-sm text-justify">
                            Maria is a high-flying career minded doctor, determined to reach the top. She has a
                            business-centric approach to dealing with relationships. Nothing will come in the way of her
                            success.
                          </p>
                          <p className="text-[#CBD5E1] text-sm text-justify">
                            They embark on separate journeys of self-discovery in a unique love story about two people,
                            destined to be together, but not before they’ve travelled all the way around the world to
                            find each other.
                          </p>
                        </div>
                        <div className="py-4 w-full">
                          <RevealButtonCmp
                            title={
                              !item?.revealed && !item?.revealed2
                                ? 'Reveal'
                                : item?.revealed && !item?.revealed2
                                  ? 'What’s My Fortune?'
                                  : ''
                            }
                            reveal1={item?.revealed}
                            metadata={item?.nft}
                            id={item.id}
                            fullWidth
                          />
                        </div>
                      </div>
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
