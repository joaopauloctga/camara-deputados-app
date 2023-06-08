import React from 'react';
import { useRouter } from 'next/router';
import '../styles.css'
import Header from '@/app/header';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
      <>
        <Header currentRoute={router} />
        <div className="container mx-auto py-4">
          <Component {...pageProps} />
        </div>
      </>
  );
};

export default MyApp;
