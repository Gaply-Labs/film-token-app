import { useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
//----------------------------------------
import AuthLayout from '../../container/auth/authLayout';
import FormProvider from '../../components/forms/FormProvider';
import { loginTabs } from '../../components/Tabs/LoginTabs';
import CustomTabs from '../../components/Tabs/CustomTabs';

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

  const { reset, handleSubmit } = methods;

  const onSubmit = (data) => console.log(data);

  return (
    <AuthLayout>
      <FormProvider method={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col  gap-y-4">
          <CustomTabs tabs={loginTabs} />
          <div className="flex flex-col lg:flex-row w-full items-center justify-between max-w-xs gap-y-3">
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#F57C1F] font-semibold to-[#F5B91F] lg:max-w-[120px] w-full"
              size="lg"
              radius="md"
            >
              Log In
            </Button>
            <Link className="text-gray" href={'/'}>
              Forgot Password ?
            </Link>
          </div>
        </div>
      </FormProvider>
    </AuthLayout>
  );
}
