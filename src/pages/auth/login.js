import { useMemo } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
//----------------------------------------
import AuthLayout from '../../container/auth/authLayout';
import FormProvider from '../../components/forms/FormProvider';
import CustomButton from '../../components/common/CustomButton';
import TabsEmailAuth from '../../components/Section/@auth/TabsEmailAuth';
import { useRouter } from 'next/router';

export default function Login() {
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

  const {  handleSubmit } = methods;
  const router = useRouter();
  const onSubmit = (data) => {
    console.log(data);
    router.push('/nft');
  };

  return (
    <AuthLayout>
      <FormProvider method={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col max-w-md  gap-y-4">
          <TabsEmailAuth />
          <div className="flex flex-col lg:flex-row w-full items-center justify-between max-w-xs gap-y-3">
            <CustomButton>Log In</CustomButton>
            <Link className="text-gray" href={'/auth/forgot'}>
              Forgot Password ?
            </Link>
          </div>
        </div>
      </FormProvider>
    </AuthLayout>
  );
}
