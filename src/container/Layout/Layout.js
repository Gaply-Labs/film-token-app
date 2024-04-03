import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header/Header';


Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Layout({ children }) {
  return (
    <div className='w-full min-h-screen bg-main'>
        <Header />
        <main className='flex flex-col gap-y-24'>
            {children}
        </main>
    </div>
  );
}
