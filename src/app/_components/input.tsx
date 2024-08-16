'use client'

import React from 'react';

type Props = {
  type: string,
  name: string,
  id: string,
  placeholder: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  value?: string,
}

export const Input: React.FC<Props> = ({
  type,
  name,
  id,
  placeholder,
  onChange,
  value,
}) => {
  return(
    <input type={type} name={name} id={id} className='bg-gray-50 border border-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5' placeholder={placeholder} required onChange={onChange} value={value} />
  );
}