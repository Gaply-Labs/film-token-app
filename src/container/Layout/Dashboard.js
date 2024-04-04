import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@nextui-org/react';
import { SideNavigation } from '../../utils/setting';
import { Icon } from '@iconify/react';

Dashboard.propTypes = {
  children: PropTypes.node.isRequired,
};
export default function Dashboard({ children }) {
  return (
    <div className="w-full min-h-screen grid grid-cols-12 gap-x-8 ">
      <div className="col-span-3 px-8 flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-4">
          <Button variant="bordered" color="secondary">
            Message
          </Button>
        </div>
        <div className="w-full flex flex-col gap-y-4 p-2 rounded-lg bg-[#192335]">
          <ul className="flex flex-col gap-y-2">
            {SideNavigation.map((item) => (
              <li
                key={item.name}
                className={`w-full hover:bg-[#475569]/60 rounded-md  mx-auto px-4 py-3 group flex items-center gap-x-4  ${item?.underline ? 'border-b border-[#475569] rounded-none ' : ''}`}
              >
                <span>
                  <Icon icon={item.icon} width={24} className="text-[#475569]" />
                </span>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {children}
    </div>
  );
}
