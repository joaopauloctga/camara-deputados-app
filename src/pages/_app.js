import React from 'react';
import Header from '@/app/header';
import '../styles.css'

const MyApp = ({ Component, pageProps }) => {
  return (
      <>
        <Header />
        <div className="container mx-auto">
          <Component {...pageProps} />
        </div>
      </>
  );
};

export default MyApp;
