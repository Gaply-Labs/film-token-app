import { Button } from "@nextui-org/react";
import PropTypes from "prop-types"

export default function CustomButton({other , children}) {
  return (
    <Button {...other}>
        {children}
    </Button>
  )
}

CustomButton.propTypes = {
    other : PropTypes.any,
    children : PropTypes.any
}
