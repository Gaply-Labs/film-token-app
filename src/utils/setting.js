import NFTToken from '../../public/images/nft/image 1.png';
import NFTToken2 from '../../public/images/nft/image 2.png';
import NFTToken3 from '../../public/images/nft/image 3.png';
import NFTToken4 from '../../public/images/nft/image 4.png';

export const SideNavigation = [
  { name: 'Dashboard', icon: 'tabler:home', path: '/' },
  { name: 'Photos', icon: 'tabler:photo', path: '/' },
  { name: 'NFT', icon: 'tabler:new-section', path: '/' },
  { name: 'Rewards', icon: 'tabler:award', path: '/' },
  { name: 'Security', icon: 'tabler:lock', path: '/' },
  { name: 'Subscriptions', icon: 'tabler:bell', path: '/' },
  { name: 'Verification', icon: 'tabler:check', path: '/', underline: true },
  { name: 'Support', icon: 'tabler:question-mark', path: '/' },
  { name: 'Log Out', icon: 'tabler:logout', path: '/' },
];


export const NFTitems = [{ image: NFTToken }, { image: NFTToken2 }, { image: NFTToken3 }, { image: NFTToken4 }];