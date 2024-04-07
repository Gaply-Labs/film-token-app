import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Snippet } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Keypair } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import CustomModal from './CustomModal';
import FormProvider from '../forms/FormProvider';
import CustomInputs from '../forms/CustomInputs';
import CustomButton from '../common/CustomButton';
import { addStorage, resetData } from '../../redux/burn.slice';
import createMessage from '../../pages/api/createMessage';

export default function BurnModal({ open, onClose, storage }) {
  const [loading, setLoading] = useState(false);
  const messageAccount = Keypair.generate();
  const [showTnx, setShowTnx] = useState(false);
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [time, setTime] = useState(0);

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
      const message = await createMessage(data.contract, wallet, messageAccount);
      toast.success('burn success');
      setContent(message.content.toString());
      setAuthor(message.author.toString());
      setTime(message.timestamp.toNumber() * 1000);
      setTimeout(() => {
        dispatch(resetData());
      }, 300);
      setShowTnx(true);
      reset();
    } catch (error) {
      console.log(error)
    }
    setLoading(false);
  };

  const handleClose = () => {
    reset();
    setContent('');
    setAuthor('');
    setTime(0);
    onClose();
  };

  return (
    <CustomModal isOpen={open} handleClose={handleClose} title="Burn Form">
      {showTnx ? (
        <div className="flex flex-col gap-y-4">
          {wallet && content && (
            <>
              <div className="flex flex-col gap-y-2">
                <span>Current Message : </span>
                <Snippet symbol="" size="lg">
                  {content}
                </Snippet>
              </div>
              <div className="flex flex-col gap-y-2">
                <span>Author : </span>
                <Snippet symbol="" className="flex" size="lg">
                  {author.substring(0, 6)}... {author.slice(-6)}
                </Snippet>
              </div>
              <div className="flex flex-col gap-y-2">
                <span>Time Published : </span>
                <Snippet symbol="" size="lg">
                  {new Date(time).toLocaleString()}
                </Snippet>
              </div>
            </>
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
};
