import React from 'react';

const Input = React.forwardRef((props, ref) => {
  const handleSelectAll = event => event.target.select();

  return <input onFocus={handleSelectAll} {...props} ref={ref} />;
});

export default Input;
