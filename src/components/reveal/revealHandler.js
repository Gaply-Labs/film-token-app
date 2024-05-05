import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CustomButton from '../common/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { revealData } from '../../redux/reveel.slice';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import TNXModal from '../Modal/TNXModal';

RevealButtonCmp.propTypes = {
  id: PropTypes.string,
  fullWidth: PropTypes.bool,
  variants: PropTypes.string,
  metadata: PropTypes.object,
  title: PropTypes.string,
  reveal1: PropTypes.bool,
  size: PropTypes.string,
};

export default function RevealButtonCmp({
  id,
  metadata,
  fullWidth = false,
  variants,
  title,
  reveal1 = false,
  size = 'sm',
}) {
  const [newModal, setNewModal] = useState(false);
  const [newData, setNewData] = useState(false);
  const [error, setNewError] = useState('');

  const wallet = useAnchorWallet();

  const dispatch = useDispatch();
  const { singleLoading: revealLoaidng, isReveal, isReveal2 } = useSelector((state) => state.reveel);

  const revealDataHandler = async (e) => {
    e.preventDefault();
    if (!isReveal) {
      setNewModal(true);
      setNewError('Revealed Not Happen');
      return;
    }
    //* check if nft first reveal ok ! and if init isreveal2 not happen error to user to show reveal 2 not happend
    if (reveal1 && !isReveal2) {
      setNewModal(true);
      setNewError('Revealed 2 Not Happen');
      return;
    }
    const res = await dispatch(revealData({ id, wallet, metadata, isSecondReveal: reveal1 }));
    if (res.type === 'revealData/fulfilled') {
      setNewModal(true);
      setNewData('Reveel Success');
      setTimeout(() => {
        window.location.href = '/nft';
      }, 1200);
    } else {
      console.log(res);
      setNewModal(true);
      setNewError(res.payload);
    }
  };

  return (
    <>
      <CustomButton
        variants={variants}
        fullWidth={fullWidth}
        isLoading={revealLoaidng}
        onClick={revealDataHandler}
        size={size}
      >
        {title}
      </CustomButton>
      <TNXModal isString open={newModal} onClose={() => setNewModal(false)} data={newData} error={error} />
    </>
  );
}
