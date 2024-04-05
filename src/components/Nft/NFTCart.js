import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, CardBody, CardFooter, Button } from '@nextui-org/react';
import Image from 'next/image';

import { Icon } from '@iconify/react';

export default function NFTCart({ item, showPrice = false, onPress, addBurnQ, minBurnQ, ...other }) {
  return (
    <Fragment>
      <Card isPressable onPress={() => onPress(item)} {...other}>
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
        <CardFooter  className="flex flex-col w-full items-start px-6 gap-y-4">
          <b>{item.title}</b>
          <p className="text-gray/70 text-sm">{item.desc}</p>
          <span className="flex items-center gap-x-4">
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" isBordered color="warning" />
            {showPrice ? (
              <span className="py-2 px-4 rounded-full border border-gray/70 text-white">{item.price}</span>
            ) : (
              ''
            )}
          </span>
          <span className="flex items-center w-full justify-between gap-x-4">
            {item?.quantity > 0 ? (
              <div className="flex items-center justify-center gap-x-2">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    addBurnQ(item.id);
                  }}
                  variant="light"
                  color="success"
                  size="sm"
                  className="max-w-fit text-white"
                  isIconOnly
                >
                  <Icon icon={'material-symbols:add'} width={20} />
                </Button>
                <div onClick={(e) => e.preventDefault()} className="p-1 rounded-lg bg-secondary w-8 h-8 flex items-center justify-center ">
                  {item.quantity}
                </div>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    minBurnQ(item.id);
                  }}
                  variant="light"
                  color="danger"
                  size="sm"
                  className="max-w-fit flex items-center justify-center text-white"
                  isIconOnly
                >
                  <Icon icon={'material-symbols:check-indeterminate-small-rounded'} width={20} />
                </Button>
              </div>
            ) : (
              <p
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="text-secondary"
              >
                Burn
              </p>
            )}
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
  addBurnQ: PropTypes.func,
  minBurnQ: PropTypes.func,
};
