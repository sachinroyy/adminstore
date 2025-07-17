"use client";

import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import styles from './footer.module.css';import PromoBanners from '../ads/adsthree';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerTop}>

                <div className={styles.container}>
                    <div className={styles.footerContent}>
                        <div className={styles.footerSection}>
                            <div className={styles.logoContainer}>
                                <img
                                    src="/images/image.png"
                                    alt="Company Logo"
                                    className={styles.logo}
                                />
                                <img
                                    src="/images/jinstore.png"
                                    alt="JinStore Logo"
                                    className={styles.logo}
                                    style={{ width: '150px', height: 'auto' }}
                                />              </div>
                            <p className={styles.companyDescription}>
                                Your one-stop shop for all your needs. Quality products with fast delivery to your doorstep.
                            </p>
                            <div className={styles.deliveryInfo}>

                            </div>
                        </div>
                        <div className={styles.footerSection}>
                            <h3 className={styles.footerTitle}>Contact Us</h3>
                            <ul className={styles.contactList}>
                                <li>
                                    <FaPhone className={styles.contactIcon} />
                                    <span>+1 234 567 890</span>
                                </li>
                                <li>
                                    <FaEnvelope className={styles.contactIcon} />
                                    <span>info@example.com</span>
                                </li>
                                <li>
                                    <FaMapMarkerAlt className={styles.contactIcon} />
                                    <span>123 Business Street, City, Country</span>
                                </li>
                            </ul>
                        </div>

                        <div className={styles.footerSection}>
                            <h3 className={styles.footerTitle}>Quick Links</h3>
                            <ul className={styles.quickLinks}>
                                <li><Link href="/about">About Us</Link></li>
                                <li><Link href="/services">Services</Link></li>
                                <li><Link href="/portfolio">Portfolio</Link></li>
                                <li><Link href="/blog">Blog</Link></li>
                                <li><Link href="/contact">Contact</Link></li>
                            </ul>
                        </div>

                        <div className={styles.footerSection}>
                            <h3 className={styles.footerTitle}>Newsletter</h3>
                            <p className={styles.newsletterText}>Subscribe to our newsletter for the latest updates</p>
                            <div className={styles.newsletterForm}>
                                <input type="email" placeholder="Your email address" className={styles.newsletterInput} />
                                <button type="submit" className={styles.newsletterButton}>Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.footerBottom}>
                <div className={styles.container}>
                    <div className={styles.footerBottomContent}>
                        <p className={styles.copyright} sx={{ color: "#333333" }} >
                            &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
                        </p>
                        <div className={styles.socialLinks}>
                            <a href="#" aria-label="Facebook"><FaFacebook /></a>
                            <a href="#" aria-label="Twitter"><FaTwitter /></a>
                            <a href="#" aria-label="Instagram"><FaInstagram /></a>
                            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
                            <a href="#" aria-label="YouTube"><FaYoutube /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;