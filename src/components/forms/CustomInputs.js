import { Input } from '@nextui-org/react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
export default function CustomInputs({ label, placeholder, type, endContent, name }) {
  const { control } = useFormContext();
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input
            fullWidth
            variant="bordered"
            size="lg"
            radius="sm"
            endContent={endContent}
            labelPlacement="outside"
            label={label}
            {...field}
            isInvalid={!!error}
            errorMessage={error?.message}
            placeholder={placeholder}
            type={type}
            classNames={{ label: 'dark:text-white/90' }}
          />
        )}
      />
    </div>
  );
}

CustomInputs.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  endContent: PropTypes.any,
  name: PropTypes.string,
};
