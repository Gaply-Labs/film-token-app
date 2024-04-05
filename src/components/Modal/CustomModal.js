import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import PropTypes from 'prop-types';

export default function CustomModal({ isOpen, handleClose, title, children, isDismissable, size }) {
  return (
    <div>
      <Modal
        size={size}
        isDismissable={isDismissable}
        isOpen={isOpen}
        onOpenChange={handleClose}
        placement="center"
        backdrop='blur'
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.0,
                ease: 'easeIn',
              },
            },
          },
        }}
      >
        <ModalContent className='bg-main'>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

CustomModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.any,
  isDismissable: PropTypes.bool,
  size: PropTypes.string,
};
