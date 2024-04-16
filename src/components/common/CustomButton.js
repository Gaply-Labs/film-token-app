import { Button } from '@nextui-org/react';
import PropTypes from 'prop-types';

export default function CustomButton({ children , fullWidth =false , size = 'lg', ...other }) {
  return (
    <Button
      type="submit"
      className={`bg-gradient-to-r  !px-4 flex items-center justify-center gap-x-3 from-[#F57C1F] truncate font-semibold to-[#F5B91F] ${fullWidth ? 'w-full' : size == 'lg' ? 'lg:max-w-[120px]' : 'lg:max-w-[180px]'} w-full`}
      size={size}
      radius="md"
      {...other}
    >
      {children}
    </Button>
  );
}

CustomButton.propTypes = {
  children: PropTypes.any,
  size: PropTypes.string,
  fullWidth : PropTypes.bool,
};
