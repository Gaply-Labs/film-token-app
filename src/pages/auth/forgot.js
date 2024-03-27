import { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
//---------------------------------------------------
import FormProvider from '../../components/forms/FormProvider';
import AuthLayout from '../../container/auth/authLayout';
import CustomInputs from '../../components/forms/CustomInputs';
import CustomButton from '../../components/common/CustomButton';
import { useRouter } from 'next/router';

export default function Forgot() {

    const router = useRouter();

  const forgotSchema = Yup.object().shape({
    email: Yup.string().email().required(),
  });

  const defaultValues = useMemo(
    () => ({
      email: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(forgotSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data)
    router.replace("/auth/security")
  } ;

  return (
    <AuthLayout>
      <FormProvider method={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col  gap-y-4 max-w-md">
          <h3 className="text-white text-lg pb-6">
            Reset Your Password with your <br /> <b> Email or Phone number</b>
          </h3>
          <CustomInputs name="email" label="Enter the Account Email" placeholder="Email ..." type="text" />
          <CustomButton className="!bg-secondary lg:max-w-[120px]" >Reset</CustomButton>
        </div>
      </FormProvider>
    </AuthLayout>
  );
}
