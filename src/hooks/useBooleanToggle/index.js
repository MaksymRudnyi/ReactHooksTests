import { useState } from 'react';

const useBooleanToggle = () => {
  const [ status, setStatus ] = useState(false);

  const handleStatusChange = () => setStatus(!status);

  return {
    status,
    handleStatusChange,
  };
};

export default useBooleanToggle;
