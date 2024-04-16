import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CustomButton from '../common/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { revealData } from '../../redux/reveel.slice';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Keypair } from '@solana/web3.js';
import TNXModal from '../Modal/TNXModal';

RevealButtonCmp.propTypes = {
  fullWidth: PropTypes.bool,
};

export default function RevealButtonCmp({ fullWidth = false }) {
  const [newModal, setNewModal] = useState(false);
  const [newData, setNewData] = useState(false);
  const [error, setNewError] = useState('');

  const wallet = useAnchorWallet();
  const messageAccount = Keypair.generate();

  const dispatch = useDispatch();
  const { loading: revealLoaidng } = useSelector((state) => state.reveel);

  const revealDataHandler = async () => {
    const res = await dispatch(revealData({ wallet, messageAccount }));
    if (res.type === 'revealData/fulfilled') {
      console.log(res);
    } else {
      setNewModal(true);
      setNewError(res.payload);
    }
  };

  return (
    <>
      <CustomButton fullWidth={fullWidth} isLoading={revealLoaidng} onClick={revealDataHandler} size="md">
        What’s My Fortune?
      </CustomButton>
      <TNXModal open={newModal} onClose={() => setNewModal(false)} data={newData} error={error} />
    </>
  );
}
