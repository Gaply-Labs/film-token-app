import { Button } from '@nextui-org/react';
import PropTypes from 'prop-types';

export default function CustomButton({  children , ...other }) {
  return (
    <Button
      type="submit"
      className="bg-gradient-to-r from-[#F57C1F] font-semibold to-[#F5B91F] lg:max-w-[120px] w-full"
      size="lg"
      radius="md"
      {...other}
    >
      {children}
    </Button>
  );
}

CustomButton.propTypes = {
  children: PropTypes.any,
};
