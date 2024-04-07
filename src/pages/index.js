import { Keypair } from '@solana/web3.js';
import React, { useState } from 'react';
import Layout from '../container/Layout/Layout';
import Dashboard from '../container/Layout/Dashboard';
import { Icon } from '@iconify/react';
import { Button } from '@nextui-org/react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import mintApi from './api/mint';
import toast from 'react-hot-toast';
import TNXModal from '../components/Modal/TNXModal';

export default function HomePage() {
  const [mint, setMint] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(false);
  const [error, setError] = useState('');
  const messageAccount = Keypair.generate();

  const wallet = useAnchorWallet();
  const upHandler = () => {
    setMint((c) => c + 1);
  };
  const downHandler = () => {
    setMint((c) => (c === 0 ? (c = 0) : c - 1));
  };

  const mintHandler = async () => {
    setLoading(true);
    try {
      const data = await mintApi(wallet, messageAccount);
      console.log(data);
      setData(data);
      setOpenModal(true);
    } catch (error) {
      console.log(error.message);
      setOpenModal(true);
      setError(error.message);
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-screen-2xl  mx-auto w-full py-16">
        <Dashboard>
          <div className="col-span-12 min-h-[60vh] lg:col-span-7 xl:col-span-9 rounded-lg  flex flex-col order-1 lg:order-2 px-2">
            <div className="w-full  flex items-center justify-center bg-black rounded-md shadow p-2 h-80 flex-col">
              <div className="pb-4">Please First Mint ... </div>
              <div className="flex items-center w-full max-w-md gap-x-4 gap-y-4">
                <Button onClick={upHandler} radius="sm" isIconOnly size="md" color="secondary">
                  <Icon icon={'tabler:plus'} width={24} />
                </Button>
                <div className="py-2 w-full items-center justify-center flex-1 rounded-lg border border-secondary text-center">
                  {mint}
                </div>
                <Button onClick={downHandler} radius="sm" color="secondary" isIconOnly size="md">
                  <Icon icon={'tabler:minus'} width={24} />
                </Button>
              </div>
              <div className="flex w-full items-center max-w-md pt-3">
                <Button isLoading={loading} onClick={mintHandler} radius="sm" color="secondary" fullWidth>
                  Mint
                </Button>
              </div>
            </div>
          </div>
        </Dashboard>
      </div>
      <TNXModal open={openModal} onClose={() => setOpenModal(false)} data={data} error={error} />
    </Layout>
  );
}
