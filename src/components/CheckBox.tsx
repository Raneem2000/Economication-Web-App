import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';

interface CustomCheckboxFieldProps {
  name: string;
  label: string;
}

const CustomCheckboxField: React.FC<CustomCheckboxFieldProps> = ({
  name,
  label,
}) => {
  const navigate = useNavigate();
  return (
    <div dir="rtl">
      <div className="flex items-center gap-2 font-light text-sm">
        <Field
          type="checkbox"
          name={name}
          id={name}
          className="mr-2 cursor-pointer"
        />
        <label
          onClick={() => navigate(`/roles`)}
          className="cursor-pointer text-blue-500 hover:text-primary"
          htmlFor={name}
        >
          {label}
        </label>
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="text-error text-sm font-light "
      />
    </div>
  );
};

export default CustomCheckboxField;
