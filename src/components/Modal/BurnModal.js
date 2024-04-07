import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Snippet } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useWallet } from '@solana/wallet-adapter-react';
import CustomModal from './CustomModal';
import FormProvider from '../forms/FormProvider';
import CustomInputs from '../forms/CustomInputs';
import CustomButton from '../common/CustomButton';
import { addStorage, resetData } from '../../redux/burn.slice';
import burnApi from '../../pages/api/burn';

export default function BurnModal({ open, onClose, storage, id }) {
  const [loading, setLoading] = useState(false);
  const [showTnx, setShowTnx] = useState(false);
  const [content, setContent] = useState('');

  const wallet = useWallet();

  const dispatch = useDispatch();
  const burnSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    contract: Yup.string().required(),
    fullName: Yup.string().required(),
  });
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
  const onSubmit = async (data) => {
    try {
      const shops = storage.map((item) => ({ ...item, ...data }));
      const oldShop = JSON.parse(window.localStorage.getItem('shops'));
      let finalShop = shops;
      if (oldShop) {
        finalShop = [...shops, ...oldShop];
      }
      dispatch(addStorage(finalShop));
      window.localStorage.setItem('shops', JSON.stringify(finalShop));
      setLoading(true);
      const message = await burnApi(wallet, id);
      // toast.success('burn success');
      setContent(message);
      setTimeout(() => {
        dispatch(resetData());
      }, 300);
      setShowTnx(true);
      reset();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setTimeout(() => {
      reset();
      setContent('');
      onClose();
      window.location.href = '/nft';
    }, 400);
  };

  return (
    <CustomModal isOpen={open} handleClose={handleClose} title="Burn Form">
      {showTnx ? (
        <div className="flex flex-col gap-y-5">
          {content ? (
            <>
              <div className="py-2 w-full rounded-lg bg-green-800 text-center text-white">Success</div>
              <div className="flex flex-col gap-y-2">
                <span>authority TNX : </span>
                <Snippet symbol="" size="lg">
                  <span className="text-sm">{content.authority.toBase58()}</span>
                </Snippet>
              </div>
            </>
          ) : (
            <div className="py-2 w-full rounded-lg bg-red-800 text-center text-white">Error</div>
          )}
          <CustomButton size="md" onClick={handleClose}>
            Close
          </CustomButton>
        </div>
      ) : (
        <FormProvider method={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex flex-col max-w-md gap-y-4">
            <CustomInputs name="contract" label="contract number" placeholder="eg:0x154564..." />
            <CustomInputs name="email" label="Email Address" type="email" placeholder="eg:example@email.com" />
            <CustomInputs name="fullName" label="Full Name" placeholder="eg:Jack Jordan" />
            <Checkbox color="secondary">accept terms & conditions</Checkbox>
            <CustomButton isLoading={loading} size="md" fullWidth>
              {loading ? 'loading' : 'Burn'}
            </CustomButton>
          </div>
        </FormProvider>
      )}
    </CustomModal>
  );
}

BurnModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  storage: PropTypes.array,
  id: PropTypes.string,
};
