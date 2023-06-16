import React from 'react';
import { useRouter } from 'next/router';
import '../styles.css'
import '../../styles/global.css'
import Header from '@/app/header';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import Head from 'next/head';
import Footer from '@/app/footer';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
      <>
        <Header currentRoute={router} />
        <div className="container mx-auto py-4">
          <Component {...pageProps} />
        </div>
        <Footer />
      </>
  );
};

export default MyApp;
