import React from 'react';
import { useRouter } from 'next/router';
import '../styles.css'
import '../../styles/global.css';
import themeArea from '@/pages/theme-area.module.scss';
import Header from '@/components/header/header';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import Head from 'next/head';
import Footer from '@/app/footer';
import Breadcrumb from '@/components/breadcrumb/breadcrumb';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
      <main className={themeArea.main}>
        <Header currentRoute={router} />
        <div className={`px-2 lg:px-0 ${themeArea.content}`}>
          <Breadcrumb />
          <div className="container mx-auto py-4">
            <Component {...pageProps} />
          </div>
        </div>
        <Footer />
      </main>
  );
};

export default MyApp;
