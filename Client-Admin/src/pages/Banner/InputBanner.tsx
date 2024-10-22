import React from 'react';
import FormBanner from './FormBanner';
import { toast } from 'react-toastify';

const InputBanner: React.FC = () => {

  return (
    <div className="custom-container m-4 rounded h-100 p-4">
      <FormBanner />
    </div>
  );
};

export default InputBanner;
