import React, { useMemo } from 'react';
import { Checkbox } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
//--------------------------------------------
import AuthLayout from '../../container/auth/authLayout';
import FormProvider from '../../components/forms/FormProvider';
import CustomButton from '../../components/common/CustomButton';
import TabsEmailAuth from '../../components/Section/@auth/TabsEmailAuth';
import Link from 'next/link';

export default function Register() {
  const loginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const defaultValues = useMemo(
    () => ({
      email: '',
      password: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => console.log(data);

  return (
    <AuthLayout>
      <FormProvider method={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col max-w-md gap-y-4">
          <TabsEmailAuth />
          <div className="pb-5">
            <Checkbox defaultSelected color="secondary" radius="sm" className="flex items-start">
              I have read and agree to FilmToken's <br />
              <Link underline="always" className="text-gray" href="/">
                Term Of Service
              </Link>
            </Checkbox>
          </div>
          <div className="flex flex-col w-full lg:flex-row items-center justify-between max-w-xs gap-y-3">
            <CustomButton>Sign Up</CustomButton>
            <Link className="text-gray" href={'/auth/forgot'}>
              Forgot Password ?
            </Link>
          </div>
        </div>
      </FormProvider>
    </AuthLayout>
  );
}
