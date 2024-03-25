import Link from 'next/link';
import { Button, User } from '@nextui-org/react';
import CustomTabs from '../../components/Tabs/CustomTabs';
import { loginTabs } from '../../components/Tabs/LoginTabs';
import Image from 'next/image';
import AuthLogin from '../../../public/images/auth/LOG IN (1).png';
export default function Login() {
  return (
    <div className="w-full h-screen bg-main text-white ">
      <div className="max-w-screen-2xl mx-auto  h-full">
        <div className="grid grid-cols-2 gap-x-4 h-full">
          {/* col-1 */}
          <div className="w-full py-5 flex flex-col justify-center h-full relative">
            {/* logo */}
            <span className="font-semibold uppercase absolute top-5">FilmToken</span>
            <div className=" flex flex-col gap-y-8">
              <h1 className="text-4xl font-bold ">Welcome Back</h1>
              <h4 className="font-semibold flex items-center gap-x-4 text-gray">
                New user ?{' '}
                <Link className="text-secondary" href={'/'}>
                  Register New Account
                </Link>
              </h4>
              <div className="flex flex-col gap-y-5">
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
              </div>
            </div>
          </div>

          {/* col-2 */}
          <div className="w-full h-full border-l-2  border-slate-500 flex items-center justify-center flex-col">
            <div className="flex flex-col gap-y-4">
              <Image src={AuthLogin} alt="auth Login" className="rounded-xl shadow-lg" />
              <div className="w-full py-4 px-6 rounded-xl border bg-white bg-opacity-5 backdrop-blur-md border-gray shadow flex items-center justify-between">
                <User
                  name="Leon Cooper"
                  description="Mer et victory"
                  avatarProps={{
                    src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
                  }}
                />
                <Button className='text-white w-full max-w-[100px]' size='md'  variant='bordered' color='secondary'>View</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
