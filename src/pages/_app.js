import React from 'react';
import { useRouter } from 'next/router';
import '../styles.css'
import '../../styles/global.css'
import Header from '@/app/header';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import Head from 'next/head';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
      <>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Bitter:wght@100;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Bitter:wght@100;300;400;500;600;700;800;900&family=Open+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        </Head>
        <Header currentRoute={router} />
        <div className="container mx-auto py-4">
          <Component {...pageProps} />
        </div>
      </>
  );
};

export default MyApp;
