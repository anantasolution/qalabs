import React from 'react';

import FOOT from '../assets/footer.png'

const Footer = () => {
    const services = [
        { name: 'Web Design', href: '#' },
        { name: 'Web Development', href: '#' },
        { name: 'SEO & Digital Marketing', href: '#' },
        { name: 'Branding & Visual Identity', href: '#' },
        { name: 'Consultation & Strategy', href: '#' },
        { name: 'Maintenance & Support', href: '#' }
    ];

    const support = [
        { name: 'Help Center', href: '#' },
        { name: 'Ticket Support', href: '#' },
        { name: 'Contact us', href: '#' },
        { name: 'Customer Support', href: '#' },
        { name: 'Forum Community', href: '#' }
    ];

    const company = [
        { name: 'About us', href: '#' },
        { name: 'Leadership', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Article & News', href: '#' },
        { name: 'Legal Notices', href: '#' }
    ];

    const socials = [
        { name: 'Facebook', href: '#', icon: 'facebook' },
        { name: 'Instagram', href: '#', icon: 'instagram' },
        { name: 'Twitter', href: '#', icon: 'twitter' },
        { name: 'YouTube', href: '#', icon: 'youtube' }
    ];

    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="container mx-auto px-6">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Address Section */}
                    <div className="space-y-4">
                        <img src={FOOT} alt="Webiso" className="h-8" />
                        <p className="text-sm">
                            Jalan Cempaka Wangi No 22
                            <br />
                            Jakarta - Indonesia
                        </p>
                        {/* Social Media Icons */}
                        <div className="flex space-x-4">
                            {socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
                                >
                                    <span className="sr-only">{social.name}</span>
                                    <div className="w-4 h-4" aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services Section */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
                        <ul className="space-y-2">
                            {services.map((service) => (
                                <li key={service.name}>
                                    <a href={service.href} className="text-sm hover:text-amber-400 transition-colors">
                                        {service.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
                        <ul className="space-y-2">
                            {support.map((item) => (
                                <li key={item.name}>
                                    <a href={item.href} className="text-sm transition-colors hover:text-amber-400">
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
                        <ul className="space-y-2">
                            {company.map((item) => (
                                <li key={item.name}>
                                    <a href={item.href} className="text-sm hover:text-white transition-colors">
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm">
                            Copyright ©️ 2024 webiso, All rights reserved. Powered by MoxCreative.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-sm hover:text-white transition-colors">
                                Term of use
                            </a>
                            <a href="#" className="text-sm hover:text-white transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-sm hover:text-white transition-colors">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;