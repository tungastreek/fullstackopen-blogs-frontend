import { forwardRef, useImperativeHandle, useState } from 'react';

const Togglable = forwardRef(({ children, buttonLabel, cancelButtonLabel = 'Cancel' }, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>{cancelButtonLabel}</button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;
