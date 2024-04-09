import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardFooter, Image, Spinner } from '@nextui-org/react';

import { Icon } from '@iconify/react';

export default function NFTCart({ item, showPrice = false, onPress, isBurend = false, loading = false, ...other }) {
  return (
    <Fragment>
      <Card isPressable {...other}>
        <CardBody className="overflow-visible p-0">
          <div className="relative group">
            <Image
              width="100%"
              alt={'test'}
              radius="none"
              className="w-full object-cover h-[257px]  !rounded-t-lg group-hover:hidden"
              src={item.image ? item.image : '/images/nft/FC-NFT2.png'}
            />
            <Image
              width="100%"
              alt={'test'}
              radius="none"
              className="w-full object-cover h-[257px] hidden group-hover:inline  !rounded-t-lg"
              src={'/images/nft/FortuneCookie.gif.gif'}
            />
          </div>
        </CardBody>
        <CardFooter className="flex flex-col w-full items-start px-6 gap-y-4">
          <b>{item.title}</b>
          <p className="text-gray/70 text-sm">{item.desc}</p>
          <span className="flex items-center gap-x-4">
            {showPrice ? (
              <span className="py-2 px-4 rounded-full border border-gray/70 text-white">{item.quantity} FTM</span>
            ) : (
              ''
            )}
          </span>
          {isBurend ? (
            <>
              {loading ? (
                <>
                  <Spinner size="sm" color="secondary" />
                </>
              ) : (
                <p
                  onClick={(e) => {
                    e.preventDefault();
                    onPress(item);
                  }}
                  className="text-secondary"
                >
                  Redeemed
                </p>
              )}
            </>
          ) : (
            <div className="flex items-center w-full justify-between gap-x-4">
              {item?.quantity > 0 ? (
                <div className="flex items-center justify-center gap-x-2">
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className="p-1 rounded-lg bg-secondary w-8 h-8 flex items-center justify-center "
                  >
                    {item.quantity}
                  </div>
                </div>
              ) : (
                <p
                  onClick={(e) => {
                    e.preventDefault();
                    onPress(item);
                  }}
                  className="text-secondary"
                >
                  Redeem
                </p>
              )}
              <span className="flex tiem-center gap-x-1 text-gray/70">
                <span>12</span>
                <Icon icon={'tabler:heart'} width={23} />
              </span>
            </div>
          )}
        </CardFooter>
      </Card>
    </Fragment>
  );
}
NFTCart.propTypes = {
  item: PropTypes.any,
  showPrice: PropTypes.bool,
  onPress: PropTypes.func,
  isBurend: PropTypes.bool,
  loading: PropTypes.bool,
};
