'use client'

import React from 'react';

type Props = {
  menu: string,
}

export const Button:React.FC<Props> = ({menu}) => {
  return (
    <button type='submit' className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>{menu}</button>
  );
}