import React from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { ChatbotDataInterface } from '@/app/types';

interface InputPropsInterface extends React.InputHTMLAttributes<HTMLInputElement>  {
  register?: UseFormRegister<ChatbotDataInterface>;
  name: keyof ChatbotDataInterface;
}

const Input: React.FC<InputPropsInterface> = ({ register, name, ...props }) => {
  return (
    <input
      {...props} // Spread all other props to the input element
      className={cn(" h-14 border px-4 py-3 bg-gray-50 border-lightGray rounded-lg focus:border-2 focus:border-blue-500 focus:outline-none duration-150 transition-all", props.className)}
      {...(register && register(name))} // Use register if provided
    />
  );
};

export default Input;