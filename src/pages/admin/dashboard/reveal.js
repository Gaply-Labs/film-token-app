import React from 'react';

import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useAnchorWallet } from '@solana/wallet-adapter-react';

import CustomButton from '../../../components/common/CustomButton';
import { createReveal, getInit } from '../../../redux/state';
import AdminLayout from '../../../container/admin/adminLayout';
import { wrapper } from '../../../redux/store';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Reveal() {
  const wallet = useAnchorWallet();
  const router = useRouter();

  const { singleLoading, data, init, initKey } = useSelector((state) => state.state);
  const dispatch = useDispatch();
  const masterClickHandler = async () => {
    const res = await dispatch(createReveal({ init: initKey, wallet }));
    if (res.type === 'createMaster/rejected') {
      toast.error(res.payload);
    } else {
      toast.success('reveal  call success');
      router.reload();
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
          <h6 className="text-white/80 text-sm text-center">Click on the Reveal</h6>
          <CustomButton
            isDisabled={init?.account?.revealed1 && init?.account?.revealed2}
            isLoading={singleLoading}
            onClick={masterClickHandler}
            fullWidth
            size="md"
          >
            {!init?.account?.revealed1 ? 'Reveal 1' : 'Reveal 2'}
          </CustomButton>
        </div>
      )}
    </AdminLayout>
  );
}
export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  await store.dispatch(getInit(ctx));
  return {
    props: {},
  };
});
