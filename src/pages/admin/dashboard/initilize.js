import React, { useMemo } from 'react';
import AdminLayout from '../../../container/admin/adminLayout';
import { parseDate } from '@internationalized/date';

import FormProvider from '../../../components/forms/FormProvider';
import { useForm } from 'react-hook-form';
import CustomDatePicker from '../../../components/forms/CustomDatePicker';
import CustomButton from '../../../components/common/CustomButton';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Keypair } from '@solana/web3.js';
import { useDispatch, useSelector } from 'react-redux';
import { createInit, getInit } from '../../../redux/state';
import toast from 'react-hot-toast';
import { wrapper } from '../../../redux/store';
import Link from 'next/link';

export default function Initilize() {
  const wallet = useAnchorWallet();
  const { singleLoading, init } = useSelector((state) => state.state);
  const dispatch = useDispatch();
  const defaultValues = useMemo(
    () => ({
      value: { start: parseDate('2024-04-01'), end: parseDate('2024-04-08') },
      value2: { start: parseDate('2024-05-01'), end: parseDate('2024-05-08') },
    }),
    []
  );

  const methods = useForm({ defaultValues });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    const { value, value2 } = data;
    const { start: start1, end: end1 } = convertDate(value.start, value.end);
    const { start: start2, end: end2 } = convertDate(value2.start, value2.end);
    const init = Keypair.generate();
    const args = { start1, end1, start2, end2 };
    const res = await dispatch(createInit({ init, wallet, args }));
    if (res.type === 'createInit/rejected') {
      toast.error(res.payload);
    } else {
      toast.success('initilize sucess');
    }
    reset();
  };
  const convertDate = (date1, date2) => {
    const start = new Date(date1.toDate()).toISOString();
    const end = new Date(date2.toDate()).toISOString();
    return { start, end };
  };
  return (
    <AdminLayout>
      {init ? (
        <>
          <div className="flex flex-col max-w-xs gap-y-2 items-center mx-auto">
            <p className="text-center py-4 text-red-400">You called the Init once</p>
            <Link className="text-secondary" href={'/admin/dashboard/status/Initial'}>
              Go To Init Status
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-white text-xl">Add Initilize </h1>
          <div className="w-full max-w-md mx-auto">
            <FormProvider method={methods} onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                <CustomDatePicker name="value" label="First Reveal Data" />
                <CustomDatePicker name="value2" label="Second Reveal Data" />
                <CustomButton isLoading={singleLoading} size="md" type="submit">
                  Initilize
                </CustomButton>
              </div>
            </FormProvider>
          </div>
        </>
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
