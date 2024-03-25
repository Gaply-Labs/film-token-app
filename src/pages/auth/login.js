import Link from 'next/link';
import { Button } from '@nextui-org/react';
import CustomTabs from '../../components/Tabs/CustomTabs';
import { loginTabs } from '../../components/Tabs/LoginTabs';
import AuthLayout from '../../container/auth/authLayout';
export default function Login() {
  return (
    <AuthLayout>
      <form className="flex flex-col gap-y-4">
        <CustomTabs tabs={loginTabs} />
        <div className="flex items-center justify-between max-w-sm">
          <Button
            className="bg-gradient-to-r from-orange-600 font-semibold to-amber-400 max-w-[170px] w-full"
            size="lg"
            radius="md"
          >
            Log in
          </Button>
          <Link className="text-gray" href={'/'}>
            Forgot Password ?
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
