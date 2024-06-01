import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTelegram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCircleInfo, faEnvelope, faHome, faServer } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const Footer = () => {
  const socialLinks = [
    ['Twitter', 'https://twitter.com', faXTwitter],
    ['Facebook', 'https://facebook.com', faFacebook],
    ['Instagram', 'https://instagram.com', faInstagram],
    ['Telegram', 'telegram', faTelegram]
  ];

  const mainLinks = [
    ['Home', '/', faHome],
    ['Sobre nós', '/sobre-nos', faCircleInfo],
    ['Contato', '/contato', faEnvelope],
    ['Dados', '/dados', faServer],
  ];

  return (
    <footer className="bg-1">
      <div className='container mx-auto py-4'>
        <div className='grid grid-cols-2'>
          <div className='flex flex-col'>
            <div className='flex items-center'>
              <Image src="/logo.png" alt='Logo camara dados' width={60} height={100} />
              <h3 className='ml-4 t2'>Camara dados</h3>
            </div>
            <p className='mt-2 text-xs'>
              O Câmara Dados é um portal dedicado a fornecer informações detalhadas e atualizadas sobre as atividades da Câmara dos Deputados do Brasil. Nosso objetivo é tornar acessíveis dados importantes sobre projetos de lei, votações, eventos e outras atividades legislativas, promovendo transparência e facilitando o acompanhamento das ações dos representantes eleitos.
            </p>
          </div>
          <div className='grid grid-cols-3 justify-items-center'>
            <ul className=''>
              <li className='font-medium underline uppercase mb-1'>Website</li>
              {mainLinks.map((l, index) => {
                return <li key={`social-link-${index}`}>
                  <a href={l[1]}> <FontAwesomeIcon icon={l[2]} /> {l[0]}</a>
                </li>
              })}
            </ul>
            <ul>
              <li className='font-medium underline uppercase mb-1'>Social</li>
              {socialLinks.map((l, index) => {
                return <li key={`social-link-${index}`}>
                  <a href={l[1]}> <FontAwesomeIcon icon={l[2]} /> {l[0]}</a>
                </li>
              })}
            </ul>
            <ul>
              <li className='font-medium underline uppercase mb-1'>Termos</li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/cookies">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
