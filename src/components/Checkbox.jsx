import clsx from 'clsx';
import React, { useRef } from 'react';
import './checkbox.css';

const Checkbox = ({ className, id, label, name, onChange, ...rest }) => {
  const inputRef = useRef();

  return (
    <div className={clsx(className, 'checkbox__container')}>
      <input
        {...rest}
        className="checkbox__input"
        id={id}
        name={name}
        onChange={onChange}
        ref={inputRef}
        type="checkbox"
      />
      <span
        className="checkbox__label"
        htmlFor={id}
        onClick={() => inputRef.current.click()}
      >
        {label}
      </span>
    </div>
  );
};

export default Checkbox;
