import React, { useEffect } from 'react';
import { WalletMultiButton, useWalletModal } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import { Avatar, Button } from '@nextui-org/react';
import { Icon } from '@iconify/react';

import Logo from '../Logo/Logo';
import { navigation } from '../../utils/config';
import { useWallet } from '@solana/wallet-adapter-react';

export default function Header() {
  const { visible: newOPen } = useWalletModal();
  const { publicKey } = useWallet();
  useEffect(() => {
    if (newOPen) {
      document.body.style.paddingRight = '19px';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style = '';
    }
  }, [newOPen]);

  return (
    <header className="w-full py-4 sticky top-0 hidden lg:block bg-[#151D30] z-20">
      <nav className="w-full max-w-screen-2xl mx-auto px-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex-1 flex items-center gap-x-12">
            <Logo />
            <ul className="flex items-center gap-x-4">
              {navigation.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="text-gray capitalize ">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 flex items-center justify-end gap-x-8">
            <div className="py-2 px-6  rounded-xl border border-border border-opacity-25 text-gray flex items-start justify-center capitalize">
              apply for funding
            </div>
            <WalletMultiButton>
              {publicKey ? (
                <span>
                  {publicKey.toBase58().substring(0, 4)} ... <span className='xl:inline hidden'>{publicKey.toBase58().slice(-4)}</span>
                </span>
              ) : (
                'Connect Wallet'
              )}
            </WalletMultiButton>

            <div>
              <Button isIconOnly color="none" radius="full">
                <Icon icon={'solar:bell-outline'} width={20} className="text-white" />
              </Button>
            </div>
            <div>
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
