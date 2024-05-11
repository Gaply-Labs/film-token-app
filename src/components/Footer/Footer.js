import { Icon } from '@iconify/react';
import { Button, Link } from '@nextui-org/react';
import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full max-w-screen-2xl mx-auto px-4 border-t border-t-gray/60 py-8 ">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col gap-y-1 text-sm">
          <span>© Film Token Productions FZ LLC, 2024</span>
          <span>An in5 Media Company</span>
        </div>
        <div className="flex items-center gap-x-2">
          {socialsIcons.map((item) => (
            <Button color="default" isIconOnly radius="md" size="sm" as={Link} href={item.href} target="_blank">
              <Icon icon={item.icon} width={18} />
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-x-6 flex-wrap gap-y-3 text-sm">
          <Link color="foreground" size="sm" href="https://www.cinemania.io/cookies.html" target="_blank">
            Cookie Policy
          </Link>
          <Link color="foreground" size="sm" href="https://www.cinemania.io/privacy.html" target="_blank">
            Privacy Policy
          </Link>
          <Link color="foreground" size="sm" href="https://www.cinemania.io/terms-conditions.html" target='_blank'>
            Term & Conditions
          </Link>
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
  { icon: 'tabler:brand-twitter-filled', href: 'https://twitter.com/CinemaniaGlobal' },
  { icon: 'streamline:linkedin-solid', href: 'https://www.linkedin.com/company/film-token-io/' },
  { icon: 'lucide:instagram', href: 'https://www.instagram.com/CinemaniaGlobal/' },
  { icon: 'ic:baseline-tiktok', href: 'https://www.tiktok.com/@Cinemaniaglobal/' },
];
