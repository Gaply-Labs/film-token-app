import { DateRangePicker } from '@nextui-org/date-picker';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
export default function CustomDatePicker({ label, placeholder, type, endContent, name }) {
  const { control } = useFormContext();
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DateRangePicker
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

CustomDatePicker.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  endContent: PropTypes.any,
  name: PropTypes.string,
};
