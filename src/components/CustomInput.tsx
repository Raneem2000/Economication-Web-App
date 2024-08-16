import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';

interface CustomInputProps {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  imgIcon?: boolean;
  icon?: any;
  textIcon?: string;
  disabled?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  type,
  placeholder,
  label,
  icon,
  imgIcon,
  textIcon,
  disabled,
}) => {
  const naviagte = useNavigate();
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        style={{
          color: 'var(--material-theme-ref-primary-primary5, #160041)',
          textAlign: 'right',
          fontFamily: '1Lionsys Reqa',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: '36px',
        }}
      >
        {label}
      </label>
      <div
        className="inline-flex items-center relative"
        style={{
          padding: '5px 0px 7px 0px',
          borderRadius: '8px',
          background:
            'var(--material-theme-ref-neutral-variant-neutral-variant95, #F5EEFA)',
          boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.20)',
        }}
      >
        <Field
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          className={`  ${
            textIcon && 'cursor-pointer'
          } bg-transparent focus:outline-none text-right pr-8`}
          style={{
            color:
              'var(--material-theme-ref-neutral-variant-neutral-variant35, #54515A)',
            textAlign: 'right',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '20px',
            letterSpacing: '0.1px',
            flexGrow: 1,
          }}
          disabled={disabled}
        />
        <div
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          {!imgIcon ? (
            <span
              className="cursor-pointer"
              style={{
                color: 'var(--material-theme-key-colors-primary, #5C2D91)',
                fontFamily: '1Lionsys Reqa',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '36px', // 257.143%
              }}
              onClick={() => naviagte(`/change-password`)}
            >
              {textIcon}
            </span>
          ) : (
            <img src={icon} />
          )}
        </div>
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="text-error text-sm font-light"
      />
    </div>
  );
};

export default CustomInput;
