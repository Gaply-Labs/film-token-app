import React from 'react';
import { Keypair } from '@solana/web3.js';

import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useAnchorWallet } from '@solana/wallet-adapter-react';

import CustomButton from '../../../components/common/CustomButton';
import { createMaster, getState } from '../../../redux/state';
import AdminLayout from '../../../container/admin/adminLayout';
import { wrapper } from '../../../redux/store';
import Link from 'next/link';

export default function Dashboard() {
  const wallet = useAnchorWallet();

  const { singleLoading, data } = useSelector((state) => state.state);
  const dispatch = useDispatch();
  const masterClickHandler = async () => {
    const state = Keypair.generate();
    const res = await dispatch(createMaster({ state, wallet }));
    if (res.type === 'createMaster/rejected') {
      toast.error(res.payload);
    } else {
      toast.success('master call success');
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-white text-xl">Add Master </h1>
      {data ? (
        <div className="flex flex-col max-w-xs gap-y-2 items-center mx-auto">
          <p className="text-center py-4 text-red-400">You called the master once</p>
          <Link className="text-secondary" href={'/admin/dashboard/status/master'}>
            Go To Master Status
          </Link>
        </div>
      ) : (
        <div className="flex w-full rounded-lg border border-gray/10 px-4 max-w-xs flex-col mx-auto py-8 gap-y-8">
          <h6 className="text-white/80 text-sm text-center">
            Click the button below to master the program Pay attention to the fact that you call the master only once
          </h6>
          <CustomButton isLoading={singleLoading} onClick={masterClickHandler} fullWidth size="md">
            Master
          </CustomButton>
        </div>
      )}
    </AdminLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  await store.dispatch(getState(ctx));
  return {
    props: {},
  };
});
