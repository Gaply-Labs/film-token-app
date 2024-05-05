import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Image, Spinner } from '@nextui-org/react';

import { Icon } from '@iconify/react';
import RevealButtonCmp from '../reveal/revealHandler';
import CustomButton from '../common/CustomButton';

export default function NFTCart({ item, isVideo = false, onPress, isBurend = false, loading = false, ...other }) {
  return (
    <Fragment>
      <Card as={'div'} isPressable {...other}>
        <CardBody className="overflow-visible p-0">
          {isVideo ? (
            <div>
              <video muted autoPlay preload="auto" loop className="w-full h-52 object-cover rounded-t-lg">
                <source src={item.image} />
              </video>
            </div>
          ) : (
            <div className="relative group">
              <Image
                width="100%"
                alt={'test'}
                radius="none"
                className="w-full object-cover h-[208px]  !rounded-t-lg group-hover:hidden"
                src={item.image ? item.image : '/images/nft/FC-NFT2.png'}
              />
              <Image
                width="100%"
                alt={'test'}
                radius="none"
                className="w-full object-cover h-[208px] hidden group-hover:inline  !rounded-t-lg"
                src={'/images/nft/FortuneCookie.gif.gif'}
              />
            </div>
          )}
          <div className="w-full flex flex-col h-full  items-start px-3 gap-y-4">
            <b>{item.title}</b>
            <p className="text-gray/70 text-sm">{item.desc}</p>
            {isBurend ? (
              <>
                {loading ? (
                  <>
                    <Spinner size="sm" color="secondary" />
                  </>
                ) : (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      onPress(item);
                    }}
                    className="text-secondary text-xs"
                  >
                    {item?.quantity > 0 ? (
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        className="p-1  rounded-lg bg-secondary w-8 h-8 flex items-center justify-center "
                      >
                        <Icon icon={'tabler:check'} width={20} className="text-black" />
                      </div>
                    ) : (
                      <CustomButton
                        onClick={(e) => {
                          e.preventDefault();
                          onPress(item);
                        }}
                        variants="light"
                        size="md"
                      >
                        Redeem
                      </CustomButton>
                    )}
                  </div>
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
                  <RevealButtonCmp title={''} metadata={item?.nft} id={item.id} variants="light" />
                )}
                <span className="flex text-xs tiem-center gap-x-1 text-gray/70">
                  <span>12</span>
                  <Icon icon={'tabler:heart'} width={17} />
                </span>
              </div>
            )}
          </div>
        </CardBody>
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
  isVideo: PropTypes.bool,
};
