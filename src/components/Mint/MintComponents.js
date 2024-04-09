import React, { useState } from 'react';
import TNXModal from '../Modal/TNXModal';
import { Keypair } from '@solana/web3.js';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Button } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';

import mintApi from '../../pages/api/mint';

export default function MintComponents() {
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

  // console.log(wallet.publicKey.toBase58())

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
    <>
      <div className="flex flex-col  max-w-md w-full">
        <div className="flex items-center w-full max-w-md gap-x-4 gap-y-4">
          <Button onClick={downHandler} radius="sm" color="secondary" isIconOnly size="md">
            <Icon icon={'tabler:minus'} width={24} />
          </Button>
          <div className="py-2 w-full items-center justify-center flex-1 rounded-lg border border-secondary text-center">
            {mint}
          </div>

          <Button onClick={upHandler} radius="sm" isIconOnly size="md" color="secondary">
            <Icon icon={'tabler:plus'} width={24} />
          </Button>
        </div>
        <div className="flex w-full items-center max-w-md pt-3">
          <Button isLoading={loading} onClick={mintHandler} radius="sm" color="secondary" fullWidth>
            Buy
          </Button>
        </div>
      </div>
      <TNXModal open={openModal} onClose={() => setOpenModal(false)} data={data} error={error} />
    </>
  );
}
