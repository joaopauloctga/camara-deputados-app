import React from 'react';
import Header from '@/app/header';
import '../styles.css'

const MyApp = ({ Component, pageProps }) => {
  return (
      <>
        <Header />
        <Component {...pageProps} />
      </>
  );
};

export default MyApp;
