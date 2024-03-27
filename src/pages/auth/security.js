import { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import OtpInput from 'react-otp-input';
import * as Yup from 'yup';
//---------------------------------------------------
import FormProvider from '../../components/forms/FormProvider';
import AuthLayout from '../../container/auth/authLayout';
import CustomButton from '../../components/common/CustomButton';
import { Input } from '@nextui-org/react';
import { useRouter } from 'next/router';

const MAX_OTP = 6;

export default function Forgot() {
    const router = useRouter();

  const forgotSchema = Yup.object().shape({
    otp: Yup.string()
      .test('len', `Must be exactly ${MAX_OTP} characters`, (val) => val.length === MAX_OTP)
      .required(),
  });
  const defaultValues = useMemo(
    () => ({
      otp: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(forgotSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods;
  const values = watch();

  const onSubmit = (data) => {
    console.log(data)
    router.replace("/auth/reset")
  };
  return (
    <AuthLayout>
      <FormProvider method={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col  gap-y-4 max-w-md">
          <div className="flex flex-col gap-y-4">
            <OtpInput
              value={values.otp}
              onChange={(e) => setValue('otp', e)}
              numInputs={MAX_OTP}
              maxLength={1}
              renderSeparator={
                <span className="px-3">
                  <></>
                </span>
              }
              renderInput={(props) => (
                <Input
                  isInvalid={!!errors?.otp}
                  classNames={{ label: 'dark:text-white/90' }}
                  inputMode="text"
                  maxLength={1}
                  variant={errors.otp ? 'faded' : 'underlined'}
                  {...props}
                />
              )}
            />
            {!!errors.otp && <span className="text-red-500">{errors?.otp?.message}</span>}
            <span className="text-gray/60">
              Enter the 6 digit code received by v*********@***.ua The code will be up to date within 5 minutes
            </span>
          </div>
          <CustomButton className="!bg-secondary lg:max-w-[120px]">Continue</CustomButton>
        </div>
      </FormProvider>
    </AuthLayout>
  );
}
