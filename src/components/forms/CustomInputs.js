import { Input } from '@nextui-org/react';
import PropTypes from 'prop-types';
export default function CustomInputs({ label, placeholder, type, endContent }) {
  return (
    <div>
      <Input
        fullWidth
        variant="bordered" 
        size='lg'
        radius='sm'
        endContent={endContent}
        labelPlacement="outside"
        label={label}
        placeholder={placeholder}
        type={type}
        classNames={{label : "dark:text-white/90"}}
      />
    </div>
  );
}

CustomInputs.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  endContent: PropTypes.any,
};
