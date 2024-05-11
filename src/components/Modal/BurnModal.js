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
import { resetData } from '../../redux/burn.slice';
import burnApi from '../../pages/api/burn';
import toast from 'react-hot-toast';
import { Keypair } from '@solana/web3.js';

export default function BurnModal({ open, onClose, id }) {
  const [loading, setLoading] = useState(false);
  const [showTnx, setShowTnx] = useState(false);
  const [content, setContent] = useState(false);
  const [error, setError] = useState('');
  const messageAccount = Keypair.generate();
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
      const formData = {
        phone: data.contract,
        email: data.email,
        name: data.fullName,
        metadata: 'test',
      };
      setLoading(true);
      const message = await burnApi(formData, wallet, id, messageAccount);
      // toast.success('burn success');
      setContent(message);
      setTimeout(() => {
        dispatch(resetData());
      }, 300);
      setShowTnx(true);
      reset();
    } catch (error) {
      console.log(error);
      setError(error.message);
      toast.error(error.message);
      setShowTnx(true);
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
    <CustomModal isOpen={open} handleClose={handleClose} title="Redeem Access Pass">
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
            <div>
              <div className="py-2 w-full rounded-lg bg-red-800 text-center text-white">Error</div>
              <div className="text-red-600">{error}</div>
            </div>
          )}
          <CustomButton size="md" onClick={handleClose}>
            Close
          </CustomButton>
        </div>
      ) : (
        <FormProvider method={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex flex-col max-w-md gap-y-4">
            <CustomInputs name="contract" label="Contact number" placeholder="eg:(+1) 229 ..." />
            <CustomInputs name="email" label="Email Address" type="email" placeholder="eg:example@email.com" />
            <CustomInputs name="fullName" label="Full Name" placeholder="eg:Jack Jordan" />
            <Checkbox color="secondary">Accept Terms & Conditions</Checkbox>
            <CustomButton isLoading={loading} size="md" fullWidth>
              {loading ? 'loading' : 'Redeem'}
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
