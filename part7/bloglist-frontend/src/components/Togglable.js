import React, { useState } from 'react';
import { Button } from '../styled-components';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="mb-sm">
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} block>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Togglable;
