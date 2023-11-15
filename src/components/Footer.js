import React from 'react';
import './Footer.css'; // Make sure to create this CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2023 My IMDb Clone</p>
        <div className="footer-links">
          <a href="/terms">Terms of Service</a>
          <span>|</span>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <div className="social-links">
          {/* Example social media links - replace with your actual links */}
          <a href="https://facebook.com">Facebook</a>
          <a href="https://twitter.com">Twitter</a>
          <a href="https://instagram.com">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
