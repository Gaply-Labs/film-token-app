import { Icon } from '@iconify/react';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import CustomInputs from '../../forms/CustomInputs';

export default function TabsEmailAuth() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-y-8 w-full pt-10 h-56">
      <CustomInputs label={'Email'} placeholder={'Email ...'} type={'email'} />
      <CustomInputs
        label={'Password'}
        placeholder={'Password ...'}
        type={showPassword ? 'text' : 'password'}
        endContent={
          showPassword ? (
            <Button color="none" size="sm" radius="full" onClick={() => setShowPassword(!showPassword)} isIconOnly>
              <Icon icon={'solar:eye-bold'} width={20} />
            </Button>
          ) : (
            <Button color="none" size="sm" radius="full" isIconOnly onClick={() => setShowPassword(!showPassword)}>
              <Icon icon={'solar:eye-closed-bold'} width={20} />
            </Button>
          )
        }
      />
    </div>
  );
}
