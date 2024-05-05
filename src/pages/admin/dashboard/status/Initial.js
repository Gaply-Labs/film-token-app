import React from 'react';
import AdminLayout from '../../../../container/admin/adminLayout';
import { wrapper } from '../../../../redux/store';
import { getInit } from '../../../../redux/state';
import { useSelector } from 'react-redux';
import { Divider } from '@nextui-org/react';

export default function Initilize() {
  const { init: data } = useSelector((state) => state.state);

  return (
    <AdminLayout>
      <h1 className="text-white text-xl"> Master Status </h1>
      <div className="flex w-full rounded-lg border border-gray/10 px-4  flex-col mx-auto py-8 gap-y-8 max-w-fit">
        <h6 className="text-white/80 text-sm ">
          <b>publick Key</b> : {data ? data?.publicKey : ''}
        </h6>
        <div className="text-white/80 text-sm flex flex-col gap-y-2 ">
          <span>
            <b>first Reveal</b> :{data?.account?.revealed1 ? 'Yes' : 'No'}
          </span>
          <span>
            <b>second Reveal</b> :{data?.account?.revealed2 ? 'Yes' : 'No'}
          </span>
        </div>
        <Divider />
        <div className="text-white/80 text-sm flex flex-col gap-y-2 ">
          <span>
            <b>First Range Data</b> :{new Date(data?.account?.start1).toLocaleDateString("en" , {year : "numeric" , month : "long" , day :"2-digit"})} ||{' '}
            {new Date(data?.account?.end1).toLocaleDateString("en" , {year : "numeric" , month : "long" , day :"2-digit"})}
          </span>
          <span>
            <b>second Range Data</b> :{new Date(data?.account?.start2).toLocaleDateString("en" , {year : "numeric" , month : "long" , day :"2-digit"})} ||{' '}
            {new Date(data?.account?.end2).toLocaleDateString("en" , {year : "numeric" , month : "long" , day :"2-digit"})}
          </span>
        </div>
      </div>
    </AdminLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  await store.dispatch(getInit(ctx));
  return {
    props: {},
  };
});
