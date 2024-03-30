import { Button } from '@nextui-org/react';
import PropTypes from 'prop-types';

export default function CustomButton({ children, size = 'lg', ...other }) {
  return (
    <Button
      type="submit"
      className="bg-gradient-to-r flex items-center justify-center gap-x-3 from-[#F57C1F] font-semibold to-[#F5B91F] lg:max-w-[120px] w-full"
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
};
