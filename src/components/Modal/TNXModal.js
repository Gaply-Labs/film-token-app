import React from 'react';
import CustomModal from './CustomModal';
import PropTypes from 'prop-types';
import CustomButton from '../common/CustomButton';
import { Snippet } from '@nextui-org/react';
export default function TNXModal({ open, onClose, data }) {
  const handleClose = () => {
    onClose();
  };
  return (
    <CustomModal isOpen={open} handleClose={handleClose} title="TNX">
      <div className="flex flex-col gap-y-4">
        {data ? (
          <>
            <div className="py-2 w-full rounded-lg bg-green-800 text-center text-white">Success</div>
            <div className="flex flex-col gap-y-2">
              <span>authority TNX : </span>
              <Snippet symbol="" size="lg">
                <span className="text-sm">{data.authority.toBase58()}</span>
              </Snippet>
            </div>
          </>
        ) : (
          <div className="py-2 w-full rounded-lg bg-red-800 text-center text-white">Error</div>
        )}
        <CustomButton size="md" onClick={handleClose}>
          Close
        </CustomButton>
      </div>
    </CustomModal>
  );
}
TNXModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.any,
};
