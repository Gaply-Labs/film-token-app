import { Spinner } from '@nextui-org/react';
import React from 'react';

export default function Loading() {
  return (
    <div className="col-span-12 min-h-[60vh] lg:col-span-7 xl:col-span-9 rounded-lg  flex flex-col order-1 lg:order-2">
      <div className="w-full  flex items-center justify-center bg-black rounded-md shadow p-2 h-80 flex-col">
        <Spinner label="Loading..." color="secondary" />
      </div>
    </div>
  );
}
