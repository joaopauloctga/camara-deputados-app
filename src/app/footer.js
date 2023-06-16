import React from 'react';
const Footer = () => {
  return (
    <footer className="bg-1">
      <div className='container mx-auto py-4 '>
        <div className='flex'>
          <div className="w-1/3">
            <h4>Website</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="w-1/3">
            <h4>Social Media</h4>
            <ul>
              <li><a href="https://twitter.com">Twitter</a></li>
              <li><a href="https://facebook.com">Facebook</a></li>
              <li><a href="https://instagram.com">Instagram</a></li>
            </ul>
          </div>
          <div className="w-1/3">
            <h4>Terms</h4>
            <ul>
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
