import { Icon } from '@iconify/react';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import CustomInputs from '../../forms/CustomInputs';

export default function TabsEmailAuth() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-y-8 w-full pt-10 h-64">
      <CustomInputs name="email" label={'Email'} placeholder={'Email ...'} type={'email'} />
      <CustomInputs
        label={'Password'}
        name="password"
        placeholder={'Password ...'}
        type={showPassword ? 'text' : 'password'}
        endContent={
          showPassword ? (
            <Button type="button" color="none" size="sm" radius="full" onClick={() => setShowPassword(!showPassword)} isIconOnly>
              <Icon icon={'solar:eye-bold'} width={20} className='text-white text-opacity-45' />
            </Button>
          ) : (
            <Button type="button" color="none" size="sm" radius="full" isIconOnly onClick={() => setShowPassword(!showPassword)}>
              <Icon icon={'solar:eye-closed-bold'} width={20} className='text-white text-opacity-45' />
            </Button>
          )
        }
      />
    </div>
  );
}
