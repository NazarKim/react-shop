import React from 'react';
import './footer-style.scss';

function Footer() {
    return (
        <footer className='footer'>
            <div className="footer-content">
                <div className="contact-info">
                    <h3>Contact Us</h3>
                    <p>Phone: +1 (123) 456-7890</p>
                    <p>Email: info@pizzashop.com</p>
                    <p>Address: 123 Pizza Street, City, Country</p>
                    <p>Working Hours: Mon-Sat, 10 AM - 10 PM</p>
                </div>
                <div className="social-media">
                    <h3>Follow Us</h3>
                    <a href="#">Facebook</a>
                    <a href="#">Twitter</a>
                    <a href="#">Instagram</a>
                </div>
                <div className="copyright">
                    &copy; 2023 Pizza Shop. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
