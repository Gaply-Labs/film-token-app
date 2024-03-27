import PropTypes from "prop-types"
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";

//-------------------------------
import CustomInputs from "./CustomInputs";


CustomPasswordInput.propTypes = {
    label : PropTypes.string,
    name : PropTypes.string
}

export default function CustomPasswordInput({label , name}) {
    const [showPassword , setShowPassword] = useState(false);
  return (
    <CustomInputs
      label={label}
      name={name}
      placeholder={'Password ...'}
      type={showPassword ? 'text' : 'password'}
      endContent={
        showPassword ? (
          <Button
            type="button"
            color="none"
            size="sm"
            radius="full"
            onClick={() => setShowPassword(!showPassword)}
            isIconOnly
          >
            <Icon icon={'solar:eye-bold'} width={20} className="text-white text-opacity-45" />
          </Button>
        ) : (
          <Button
            type="button"
            color="none"
            size="sm"
            radius="full"
            isIconOnly
            onClick={() => setShowPassword(!showPassword)}
          >
            <Icon icon={'solar:eye-closed-bold'} width={20} className="text-white text-opacity-45" />
          </Button>
        )
      }
    />
  );
}
