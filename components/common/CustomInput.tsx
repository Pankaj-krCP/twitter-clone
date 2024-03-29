import React from "react";

interface CustomInputProps {
  placehoder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placehoder,
  value,
  type,
  disabled,
  onChange,
}) => {
  return (
    <input
      type={type || "text"}
      disabled={disabled}
      onChange={onChange}
      placeholder={placehoder}
      value={value}
      className="w-full p-4 text-lg bg-black border-2 border-neutral-800 rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70"
    />
  );
};

export default CustomInput;
