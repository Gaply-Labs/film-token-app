import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
export default function MountedProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <>{mounted ? children : null}</>;
}

MountedProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
