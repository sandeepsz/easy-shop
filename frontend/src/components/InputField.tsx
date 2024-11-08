import { ChangeEvent, FC, ReactNode } from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  name?: string;
  value: string;
  step?: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  icon?: ReactNode;
  required: boolean;
}

const InputField: FC<InputFieldProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  name,
  step,
  value,
  onChange,
  icon,
  required,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300">
      {label}
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        id={id}
        type={type}
        value={value}
        name={name}
        step={step}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full px-3 py-2 ${
          icon ? "pl-10" : "pl-3"
        } bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm`}
      />
    </div>
  </div>
);

export default InputField;
