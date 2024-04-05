import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, CardBody, CardFooter } from '@nextui-org/react';
import Image from 'next/image';

import { Icon } from '@iconify/react';

export default function NFTCart({ item, showPrice = false, onPress , ...other }) {
  return (
    <Fragment>
      <Card  isPressable onPress={onPress} {...other}>
        <CardBody className="overflow-visible p-0">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={'test'}
            className="w-full object-cover h-[257px]"
            src={item.image}
          />
        </CardBody>
        <CardFooter className="flex flex-col w-full items-start px-6 gap-y-4">
          <b>Cookie Black</b>
          <p className="text-gray/70 text-sm">Fortune Cookie NFT's</p>
          <span className="flex items-center gap-x-4">
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" isBordered color="warning" />
            {showPrice ? <span className="py-2 px-4 rounded-full border border-gray/70 text-white">1 FTM</span> : ''}
          </span>
          <span className="flex items-center w-full justify-between gap-x-4">
            <p className="text-secondary">Burn</p>
            <span className="flex tiem-center gap-x-1 text-gray/70">
              <span>12</span>
              <Icon icon={'tabler:heart'} width={23} />
            </span>
          </span>
        </CardFooter>
      </Card>
    </Fragment>
  );
}
NFTCart.propTypes = {
  item: PropTypes.any,
  showPrice: PropTypes.bool,
  onPress: PropTypes.func,
};
