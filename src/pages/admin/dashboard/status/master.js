import React from 'react';
import AdminLayout from '../../../../container/admin/adminLayout';
import { wrapper } from '../../../../redux/store';
import { getState } from '../../../../redux/state';
import { useSelector } from 'react-redux';

export default function Master() {
  const { data } = useSelector((state) => state.state);

  return (
    <AdminLayout>
      <h1 className="text-white text-xl"> Master Status </h1>
      <div className="flex w-full rounded-lg border border-gray/10 px-4  flex-col mx-auto py-8 gap-y-8 max-w-fit">
        <h6 className="text-white/80 text-sm ">
          <b>publick Key</b> : {data ? data?.publicKey : ''}
        </h6>
        <h6 className="text-white/80 text-sm ">
          <b>Account Count</b> : {data ? data?.account?.count : ''}
        </h6>
      </div>
    </AdminLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  await store.dispatch(getState(ctx));
  return {
    props: {},
  };
});
