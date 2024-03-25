import React from 'react';
import { Button, Checkbox, Link } from '@nextui-org/react';
import AuthLayout from '../../container/auth/authLayout';
import CustomTabs from '../../components/Tabs/CustomTabs';
import { loginTabs } from '../../components/Tabs/LoginTabs';

export default function Register() {
  return (
    <AuthLayout isRegister>
      <form className="flex flex-col gap-y-4">
        <CustomTabs tabs={loginTabs} />
        <div className='pb-5'>
          <Checkbox defaultSelected color="secondary" radius='sm' className='flex items-start'>
            I have read and agree to FilmToken's <br />
            <Link underline="always" className="text-gray" href="/">
              Term Of Service
            </Link>
          </Checkbox>
        </div>
        <div className="flex items-center justify-between max-w-sm">
          <Button
            className="bg-gradient-to-r from-orange-600 font-semibold to-amber-400 max-w-[170px] w-full"
            size="lg"
            radius="md"
          >
            Sign Up
          </Button>
          <Link className="text-gray" href={'/'}>
            Forgot Password ?
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
