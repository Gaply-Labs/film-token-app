import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Divider } from '@nextui-org/react';
import { SideNavigation } from '../../utils/setting';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

Dashboard.propTypes = {
  children: PropTypes.node.isRequired,
};
export default function Dashboard({ children }) {
  const router = useRouter();

  return (
    <div className="w-full  grid grid-cols-12 gap-x-8 ">
      <div className="col-span-12 lg:col-span-4 xl:col-span-3 px-8 flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-4">
          <Button variant="bordered" color="secondary">
            Message
          </Button>
        </div>
        <div className="w-full flex flex-col gap-y-4 p-2 rounded-lg bg-[#192335]">
          <ul className="flex flex-col gap-y-2">
            {SideNavigation.map((item) => (
              <Fragment key={item.name}>
                <li
                  className={`w-full hover:bg-[#475569]/60 rounded-md  mx-auto  py-3 group flex items-center gap-x-4  `}
                >
                  <Link href={item.path} className="flex items-center gap-x-4 w-full px-4">
                    <span>
                      <Icon
                        icon={item.icon}
                        width={24}
                        className={`${router.pathname === item.path ? 'text-secondary' : 'text-[#475569]'} `}
                      />
                    </span>
                    <span>{item.name}</span>
                  </Link>
                </li>
                {item.underline ? <Divider /> : ''}
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
      {children}
    </div>
  );
}
