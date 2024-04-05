import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import CustomModal from './CustomModal';
import FormProvider from '../forms/FormProvider';
import CustomInputs from '../forms/CustomInputs';
import CustomButton from '../common/CustomButton';

export default function BurnModal({ open, onClose }) {
  const [loading, setLoading] = useState(false);
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

  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
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
            {loading ? "loading" : "Burn"}
          </CustomButton>
        </div>
      </FormProvider>
    </CustomModal>
  );
}

BurnModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
