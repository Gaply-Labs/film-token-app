import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CustomButton from '../common/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { revealData } from '../../redux/reveel.slice';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Keypair } from '@solana/web3.js';
import TNXModal from '../Modal/TNXModal';
import { updateReData } from '../../redux/burn.slice';

RevealButtonCmp.propTypes = {
  id: PropTypes.string,
  fullWidth: PropTypes.bool,
  variants: PropTypes.string,
};

export default function RevealButtonCmp({ id, fullWidth = false, variants }) {
  const [newModal, setNewModal] = useState(false);
  const [newData, setNewData] = useState(false);
  const [error, setNewError] = useState('');

  const wallet = useAnchorWallet();
  const messageAccount = Keypair.generate();

  const dispatch = useDispatch();
  const { singleLoading: revealLoaidng, isReveal } = useSelector((state) => state.reveel);

  const revealDataHandler = async (e) => {
    e.preventDefault();
    console.log(id);
    if (!isReveal) {
      setNewModal(true);
      setNewError('Revealed Not Happen');
      return;
    }
    const res = await dispatch(revealData({ id, wallet, messageAccount }));
    if (res.type === 'revealData/fulfilled') {
      setNewModal(true);
      setNewData('Reveel Success');
      dispatch(updateReData({ wallet: wallet.publicKey.toBase58(), data: JSON.parse(res.payload) }));
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
        size="md"
      >
        What’s My Fortune?
      </CustomButton>
      <TNXModal isString open={newModal} onClose={() => setNewModal(false)} data={newData} error={error} />
    </>
  );
}
