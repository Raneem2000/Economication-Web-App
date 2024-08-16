import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface CustomFieldProps {
  name: string;
  type: string;
  placeholder: string;
  img?: any;
}

const CustomField: React.FC<CustomFieldProps> = ({
  name,
  type,
  placeholder,
  img: image,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col">
      <div className="relative">
        <div
          className="flex items-center h-11 pr-2 bg-white text-darkgray font-light text-sm rounded-lg shadow-md w-full"
          style={{
            boxShadow: '0px 2px 8px 0px rgba(66, 19, 129, 0.25)',
          }}
        >
          <Field
            type={type === 'password' && showPassword ? 'text' : type}
            name={name}
            id={name}
            placeholder={placeholder}
            className="bg-transparent focus:outline-none text-black flex-grow text-right pr-2 h-full"
          />
          {image && <img src={image} className="mr-2" />}
          {type === 'password' && (
            <div
              onClick={togglePasswordVisibility}
              className="absolute text-lg left-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
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

export default CustomField;
