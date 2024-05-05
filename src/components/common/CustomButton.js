import { Button } from '@nextui-org/react';
import PropTypes from 'prop-types';

export default function CustomButton({ children, fullWidth = false, variants = 'faded', size = 'lg', ...other }) {
  return (
    <Button
      type="submit"
      className={`  !px-4 flex items-center justify-center gap-x-3 ${variants === 'light' ? 'text-secondary bg-transparent text-xs' : ' bg-gradient-to-r from-[#F57C1F] to-[#F5B91F]'} truncate font-semibold  ${fullWidth ? 'w-full' : size == 'lg' ? 'lg:max-w-[120px]' : size === 'sm' ? 'lg:max-w-fit' : 'lg:max-w-[180px]'} w-full`}
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
  fullWidth: PropTypes.bool,
  variants: PropTypes.string,
};
