import { useState } from 'react';

export const useField = (type, name, id) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  const getPureField = () => {
    return { value, type, id, name, onChange };
  };

  return { value, type, id, name, onChange, reset, getPureField };
};
