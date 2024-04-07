import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function ToasterProvider() {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: '#475569',
          color: '#fff',
          borderRadius: '20px',
        },
      }}
    />
  );
}
