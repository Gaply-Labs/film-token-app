import { Button } from '@nextui-org/react';
import Link from 'next/link';
import CustomTabs from 'src/components/Tabs/CustomTabs';
import { loginTabs } from 'src/components/Tabs/LoginTabs';
import CustomButton from 'src/components/common/CustomButton';

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
                    <Button className="bg-gradient-to-r from-orange-600 font-semibold to-amber-400 max-w-[170px] w-full" size='lg' radius='md'>Log in</Button>
                    <Link className='text-gray' href={"/"}>Forgot Password ?</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* col-2 */}
          <div className="w-full h-full border-l-2 bg-red-400 border-slate-500"></div>
        </div>
      </div>
    </div>
  );
}
