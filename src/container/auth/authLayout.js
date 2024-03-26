import AuthLogin from '../../../public/images/auth/LOG IN (1).png';
import AuthGradient from "../../../public/images/auth/Group 65.png"
import Image from 'next/image';
import { Button, User } from '@nextui-org/react';
import PropTypes from 'prop-types';
import Link from 'next/link';
export default function AuthLayout({ isRegister, children }) {
  return (
    <div className="w-full h-screen bg-main text-white ">
      <div className=" mx-auto  h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 h-full">
          {/* col-1 */}
          <div className="w-full lg:w-[80%] mx-auto py-5 flex flex-col items-center lg:items-start justify-center h-full relative z-20">
            {/* logo */}
            <span className="font-semibold uppercase absolute top-5 ">FilmToken</span>
            <div className=" flex flex-col gap-y-8 px-4 items-center w-full lg:items-start" >
              <h1 className="text-4xl font-bold ">{isRegister ? 'Join FilmToken' : 'Welcome Back'}</h1>
              <h4 className="font-semibold flex items-center gap-x-4 text-gray">
                {isRegister ? (
                  <>
                    Already have an account ?{' '}
                    <Link className="text-secondary" href={'/auth/login'}>
                      Log In
                    </Link>{' '}
                  </>
                ) : (
                  <>
                    New user ?{' '}
                    <Link className="text-secondary" href={'/auth/register'}>
                      Register New Account
                    </Link>
                  </>
                )}
              </h4>
              <div className="flex flex-col w-full  px-4 lg:px-0 gap-y-5 ">{children}</div>
            </div>
          </div>

          {/* col-2 */}
          <div className="w-full h-full hidden lg:block border-l-2 bg-loginPattern bg-cover bg-center bg-no-repeat  border-slate-500 relative overflow-hidden">
            <span className='absolute -bottom-72 -left-56 z-10'>
              <Image src={AuthGradient} alt='gradient' />
            </span>
           <div className='w-full h-full flex flex-col justify-center items-center relative z-20'>
           <div className="flex flex-col gap-y-4">
              <Image src={AuthLogin} alt="auth Login" className="rounded-xl shadow-lg" />
              <div className="w-full py-4 px-6 rounded-xl border bg-white bg-opacity-5 backdrop-blur-md border-white border-opacity-10 shadow flex items-center justify-between">
                <User
                  name="Leon Cooper"
                  description="Mer et victory"
                  avatarProps={{
                    src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
                  }}
                />
                <Button className="text-white w-full max-w-[100px]" size="md" variant="bordered" color="secondary">
                  View
                </Button>
              </div>
            </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AuthLayout.propTypes = {
  isRegister: PropTypes.bool,
  children: PropTypes.any,
};
