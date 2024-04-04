import { Icon } from '@iconify/react';
import { Button, Input } from '@nextui-org/react';
import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full max-w-screen-2xl mx-auto px-4 border-t border-t-gray/60 pb-20 ">
      <div className="w-full flex flex-col lg:flex-row lg:items-start justify-between gap-x-4 gap-y-8 items-center  pt-16">
        <div className="flex flex-col w-full lg:w-auto gap-y-8">
          <span className="text-white text-justify uppercase tracking-widest font-bold ">Filmtoken</span>
          <span className="text-white/80 text-justify text-xs">All Rights Reserved </span>
          <span className="text-white/80 text-justify text-sm max-w-[280px]">
            Films on the platform are property of their authors{' '}
          </span>
          <Button color="secondary">Become a manager</Button>
        </div>
        {footerLists.map((item, index) => (
          <div key={index} className="flex flex-col w-full lg:w-auto  items-start gap-y-4">
            <span className="text-white capitalize font-bold">{item.title}</span>
            <ul className="flex flex-col gap-y-6 text-sm">
              {item.content.map((item, index) => (
                <li key={index} className="text-sm text-[#94A3B8]">
                  {item.item}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex flex-col w-full lg:w-auto gap-y-8">
          <span className="text-white capitalize font-bold">news </span>
          <span className="text-justify text-sm text-white/80">Subscribe to get latest news & updates</span>
          <div className='relative flex items-center py-3 rounded-full bg-[#151D30] px-4 w-full'>
            <span className='text-slate-700 text-sm'>Email Address</span>
            <div className='absolute right-0'>
                <Button color='secondary' radius='full'>Subscribe</Button>
            </div>
          </div>
          <div className='flex items-center gap-x-4'>
            {socialsIcons.map((item) => (
                <Button color='none' radius='full' key={item.icon} isIconOnly >
                    <Icon icon={item.icon} width={24} className='text-[#CBD5E1]' />
                </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

const footerLists = [
  {
    title: 'platform',
    content: [
      { item: 'Apply For Funding', path: '' },
      { item: 'Films Gallery', path: '' },
      { item: 'NFT Marketplace', path: '' },
    ],
  },
  {
    title: 'terms',
    content: [
      { item: 'Terms of Service', path: '' },
      { item: 'Privacy Policy', path: '' },
      { item: 'Smart Contracts', path: '' },
    ],
  },
];

const socialsIcons = [
    {icon : "tabler:brand-facebook"},
    {icon : "tabler:brand-twitter-filled"},
    {icon : "tabler:brand-discord-filled"},
]