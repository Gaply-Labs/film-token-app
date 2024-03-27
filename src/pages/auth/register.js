import React, { useMemo } from 'react';
import { Checkbox, Link } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
//--------------------------------------------
import AuthLayout from '../../container/auth/authLayout';
import CustomTabs from '../../components/Tabs/CustomTabs';
import { loginTabs } from '../../components/Tabs/LoginTabs';
import FormProvider from '../../components/forms/FormProvider';
import CustomButton from '../../components/common/CustomButton';

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

  const { reset, handleSubmit } = methods;

  const onSubmit = (data) => console.log(data);

  return (
    <AuthLayout>
      <FormProvider method={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-4">
          <CustomTabs tabs={loginTabs} />
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
