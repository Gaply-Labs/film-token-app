import NFTToken from '../../public/images/nft/image 1.png';
import NFTToken2 from '../../public/images/nft/image 2.png';
import NFTToken3 from '../../public/images/nft/image 3.png';
import NFTToken4 from '../../public/images/nft/image 4.png';

export const SideNavigation = [
  // { name: 'Dashboard', icon: 'tabler:home', path: '/' },
  // { name: 'Photos', icon: 'tabler:photo', path: '/' },
  { name: 'NFT', icon: 'tabler:new-section', path: '/', underline: true },
  // { name: 'Rewards', icon: 'tabler:award', path: '/' },
  // { name: 'Security', icon: 'tabler:lock', path: '/' },
  // { name: 'Subscriptions', icon: 'tabler:bell', path: '/' },
  // { name: 'Verification', icon: 'tabler:check', path: '/', underline: true },
  { name: 'Support', icon: 'tabler:question-mark', path: '/support' },
  // { name: 'Log Out', icon: 'tabler:logout', path: '/auth/login' },
];

export const NFTitems = [
  { image: NFTToken, title: 'title 1', desc: 'desc 1', price: '1 FTM', id: 1 },
  { image: NFTToken2, title: 'title 2', desc: 'desc 2', price: '1 FTM', id: 2 },
  { image: NFTToken3, title: 'title 3', desc: 'desc 3', price: '1 FTM', id: 3 },
  { image: NFTToken4, title: 'title 4', desc: 'desc 4', price: '1 FTM', id: 4 },
];
