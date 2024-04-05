import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import CustomModal from './CustomModal';
import FormProvider from '../forms/FormProvider';
import CustomInputs from '../forms/CustomInputs';
import CustomButton from '../common/CustomButton';
import { addStorage } from '../../redux/burn.slice';
import { useRouter } from 'next/router';
export default function BurnModal({ open, onClose, storage }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const burnSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    contract: Yup.string().required(),
    fullName: Yup.string().required(),
  });
  const router = useRouter();
  const defaultValues = useMemo(
    () => ({
      contract: '',
      email: '',
      fullName: '',
    }),
    []
  );
  const methods = useForm({
    resolver: yupResolver(burnSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;
  const onSubmit = (data) => {
    console.log(data);
    const shops = storage.map((item) => ({ ...item, ...data }));
    const oldShop = JSON.parse(window.localStorage.getItem('shops'));
    let finalShop = shops;
    if (oldShop) {
      finalShop = [...shops, ...oldShop];
    }
    dispatch(addStorage(finalShop));
    window.localStorage.setItem('shops', JSON.stringify(finalShop));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('burn success');
      onClose();
      // dispatch(resetState());
      reset();
      router.replace('/');
    }, 1000);
  };
  return (
    <CustomModal isOpen={open} handleClose={onClose} title="Burn Form">
      <FormProvider method={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col max-w-md gap-y-4">
          <CustomInputs name="contract" label="contract number" placeholder="eg:0x154564..." />
          <CustomInputs name="email" label="Email Address" type="email" placeholder="eg:example@email.com" />
          <CustomInputs name="fullName" label="Full Name" placeholder="eg:Jack Jordan" />
          <Checkbox>accept terms & conditions</Checkbox>
          <CustomButton isLoading={loading} size="md" fullWidth>
            {loading ? 'loading' : 'Burn'}
          </CustomButton>
        </div>
      </FormProvider>
    </CustomModal>
  );
}

BurnModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  storage: PropTypes.array,
};
