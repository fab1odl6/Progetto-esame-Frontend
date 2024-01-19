import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const sectionStyle = {
    flex: '1',
    margin: '0 10px',
    textAlign: 'left',
    paddingRight: '20px', // Spazio tra il testo e la linea
  };
  const headingStyle = { fontSize: '24px', marginBottom: '10px' };
  const linkStyle = { color: '#f0f0f0', textDecoration: 'none', fontSize: '18px', marginBottom: '5px', display: 'block' };
  const socialLinkStyle = { color: '#f0f0f0', fontSize: '24px', marginRight: '10px' };

  return (
    <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ ...sectionStyle, marginBottom: '10px',marginRight: '50px' }}> {/* Aumenta il margine inferiore */}
            <h2 style={{ ...headingStyle }}>WELCOME TO OUR VIRTUAL MUSEUM</h2>
            <p>
                Explore a world where each artwork tells a unique story.
                Discover art that inspires, captivates, and connects. Thank you for joining us on this artistic journey.
            </p>
        </div>

        <div style={{ ...sectionStyle }}>
            <h3 style={{ ...headingStyle }}>QUICK LINKS</h3>
            <ul>
                <li><a href="http://localhost:3000/everyArtwork" style={linkStyle}>Permanent Collection</a></li>
                <li><a href="http://localhost:3000/" style={linkStyle}>Events and Initiatives</a></li>
                <li><a href="http://localhost:3000/museums" style={linkStyle}>Thematic Areas</a></li>
            </ul>
        </div>


        <div style={{ ...sectionStyle, borderRight: '1px solid #fff' }}>
            <h3 style={{ ...headingStyle }}>WHERE TO FIND US</h3>
            <p style={{ marginBottom: '10px' }}><strong>Museum Address:</strong></p>
            <p style={{ marginBottom: '20px' }}>info@artreasures.it</p>
            <p style={{ marginBottom: '10px' }}><strong>Phone Number:</strong></p>
            <p>0749 367519</p>
        </div>


        <div style={{ ...sectionStyle }}>
          <h3 style={{ ...headingStyle }}>FOLLOW US</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex' }}>
            <li style={{ marginRight: '10px' }}><a href="https://www.facebook.com/?locale=it_IT" style={{ ...socialLinkStyle }}><FaFacebook /></a></li>
            <li style={{ marginRight: '10px' }}><a href="https://www.instagram.com/" style={{ ...socialLinkStyle }}><FaInstagram /></a></li>
            <li style={{ marginRight: '10px' }}><a href="https://twitter.com/?lang=it" style={{ ...socialLinkStyle }}><FaTwitter /></a></li>
          </ul>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>&copy; 2024 Art Treasures. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
