import React from 'react';
import './Footer.css'; // Make sure this CSS file is created
import PrivacyPolicy from './Privacy Policy.pdf'; // Adjust the path if necessary
import TermsOfService from './Terms of Service.pdf'; // Adjust the path if necessary

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2023 My IMDb Clone</p>
        <div className="footer-links">
          <a href={TermsOfService} target="_blank" rel="noopener noreferrer">Terms of Service</a>
          <span>|</span>
          <a href={PrivacyPolicy} target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        </div>
        <div className="social-links">
          {/* Example social media links - replace with your actual links */}
          <a href="https://www.facebook.com/imdb/">Facebook</a>
          <a href="https://twitter.com/IMDb?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">Twitter</a>
          <a href="https://www.instagram.com/imdb/">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
