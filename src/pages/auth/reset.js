import { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
//---------------------------------------------------
import FormProvider from '../../components/forms/FormProvider';
import AuthLayout from '../../container/auth/authLayout';
import CustomButton from '../../components/common/CustomButton';
import CustomPasswordInput from '../../components/forms/CustomPasswordInput';

export default function Forgot() {
  const router = useRouter();

  const forgotSchema = Yup.object().shape({
    password: Yup.string().required(),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null])
      .required(),
  });
  const defaultValues = useMemo(
    () => ({
      password: '',
      passwordConfirm: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(forgotSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
    router.replace('/auth/reset');
  };
  return (
    <AuthLayout>
      <FormProvider method={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col  gap-y-8 max-w-md">
          <CustomPasswordInput label="New Password" name="password" />
          <CustomPasswordInput label="New password confirmation" name="passwordConfirm" />
          <CustomButton className="!bg-secondary lg:max-w-fit">Confirm password reset</CustomButton>
        </div>
      </FormProvider>
    </AuthLayout>
  );
}
